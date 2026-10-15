/**
 * Site-wide content. Edit this file to update names, copy, links and Shopify IDs —
 * no component changes needed.
 */
export const site = {
  name: "Cheyenne",
  // Shown in the hero and page metadata.
  roles: ["Stylist", "Creative Director", "Product Designer"],
  tagline: "Styling, creative direction and product design.",
  email: "hello@example.com",
  instagram: "https://instagram.com/",
  instagramHandle: "@handle",

  hero: {
    // Drop a file at public/images/hero.jpg and set this to "/images/hero.jpg".
    image: null as string | null,
  },

  about: {
    image: null as string | null, // e.g. "/images/about-portrait.jpg"
    heading: "Stylist Overview",
    short:
      "Cheyenne is a stylist, creative director and product designer. A short introduction about her work, clients and point of view will go here.",
    long: [
      "A longer biography will go here — background, training, and how she approaches styling and creative direction.",
      "A second paragraph can cover notable clients, publications, events and collaborations.",
      "A closing paragraph about her product design work and what she is building next.",
    ],
  },

  /**
   * Shopify Buy Button settings. Fill these in once the store and product exist
   * (Shopify admin → Sales channels → Buy Button → generated embed code).
   * Environment variables take precedence so values can live in Vercel instead.
   */
  shopify: {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN ?? "",
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "",
    productId: process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_ID ?? "",
    // Shown while the store is not connected yet.
    fallback: {
      title: "Product Name",
      price: "$55.00",
      description: "A short description of the product will go here.",
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
