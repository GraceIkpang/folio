import Link from "next/link";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  /** Small grey text on the right of the title, e.g. "2023 — now". */
  aside?: string;
  /** Turns the aside into a link. */
  asideHref?: string;
  children: ReactNode;
};

/** A page section: title row, then content, with a divider underneath. */
export function Section({ id, title, aside, asideHref, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="scroll-mt-6 border-b border-line py-14"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id={headingId} className="font-display text-section font-semibold">
          {title}
        </h2>
        {aside &&
          (asideHref ? (
            <Link
              href={asideHref}
              className="text-meta text-muted transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {aside}
            </Link>
          ) : (
            <p className="text-right text-meta text-muted">{aside}</p>
          ))}
      </div>
      <div className="pt-7">{children}</div>
    </section>
  );
}
