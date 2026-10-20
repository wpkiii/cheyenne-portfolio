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
  // iPhones in Low Power Mode refuse to autoplay any video, but Safari still
  // plays an MP4 shown as an <img> (like a GIF), so it falls back to that.
  const [asImage, setAsImage] = useState(false);
  // Once the visitor pauses, nothing restarts it but the play button.
  const userPaused = useRef(false);

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
      if (!el.paused || userPaused.current) return;
      el.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "NotAllowedError" && isSafari()) {
          setAsImage(true);
        }
      });
    };
    start();
    // Retry once enough has loaded, and on the first tap or key press (other
    // browsers that block autoplay allow play after one).
    const events = ["canplay", "loadeddata"] as const;
    const gestures = ["touchend", "click", "pointerup", "keydown"] as const;
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
    userPaused.current = asImage || !el.paused;
    if (asImage) {
      // Pausing the <img> fallback shows the still video instead.
      setAsImage(false);
      el.pause();
    } else if (el.paused) el.play().catch(() => {});
    else el.pause();
  };
  const moving = asImage || playing;

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
      {asImage && (
        // eslint-disable-next-line @next/next/no-img-element -- an MP4, which next/image can't handle
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={moving ? "Pause video" : "Play video"}
        className="absolute bottom-3 left-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80 md:bottom-4 md:left-4"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current">
          {moving ? (
            <path d="M3 2h3.5v12H3zM9.5 2H13v12H9.5z" />
          ) : (
            <path d="M4 2l10 6-10 6z" />
          )}
        </svg>
      </button>
    </>
  );
}

/** Safari, and every browser on iPhone and iPad (they all use Safari's engine). */
function isSafari() {
  const ua = navigator.userAgent;
  return /iP(hone|ad|od)/.test(ua) || (/Safari\//.test(ua) && !/Chrome|Chromium|Android/.test(ua));
}
