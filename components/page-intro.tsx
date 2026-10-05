import type { ReactNode } from "react";
import { BackLink } from "./back-link";

type PageIntroProps = {
  back: { href: string; label: string };
  title: string;
  /** Small grey text on the right of the title. */
  aside?: string;
  children?: ReactNode;
};

/** The top of an inner page: a back link, the page title and an intro. */
export function PageIntro({ back, title, aside, children }: PageIntroProps) {
  return (
    <div className="flex flex-col gap-4 pb-7">
      <BackLink href={back.href} label={back.label} />
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-[28px] leading-9 font-semibold sm:text-closing sm:leading-(--text-closing--line-height)">
          {title}
        </h1>
        {aside && <p className="shrink-0 text-meta text-muted">{aside}</p>}
      </div>
      {children}
    </div>
  );
}
