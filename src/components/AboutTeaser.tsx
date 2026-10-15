import { site } from "@/content/site";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

export default function AboutTeaser() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-24 sm:px-8 md:grid-cols-2 md:gap-20 md:py-32">
      <Reveal className="relative aspect-[3/4] w-full overflow-hidden">
        <SmartImage
          src={site.about.image}
          alt={`Portrait of ${site.name}`}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </Reveal>
      <Reveal delay={150}>
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-grey-3">About</p>
        <h2 className="mt-4 font-display text-4xl font-thin uppercase tracking-tight md:text-5xl">
          {site.about.heading}
        </h2>
        <p className="mt-6 max-w-md leading-relaxed text-grey-2">{site.about.short}</p>
        <div className="mt-10">
          <ButtonLink href="/portfolio">{site.name}&rsquo;s Work</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
