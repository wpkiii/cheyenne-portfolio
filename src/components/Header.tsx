"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-black">
        <div className="flex h-16 items-center justify-between px-5 md:px-8">
          {/* The name always carries the full blue highlight. */}
          <Link href="/" className="text-[15px] font-bold uppercase tracking-tight">
            <span className="nav-mark nav-mark--filled">{site.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-7 pr-6 text-[15px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="font-bold uppercase"
                  >
                    <span className="nav-mark">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="relative h-6 w-7 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-white transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-1.5 left-0 h-0.5 w-full bg-white transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`fixed inset-x-0 top-16 bottom-0 z-30 bg-black transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-5 pt-10">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                tabIndex={open ? 0 : -1}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="text-5xl font-bold uppercase tracking-tight"
              >
                <span className="nav-mark">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
