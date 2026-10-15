import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Shared top-of-page heading: small bold eyebrow + large thin title. */
export default function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="pb-12 pt-12 md:pb-16 md:pt-20">
      {eyebrow && (
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-grey-3">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-4 font-display text-5xl font-thin uppercase leading-none tracking-tight md:text-7xl">
        {title}
      </h1>
      {children}
    </Reveal>
  );
}
