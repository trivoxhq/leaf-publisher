"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { BrowseBook } from "@/components/browse/browse-data";

type BookCardProps = {
  book: BrowseBook;
  layout?: "grid" | "compact";
};

export function BookCard({ book, layout = "grid" }: BookCardProps) {
  const reduceMotion = useReducedMotion();
  const isCompact = layout === "compact";

  return (
    <motion.article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/80 bg-bg shadow-[0_20px_60px_-36px_rgba(26,34,24,0.14)] transition-[border-color,box-shadow] duration-300 hover:border-green/35 hover:shadow-[0_28px_70px_-32px_rgba(133,199,39,0.2)] ${
        isCompact ? "sm:flex-row" : ""
      }`}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-paper ${
          isCompact
            ? "aspect-3/4 w-full sm:w-36 md:w-40"
            : "aspect-4/5 w-full"
        }`}
      >
        <Image
          src={book.coverSrc}
          alt=""
          fill
          sizes={
            isCompact
              ? "(max-width: 640px) 100vw, 160px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/55 via-green2/35 to-transparent opacity-90"
        />
        <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted backdrop-blur-sm">
          {book.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${isCompact ? "p-5 sm:p-6" : "p-5 sm:p-6"}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
            {book.format}
          </span>
          <span className="rounded-full border border-green/25 bg-green/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-green">
            Coming Soon
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-text sm:text-[1.35rem]">
          {book.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-muted">{book.author}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {book.description}
        </p>

        <button
          type="button"
          aria-label={`View details for ${book.title} — coming soon`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-line bg-bg px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
        >
          View Details
        </button>
      </div>
    </motion.article>
  );
}
