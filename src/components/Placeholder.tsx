/** Dark panel with a large "?" — stands in for any image or video not supplied yet. */
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
      className={`flex h-full w-full items-center justify-center bg-panel ${className}`}
    >
      <span aria-hidden className="select-none text-6xl font-bold text-faint md:text-8xl">
        ?
      </span>
    </div>
  );
}
