import ButtonLink from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <div className="px-5 py-28 md:px-10 md:py-[10vw]">
      <p className="text-[15px] font-bold text-muted">404</p>
      <h1 className="mt-3 text-5xl font-bold leading-none tracking-[-0.03em] md:text-[4.45vw]">
        Page not found
      </h1>
      <p className="mt-6 text-lg font-bold">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <div className="mt-10">
        <ButtonLink href="/" variant="solid">
          Back Home
        </ButtonLink>
      </div>
    </div>
  );
}
