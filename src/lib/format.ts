/**
 * Formats a rupee amount with Indian digit grouping (₹1,23,450).
 * Implemented by hand so server and client output is always identical,
 * regardless of the ICU data available to each runtime.
 */
export function formatINR(amount: number): string {
  const whole = Math.round(amount).toString();
  if (whole.length <= 3) return `₹${whole}`;
  const lastThree = whole.slice(-3);
  const rest = whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${rest},${lastThree}`;
}

/** "19:30" → "7:30 pm" */
export function formatTime12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
}

/** "2026-11-14" → { weekday: "Sat", day: "14", month: "Nov" } (calendar date, no timezone shift). */
export function formatDateParts(isoDate: string): { weekday: string; day: string; month: string } {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-IN", { ...options, timeZone: "UTC" }).format(date);
  return { weekday: part({ weekday: "short" }), day: String(d), month: part({ month: "short" }) };
}

/** "2026-11-14" → "Saturday, 14 November 2026" (calendar date, no timezone shift). */
export function formatLongDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
