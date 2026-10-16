import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** /robots.txt — everything is crawlable except the internal API routes. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
