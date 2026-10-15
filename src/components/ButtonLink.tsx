import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Pill buttons, as on the reference site.
 * - solid:   white fill, black text (on black backgrounds)
 * - outline: white outline (on black backgrounds)
 * - dark:    black outline (on white backgrounds, e.g. the footer)
 */
export type ButtonVariant = "solid" | "outline" | "dark";

// Every variant fills with the orchid-blue accent on hover.
const variants: Record<ButtonVariant, string> = {
  solid: "border-white bg-white text-black hover:border-accent hover:bg-accent",
  outline: "border-white text-white hover:border-accent hover:bg-accent hover:text-black",
  dark: "border-black text-black hover:border-accent hover:bg-accent",
};

export function buttonClass(variant: ButtonVariant = "outline") {
  return `inline-block rounded-full border px-7 py-3 text-[15px] font-bold tracking-wide transition-colors duration-300 ${variants[variant]}`;
}

export default function ButtonLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant)}>
      {children}
    </Link>
  );
}
