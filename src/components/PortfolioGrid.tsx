import type { Project } from "@/content/projects";
import ProjectTile from "./ProjectTile";
import Reveal from "./Reveal";

/** Four-column grid (two on mobile); landscape projects span two columns. */
export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-flow-row-dense grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
      {projects.map((project, i) => (
        <Reveal
          as="li"
          key={project.slug}
          delay={(i % 4) * 80}
          className={project.orientation === "landscape" ? "col-span-2" : ""}
        >
          <ProjectTile project={project} />
        </Reveal>
      ))}
    </ul>
  );
}
