import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <div className="px-5 pb-28 md:px-10 md:pb-[8vw]">
      <PageHeading title="Portfolio" />
      <PortfolioGrid projects={projects} />
    </div>
  );
}
