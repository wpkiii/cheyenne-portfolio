"use client";

import { useId } from "react";
import { site } from "@/content/site";
import { buttonClass } from "./ButtonLink";

/**
 * Opens the visitor's email app with the message pre-filled — no backend needed.
 * Swap for a form service (Formspree, Resend, etc.) later if preferred.
 *
 * - default: full form for the black Contact page.
 * - compact: shorter version for the white footer.
 */
export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const field = compact
    ? "w-full border border-black bg-transparent px-3 font-normal text-black outline-none focus:border-2"
    : "w-full border border-white bg-transparent px-4 py-3 font-normal outline-none focus:border-2";
  const height = compact ? "h-11" : "h-14";

  return (
    <form
      className={`${compact ? "space-y-3" : "space-y-6"} text-[15px] font-bold`}
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
      <div className={`grid sm:grid-cols-2 ${compact ? "gap-3" : "gap-6"}`}>
        <label className="block" htmlFor={`${id}-name`}>
          Name *
          <input id={`${id}-name`} name="name" required className={`mt-1.5 ${height} ${field}`} />
        </label>
        <label className="block" htmlFor={`${id}-email`}>
          Email *
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            className={`mt-1.5 ${height} ${field}`}
          />
        </label>
      </div>
      <label className="block" htmlFor={`${id}-message`}>
        Message *
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={compact ? 3 : 6}
          className={`mt-1.5 resize-y ${compact ? "py-2" : ""} ${field}`}
        />
      </label>
      <button type="submit" className={`${buttonClass(compact ? "dark" : "solid")} cursor-pointer`}>
        Send
      </button>
    </form>
  );
}
