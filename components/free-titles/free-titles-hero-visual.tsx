"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const FLOATING_COVERS = [
  { src: "/e-books/demo-ebook1.png", rotate: -8, x: "8%", y: "12%", delay: 0 },
  { src: "/e-books/demo-ebook3.png", rotate: 6, x: "62%", y: "8%", delay: 0.15 },
  { src: "/e-books/demo-ebook2.png", rotate: -4, x: "72%", y: "58%", delay: 0.3 },
] as const;

export function FreeTitlesHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green/12 via-transparent to-green2/10 blur-2xl sm:-inset-8"
      />

      <motion.div
        className="relative min-h-[20rem] sm:min-h-[22rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
      >
        {/* Floating mini covers */}
        {FLOATING_COVERS.map((cover) => (
          <motion.div
            key={cover.src}
            className="absolute z-0 w-20 overflow-hidden rounded-sm border border-line/70 bg-bg shadow-[0_14px_36px_-18px_rgba(26,34,24,0.25)] sm:w-24"
            style={{ left: cover.x, top: cover.y, rotate: `${cover.rotate}deg` }}
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{
              duration: 4.5 + cover.delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: cover.delay,
            }}
          >
            <div className="relative aspect-3/4">
              <Image
                src={cover.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                aria-hidden
              />
            </div>
          </motion.div>
        ))}

        {/* Leaf accent */}
        <motion.div
          aria-hidden
          className="absolute left-4 top-2 z-0 size-12 text-green/30 sm:left-8 sm:size-14"
          animate={reduceMotion ? undefined : { rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 64" fill="currentColor" className="size-full">
            <path d="M32 4C18 20 8 34 12 50c8-4 18-10 28-18 4-14-2-24-8-28z" />
          </svg>
        </motion.div>

        {/* Main discover card */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 w-[16rem] -translate-x-1/2 -translate-y-1/2 sm:w-[18rem]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-linear-to-br from-bg via-paper to-[#f4f0ea] p-5 shadow-[0_28px_70px_-28px_rgba(26,34,24,0.28)] ring-1 ring-black/5 sm:p-6">
            <span className="inline-flex items-center rounded-full border border-green/30 bg-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-green">
              Free to Read
            </span>

            <p className="mt-5 font-display text-2xl font-bold tracking-tight text-text sm:text-[1.75rem]">
              Discover Free Titles
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Samples, starter guides, and short reads to help you explore before
              you commit.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {["Samples", "Guides", "Short Reads"].map((label) => (
                <span
                  key={label}
                  className="rounded-lg border border-line/70 bg-bg/80 px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted"
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 size-24 rounded-full bg-green/10 blur-2xl"
            />
          </div>
        </motion.div>

        {/* Library shelf accent */}
        <motion.span
          aria-hidden
          className="absolute bottom-4 left-1/2 z-0 h-1 w-48 -translate-x-1/2 rounded-full bg-linear-to-r from-transparent via-line/80 to-transparent sm:w-56"
          initial={reduceMotion ? false : { scaleX: 0.6, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        />
      </motion.div>
    </div>
  );
}
