/**
 * Site-wide content. Edit this file to update names, copy, links and shop settings —
 * no component changes needed.
 */
export const site = {
  name: "Cheyenne Daniels",
  firstName: "Cheyenne",
  // Shown in the hero and page metadata.
  roles: ["Stylist", "Creative Director"],
  tagline: "Fashion stylist from Washington, DC, based in the DMV and New York City.",
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
    // Center media. A video (muted, looping) wins over the image; the poster is
    // shown while the video loads. width/height set the frame's shape. These are
    // the fallback — the "Website" Drive folder overrides them (src/lib/drive.ts).
    video: "/videos/hero.mp4" as string | null,
    poster: "/videos/hero-poster.jpg" as string | null,
    image: null as string | null,
    width: 960,
    height: 700,
  },

  about: {
    // Fallback copy and photo; the "Website" Drive folder overrides them.
    image: "/images/about/cheyenne.jpg" as string | null,
    heading: "Stylist Overview",
    /** Home page intro. */
    intro:
      "I am a fashion stylist from Washington, DC, based in DMV/NYC areas. I create looks that have modern, timeless foundations, but with details that introduce complexity and elevation. I love looks that create a feeling, but are versatile across passing trends and fads.",
    /** Full bio on the About page. */
    long: [
      "I am a fashion stylist from Washington, DC, based in DMV/NYC areas. I create looks that have modern, timeless foundations, but with details that introduce complexity and elevation. I love looks that create a feeling, but are versatile across passing trends and fads.",
      "I started pursuing my passion with a career in styling during my sophomore year of college at North Carolina A&T, right from my dorm room. My experience consists of editorial styling for brands and individuals, wardrobe, and celebrity styling. Recently, I worked on building looks for celebrity clients during NYFW with celebrity stylist, Kalyn Rodriguez and WNBA stylist, Amadi Brooks.",
      "I credit my stylistic choices to my diverse experiences. Living in a very small town with not many people who looked like me, I was always pushing the limits of what was socially acceptable to wear. Moving away from home for college and completely redefining myself at an HBCU, developed ambition and audacity in my perspective. Working with the NBA and experiencing athletic fashion on a global level, introduced aspects of versatility, functionality, and cohesiveness within how I style. I aim to create looks that are timeless, but complex enough to transcend what is considered normal or expected.",
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
    // Cheyenne's Stripe Payment Link; NEXT_PUBLIC_CHECKOUT_URL overrides it.
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL || "https://buy.stripe.com/5kQ8wPfTI4MB8rX7lPbjW00",
    product: {
      title: "GHOE100 Magazine",
      price: "$32.00",
      description:
        "Editorial magazine celebrating the Centennial of the Greatest Homecoming on Earth at North Carolina Agricultural and Technical State University.",
      // Shown in italics under the description.
      note: "Ground Shipping OR Pick up available at Magazine Launch Event at Backtable GSO, 10/29 6PM–9PM",
      image: "/images/shop/product.png" as string | null,
    },
    // Shown on /shop and the post-checkout thank-you page.
    policies: {
      shipping: "Orders ship within 5–7 business days within the United States. You'll get an email when your order is on its way.",
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
