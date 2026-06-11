import type { Metadata } from "next";

import { SuccessStoriesPage } from "@/components/success-stories/success-stories-page";

export const metadata: Metadata = {
  title: "Success Stories | Leaf Publisher",
  description:
    "Explore Leaf Publisher author journeys, ebook transformations, and success story examples showing how ideas and manuscripts can become polished digital books.",
};

export default function SuccessStoriesRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <SuccessStoriesPage />
    </div>
  );
}
