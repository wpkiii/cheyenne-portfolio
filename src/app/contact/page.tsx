import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-8 md:pb-32">
      <PageHeading eyebrow="Get in Touch" title="Contact">
        <p className="mt-6 max-w-xl leading-relaxed text-grey-2">
          For bookings, styling inquiries and creative collaborations, send a note below or reach
          out directly.
        </p>
      </PageHeading>
      <div className="grid gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
        <Reveal as="dl" className="space-y-8">
          <div>
            <dt className="font-display text-xs font-bold uppercase tracking-[0.25em] text-grey-3">
              Email
            </dt>
            <dd className="mt-2">
              <a href={`mailto:${site.email}`} className="hover:text-grey-3">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-xs font-bold uppercase tracking-[0.25em] text-grey-3">
              Instagram
            </dt>
            <dd className="mt-2">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-grey-3"
              >
                {site.instagramHandle}
              </a>
            </dd>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
