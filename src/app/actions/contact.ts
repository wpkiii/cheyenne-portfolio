"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; message: string }
  /** No backend configured — the form falls back to the visitor's email app. */
  | { status: "fallback"; name: string; email: string; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sends a contact message to the Google Apps Script web app
 * (scripts/google-apps-script/Contact.gs), which logs it to a Google Sheet and
 * emails it to Cheyenne.
 */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const page = String(form.get("page") ?? "");

  // Honeypot: a field people never see. Bots fill it in; pretend it worked.
  if (String(form.get("company") ?? "") !== "") return { status: "sent" };

  if (!name || !EMAIL_RE.test(email) || !message) {
    return { status: "error", message: "Please fill in your name, a valid email and a message." };
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return { status: "error", message: "That message is too long — please shorten it." };
  }

  const url = process.env.CONTACT_WEBHOOK_URL;
  const secret = process.env.CONTACT_WEBHOOK_SECRET;
  if (!url || !secret) return { status: "fallback", name, email, message };

  try {
    // Apps Script answers a POST with a redirect to the result; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, name, email, message, page }),
    });
    const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (res.ok && body?.ok) return { status: "sent" };
    console.error("Contact webhook rejected the message", res.status, body);
  } catch (err) {
    console.error("Contact webhook failed", err);
  }
  return {
    status: "error",
    message: "Sorry, that didn't send. Please email me directly instead.",
  };
}
