import type { ReactNode } from "react";

type WindowFrameProps = {
  children: ReactNode;
  className?: string;
};

/** A minimal browser window: a light bar with one dot, then the content. */
export function WindowFrame({ children, className = "" }: WindowFrameProps) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-line bg-surface ${className}`}>
      <div className="flex h-[22px] items-center border-b border-line bg-canvas px-2" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-muted/50" />
      </div>
      <div className="px-2.5 pb-2.5">{children}</div>
    </div>
  );
}
