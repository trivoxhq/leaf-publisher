"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight, HiOutlinePlus } from "react-icons/hi";

import { ComingSoonCard } from "@/components/new-releases/coming-soon-card";
import { NewReleaseCard } from "@/components/new-releases/new-release-card";
import { NewReleaseHighlightCard } from "@/components/new-releases/new-release-highlight-card";
import { NewReleasesEmptyState } from "@/components/new-releases/new-releases-empty-state";
import {
  NewReleasesFilters,
  type NewReleasesFilterState,
} from "@/components/new-releases/new-releases-filters";
import { NewReleasesHeroVisual } from "@/components/new-releases/new-releases-hero-visual";
import {
  AUTHOR_RELEASE_CARDS,
  COMING_SOON_TITLES,
  FEATURED_NEW_RELEASES,
  NEW_RELEASE_CATEGORY_PILLS,
  NEW_RELEASE_FAQS,
  NEW_RELEASE_GRID_TITLES,
  NEW_RELEASES_PAGE_IDS,
  RELEASE_TYPE_PILLS,
  type NewReleaseFaq,
  type NewReleaseFilterFormat,
  type NewReleaseTitle,
} from "@/components/new-releases/new-releases-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

function formatMatchesFilter(bookFormat: string, filterFormat: string): boolean {
  if (filterFormat === "All Formats") return true;
  if (filterFormat === "Coming Soon") {
    return bookFormat === "Coming Soon";
  }
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

function filterNewReleases(
  titles: readonly NewReleaseTitle[],
  filters: NewReleasesFilterState
): NewReleaseTitle[] {
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

    const matchesFormat =
      filters.format === "Coming Soon"
        ? title.badge === "Coming Soon"
        : formatMatchesFilter(title.format, filters.format);

    return matchesQuery && matchesCategory && matchesFormat;
  });

  if (filters.sort === "A-Z") {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sort === "Newest First") {
    results = [...results].reverse();
  } else if (filters.sort === "Recently Added") {
    const recentBadges = new Set(["Recently Added", "Fresh Pick", "New Release", "New Preview"]);
    results = [...results].sort((a, b) => {
      const aScore = recentBadges.has(a.badge) ? 1 : 0;
      const bScore = recentBadges.has(b.badge) ? 1 : 0;
      return bScore - aScore;
    });
  } else if (filters.sort === "Coming Soon") {
    results = [...results].sort((a, b) => {
      const aScore = a.badge === "Coming Soon" ? 1 : 0;
      const bScore = b.badge === "Coming Soon" ? 1 : 0;
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

function NewReleaseFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: NewReleaseFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `new-release-faq-panel-${faq.id}`;
  const buttonId = `new-release-faq-button-${faq.id}`;
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

export function NewReleasesPage() {
  const reduceMotion = useReducedMotion();
  const [filters, setFilters] = useState<NewReleasesFilterState>({
    query: "",
    category: "All Categories",
    format: "All Formats",
    sort: "Newest First",
  });
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    NEW_RELEASE_FAQS[0]?.id ?? null
  );

  const filteredReleases = useMemo(
    () => filterNewReleases(NEW_RELEASE_GRID_TITLES, filters),
    [filters]
  );

  const applyFormatFilter = useCallback((format: NewReleaseFilterFormat) => {
    setFilters((prev) => ({ ...prev, format }));
    document.getElementById(NEW_RELEASES_PAGE_IDS.grid)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

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
        aria-labelledby="new-releases-hero-heading"
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
                New Releases
              </motion.p>

              <motion.h1
                id="new-releases-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2rem,4.5vw+0.5rem,3.35rem)] font-bold leading-[1.08] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Fresh Books, New Ideas, and Stories{" "}
                  <span className="hero-heading__accent">Just Getting Started</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              >
                Explore the latest ebooks, upcoming titles, fresh previews, and newly
                added reading paths from Leaf Publisher. Discover new voices, useful
                guides, creative stories, and publishing-ready books across different
                categories.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href={`#${NEW_RELEASES_PAGE_IDS.grid}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Explore New Releases
                  <HiArrowRight className="size-4" aria-hidden />
                </a>
                <Link
                  href="/browse"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-bg/90 px-8 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Browse All Books
                </Link>
              </motion.div>
            </motion.div>

            <NewReleasesHeroVisual />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="new-releases-featured-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="new-releases-featured-heading"
              title={
                <span className="site-cta-banner__line block">
                  Featured <span className="hero-heading__accent">New Releases</span>
                </span>
              }
              subtitle="Fresh picks and newly added titles prepared for curious readers."
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-6 sm:mt-12 sm:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {FEATURED_NEW_RELEASES.map((release) => (
              <motion.div key={release.slug} variants={itemVariants}>
                <NewReleaseHighlightCard release={release} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section
        id={NEW_RELEASES_PAGE_IDS.filters}
        className="scroll-mt-28 border-t border-line/80 bg-bg text-text"
        aria-labelledby="new-releases-search-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="new-releases-search-heading"
              title={
                <span className="site-cta-banner__line block">
                  Find the <span className="hero-heading__accent">Latest Reads</span>
                </span>
              }
              subtitle="Browse new titles by category, format, or reading interest."
            />
          </motion.div>

          <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
            <NewReleasesFilters
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
        id={NEW_RELEASES_PAGE_IDS.grid}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="new-releases-grid-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="new-releases-grid-heading"
              title={
                <span className="site-cta-banner__line block">
                  Browse <span className="hero-heading__accent">New Releases</span>
                </span>
              }
              subtitle="Discover fresh ebooks, sample chapters, guides, and upcoming reader resources."
            />
          </motion.div>

          {filteredReleases.length === 0 ? (
            <div className="mt-10 sm:mt-12">
              <NewReleasesEmptyState />
            </div>
          ) : (
            <motion.div
              className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {filteredReleases.map((release) => (
                <motion.div key={release.slug} variants={itemVariants} className="h-full">
                  <NewReleaseCard release={release} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Coming soon */}
      <section
        id={NEW_RELEASES_PAGE_IDS.comingSoon}
        className="scroll-mt-28 border-t border-line/80 bg-bg text-text"
        aria-labelledby="coming-soon-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="coming-soon-heading"
              title={
                <span className="site-cta-banner__line block">
                  <span className="hero-heading__accent">Coming Soon</span>
                </span>
              }
              subtitle="Upcoming titles and reader resources being prepared for the Leaf Publisher library."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {COMING_SOON_TITLES.map((title) => (
              <motion.div key={title.slug} variants={itemVariants} className="h-full">
                <ComingSoonCard title={title} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Release types */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="release-type-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="release-type-heading"
              title={
                <span className="site-cta-banner__line block">
                  Browse by <span className="hero-heading__accent">Release Type</span>
                </span>
              }
              subtitle="Choose the kind of fresh content you want to explore."
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {RELEASE_TYPE_PILLS.map((pill) => (
              <motion.div key={pill.label} variants={itemVariants}>
                {pill.action === "browse" ? (
                  <Link
                    href="/browse"
                    className="group inline-flex items-center rounded-full border border-line/80 bg-bg px-5 py-3 text-sm font-semibold text-text shadow-[0_8px_28px_-20px_rgba(26,34,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:bg-paper hover:shadow-[0_12px_36px_-18px_rgba(133,199,39,0.2)]"
                  >
                    {pill.label}
                  </Link>
                ) : pill.action === "for-authors" ? (
                  <Link
                    href="/for-authors"
                    className="group inline-flex items-center rounded-full border border-line/80 bg-bg px-5 py-3 text-sm font-semibold text-text shadow-[0_8px_28px_-20px_rgba(26,34,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:bg-paper hover:shadow-[0_12px_36px_-18px_rgba(133,199,39,0.2)]"
                  >
                    {pill.label}
                  </Link>
                ) : pill.action === "coming-soon" ? (
                  <a
                    href={`#${NEW_RELEASES_PAGE_IDS.comingSoon}`}
                    className="group inline-flex items-center rounded-full border border-line/80 bg-bg px-5 py-3 text-sm font-semibold text-text shadow-[0_8px_28px_-20px_rgba(26,34,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:bg-paper hover:shadow-[0_12px_36px_-18px_rgba(133,199,39,0.2)]"
                  >
                    {pill.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => pill.format && applyFormatFilter(pill.format)}
                    className="group inline-flex items-center rounded-full border border-line/80 bg-bg px-5 py-3 text-sm font-semibold text-text shadow-[0_8px_28px_-20px_rgba(26,34,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:bg-paper hover:shadow-[0_12px_36px_-18px_rgba(133,199,39,0.2)]"
                  >
                    {pill.label}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="new-releases-categories-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="new-releases-categories-heading"
              title={
                <span className="site-cta-banner__line block">
                  New Releases by <span className="hero-heading__accent">Category</span>
                </span>
              }
              subtitle="Fresh titles across the categories readers explore most."
            />
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {NEW_RELEASE_CATEGORY_PILLS.map((pill) => (
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

      {/* Author opportunity */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="new-releases-author-heading"
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
              id="new-releases-author-heading"
              title={
                <span className="site-cta-banner__line block">
                  Preparing a New Ebook{" "}
                  <span className="hero-heading__accent">Release?</span>
                </span>
              }
              subtitle="Leaf Publisher helps authors write, edit, design, format, and prepare ebooks for launch. Whether your book is still an idea, a rough draft, or almost ready, our team can help shape it into a polished release that feels clear and professional."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {AUTHOR_RELEASE_CARDS.map((card) => (
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
              Prepare My Release
              <HiArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="new-releases-faq-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="new-releases-faq-heading"
              title={
                <span className="site-cta-banner__line block">
                  New Releases <span className="hero-heading__accent">Questions</span>
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
            {NEW_RELEASE_FAQS.map((faq) => (
              <NewReleaseFaqItem
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
        aria-labelledby="new-releases-final-cta-heading"
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
              id="new-releases-final-cta-heading"
              className="site-cta-banner__headline"
            >
              <span className="site-cta-banner__line block">
                Fresh Reads Are Waiting to Be{" "}
                <span className="hero-heading__accent">Discovered</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Explore new ebooks, fresh guides, sample chapters, and upcoming titles
              from Leaf Publisher&apos;s growing digital library.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`#${NEW_RELEASES_PAGE_IDS.grid}`}
                className="site-cta-btn site-cta-btn--primary"
              >
                Browse New Releases
                <HiArrowRight className="size-4" aria-hidden />
              </a>
              <Link href="/categories" className="site-cta-btn site-cta-btn--secondary">
                Explore Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
