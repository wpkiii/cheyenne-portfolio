import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeading from "@/components/PageHeading";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

const label = "text-[15px] font-bold text-muted";

export default function ContactPage() {
  return (
    <div className="px-5 pb-28 md:px-10 md:pb-[8vw]">
      <PageHeading title="Contact">
        <p className="mt-6 max-w-2xl text-lg font-bold leading-snug md:text-[1.55vw]">
          For inquiries or collaborations feel free to contact me.
        </p>
      </PageHeading>
      <div className="grid gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
        <Reveal as="dl" className="space-y-8 text-lg font-bold">
          <div>
            <dt className={label}>Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-muted">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className={label}>Instagram</dt>
            <dd className="mt-1">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-muted"
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
