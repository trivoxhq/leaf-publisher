"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function RoyaltiesHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green/12 via-transparent to-green2/10 blur-2xl sm:-inset-8"
      />

      <motion.div
        className="relative min-h-[22rem] sm:min-h-[24rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
      >
        {/* Floating sale cards */}
        <motion.div
          className="absolute left-4 top-8 z-10 w-36 rounded-xl border border-line/80 bg-paper p-3 shadow-md sm:left-8 sm:w-40"
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Sample sale
          </p>
          <p className="mt-1 font-display text-lg font-bold text-text">$9.99</p>
          <p className="text-[10px] text-muted">Illustrative only</p>
        </motion.div>

        <motion.div
          className="absolute right-4 top-12 z-10 w-32 rounded-xl border border-green/25 bg-green/8 p-3 shadow-md sm:right-8"
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-green">
            Est. royalty
          </p>
          <p className="mt-1 font-display text-lg font-bold text-text">—</p>
          <p className="text-[10px] text-muted">Varies by terms</p>
        </motion.div>

        {/* Main overview card */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-20 w-[17rem] -translate-x-1/2 -translate-y-1/2 sm:w-[19rem]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.1 }}
        >
          <div className="overflow-hidden rounded-2xl border border-line/80 bg-linear-to-br from-[#181818] via-[#1f1f1f] to-[#181818] p-5 text-white shadow-[0_28px_70px_-24px_rgba(26,34,24,0.45)] ring-1 ring-white/8 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green2">
              Royalty Overview
            </p>
            <p className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
              Earnings Clarity
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              Understand pricing, fees, royalty rates, and payout expectations before
              publishing.
            </p>

            <div className="mt-5 space-y-3">
              {[
                { label: "Book price", width: "72%" },
                { label: "Platform fees", width: "48%" },
                { label: "Royalty rate", width: "64%" },
                { label: "Payout timeline", width: "38%" },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-[10px] text-white/55">
                    <span>{bar.label}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-green to-green2"
                      initial={reduceMotion ? { width: bar.width } : { width: 0 }}
                      animate={{ width: bar.width }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] leading-relaxed text-white/45">
              Illustrative layout only — not live earnings data.
            </p>
          </div>
        </motion.div>

        {/* Chart accent */}
        <motion.svg
          aria-hidden
          className="absolute bottom-8 left-6 z-0 size-20 text-green/20 sm:left-10"
          viewBox="0 0 80 60"
          animate={reduceMotion ? undefined : { opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points="0,50 20,35 35,42 55,18 80,28"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
