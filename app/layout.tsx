import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const SiteCtaBanner = dynamic(
  () =>
    import("@/components/site-cta-banner").then((m) => m.SiteCtaBanner),
  { loading: () => null }
);

const SiteFooter = dynamic(
  () => import("@/components/site-footer").then((m) => m.SiteFooter),
  { loading: () => null }
);

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  /* Display type on site uses semibold / bold only — fewer files to download */
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Leaf Publisher",
  description: "Publish, discover, and read — Leaf Publisher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nunito.variable} ${cormorantGaramond.variable} h-full max-w-full overflow-x-clip antialiased`}
    >
      {/* overflow-x-clip: clips horizontal bleed without turning body into a scrollport (sticky header breaks with overflow-x-hidden + visible-y). */}
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) inject attrs like cz-shortcut-listen on body */}
      <body
        suppressHydrationWarning
        className="flex min-h-full min-w-0 flex-col overflow-x-clip font-sans"
      >
        <SiteHeader />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip">{children}</main>
        <Suspense fallback={null}>
          <SiteCtaBanner />
          <SiteFooter />
        </Suspense>
      </body>
    </html>
  );
}
