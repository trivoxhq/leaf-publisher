import type { Metadata } from "next";

import { PressPage } from "@/components/press/press-page";

export const metadata: Metadata = {
  title: "Press & Media | Leaf Publisher",
  description:
    "Find Leaf Publisher press information, company details, media resources, approved brand description, and contact details for media inquiries.",
};

export default function PressRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <PressPage />
    </div>
  );
}
