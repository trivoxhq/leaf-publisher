"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SuccessStoriesHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green/12 via-transparent to-green2/10 blur-2xl sm:-inset-8"
      />

      <motion.div
        className="relative min-h-[24rem] sm:min-h-[26rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
      >
        {/* Before manuscript card */}
        <motion.div
          className="absolute left-2 top-6 z-10 w-36 rounded-xl border border-line/80 bg-paper p-3 shadow-md sm:left-6 sm:w-40"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Before
          </p>
          <div className="mt-2 space-y-1.5">
            <div className="h-1 w-full rounded bg-line" />
            <div className="h-1 w-4/5 rounded bg-line" />
            <div className="h-1 w-3/5 rounded bg-line" />
          </div>
          <p className="mt-2 text-[10px] text-muted">Rough draft notes</p>
        </motion.div>

        {/* Story card */}
        <motion.div
          className="absolute right-2 top-10 z-10 w-36 rounded-xl border border-green/25 bg-green/8 p-3 shadow-md sm:right-6 sm:w-40"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-green">
            Sample Journey
          </p>
          <p className="mt-1 font-display text-sm font-bold text-text">
            Idea → Ebook
          </p>
          <p className="text-[10px] text-muted">Example format</p>
        </motion.div>

        {/* Cover mockup */}
        <motion.div
          className="absolute bottom-16 left-8 z-10 w-20 overflow-hidden rounded-lg border border-line/80 shadow-lg sm:left-12 sm:w-24"
          animate={reduceMotion ? undefined : { rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="aspect-3/4 bg-linear-to-br from-[#1a2218] via-[#2d3a28] to-[#85c727]/40 p-2">
            <span className="font-display text-xs font-bold text-white/90">EB</span>
          </div>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 w-[17rem] -translate-x-1/2 -translate-y-1/2 sm:w-[19rem]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.1 }}
        >
          <div className="overflow-hidden rounded-2xl border border-line/80 bg-linear-to-br from-[#181818] via-[#1f1f1f] to-[#181818] p-5 text-white shadow-[0_28px_70px_-24px_rgba(26,34,24,0.45)] ring-1 ring-white/8 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green2">
              Author Journey
            </p>
            <p className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
              From Idea to Published Ebook
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              Structure, polish, design, and publishing direction — brought together
              for reader-ready ebooks.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {["Outline", "Edit", "Design", "Launch"].map((step, i) => (
                <div
                  key={step}
                  className="rounded-lg border border-white/10 bg-white/6 px-2.5 py-2 text-center"
                >
                  <p className="text-[10px] font-semibold text-white/55">{step}</p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-green to-green2"
                      initial={reduceMotion ? { width: `${40 + i * 15}%` } : { width: 0 }}
                      animate={{ width: `${40 + i * 15}%` }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-white/45">
              Illustrative layout — sample author journey format only.
            </p>
          </div>
        </motion.div>

        {/* After manuscript card */}
        <motion.div
          className="absolute bottom-8 right-6 z-10 w-32 rounded-xl border border-green/30 bg-bg p-3 shadow-md sm:right-10"
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-green">
            After
          </p>
          <div className="mt-2 space-y-1.5">
            <div className="h-1 w-full rounded bg-green/40" />
            <div className="h-1 w-full rounded bg-green/30" />
            <div className="h-1 w-4/5 rounded bg-green/25" />
          </div>
          <p className="mt-2 text-[10px] text-muted">Polished structure</p>
        </motion.div>

        {/* Leaf accent */}
        <motion.svg
          aria-hidden
          className="absolute bottom-4 left-4 z-0 size-16 text-green/25"
          viewBox="0 0 64 64"
          animate={reduceMotion ? undefined : { opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            fill="currentColor"
            d="M32 8c-8 12-20 18-20 32 0 8 6 14 14 14 6 0 12-4 16-10-4 2-8 4-14 4-10 0-16-8-12-18 4-10 14-16 16-22z"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
