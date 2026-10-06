"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SelectedWork } from "@/content/site";

/**
 * Selected work as a horizontal carousel of big, image-led cards.
 *
 * The track sits inside the content column, so it starts and stops at the
 * page margins; two cards show at a time on desktop, one plus a peek on
 * phones. Native scrolling + snap points mean trackpad, touch and keyboard
 * all work without a motion library.
 *
 * The original 2×2 card grid is saved under the git tag
 * `archive/selected-work-grid` (it used components/project-card.tsx).
 */
export function WorkCarousel({ items }: { items: SelectedWork[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
      setAtStart(track.scrollLeft <= 2);
      // Snap points stop before the very end, so "end" means the last card is fully in view.
      const last = track.lastElementChild;
      setAtEnd(
        !last || last.getBoundingClientRect().right <= track.getBoundingClientRect().right + 2,
      );
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function step(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <div>
      {/* A hairline of padding (8px) gives the hover growth room without visibly breaking the margin. */}
      <ul
        ref={trackRef}
        aria-label="Works"
        className="-mx-2 -my-3 flex snap-x snap-mandatory scroll-px-2 gap-4 overflow-x-auto px-2 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <WorkCard key={item.name} item={item} />
        ))}
      </ul>

      <div className="flex items-center gap-4 pt-6">
        <div className="flex gap-2">
          <ArrowButton label="Previous project" disabled={atStart} onClick={() => step(-1)}>
            ←
          </ArrowButton>
          <ArrowButton label="Next project" disabled={atEnd} onClick={() => step(1)}>
            →
          </ArrowButton>
        </div>
        {/* Scroll position, as a thin progress line. */}
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div
            className="h-full w-1/3 rounded-full bg-muted"
            style={{ transform: `translateX(${progress * 200}%)` }}
          />
        </div>
      </div>
    </div>
  );
}

function WorkCard({ item }: { item: SelectedWork }) {
  const { name, tagline, href, image } = item;

  return (
    <li className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)]">
      <article className="showcase-card group relative">
        <div className="showcase-frame relative aspect-[8/7] overflow-hidden rounded-[14px] border border-line bg-surface">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 414px, 85vw"
            className="showcase-image object-cover"
          />
          {href && (
            <span
              aria-hidden="true"
              className="showcase-chip absolute top-4 right-4 rounded-full bg-ink/85 px-3 py-1.5 text-[12px] leading-[19px] text-white backdrop-blur-sm"
            >
              View case study →
            </span>
          )}
        </div>
        <div className="flex flex-col gap-0.5 pt-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="shrink-0 font-display text-[15px] leading-6 font-semibold tracking-[0.04em] uppercase">
            {href ? (
              // The link stretches over the whole card so any part of it is clickable.
              <Link
                href={href}
                className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          <p className="text-meta text-muted sm:truncate">{tagline}</p>
        </div>
      </article>
    </li>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className="grid size-9 place-items-center rounded-full border border-line text-ui text-ink transition-[background-color,opacity] duration-200 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
