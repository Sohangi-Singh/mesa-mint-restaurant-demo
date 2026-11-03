import { z } from "zod";

/** Removes control characters (keeping line breaks) and normalises Unicode. */
export function stripControlChars(value: string): string {
  return value.normalize("NFC").replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

/** Single-line text: control characters removed and whitespace collapsed. */
export function cleanLine(value: string): string {
  return stripControlChars(value).replace(/\s+/g, " ").trim();
}

/** Multi-line text: control characters removed and excess blank lines collapsed. */
export function cleanMultiline(value: string): string {
  return stripControlChars(value)
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Accepts Indian numbers with or without +91 and international numbers in
 * E.164-like form. Spaces, dashes, dots and brackets are ignored.
 */
export function isValidPhone(raw: string): boolean {
  const value = raw.replace(/[\s\-().]/g, "");
  if (value.startsWith("+")) return /^\+\d{8,15}$/.test(value);
  if (/^[6-9]\d{9}$/.test(value)) return true; // Indian mobile
  if (/^0\d{10}$/.test(value)) return true; // Indian number with trunk prefix
  if (/^91[6-9]\d{9}$/.test(value)) return true; // Indian mobile with country code
  return false;
}

export const nameField = z
  .string()
  .transform(cleanLine)
  .pipe(
    z
      .string()
      .min(2, "Please enter your full name.")
      .max(80, "Please keep your name under 80 characters.")
      .regex(/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u, "Please use letters, spaces, apostrophes or hyphens only."),
  );

export const emailField = z
  .string()
  .transform(cleanLine)
  .pipe(
    z
      .string()
      .min(1, "Please enter your email address.")
      .max(254, "That email address is too long.")
      .pipe(z.email("Please enter a valid email address.")),
  );

export const phoneField = z
  .string()
  .transform(cleanLine)
  .pipe(
    z
      .string()
      .min(1, "Please enter a phone number.")
      .max(24, "That phone number is too long.")
      .refine(isValidPhone, "Please enter a valid phone number, including the country code if outside India."),
  );

export const optionalPhoneField = z
  .string()
  .transform(cleanLine)
  .pipe(
    z
      .string()
      .max(24, "That phone number is too long.")
      .refine(
        (value) => value === "" || isValidPhone(value),
        "Please enter a valid phone number, including the country code if outside India.",
      ),
  );

/** Honeypot: humans never see or fill this field. */
export const honeypotField = z.string().optional();

export const HONEYPOT_FIELD = "website" as const;
