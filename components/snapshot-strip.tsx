import Image from "next/image";
import type { Snapshot } from "@/content/site";

// One tiny light dot centred in a 13px strip — the film "sprocket hole".
const sprocket =
  "h-[13px] bg-[radial-gradient(50.1%_809.24%_at_50%_50%,var(--color-canvas)_1%,transparent_1.14%)]";

function FilmFrame({ snapshot, number }: { snapshot: Snapshot; number: string }) {
  return (
    <li className="w-[210px] shrink-0 rounded-[3px] bg-film">
      <div className={sprocket} aria-hidden="true" />
      <div className="px-2">
        {snapshot.image ? (
          <Image
            src={snapshot.image}
            alt={snapshot.caption}
            width={388}
            height={291}
            sizes="194px"
            className="h-[145.5px] w-full object-cover"
          />
        ) : (
          <div
            className="h-[145.5px] bg-[linear-gradient(150deg,var(--color-accent-soft)_7.74%,#26242a_71.13%)]"
            role="img"
            aria-label={`${snapshot.caption} (photo coming soon)`}
          />
        )}
      </div>
      <div className={sprocket} aria-hidden="true" />
      <div className="flex items-center justify-between px-3 pt-2 pb-1 font-display text-caption tracking-[0.22px]">
        <span className="font-semibold text-accent">{number}</span>
        <span className="text-film-caption">{snapshot.caption}</span>
      </div>
    </li>
  );
}

/** A horizontally scrolling film strip of personal photos. */
export function SnapshotStrip({ snapshots }: { snapshots: Snapshot[] }) {
  return (
    <>
      <p className="font-display text-hint text-accent" aria-hidden="true">
        scroll to browse →
      </p>
      <div
        className="-mx-1 mt-3.5 overflow-x-auto focus-visible:outline-2 focus-visible:outline-accent"
        tabIndex={0}
        role="region"
        aria-label="Personal snapshots, scrollable"
      >
        <ul className="flex w-max gap-0.5 px-1 pt-1 pb-[22px]">
          {snapshots.map((snapshot, index) => (
            <FilmFrame
              key={snapshot.caption}
              snapshot={snapshot}
              number={String(index + 1).padStart(2, "0")}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
