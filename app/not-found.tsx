import type { Metadata } from "next";

import { NotFoundPage } from "@/components/not-found/not-found-page";

export const metadata: Metadata = {
  title: "Page Not Found | Leaf Publisher",
  description:
    "The page you are looking for could not be found. Return to Leaf Publisher home, browse ebooks, explore categories, or contact support.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
