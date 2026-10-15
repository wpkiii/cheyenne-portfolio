import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 md:pb-32">
      <PageHeading eyebrow={site.roles.join(" · ")} title="About" />
      <div className="grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal className="relative aspect-[3/4] w-full overflow-hidden">
          <SmartImage
            src={site.about.image}
            alt={`Portrait of ${site.name}`}
            sizes="(min-width: 768px) 50vw, 100vw"
            preload
          />
        </Reveal>
        <Reveal delay={150} className="md:pt-8">
          <h2 className="font-display text-3xl font-thin uppercase tracking-tight md:text-4xl">
            {site.about.heading}
          </h2>
          <div className="mt-8 space-y-5 leading-relaxed text-grey-2">
            {site.about.long.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/portfolio">View Work</ButtonLink>
            <ButtonLink href="/contact">Contact</ButtonLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
