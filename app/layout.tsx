import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts ship with the site (from @fontsource-variable) so they load
// without calling Google Fonts.
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

const spaceGrotesk = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
});

const caveat = localFont({
  src: "../node_modules/@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2",
  variable: "--font-caveat",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "Grace Ikpang · Product Designer",
  description:
    "Product designer working across product design, design systems, and interaction design.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
