import dynamic from "next/dynamic";
import { Suspense } from "react";

import { SiteHeader } from "@/components/site-header";

const SiteCtaBanner = dynamic(
  () =>
    import("@/components/site-cta-banner").then((m) => m.SiteCtaBanner),
  { loading: () => null }
);

const SiteFooter = dynamic(
  () => import("@/components/site-footer").then((m) => m.SiteFooter),
  { loading: () => null }
);

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip">
        {children}
      </main>
      <Suspense fallback={null}>
        <SiteCtaBanner />
        <SiteFooter />
      </Suspense>
    </>
  );
}
