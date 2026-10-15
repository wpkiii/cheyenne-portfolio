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
      <section aria-labelledby="work-heading" className="px-5 pt-10 md:pt-[6vw]">
        <h2 id="work-heading" className="sr-only">
          Selected Work
        </h2>
        <PortfolioGrid projects={projects.slice(0, HOME_PROJECT_COUNT)} />
        <Reveal className="mt-20 text-center md:mt-[10vw]">
          <ButtonLink href="/portfolio">View All Work</ButtonLink>
        </Reveal>
      </section>
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
