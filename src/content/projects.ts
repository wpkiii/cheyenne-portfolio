import { looks, type LookImage } from "./looks";

/**
 * Portfolio projects, in display order — one per look.
 *
 * Images live in public/images/projects/<slug>/ and are listed in looks.ts.
 * Titles, subtitles and descriptions are placeholders until each project is
 * written up; edit them here.
 */
export type Orientation = "portrait" | "landscape";

export type Project = {
  slug: string;
  title: string;
  /** Short credit line, e.g. client / publication / event. */
  subtitle?: string;
  description?: string;
  /** Grid tile shape; landscape tiles span two columns. Follows the cover's shape. */
  orientation: Orientation;
  cover: LookImage | null;
  gallery: LookImage[];
};

export const projects: Project[] = looks.map(({ slug, images }, i) => {
  const cover = images[0] ?? null;
  return {
    slug,
    title: `Look ${String(i + 1).padStart(2, "0")}`,
    orientation: cover && cover.width > cover.height ? "landscape" : "portrait",
    cover,
    gallery: images,
  };
});

/**
 * Projects shown on the home page, in order. Mixing tall and wide covers keeps
 * the grid's rows even (2 portrait + 1 landscape fills a 4-column row).
 */
const featuredSlugs = ["look-01", "look-02", "look-07", "look-08", "look-03", "look-04"];

export const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
