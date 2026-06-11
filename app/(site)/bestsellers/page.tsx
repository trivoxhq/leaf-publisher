import type { Metadata } from "next";

import { BestsellersPage } from "@/components/bestsellers/bestsellers-page";

export const metadata: Metadata = {
  title: "Bestsellers | Leaf Publisher",
  description:
    "Explore Leaf Publisher bestselling-style ebooks, featured picks, popular reads, and standout titles across business, fiction, self-help, memoir, education, publishing, and more.",
};

export default function BestsellersRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <BestsellersPage />
    </div>
  );
}
