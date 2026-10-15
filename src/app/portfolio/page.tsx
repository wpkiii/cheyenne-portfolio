import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 md:pb-32">
      <PageHeading eyebrow="Selected Work" title="Portfolio" />
      <PortfolioGrid projects={projects} />
    </div>
  );
}
