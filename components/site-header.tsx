import Link from "next/link";
import { navigation, profile } from "@/content/site";
import { LocalClock } from "./local-clock";

export function SiteHeader() {
  return (
    <header className="flex flex-col gap-[19px] border-b border-line pt-14 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div>
          <Link href="/" className="font-display text-brand font-semibold">
            {profile.name}
          </Link>
          <p className="pt-1 text-ui text-muted">{profile.tagline}</p>
        </div>
        <nav aria-label="Main">
          <ul className="flex gap-[22px]">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ui text-muted transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <LocalClock city={profile.city} timeZone={profile.timeZone} />
    </header>
  );
}
