"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

import { useInView } from "@/hooks/use-in-view";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_MS = 5200;
const FEATURED_DARK_BG = "#181818";
const SLIDER_VIEWPORT_MIN = "min-h-46 sm:min-h-50" as const;

const EDITOR_PICK = {
  title: "The Midnight Garden",
  author: "E. Holloway",
  category: "Literary Fiction",
  badge: "Editor's Pick",
  description:
    "A haunting story of memory and belonging set across three continents. Holloway's prose is measured and devastating — a modern classic asking what we owe to those who shaped us.",
  rating: 4.9,
  pages: 312,
  readTime: "~5h read",
  price: "$3.99",
  href: "/books/the-midnight-garden",
  coverSrc: "/e-books/demo-ebook1.png",
} as const;

const SLIDER_BOOKS = [
  {
    id: "salt-shadow",
    title: "Salt & Shadow",
    author: "R. Adeyemi",
    genre: "Romance",
    badge: "Bestseller",
    price: "$2.49",
    href: "/books/salt-and-shadow",
    coverSrc: "/e-books/demo-ebook2.png",
  },
  {
    id: "atlas-protocol",
    title: "The Atlas Protocol",
    author: "J. Moreau",
    genre: "Sci-Fi",
    badge: "New Release",
    price: "$4.99",
    href: "/books/the-atlas-protocol",
    coverSrc: "/e-books/demo-ebook3.png",
  },
  {
    id: "ember-ash",
    title: "Ember & Ash",
    author: "L. Nakamura",
    genre: "Fantasy",
    badge: "Award Winner",
    price: "$3.49",
    href: "/books/ember-and-ash",
    coverSrc: "/e-books/demo-ebook4.jpg",
  },
  {
    id: "cartography-loss",
    title: "Cartography of Loss",
    author: "S. Okonkwo",
    genre: "Literary Fiction",
    badge: "Staff Pick",
    price: "$3.99",
    href: "/books/cartography-of-loss",
    coverSrc: "/e-books/demo-ebook5.jpg",
  },
] as const;

const SLIDER_COUNT = SLIDER_BOOKS.length;
type SliderBook = (typeof SLIDER_BOOKS)[number];

const slideVariants: Variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -36 : 36,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.35, ease: EASE },
  }),
};

const navBtnClass =
  "inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2";

function badgeTone(badge: SliderBook["badge"]) {
  if (badge === "Bestseller") return "bg-green/15 text-green2 border-green/35";
  if (badge === "New Release")
    return "bg-white/10 text-white/90 border-white/20";
  return "bg-white/8 text-white/75 border-white/15";
}

type SliderState = { active: number; direction: 1 | -1 };

function sliderReducer(
  state: SliderState,
  action: { type: "next" } | { type: "prev" } | { type: "goto"; index: number }
): SliderState {
  switch (action.type) {
    case "next": {
      return {
        active: (state.active + 1) % SLIDER_COUNT,
        direction: 1,
      };
    }
    case "prev": {
      return {
        active: (state.active - 1 + SLIDER_COUNT) % SLIDER_COUNT,
        direction: -1,
      };
    }
    case "goto": {
      const { index } = action;
      if (
        index === state.active ||
        index < 0 ||
        index >= SLIDER_COUNT
      ) {
        return state;
      }
      return {
        active: index,
        direction: index > state.active ? 1 : -1,
      };
    }
    default:
      return state;
  }
}

