"use client";

import { useEffect, useRef } from "react";

type LoopingVideoProps = {
  src: string;
  poster: string;
  width: number;
  height: number;
  className?: string;
  /** Show play/pause and the timeline (for the full video on a shot's page). */
  controls?: boolean;
  /** Describes the video for screen readers. Leave out for decorative previews. */
  label?: string;
};

/**
 * A silent, looping video that only plays while it's on screen.
 * Visitors who ask their device for reduced motion see the still poster
 * instead (they can still press play when controls are shown).
 */
export function LoopingVideo({
  src,
  poster,
  width,
  height,
  className = "",
  controls = false,
  label,
}: LoopingVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Browsers may refuse autoplay (e.g. low-power mode); the poster stays up then.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      tabIndex={controls ? undefined : -1}
      className={className}
    />
  );
}
