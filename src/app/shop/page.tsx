import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import ShopifyBuyButton from "@/components/ShopifyBuyButton";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 md:pb-32">
      <PageHeading eyebrow="Available Now" title="Shop" />
      <Reveal>
        <ShopifyBuyButton />
      </Reveal>
      <p className="mt-16 text-xs text-grey-3">
        Secure checkout powered by Shopify.
      </p>
    </div>
  );
}
