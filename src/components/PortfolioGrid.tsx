import type { Project } from "@/content/projects";
import ProjectTile from "./ProjectTile";
import Reveal from "./Reveal";

/**
 * Editorial grid from the reference: two projects per row pushed to opposite
 * edges with a wide gutter between them. Portrait tiles are ~28% wide and
 * landscape ~55%, so both share the same height.
 */
export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const rows: Project[][] = [];
  for (let i = 0; i < projects.length; i += 2) rows.push(projects.slice(i, i + 2));

  return (
    <div className="flex flex-col gap-y-16 md:gap-y-[16.5vw]">
      {rows.map((row) => (
        <ul key={row[0].slug} className="flex flex-col gap-y-16 md:flex-row md:justify-between">
          {row.map((project, i) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={i * 120}
              className={
                project.orientation === "landscape"
                  ? "w-full md:w-[55.2%]"
                  : // On phones, narrow tiles hug the side they sit on in the row.
                    `w-[72%] md:w-[27.65%] ${i === 1 ? "self-end md:self-auto" : ""}`
              }
            >
              <ProjectTile project={project} />
            </Reveal>
          ))}
        </ul>
      ))}
    </div>
  );
}
