import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { ButtonLink } from "@/components/button-link";
import { CaseStudyBlocks, CaseStudyFigure } from "@/components/case-study-blocks";
import {
  caseStudies,
  getCaseStudy,
  getUpcomingCaseStudy,
  upcomingCaseStudies,
  type UpcomingCaseStudy,
} from "@/content/case-studies";

// Build one page per case study ahead of time.
export function generateStaticParams() {
  return [...caseStudies, ...upcomingCaseStudies].map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug) ?? getUpcomingCaseStudy(slug);
  return study
    ? { title: `${study.name} — Grace Ikpang`, description: study.summary }
    : {};
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const upcoming = getUpcomingCaseStudy(slug);
  if (upcoming) return <ComingSoon study={upcoming} />;

  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="mx-auto max-w-[664px] border-b border-line">
      <div className="flex items-center justify-between pt-11">
        <BackLink href="/work" label="Work" />
        <p className="text-meta text-muted">{study.year}</p>
      </div>

      <header className="border-b border-line pt-9 pb-[30px]">
        <p className="pt-2.5 pb-2.5">
          <span className="inline-block rounded-full bg-accent-soft px-2.5 py-1 text-tag font-medium text-accent">
            {study.category}
          </span>
        </p>
        <h1 className="font-display text-[36px] leading-[52px] font-semibold sm:text-[44px] sm:leading-[68px]">
          {study.name}
        </h1>
        <p className="max-w-[505px] pt-3 text-lead text-muted">{study.summary}</p>

        <dl className="flex flex-wrap gap-x-7 gap-y-4 pt-[26px]">
          {study.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="pb-0.5 text-meta text-muted">{fact.label}</dt>
              <dd className="font-display text-meta font-semibold">{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt className="pb-0.5 text-meta text-muted">Status</dt>
            <dd className="flex items-center gap-1.5 font-display text-meta font-semibold">
              <span className="size-[7px] rounded-full bg-accent" aria-hidden="true" />
              {study.status}
            </dd>
          </div>
        </dl>

        {study.website && (
          <div className="pt-6">
            <ButtonLink
              href={study.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5"
            >
              Visit website
              <span aria-hidden="true" className="text-hint">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          </div>
        )}
      </header>

      <div className="pt-11">
        <CaseStudyFigure image={study.hero} caption={study.heroCaption} preload />
      </div>

      <CaseStudyBlocks blocks={study.blocks} />

      <BackToWork />
    </main>
  );
}

/** "Back to portfolio ← All work", shown at the end of every case study. */
function BackToWork() {
  return (
    <div className="mt-[60px] border-t border-line pt-11 pb-20 text-center">
      <Link
        href="/work"
        className="group inline-flex flex-col items-center gap-2.5 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span className="text-[12px] leading-[19px] tracking-[0.72px] text-muted uppercase">
          Back to portfolio
        </span>
        <span className="font-display text-[26px] leading-10 transition-colors group-hover:text-accent">
          <span aria-hidden="true">← </span>All work
        </span>
      </Link>
    </div>
  );
}

/** A placeholder page for a project whose case study isn't ready yet. */
function ComingSoon({ study }: { study: UpcomingCaseStudy }) {
  return (
    <main className="mx-auto max-w-[664px] border-b border-line">
      <div className="pt-11">
        <BackLink href="/work" label="Work" />
      </div>

      <header className="pt-9">
        <p className="pt-2.5 pb-2.5">
          <span className="inline-block rounded-full bg-accent-soft px-2.5 py-1 text-tag font-medium text-accent">
            {study.platform}
          </span>
        </p>
        <h1 className="font-display text-[36px] leading-[52px] font-semibold sm:text-[44px] sm:leading-[68px]">
          {study.name}
        </h1>
        <p className="max-w-[505px] pt-3 text-lead text-muted">{study.summary}</p>
      </header>

      <div className="mt-11 flex flex-col items-center gap-2 rounded-[14px] border border-line bg-surface px-6 py-16 text-center">
        <p className="font-hand text-[28px] leading-9 text-accent">Coming soon</p>
        <p className="text-ui text-muted">
          I’m putting this case study together. Check back shortly.
        </p>
      </div>

      <BackToWork />
    </main>
  );
}
