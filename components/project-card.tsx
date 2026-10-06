import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/site";
import { Tag } from "./tag";

/** The original homepage card (2×2 grid). Not used since the carousel — kept so
 *  `archive/selected-work-grid` is easy to restore. */
export function ProjectCard({ project }: { project: Project }) {
  const { name, description, image, tags, href } = project;

  return (
    <article className="group relative flex flex-col gap-[14px] rounded-[14px] border border-line bg-surface p-[22px] transition-colors has-[a:hover]:border-muted/40">
      <Image
        src={image}
        alt=""
        width={734}
        height={240}
        sizes="(min-width: 640px) 367px, 100vw"
        className="aspect-[367/120] w-full rounded-3xl object-cover"
      />
      <h3 className="font-display text-card-title font-semibold">
        {href ? (
          // The link stretches over the whole card so any part of it is clickable.
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {name}
          </Link>
        ) : (
          name
        )}
      </h3>
      <p className="text-body text-muted">{description}</p>
      <ul className="flex flex-wrap gap-2" aria-label="Tags">
        {tags.map((tag, index) => (
          <Tag key={tag} highlighted={index === 0}>
            {tag}
          </Tag>
        ))}
      </ul>
    </article>
  );
}
