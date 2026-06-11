"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight, HiCheck, HiOutlinePlus } from "react-icons/hi";

import {
  AFTER_POINTS,
  AUDIENCE_CARDS,
  AUTHOR_FAQS,
  AUTHOR_PROCESS,
  AUTHOR_SERVICES,
  BEFORE_POINTS,
  BOOK_TYPES,
  FOR_AUTHORS_PAGE_IDS,
  GUIDANCE_CARDS,
  PAIN_POINTS,
  WHY_CHOOSE,
  type AuthorFaq,
} from "@/components/for-authors/for-authors-data";
import { ForAuthorsHeroVisual } from "@/components/for-authors/for-authors-hero-visual";
import {
  BookPage,
  BookmarkTab,
  CorkBoardSection,
  IndexCard,
  NotebookSection,
  StickyNote,
  StickyTag,
  STICKY_ROTATIONS,
  type StickyTone,
} from "@/components/for-authors/for-authors-ui";

const EASE = [0.22, 1, 0.36, 1] as const;
const STICKY_TONES: StickyTone[] = ["yellow", "mint", "blush", "cream"];

function DecorativeGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-green/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-green2/14 blur-3xl"
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
          {isDark ? (
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm sm:text-xs">
              {eyebrow}
            </span>
          ) : (
            <BookmarkTab>{eyebrow}</BookmarkTab>
          )}
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

function AuthorFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: AuthorFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `author-faq-panel-${faq.id}`;
  const buttonId = `author-faq-button-${faq.id}`;
  const panelTransition = reduceMotion
    ? { duration: 0.15 }
    : { duration: 0.38, ease: EASE };

  return (
    <motion.div
      layout={!reduceMotion}
      className={`border-b border-dashed border-line/70 last:border-b-0 ${isOpen ? "bg-green/5" : ""}`}
      transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: EASE }}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          className="group flex w-full items-center justify-between gap-4 px-1 py-5 text-left transition-colors sm:gap-5 sm:py-6"
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
            <p className="px-1 pb-5 text-sm leading-relaxed text-muted sm:pb-6 sm:text-[0.9375rem]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ForAuthorsPage() {
  const reduceMotion = useReducedMotion();
  const [openFaqId, setOpenFaqId] = useState<string | null>(AUTHOR_FAQS[0]?.id ?? null);

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.05,
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
        className="fa-lined-hero relative overflow-hidden"
        aria-labelledby="for-authors-hero-heading"
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
              <motion.p variants={softItemVariants} className="mb-4">
                <BookmarkTab>For Authors</BookmarkTab>
              </motion.p>

              <motion.h1
                id="for-authors-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2.1rem,5.5vw+0.35rem,3.75rem)] font-bold leading-[1.06] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Turn Your Book Idea Into a Polished Ebook{" "}
                  <span className="hero-heading__accent">Ready for Readers</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-prose text-base leading-relaxed text-muted sm:text-lg"
              >
                Leaf Publisher helps authors move from idea, draft, or manuscript to a
                professionally written, edited, designed, formatted, and
                publishing-ready ebook. Whether you are starting from scratch or
                refining an existing book, our team helps make the process clearer
                and easier.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 sm:w-auto"
                >
                  Start Your Book Project
                </Link>
                <a
                  href={`#${FOR_AUTHORS_PAGE_IDS.services}`}
                  className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-bg/90 px-6 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
                >
                  Explore Services
                  <HiArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </motion.div>
            </motion.div>

            <ForAuthorsHeroVisual />
          </div>
        </div>
      </section>

      {/* Pain points */}
      <NotebookSection
        className="border-t border-line/80 text-text"
        aria-labelledby="for-authors-pain-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-pain-heading"
              title={
                <span className="site-cta-banner__line block">
                  Writing a Book Should Feel Exciting,{" "}
                  <span className="hero-heading__accent">Not Overwhelming</span>
                </span>
              }
            />
            <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted sm:text-lg">
              Many authors have strong ideas but get stuck between planning, writing,
              editing, formatting, design, and publishing decisions. A book can quickly
              become difficult to manage without the right creative and technical
              support.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-muted sm:text-lg">
              Leaf Publisher brings those steps together so you can focus on the message
              while our team helps shape the book into something structured, readable,
              and professionally presented.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {PAIN_POINTS.map((card, i) => {
              const Icon = card.icon;
              const tone = STICKY_TONES[i % STICKY_TONES.length];
              return (
                <motion.div key={card.title} variants={itemVariants} className="h-full">
                  <StickyNote
                    tone={tone}
                    rotate={STICKY_ROTATIONS[i % STICKY_ROTATIONS.length]}
                    className="h-full"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg border border-black/8 bg-white/35 text-green">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[#4a4038]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#6f6468] sm:text-[0.9375rem]">
                      {card.description}
                    </p>
                  </StickyNote>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </NotebookSection>

      {/* Services */}
      <section
        id={FOR_AUTHORS_PAGE_IDS.services}
        className="scroll-mt-28 border-t border-line/80 bg-[#f6f2ec] text-text"
        aria-labelledby="for-authors-services-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-services-heading"
              title={
                <span className="site-cta-banner__line block">
                  Everything Your Ebook Needs in{" "}
                  <span className="hero-heading__accent">One Place</span>
                </span>
              }
              subtitle="From the first idea to final publishing preparation, Leaf Publisher supports every stage of ebook creation."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {AUTHOR_SERVICES.map((service, i) => {
              const Icon = service.icon;
              const tabTone = STICKY_TONES[i % STICKY_TONES.length];
              return (
                <motion.div key={service.title} variants={itemVariants} className="h-full">
                  <IndexCard
                    tab={`0${i + 1}`}
                    tabTone={tabTone}
                    className="h-full transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="flex size-12 items-center justify-center rounded-lg border border-line/80 bg-paper text-green">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                      {service.description}
                    </p>
                  </IndexCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <NotebookSection
        className="border-t border-line/80 text-text"
        aria-labelledby="for-authors-process-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-process-heading"
              title={
                <span className="site-cta-banner__line block">
                  How the Author Journey{" "}
                  <span className="hero-heading__accent">Works</span>
                </span>
              }
              subtitle="A simple step-by-step process designed to keep your ebook moving forward with clarity."
            />
          </motion.div>

          <motion.ol
            className="relative mt-10 space-y-4 sm:mt-12 sm:space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <div
              aria-hidden
              className="absolute bottom-4 left-6 top-4 hidden w-px bg-linear-to-b from-green/40 via-line to-transparent sm:block"
            />
            {AUTHOR_PROCESS.map((step, i) => (
              <motion.li key={step.title} variants={itemVariants} className="relative sm:pl-4">
                <StickyNote
                  tone={STICKY_TONES[i % STICKY_TONES.length]}
                  rotate={STICKY_ROTATIONS[(i + 2) % STICKY_ROTATIONS.length]}
                  className="flex gap-4 sm:gap-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-green/30 bg-white/45 font-display text-lg font-bold text-green sm:size-12">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-display text-xl font-bold tracking-tight text-[#4a4038] sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6f6468] sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </StickyNote>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </NotebookSection>

      {/* Who we help */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="for-authors-audience-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-audience-heading"
              title={
                <span className="site-cta-banner__line block">
                  Who We <span className="hero-heading__accent">Help</span>
                </span>
              }
              subtitle="Leaf Publisher supports different types of authors and creators."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {AUDIENCE_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title} variants={itemVariants} className="h-full">
                  <StickyNote
                    tone={STICKY_TONES[(i + 1) % STICKY_TONES.length]}
                    rotate={STICKY_ROTATIONS[(i + 3) % STICKY_ROTATIONS.length]}
                    className="h-full"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg border border-black/8 bg-white/35 text-green">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-[#4a4038]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6f6468] sm:text-[0.9375rem]">
                      {card.description}
                    </p>
                  </StickyNote>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Book types */}
      <CorkBoardSection
        className="border-t border-line/80 text-text"
        aria-labelledby="for-authors-book-types-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-book-types-heading"
              title={
                <span className="site-cta-banner__line block">
                  What Kind of Ebook Can You{" "}
                  <span className="hero-heading__accent">Create?</span>
                </span>
              }
            />
            <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted sm:text-lg">
              No matter the genre or purpose, our goal is to help shape your ebook into
              a clear, professional, and reader-friendly final product.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {BOOK_TYPES.map((type, i) => (
              <motion.span key={type} variants={itemVariants}>
                <StickyTag
                  tone={STICKY_TONES[i % STICKY_TONES.length]}
                  rotate={STICKY_ROTATIONS[(i + 1) % STICKY_ROTATIONS.length]}
                >
                  {type}
                </StickyTag>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </CorkBoardSection>

      {/* Why choose */}
      <CorkBoardSection
        className="border-t border-line/80 text-text"
        aria-labelledby="for-authors-why-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-why-heading"
              title={
                <span className="site-cta-banner__line block">
                  Why Authors Choose{" "}
                  <span className="hero-heading__accent">Leaf Publisher</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {WHY_CHOOSE.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title} variants={itemVariants} className="h-full">
                  <StickyNote
                    tone={STICKY_TONES[i % STICKY_TONES.length]}
                    rotate={STICKY_ROTATIONS[(i + 4) % STICKY_ROTATIONS.length]}
                    className="h-full"
                  >
                    <span className="flex size-11 items-center justify-center rounded-lg border border-black/8 bg-white/40 text-green">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[#4a4038] sm:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#6f6468] sm:text-base">
                      {card.description}
                    </p>
                  </StickyNote>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </CorkBoardSection>

      {/* Before / After */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="for-authors-compare-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-compare-heading"
              title={
                <span className="site-cta-banner__line block">
                  From Rough Idea to{" "}
                  <span className="hero-heading__accent">Reader-Ready Ebook</span>
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
            <motion.div variants={itemVariants}>
              <BookPage variant="lined">
                <h3 className="font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                  Before Leaf Publisher
                </h3>
                <ul className="mt-5 space-y-3" role="list">
                  {BEFORE_POINTS.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-muted sm:text-base">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-text/30" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </BookPage>
            </motion.div>

            <motion.div variants={itemVariants}>
              <BookPage variant="success">
                <h3 className="font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                  After Leaf Publisher
                </h3>
                <ul className="mt-5 space-y-3" role="list">
                  {AFTER_POINTS.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-text sm:text-base">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                        <HiCheck className="size-3.5" strokeWidth={2.5} aria-hidden />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </BookPage>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Guidance */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="for-authors-guidance-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-guidance-heading"
              title={
                <span className="site-cta-banner__line block">
                  Author Guidance Built Into the{" "}
                  <span className="hero-heading__accent">Process</span>
                </span>
              }
            />
            <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-muted sm:text-lg">
              A strong ebook is not just about writing pages. It needs the right
              structure, title direction, cover presentation, category fit, description,
              and publishing preparation. Leaf Publisher helps authors think through these
              details so the book feels more complete before launch.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {GUIDANCE_CARDS.map((card, i) => (
              <motion.div key={card.title} variants={itemVariants} className="h-full">
                <StickyNote
                  tone={STICKY_TONES[i % STICKY_TONES.length]}
                  rotate={STICKY_ROTATIONS[(i + 5) % STICKY_ROTATIONS.length]}
                  className="h-full"
                >
                  <span
                    aria-hidden
                    className="font-display text-3xl font-bold leading-none text-green/25"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[#4a4038]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6f6468] sm:text-[0.9375rem]">
                    {card.description}
                  </p>
                </StickyNote>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Author CTA */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="for-authors-mid-cta-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <BookPage variant="lined" className="mx-auto max-w-3xl text-center">
              <h2 id="for-authors-mid-cta-heading" className="site-cta-banner__headline text-text">
                <span className="site-cta-banner__line block">
                  Have a Book Idea or{" "}
                  <span className="hero-heading__accent">Manuscript?</span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Share your idea with Leaf Publisher and we will help you understand the
                best next step, whether that means writing from scratch, editing an
                existing draft, designing the cover, formatting the ebook, or preparing
                it for publishing.
              </p>
              <Link
                href="/contact"
                className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
              >
                Discuss My Book
              </Link>
            </BookPage>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <NotebookSection
        className="border-t border-line/80 text-text"
        aria-labelledby="for-authors-faq-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="for-authors-faq-heading"
              title={
                <span className="site-cta-banner__line block">
                  Questions Authors{" "}
                  <span className="hero-heading__accent">Often Ask</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
          >
            <BookPage variant="lined" className="px-4 sm:px-6">
            {AUTHOR_FAQS.map((faq) => (
              <AuthorFaqItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqId === faq.id}
                onToggle={() =>
                  setOpenFaqId((current) => (current === faq.id ? null : faq.id))
                }
              />
            ))}
            </BookPage>
          </motion.div>
        </div>
      </NotebookSection>

      {/* Final CTA */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="for-authors-final-cta-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <BookPage variant="success" className="mx-auto max-w-3xl text-center">
              <h2 id="for-authors-final-cta-heading" className="site-cta-banner__headline text-text">
                <span className="site-cta-banner__line block">
                  Your Ebook Deserves a{" "}
                  <span className="hero-heading__accent">Professional Start</span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Whether you are starting with a blank page or a finished manuscript,
                Leaf Publisher can help you create, refine, design, and prepare your
                ebook for readers.
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
                >
                  Start Your Book Project
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-bg px-8 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
                >
                  View Pricing
                </Link>
                <Link
                  href="/royalties"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-bg px-8 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
                >
                  Understand Royalties
                </Link>
                <Link
                  href="/success-stories"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-bg px-8 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
                >
                  Success Stories
                </Link>
              </div>
            </BookPage>
          </motion.div>
        </div>
      </section>
    </>
  );
}
