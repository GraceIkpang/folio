import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Shared frame for the homepage and explorations: header, content, footer. */
export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="mx-auto w-full max-w-[900px] px-5 sm:px-7">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
