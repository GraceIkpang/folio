import Image from "next/image";
import type { CSSProperties } from "react";
import type { WorkCover as WorkCoverData } from "@/content/site";
import { LoopingVideo } from "./looping-video";

/**
 * A project cover drawn the same way every time: a quiet tile in the page's
 * own tones, a soft glow of the product's brand colour, and one device
 * (a phone, or a website as a plain rounded screen) centred and rising out
 * of the bottom edge.
 * Only the screenshot and the glow colour change from project to project.
 * Finished artwork can instead sit inset in the same tile ("inset").
 */
export function WorkCover({ cover }: { cover: WorkCoverData }) {
  if (cover.kind === "inset") return <Inset cover={cover} />;
  const glow = { "--glow": cover.glow ?? "transparent" } as CSSProperties;

  return (
    <div className="absolute inset-0 bg-tile [container-type:inline-size]" style={glow}>
      {/* Wider for a browser window, so the colour still shows around it. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${
          cover.kind === "phone"
            ? "bg-[radial-gradient(55%_45%_at_50%_82%,color-mix(in_srgb,var(--glow)_34%,transparent),transparent_75%)]"
            : "bg-[radial-gradient(70%_55%_at_50%_85%,color-mix(in_srgb,var(--glow)_40%,transparent),transparent_75%)]"
        }`}
      />
      {cover.kind === "phone" ? <Phone cover={cover} /> : <Browser cover={cover} />}
    </div>
  );
}

const DEVICE_SHADOW =
  "shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2cqw_5cqw_-1cqw_rgb(21_21_27/0.22)]";

function Phone({ cover }: { cover: WorkCoverData }) {
  return (
    <div
      className={`showcase-image absolute top-[12%] left-1/2 w-[44%] -translate-x-1/2 rounded-[7.2cqw] bg-[#121214] p-[1.3cqw] ${DEVICE_SHADOW}`}
    >
      <Image
        src={cover.src}
        alt=""
        width={cover.width}
        height={cover.height}
        sizes="(min-width: 640px) 190px, 40vw"
        className="h-auto w-full rounded-[6cqw]"
      />
    </div>
  );
}

function Browser({ cover }: { cover: WorkCoverData }) {
  return (
    <div
      className={`showcase-image absolute top-[12%] left-1/2 w-[84%] -translate-x-1/2 overflow-hidden rounded-[1.8cqw] bg-surface ${DEVICE_SHADOW}`}
    >
      {cover.video ? (
        // Plays only while the card is on screen; the poster shows otherwise.
        <LoopingVideo
          src={cover.video}
          poster={cover.src}
          width={cover.width}
          height={cover.height}
          className="block h-auto w-full"
        />
      ) : (
        <Image
          src={cover.src}
          alt=""
          width={cover.width}
          height={cover.height}
          sizes="(min-width: 640px) 350px, 72vw"
          className="h-auto w-full"
        />
      )}
    </div>
  );
}

/** Finished artwork set inside the tile with an even border on every side. */
function Inset({ cover }: { cover: WorkCoverData }) {
  // A clip starts at the same top and width as inset artwork, then runs off
  // the bottom edge. Clips are made near-square so only the bottom is hidden.
  if (cover.video) {
    return (
      <div className="absolute inset-0 bg-tile px-[4.5%] pt-[4.5%]">
        <div className="showcase-image relative h-full w-full overflow-hidden rounded-t-[8px] shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
          <LoopingVideo
            src={cover.video}
            poster={cover.src}
            width={cover.width}
            height={cover.height}
            className="absolute inset-0 block h-full w-full object-cover object-left-top"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-tile p-[4.5%]">
      <div className="showcase-image relative h-full w-full overflow-hidden rounded-[8px] shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 640px) 380px, 78vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
