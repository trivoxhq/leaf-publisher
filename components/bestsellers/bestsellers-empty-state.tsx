"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BestsellersEmptyState() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mx-auto max-w-lg rounded-3xl border border-dashed border-line/80 bg-paper px-6 py-12 text-center sm:px-10 sm:py-14"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
      role="status"
    >
      <span
        aria-hidden
        className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-line bg-bg font-display text-2xl font-bold text-green"
      >
        —
      </span>
      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-text">
        No Bestseller Titles Found
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
        Try changing your search, adjusting the category, or exploring all
        available ebooks.
      </p>
      <Link
        href="/browse"
        className="group mt-6 inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-line bg-bg px-6 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
      >
        Browse All Books
        <HiArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}
