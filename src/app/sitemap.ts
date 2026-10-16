import type { MetadataRoute } from "next";
import { getProjects } from "@/content/projects";
import { site } from "@/content/site";

/** /sitemap.xml — every page, plus one entry per look (from Drive when connected). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/portfolio", "/about", "/shop", "/contact", "/privacy", "/accessibility"];
  const projects = await getProjects();
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...projects.map((p) => ({ url: `${site.url}/portfolio/${p.slug}` })),
  ];
}
