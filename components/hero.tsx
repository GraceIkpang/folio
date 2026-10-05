import { profile } from "@/content/site";
import { ButtonLink } from "./button-link";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-16 pb-14">
      <h1
        id="hero-heading"
        className="max-w-[446px] font-display text-[36px] leading-[42px] font-semibold sm:text-display sm:leading-(--text-display--line-height)"
      >
        {profile.headline}
      </h1>
      <div className="flex max-w-[526px] flex-col gap-[25px] pt-[18px] text-lead text-muted">
        {profile.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="flex flex-wrap gap-[14px] pt-[26px]">
        <ButtonLink href={`mailto:${profile.email}`}>Let&apos;s talk</ButtonLink>
        <ButtonLink
          href={profile.resume}
          download="Grace Ikpang - Resume.pdf"
          variant="secondary"
        >
          Download resume <span aria-hidden="true">↓</span>
        </ButtonLink>
      </div>
    </section>
  );
}
