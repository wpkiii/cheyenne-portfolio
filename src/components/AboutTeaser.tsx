import { site } from "@/content/site";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

/**
 * Reference layout: big "About" title, portrait on the left, and the bio
 * starting just inside the portrait's right edge so the text overlaps it.
 * The home page passes the short intro, the About page the full bio.
 */
export default function AboutTeaser({
  as: Title = "h2",
  image,
  paragraphs,
  button,
}: {
  as?: "h1" | "h2";
  image: string | null;
  paragraphs: string[];
  button?: { href: string; label: string };
}) {
  return (
    <section className="px-5 py-20 md:px-10 md:py-[7vw]">
      <Reveal>
        <Title className="text-5xl font-bold tracking-[-0.03em] md:text-[4.45vw] md:leading-none">
          About
        </Title>
      </Reveal>

      <div className="mt-10 md:mt-[4vw] md:grid md:grid-cols-[41.7vw_1fr] md:items-start">
        <Reveal className="relative aspect-square w-full overflow-hidden">
          <SmartImage
            src={image}
            alt={`Portrait of ${site.name}`}
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-[60%_50%]"
          />
        </Reveal>

        <Reveal
          delay={150}
          className="relative mt-8 md:-ml-[3.2vw] md:mt-[4vw] md:max-w-[45vw]"
        >
          <h3 className="text-[15px] font-bold">{site.about.heading}</h3>
          <div className="mt-8 space-y-7 text-lg font-bold leading-snug md:pl-[0.35vw] md:text-[1.35vw]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {button && (
            <div className="mt-12">
              <ButtonLink href={button.href}>{button.label}</ButtonLink>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
