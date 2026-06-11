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

import { BestsellerCard } from "@/components/bestsellers/bestseller-card";
import { BestsellerHighlightCard } from "@/components/bestsellers/bestseller-highlight-card";
import { BestsellersEmptyState } from "@/components/bestsellers/bestsellers-empty-state";
import {
  BestsellersFilters,
  type BestsellersFilterState,
} from "@/components/bestsellers/bestsellers-filters";
import { BestsellersHeroVisual } from "@/components/bestsellers/bestsellers-hero-visual";
import {
  AUTHOR_OPPORTUNITY_CARDS,
  BESTSELLER_CATEGORY_PILLS,
  BESTSELLER_FAQS,
  BESTSELLER_GRID_TITLES,
  BESTSELLER_HIGHLIGHTS,
  BESTSELLERS_PAGE_IDS,
  POPULAR_READING_PATHS,
  READER_TRUST_CARDS,
  type BestsellerFaq,
  type BestsellerTitle,
} from "@/components/bestsellers/bestsellers-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

function formatMatchesFilter(bookFormat: string, filterFormat: string): boolean {
  if (filterFormat === "All Formats") return true;
  if (filterFormat === "Starter Guide") {
    return bookFormat === "Starter Guide" || bookFormat === "Guide";
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

function filterBestsellers(
  titles: readonly BestsellerTitle[],
  filters: BestsellersFilterState
): BestsellerTitle[] {
  const query = filters.query.trim().toLowerCase();

  let results = titles.filter((title) => {
    const matchesQuery =
      !query ||
      title.title.toLowerCase().includes(query) ||
      title.author.toLowerCase().includes(query) ||
      title.category.toLowerCase().includes(query) ||
      title.format.toLowerCase().includes(query) ||
      title.description.toLowerCase().includes(query) ||
      title.badge.toLowerCase().includes(query);

    const matchesCategory = categoryMatchesFilter(title.category, filters.category);
    const matchesFormat = formatMatchesFilter(title.format, filters.format);

    return matchesQuery && matchesCategory && matchesFormat;
  });

  if (filters.sort === "A-Z") {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "Newest") {
    results = [...results].reverse();
  } else if (filters.sort === "Popular Picks") {
    const popularBadges = new Set([
      "Popular Pick",
      "Popular Preview",
      "Reader Favorite",
      "Featured Pick",
    ]);
    results = [...results].sort((a, b) => {
      const aScore = popularBadges.has(a.badge) ? 1 : 0;
      const bScore = popularBadges.has(b.badge) ? 1 : 0;
      return bScore - aScore;
    });
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

function BestsellerFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: BestsellerFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `bestseller-faq-panel-${faq.id}`;
  const buttonId = `bestseller-faq-button-${faq.id}`;
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

export function BestsellersPage() {
  const reduceMotion = useReducedMotion();
  const [filters, setFilters] = useState<BestsellersFilterState>({
    query: "",
    category: "All Categories",
    format: "All Formats",
    sort: "Featured",
  });
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    BESTSELLER_FAQS[0]?.id ?? null
  );

  const filteredTitles = useMemo(
    () => filterBestsellers(BESTSELLER_GRID_TITLES, filters),
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
        aria-labelledby="bestsellers-hero-heading"
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
                Bestsellers
              </motion.p>

              <motion.h1
                id="bestsellers-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2rem,4.5vw+0.5rem,3.35rem)] font-bold leading-[1.08] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Discover the Books Readers Are{" "}
                  <span className="hero-heading__accent">Talking About</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              >
                Explore standout ebooks, popular picks, and high-interest titles
                across fiction, business, self-help, memoir, education, wellness,
                publishing, and more. Leaf Publisher makes it easier to find books
                that feel worth your next read.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href={`#${BESTSELLERS_PAGE_IDS.grid}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Explore Bestsellers
                  <HiArrowRight className="size-4" aria-hidden />
                </a>
                <Link
                  href="/categories"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-bg/90 px-8 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Browse Categories
                </Link>
              </motion.div>
            </motion.div>

            <BestsellersHeroVisual />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="bestsellers-highlights-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="bestsellers-highlights-heading"
              title={
                <span className="site-cta-banner__line block">
                  Top <span className="hero-heading__accent">Featured Picks</span>
                </span>
              }
              subtitle="A curated selection of standout ebooks and reader-focused titles."
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-6 sm:mt-12 sm:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {BESTSELLER_HIGHLIGHTS.map((book, i) => (
              <motion.div key={book.slug} variants={itemVariants}>
                <BestsellerHighlightCard book={book} rank={i + 1} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section
        id={BESTSELLERS_PAGE_IDS.filters}
        className="scroll-mt-28 border-t border-line/80 bg-bg text-text"
        aria-labelledby="bestsellers-search-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="bestsellers-search-heading"
              title={
                <span className="site-cta-banner__line block">
                  Find <span className="hero-heading__accent">Popular Reads</span>
                </span>
              }
              subtitle="Browse bestseller-style picks by topic, format, or reading interest."
            />
          </motion.div>

          <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
            <BestsellersFilters
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

      {/* Grid */}
      <section
        id={BESTSELLERS_PAGE_IDS.grid}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="bestsellers-grid-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="bestsellers-grid-heading"
              title={
                <span className="site-cta-banner__line block">
                  Browse <span className="hero-heading__accent">Bestselling Titles</span>
                </span>
              }
              subtitle="Explore books designed to inform, inspire, entertain, and connect with readers."
            />
          </motion.div>

          {filteredTitles.length === 0 ? (
            <div className="mt-10 sm:mt-12">
              <BestsellersEmptyState />
            </div>
          ) : (
            <motion.div
              className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {filteredTitles.map((book, i) => (
                <motion.div key={book.slug} variants={itemVariants} className="h-full">
                  <BestsellerCard book={book} rank={i + 1} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="bestsellers-categories-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="bestsellers-categories-heading"
              title={
                <span className="site-cta-banner__line block">
                  Bestsellers by <span className="hero-heading__accent">Category</span>
                </span>
              }
              subtitle="Explore popular reading paths across different genres and topics."
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {BESTSELLER_CATEGORY_PILLS.map((pill) => (
              <motion.div key={pill.label} variants={itemVariants}>
                <Link
                  href={pill.href}
                  className="group inline-flex items-center rounded-full border border-line/80 bg-paper px-5 py-2.5 text-sm font-semibold text-text shadow-[0_8px_28px_-20px_rgba(26,34,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:bg-bg hover:shadow-[0_12px_36px_-18px_rgba(133,199,39,0.2)]"
                >
                  {pill.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reading paths */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="bestsellers-paths-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="bestsellers-paths-heading"
              title={
                <span className="site-cta-banner__line block">
                  Popular <span className="hero-heading__accent">Reading Paths</span>
                </span>
              }
              subtitle="Start with the type of bestseller that matches your current interest."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {POPULAR_READING_PATHS.map((path) => (
              <motion.article
                key={path.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-line/80 bg-linear-to-br from-bg via-paper to-bg p-6 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_24px_70px_-36px_rgba(133,199,39,0.18)] sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-green/30 bg-green/10 font-display text-xl font-bold text-green">
                  {String(path.rank).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                  {path.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {path.description}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                  Related categories
                </p>
                <p className="mt-1.5 text-sm text-text/85">{path.categories}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reader trust */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="bestsellers-trust-heading"
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
              id="bestsellers-trust-heading"
              title={
                <span className="site-cta-banner__line block">
                  How We Highlight{" "}
                  <span className="hero-heading__accent">Popular Titles</span>
                </span>
              }
              subtitle="Bestseller-style sections should be based on real reader activity, confirmed sales data, featured editorial picks, or verified platform engagement once the live data system is connected. For now, this page can use curated placeholder content while the final book library, analytics, and ranking system are being prepared."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {READER_TRUST_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] sm:p-7"
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

      {/* Author opportunity */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="bestsellers-author-heading"
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
              id="bestsellers-author-heading"
              title={
                <span className="site-cta-banner__line block">
                  Want Your Ebook to{" "}
                  <span className="hero-heading__accent">Stand Out?</span>
                </span>
              }
              subtitle="Leaf Publisher helps authors prepare books that feel professional, clear, and ready for reader attention. From writing and editing to formatting, cover design, and publishing support, we help shape ebooks with stronger presentation and category direction."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {AUTHOR_OPPORTUNITY_CARDS.map((card) => (
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
              Prepare My Ebook
              <HiArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="bestsellers-faq-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="bestsellers-faq-heading"
              title={
                <span className="site-cta-banner__line block">
                  Bestseller <span className="hero-heading__accent">Questions</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line/80 bg-paper/50 py-1 sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            {BESTSELLER_FAQS.map((faq) => (
              <BestsellerFaqItem
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
        aria-labelledby="bestsellers-final-cta-heading"
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
              id="bestsellers-final-cta-heading"
              className="site-cta-banner__headline"
            >
              <span className="site-cta-banner__line block">
                Find the Titles Worth Your{" "}
                <span className="hero-heading__accent">Next Read</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Explore featured ebooks, popular picks, and standout reading paths
              across Leaf Publisher&apos;s growing digital library.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`#${BESTSELLERS_PAGE_IDS.grid}`}
                className="site-cta-btn site-cta-btn--primary"
              >
                Browse Bestsellers
                <HiArrowRight className="size-4" aria-hidden />
              </a>
              <Link href="/browse" className="site-cta-btn site-cta-btn--secondary">
                Explore All Books
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
