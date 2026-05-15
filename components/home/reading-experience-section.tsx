"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiArrowRight, HiCheck } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;

const READER_CHAPTER = "Chapter IV — The Letter";
const READER_P1 =
  "She unfolded the paper with the careful reverence one gives to things that cannot be unread. Outside, the garden held its breath.";
const READER_P2 =
  "The handwriting was her mother's — unmistakable even after twenty years — and yet the words belonged to a stranger.";

/** Body only — chapter is static (display) above. Progressive prefix typing. */
const READER_TYPE_SEQUENCE = [
  "",
  400,
  READER_P1,
  900,
  `${READER_P1}\n\n${READER_P2}`,
  5200,
  "",
  600,
] as const;

const READER_INNER_BG = "#181818";

const FEATURES = [
  {
    title: "Offline reading",
    body: "Download your library. Read anywhere, no connection needed.",
  },
  {
    title: "Smart highlights & notes",
    body: "Annotate passages, export your notes, revisit them in your dashboard.",
  },
  {
    title: "Multi-device sync",
    body: "Start on your phone, continue on your tablet. Progress syncs instantly.",
  },
  {
    title: "Adaptive typography",
    body: "Set font, size, line spacing, and background to your exact preference.",
  },
] as const;

export function ReadingExperienceSection() {
  const reduceMotion = useReducedMotion();

  const listVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.04,
        },
      },
    }),
    [reduceMotion]
  );

  const rowVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, x: reduceMotion ? 0 : -12 },
      show: {
        opacity: 1,
        x: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.4, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  return (
    <section
      id="reading-experience"
      className="cv-section relative overflow-x-clip border-t border-line/80 bg-bg text-text"
      aria-labelledby="reading-experience-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
      />

      <div className="container-site section-y">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <motion.div
            className="min-w-0 max-w-xl lg:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <p className="mb-4 sm:mb-5">
              <span className="inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs">
                The Reading Experience
              </span>
            </p>

            <h2
              id="reading-experience-heading"
              className="site-cta-banner__headline relative mx-auto max-w-3xl text-text whitespace-nowrap"
              >
                <span className="site-cta-banner__line inline-block!">
                Your Library,  <br/>
                  <span className="site-cta-banner__accent">Everywhere You Go</span>
                </span>
              </h2>

            <p className="mt-5 max-w-prose text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              A distraction-free reading environment built for focus. Night mode,
              custom fonts, offline sync — everything tuned so the words feel at
              home.
            </p>

            <motion.ul
              className="mt-8 flex list-none flex-col gap-4 p-0 sm:mt-10 sm:gap-5"
              role="list"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-32px" }}
            >
              {FEATURES.map((item) => (
                <motion.li key={item.title} variants={rowVariants} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green/12 text-green ring-1 ring-green/25 sm:size-7">
                    <HiCheck className="size-3.5 sm:size-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <strong className="font-semibold text-text">{item.title}</strong>
                    <p className="mt-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                      {item.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-9 sm:mt-10">
              <Link
                href="/reader"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_-16px_rgba(106,191,46,0.45)] outline-none ring-1 ring-green/20 transition-[background-color,box-shadow,transform] duration-200 hover:bg-green2 hover:shadow-[0_14px_44px_-14px_rgba(131,217,63,0.5)] focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]"
              >
                Explore the Reader
                <HiArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative min-w-0"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: reduceMotion ? 0 : 0.06 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-4xl bg-linear-to-br from-green/8 via-transparent to-green2/10 blur-2xl sm:-inset-6"
            />
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_28px_80px_-36px_rgba(0,0,0,0.55)] ring-1 ring-white/5"
              style={{ backgroundColor: READER_INNER_BG }}
            >
              <div className="border-b border-white/10 px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                  <h3 className="relative min-w-0 max-w-full font-display text-[clamp(1.05rem,2.8vw+0.35rem,1.45rem)] font-bold leading-snug tracking-tight sm:text-[clamp(1.1rem,2.2vw+0.4rem,1.55rem)]">
                    <span className="site-cta-banner__line inline-block!">
                      <span className="site-cta-banner__accent">
                        The Midnight Garden
                      </span>
                    </span>
                  </h3>
                  <span className="shrink-0 self-start rounded-full border border-green/30 bg-green/15 px-3 py-1.5 text-xs font-semibold tabular-nums text-green2 sm:text-sm">
                    34% complete
                  </span>
                </div>
                <div
                  className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/12 sm:mt-5"
                  role="progressbar"
                  aria-valuenow={34}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Reading progress"
                >
                  <div className="h-full w-[34%] rounded-full bg-linear-to-r from-green to-green2 shadow-[0_0_12px_rgba(131,217,63,0.35)]" />
                </div>
              </div>

              <div className="min-h-58 px-5 py-6 sm:min-h-64 sm:px-7 sm:py-8">
                {reduceMotion ? (
                  <div className="text-white/90">
                    <p className="font-display text-base font-bold leading-snug tracking-tight text-white sm:text-lg">
                      {READER_CHAPTER}
                    </p>
                    <div className="mt-4 space-y-4 font-sans text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base">
                      <p>
                        She unfolded the paper with the careful reverence one gives to{" "}
                        <em className="font-medium italic text-white">
                          things that cannot be unread
                        </em>
                        . Outside, the garden held its breath.
                      </p>
                      <p className="text-white/85">{READER_P2}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-display text-base font-bold leading-snug tracking-tight text-white sm:text-lg">
                      {READER_CHAPTER}
                    </p>
                    <TypeAnimation
                      sequence={[...READER_TYPE_SEQUENCE]}
                      wrapper="div"
                      repeat={Infinity}
                      speed={{ type: "keyStrokeDelayInMs", value: 30 }}
                      deletionSpeed={{ type: "keyStrokeDelayInMs", value: 14 }}
                      omitDeletionAnimation
                      cursor
                      preRenderFirstString={false}
                      className="reading-experience-typewriter mt-4 whitespace-pre-line font-sans text-sm font-normal leading-relaxed tracking-normal text-white/92 sm:mt-5 sm:text-base"
                      style={{
                        minHeight: "9rem",
                      }}
                      aria-live="polite"
                    />
                  </>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <span
                  className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 font-sans text-lg font-semibold tracking-wide text-white shadow-sm sm:min-h-14 sm:min-w-14 sm:text-xl"
                  aria-hidden
                >
                  Aa
                </span>
                <span className="text-sm font-medium tabular-nums text-white/55 sm:text-base sm:text-white/60">
                  p. 118 of 312
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
