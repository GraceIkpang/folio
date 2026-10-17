import Image from "next/image";
import type { CSSProperties } from "react";
import type { CaseStudyBlock, SectionContent } from "@/content/case-studies";
import { BlockLabel } from "./block-label";
import { SureChargeXJourney } from "./surechargex-journey";

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

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes ?? `(min-width: 720px) ${image.displayWidth}px, 100vw`}
      preload={preload}
      style={bleedStyle}
      className={`h-auto w-full ${
        image.backdrop ? "relative drop-shadow-[0_18px_28px_rgb(21_21_27/0.18)]" : ""
      }`}
    />
  );

  return (
    <figure>
      {image.backdrop ? (
        // The same quiet tile and brand glow as the homepage covers.
        <div
          className="overflow-hidden rounded-[14px] bg-tile bg-[radial-gradient(48%_60%_at_50%_88%,color-mix(in_srgb,var(--glow)_30%,transparent),transparent_75%)]"
          style={{ "--glow": image.backdrop.glow } as CSSProperties}
        >
          {picture}
        </div>
      ) : (
        picture
      )}
      {caption && (
        <figcaption className="flex justify-between gap-4 pt-2.5 text-[12px] leading-[19px] text-muted">
          <span>{caption.start}</span>
          {caption.end && <span>{caption.end}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** A paragraph, bullet list or small table inside a section. */
function SectionPart({ content }: { content: SectionContent }) {
  if (typeof content === "string") return <p>{content}</p>;

  if ("list" in content) {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-muted">
        {content.list.map((item) =>
          typeof item === "string" ? (
            <li key={item}>{item}</li>
          ) : (
            <li key={item.term}>
              <strong className="font-semibold">{item.term}</strong> {item.text}
            </li>
          ),
        )}
      </ul>
    );
  }

  return (
    // Scrolls sideways on small screens instead of squashing the columns.
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[520px] border-collapse text-left text-body">
        <thead>
          <tr className="border-b border-line">
            {content.table.head.map((cell) => (
              <th key={cell} scope="col" className="py-2 pr-4 font-display text-meta font-semibold text-muted">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.table.rows.map((row) => (
            <tr key={row[0]} className="border-b border-line align-top">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="py-2.5 pr-4 font-semibold whitespace-nowrap">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="py-2.5 pr-4 text-muted">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
          {block.heading && (
            <h3 className="pt-2 font-display text-card-title font-semibold">{block.heading}</h3>
          )}
          <div
            className={`flex flex-col ${block.compact ? "gap-4" : "gap-6"} ${
              block.muted ? "pt-3 text-role text-muted" : "pt-4 text-role text-ink"
            }`}
          >
            {block.paragraphs.map((content, i) => (
              <SectionPart key={i} content={content} />
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

    case "screens":
      return (
        <figure className="flex flex-col gap-10">
          {block.label && <BlockLabel {...block.label} />}
          {block.groups.map((group, g) => (
            // Pairs use the same screen width as rows of three, centred with
            // their title, so phones stay in proportion to the text around them.
            <div
              key={g}
              className={group.columns === 2 ? "sm:mx-auto sm:w-[calc((100%-2rem)*2/3+1rem)]" : undefined}
            >
              {group.title && (
                <p className="pb-5 font-display text-meta tracking-[0.78px] text-muted uppercase">
                  {group.title}
                </p>
              )}
              <ol
                className={`grid grid-cols-2 gap-x-4 gap-y-12 ${
                  group.columns === 3 ? "sm:grid-cols-3" : ""
                }`}
              >
                {group.screens.map((screen, i) => (
                  <li key={screen.src} className="flex flex-col">
                    <div className="relative overflow-hidden rounded-[18px] border border-line bg-surface">
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={screen.width}
                        height={screen.height}
                        sizes="(min-width: 640px) 271px, 45vw"
                        className="h-auto w-full"
                      />
                      {screen.highlights?.map((h, k) => (
                        <span
                          key={k}
                          aria-hidden="true"
                          className="absolute rounded-md border-2 border-accent bg-accent/5"
                          style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
                        />
                      ))}
                    </div>
                    <p className="pt-3 text-[14px] leading-[21px]">
                      <span className="font-display font-semibold text-ink">
                        {group.screens.length > 1 && <span className="text-accent">{i + 1} </span>}
                        {screen.label}
                      </span>
                      {screen.note && <span className="block text-muted">{screen.note}</span>}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </figure>
      );

    case "annotated":
      return (
        <figure className="flex flex-col gap-10">
          {block.label && <BlockLabel {...block.label} />}
          <div className="grid gap-8 sm:grid-cols-[260px_1fr] sm:items-start">
            <div className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-[18px] border border-line bg-surface">
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                sizes="260px"
                className="h-auto w-full"
              />
              {block.markers.map((m, i) => (
                <span
                  key={m.title}
                  aria-hidden="true"
                  className="absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-display text-[11px] leading-none font-semibold text-white ring-2 ring-white"
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <div>
              <ol className="flex flex-col gap-3.5">
                {block.markers.map((m, i) => (
                  <li key={m.title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-5 shrink-0 place-items-center rounded-full bg-accent font-display text-[11px] leading-none font-semibold text-white"
                    >
                      {i + 1}
                    </span>
                    <span className="text-body">
                      <span className="font-display font-semibold">{m.title}</span>
                      <span className="block text-muted">{m.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              {block.note && (
                <p className="mt-5 border-t border-line pt-4 text-[12px] leading-[19px] text-muted">
                  {block.note}
                </p>
              )}
            </div>
          </div>
        </figure>
      );

    case "animation":
      return <SureChargeXJourney alt={block.alt} />;

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
