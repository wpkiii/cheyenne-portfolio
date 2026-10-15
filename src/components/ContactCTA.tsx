import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";

export default function ContactCTA() {
  return (
    <section className="bg-ink text-paper">
      <Reveal className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-8 md:py-32">
        <h2 className="font-display text-4xl font-thin uppercase tracking-tight md:text-6xl">
          Get in Touch
        </h2>
        <p className="mx-auto mt-6 max-w-md text-paper/70">
          For bookings, inquiries and collaborations, reach out — I&rsquo;d love to hear about your
          project.
        </p>
        <div className="mt-10 [&_a]:border-paper [&_a:hover]:bg-paper [&_a:hover]:text-ink">
          <ButtonLink href="/contact">Contact</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
