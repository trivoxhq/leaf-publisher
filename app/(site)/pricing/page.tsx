import type { Metadata } from "next";

import { PricingSection } from "@/components/home/pricing-section";

export const metadata: Metadata = {
  title: "Pricing — Leaf Publisher",
  description:
    "Simple, transparent plans for readers and authors. Start free, upgrade when you're ready.",
};

export default function PricingPage() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <PricingSection />
    </div>
  );
}
