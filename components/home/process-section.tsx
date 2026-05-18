"use client";

import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  HiOutlineBookOpen,
  HiOutlineChatAlt2,
  HiOutlineMoon,
  HiOutlineSearchCircle,
} from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;
const PROCESS_DARK_BG = "#181818";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    description:
      "Browse millions of titles by genre, mood, read time, or editorial picks updated every week.",
    icon: HiOutlineSearchCircle,
  },
  {
    step: "02",
    title: "Collect",
    description:
      "Build a personal library across every device. Your books live in the cloud — always synced.",
    icon: HiOutlineBookOpen,
  },
  {
    step: "03",
    title: "Read",
    description:
      "A distraction-free reader with custom typography, night mode, and offline access built in.",
    icon: HiOutlineMoon,
  },
  {
    step: "04",
    title: "Connect",
    description:
      "Join reading circles, share highlights, and find readers who love exactly what you love.",
    icon: HiOutlineChatAlt2,
  },
] as const;

export function ProcessSection() {
  const reduceMotion = useReducedMotion();

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.1,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    }),
    [reduceMotion]
  );

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.45, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  return (
    <section
      className="cv-section relative overflow-x-clip border-t border-white/10 text-white/90"
      style={{ backgroundColor: PROCESS_DARK_BG }}
      aria-labelledby="process-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
      />

      <div className="container-site section-y">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
        >
          <p className="mb-4 flex justify-center sm:mb-5">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm sm:text-xs">
              The Process
            </span>
          </p>
          <h2
            id="process-heading"
            className="site-cta-banner__headline relative max-w-full whitespace-nowrap"
          >
            <span className="site-cta-banner__line inline-block!">
              <span className="site-cta-banner__accent">Simple from</span> Day{" "}
              <span className="site-cta-banner__accent">One</span>
            </span>
          </h2>
        </motion.header>

        <motion.ul
          className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.li key={s.step} variants={itemVariants}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-green/35 hover:shadow-[0_16px_44px_-28px_rgba(217,34,67,0.22)] sm:p-6">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <div className="absolute -right-8 -top-8 size-32 rounded-full bg-green/10 blur-2xl" />
                    <div className="absolute -bottom-10 -left-6 size-28 rounded-full bg-green2/8 blur-2xl" />
                  </div>

                  <div className="relative mb-5 flex items-start justify-between gap-3">
                    <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-white/25 sm:text-[2rem]">
                      {s.step}
                    </span>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-green2 shadow-[0_0_24px_-8px_rgba(246,157,57,0.35)] transition-colors duration-300 group-hover:border-green/40 group-hover:text-green2">
                      <Icon className="size-6" aria-hidden />
                    </span>
                  </div>

                  <h3 className="relative font-display text-xl font-bold tracking-tight text-white sm:text-[1.35rem]">
                    {s.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                    {s.description}
                  </p>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
