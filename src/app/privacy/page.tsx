import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// Placeholder policy — review before launch (Shopify can generate a store policy too).
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-8 md:pb-32">
      <PageHeading eyebrow="Legal" title="Privacy Policy" />
      <div className="space-y-5 leading-relaxed text-grey-2">
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
          <a href={`mailto:${site.email}`} className="underline hover:text-ink">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
