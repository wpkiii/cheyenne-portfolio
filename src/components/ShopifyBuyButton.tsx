"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { buttonClass } from "./ButtonLink";
import Placeholder from "./Placeholder";

const SDK_URL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

/* Minimal typing for the parts of the Buy Button SDK we use. */
type ShopifyBuyGlobal = {
  buildClient(config: { domain: string; storefrontAccessToken: string }): unknown;
  UI: {
    onReady(client: unknown): Promise<{
      createComponent(type: "product", config: Record<string, unknown>): void;
    }>;
  };
};

declare global {
  interface Window {
    ShopifyBuy?: ShopifyBuyGlobal;
  }
}

let sdkPromise: Promise<ShopifyBuyGlobal> | null = null;

function loadSdk() {
  sdkPromise ??= new Promise((resolve, reject) => {
    if (window.ShopifyBuy) return resolve(window.ShopifyBuy);
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => (window.ShopifyBuy ? resolve(window.ShopifyBuy) : reject());
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return sdkPromise;
}

// Match the site's monochrome look inside Shopify's iframe.
const font = { "font-family": "Helvetica Neue, Helvetica, Arial, sans-serif" };
const blackButton = {
  ...font,
  "font-size": "12px",
  "font-weight": "700",
  "letter-spacing": "0.25em",
  "text-transform": "uppercase",
  "padding-top": "18px",
  "padding-bottom": "18px",
  "border-radius": "0px",
  "background-color": "#000000",
  ":hover": { "background-color": "#404040" },
  ":focus": { "background-color": "#404040" },
};

const { domain, storefrontAccessToken, productId, fallback } = site.shopify;
const connected = Boolean(domain && storefrontAccessToken && productId);

export default function ShopifyBuyButton() {
  const node = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!connected || !node.current) return;
    const el = node.current;
    let cancelled = false;

    loadSdk()
      .then((ShopifyBuy) => {
        const client = ShopifyBuy.buildClient({ domain, storefrontAccessToken });
        return ShopifyBuy.UI.onReady(client);
      })
      .then((ui) => {
        if (cancelled) return;
        el.innerHTML = "";
        ui.createComponent("product", {
          id: productId,
          node: el,
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              layout: "horizontal",
              contents: { img: false, imgWithCarousel: true, description: true, button: true },
              width: "100%",
              text: { button: "Add to cart" },
              styles: {
                product: { "text-align": "left", "@media (min-width: 601px)": { "max-width": "100%" } },
                title: { ...font, "font-size": "32px", "font-weight": "200", "text-transform": "uppercase" },
                price: { ...font, "font-size": "18px" },
                compareAt: { ...font },
                description: { "font-family": "Montserrat, Helvetica, Arial, sans-serif", color: "#404040" },
                button: blackButton,
              },
            },
            cart: {
              text: { title: "Cart", button: "Checkout" },
              styles: { button: blackButton, title: { ...font, "text-transform": "uppercase" } },
            },
            toggle: { styles: { toggle: { "background-color": "#000000", ":hover": { "background-color": "#404040" } } } },
          },
        });
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
    };
  }, []);

  if (connected && !failed) return <div ref={node} className="min-h-[400px]" />;

  // Not connected yet (or the SDK failed to load): show a placeholder product card.
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Placeholder label="Product image coming soon" />
      </div>
      <div className="md:pt-8">
        <h2 className="font-display text-4xl font-extralight uppercase tracking-tight">
          {fallback.title}
        </h2>
        <p className="mt-4 font-display text-lg">{fallback.price}</p>
        <p className="mt-6 max-w-md leading-relaxed text-grey-2">{fallback.description}</p>
        <button type="button" disabled className={`${buttonClass} mt-10 cursor-not-allowed opacity-50 hover:bg-transparent hover:text-ink`}>
          {failed ? "Store unavailable" : "Coming soon"}
        </button>
      </div>
    </div>
  );
}
