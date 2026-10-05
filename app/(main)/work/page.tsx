import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { ProductRow } from "@/components/product-row";
import { liveProducts, workPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Work — Grace Ikpang",
  description: workPage.intro,
};

export default function WorkPage() {
  return (
    <main className="border-b border-line">
      <div className="flex flex-col pt-14 pb-5">
        <BackLink href="/#work" label="Back to home" />
        <h1 className="max-w-[414px] pt-8 font-display text-[32px] leading-[44px] font-semibold sm:text-[40px] sm:leading-[62px]">
          {workPage.headline}
        </h1>
        <p className="max-w-[526px] pt-3.5 text-lead text-muted">{workPage.intro}</p>
      </div>

      <ol className="pt-5 pb-14">
        {liveProducts.map((product, index) => (
          <ProductRow
            key={product.name}
            product={product}
            number={String(index + 1).padStart(2, "0")}
          />
        ))}
      </ol>
    </main>
  );
}
