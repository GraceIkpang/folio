import { ExperienceList } from "@/components/experience-list";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SnapshotStrip } from "@/components/snapshot-strip";
import { UiShotCard } from "@/components/ui-shot-card";
import { experience, projects, shots, snapshots } from "@/content/site";

export default function Home() {
  return (
    <main>
      <Hero />

      <Section
        id="work"
        title="Selected work"
        aside="Show 6 live products"
        asideHref="/work"
      >
        <div className="grid gap-[18px] sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="ui-shots"
        title="UI shots"
        aside="Show all explorations"
        asideHref="/explorations"
      >
        <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-4">
          {shots.map((shot) => (
            <UiShotCard key={shot.slug} shot={shot} />
          ))}
        </div>
      </Section>

      <Section id="off-screen" title="Off-screen" aside="A few personal snapshots">
        <SnapshotStrip snapshots={snapshots} />
      </Section>

      <Section id="experience" title="Experience" aside="2023 — now">
        <ExperienceList roles={experience} />
      </Section>
    </main>
  );
}
