import type { Metadata } from "next";

import { RoyaltiesPage } from "@/components/royalties/royalties-page";

export const metadata: Metadata = {
  title: "Royalties | Leaf Publisher",
  description:
    "Learn how ebook royalties, platform fees, pricing, payouts, and author earnings may work with Leaf Publisher's publishing support.",
};

export default function RoyaltiesRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <RoyaltiesPage />
    </div>
  );
}
