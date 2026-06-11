import type { Metadata } from "next";

import { BrowsePage } from "@/components/browse/browse-page";

export const metadata: Metadata = {
  title: "Browse Ebooks | Leaf Publisher",
  description:
    "Browse ebooks on Leaf Publisher across fiction, business, self-help, memoir, education, wellness, technology, children's books, and more.",
};

export default function BrowseRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <BrowsePage />
    </div>
  );
}
