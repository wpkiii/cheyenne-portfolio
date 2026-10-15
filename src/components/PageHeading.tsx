import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Shared top-of-page heading: optional small label + large bold title. */
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
    <Reveal className="pb-12 pt-12 md:pb-[4vw] md:pt-[6vw]">
      {eyebrow && <p className="text-[15px] font-bold text-muted">{eyebrow}</p>}
      <h1 className="mt-3 text-5xl font-bold leading-none tracking-[-0.03em] md:text-[4.45vw]">
        {title}
      </h1>
      {children}
    </Reveal>
  );
}
