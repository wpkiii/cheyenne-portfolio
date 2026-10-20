import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/content/site";
import { getHeroMedia, type HeroMedia as Media } from "@/content/siteContent";
import HeroVideo from "./HeroVideo";
import SmartImage from "./SmartImage";

/*
 * Mirrors the reference hero (measured at 1440px wide and scaled in vw):
 * a centered media frame with the role on its left, and the full name huge
 * underneath.
 *
 * Motion (globals.css): on load each line rises out of a mask, the frame wipes
 * open and the orchid blooms; on scroll the frame sinks, the orchid floats up
 * and the name drifts left.
 */
const label = "font-bold uppercase leading-[1.1] tracking-[-0.03em]";

/** One line of text that rises into view on load, `delay` ms after the page appears. */
function RiseLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="intro-mask">
      <span className="intro-line" style={{ "--intro-delay": `${delay}ms` } as CSSProperties}>
        {children}
      </span>
    </span>
  );
}

function HeroMedia({ media }: { media: Media }) {
  const label = `${site.name} — featured work`;
  if (media.video) return <HeroVideo src={media.video} poster={media.image} label={label} />;
  return (
    <SmartImage src={media.image} alt={label} sizes="(min-width: 768px) 60vw, 100vw" preload />
  );
}

/** A video sets the frame's shape (within 1:1 to 2.1:1), so nothing is cropped. */
function frameRatio(media: Media) {
  if (!media.video || !media.width || !media.height) return undefined;
  return Math.min(Math.max(media.width / media.height, 1), 2.1);
}

export default async function Hero() {
  const media = await getHeroMedia();
  const ratio = frameRatio(media);
  const [role] = site.roles;

  return (
    <section className="overflow-x-clip pb-16 pt-8 md:pb-[6vw] md:pt-[6.5vw]">
      <h1 className="sr-only">
        {site.name} — {role}
      </h1>

      <div className="relative">
        <p
          aria-hidden
          className={`${label} px-5 text-5xl md:absolute md:left-5 md:top-1/2 md:-translate-y-1/2 md:px-0 md:text-[3.55vw]`}
        >
          <RiseLine delay={500}>{role}</RiseLine>
        </p>

        {/* Outer wrapper sinks on scroll; inner frame wipes open on load. */}
        <div
          className={`scroll-parallax relative mx-5 mt-6 md:mx-auto md:mt-0 md:w-[59.45vw] ${
            ratio ? "" : "aspect-[4/3] md:aspect-[856/423]"
          }`}
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          <div className="intro-wipe absolute inset-0 overflow-hidden">
            <HeroMedia media={media} />
          </div>
          {/* The orchid from Cheyenne's previous site, pinned over the frame's top-right corner. */}
          <div className="scroll-float pointer-events-none absolute -right-8 -top-12 z-10 w-36 md:-right-[5.5vw] md:-top-[6vw] md:w-[12.5vw]">
            <Image
              src="/images/brand/orchid.png"
              alt=""
              width={736}
              height={736}
              preload
              className="orchid w-full"
            />
          </div>
        </div>

      </div>

      {/* Sized so the full name spans the width with ~40px side margins at desktop;
          on phones each word gets its own line so it stays big. */}
      <div className="scroll-drift mt-10 md:mt-[5.5vw]">
        <p
          aria-hidden
          className="px-5 text-[17.5vw] font-bold uppercase leading-[0.9] tracking-[-0.03em] md:flex md:justify-center md:gap-[0.25em] md:whitespace-nowrap md:px-0 md:text-[9.7vw] md:leading-[0.85]"
        >
          {site.name.split(" ").map((word, i) => (
            <RiseLine key={i} delay={800 + i * 120}>
              {word}
            </RiseLine>
          ))}
        </p>
      </div>
    </section>
  );
}
