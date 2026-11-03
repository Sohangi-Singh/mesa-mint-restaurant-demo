import { flattenFieldErrors, isRateLimited, json, readJsonBody } from "@/lib/api";
import { getEmailConfig, renderDetailsEmail, renderDetailsText, sendEmail } from "@/lib/email";
import { CONTACT_SUCCESS_MESSAGE } from "@/lib/messages";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  if (isRateLimited(request, "contact")) {
    return json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "You've sent several messages in a short time. Please wait a few minutes and try again.",
      },
      429,
    );
  }

  const body = await readJsonBody(request);
  if (!body || typeof body !== "object") {
    return json({ ok: false, code: "BAD_REQUEST", message: "We couldn't read that message. Please try again." }, 400);
  }

  const honeypot = (body as Record<string, unknown>).website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: false, code: "BAD_REQUEST", message: "We couldn't process this message." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        code: "VALIDATION",
        message: "Some details need attention before we can send your message.",
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
          "The contact form is not configured on this site yet, so your message was not sent. Please try again later.",
      },
      503,
    );
  }

  const c = parsed.data;
  const rows: [string, string][] = [
    ["Name", c.name],
    ["Email", c.email],
    ["Phone", c.phone],
    ["Enquiry type", c.enquiryType],
    ["Message", c.message],
  ];
  const heading = "New website enquiry";
  const intro = "Someone has sent a message through the contact form. Reply directly to this email to respond.";

  const result = await sendEmail(config, {
    to: config.contactTo,
    replyTo: c.email,
    subject: `Enquiry · ${c.enquiryType} · ${c.name}`,
    html: renderDetailsEmail(heading, intro, rows),
    text: renderDetailsText(heading, intro, rows),
  });

  if (!result.ok) {
    console.error("[contact] email delivery failed:", result.reason);
    return json(
      {
        ok: false,
        code: "DELIVERY_FAILED",
        message: "We couldn't send your message just now, so it has not been received. Please try again shortly.",
      },
      502,
    );
  }

  return json({ ok: true, message: CONTACT_SUCCESS_MESSAGE }, 200);
}
