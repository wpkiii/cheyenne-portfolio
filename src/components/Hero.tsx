import { site } from "@/content/site";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

/*
 * Mirrors the reference hero (measured at 1440px wide and scaled in vw):
 * a centered media frame, the first role on the left, the second role on the
 * right running off the edge of the screen, and the full name huge underneath.
 */
const label = "font-bold uppercase leading-[1.1] tracking-[-0.03em]";

function HeroMedia() {
  const { video, image } = site.hero;
  if (video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={video}
        poster={image ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-label={`${site.name} — featured work`}
      />
    );
  }
  return (
    <SmartImage src={image} alt={`${site.name} — featured work`} sizes="(min-width: 768px) 60vw, 100vw" preload />
  );
}

export default function Hero() {
  const [left, right = left] = site.roles;
  const [rightTop, ...rightRest] = right.split(" ");

  return (
    <section className="overflow-x-clip pb-16 pt-8 md:pb-[6vw] md:pt-[6.5vw]">
      <h1 className="sr-only">
        {site.name} — {site.roles.join(", ")}
      </h1>

      <div aria-hidden className="relative">
        <Reveal className="px-5 text-5xl md:absolute md:left-5 md:top-1/2 md:-translate-y-1/2 md:px-0 md:text-[3.55vw]">
          <p className={label}>{left}</p>
        </Reveal>

        <Reveal
          delay={100}
          className="relative mx-5 mt-6 aspect-[4/3] overflow-hidden md:mx-auto md:mt-0 md:aspect-[856/423] md:w-[59.45vw]"
        >
          <HeroMedia />
        </Reveal>

        {/* Deliberately overflows the right edge, like the reference. */}
        <Reveal
          delay={200}
          className="mt-6 pl-[42vw] text-5xl md:absolute md:left-[84.1vw] md:top-1/2 md:mt-0 md:-translate-y-1/2 md:pl-0 md:text-[3.55vw]"
        >
          <p className={`${label} whitespace-nowrap text-center`}>
            {rightTop}
            <br />
            {rightRest.join(" ")}
          </p>
        </Reveal>
      </div>

      <Reveal delay={300} className="mt-10 md:mt-[5.5vw]">
        {/* Sized so the full name spans the width with ~40px side margins at desktop;
            on phones each word gets its own line so it stays big. */}
        <p
          aria-hidden
          className="px-5 text-[17.5vw] font-bold uppercase leading-[0.9] tracking-[-0.03em] md:whitespace-nowrap md:px-0 md:text-center md:text-[9.7vw] md:leading-[0.85]"
        >
          {site.name.split(" ").map((word, i) => (
            <span key={i} className="block md:inline">
              {i > 0 && <span className="hidden md:inline"> </span>}
              {word}
            </span>
          ))}
        </p>
      </Reveal>
    </section>
  );
}
