"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight, HiOutlinePlus } from "react-icons/hi";

import { FreeTitleCard } from "@/components/free-titles/free-title-card";
import { FreeTitlesEmptyState } from "@/components/free-titles/free-titles-empty-state";
import {
  FreeTitlesFilters,
  type FreeTitlesFilterState,
} from "@/components/free-titles/free-titles-filters";
import { FreeTitlesHeroVisual } from "@/components/free-titles/free-titles-hero-visual";
import {
  AUTHOR_FREE_SAMPLES,
  FEATURED_FREE_TITLES,
  FREE_CATEGORY_PILLS,
  FREE_TITLE_FAQS,
  FREE_TITLES_PAGE_IDS,
  WHY_FREE_TITLES,
  type FreeTitle,
  type FreeTitleFaq,
} from "@/components/free-titles/free-titles-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

function formatMatchesFilter(bookFormat: string, filterFormat: string): boolean {
  if (filterFormat === "All Formats") return true;
  if (filterFormat === "Full Ebook") {
    return bookFormat === "Full Ebook" || bookFormat === "Free Ebook";
  }
  if (filterFormat === "Sample Chapter") {
    return bookFormat === "Sample Chapter" || bookFormat === "Sample Story";
  }
  return bookFormat === filterFormat;
}

function categoryMatchesFilter(bookCategory: string, filterCategory: string): boolean {
  if (filterCategory === "All Categories") return true;
  if (filterCategory === "Wellness") {
    return bookCategory === "Wellness" || bookCategory === "Health & Wellness";
  }
  if (filterCategory === "Health & Wellness") {
    return bookCategory === "Health & Wellness" || bookCategory === "Wellness";
  }
  return bookCategory === filterCategory;
}

function filterFreeTitles(
  titles: readonly FreeTitle[],
  filters: FreeTitlesFilterState
): FreeTitle[] {
  const query = filters.query.trim().toLowerCase();

  let results = titles.filter((title) => {
    const matchesQuery =
      !query ||
      title.title.toLowerCase().includes(query) ||
      title.author.toLowerCase().includes(query) ||
      title.category.toLowerCase().includes(query) ||
      title.format.toLowerCase().includes(query) ||
      title.description.toLowerCase().includes(query);

    const matchesCategory = categoryMatchesFilter(title.category, filters.category);
    const matchesFormat = formatMatchesFilter(title.format, filters.format);

    return matchesQuery && matchesCategory && matchesFormat;
  });

  if (filters.sort === "A-Z") {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "Newest") {
    results = [...results].reverse();
  }

  return results;
}

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

function FreeTitleFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FreeTitleFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `free-faq-panel-${faq.id}`;
  const buttonId = `free-faq-button-${faq.id}`;
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
            <motion.div
              initial={reduceMotion ? false : { y: -6 }}
              animate={{ y: 0 }}
              exit={reduceMotion ? undefined : { y: -4 }}
              transition={panelTransition}
              className="px-1 pb-5 sm:pb-6"
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

