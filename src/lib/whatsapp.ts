/**
 * Builds a WhatsApp click-to-chat link from NEXT_PUBLIC_WHATSAPP_NUMBER.
 * Returns null unless a plausible international number is configured, so the
 * site never renders a link that leads nowhere.
 */
export function getWhatsAppLink(message = "Hello MESA & MINT, I have an enquiry."): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (!raw) return null;

  const digits = raw.replace(/[^\d]/g, "");
  // International format without "+": country code + subscriber number.
  if (!/^[1-9]\d{9,14}$/.test(digits)) return null;
  // Guard against obviously fake placeholder numbers such as 910000000000.
  if (/^(\d{1,3})0{8,}$/.test(digits)) return null;

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
