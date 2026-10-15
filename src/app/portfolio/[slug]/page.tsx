import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="px-5 pb-28 md:px-10 md:pb-[8vw]">
      <Link
        href="/portfolio"
        className="mt-8 inline-block text-[15px] font-bold text-muted transition-colors hover:text-accent"
      >
        ← All Work
      </Link>

      <PageHeading eyebrow={project.subtitle} title={project.title}>
        {project.description && (
          <p className="mt-6 max-w-2xl text-lg font-bold leading-snug">{project.description}</p>
        )}
      </PageHeading>

      {/*
        Like the look clusters on Cheyenne's previous site: the photos sit side by
        side at one shared height, centered, each at its true aspect ratio.
      */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-5">
        {project.gallery.map((image, i) => (
          <Reveal key={image.src} delay={(i % 4) * 100}>
            <Image
              src={image.src}
              alt={`${project.title} — image ${i + 1}`}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              preload={i === 0}
              className="h-auto w-full md:h-[70vh] md:w-auto"
            />
          </Reveal>
        ))}
      </div>

      <nav
        aria-label="More projects"
        className="mt-20 flex justify-between gap-6 border-t border-accent pt-8 text-lg font-bold md:text-2xl"
      >
        <Link href={`/portfolio/${prev.slug}`} className="transition-colors hover:text-accent">
          ← {prev.title}
        </Link>
        <Link href={`/portfolio/${next.slug}`} className="text-right transition-colors hover:text-accent">
          {next.title} →
        </Link>
      </nav>
    </article>
  );
}
