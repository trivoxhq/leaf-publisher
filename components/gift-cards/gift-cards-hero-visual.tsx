"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function GiftCardsHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green/14 via-transparent to-green2/12 blur-2xl sm:-inset-8"
      />

      <motion.div
        className="relative min-h-[20rem] sm:min-h-[22rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
      >
        {/* Floating book page */}
        <motion.div
          className="absolute left-2 top-6 z-0 w-28 rotate-[-8deg] rounded-sm border border-line/70 bg-paper p-3 shadow-[0_16px_40px_-24px_rgba(26,34,24,0.2)] sm:left-4 sm:w-32"
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="space-y-1.5">
            <div className="h-1 w-full rounded-full bg-line/60" />
            <div className="h-1 w-4/5 rounded-full bg-line/45" />
            <div className="h-1 w-full rounded-full bg-line/45" />
            <div className="h-1 w-3/5 rounded-full bg-line/35" />
          </div>
        </motion.div>

        {/* Leaf accent */}
        <motion.div
          aria-hidden
          className="absolute right-6 top-4 z-0 size-14 text-green/35 sm:right-10 sm:size-16"
          animate={reduceMotion ? undefined : { rotate: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 64 64" fill="currentColor" className="size-full">
            <path d="M32 4C18 20 8 34 12 50c8-4 18-10 28-18 4-14-2-24-8-28z" />
          </svg>
        </motion.div>

        {/* Main gift card mockup */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 w-[15.5rem] -translate-x-1/2 -translate-y-1/2 sm:w-[17.5rem]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-linear-to-br from-[#faf7f2] via-bg to-[#f0ebe3] p-5 shadow-[0_28px_70px_-28px_rgba(26,34,24,0.28)] ring-1 ring-black/5 sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-green/12 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-6 size-28 rounded-full bg-green2/10 blur-2xl"
            />

            <div className="relative flex items-center gap-2">
              <Image
                src="/logo-dark.svg"
                alt=""
                width={120}
                height={44}
                className="h-4 w-auto opacity-90"
                aria-hidden
                unoptimized
              />
            </div>

            <p className="relative mt-5 font-display text-2xl font-bold tracking-tight text-text sm:text-[1.65rem]">
              Gift Card
            </p>
            <p className="relative mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Leaf Publisher
            </p>

            <div className="relative mt-6 rounded-xl border border-green/25 bg-green/8 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-green">
                For ebook creation &amp; publishing
              </p>
              <p className="mt-1.5 font-display text-3xl font-bold text-text">$100</p>
            </div>

            <p className="relative mt-5 text-xs leading-relaxed text-muted">
              Writing · Editing · Design · Formatting · Publishing support
            </p>

            <div
              aria-hidden
              className="absolute bottom-0 right-0 h-16 w-16 bg-linear-to-tl from-green/15 to-transparent"
            />
          </div>
        </motion.div>

        {/* Floating mini book cover */}
        <motion.div
          className="absolute bottom-6 right-2 z-20 w-16 rotate-[6deg] overflow-hidden rounded-sm border border-line/80 bg-bg shadow-[0_14px_36px_-18px_rgba(26,34,24,0.3)] sm:right-6 sm:w-[4.5rem]"
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="relative aspect-3/4">
            <Image
              src="/e-books/demo-ebook4.jpg"
              alt=""
              fill
              sizes="72px"
              className="object-cover"
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-[#e8dfd0] to-[#cfc4b4]"
            />
          </div>
        </motion.div>

        {/* Ribbon accent */}
        <motion.span
          aria-hidden
          className="absolute bottom-10 left-6 z-0 inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted shadow-sm sm:left-10"
          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          A thoughtful gift
        </motion.span>
      </motion.div>
    </div>
  );
}
