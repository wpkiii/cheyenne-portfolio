"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { buttonClass } from "./ButtonLink";
import SmartImage from "./SmartImage";

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

// Match the site's look inside Shopify's iframe: white bold Helvetica on black, pill buttons.
const font = { "font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", "font-weight": "700" };
const pillButton = {
  ...font,
  "font-size": "15px",
  "border-radius": "999px",
  "padding-left": "28px",
  "padding-right": "28px",
  "background-color": "#ffffff",
  color: "#000000",
  ":hover": { "background-color": "#9a9a9a", color: "#000000" },
  ":focus": { "background-color": "#9a9a9a", color: "#000000" },
};

const { domain, storefrontAccessToken, productId } = site.shop.shopify;
const { checkoutUrl, product } = site.shop;
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
                title: { ...font, "font-size": "40px", "letter-spacing": "-0.03em", color: "#ffffff" },
                price: { ...font, "font-size": "20px", color: "#ffffff" },
                compareAt: { ...font, color: "#9a9a9a" },
                description: { ...font, "font-size": "18px", color: "#ffffff" },
                button: pillButton,
              },
            },
            cart: {
              text: { title: "Cart", button: "Checkout" },
              styles: { button: pillButton, title: font },
            },
            toggle: {
              styles: {
                toggle: { ...font, "background-color": "#ffffff", color: "#000000", ":hover": { "background-color": "#9a9a9a" } },
                count: { color: "#000000" },
                iconPath: { fill: "#000000" },
              },
            },
          },
        });
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
    };
  }, []);

  if (connected && !failed) return <div ref={node} className="min-h-[400px]" />;

  // No Shopify (or its SDK failed to load): our own product card, which buys
  // through the hosted checkout link when one is set.
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <SmartImage
          src={product.image}
          alt={product.title}
          sizes="(min-width: 768px) 50vw, 100vw"
          preload
        />
      </div>
      <div className="md:pt-8">
        <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">{product.title}</h2>
        <p className="mt-4 text-xl font-bold">{product.price}</p>
        <p className="mt-6 max-w-md text-lg font-bold leading-snug">{product.description}</p>
        {checkoutUrl ? (
          <a href={checkoutUrl} className={`${buttonClass("solid")} mt-10`}>
            Buy Now
          </a>
        ) : (
          <button
            type="button"
            disabled
            className={`${buttonClass("solid")} mt-10 cursor-not-allowed opacity-50 hover:border-white hover:bg-white`}
          >
            {failed ? "Store unavailable" : "Coming soon"}
          </button>
        )}
      </div>
    </div>
  );
}
