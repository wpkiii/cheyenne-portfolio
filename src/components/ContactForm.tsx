"use client";

import { useActionState, useId } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { site } from "@/content/site";
import { buttonClass } from "./ButtonLink";

/**
 * Contact form. Messages go through the sendContact server action (logged to a
 * Google Sheet and emailed to Cheyenne). If that backend isn't configured, it
 * asks the visitor to email her directly instead.
 *
 * - default: full form for the black Contact page.
 * - compact: shorter version for the white footer.
 */
export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: "idle",
  });

  if (state.status === "sent") {
    return (
      <p role="status" className={`text-lg font-bold ${compact ? "" : "md:text-2xl"}`}>
        Thanks — your message is on its way. I&rsquo;ll get back to you soon.
      </p>
    );
  }

  const field = compact
    ? "w-full border border-black bg-transparent px-3 font-normal text-black outline-none focus:border-2"
    : "w-full border border-white bg-transparent px-4 py-3 font-normal outline-none focus:border-2";
  const height = compact ? "h-11" : "h-14";

  return (
    <form action={action} className={`${compact ? "space-y-3" : "space-y-6"} text-[15px] font-bold`}>
      <input type="hidden" name="page" value={compact ? "footer" : "contact page"} />
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={`grid sm:grid-cols-2 ${compact ? "gap-3" : "gap-6"}`}>
        <label className="block" htmlFor={`${id}-name`}>
          Name *
          <input
            id={`${id}-name`}
            name="name"
            required
            maxLength={200}
            autoComplete="name"
            className={`mt-1.5 ${height} ${field}`}
          />
        </label>
        <label className="block" htmlFor={`${id}-email`}>
          Email *
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
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
          maxLength={5000}
          rows={compact ? 3 : 6}
          className={`mt-1.5 resize-y ${compact ? "py-2" : ""} ${field}`}
        />
      </label>

      {state.status === "error" && (
        <p role="alert" className="text-accent">
          {state.message}{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={`${buttonClass(compact ? "dark" : "solid")} cursor-pointer disabled:cursor-wait disabled:opacity-60`}
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
