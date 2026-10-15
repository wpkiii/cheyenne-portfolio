import ButtonLink from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start px-4 py-32 sm:px-8">
      <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-grey-3">404</p>
      <h1 className="mt-4 font-display text-5xl font-thin uppercase leading-none tracking-tight md:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-md leading-relaxed text-grey-2">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </div>
  );
}
