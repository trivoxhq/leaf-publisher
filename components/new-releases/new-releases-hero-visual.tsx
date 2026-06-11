"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOATING_RELEASES = [
  { src: "/e-books/demo-ebook1.png", rotate: -5, x: "10%", y: "10%", delay: 0 },
  { src: "/e-books/demo-ebook2.png", rotate: 4, x: "58%", y: "6%", delay: 0.2 },
  { src: "/e-books/demo-ebook3.png", rotate: -3, x: "68%", y: "52%", delay: 0.4 },
] as const;

export function NewReleasesHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green2/14 via-transparent to-green/12 blur-2xl sm:-inset-8"
      />

      <motion.div
        className="relative min-h-[22rem] sm:min-h-[24rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
      >
        {FLOATING_RELEASES.map((item, i) => (
          <motion.div
            key={item.src}
            className="absolute z-0 w-[5.5rem] overflow-hidden rounded-sm border border-line/70 bg-bg shadow-[0_16px_40px_-20px_rgba(26,34,24,0.28)] sm:w-24"
            style={{ left: item.x, top: item.y, rotate: `${item.rotate}deg` }}
            animate={reduceMotion ? undefined : { y: [0, i % 2 === 0 ? -6 : 5, 0] }}
            transition={{
              duration: 4.2 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <div className="relative aspect-3/4">
              <Image
                src={item.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                aria-hidden
              />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-green shadow-[0_0_8px_rgba(133,199,39,0.8)]" aria-hidden />
            </div>
          </motion.div>
        ))}

        <motion.span
          aria-hidden
          className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-green/30 bg-bg/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-green shadow-sm backdrop-blur-sm sm:left-8"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="size-1.5 rounded-full bg-green" />
          Freshly Added
        </motion.span>

        <motion.div
          className="absolute bottom-8 left-1/2 z-20 w-[17.5rem] -translate-x-1/2 sm:bottom-10 sm:w-[19.5rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.1 }}
        >
          <div className="overflow-hidden rounded-2xl border border-line/80 bg-linear-to-br from-bg via-paper to-[#f8f5f0] p-5 shadow-[0_28px_70px_-28px_rgba(26,34,24,0.25)] ring-1 ring-black/5 sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-4 top-0 h-full w-24 bg-linear-to-r from-green/10 to-transparent"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green">
              New arrivals panel
            </p>
            <p className="mt-3 font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
              Titles Just Getting Started
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Fresh previews, sample chapters, and upcoming releases across the
              library.
            </p>
            <div className="mt-4 space-y-2">
              {["The Digital Author", "Small Habits, Clearer Days", "Little Forest Lessons"].map(
                (title, i) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 rounded-lg border border-line/60 bg-bg/70 px-3 py-2"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green/12 text-[10px] font-bold text-green">
                      {i + 1}
                    </span>
                    <span className="truncate text-xs font-medium text-text">{title}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute right-6 top-20 z-10 size-12 text-green/25 sm:right-10 sm:size-14"
          animate={reduceMotion ? undefined : { rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 64" fill="currentColor" className="size-full">
            <path d="M32 4C18 20 8 34 12 50c8-4 18-10 28-18 4-14-2-24-8-28z" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
