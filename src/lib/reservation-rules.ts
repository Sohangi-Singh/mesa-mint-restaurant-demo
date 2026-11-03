/**
 * Business rules for reservation *requests*. They describe when a request may
 * be made — they say nothing about live table availability, which is always
 * confirmed by a person.
 */

export const RESTAURANT_TIME_ZONE = "Asia/Kolkata";

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 8;
export const MAX_DAYS_AHEAD = 60;
/** Requests for today must be at least this far in the future. */
export const SAME_DAY_NOTICE_MINUTES = 90;
/** 0 = Sunday … 6 = Saturday */
export const CLOSED_WEEKDAYS = [1] as const;

export interface TimeSlotGroup {
  label: string;
  slots: string[];
}

export const timeSlotGroups: TimeSlotGroup[] = [
  { label: "Lunch", slots: ["12:30", "13:00", "13:30", "14:00", "14:30"] },
  {
    label: "Dinner",
    slots: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"],
  },
];

export const allTimeSlots: string[] = timeSlotGroups.flatMap((group) => group.slots);

export const occasions = [
  "Birthday",
  "Anniversary",
  "Date night",
  "Business dinner",
  "Celebration",
  "Other",
] as const;

interface ZonedNow {
  /** YYYY-MM-DD in the restaurant's time zone */
  date: string;
  /** Minutes since midnight in the restaurant's time zone */
  minutes: number;
}

/** Current date and time as observed in Bengaluru, independent of server locale. */
export function nowInRestaurantZone(now: Date = new Date()): ZonedNow {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: RESTAURANT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
}

export function weekdayOf(isoDate: string): number {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function slotToMinutes(slot: string): number {
  const [h, m] = slot.split(":").map(Number);
  return h * 60 + m;
}

export type DateProblem = "invalid" | "past" | "too-far" | "closed";

export function checkReservationDate(isoDate: string, now: Date = new Date()): DateProblem | null {
  if (!isIsoDate(isoDate)) return "invalid";
  const today = nowInRestaurantZone(now).date;
  if (isoDate < today) return "past";
  if (isoDate > addDays(today, MAX_DAYS_AHEAD)) return "too-far";
  if ((CLOSED_WEEKDAYS as readonly number[]).includes(weekdayOf(isoDate))) return "closed";
  return null;
}

export type TimeProblem = "invalid" | "too-soon";

export function checkReservationTime(
  isoDate: string,
  slot: string,
  now: Date = new Date(),
): TimeProblem | null {
  if (!allTimeSlots.includes(slot)) return "invalid";
  const zoned = nowInRestaurantZone(now);
  if (isoDate === zoned.date && slotToMinutes(slot) < zoned.minutes + SAME_DAY_NOTICE_MINUTES) {
    return "too-soon";
  }
  return null;
}

export const dateProblemMessages: Record<DateProblem, string> = {
  invalid: "Choose a valid date.",
  past: "That date has already passed — please choose a future date.",
  "too-far": `Requests can be made up to ${MAX_DAYS_AHEAD} days ahead.`,
  closed: "We are closed on Mondays. Please choose another day.",
};

export const timeProblemMessages: Record<TimeProblem, string> = {
  invalid: "Choose one of the listed times.",
  "too-soon": "For same-day requests, please choose a time at least 90 minutes from now.",
};
