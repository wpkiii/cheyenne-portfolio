import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import { site } from "@/content/site";

// Where the checkout (e.g. a Stripe Payment Link) sends buyers after paying.
export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <div className="px-5 py-28 md:px-10 md:py-[10vw]">
      <p className="text-[15px] font-bold text-muted">Order received</p>
      <h1 className="mt-3 text-5xl font-bold leading-none tracking-[-0.03em] md:text-[4.45vw]">
        Thank you
      </h1>
      <div className="mt-6 max-w-2xl space-y-4 text-lg font-bold leading-snug">
        <p>Your order is confirmed and a receipt is on its way to your inbox.</p>
        <p>{site.shop.policies.shipping}</p>
        <p>
          Questions about your order? Email{" "}
          <a href={`mailto:${site.email}`} className="underline hover:text-accent">
            {site.email}
          </a>
          .
        </p>
      </div>
      <div className="mt-10">
        <ButtonLink href="/" variant="solid">
          Back Home
        </ButtonLink>
      </div>
    </div>
  );
}
