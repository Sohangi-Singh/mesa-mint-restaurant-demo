import { flattenFieldErrors, isRateLimited, json, readJsonBody } from "@/lib/api";
import { getEmailConfig, renderDetailsEmail, renderDetailsText, sendEmail } from "@/lib/email";
import { formatLongDate, formatTime12h } from "@/lib/format";
import { RESERVATION_SUCCESS_MESSAGE } from "@/lib/messages";
import { createReservationSchema } from "@/lib/validation/reservation";

export async function POST(request: Request) {
  if (isRateLimited(request, "reservations")) {
    return json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "You've sent several requests in a short time. Please wait a few minutes and try again.",
      },
      429,
    );
  }

  const body = await readJsonBody(request);
  if (!body || typeof body !== "object") {
    return json({ ok: false, code: "BAD_REQUEST", message: "We couldn't read that request. Please try again." }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  const honeypot = (body as Record<string, unknown>).website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: false, code: "BAD_REQUEST", message: "We couldn't process this request." }, 400);
  }

  const parsed = createReservationSchema().safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        code: "VALIDATION",
        message: "Some details need attention before we can send your request.",
        fieldErrors: flattenFieldErrors(parsed.error),
      },
      422,
    );
  }

  const config = getEmailConfig();
  if (!config) {
    return json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "Online reservation requests are not configured on this site yet, so your request was not sent. Please try again later.",
      },
      503,
    );
  }

  const r = parsed.data;
  const rows: [string, string][] = [
    ["Name", r.name],
    ["Email", r.email],
    ["Phone", r.phone],
    ["Date", formatLongDate(r.date)],
    ["Preferred time", formatTime12h(r.time)],
    ["Guests", String(r.guests)],
    ["Occasion", r.occasion],
    ["Special requests", r.specialRequests],
  ];
  const heading = "New reservation request";
  const intro =
    "A guest has requested a table through the website. This is not a confirmed booking — please contact the guest to confirm or suggest an alternative.";

  const result = await sendEmail(config, {
    to: config.reservationTo,
    replyTo: r.email,
    subject: `Reservation request · ${r.name} · ${r.guests} guest${r.guests === 1 ? "" : "s"} · ${formatLongDate(r.date)}, ${formatTime12h(r.time)}`,
    html: renderDetailsEmail(heading, intro, rows),
    text: renderDetailsText(heading, intro, rows),
  });

  if (!result.ok) {
    console.error("[reservations] email delivery failed:", result.reason);
    return json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message:
          "We couldn't send your request just now, so it has not been received. Please try again in a few minutes.",
      },
      502,
    );
  }

  return json({ ok: true, message: RESERVATION_SUCCESS_MESSAGE }, 200);
}
