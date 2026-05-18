"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight, HiCheck } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;
const DUAL_AUDIENCE_BG = "#181818";

const AUDIENCES = [
  {
    id: "readers",
    eyebrow: "For Readers",
    title: "Your next great read is one tap away",
    description:
      "Unlimited access to millions of titles across every genre. Curated picks, smart recommendations, and a reader built for deep focus.",
    bullets: [
      "2.4M+ titles across 180+ genres",
      "Offline reading on all your devices",
      "Personalised recommendations",
      "Community and book clubs",
    ],
    cta: "Browse the Library",
    href: "/browse",
    letter: "R",
  },
  {
    id: "authors",
    eyebrow: "For Authors",
    title: "Publish once. Earn forever.",
    description:
      "Leaf Publisher gives independent authors a professional home — distribution, analytics, reader engagement, and 70% royalties on every sale.",
    bullets: [
      "Publish in minutes, no gatekeeping",
      "70% royalty on every sale",
      "Real-time sales analytics",
      "Author storefront and profile page",
    ],
    cta: "Start Publishing",
    href: "/for-authors",
    letter: "A",
  },
] as const;

export function DualAudienceSection() {
  const reduceMotion = useReducedMotion();

  const gridVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.12,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    }),
    [reduceMotion]
  );

  const cardVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.52, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  return (
    <section
      className="cv-section relative overflow-x-clip border-t border-white/10 text-white/90"
      style={{ backgroundColor: DUAL_AUDIENCE_BG }}
      aria-label="For readers and for authors"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/25 to-transparent"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: EASE }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-green/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-1/4 size-64 rounded-full bg-green2/6 blur-3xl"
      />

      <motion.div
        className="container-site section-y"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-48px" }}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          {AUDIENCES.map((audience) => (
            <motion.article
              key={audience.id}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="group relative isolate flex min-h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-8 lg:p-9"
              aria-labelledby={`dual-audience-${audience.id}-heading`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[#181818]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-white/6 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-90"
              />

              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[clamp(6rem,18vw,9rem)] font-bold leading-none tracking-tighter text-white/6 transition-colors duration-500 group-hover:text-white/9 sm:-right-4 sm:-top-6"
              >
                {audience.letter}
              </span>

              <div className="relative z-2 flex flex-1 flex-col">
                <p className="mb-4 sm:mb-5">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm sm:text-xs">
                    {audience.eyebrow}
                  </span>
                </p>

                <h2
                  id={`dual-audience-${audience.id}-heading`}
                  className="max-w-md font-display text-[clamp(1.5rem,3vw+0.5rem,2rem)] font-bold leading-[1.12] tracking-tight text-white"
                >
                  {audience.title}
                </h2>

                <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-[0.9375rem]">
                  {audience.description}
                </p>

                <motion.ul
                  className="mt-6 flex list-none flex-col gap-3 p-0 sm:mt-7 sm:gap-3.5"
                  role="list"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-24px" }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: reduceMotion ? 0 : 0.06,
                        delayChildren: reduceMotion ? 0 : 0.1,
                      },
                    },
                  }}
                >
                  {audience.bullets.map((item) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: reduceMotion ? 0 : -10 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: reduceMotion ? 0.15 : 0.35,
                            ease: EASE,
                          },
                        },
                      }}
                      className="flex gap-3"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green/15 text-green2 ring-1 ring-green/30 sm:size-6">
                        <HiCheck className="size-3 sm:size-3.5" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="text-sm leading-snug text-white/85 sm:text-[0.9375rem]">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  className="mt-8 sm:mt-9"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduceMotion ? 0.2 : 0.4,
                    ease: EASE,
                    delay: reduceMotion ? 0 : 0.2,
                  }}
                >
                  <Link
                    href={audience.href}
                    className="group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_-16px_rgba(133,199,39,0.5)] outline-none ring-1 ring-white/10 transition-[background-color,box-shadow,transform] duration-200 hover:bg-green2 hover:shadow-[0_14px_44px_-14px_rgba(133,199,39,0.55)] focus-visible:ring-2 focus-visible:ring-green2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] active:scale-[0.98]"
                  >
                    {audience.cta}
                    <HiArrowRight
                      className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
