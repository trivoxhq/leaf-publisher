import type { Metadata } from "next";

import { HelpPage } from "@/components/help/help-page";

export const metadata: Metadata = {
  title: "Help Centre | Leaf Publisher",
  description:
    "Find answers about Leaf Publisher ebook writing, editing, design, formatting, publishing support, payments, and project timelines.",
};

export default function HelpCentreRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <HelpPage />
    </div>
  );
}
