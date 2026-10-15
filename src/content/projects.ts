/**
 * Portfolio projects, in display order.
 *
 * To add photos: put files in public/images/projects/<slug>/ and reference them
 * here, e.g. cover: "/images/projects/project-01/cover.jpg". Any image left as
 * null renders a "?" placeholder.
 */
export type Orientation = "portrait" | "landscape";

export type Project = {
  slug: string;
  title: string;
  /** Short credit line, e.g. client / publication / event. */
  subtitle?: string;
  /** Portrait tiles are narrow, landscape tiles wide; pair one of each per row. */
  orientation: Orientation;
  cover: string | null;
  gallery: { src: string | null; orientation: Orientation; alt?: string }[];
  description?: string;
};

// Projects display in pairs (one row each). Alternating portrait/landscape
// order gives the staggered, off-balance rhythm of the reference grid.
const layout: Orientation[] = [
  "portrait",
  "landscape",
  "landscape",
  "portrait",
  "portrait",
  "landscape",
  "landscape",
  "portrait",
  "portrait",
  "landscape",
  "landscape",
  "portrait",
];

export const projects: Project[] = layout.map((orientation, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    slug: `project-${n}`,
    title: `Project ${n}`,
    subtitle: "Client / Publication",
    orientation,
    cover: null,
    gallery: [
      { src: null, orientation: "landscape" },
      { src: null, orientation: "portrait" },
      { src: null, orientation: "portrait" },
      { src: null, orientation: "landscape" },
    ],
    description: "A short description of the project, the team and credits will go here.",
  };
});

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
