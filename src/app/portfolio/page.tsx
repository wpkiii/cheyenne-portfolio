import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <div className="px-5 pb-28 md:pb-[10vw]">
      <div className="md:px-5">
        <PageHeading title="Portfolio" />
      </div>
      <PortfolioGrid projects={projects} />
    </div>
  );
}
