import { z } from "zod";

import {
  MAX_GUESTS,
  MIN_GUESTS,
  checkReservationDate,
  checkReservationTime,
  dateProblemMessages,
  occasions,
  timeProblemMessages,
} from "@/lib/reservation-rules";
import {
  cleanMultiline,
  emailField,
  honeypotField,
  nameField,
  phoneField,
} from "@/lib/validation/shared";

export const SPECIAL_REQUESTS_MAX = 500;

/**
 * Builds the reservation request schema. `now` is injected so the same rules
 * run identically in the browser and on the server, and can be tested.
 */
export function createReservationSchema(now: () => Date = () => new Date()) {
  return z
    .object({
      name: nameField,
      email: emailField,
      phone: phoneField,
      date: z
        .string()
        .min(1, "Please choose a date.")
        .superRefine((value, ctx) => {
          const problem = checkReservationDate(value, now());
          if (problem) ctx.addIssue({ code: "custom", message: dateProblemMessages[problem] });
        }),
      time: z.string().min(1, "Please choose a preferred time."),
      // Accepts the select's string value or an already-parsed number (the client
      // posts validated output, so the server sees numbers).
      guests: z
        .union([z.string(), z.number()], { error: "Please select the number of guests." })
        .transform((value) => (typeof value === "number" ? value : value.trim() === "" ? Number.NaN : Number(value)))
        .pipe(
          z
            .number({ error: "Please select the number of guests." })
            .int("Please select the number of guests.")
            .min(MIN_GUESTS, "Please select the number of guests.")
            .max(MAX_GUESTS, `For parties larger than ${MAX_GUESTS}, please contact us directly.`),
        ),
      occasion: z
        .union([z.literal(""), z.enum(occasions)], { error: "Please choose an occasion from the list." })
        .default(""),
      specialRequests: z
        .string()
        .transform(cleanMultiline)
        .pipe(
          z
            .string()
            .max(SPECIAL_REQUESTS_MAX, `Please keep requests under ${SPECIAL_REQUESTS_MAX} characters.`),
        )
        .default(""),
      consent: z
        .boolean()
        .refine((value) => value, "Please confirm you understand this is a request, not a confirmed booking."),
      website: honeypotField,
    })
    .superRefine((data, ctx) => {
      if (checkReservationDate(data.date, now())) return; // already reported on the date field
      const problem = checkReservationTime(data.date, data.time, now());
      if (problem) {
        ctx.addIssue({ code: "custom", path: ["time"], message: timeProblemMessages[problem] });
      }
    });
}

export type ReservationFormValues = z.input<ReturnType<typeof createReservationSchema>>;
export type ReservationRequest = z.output<ReturnType<typeof createReservationSchema>>;
