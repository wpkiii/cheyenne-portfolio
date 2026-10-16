/**
 * Site-wide content. Edit this file to update names, copy, links and shop settings —
 * no component changes needed.
 */
export const site = {
  name: "Cheyenne Daniels",
  firstName: "Cheyenne",
  // Shown in the hero and page metadata.
  roles: ["Stylist", "Creative Director"],
  tagline: "Styling and creative direction.",
  email: "cdstudios111@gmail.com",
  instagram: "https://www.instagram.com/cchey.ennee/",
  instagramHandle: "@cchey.ennee",

  /**
   * Public address, used for link previews and the sitemap. Set NEXT_PUBLIC_SITE_URL
   * once the domain is connected; until then Vercel's production address is used.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  hero: {
    // Center media. A video (muted, looping) wins over the image; the image is
    // also used as the video's poster frame. Files go in public/, e.g.
    // video: "/videos/hero.mp4", image: "/images/hero.jpg".
    video: null as string | null,
    image: null as string | null,
  },

  about: {
    image: null as string | null, // e.g. "/images/about-portrait.jpg"
    heading: "Stylist Overview",
    short:
      "Cheyenne is a stylist and creative director. A short introduction about her work, clients and point of view will go here.",
    long: [
      "A longer biography will go here — background, training, and how she approaches styling and creative direction.",
      "A second paragraph can cover notable clients, publications, events and collaborations.",
      "A closing paragraph about what she is working on next.",
    ],
  },

  /**
   * The shop's one product. Checkout works one of two ways — set whichever is
   * used as environment variables in Vercel (see .env.example):
   * - Shopify Buy Button: NEXT_PUBLIC_SHOPIFY_DOMAIN, _STOREFRONT_TOKEN, _PRODUCT_ID.
   *   Shopify's card shows its own product details and cart.
   * - Any hosted checkout link (Stripe Payment Link, Square, PayPal):
   *   NEXT_PUBLIC_CHECKOUT_URL. The details below are shown with a Buy button.
   * With neither set, the product shows as "Coming soon".
   */
  shop: {
    shopify: {
      domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? "",
      storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "",
      productId: process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_ID ?? "",
    },
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "",
    product: {
      title: "Product Name",
      price: "$55.00",
      description: "A short description of the product will go here.",
      image: null as string | null, // e.g. "/images/shop/product.jpg"
    },
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
] as const;
