import { z } from "zod";

import {
  cleanMultiline,
  emailField,
  honeypotField,
  nameField,
  optionalPhoneField,
} from "@/lib/validation/shared";

export const enquiryTypes = [
  "General enquiry",
  "Private dining & events",
  "Large group (9+ guests)",
  "Dietary or accessibility question",
  "Feedback",
  "Press & partnerships",
] as const;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  phone: optionalPhoneField.default(""),
  enquiryType: z
    .string()
    .refine(
      (value) => (enquiryTypes as readonly string[]).includes(value),
      "Please choose the type of enquiry.",
    ),
  message: z
    .string()
    .transform(cleanMultiline)
    .pipe(
      z
        .string()
        .min(MESSAGE_MIN, `Please share a little more detail (at least ${MESSAGE_MIN} characters).`)
        .max(MESSAGE_MAX, `Please keep your message under ${MESSAGE_MAX} characters.`),
    ),
  website: honeypotField,
});

export type ContactFormValues = z.input<typeof contactSchema>;
export type ContactRequest = z.output<typeof contactSchema>;
