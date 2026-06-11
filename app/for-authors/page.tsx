import type { Metadata } from "next";

import { ForAuthorsPage } from "@/components/for-authors/for-authors-page";

export const metadata: Metadata = {
  title: "For Authors | Leaf Publisher Ebook Writing, Editing and Publishing Support",
  description:
    "Leaf Publisher helps authors write, edit, design, format, and prepare ebooks for publishing. Start your book project with professional author support.",
};

export default function ForAuthorsRoute() {
  return (
    <div className="fa-authors-page flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <ForAuthorsPage />
    </div>
  );
}
