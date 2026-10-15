"use client";

import { useState } from "react";

/**
 * Visual stub — not wired to a provider yet (Shopify Email / Mailchimp / Klaviyo).
 * Replace the submit handler once one is chosen.
 */
export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="mt-4 text-sm">Thanks for subscribing.</p>;
  }

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <div className="flex border-b border-ink">
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email"
          className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-grey-4"
        />
        <button
          type="submit"
          className="font-display text-xs font-bold uppercase tracking-[0.2em] hover:text-grey-3"
        >
          Subscribe
        </button>
      </div>
      <label className="flex items-center gap-2 text-xs text-grey-3">
        <input type="checkbox" required className="accent-ink" />
        Yes, subscribe me to the newsletter.
      </label>
    </form>
  );
}
