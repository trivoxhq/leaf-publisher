import { Suspense } from "react";
import dynamic from "next/dynamic";

import { HeroSection } from "@/components/home/hero-section";

const GenreMarqueeSection = dynamic(() =>
  import("@/components/home/genre-marquee-section").then(
    (m) => m.GenreMarqueeSection
  )
);

const CategoriesSection = dynamic(() =>
  import("@/components/home/categories-section").then(
    (m) => m.CategoriesSection
  )
);

const FeaturedSection = dynamic(() =>
  import("@/components/home/featured-section").then(
    (m) => m.FeaturedSection
  )
);

const PricingSection = dynamic(() =>
  import("@/components/home/pricing-section").then((m) => m.PricingSection)
);

const ProcessSection = dynamic(() =>
  import("@/components/home/process-section").then((m) => m.ProcessSection)
);

const ReadingExperienceSection = dynamic(() =>
  import("@/components/home/reading-experience-section").then(
    (m) => m.ReadingExperienceSection
  )
);

export default function Home() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <HeroSection />
      <Suspense fallback={null}>
        <GenreMarqueeSection />
        <CategoriesSection />
        <FeaturedSection />
        <PricingSection />
        <ProcessSection />
        <ReadingExperienceSection />
      </Suspense>
    </div>
  );
}
