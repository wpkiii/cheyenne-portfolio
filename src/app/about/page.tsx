import type { Metadata } from "next";
import AboutTeaser from "@/components/AboutTeaser";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <AboutTeaser as="h1" />
      <ContactCTA />
    </>
  );
}
