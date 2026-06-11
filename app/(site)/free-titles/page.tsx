import type { Metadata } from "next";

import { FreeTitlesPage } from "@/components/free-titles/free-titles-page";

export const metadata: Metadata = {
  title: "Free Titles | Leaf Publisher",
  description:
    "Explore free ebooks, sample chapters, starter guides, and short reads from Leaf Publisher across writing, publishing, business, self-help, children's books, education, and more.",
};

export default function FreeTitlesRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <FreeTitlesPage />
    </div>
  );
}
