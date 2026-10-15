import type { Metadata } from "next";
import PageHeading from "@/components/PageHeading";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-8 md:pb-32">
      <PageHeading eyebrow="Legal" title="Accessibility" />
      <div className="space-y-5 leading-relaxed text-grey-2">
        <p>
          We want this site to be usable by everyone and aim to meet WCAG 2.2 AA. Pages support
          keyboard navigation, include a skip-to-content link, describe images with alternative
          text, and respect your system&rsquo;s reduced-motion setting.
        </p>
        <p>
          If something is hard to use, please let us know at{" "}
          <a href={`mailto:${site.email}`} className="underline hover:text-ink">
            {site.email}
          </a>{" "}
          and we&rsquo;ll fix it.
        </p>
      </div>
    </div>
  );
}
