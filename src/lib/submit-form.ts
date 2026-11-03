/** Client-side result of posting a form to one of the JSON endpoints. */
export type SubmitOutcome =
  | { kind: "success"; message: string }
  | { kind: "validation"; message: string; fieldErrors: Record<string, string> }
  | { kind: "not-configured"; message: string }
  | { kind: "error"; message: string };

interface ApiBody {
  ok?: boolean;
  code?: string;
  message?: string;
  fieldErrors?: Record<string, string>;
}

const NETWORK_MESSAGE =
  "We couldn't reach the server, so nothing was sent. Please check your connection and try again.";

export async function submitForm(endpoint: string, payload: unknown): Promise<SubmitOutcome> {
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { kind: "error", message: NETWORK_MESSAGE };
  }

  let body: ApiBody = {};
  try {
    body = (await response.json()) as ApiBody;
  } catch {
    // Non-JSON response (e.g. a proxy error page) — handled below.
  }

  // Only an explicit success from the server counts as success.
  if (response.ok && body.ok === true && typeof body.message === "string") {
    return { kind: "success", message: body.message };
  }

  const message = body.message ?? "Something went wrong and nothing was sent. Please try again shortly.";
  if (body.code === "VALIDATION") return { kind: "validation", message, fieldErrors: body.fieldErrors ?? {} };
  if (body.code === "NOT_CONFIGURED") return { kind: "not-configured", message };
  return { kind: "error", message };
}
