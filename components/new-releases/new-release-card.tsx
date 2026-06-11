"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import {
  releaseBadgeTone,
  type NewReleaseTitle,
} from "@/components/new-releases/new-releases-data";

type NewReleaseCardProps = {
  release: NewReleaseTitle;
};

export function NewReleaseCard({ release }: NewReleaseCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line/80 bg-bg shadow-[0_20px_60px_-36px_rgba(26,34,24,0.14)] transition-[border-color,box-shadow] duration-300 hover:border-green/35 hover:shadow-[0_28px_70px_-32px_rgba(133,199,39,0.2)]"
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      <div className="relative aspect-4/5 w-full shrink-0 overflow-hidden bg-paper">
        <Image
          src={release.coverSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/50 via-green2/30 to-transparent"
        />
        <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted backdrop-blur-sm">
          {release.category}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${releaseBadgeTone(release.badge)}`}
        >
          {release.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="w-fit rounded-full border border-line bg-paper/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
          {release.format}
        </span>

        <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-text sm:text-[1.35rem]">
          {release.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-muted">{release.author}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {release.description}
        </p>

        <button
          type="button"
          aria-label={`View details for ${release.title} — preview only`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-line bg-bg px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
        >
          View Details
        </button>
      </div>
    </motion.article>
  );
}
