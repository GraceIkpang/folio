"use client";

import { useEffect, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

function applyTheme(theme: Theme) {
  const set = () => document.documentElement.setAttribute("data-theme", theme);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // A soft cross-fade of the whole page where the browser supports it.
  if (!reduce && document.startViewTransition) document.startViewTransition(set);
  else set();
}

/**
 * Sun and moon toggle for the header. The icons themselves animate from the
 * <html data-theme> attribute (see globals.css), so they're right on the very
 * first paint, before React has loaded.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  // Until someone picks, follow the device if its setting changes.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {}
      applyTheme(query.matches ? "dark" : "light");
    };
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, []);

  function toggle() {
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="theme-toggle relative grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {/* Sun: a round face with rays that spin away into the moon. */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-sun absolute size-[18px]">
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        <g className="theme-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
      </svg>
      {/* Moon: a crescent with two tiny stars that twinkle. */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-moon absolute size-[18px]">
        <path
          d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6Z"
          fill="currentColor"
        />
        <path className="theme-star" d="M17 3.2l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" fill="var(--color-accent)" />
        <path className="theme-star theme-star-late" d="M21 8.2l.35.9.9.35-.9.35-.35.9-.35-.9-.9-.35.9-.35z" fill="var(--color-accent)" />
      </svg>
    </button>
  );
}
