import Link from "next/link";
import { site } from "@/content/site";
import CurrentYear from "./CurrentYear";
import NewsletterForm from "./NewsletterForm";

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** White footer split by a vertical rule, as on the reference site. */
export default function Footer() {
  return (
    <footer className="bg-white px-5 pt-6 text-black md:px-8">
      <div className="grid border-b border-black md:grid-cols-2">
        <div className="py-10 md:border-r md:border-black md:py-14 md:pl-2 md:pr-10">
          <Link href="/" className="text-4xl font-bold tracking-[-0.03em]">
            {site.name}
          </Link>
          <h2 className="mt-16 text-3xl font-bold tracking-[-0.02em] md:mt-56">
            Stay Connected with Us
          </h2>
          <NewsletterForm />
        </div>

        <div className="flex flex-col justify-end gap-10 border-t border-black py-10 md:flex-row md:items-end md:justify-around md:border-t-0 md:py-14">
          <div className="text-[15px] font-bold">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.instagramHandle}`}
              className="inline-block hover:opacity-60"
            >
              <InstagramIcon />
            </a>
            <p className="mt-2">
              <a href={`mailto:${site.email}`} className="hover:opacity-60">
                {site.email}
              </a>
            </p>
          </div>
          <ul className="space-y-1 text-[15px] font-bold underline underline-offset-2">
            <li>
              <Link href="/privacy" className="hover:opacity-60">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:opacity-60">
                Accessibility Statement
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="py-6 text-xs font-bold">
        © <CurrentYear /> {site.name}
      </p>
    </footer>
  );
}
