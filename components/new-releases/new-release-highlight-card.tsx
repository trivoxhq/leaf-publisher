"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import {
  releaseBadgeTone,
  type NewReleaseTitle,
} from "@/components/new-releases/new-releases-data";

const EASE = [0.22, 1, 0.36, 1] as const;

type NewReleaseHighlightCardProps = {
  release: NewReleaseTitle;
};

export function NewReleaseHighlightCard({ release }: NewReleaseHighlightCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/80 bg-linear-to-br from-paper via-bg to-paper shadow-[0_24px_70px_-36px_rgba(26,34,24,0.14)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_32px_80px_-32px_rgba(133,199,39,0.2)] sm:flex-row"
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
    >
      <div className="relative aspect-4/5 w-full shrink-0 overflow-hidden bg-paper sm:aspect-auto sm:w-44 md:w-48">
        <Image
          src={release.coverSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 192px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-linear-to-b from-green/45 via-green2/25 to-transparent"
        />
        <span
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm ${releaseBadgeTone(release.badge)}`}
        >
          {release.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {release.category}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-text sm:text-[1.65rem]">
          {release.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-muted">{release.author}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {release.description}
        </p>
        <button
          type="button"
          aria-label={`View details for ${release.title} — preview only`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-line bg-bg px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
        >
          View Details
        </button>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-green/8 blur-2xl"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </motion.article>
  );
}
