"use client";

import { site } from "@/content/site";
import { buttonClass } from "./ButtonLink";

const fieldClass =
  "w-full border-b border-grey-4 bg-transparent py-3 outline-none transition-colors placeholder:text-grey-4 focus:border-ink";

/**
 * Opens the visitor's email app with the message pre-filled — no backend needed.
 * Swap for a form service (Formspree, Resend, etc.) later if preferred.
 */
export default function ContactForm() {
  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const subject = `Inquiry from ${data.get("name")}`;
        const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
      }}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input name="name" required placeholder="Name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input name="email" type="email" required placeholder="Email" className={fieldClass} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Message"
          className={`${fieldClass} resize-y`}
        />
      </label>
      <button type="submit" className={`${buttonClass} cursor-pointer bg-transparent`}>
        Send
      </button>
    </form>
  );
}
