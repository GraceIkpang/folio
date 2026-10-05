import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { UiShotCard } from "@/components/ui-shot-card";
import { shots } from "@/content/site";

export const metadata: Metadata = {
  title: "UI shots — Grace Ikpang",
  description: "Loose screens and interface explorations by Grace Ikpang.",
};

export default function ExplorationsPage() {
  return (
    <main className="border-b border-line py-14">
      <PageIntro
        back={{ href: "/#ui-shots", label: "Back to home" }}
        title="UI shots"
        aside={`${shots.length} explorations`}
      >
        <p className="max-w-[526px] text-lead text-muted">
          Loose screens and interface explorations — small ideas I wanted to
          try outside of client work.
        </p>
      </PageIntro>
      <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-4">
        {shots.map((shot) => (
          <UiShotCard key={shot.slug} shot={shot} />
        ))}
      </div>
    </main>
  );
}