export function FreeTitlesPage() {
  const reduceMotion = useReducedMotion();
  const [filters, setFilters] = useState<FreeTitlesFilterState>({
    query: "",
    category: "All Categories",
    format: "All Formats",
    sort: "Recommended",
  });
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    FREE_TITLE_FAQS[0]?.id ?? null
  );

  const filteredTitles = useMemo(
    () => filterFreeTitles(FEATURED_FREE_TITLES, filters),
    [filters]
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
        aria-labelledby="free-titles-hero-heading"
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
                Free Titles
              </motion.p>

              <motion.h1
                id="free-titles-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2rem,4.5vw+0.5rem,3.35rem)] font-bold leading-[1.08] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Start Reading Without{" "}
                  <span className="hero-heading__accent">Spending a Thing</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              >
                Explore free ebooks, sample chapters, starter guides, and
                reader-friendly titles from Leaf Publisher. Whether you want to
                discover a new author, learn something useful, or preview a book
                before committing, this is where your reading journey can begin.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href={`#${FREE_TITLES_PAGE_IDS.grid}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Browse Free Titles
                  <HiArrowRight className="size-4" aria-hidden />
                </a>
                <Link
                  href="/categories"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-bg/90 px-8 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Explore Categories
                </Link>
              </motion.div>
            </motion.div>

            <FreeTitlesHeroVisual />
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section
        id={FREE_TITLES_PAGE_IDS.filters}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="free-titles-search-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="free-titles-search-heading"
              title={
                <span className="site-cta-banner__line block">
                  Find a <span className="hero-heading__accent">Free Read</span>
                </span>
              }
              subtitle="Browse free titles by topic, format, or reading mood."
            />
          </motion.div>

          <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
            <FreeTitlesFilters
              filters={filters}
              onQueryChange={(query) => setFilters((prev) => ({ ...prev, query }))}
              onCategoryChange={(category) =>
                setFilters((prev) => ({ ...prev, category }))
              }
              onFormatChange={(format) => setFilters((prev) => ({ ...prev, format }))}
              onSortChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
              onSearch={() => undefined}
            />
          </div>
        </div>
      </section>

      {/* Featured free titles grid */}
      <section
        id={FREE_TITLES_PAGE_IDS.grid}
        className="scroll-mt-28 border-t border-line/80 bg-bg text-text"
        aria-labelledby="free-titles-grid-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="free-titles-grid-heading"
              title={
                <span className="site-cta-banner__line block">
                  Featured <span className="hero-heading__accent">Free Titles</span>
                </span>
              }
              subtitle="A curated selection of free reads, samples, and starter resources."
            />
          </motion.div>

          {filteredTitles.length === 0 ? (
            <div className="mt-10 sm:mt-12">
              <FreeTitlesEmptyState />
            </div>
          ) : (
            <motion.div
              className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {filteredTitles.map((title) => (
                <motion.div key={title.slug} variants={itemVariants} className="h-full">
                  <FreeTitleCard title={title} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Category pills */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="free-titles-categories-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="free-titles-categories-heading"
              title={
                <span className="site-cta-banner__line block">
                  Explore Free Titles by{" "}
                  <span className="hero-heading__accent">Category</span>
                </span>
              }
              subtitle="Choose a category and discover free reads that match your interests."
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {FREE_CATEGORY_PILLS.map((pill) => (
              <motion.div key={pill.label} variants={itemVariants}>
                <Link
                  href={pill.href}
                  className="group inline-flex items-center rounded-full border border-line/80 bg-bg px-5 py-2.5 text-sm font-semibold text-text shadow-[0_8px_28px_-20px_rgba(26,34,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:bg-paper hover:shadow-[0_12px_36px_-18px_rgba(133,199,39,0.2)]"
                >
                  {pill.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why free titles */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="free-titles-why-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="free-titles-why-heading"
              title={
                <span className="site-cta-banner__line block">
                  Why Explore <span className="hero-heading__accent">Free Titles?</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {WHY_FREE_TITLES.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="group flex h-full flex-col rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <h3 className="font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
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

      {/* Author opportunity */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="free-titles-author-heading"
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
              id="free-titles-author-heading"
              title={
                <span className="site-cta-banner__line block">
                  Want to Offer a Free Sample of{" "}
                  <span className="hero-heading__accent">Your Ebook?</span>
                </span>
              }
              subtitle="Free samples can help authors introduce their work, build trust with readers, and create interest before a full book launch. Leaf Publisher can help you prepare a sample chapter, reader magnet, starter guide, or free ebook preview that feels polished and professional."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {AUTHOR_FREE_SAMPLES.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-line/80 bg-bg p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
          >
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 hover:text-[#ffffff]!"
            >
              Prepare My Free Sample
              <HiArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Access notice */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="free-titles-access-heading"
      >
        <div className="container-site section-y">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            >
              <SectionHeader
                id="free-titles-access-heading"
                title={
                  <span className="site-cta-banner__line block">
                    How <span className="hero-heading__accent">Access Works</span>
                  </span>
                }
                subtitle="Some free titles may be available as full ebooks, while others may be sample chapters, short reads, or starter guides. Access options can vary based on the title, author, and publishing setup."
              />
            </motion.div>

            <motion.aside
              className="mt-10 rounded-2xl border border-green/25 bg-green/6 p-6 sm:mt-12 sm:p-8"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-green">
                Current Note
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                Free title downloads and reader accounts can be connected once the
                final ebook library or user system is ready.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="free-titles-faq-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="free-titles-faq-heading"
              title={
                <span className="site-cta-banner__line block">
                  Free Titles <span className="hero-heading__accent">Questions</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line/80 bg-bg/50 sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            {FREE_TITLE_FAQS.map((faq) => (
              <FreeTitleFaqItem
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
        className="relative overflow-hidden border-t border-line/80 text-white"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="free-titles-final-cta-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(133,199,39,0.14),transparent_65%)]"
        />
        <div className="container-site relative section-y">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <h2
              id="free-titles-final-cta-heading"
              className="site-cta-banner__headline"
            >
              <span className="site-cta-banner__line block">
                Free Reads. Fresh Ideas. A Better Place to{" "}
                <span className="hero-heading__accent">Begin.</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Explore free titles from Leaf Publisher and discover stories, guides,
              and resources that help you read, learn, and grow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a href={`#${FREE_TITLES_PAGE_IDS.grid}`} className="site-cta-btn site-cta-btn--primary">
                Browse Free Titles
                <HiArrowRight className="size-4" aria-hidden />
              </a>
              <Link href="/contact" className="site-cta-btn site-cta-btn--secondary">
                Start Your Book Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
