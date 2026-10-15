import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import ShopifyBuyButton from "@/components/ShopifyBuyButton";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="px-5 pb-28 md:px-10 md:pb-[8vw]">
      <PageHeading title="Shop" />
      <Reveal>
        <ShopifyBuyButton />
      </Reveal>
      <p className="mt-16 text-[13px] font-bold text-muted">Payments are processed securely by our checkout provider.</p>
    </div>
  );
}
