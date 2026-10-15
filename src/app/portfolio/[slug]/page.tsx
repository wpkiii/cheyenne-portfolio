import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
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
    <article className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 md:pb-32">
      <Link
        href="/portfolio"
        className="mt-8 inline-block font-display text-xs font-bold uppercase tracking-[0.25em] text-grey-3 hover:text-ink"
      >
        ← All work
      </Link>

      <PageHeading eyebrow={project.subtitle} title={project.title}>
        {project.description && (
          <p className="mt-6 max-w-xl leading-relaxed text-grey-2">{project.description}</p>
        )}
      </PageHeading>

      {/* Landscape images span the full width; portrait images sit side by side. */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {project.gallery.map((image, i) => {
          const landscape = image.orientation === "landscape";
          return (
            <Reveal
              key={i}
              className={`relative overflow-hidden ${
                landscape ? "aspect-[3/2] md:col-span-2" : "aspect-[3/4]"
              }`}
            >
              <SmartImage
                src={image.src}
                alt={image.alt ?? `${project.title} — image ${i + 1}`}
                sizes={landscape ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                preload={i === 0}
              />
            </Reveal>
          );
        })}
      </div>

      <nav
        aria-label="More projects"
        className="mt-20 flex justify-between border-t border-mist pt-8 font-display text-xs font-bold uppercase tracking-[0.25em]"
      >
        <Link href={`/portfolio/${prev.slug}`} className="hover:text-grey-3">
          ← {prev.title}
        </Link>
        <Link href={`/portfolio/${next.slug}`} className="hover:text-grey-3">
          {next.title} →
        </Link>
      </nav>
    </article>
  );
}
