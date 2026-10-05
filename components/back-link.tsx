import Link from "next/link";

type BackLinkProps = {
  href: string;
  label: string;
};

/** A small grey "← Back" link shown at the top of inner pages. */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="self-start text-meta text-muted transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span aria-hidden="true">← </span>
      {label}
    </Link>
  );
}
