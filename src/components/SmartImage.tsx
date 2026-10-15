"use client";

import Image from "next/image";
import { useState } from "react";
import Placeholder from "./Placeholder";

/**
 * Fills its (positioned) parent. Renders the "?" placeholder when src is null,
 * otherwise a next/image that sharpens from a blur once loaded.
 */
export default function SmartImage({
  src,
  alt,
  sizes,
  preload = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (!src) return <Placeholder label={alt} className={className} />;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      onLoad={() => setLoaded(true)}
      data-loaded={loaded}
      className={`blur-load object-cover ${className}`}
    />
  );
}
