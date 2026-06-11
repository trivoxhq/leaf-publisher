import type { Metadata } from "next";

import { NewReleasesPage } from "@/components/new-releases/new-releases-page";

export const metadata: Metadata = {
  title: "New Releases | Leaf Publisher",
  description:
    "Explore new releases, fresh ebooks, sample chapters, starter guides, and upcoming titles from Leaf Publisher across publishing, business, self-help, memoir, education, children's books, and more.",
};

export default function NewReleasesRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <NewReleasesPage />
    </div>
  );
}
