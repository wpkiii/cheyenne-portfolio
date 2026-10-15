import AboutTeaser from "@/components/AboutTeaser";
import ButtonLink from "@/components/ButtonLink";
import ContactCTA from "@/components/ContactCTA";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/projects";

// The home page previews the first few projects; the rest live on /portfolio.
const HOME_PROJECT_COUNT = 6;

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-labelledby="work-heading" className="mx-auto max-w-7xl px-4 pt-24 sm:px-8 md:pt-32">
        <Reveal>
          <h2
            id="work-heading"
            className="mb-10 font-display text-xs font-bold uppercase tracking-[0.35em]"
          >
            Selected Work
          </h2>
        </Reveal>
        <PortfolioGrid projects={projects.slice(0, HOME_PROJECT_COUNT)} />
        <Reveal className="mt-12 text-center">
          <ButtonLink href="/portfolio">View All Work</ButtonLink>
        </Reveal>
      </section>
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
