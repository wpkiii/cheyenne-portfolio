import { getDriveLooks, isDriveConfigured } from "@/lib/drive";
import { looks, type LookImage } from "./looks";

/**
 * Portfolio projects, in display order — one per look.
 *
 * Source of truth:
 * - Google Drive, when GOOGLE_DRIVE_API_KEY + GOOGLE_DRIVE_FOLDER_ID are set
 *   (see src/lib/drive.ts): one subfolder per look, titled by the folder name.
 * - Otherwise the bundled looks in public/images/projects (src/content/looks.ts).
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

/** How many looks the home page's Selected Work shows. */
const FEATURED_COUNT = 6;

/**
 * Bundled looks shown on the home page, in order. Mixing tall and wide covers
 * keeps the grid's rows even. (With Drive, the first six folders are shown.)
 */
const localFeatured = ["look-01", "look-02", "look-07", "look-08", "look-03", "look-04"];

function toProject(slug: string, title: string, images: LookImage[]): Project {
  const cover = images[0] ?? null;
  return {
    slug,
    title,
    orientation: cover && cover.width > cover.height ? "landscape" : "portrait",
    cover,
    gallery: images,
  };
}

function bundledProjects(): Project[] {
  return looks.map(({ slug, images }, i) =>
    toProject(slug, `Look ${String(i + 1).padStart(2, "0")}`, images),
  );
}

export async function getProjects(): Promise<Project[]> {
  if (!isDriveConfigured()) return bundledProjects();
  const drive = await getDriveLooks();
  if (drive.looks) return drive.looks.map((look) => toProject(look.slug, look.title, look.images));
  // During a deploy, a Drive problem (bad key, folder not shared…) shouldn't fail
  // the whole build: ship the bundled looks and say why. At runtime, throw so the
  // site keeps serving the last good Drive version instead.
  if (process.env.NEXT_PHASE !== "phase-production-build") throw new Error(drive.error);
  console.error(`\n⚠ Google Drive unavailable, using bundled looks — ${drive.error}\n`);
  return bundledProjects();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  if (isDriveConfigured()) return projects.slice(0, FEATURED_COUNT);
  return localFeatured
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}
