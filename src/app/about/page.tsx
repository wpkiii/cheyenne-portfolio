import type { Metadata } from "next";
import AboutTeaser from "@/components/AboutTeaser";
import { site } from "@/content/site";
import { getAbout } from "@/content/siteContent";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const about = await getAbout();
  return (
    <>
      <AboutTeaser
        as="h1"
        image={about.image}
        paragraphs={about.bio}
        button={{ href: "/portfolio", label: `${site.firstName}’s Work` }}
      />
    </>
  );
}
