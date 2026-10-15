import AboutTeaser from "@/components/AboutTeaser";
import ContactCTA from "@/components/ContactCTA";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/projects";

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
        <PortfolioGrid projects={projects} />
      </section>
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
