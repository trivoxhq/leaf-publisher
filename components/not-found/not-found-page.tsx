"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

import { NotFoundVisual } from "@/components/not-found/not-found-visual";

const EASE = [0.22, 1, 0.36, 1] as const;

function DecorativeGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-green/16 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-green2/12 blur-3xl"
      />
    </>
  );
}

export function NotFoundPage() {
  const reduceMotion = useReducedMotion();

  const softItemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.5, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  const softContainerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.07,
          delayChildren: reduceMotion ? 0 : 0.05,
        },
      },
    }),
    [reduceMotion]
  );

  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <section
        className="relative flex flex-1 overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="not-found-heading"
      >
        <DecorativeGlow />
        <div className="container-site relative flex flex-1 items-center py-14 sm:py-16 lg:py-20 xl:py-24">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <motion.div
              className="min-w-0 max-w-xl lg:max-w-none"
              variants={softContainerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.p
                variants={softItemVariants}
                className="mb-4 inline-flex items-center rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
              >
                Page Not Found
              </motion.p>

              <motion.h1
                id="not-found-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2rem,4.5vw+0.5rem,3.35rem)] font-bold leading-[1.08] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Looks Like This Page Got Lost{" "}
                  <span className="hero-heading__accent">Between the Pages</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              >
                The page you are looking for may have been moved, renamed, or does not
                exist anymore. Let&apos;s get you back to a better place in the Leaf
                Publisher library.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Back to Home
                  <HiArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/browse"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-bg/90 px-8 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Browse Books
                </Link>
              </motion.div>
            </motion.div>

            <NotFoundVisual />
          </div>
        </div>
      </section>
    </div>
  );
}
