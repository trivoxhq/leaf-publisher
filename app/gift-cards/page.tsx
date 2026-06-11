import type { Metadata } from "next";

import { GiftCardsPage } from "@/components/gift-cards/gift-cards-page";

export const metadata: Metadata = {
  title: "Gift Cards | Leaf Publisher",
  description:
    "Give a Leaf Publisher gift card to support ebook writing, editing, formatting, design, and publishing services for authors, entrepreneurs, and creative writers.",
};

export default function GiftCardsRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <GiftCardsPage />
    </div>
  );
}
