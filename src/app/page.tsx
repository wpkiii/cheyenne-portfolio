import AboutTeaser from "@/components/AboutTeaser";
import ButtonLink from "@/components/ButtonLink";
import ContactCTA from "@/components/ContactCTA";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Reveal from "@/components/Reveal";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-labelledby="work-heading" className="px-5 pt-10 md:px-10 md:pt-[6vw]">
        <Reveal>
          <h2
            id="work-heading"
            className="mb-8 text-5xl font-bold tracking-[-0.03em] md:mb-[3vw] md:text-[4.45vw] md:leading-none"
          >
            Selected Work
          </h2>
        </Reveal>
        {/* Featured looks only; the full set lives on /portfolio. */}
        <PortfolioGrid projects={featuredProjects} />
        <Reveal className="mt-12 text-center md:mt-[5vw]">
          <ButtonLink href="/portfolio">View All Work</ButtonLink>
        </Reveal>
      </section>
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
