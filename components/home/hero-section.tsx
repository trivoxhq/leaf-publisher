"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

import { HeroBookGallery } from "@/components/home/hero-book-gallery";

const EASE = [0.22, 1, 0.36, 1] as const;

type HeroStat = { value: string; label: string; star?: boolean };

const STATS: readonly HeroStat[] = [
  { value: "2.4M+", label: "Titles" },
  { value: "48K+", label: "Authors" },
  { value: "180+", label: "Genres" },
  { value: "4.9", label: "Rating", star: true },
];

function DecorativeGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-green/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-green2/12 blur-3xl"
      />
    </>
  );
}

export function HeroSection() {
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

  const galleryRevealVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.08 },
      },
    }),
    [reduceMotion]
  );

  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
      aria-labelledby="hero-heading"
    >
      <DecorativeGlow />

      <div className="container-site relative py-14 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid min-w-0 grid-cols-1 items-start gap-y-12 sm:gap-y-14 md:gap-y-16 xl:grid-cols-12 xl:gap-x-10 xl:gap-y-12 2xl:gap-x-14">
          <motion.div
            className="min-w-0 w-full max-w-xl justify-self-start self-start sm:max-w-2xl lg:mx-auto lg:max-w-full xl:col-span-6 xl:mx-0 xl:max-w-none xl:justify-self-stretch xl:pr-6 2xl:pr-8"
            variants={softContainerVariants}
            initial="hidden"
            animate="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.p
              variants={softItemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
            >
              For Readers &amp; Publishers
            </motion.p>

            <h1
              id="hero-heading"
              className="hero-heading font-display text-[clamp(2.35rem,6.5vw+0.35rem,4.5rem)] font-bold leading-[1.06] tracking-tight text-text sm:leading-[1.05]"
            >
              <span className="hero-heading__line block font-bold">
                Publish <span className="hero-heading__accent">smarter.</span>
              </span>
              <span className="hero-heading__line mt-1 block font-bold sm:mt-1.5">
                Read <span className="hero-heading__accent">deeper.</span>
              </span>
              <span className="hero-heading__line mt-1 block font-bold sm:mt-1.5">
                Grow <span className="hero-heading__accent">together.</span>
              </span>
            </h1>

            <motion.p
              variants={softItemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Leaf Publisher is the all-in-one ebook platform — for independent
              authors to distribute their work, and readers to discover what
              they&apos;ll love next.
            </motion.p>

            <motion.div
              variants={softItemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <motion.div whileHover={{ scale: reduceMotion ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/get-started"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! visited:text-[#ffffff]! hover:bg-green2 hover:text-[#ffffff]! sm:w-auto shadow-[0_12px_40px_-16px_rgba(217,34,67,0.55)] transition-colors"
                >
                  Start for Free
                </Link>
              </motion.div>
              <Link
                href="#featured-gallery"
                className="group inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full border border-line bg-bg/90 px-6 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
              >
                See How It Works
                <HiArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </motion.div>

            <motion.div
              variants={softItemVariants}
              className="hero-stat-grid mt-12 grid grid-cols-2 gap-3 border-t border-line/70 pt-10 sm:grid-cols-4 sm:gap-4"
              role="list"
            >
              {STATS.map((s) => (
                <div key={s.label} role="listitem" className="hero-stat-card">
                  <p
                    className={`hero-stat-card__value${s.star ? " hero-stat-card__value--with-star" : ""}`}
                  >
                    <span className="tabular-nums">{s.value}</span>
                    {s.star ? (
                      <>
                        <span className="sr-only">out of five stars average</span>
                        <span className="hero-stat-card__star" title="Average rating" aria-hidden>
                          <FaStar />
                        </span>
                      </>
                    ) : null}
                  </p>
                  <p className="hero-stat-card__label">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="min-w-0 w-full justify-self-stretch self-start xl:col-span-6"
            variants={galleryRevealVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-24px" }}
          >
            <HeroBookGallery />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
