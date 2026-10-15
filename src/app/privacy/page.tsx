import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// Placeholder policy — review before launch (Shopify can generate a store policy too).
export default function PrivacyPage() {
  return (
    <div className="max-w-4xl px-5 pb-28 md:px-10 md:pb-[8vw]">
      <PageHeading title="Privacy Policy" />
      <div className="space-y-6 text-lg font-bold leading-snug">
        <p>
          This site is a portfolio for {site.name}. We collect only the information you choose to
          send — for example your name and email when you get in touch or subscribe to the
          newsletter — and use it solely to respond to you.
        </p>
        <p>
          Purchases are processed by Shopify. When you check out, your payment and shipping details
          are handled under Shopify&rsquo;s privacy policy; we never see or store card numbers.
        </p>
        <p>
          We do not sell your information. To ask about or delete any data we hold, email{" "}
          <a href={`mailto:${site.email}`} className="underline transition-colors hover:text-accent">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
