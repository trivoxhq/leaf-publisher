"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function NotFoundVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green/12 via-transparent to-green2/10 blur-2xl sm:-inset-8"
      />

      <motion.div
        className="relative min-h-[22rem] sm:min-h-[26rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
        aria-hidden
      >
        {/* Scattered page */}
        <motion.div
          className="absolute left-4 top-8 z-10 w-28 rotate-[-8deg] rounded-lg border border-line/80 bg-paper p-3 shadow-md sm:left-8 sm:w-32"
          animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [-8, -6, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="space-y-1.5">
            <div className="h-1 w-full rounded bg-line" />
            <div className="h-1 w-4/5 rounded bg-line" />
            <div className="h-1 w-3/5 rounded bg-line" />
          </div>
        </motion.div>

        <motion.div
          className="absolute right-6 top-12 z-10 w-24 rotate-[6deg] rounded-lg border border-line/80 bg-bg p-3 shadow-md sm:right-10 sm:w-28"
          animate={reduceMotion ? undefined : { y: [0, 5, 0], rotate: [6, 4, 6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <div className="space-y-1.5">
            <div className="h-1 w-full rounded bg-green/25" />
            <div className="h-1 w-2/3 rounded bg-line" />
          </div>
        </motion.div>

        {/* 404 typography */}
        <motion.p
          className="pointer-events-none absolute left-1/2 top-[38%] z-0 -translate-x-1/2 -translate-y-1/2 font-display text-[7rem] font-bold leading-none tracking-tighter text-green/8 sm:text-[9rem]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: EASE, delay: 0.05 }}
        >
          404
        </motion.p>

        {/* Open book */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 w-[15rem] -translate-x-1/2 -translate-y-1/2 sm:w-[17rem]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.12 }}
        >
          <div className="flex gap-1">
            <div className="flex-1 overflow-hidden rounded-l-xl border border-line/80 bg-linear-to-br from-paper to-bg p-4 shadow-[0_20px_50px_-24px_rgba(26,34,24,0.2)] sm:p-5">
              <div className="space-y-2">
                <div className="h-1 w-full rounded bg-line" />
                <div className="h-1 w-5/6 rounded bg-line" />
                <div className="h-1 w-4/6 rounded bg-line" />
                <div className="mt-4 h-1 w-full rounded bg-green/20" />
                <div className="h-1 w-3/4 rounded bg-line" />
              </div>
            </div>
            <div className="w-1 rounded-full bg-linear-to-b from-green/40 to-green2/20" />
            <div className="flex-1 overflow-hidden rounded-r-xl border border-line/80 bg-linear-to-bl from-bg to-paper p-4 shadow-[0_20px_50px_-24px_rgba(26,34,24,0.2)] sm:p-5">
              <div className="space-y-2">
                <div className="h-1 w-4/5 rounded bg-line" />
                <div className="h-1 w-full rounded bg-line" />
                <div className="h-1 w-2/3 rounded bg-line" />
                <div className="mt-4 h-1 w-full rounded bg-line" />
                <div className="h-1 w-5/6 rounded bg-green/15" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-wider text-muted">
            Page not in this chapter
          </p>
        </motion.div>

        {/* Leaf accent */}
        <motion.svg
          className="absolute bottom-10 left-6 z-10 size-14 text-green/30 sm:left-10"
          viewBox="0 0 64 64"
          animate={reduceMotion ? undefined : { opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            fill="currentColor"
            d="M32 8c-8 12-20 18-20 32 0 8 6 14 14 14 6 0 12-4 16-10-4 2-8 4-14 4-10 0-16-8-12-18 4-10 14-16 16-22z"
          />
        </motion.svg>

        <motion.div
          className="absolute bottom-16 right-8 z-10 rounded-xl border border-green/25 bg-green/8 px-3 py-2 shadow-sm sm:right-12"
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-green">
            Lost page
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
