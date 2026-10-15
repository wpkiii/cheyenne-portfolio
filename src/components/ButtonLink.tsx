import Link from "next/link";
import type { ReactNode } from "react";

export const buttonClass =
  "inline-block border border-ink px-10 py-4 font-display text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-ink hover:text-paper";

export default function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={buttonClass}>
      {children}
    </Link>
  );
}
