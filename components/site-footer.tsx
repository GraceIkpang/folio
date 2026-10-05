import { Fragment } from "react";
import { profile, socials } from "@/content/site";

const linkStyle =
  "underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Joins items like "A, B, and C". */
function separator(index: number, count: number) {
  if (index === count - 1) return "";
  if (index === count - 2) return count > 2 ? ", and " : " and ";
  return ", ";
}

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-6 pt-14 pb-20 text-center">
      <h2 className="pb-[18px] font-display text-[26px] leading-10 sm:text-closing sm:leading-(--text-closing--line-height)">
        Have something to build?
      </h2>
      <a
        href={`mailto:${profile.email}`}
        className={`text-card-title font-semibold text-accent ${linkStyle}`}
      >
        {profile.email}
      </a>
      <p className="pt-[26px] text-meta text-muted">
        Also on{" "}
        {socials.map((social, index) => (
          <Fragment key={social.href}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors hover:text-ink ${linkStyle}`}
            >
              {social.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {separator(index, socials.length)}
          </Fragment>
        ))}
        .
      </p>
    </footer>
  );
}
