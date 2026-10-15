import Link from "next/link";
import { site } from "@/content/site";
import CurrentYear from "./CurrentYear";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-mist">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="font-display text-lg font-light uppercase tracking-[0.3em]"
          >
            {site.name}
          </Link>
          <p className="mt-4 max-w-xs text-sm text-grey-3">{site.tagline}</p>
        </div>

        <div>
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em]">
            Newsletter
          </h2>
          <NewsletterForm />
        </div>

        <div>
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em]">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-grey-3">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-grey-3"
              >
                Instagram {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 pb-10 text-xs text-grey-3 sm:flex-row sm:justify-between sm:px-8">
        <p>
          © <CurrentYear /> {site.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/accessibility" className="hover:text-ink">
            Accessibility Statement
          </Link>
        </div>
      </div>
    </footer>
  );
}
