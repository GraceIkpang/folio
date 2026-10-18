"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./surechargex-journey.module.css";

const DIR = "/images/case-studies/surechargex/journey";

// Artwork size, and each phone's square export: its size, centre and tilt
// in the artwork, and where its screen sits inside the square.
const STAGE = { w: 1328, h: 747 };
const PHONES = {
  left: { size: 696, cx: 291, cy: 624, tilt: -9.5, screen: [204, 40, 283, 614] },
  middle: { size: 696, cx: 664, cy: 505, tilt: 0, screen: [204, 40, 283, 614] },
  right: { size: 696, cx: 1035, cy: 624, tilt: 9.5, screen: [204, 40, 283, 614] },
} as const;

// The battery counts from the "Start" screen's 23% up to the final 51%,
// while the time left to full charge counts down to 00:32:54.
const BATTERY = { from: 23, to: 51, startAt: 3250, duration: 1750 };
const TIME_LEFT = { from: 51 * 60 + 42, to: 32 * 60 + 54 };
// The scene takes 5s to play, rests on the finished frame for 4s so it can be
// read, then fades out briefly before replaying.
const LOOP = { playFor: 5000, holdFor: 4000, fadeFor: 450 };

type PhoneKey = keyof typeof PHONES;

const pct = (n: number) => `${n}%`;

function phoneStyle(key: PhoneKey): CSSProperties {
  const p = PHONES[key];
  return {
    left: pct(((p.cx - p.size / 2) / STAGE.w) * 100),
    top: pct(((p.cy - p.size / 2) / STAGE.h) * 100),
    width: pct((p.size / STAGE.w) * 100),
    height: pct((p.size / STAGE.h) * 100),
    rotate: `${p.tilt}deg`,
  };
}

function screenStyle(key: PhoneKey): CSSProperties {
  const { size, screen } = PHONES[key];
  const [x, y, w, h] = screen;
  return {
    left: pct((x / size) * 100),
    top: pct((y / size) * 100),
    width: pct((w / size) * 100),
    height: pct((h / size) * 100),
  };
}

function formatTime(seconds: number) {
  const s = Math.round(seconds);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`;
}

/** Slides the green fill so its edge sits at `percent`, and updates the labels. */
function setBattery(
  els: { fill: HTMLElement; percent: HTMLElement; time: HTMLElement },
  progress: number,
) {
  const percent = BATTERY.from + (BATTERY.to - BATTERY.from) * progress;
  els.fill.style.translate = `${-(1 - percent / BATTERY.to) * 100}% 0`;
  els.percent.textContent = String(Math.round(percent));
  els.time.textContent = formatTime(TIME_LEFT.from + (TIME_LEFT.to - TIME_LEFT.from) * progress);
}

const PHONE_SIZES = "(min-width: 900px) 445px, 52vw";
const SCREEN_SIZES = "(min-width: 900px) 180px, 22vw";

/**
 * Three SureChargeX screens that play the journey on a loop while in view:
 * find a station, drive to it, charge. Without JavaScript, or for
 * visitors who ask for reduced motion, it shows the finished scene.
 */
export function SureChargeXJourney({ alt }: { alt: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLImageElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const els = { fill: fillRef.current, percent: percentRef.current, time: timeRef.current };
    if (!stage || !els.fill || !els.percent || !els.time) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const battery = els as { fill: HTMLElement; percent: HTMLElement; time: HTMLElement };

    // "armed" holds every part at its starting point until the scene is seen.
    setBattery(battery, 0);
    stage.dataset.state = "armed";

    let frame = 0;
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    let visible = false;
    let running = false;

    // One pass: play, hold on the finished scene, fade out, then go again
    // if the scene is still on screen (otherwise wait until it is).
    const cycle = () => {
      running = true;
      stage.dataset.state = "play";
      later(BATTERY.startAt, () => {
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / BATTERY.duration);
          setBattery(battery, 1 - (1 - t) ** 3);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });
      later(LOOP.playFor + LOOP.holdFor, () => {
        stage.dataset.state = "fade";
        later(LOOP.fadeFor, () => {
          setBattery(battery, 0);
          stage.dataset.state = "armed";
          running = false;
          // Two frames so the browser registers the reset before replaying.
          requestAnimationFrame(() => requestAnimationFrame(() => visible && cycle()));
        });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !running) cycle();
      },
      { threshold: 0.4 },
    );
    observer.observe(stage);

    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stageRef} role="img" aria-label={alt} data-state="static" className={styles.stage}>
      <Image src={`${DIR}/bg.png`} alt="" width={1328} height={747} sizes="(min-width: 900px) 844px, 100vw" className={`${styles.fill} ${styles.backdrop}`} />

      {/* Left: driving to the station */}
      <div aria-hidden="true" className={`${styles.phone} ${styles.riseLate}`} style={phoneStyle("left")}>
        <Image src={`${DIR}/phone-left.png`} alt="" width={696} height={696} sizes={PHONE_SIZES} className={styles.fill} />
        <div className={styles.screen} style={screenStyle("left")}>
          <svg viewBox="0 0 393 852" fill="none" className={styles.route}>
            <path
              d="M158 354.5L189.5 312.5L191 307.5L194 299L146 224"
              stroke="#25D366"
              strokeWidth="3"
              pathLength={1}
              strokeDasharray={1}
            />
          </svg>
          <Image src={`${DIR}/eta-card.png`} alt="" width={786} height={1704} sizes={SCREEN_SIZES} className={styles.eta} />
        </div>
      </div>

      {/* Right: charging */}
      <div aria-hidden="true" className={`${styles.phone} ${styles.riseLate}`} style={phoneStyle("right")}>
        <Image src={`${DIR}/phone-right.png`} alt="" width={696} height={696} sizes={PHONE_SIZES} className={styles.fill} />
        <div className={styles.screen} style={screenStyle("right")}>
          <div className={styles.track}>
            <Image
              ref={fillRef}
              src={`${DIR}/battery-bright.png`}
              alt=""
              width={379}
              height={148}
              sizes={SCREEN_SIZES}
              className={styles.batteryFill}
            />
          </div>
          <p className={styles.pill}>
            <svg viewBox="0 0 10 16" fill="currentColor" aria-hidden="true">
              <path d="M6.5 0 0 9h4l-1 7 7-9.5H5.8L6.5 0Z" />
            </svg>
            <span className={styles.percent}>
              <span ref={percentRef}>{BATTERY.to}</span>
              <small>%</small>
            </span>
          </p>
          <p className={styles.timer}>
            <strong ref={timeRef}>{formatTime(TIME_LEFT.to)}</strong>
            <span>minutes</span>
          </p>
        </div>
      </div>

      {/* Middle, in front: finding a station */}
      <div aria-hidden="true" className={`${styles.phone} ${styles.rise}`} style={phoneStyle("middle")}>
        <Image src={`${DIR}/phone-middle.png`} alt="" width={696} height={696} sizes={PHONE_SIZES} className={styles.fill} />
        <div className={styles.screen} style={screenStyle("middle")}>
          <span className={styles.pulse} />
          <Image src={`${DIR}/stations-sheet.png`} alt="" width={786} height={1704} sizes={SCREEN_SIZES} className={styles.sheet} />
        </div>
      </div>
    </div>
  );
}
