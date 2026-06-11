import type { Metadata } from "next";

import { CategoriesPage } from "@/components/categories/categories-page";

export const metadata: Metadata = {
  title: "Ebook Categories | Leaf Publisher",
  description:
    "Explore Leaf Publisher ebook categories including fiction, business, self-help, memoir, education, wellness, finance, technology, poetry, and more.",
};

export default function CategoriesRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <CategoriesPage />
    </div>
  );
}
