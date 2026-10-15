"use client";

import { useState } from "react";

/**
 * Visual stub — not wired to a provider yet (Shopify Email / Mailchimp / Klaviyo).
 * Replace the submit handler once one is chosen.
 */
export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="mt-6 text-[15px] font-bold">Thanks for subscribing.</p>;
  }

  return (
    <form
      className="mt-6 text-[15px] font-bold"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email">Enter Your Email *</label>
      <div className="mt-2 flex max-w-md gap-3">
        <input
          id="newsletter-email"
          type="email"
          required
          className="h-14 min-w-0 flex-1 border border-black bg-transparent px-3 font-normal outline-none focus:border-2"
        />
        <button
          type="submit"
          className="h-14 w-40 shrink-0 border border-black transition-colors hover:bg-black hover:text-white"
        >
          Subscribe
        </button>
      </div>
      <label className="mt-4 flex items-center gap-3">
        <input type="checkbox" required className="h-5 w-5 accent-black" />
        Yes, Subscribe me to newsletter
      </label>
    </form>
  );
}
