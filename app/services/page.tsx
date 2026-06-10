import type { Metadata } from "next";

import { ServicesPage } from "@/components/about/services-page";

export const metadata: Metadata = {
  title: "Services — Leaf Publisher",
  description:
    "Professional ebook writing, editing, design, formatting, and publishing support for authors ready to launch polished digital books.",
};

export default function ServicesRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <ServicesPage />
    </div>
  );
}
