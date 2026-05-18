import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import { SiteCtaBanner } from "@/components/site-cta-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

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
        <SiteCtaBanner />
        <SiteFooter />
      </body>
    </html>
  );
}
