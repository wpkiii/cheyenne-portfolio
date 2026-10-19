import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import ShopifyBuyButton from "@/components/ShopifyBuyButton";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  const { shipping } = site.shop.policies;
  return (
    <div className="px-5 pb-28 md:px-10 md:pb-[8vw]">
      <PageHeading title="Shop" />
      <Reveal>
        <ShopifyBuyButton />
      </Reveal>
      <Reveal className="mt-20 border-t border-white/20 pt-10">
        <h2 className="text-[15px] font-bold">Shipping</h2>
        <p className="mt-3 max-w-md text-lg font-bold leading-snug">{shipping}</p>
      </Reveal>
      <p className="mt-16 text-[13px] font-bold text-muted">Payments are processed securely by our checkout provider.</p>
    </div>
  );
}
