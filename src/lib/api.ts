import "server-only";

import type { ZodError } from "zod";

/** Shape of every JSON response from the form endpoints. */
export type FormApiResponse =
  | { ok: true; message: string }
  | {
      ok: false;
      code: "VALIDATION" | "NOT_CONFIGURED" | "RATE_LIMITED" | "BAD_REQUEST" | "DELIVERY_FAILED";
      message: string;
      fieldErrors?: Record<string, string>;
    };

export function json(body: FormApiResponse, status: number): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

const MAX_BODY_BYTES = 16_000;

/** Reads a small JSON body, rejecting oversized or malformed payloads. */
export async function readJsonBody(request: Request): Promise<unknown | null> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return null;
  if (!request.headers.get("content-type")?.includes("application/json")) return null;

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function flattenFieldErrors(error: ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/**
 * Best-effort, per-instance rate limiter. On serverless platforms each
 * instance keeps its own window, so treat this as a speed bump for abuse —
 * use a shared store (e.g. Upstash, Vercel KV) for strict guarantees.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

export function isRateLimited(request: Request, scope: string): boolean {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5_000) {
    for (const [entryKey, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entryKey);
    }
  }
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}
