"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

import { BookCard } from "@/components/browse/book-card";
import { BrowseEmptyState } from "@/components/browse/browse-empty-state";
import {
  BrowseFilters,
  type BrowseFilterState,
} from "@/components/browse/browse-filters";
import { BrowseHeroVisual } from "@/components/browse/browse-hero-visual";
import { CategoryPill } from "@/components/browse/category-pill";
import {
  BROWSE_PAGE_IDS,
  FEATURED_BOOKS,
  NEW_NOTEWORTHY,
  POPULAR_CATEGORIES,
  READER_MOODS,
  type BrowseBook,
  type FilterCategory,
  type FilterFormat,
  type FilterSort,
} from "@/components/browse/browse-data";

const EASE = [0.22, 1, 0.36, 1] as const;

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
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-4 flex justify-center sm:mb-5">
          <span className="inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs">
            {eyebrow}
          </span>
        </p>
      ) : null}
      <h2 id={id} className="site-cta-banner__headline text-text">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

function filterBooks(
  books: readonly BrowseBook[],
  filters: BrowseFilterState
): BrowseBook[] {
  const query = filters.query.trim().toLowerCase();

  let results = books.filter((book) => {
    const matchesQuery =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query);

    const matchesCategory =
      filters.category === "All Categories" ||
      book.category === filters.category ||
      (filters.category === "Health & Wellness" && book.category === "Wellness");

    const matchesFormat =
      filters.format === "All Formats" || book.format === filters.format;

    return matchesQuery && matchesCategory && matchesFormat;
  });

  if (filters.sort === "A-Z") {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "Newest") {
    results = [...results].reverse();
  }

  return results;
}

