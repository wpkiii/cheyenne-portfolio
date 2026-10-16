import Link from "next/link";
import { ViewTransition } from "react";
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
        {/* Shares a name with the project page's first photo, so it morphs into it. */}
        <ViewTransition name={`look-${project.slug}`} share="morph" default="none">
          <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-105 group-focus-visible:scale-105">
            <SmartImage
              src={project.cover?.src ?? null}
              alt={project.title}
              sizes={landscape ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
            />
          </div>
        </ViewTransition>
        <div className="absolute inset-0 hidden items-center justify-center bg-black/55 p-4 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:hover)]:flex">
          <div>
            <p className="text-xl font-bold tracking-tight text-white">{project.title}</p>
            {project.subtitle && (
              <p className="mt-1 text-sm font-bold text-accent">{project.subtitle}</p>
            )}
            {/* Blue accent bar grows in under the title. */}
            <span
              aria-hidden
              className="mx-auto mt-3 block h-1 w-0 bg-accent transition-[width] delay-100 duration-500 ease-out-soft group-hover:w-10 group-focus-visible:w-10"
            />
          </div>
        </div>
      </div>
      {/* Touch devices have no hover, so show the title beneath instead. */}
      <p className="mt-2 text-sm font-bold [@media(hover:hover)]:hidden">{project.title}</p>
    </Link>
  );
}
