import Link from "next/link";
import { site } from "@/content/site";
import CurrentYear from "./CurrentYear";
import ContactForm from "./ContactForm";

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** White footer: name and links on top, the contact form across the full width. */
export default function Footer() {
  return (
    <footer className="bg-white px-5 pt-6 text-black md:px-8">
      <div className="border-b border-black py-10 md:px-2 md:py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Link href="/" className="text-4xl font-bold tracking-[-0.03em]">
            {site.name}
          </Link>
          <div className="text-[15px] font-bold md:text-right">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <InstagramIcon />
              {site.instagramHandle}
            </a>
            <p className="mt-2">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                {site.email}
              </a>
            </p>
          </div>
        </div>
        <h2 className="mt-12 text-3xl font-bold tracking-[-0.02em] md:mt-16">Get in Touch</h2>
        <div className="mt-5">
          <ContactForm compact />
        </div>
      </div>
      <div className="flex flex-col gap-3 py-6 text-xs font-bold md:flex-row md:items-center md:justify-between">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <ul className="flex gap-6 underline underline-offset-2">
          <li>
            <Link href="/privacy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/accessibility" className="transition-colors hover:text-accent">
              Accessibility Statement
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
