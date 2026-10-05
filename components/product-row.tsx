import Link from "next/link";
import type { LiveProduct } from "@/content/site";

type ProductRowProps = {
  product: LiveProduct;
  number: string;
};

/** One numbered row in the live products list. */
export function ProductRow({ product, number }: ProductRowProps) {
  const { name, summary, platform, caseStudy, href } = product;

  const content = (
    <>
      <span className="pt-1 font-display text-meta text-muted sm:pt-0">{number}</span>
      <div>
        <h2 className="font-display text-[22px] leading-[30px] font-semibold sm:text-[28px] sm:leading-[43px]">
          {name}
        </h2>
        <p className="pt-1.5 text-body text-muted">{summary}</p>
      </div>
      <span className="col-start-2 row-start-2 mt-3 justify-self-start rounded-full bg-accent-soft px-2.5 py-1 text-[11px] leading-[17px] font-medium text-accent sm:col-start-auto sm:row-start-auto sm:mt-0 sm:mr-6">
        {platform}
      </span>
      <span
        aria-hidden="true"
        className="text-[20px] leading-[31px] text-muted transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-ink motion-reduce:transition-none"
      >
        →
      </span>
    </>
  );

  const layout =
    "group grid grid-cols-[40px_1fr_20px] items-start gap-x-3 py-6 sm:grid-cols-[72px_1fr_auto_20px] sm:items-center sm:gap-x-0 sm:pt-[29px] sm:pb-7";

  return (
    <li className="border-t border-line">
      {caseStudy ? (
        <Link
          href={caseStudy}
          className={`${layout} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
        >
          {content}
        </Link>
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${layout} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
        >
          {content}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <div className={layout}>{content}</div>
      )}
    </li>
  );
}
