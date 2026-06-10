import type { Metadata } from "next";

import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About Leaf Publisher | Ebook Writing, Editing, Design and Publishing",
  description:
    "Learn about Leaf Publisher, a full-service ebook writing, editing, design, and publishing support platform helping authors create polished digital books.",
};

export default function AboutRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <AboutPage />
    </div>
  );
}
