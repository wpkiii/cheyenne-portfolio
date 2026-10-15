"use client";

import { site } from "@/content/site";
import { buttonClass } from "./ButtonLink";

const fieldClass =
  "w-full border border-white bg-transparent px-4 py-3 font-normal outline-none focus:border-2";

/**
 * Opens the visitor's email app with the message pre-filled — no backend needed.
 * Swap for a form service (Formspree, Resend, etc.) later if preferred.
 */
export default function ContactForm() {
  return (
    <form
      className="space-y-6 text-[15px] font-bold"
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
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          Name *
          <input name="name" required className={`mt-2 h-14 ${fieldClass}`} />
        </label>
        <label className="block">
          Email *
          <input name="email" type="email" required className={`mt-2 h-14 ${fieldClass}`} />
        </label>
      </div>
      <label className="block">
        Message *
        <textarea name="message" required rows={6} className={`mt-2 resize-y ${fieldClass}`} />
      </label>
      <button type="submit" className={`${buttonClass("solid")} cursor-pointer`}>
        Send
      </button>
    </form>
  );
}
