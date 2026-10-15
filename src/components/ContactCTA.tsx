import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";

export default function ContactCTA() {
  return (
    <section className="px-5 pb-28 pt-10 md:px-10 md:pb-[14vw]">
      <Reveal>
        <h2 className="text-5xl font-bold tracking-[-0.03em] md:text-[4.45vw] md:leading-none">
          Get In Touch
        </h2>
        <p className="mt-6 text-lg font-bold md:text-[1.55vw]">
          For inquiries or collaborations feel free to contact me.
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact" variant="solid">
            Contact
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
