import Link from "next/link";
import type { Project } from "@/content/projects";
import SmartImage from "./SmartImage";

/** Grid card: the title always sits centered over the image; the image zooms gently on hover. */
export default function ProjectTile({ project }: { project: Project }) {
  const landscape = project.orientation === "landscape";
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`group relative block overflow-hidden focus-visible:outline-offset-4 ${
        landscape ? "aspect-[773/547]" : "aspect-[387/547]"
      }`}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.04] group-focus-visible:scale-[1.04]">
        <SmartImage
          src={project.cover}
          alt=""
          // Lift the placeholder "?" so it doesn't sit behind the centered title.
          className="[&>span]:-translate-y-[0.75em]"
          sizes={landscape ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 28vw, 72vw"}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        <h3 className="text-2xl font-bold leading-tight tracking-tight [text-shadow:0_1px_12px_rgb(0_0_0/0.35)] md:text-[1.95vw]">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