export function BrowsePage() {
  const reduceMotion = useReducedMotion();
  const [filters, setFilters] = useState<BrowseFilterState>({
    query: "",
    category: "All Categories",
    format: "All Formats",
    sort: "Recommended",
  });

  const filteredBooks = useMemo(
    () => filterBooks(FEATURED_BOOKS, filters),
    [filters]
  );

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
        className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="browse-hero-heading"
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
                Browse Ebooks
              </motion.p>

              <motion.h1
                id="browse-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2.1rem,5.5vw+0.35rem,3.75rem)] font-bold leading-[1.06] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Discover Books That Match Your{" "}
                  <span className="hero-heading__accent">Curiosity</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-prose text-base leading-relaxed text-muted sm:text-lg"
              >
                Explore ebooks across fiction, business, self-help, memoir,
                education, wellness, technology, and more. Leaf Publisher makes
                it easier to find stories, ideas, and knowledge that feel worth
                your time.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <a
                  href={`#${BROWSE_PAGE_IDS.grid}`}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 sm:w-auto"
                >
                  Start Browsing
                </a>
                <Link
                  href="/categories"
                  className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-bg/90 px-6 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
                >
                  View Categories
                  <HiArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            </motion.div>

            <BrowseHeroVisual />
          </div>
        </div>
      </section>

      {/* Search & filters */}
      <section
        id={BROWSE_PAGE_IDS.filters}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="browse-filters-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="browse-filters-heading"
              title={
                <span className="site-cta-banner__line block">
                  Find Your Next <span className="hero-heading__accent">Read</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-10"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE, delay: 0.05 }}
          >
            <BrowseFilters
              filters={filters}
              onQueryChange={(query) =>
                setFilters((prev) => ({ ...prev, query }))
              }
              onCategoryChange={(category: FilterCategory) =>
                setFilters((prev) => ({ ...prev, category }))
              }
              onFormatChange={(format: FilterFormat) =>
                setFilters((prev) => ({ ...prev, format }))
              }
              onSortChange={(sort: FilterSort) =>
                setFilters((prev) => ({ ...prev, sort }))
              }
              onSearch={() => undefined}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured books */}
      <section
        id={BROWSE_PAGE_IDS.grid}
        className="scroll-mt-28 border-t border-line/80 bg-bg text-text"
        aria-labelledby="browse-featured-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="browse-featured-heading"
              title={
                <span className="site-cta-banner__line block">
                  Featured <span className="hero-heading__accent">Ebooks</span>
                </span>
              }
              subtitle="A curated selection of digital books and publishing-ready titles."
            />
          </motion.div>

          {filteredBooks.length === 0 ? (
            <div className="mt-10 sm:mt-12">
              <BrowseEmptyState />
            </div>
          ) : (
            <motion.div
              key={`${filters.query}-${filters.category}-${filters.format}-${filters.sort}`}
              className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredBooks.map((book) => (
                <motion.div key={book.slug} variants={itemVariants}>
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Popular categories */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="browse-popular-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="browse-popular-heading"
              title={
                <span className="site-cta-banner__line block">
                  Popular <span className="hero-heading__accent">Categories</span>
                </span>
              }
              subtitle="Explore reader paths based on your interests."
            />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {POPULAR_CATEGORIES.map((category) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <CategoryPill category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New & noteworthy */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="browse-noteworthy-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="browse-noteworthy-heading"
              title={
                <span className="site-cta-banner__line block">
                  New &amp; <span className="hero-heading__accent">Noteworthy</span>
                </span>
              }
              subtitle="Fresh ebook ideas and upcoming titles prepared for curious readers."
            />
          </motion.div>

          <div className="mt-10 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-none sm:mt-12 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
            {NEW_NOTEWORTHY.map((card) => (
              <article
                key={card.title}
                className={`group relative min-w-[min(18rem,calc(100vw-2.5rem))] shrink-0 overflow-hidden rounded-3xl border border-line/70 bg-linear-to-br p-6 shadow-[0_20px_60px_-36px_rgba(26,34,24,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_28px_70px_-32px_rgba(133,199,39,0.18)] sm:min-w-0 sm:p-7 ${card.accent}`}
              >
                <h3 className="font-display text-xl font-bold tracking-tight text-text sm:text-[1.35rem]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-green transition-colors group-hover:text-green2">
                  Explore
                  <HiArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reader mood */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="browse-mood-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="browse-mood-heading"
              title={
                <span className="site-cta-banner__line block">
                  Browse by Reading <span className="hero-heading__accent">Mood</span>
                </span>
              }
              subtitle="Not sure what to read? Start with how you want the book to feel."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {READER_MOODS.map((mood, i) => (
              <motion.article
                key={mood.title}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-3xl border border-line/70 bg-linear-to-br p-6 sm:p-8 ${mood.gradient}`}
              >
                <span
                  aria-hidden
                  className="font-display text-6xl font-bold leading-none text-green/8 sm:text-7xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-2 font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                  {mood.title}
                </h3>
                <p className="relative mt-3 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
                  {mood.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Author CTA */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="browse-author-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-line/80 bg-paper px-6 py-12 sm:px-10 sm:py-14 lg:px-16"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-green/8 via-transparent to-green2/10"
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 id="browse-author-heading" className="site-cta-banner__headline text-text">
                <span className="site-cta-banner__line block">
                  Want Your Ebook{" "}
                  <span className="hero-heading__accent">Listed Here?</span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Leaf Publisher helps authors write, edit, design, format, and
                prepare ebooks for a professional digital presence. If you have
                a book idea or manuscript, our team can help shape it into
                something ready for readers.
              </p>
              <Link
                href="/for-authors"
                className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
              >
                Start Publishing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="browse-cta-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-line/80 bg-bg px-6 py-12 text-center shadow-[0_24px_80px_-40px_rgba(26,34,24,0.12)] sm:px-10 sm:py-14 lg:px-16"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-green/8 via-transparent to-green2/10"
            />
            <div className="relative mx-auto max-w-3xl">
              <h2 id="browse-cta-heading" className="site-cta-banner__headline text-text">
                <span className="site-cta-banner__line block">
                  Your Next Ebook Could Be{" "}
                  <span className="hero-heading__accent">One Click Away</span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Browse stories, guides, ideas, and resources created to inform,
                inspire, and connect with readers.
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <Link
                  href="/categories"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
                >
                  Explore Categories
                </Link>
                <Link
                  href="/for-authors"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-bg px-8 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
                >
                  Start Your Book Project
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
