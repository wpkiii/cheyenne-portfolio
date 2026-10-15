/** Grey box with a large "?" — stands in for any image not supplied yet. */
export default function Placeholder({
  label = "Image coming soon",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex h-full w-full items-center justify-center bg-mist ${className}`}
    >
      <span
        aria-hidden
        className="select-none font-display text-6xl font-thin text-grey-4 md:text-8xl"
      >
        ?
      </span>
    </div>
  );
}
