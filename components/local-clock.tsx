"use client";

import { useEffect, useState } from "react";

type LocalClockProps = {
  city: string;
  timeZone: string;
};

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

/** A live clock showing the current time in the given city. */
export function LocalClock({ city, timeZone }: LocalClockProps) {
  // Starts empty so the server and browser render the same thing,
  // then ticks every second once the page is running in the browser.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatTime(timeZone));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <p className="text-meta text-muted tabular-nums">
      {city} · <time aria-label={`Local time in ${city}`}>{time ?? "--:--:--"}</time>
    </p>
  );
}
