"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight, HiCheck, HiOutlinePlus, HiX } from "react-icons/hi";

import {
  AFTER_POINTS,
  BEFORE_POINTS,
  CASE_STUDY_TEMPLATE,
  FEATURED_STORIES,
  STORY_CATEGORIES,
  SUCCESS_FAQS,
  SUCCESS_PROCESS_STEPS,
  SUCCESS_SNAPSHOT_CARDS,
  SUCCESS_STORIES_PAGE_IDS,
  TESTIMONIAL_PLACEHOLDER,
  TRUST_CARDS,
  type SuccessFaq,
} from "@/components/success-stories/success-stories-data";
import { SuccessStoriesHeroVisual } from "@/components/success-stories/success-stories-hero-visual";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

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

function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  variant = "light",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <header className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-4 flex justify-center sm:mb-5">
          <span
            className={
              isDark
                ? "inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm sm:text-xs"
                : "inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
            }
          >
            {eyebrow}
          </span>
        </p>
      ) : null}
      <h2 id={id} className={`site-cta-banner__headline ${isDark ? "" : "text-text"}`}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:mt-6 sm:text-lg ${
            isDark ? "text-white/70" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

function SuccessFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: SuccessFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `success-faq-panel-${faq.id}`;
  const buttonId = `success-faq-button-${faq.id}`;
  const panelTransition = reduceMotion
    ? { duration: 0.15 }
    : { duration: 0.38, ease: EASE };

  return (
    <motion.div
      layout={!reduceMotion}
      className={`border-b border-line/80 last:border-b-0 ${isOpen ? "bg-green/4" : ""}`}
      transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: EASE }}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors sm:gap-5 sm:px-6 sm:py-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span
            className={`min-w-0 flex-1 font-display text-base font-bold tracking-tight transition-colors sm:text-lg ${
              isOpen ? "text-text" : "text-text group-hover:text-green"
            }`}
          >
            {faq.question}
          </span>
          <motion.span
            aria-hidden
            className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 shadow-[0_4px_16px_-6px_rgba(26,34,24,0.12)] transition-colors duration-300 sm:size-11 ${
              isOpen
                ? "border-green/50 bg-green/12 text-green shadow-[0_6px_20px_-8px_rgba(133,199,39,0.35)]"
                : "border-line bg-bg text-muted group-hover:border-green/35 group-hover:text-green"
            }`}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 320, damping: 22 }
            }
          >
            <HiOutlinePlus className="size-5 sm:size-6" strokeWidth={2.25} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden"
          >
            <motion.div
              initial={reduceMotion ? false : { y: -6 }}
              animate={{ y: 0 }}
              exit={reduceMotion ? undefined : { y: -4 }}
              transition={panelTransition}
              className="px-5 pb-6 sm:px-6 sm:pb-7"
            >
              <p className="text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SuccessStoriesPage() {
  const reduceMotion = useReducedMotion();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    SUCCESS_FAQS[0]?.id ?? null
  );

  const containerVariants = useMemo<Variants>(
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

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.45, ease: EASE },
      },
    }),
    [reduceMotion]
  );

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
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="success-stories-hero-heading"
      >
        <DecorativeGlow />
        <div className="container-site relative py-14 sm:py-16 lg:py-20 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
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
                Success Stories
              </motion.p>

              <motion.h1
                id="success-stories-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2rem,4.5vw+0.5rem,3.35rem)] font-bold leading-[1.08] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Real Ideas Turned Into{" "}
                  <span className="hero-heading__accent">Reader-Ready Ebooks</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              >
                Every book begins with a reason. Leaf Publisher helps authors bring that
                reason to life through writing, editing, design, formatting, and
                publishing support. Explore the kinds of author journeys our platform is
                built to support.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href={`#${SUCCESS_STORIES_PAGE_IDS.stories}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  View Stories
                  <HiArrowRight className="size-4" aria-hidden />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-bg/90 px-8 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Start Your Story
                </Link>
              </motion.div>
            </motion.div>

            <SuccessStoriesHeroVisual />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="success-intro-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="success-intro-heading"
              title={
                <span className="site-cta-banner__line block">
                  Every Author Journey{" "}
                  <span className="hero-heading__accent">Looks Different</span>
                </span>
              }
            />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Some authors arrive with a rough idea. Some bring a finished manuscript
              that needs structure, editing, and polish. Others need cover design,
              formatting, publishing guidance, or help turning expertise into a book
              that feels professional.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
              Leaf Publisher is built to support those different journeys with a process
              that brings clarity, creativity, and publishing direction together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success snapshot */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="success-snapshot-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="success-snapshot-heading"
              title={
                <span className="site-cta-banner__line block">
                  What Success <span className="hero-heading__accent">Can Look Like</span>
                </span>
              }
              subtitle="Success is not only about finishing a book. It is about creating something clear, useful, meaningful, and ready for readers."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {SUCCESS_SNAPSHOT_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured stories */}
      <section
        id={SUCCESS_STORIES_PAGE_IDS.stories}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="featured-stories-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="featured-stories-heading"
              title={
                <span className="site-cta-banner__line block">
                  Featured Author <span className="hero-heading__accent">Journeys</span>
                </span>
              }
              subtitle="Sample story formats showing the kinds of transformations Leaf Publisher can support."
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-6 sm:mt-12 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {FEATURED_STORIES.map((story) => (
              <motion.article
                key={story.id}
                variants={itemVariants}
                className="overflow-hidden rounded-3xl border border-line/80 bg-bg shadow-[0_20px_60px_-36px_rgba(26,34,24,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-green/30 hover:shadow-[0_28px_70px_-32px_rgba(133,199,39,0.15)]"
              >
                <div className="border-b border-line/80 bg-green/6 px-6 py-4 sm:px-8">
                  <span className="inline-flex items-center rounded-full border border-green/25 bg-green/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-green">
                    {story.label}
                  </span>
                </div>
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                      {story.title}
                    </h3>
                    <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-muted">
                      {story.authorType}
                    </span>
                  </div>

                  <dl className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Challenge
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-text sm:text-[0.9375rem]">
                        {story.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Solution
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-text sm:text-[0.9375rem]">
                        {story.solution}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Outcome
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-text sm:text-[0.9375rem]">
                        {story.outcome}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green px-6 text-sm font-semibold text-white shadow-[0_10px_36px_-14px_rgba(133,199,39,0.5)] transition-colors hover:bg-green2"
                  >
                    {story.buttonLabel}
                    <HiArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before & After */}
      <section
        className="border-t border-line/80 text-text"
        aria-labelledby="before-after-heading"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--paper) 80%, var(--bg)) 0%, var(--bg) 50%, color-mix(in srgb, var(--green) 6%, var(--paper)) 100%)",
        }}
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="before-after-heading"
              title={
                <span className="site-cta-banner__line block">
                  Before Leaf Publisher.{" "}
                  <span className="hero-heading__accent">After Leaf Publisher.</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-2 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-line/80 bg-bg/90 p-6 shadow-[0_20px_60px_-36px_rgba(26,34,24,0.1)] sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full border border-line bg-paper text-muted">
                  <HiX className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-text">
                  Before
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {BEFORE_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted/50"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-green/30 bg-linear-to-br from-green/8 via-bg to-bg p-6 shadow-[0_24px_70px_-32px_rgba(133,199,39,0.2)] sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full border border-green/30 bg-green/12 text-green">
                  <HiCheck className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-text">
                  After
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {AFTER_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text sm:text-[0.9375rem]"
                  >
                    <HiCheck
                      className="mt-0.5 size-4 shrink-0 text-green"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story categories */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="story-categories-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="story-categories-heading"
              title={
                <span className="site-cta-banner__line block">
                  Stories by <span className="hero-heading__accent">Author Type</span>
                </span>
              }
              subtitle="Different authors need different kinds of support."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {STORY_CATEGORIES.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <h3 className="font-display text-xl font-bold tracking-tight text-text">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="success-process-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="success-process-heading"
              title={
                <span className="site-cta-banner__line block">
                  The Process Behind Every{" "}
                  <span className="hero-heading__accent">Strong Ebook</span>
                </span>
              }
              subtitle="A good result comes from clear steps, not guesswork."
            />
          </motion.div>

          <motion.ol
            className="mt-10 flex flex-col gap-0 sm:mt-12 lg:flex-row lg:gap-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {SUCCESS_PROCESS_STEPS.map((step, index) => (
              <motion.li
                key={step.title}
                variants={itemVariants}
                className="relative flex flex-1 flex-col border-l border-line/80 py-6 pl-6 first:border-l-0 lg:border-l lg:border-t-0 lg:py-0 lg:pl-0 lg:pt-0 lg:first:border-l-0"
              >
                {index < SUCCESS_PROCESS_STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-0 top-8 hidden h-0.5 w-full bg-line lg:block"
                    style={{ left: "50%", width: "100%" }}
                  />
                ) : null}
                <div className="relative z-10 flex flex-col lg:items-center lg:px-4 lg:text-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-green text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(133,199,39,0.5)]">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Trust / no fake claims */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="trust-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="trust-heading"
              title={
                <span className="site-cta-banner__line block">
                  Our Promise Is Clarity,{" "}
                  <span className="hero-heading__accent">Not Fake Numbers</span>
                </span>
              }
            />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Success stories should be honest. Leaf Publisher should only show real
              names, testimonials, sales results, rankings, or publishing achievements
              when they are confirmed and approved.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
              Until real client results are added, this page should focus on the
              process, example journeys, and the type of transformation authors can
              expect from professional ebook support.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {TRUST_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] sm:p-7"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="testimonials-placeholder-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="testimonials-placeholder-heading"
              title={
                <span className="site-cta-banner__line block">
                  Author <span className="hero-heading__accent">Feedback</span>
                </span>
              }
              subtitle="Real testimonials can be added here once approved by clients."
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-2xl sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div className="rounded-3xl border border-dashed border-line bg-bg/80 px-8 py-12 text-center sm:px-12 sm:py-14">
              <span className="inline-flex items-center rounded-full border border-line bg-paper px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
                {TESTIMONIAL_PLACEHOLDER.label}
              </span>
              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                {TESTIMONIAL_PLACEHOLDER.text}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case study template */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="case-study-template-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="case-study-template-heading"
              title={
                <span className="site-cta-banner__line block">
                  Future Case Study <span className="hero-heading__accent">Format</span>
                </span>
              }
              subtitle="Use this structure when real success stories are ready to publish."
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div className="overflow-hidden rounded-3xl border border-green/25 bg-linear-to-br from-green/6 via-bg to-paper shadow-[0_24px_70px_-32px_rgba(133,199,39,0.15)]">
              <div className="border-b border-line/80 px-6 py-4 sm:px-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-green">
                  Template
                </span>
              </div>
              <dl className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Case Study Title
                  </dt>
                  <dd className="mt-1 font-display text-xl font-bold text-text">
                    {CASE_STUDY_TEMPLATE.title}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Author Type
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{CASE_STUDY_TEMPLATE.authorType}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Challenge
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{CASE_STUDY_TEMPLATE.challenge}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Support Provided
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{CASE_STUDY_TEMPLATE.support}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Final Result
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{CASE_STUDY_TEMPLATE.result}</dd>
                </div>
              </dl>
              <div className="border-t border-line/80 px-6 py-6 sm:px-8">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green px-6 text-sm font-semibold text-white shadow-[0_10px_36px_-14px_rgba(133,199,39,0.5)] transition-colors hover:bg-green2"
                >
                  {CASE_STUDY_TEMPLATE.cta}
                  <HiArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Author CTA */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="author-cta-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <h2
              id="author-cta-heading"
              className="site-cta-banner__headline text-text"
            >
              <span className="site-cta-banner__line block">
                Your Story Could Be{" "}
                <span className="hero-heading__accent">Next</span>
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Whether you have a blank page, a rough draft, or a nearly finished
              manuscript, Leaf Publisher can help you shape, refine, design, and
              prepare your ebook for readers.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-white shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
            >
              Start Your Book Project
              <HiArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="success-faq-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="success-faq-heading"
              title={
                <span className="site-cta-banner__line block">
                  Success Stories <span className="hero-heading__accent">Questions</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line/80 bg-paper shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            {SUCCESS_FAQS.map((faq) => (
              <SuccessFaqItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqId === faq.id}
                onToggle={() =>
                  setOpenFaqId((current) => (current === faq.id ? null : faq.id))
                }
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="border-t border-line/80 text-white"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="success-final-cta-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 px-6 py-12 text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:px-10 sm:py-14"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(55% 45% at 50% 0%, color-mix(in srgb, var(--green) 16%, transparent), transparent 58%),
                  radial-gradient(40% 35% at 80% 100%, color-mix(in srgb, var(--green2) 10%, transparent), transparent 50%),
                  linear-gradient(180deg, #141414 0%, ${DARK_BG} 100%)
                `,
              }}
            />
            <h2
              id="success-final-cta-heading"
              className="relative site-cta-banner__headline"
            >
              <span className="site-cta-banner__line block">
                Start the Journey From Idea to Ebook
              </span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              A strong book does not happen by accident. It takes structure, clarity,
              creativity, and the right support. Leaf Publisher helps authors move from
              first idea to reader-ready ebook with confidence.
            </p>
            <div className="relative mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-white shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
              >
                Start Your Story
                <HiArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/for-authors"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-8 text-sm font-semibold text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
              >
                Explore Author Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
