import Link from "next/link";
import type { Project } from "@/content/projects";
import SmartImage from "./SmartImage";

/** Grid card: image zooms gently and a dark overlay reveals the title on hover. */
export default function ProjectTile({ project }: { project: Project }) {
  const landscape = project.orientation === "landscape";
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block focus-visible:outline-offset-4">
      {/*
        Height always comes from a single-column portrait spacer, so landscape tiles
        (two columns + gap) line up exactly with the portrait tiles beside them.
      */}
      <div
        className={`relative overflow-hidden ${landscape ? "grid grid-cols-2 gap-2 md:gap-3" : ""}`}
      >
        <div aria-hidden className="aspect-[247/349]" />
        <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-105 group-focus-visible:scale-105">
          <SmartImage
            src={project.cover}
            alt={project.title}
            sizes={landscape ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
          />
        </div>
        <div className="absolute inset-0 hidden items-center justify-center bg-ink/55 p-4 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:hover)]:flex">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-paper">
              {project.title}
            </p>
            {project.subtitle && (
              <p className="mt-2 text-xs text-paper/80">{project.subtitle}</p>
            )}
          </div>
        </div>
      </div>
      {/* Touch devices have no hover, so show the title beneath instead. */}
      <p className="mt-2 font-display text-[11px] font-bold uppercase tracking-[0.2em] [@media(hover:hover)]:hidden">
        {project.title}
      </p>
    </Link>
  );
}
