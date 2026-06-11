import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Leaf Publisher | Ebook Writing, Editing, Design and Publishing Support",
  description:
    "Contact Leaf Publisher for ebook writing, editing, formatting, design, and publishing support. Tell us about your book project and get professional guidance.",
};

export default function ContactRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <ContactPage />
    </div>
  );
}
