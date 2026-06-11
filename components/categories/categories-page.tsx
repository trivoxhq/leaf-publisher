"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Marquee from "react-fast-marquee";

import { CategoriesHeroVisual } from "@/components/categories/categories-hero-visual";
import {
  ALL_CATEGORIES,
  AUTHOR_CARDS,
  CATEGORIES_PAGE_IDS,
  DISCOVERY_TAGS,
  FEATURED_CATEGORIES,
  READER_PATHS,
  type CategoryItem,
  type FeaturedCategory,
} from "@/components/categories/categories-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

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
      <h2
        id={id}
        className={`site-cta-banner__headline ${isDark ? "" : "text-text"}`}
      >
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

function FeaturedCategoryCard({ category }: { category: FeaturedCategory }) {
  const reduceMotion = useReducedMotion();
  const Icon = category.icon;

  return (
    <motion.article
      className="group relative isolate flex h-full min-h-52 flex-col overflow-hidden rounded-3xl border border-line/70 bg-bg p-6 shadow-[0_24px_70px_-40px_rgba(26,34,24,0.14)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-green/40 hover:shadow-[0_32px_80px_-36px_rgba(133,199,39,0.22)] sm:min-h-56 sm:p-7"
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${category.accent}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-green/8 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative flex size-14 items-center justify-center rounded-2xl border border-line bg-paper text-green shadow-[0_0_28px_-8px_rgba(133,199,39,0.35)] transition-all duration-300 group-hover:border-green/45 group-hover:bg-green/10 group-hover:text-green2">
        <Icon className="size-7" aria-hidden />
      </span>
      <h3 className="relative mt-6 font-display text-2xl font-bold tracking-tight text-text">
        {category.title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
        {category.description}
      </p>
      <span className="relative mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-green transition-colors group-hover:text-green2">
        Coming Soon
        <HiArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </motion.article>
  );
}

function CategoryGridCard({ category }: { category: CategoryItem }) {
  const Icon = category.icon;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line/80 bg-bg p-4 shadow-[0_12px_40px_-32px_rgba(26,34,24,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_50px_-30px_rgba(133,199,39,0.18)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-green transition-colors group-hover:border-green/40 group-hover:text-green2">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
          Explore
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-text">
        {category.name}
      </h3>
      <p className="mt-1.5 text-sm leading-snug text-muted">{category.description}</p>
    </article>
  );
}

export function CategoriesPage() {
  const reduceMotion = useReducedMotion();

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
        aria-labelledby="categories-hero-heading"
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
                Explore Categories
              </motion.p>

              <motion.h1
                id="categories-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2.1rem,5.5vw+0.35rem,3.75rem)] font-bold leading-[1.06] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Find the Stories, Knowledge, and Ideas That{" "}
                  <span className="hero-heading__accent">Match Your World</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-prose text-base leading-relaxed text-muted sm:text-lg"
              >
                Browse Leaf Publisher categories designed for curious readers,
                independent authors, entrepreneurs, and lifelong learners. From
                fiction and memoirs to business guides and educational ebooks,
                every category helps connect the right book with the right audience.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <a
                  href={`#${CATEGORIES_PAGE_IDS.grid}`}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 sm:w-auto"
                >
                  Explore Categories
                </a>
                <Link
                  href="/for-authors"
                  className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-bg/90 px-6 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
                >
                  Start Publishing
                  <HiArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            </motion.div>

            <CategoriesHeroVisual />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section
        id={CATEGORIES_PAGE_IDS.featured}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="categories-featured-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="categories-featured-heading"
              title={
                <span className="site-cta-banner__line block">
                  Featured <span className="hero-heading__accent">Categories</span>
                </span>
              }
              subtitle="Start with the most popular ebook paths readers and authors explore."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {FEATURED_CATEGORIES.map((category) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <FeaturedCategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Discovery grid */}
      <section
        id={CATEGORIES_PAGE_IDS.grid}
        className="scroll-mt-28 border-t border-line/80 bg-bg text-text"
        aria-labelledby="categories-grid-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="categories-grid-heading"
              title={
                <span className="site-cta-banner__line block">
                  Browse All <span className="hero-heading__accent">Categories</span>
                </span>
              }
              subtitle="Choose a category and discover ebooks built around your interests."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {ALL_CATEGORIES.map((category) => (
              <motion.div key={category.slug} variants={itemVariants}>
                <CategoryGridCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reader paths */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="categories-reader-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="categories-reader-heading"
              title={
                <span className="site-cta-banner__line block">
                  Not Sure Where to <span className="hero-heading__accent">Start?</span>
                </span>
              }
              subtitle="Choose the reading mood that matches what you need today."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {READER_PATHS.map((path, i) => (
              <motion.article
                key={path.title}
                variants={itemVariants}
                className={`relative overflow-hidden rounded-3xl border border-line/70 bg-linear-to-br p-6 sm:p-8 ${path.gradient}`}
              >
                <span
                  aria-hidden
                  className="font-display text-6xl font-bold leading-none text-green/8 sm:text-7xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-2 font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                  {path.title}
                </h3>
                <p className="relative mt-3 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
                  {path.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Author section */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="categories-author-heading"
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
              id="categories-author-heading"
              title={
                <span className="site-cta-banner__line block">
                  Publishing Your Own <span className="hero-heading__accent">Ebook?</span>
                </span>
              }
              subtitle="Leaf Publisher helps authors position their book in the right category from the beginning."
            />
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Choosing the right category can shape how readers discover your book.
              Whether you are writing a business guide, memoir, self-help ebook,
              fiction story, or educational resource, Leaf Publisher can help refine
              your concept, structure your content, and prepare your ebook for a
              clear publishing direction.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {AUTHOR_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="rounded-2xl border border-line/80 bg-paper/60 p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] sm:p-7"
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

          <motion.div
            className="mt-10 text-center sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link
              href="/for-authors"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
            >
              Start Your Book Project
              <HiArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Discovery strip */}
      <section
        className="border-t border-white/10 text-white/90"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="categories-discovery-heading"
      >
        <div className="container-site py-12 sm:py-14">
          <h2
            id="categories-discovery-heading"
            className="text-center font-display text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Popular Paths Right Now
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-xs text-white/50 sm:text-sm">
            A visual guide to common category paths — not live trending data.
          </p>
        </div>

        {reduceMotion ? (
          <div className="container-site flex flex-wrap justify-center gap-3 pb-12">
            {DISCOVERY_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <Marquee
            className="pb-12"
            speed={32}
            gradient
            gradientColor={DARK_BG}
            gradientWidth={80}
            pauseOnHover
          >
            {DISCOVERY_TAGS.map((tag) => (
              <span
                key={tag}
                className="mx-3 inline-flex rounded-full border border-white/15 bg-white/8 px-5 py-2.5 font-display text-base font-semibold tracking-wide text-white/90 sm:text-lg"
              >
                {tag}
              </span>
            ))}
          </Marquee>
        )}
      </section>

      {/* Final CTA */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="categories-cta-heading"
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
              <h2 id="categories-cta-heading" className="site-cta-banner__headline text-text">
                <span className="site-cta-banner__line block">
                  Every Great Book Starts With the{" "}
                  <span className="hero-heading__accent">Right Direction</span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Whether you are exploring your next read or preparing to publish
                your own ebook, Leaf Publisher helps organize stories, ideas, and
                knowledge into categories that make discovery easier.
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <a
                  href={`#${CATEGORIES_PAGE_IDS.grid}`}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
                >
                  Browse Categories
                </a>
                <Link
                  href="/bestsellers"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-bg px-8 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
                >
                  Browse Bestsellers
                </Link>
                <Link
                  href="/new-releases"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-bg px-8 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
                >
                  New Releases
                </Link>
                <Link
                  href="/for-authors"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-bg px-8 text-sm font-semibold text-text transition-colors hover:border-green/40 hover:bg-paper"
                >
                  Start Publishing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
