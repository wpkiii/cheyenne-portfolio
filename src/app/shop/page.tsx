import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import ShopifyBuyButton from "@/components/ShopifyBuyButton";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  const { shipping, returns } = site.shop.policies;
  return (
    <div className="px-5 pb-28 md:px-10 md:pb-[8vw]">
      <PageHeading title="Shop" />
      <Reveal>
        <ShopifyBuyButton />
      </Reveal>
      <Reveal className="mt-20 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-2 md:gap-16">
        <section>
          <h2 className="text-[15px] font-bold">Shipping</h2>
          <p className="mt-3 max-w-md text-lg font-bold leading-snug">{shipping}</p>
        </section>
        <section>
          <h2 className="text-[15px] font-bold">Returns</h2>
          <p className="mt-3 max-w-md text-lg font-bold leading-snug">
            {returns}{" "}
            <a href={`mailto:${site.email}`} className="underline hover:text-accent">
              {site.email}
            </a>
          </p>
        </section>
      </Reveal>
      <p className="mt-16 text-[13px] font-bold text-muted">Payments are processed securely by our checkout provider.</p>
    </div>
  );
}
