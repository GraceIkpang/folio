import Image from "next/image";
import type { CSSProperties } from "react";
import type { CaseStudyBlock } from "@/content/case-studies";

type ImageData = Extract<CaseStudyBlock, { type: "image" }>["image"];
type CaptionData = { start: string; end?: string };

/** Small pink uppercase label, e.g. "PROBLEM". */
function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="font-display text-meta tracking-[0.78px] text-accent uppercase">
      {children}
    </h2>
  );
}

/** An image with an optional grey caption row underneath. */
export function CaseStudyFigure({
  image,
  caption,
  sizes,
  preload,
  bleed,
}: {
  image: ImageData;
  caption?: CaptionData;
  sizes?: string;
  preload?: boolean;
  bleed?: number;
}) {
  // A bleed widens the image past its column so transparent padding in the
  // file doesn't shrink the visible part.
  const bleedStyle = bleed
    ? { width: `${100 + bleed * 200}%`, marginInline: `-${bleed * 100}%`, maxWidth: "none" }
    : undefined;

  return (
    <figure>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes ?? `(min-width: 720px) ${image.displayWidth}px, 100vw`}
        preload={preload}
        style={bleedStyle}
        className="h-auto w-full"
      />
      {caption && (
        <figcaption className="flex justify-between gap-4 pt-2.5 text-[12px] leading-[19px] text-muted">
          <span>{caption.start}</span>
          {caption.end && <span>{caption.end}</span>}
        </figcaption>
      )}
    </figure>
  );
}

// Space above each block, from the Figma file.
function spaceAbove(block: CaseStudyBlock, previous?: CaseStudyBlock) {
  switch (block.type) {
    case "section":
      if (!previous) return "pt-14";
      if (previous.type === "highlight") return "pt-9";
      if (previous.type === "section") return "pt-[52px]";
      return "pt-11";
    case "quote":
      return "pt-11";
    case "gallery":
      return previous?.type === "section" ? "pt-7" : "pt-[52px]";
    default:
      return "pt-[52px]";
  }
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "section":
      return (
        <section>
          <SectionLabel>{block.title}</SectionLabel>
          <div
            className={`flex flex-col ${block.compact ? "gap-4" : "gap-6"} ${
              block.muted ? "pt-3 text-role text-muted" : "pt-4 text-role text-ink"
            }`}
          >
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {block.subsections && (
              <div className="flex flex-col gap-12">
                {block.subsections.map((sub) => (
                  <div key={sub.title}>
                    <h3 className="font-medium">{sub.title}</h3>
                    <div className="pt-6">
                      {sub.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case "highlight":
      return (
        <div className="flex flex-col gap-1 rounded-[14px] border border-line bg-surface px-[26px] py-6 sm:flex-row sm:items-center sm:gap-[18px]">
          <p
            className={`shrink-0 font-display text-section font-medium text-accent ${
              block.wrap ? "leading-6 sm:max-w-20" : "leading-[53px]"
            }`}
          >
            {block.value}
          </p>
          <p className="text-[12px] leading-[22px] text-muted">{block.text}</p>
        </div>
      );

    case "image":
      return (
        <div className={block.extraSpaceBelow ? "pb-14" : undefined}>
          <CaseStudyFigure image={block.image} caption={block.caption} />
        </div>
      );

    case "gallery":
      return (
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-[18px]">
          {block.items.map((item) => (
            <div
              key={item.image.src}
              // When stacked on small screens, keep small items near their
              // designed size instead of stretching them full width.
              style={
                { flexGrow: item.size, flexBasis: 0, "--stacked-max": `${item.size * 1.3}px` } as CSSProperties
              }
              className="w-full min-w-0 max-sm:max-w-(--stacked-max) max-sm:self-center"
            >
              <CaseStudyFigure
                image={item.image}
                caption={item.caption}
                bleed={item.bleed}
                sizes={`(min-width: 720px) ${item.image.displayWidth}px, 100vw`}
              />
            </div>
          ))}
        </div>
      );

    case "link":
      return (
        <div className="flex flex-col gap-2 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ui text-muted">{block.text}</p>
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-ui font-semibold text-accent underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {block.label} <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      );

    case "quote":
      return (
        <blockquote className="max-w-[410px] -rotate-1 font-hand text-[24px] leading-[34px] text-accent motion-reduce:rotate-0">
          <p>{block.text}</p>
        </blockquote>
      );

    case "polaroid":
      return (
        <figure className="flex justify-center">
          {/* The image includes its shadow, so negative margins let the
              shadow spill over without pushing the text around it away. */}
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes={`${block.image.displayWidth}px`}
            style={{ width: block.image.displayWidth }}
            className="-my-10 h-auto max-w-[calc(100%+4rem)]"
          />
          <figcaption className="sr-only">{block.caption}</figcaption>
        </figure>
      );
  }
}

/** Renders a case study's body, block by block. */
export function CaseStudyBlocks({ blocks: allBlocks }: { blocks: CaseStudyBlock[] }) {
  // Link rows without a link yet are left out entirely.
  const blocks = allBlocks.filter((block) => block.type !== "link" || block.href);

  return (
    <>
      {blocks.map((block, index) => (
        <div
          key={index}
          className={block.spaceAbove === undefined ? spaceAbove(block, blocks[index - 1]) : undefined}
          style={block.spaceAbove === undefined ? undefined : { paddingTop: block.spaceAbove }}
        >
          <Block block={block} />
        </div>
      ))}
    </>
  );
}
