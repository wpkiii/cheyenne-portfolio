import { site } from "@/content/site";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

export default function Hero() {
  const [first, second = first, ...rest] = site.roles;
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-8 md:pt-12">
      <Reveal>
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em]">{first}</p>
      </Reveal>

      <Reveal delay={150} className="relative mt-6 aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9]">
        <SmartImage src={site.hero.image} alt={`${site.name} — featured work`} sizes="100vw" preload />
      </Reveal>

      <div className="mt-8 flex flex-col gap-2 md:mt-12 md:flex-row md:items-end md:justify-between">
        <Reveal delay={250}>
          <h1 className="font-display text-6xl font-thin uppercase leading-none tracking-tight sm:text-8xl lg:text-9xl">
            {site.name.split(" ").map((part) => (
              <span key={part} className="block">
                {part}
              </span>
            ))}
          </h1>
        </Reveal>
        <Reveal delay={350} className="md:text-right">
          <p className="font-display text-sm font-extralight uppercase tracking-[0.3em] sm:text-base">
            {second}
          </p>
          {rest.length > 0 && (
            <p className="mt-1 font-display text-sm font-extralight uppercase tracking-[0.3em] text-grey-3 sm:text-base">
              {rest.join(" · ")}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
