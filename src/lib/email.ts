import "server-only";

import { Resend } from "resend";

export interface EmailConfig {
  apiKey: string;
  from: string;
  reservationTo: string;
  contactTo: string;
}

/**
 * Reads email settings from the server environment. Returns `null` when the
 * site has not been configured to send email, so callers can say so honestly
 * instead of pretending a request was delivered.
 */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESERVATION_FROM_EMAIL?.trim();
  const reservationTo = process.env.RESERVATION_TO_EMAIL?.trim();
  const contactTo = process.env.CONTACT_TO_EMAIL?.trim() || reservationTo;

  if (!apiKey || !from || !reservationTo || !contactTo) return null;
  return { apiKey, from, reservationTo, contactTo };
}

export function isEmailConfigured(): boolean {
  return getEmailConfig() !== null;
}

interface OutgoingEmail {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}

export type SendResult = { ok: true; id: string } | { ok: false; reason: string };

export async function sendEmail(config: EmailConfig, email: OutgoingEmail): Promise<SendResult> {
  try {
    const resend = new Resend(config.apiKey);
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: email.to,
      replyTo: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    if (error || !data) {
      return { ok: false, reason: error?.message ?? "Unknown email provider error" };
    }
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Unknown email provider error" };
  }
}

/** Escapes text for safe interpolation into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renders a simple, client-safe table of label/value rows for notification emails. */
export function renderDetailsEmail(heading: string, intro: string, rows: [string, string][]): string {
  const body = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;color:#7a7368;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;color:#171714;font-size:15px;line-height:1.5;">${escapeHtml(value || "—").replace(/\n/g, "<br />")}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f5f0e7;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4ddd1;">
      <tr><td style="padding:28px 28px 8px;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#6b292e;">MESA &amp; MINT</p>
        <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:normal;font-size:24px;color:#171714;">${escapeHtml(heading)}</h1>
        <p style="margin:0;color:#4a453e;font-size:14px;line-height:1.6;">${escapeHtml(intro)}</p>
      </td></tr>
      <tr><td style="padding:8px 28px 28px;">
        <table role="presentation" width="100%" style="border-top:1px solid #e4ddd1;">${body}</table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function renderDetailsText(heading: string, intro: string, rows: [string, string][]): string {
  return [heading, "", intro, "", ...rows.map(([label, value]) => `${label}: ${value || "—"}`)].join("\n");
}
