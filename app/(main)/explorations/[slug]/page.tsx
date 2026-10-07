import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { LoopingVideo } from "@/components/looping-video";
import { PageIntro } from "@/components/page-intro";
import { Tag } from "@/components/tag";
import { WindowFrame } from "@/components/window-frame";
import { shots } from "@/content/site";

// Build one page per shot ahead of time.
export function generateStaticParams() {
  return shots.map((shot) => ({ slug: shot.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/explorations/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const shot = shots.find((s) => s.slug === slug);
  return shot
    ? { title: `${shot.name} · Grace Ikpang`, description: shot.summary }
    : {};
}

export default async function ShotPage(props: PageProps<"/explorations/[slug]">) {
  const { slug } = await props.params;
  const index = shots.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const shot = shots[index];
  const previous = shots[(index - 1 + shots.length) % shots.length];
  const next = shots[(index + 1) % shots.length];

  return (
    <main className="border-b border-line py-14">
      <PageIntro back={{ href: "/explorations", label: "All explorations" }} title={shot.name}>
        <p className="max-w-[526px] text-lead text-muted">{shot.summary}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {shot.tags.map((tag, i) => (
            <Tag key={tag} highlighted={i === 0}>
              {tag}
            </Tag>
          ))}
        </ul>
        {shot.liveUrl && (
          <div className="pt-2">
            <ButtonLink href={shot.liveUrl} target="_blank" rel="noopener noreferrer" className="px-5">
              View it live
              <span aria-hidden="true" className="text-hint">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          </div>
        )}
      </PageIntro>

      <div className="flex flex-col gap-[18px]">
        {shot.labels && <BlockLabel {...shot.labels.video} />}
        {shot.video && (
          <WindowFrame>
            <LoopingVideo
              src={shot.video.src}
              poster={shot.video.poster}
              width={shot.video.width}
              height={shot.video.height}
              label={shot.video.label}
              controls
              className="h-auto w-full rounded-md"
            />
          </WindowFrame>
        )}
        {shot.labels && (
          <div className="pt-10">
            <BlockLabel {...shot.labels.screens} />
          </div>
        )}
        {shot.screens.length > 0 ? (
          shot.screens.map((screen, i) => (
            <WindowFrame key={screen.src}>
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(min-width: 900px) 822px, 100vw"
                preload={i === 0}
                className="h-auto w-full rounded-md"
              />
            </WindowFrame>
          ))
        ) : (
          <WindowFrame>
            <div className="flex aspect-[16/10] items-center justify-center rounded-md bg-[linear-gradient(160deg,var(--color-accent-soft),transparent_70%)]">
              <p className="text-meta text-muted">Full design coming soon</p>
            </div>
          </WindowFrame>
        )}
      </div>

      <nav
        aria-label="More explorations"
        className="mt-14 flex justify-between gap-4 border-t border-line pt-6 text-meta"
      >
        <Link href={`/explorations/${previous.slug}`} className="group flex flex-col gap-1">
          <span className="text-muted">← Previous</span>
          <span className="font-display text-card-title font-semibold transition-colors group-hover:text-accent">
            {previous.name}
          </span>
        </Link>
        <Link href={`/explorations/${next.slug}`} className="group flex flex-col items-end gap-1 text-right">
          <span className="text-muted">Next →</span>
          <span className="font-display text-card-title font-semibold transition-colors group-hover:text-accent">
            {next.name}
          </span>
        </Link>
      </nav>
    </main>
  );
}

/** A short pink handwritten heading with a grey line under it, like the KIPA case study. */
function BlockLabel({ title, text }: { title: string; text: string }) {
  return (
    <div className="-mb-2 flex flex-col gap-0.5">
      <h2 className="font-hand text-[20px] leading-7 text-accent">{title}</h2>
      <p className="text-[12px] leading-[19px] text-muted">{text}</p>
    </div>
  );
}
