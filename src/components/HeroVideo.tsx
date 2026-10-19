"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's muted, looping video, with a pause button (anything that moves for
 * more than five seconds needs one). Stays paused on its poster when the
 * visitor's device asks for reduced motion.
 */
export default function HeroVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string | null;
  label: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    // The autoPlay attribute starts it before this code even loads; visitors who
    // ask for reduced motion get it paused instead.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }
    // Browsers only autoplay muted video. Set it as a property too: an uploaded
    // video can have sound, and the attribute alone isn't always honored.
    el.muted = true;
    el.defaultMuted = true;
    const start = () => {
      if (el.paused) el.play().catch(() => {});
    };
    start();
    // Retry once enough has loaded, and on the first touch or scroll: iPhones in
    // Low Power Mode refuse autoplay but allow play after any interaction.
    const events = ["canplay", "loadeddata"] as const;
    const gestures = ["touchstart", "pointerdown", "scroll", "keydown"] as const;
    events.forEach((e) => el.addEventListener(e, start, { once: true }));
    gestures.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => {
      events.forEach((e) => el.removeEventListener(e, start));
      gestures.forEach((e) => window.removeEventListener(e, start));
    };
  }, []);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <>
      <video
        ref={video}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-3 left-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80 md:bottom-4 md:left-4"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
          {playing ? (
            <path d="M3 2h3.5v12H3zM9.5 2H13v12H9.5z" />
          ) : (
            <path d="M4 2l10 6-10 6z" />
          )}
        </svg>
      </button>
    </>
  );
}
