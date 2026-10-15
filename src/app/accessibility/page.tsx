import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl px-5 pb-28 md:px-10 md:pb-[8vw]">
      <PageHeading title="Accessibility" />
      <div className="space-y-6 text-lg font-bold leading-snug">
        <p>
          We want this site to be usable by everyone and aim to meet WCAG 2.2 AA. Pages support
          keyboard navigation, include a skip-to-content link, describe images with alternative
          text, and respect your system&rsquo;s reduced-motion setting.
        </p>
        <p>
          If something is hard to use, please let us know at{" "}
          <a href={`mailto:${site.email}`} className="underline transition-colors hover:text-accent">
            {site.email}
          </a>{" "}
          and we&rsquo;ll fix it.
        </p>
      </div>
    </div>
  );
}
