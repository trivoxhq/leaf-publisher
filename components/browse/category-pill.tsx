"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import type { PopularCategory } from "@/components/browse/browse-data";

type CategoryPillProps = {
  category: PopularCategory;
};

export function CategoryPill({ category }: CategoryPillProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div whileHover={reduceMotion ? undefined : { y: -2 }}>
      <Link
        href="/categories"
        className="group inline-flex items-center rounded-full border border-line/80 bg-bg px-5 py-2.5 text-sm font-semibold text-text shadow-[0_8px_28px_-20px_rgba(26,34,24,0.12)] transition-all duration-300 hover:border-green/40 hover:bg-paper hover:shadow-[0_12px_36px_-18px_rgba(133,199,39,0.2)]"
      >
        {category.label}
      </Link>
    </motion.div>
  );
}