export function FeaturedSection() {
  const reduceMotion = useReducedMotion();
  const { ref: sectionRef, inView } = useInView<HTMLElement>({
    rootMargin: "120px 0px",
  });
  const [{ active, direction }, dispatch] = useReducer(sliderReducer, {
    active: 0,
    direction: 1 as const,
  });

  const goNext = useCallback(() => dispatch({ type: "next" }), []);
  const goPrev = useCallback(() => dispatch({ type: "prev" }), []);
  const selectSlide = useCallback(
    (index: number) => dispatch({ type: "goto", index }),
    []
  );

  useEffect(() => {
    if (reduceMotion || !inView || document.hidden) return;
    const id = window.setInterval(goNext, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [goNext, reduceMotion, inView]);

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.55, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    }),
    [reduceMotion]
  );

  const book = SLIDER_BOOKS[active];

  return (
    <section
      ref={sectionRef}
      className="cv-section featured-dark relative overflow-x-hidden border-t border-white/10 text-white/90"
      style={{ backgroundColor: FEATURED_DARK_BG }}
      aria-labelledby="featured-heading"
    >
      <div className="container-site section-y">
        <header aria-labelledby="featured-heading">
          <motion.div
            className="relative "
            style={{ backgroundColor: FEATURED_DARK_BG }}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
            />

            <p className="relative mb-5 sm:mb-6">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm sm:text-xs">
                Editor&apos;s Selection
              </span>
            </p>
            <h2
              id="featured-heading"
              className="site-cta-banner__headline relative max-w-full whitespace-nowrap"
            >
              <span className="site-cta-banner__line inline-block!">
                <span className="site-cta-banner__accent">Featured</span>{" "}
                This <span className="site-cta-banner__accent">week</span>
              </span>
            </h2>
          </motion.div>
        </header>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12 lg:gap-8 xl:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.article
            variants={itemVariants}
            className="featured-editor-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-sm lg:col-span-7"
          >
            <motion.div
              className="relative flex min-h-52 flex-col justify-end overflow-hidden p-6 text-white sm:min-h-60 sm:p-8"
              whileHover={reduceMotion ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Image
                src={EDITOR_PICK.coverSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/25"
              />
              <div className="relative">
                <p className="text-sm font-medium text-white/75">
                  {EDITOR_PICK.author}
                </p>
                <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {EDITOR_PICK.title}
                </p>
              </div>
            </motion.div>

            <div className="relative border-t border-white/10 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                {EDITOR_PICK.category} · {EDITOR_PICK.badge}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-[1.65rem]">
                {EDITOR_PICK.title}
              </h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                {EDITOR_PICK.description}
              </p>

              <ul className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-white/90"
               style={{ padding: 0 }}
              >
                <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 backdrop-blur-sm">
                  <FaStar className="size-3.5 text-green2" aria-hidden />
                  <span className="tabular-nums">{EDITOR_PICK.rating}</span>
                </li>
                <li className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 tabular-nums backdrop-blur-sm">
                  {EDITOR_PICK.pages} pages
                </li>
                <li className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 backdrop-blur-sm">
                  {EDITOR_PICK.readTime}
                </li>
              </ul>

              <Link
                href={EDITOR_PICK.href}
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-6 text-sm font-semibold text-white shadow-[0_12px_40px_-16px_rgba(217,34,67,0.5)] transition-colors hover:bg-green2 sm:w-auto sm:min-w-48"
              >
                Read Now — {EDITOR_PICK.price}
              </Link>
            </div>
          </motion.article>

          <motion.aside
            variants={itemVariants}
            className="relative z-10 flex min-h-0 flex-col self-start lg:col-span-5"
            aria-label="More featured titles this week"
          >
            <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
              <p
                id="featured-slider-label"
                className="sm:text-4xl text-lg font-semibold text-white/65"
              >
                More picks
              </p>
              <div
                className="flex items-center gap-1.5"
                role="group"
                aria-labelledby="featured-slider-label"
              >
                <button
                  type="button"
                  onClick={goPrev}
                  className={navBtnClass}
                  aria-label="Previous featured title"
                >
                  <HiOutlineChevronUp className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className={navBtnClass}
                  aria-label="Next featured title"
                >
                  <HiOutlineChevronDown className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            <div
              className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-4"
              aria-live={reduceMotion ? undefined : "polite"}
              aria-atomic="true"
            >
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className={`relative ${SLIDER_VIEWPORT_MIN}`}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={book.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Link
                        href={book.href}
                        className={`featured-slider-card group/card flex h-full w-full flex-row overflow-hidden rounded-xl border border-white/12 bg-white/6 transition-[border-color,box-shadow] hover:border-green/40 hover:shadow-[0_16px_44px_-28px_rgba(217,34,67,0.35)] ${SLIDER_VIEWPORT_MIN}`}
                      >
                        <div className="relative w-[38%] max-w-36 shrink-0 self-stretch bg-black/40 sm:w-[34%] sm:max-w-40">
                          <Image
                            src={book.coverSrc}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 120px, 160px"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent"
                          />
                          <div
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/50 via-green2/25 to-transparent opacity-80"
                          />
                          <p className="absolute bottom-3 left-3 right-2 font-display text-sm font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-base">
                            {book.title}
                          </p>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                          <p className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                            {book.title}
                          </p>
                          <p className="mt-1 text-sm text-white/65">
                            {book.author} — {book.genre}
                          </p>
                          <span
                            className={`mt-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeTone(book.badge)}`}
                          >
                            {book.badge}
                          </span>
                          <p className="mt-auto pt-3 font-display text-xl font-bold tabular-nums text-green2 sm:pt-4">
                            {book.price}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <ul
                  className="flex flex-col gap-2 sm:gap-2.5"
                  style={{ padding: 0 }}
                  aria-label="Other featured picks"
                >
                  {SLIDER_BOOKS.map((b, i) =>
                    i === active ? null : (
                      <li key={b.id}>
                        <button
                          type="button"
                          onClick={() => selectSlide(i)}
                          className="flex w-full items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-left transition-[border-color,background-color] duration-200 hover:border-green/30 hover:bg-white/8 sm:px-4 sm:py-3"
                          aria-label={`Show ${b.title} as featured pick`}
                        >
                          <span
                            className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-black/35 sm:size-11"
                            aria-hidden
                          >
                            <Image
                              src={b.coverSrc}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-white">
                              {b.title}
                            </span>
                            <span className="block truncate text-xs text-white/60">
                              {b.author} — {b.genre}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-bold tabular-nums text-green2">
                            {b.price}
                          </span>
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
