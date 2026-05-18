"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import { useInView } from "@/hooks/use-in-view";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 6400;
const SLIDE_DURATION = 0.48;

export type HeroBook = {
  title: string;
  author: string;
  /** Path under `/public` (served from site root). */
  coverSrc: string;
  topPick?: boolean;
};

export const HERO_BOOKS: readonly HeroBook[] = [
  {
    title: "The Midnight Garden",
    author: "E. Holloway",
    topPick: false,
    coverSrc: "/e-books/demo-ebook1.png",
  },
  {
    title: "Salt & Shadow",
    author: "R. Adeyemi",
    coverSrc: "/e-books/demo-ebook2.png",
  },
  {
    title: "The Atlas Protocol",
    author: "J. Moreau",
    coverSrc: "/e-books/demo-ebook3.png",
  },
  {
    title: "Ember & Ash",
    author: "L. Nakamura",
    coverSrc: "/e-books/demo-ebook4.jpg",
  },
  {
    title: "Cartography of Loss",
    author: "S. Okonkwo",
    coverSrc: "/e-books/demo-ebook5.jpg",
  },
  {
    title: "The Golden Thread",
    author: "A. Vance",
    coverSrc: "/e-books/demo-ebook1.png",
  },
];

/** Slide motion tuned for smooth cross-step transitions (no heavy blur). */
const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir > 0 ? -28 : 28,
    opacity: 0,
    scale: 0.985,
  }),
};

function GalleryTitle({ title }: { title: string }) {
  return (
    <h3 className="font-display text-[clamp(1.35rem,3.8vw+0.4rem,2.5rem)] font-bold leading-[1.1] tracking-tight text-text sm:text-[1.75rem] md:text-[2rem] lg:text-4xl">
      {title}
    </h3>
  );
}

export function HeroBookGallery() {
  const reduceMotion = useReducedMotion();
  const { ref: galleryRef, inView } = useInView<HTMLDivElement>({
    rootMargin: "80px 0px",
  });
  const [[page, direction], setPage] = useState<[number, number]>([0, 1]);
  const pausedRef = useRef(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    lastX: number;
    startX: number;
    startScroll: number;
  } | null>(null);
  const suppressThumbClickRef = useRef(false);
  const [stripDragging, setStripDragging] = useState(false);

  const index = ((page % HERO_BOOKS.length) + HERO_BOOKS.length) % HERO_BOOKS.length;
  const book = HERO_BOOKS[index];

  const paginate = useCallback((newDirection: number) => {
    setPage(([p]) => {
      const len = HERO_BOOKS.length;
      const next = (p + newDirection + len) % len;
      return [next, newDirection];
    });
  }, []);

  /**
   * Autoplay only on coarse / touch-style pointers. Fine-pointer “web” (mouse)
   * users were getting surprise slide changes and strip scrollIntoView janking the page.
   */
  useEffect(() => {
    let id: number | undefined;

    const stop = () => {
      if (id !== undefined) {
        window.clearInterval(id);
        id = undefined;
      }
    };

    const start = () => {
      stop();
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      id = window.setInterval(() => {
        if (pausedRef.current || document.hidden || !inView) return;
        paginate(1);
      }, AUTO_MS);
    };

    start();
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    mq.addEventListener("change", start);
    return () => {
      mq.removeEventListener("change", start);
      stop();
    };
  }, [paginate, inView]);

  const goTo = useCallback((i: number) => {
    setPage(([p, prevD]) => {
      if (i === p) return [p, prevD];
      return [i, i > p ? 1 : -1];
    });
  }, []);

  const DRAG_CLICK_SUPPRESS_PX = 8;

  const endStripPointerDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    const strip = stripRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const moved = Math.abs(e.clientX - d.startX);
    suppressThumbClickRef.current = moved > DRAG_CLICK_SUPPRESS_PX;
    dragRef.current = null;
    setStripDragging(false);
    try {
      strip?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  const onStripPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    if (e.button !== 0) return;
    const strip = stripRef.current;
    if (!strip) return;
    dragRef.current = {
      pointerId: e.pointerId,
      lastX: e.clientX,
      startX: e.clientX,
      startScroll: strip.scrollLeft,
    };
    suppressThumbClickRef.current = false;
    setStripDragging(true);
    strip.setPointerCapture(e.pointerId);
  }, []);

  const onStripPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    const strip = stripRef.current;
    if (!d || e.pointerId !== d.pointerId || !strip) return;
    const dx = e.clientX - d.lastX;
    d.lastX = e.clientX;
    strip.scrollLeft -= dx;
  }, []);

  const onStripPointerUpOrCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      endStripPointerDrag(e);
    },
    [endStripPointerDrag]
  );

  /** Scroll only the thumb strip — never `scrollIntoView` on thumbs (scrolls the whole page). */
  useLayoutEffect(() => {
    if (dragRef.current) return;
    const strip = stripRef.current;
    const thumb = thumbRefs.current[index];
    if (!strip || !thumb) return;

    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
    const ideal =
      thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2;
    const left = Math.max(0, Math.min(ideal, maxScroll));

    strip.scrollTo({
      left,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [index, reduceMotion]);

  return (
    <div
      ref={galleryRef}
      id="featured-gallery"
      className="relative flex scroll-mt-28 flex-col gap-6 sm:gap-7"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-muted sm:text-xs">
            <span className="h-px w-6 shrink-0 rounded-full bg-linear-to-r from-transparent to-green sm:w-8" aria-hidden />
            Featured gallery
          </p>
          <p className="mt-2 font-display text-[clamp(1.125rem,2.5vw+0.5rem,1.5rem)] font-bold tracking-tight text-text sm:mt-1.5 sm:text-xl md:text-2xl">
            Trending on Leaf
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:justify-end sm:gap-2">
          <div
            className="flex flex-wrap items-center gap-1.5 sm:gap-2"
            role="tablist"
            aria-label="Featured titles"
          >
          {HERO_BOOKS.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={HERO_BOOKS[i].title}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Show ${HERO_BOOKS[i].title}`}
                onClick={() => goTo(i)}
                className="relative flex min-h-10 min-w-10 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <motion.span
                  layout
                  className={`block h-2 rounded-full ${
                    active
                      ? "bg-text shadow-[0_0_0_2px_rgba(133,199,39,0.4),0_2px_10px_rgba(26,34,24,0.12)]"
                      : "bg-text/35 hover:bg-text/55"
                  }`}
                  animate={{
                    width: active ? 28 : 8,
                    opacity: active ? 1 : 0.75,
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              </button>
            );
          })}
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:hidden">
            <motion.button
              type="button"
              aria-label="Previous featured title"
              onClick={() => paginate(-1)}
              whileHover={reduceMotion ? undefined : { scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex size-9 items-center justify-center rounded-full border border-line/90 bg-bg text-text shadow-md transition-colors hover:border-green/40 hover:text-green sm:size-10"
            >
              <HiOutlineChevronLeft className="size-5 sm:size-[1.35rem]" strokeWidth={2} aria-hidden />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Next featured title"
              onClick={() => paginate(1)}
              whileHover={reduceMotion ? undefined : { scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex size-9 items-center justify-center rounded-full border border-line/90 bg-bg text-text shadow-md transition-colors hover:border-green/40 hover:text-green sm:size-10"
            >
              <HiOutlineChevronRight className="size-5 sm:size-[1.35rem]" strokeWidth={2} aria-hidden />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="relative isolate min-h-[min(320px,72vw)] overflow-hidden rounded-[1.75rem] border border-line/80 bg-bg shadow-[0_28px_80px_-36px_rgba(26,34,24,0.42),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-white/20 sm:min-h-[min(340px,58vw)] sm:rounded-3xl md:min-h-[360px] lg:min-h-[380px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-paper/80 via-bg/50 to-paper/70 opacity-[0.5] sm:opacity-[0.55]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/25 to-transparent"
        />

        <div
          className="relative overflow-x-hidden px-4 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10"
          style={{ perspective: "1200px" }}
        >
          <motion.button
            type="button"
            aria-label="Previous featured title"
            onClick={() => paginate(-1)}
            whileHover={reduceMotion ? undefined : { scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-1.5 top-1/2 z-20 hidden -translate-y-1/2 sm:left-3 sm:flex md:left-5 size-11 items-center justify-center rounded-full border border-line/80 bg-bg/90 text-text shadow-[0_8px_28px_-12px_rgba(26,34,24,0.25)] backdrop-blur-md transition-colors hover:border-green/35 hover:text-green md:size-12"
          >
            <HiOutlineChevronLeft className="size-6 md:size-7" strokeWidth={1.75} aria-hidden />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next featured title"
            onClick={() => paginate(1)}
            whileHover={reduceMotion ? undefined : { scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-1.5 top-1/2 z-20 hidden -translate-y-1/2 sm:right-3 sm:flex md:right-5 size-11 items-center justify-center rounded-full border border-line/80 bg-bg text-text shadow-[0_8px_28px_-12px_rgba(26,34,24,0.25)] transition-colors hover:border-green/35 hover:text-green md:size-12"
          >
            <HiOutlineChevronRight className="size-6 md:size-7" strokeWidth={1.75} aria-hidden />
          </motion.button>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={book.title}
              role="tabpanel"
              aria-roledescription="slide"
              aria-live="polite"
              custom={direction}
              variants={slideVariants}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "exit"}
              transition={
                reduceMotion
                  ? { duration: 0.18, ease: EASE }
                  : {
                      duration: SLIDE_DURATION,
                      ease: EASE,
                    }
              }
              className="sm:px-10 md:px-12"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-between sm:gap-8 md:gap-10 lg:gap-12">
                <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {book.topPick && (
                      <motion.span
                        key={`pick-${book.title}`}
                        className="inline-flex items-center rounded-full bg-green/12 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green shadow-sm ring-1 ring-green/35 sm:text-[11px]"
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                      >
                        Top Pick
                      </motion.span>
                    )}
                    <span className="inline-flex items-center rounded-full border border-line/80 bg-bg/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted sm:text-[11px]">
                      {String(index + 1).padStart(2, "0")} / {String(HERO_BOOKS.length).padStart(2, "0")}
                    </span>
                  </div>

                  <GalleryTitle title={book.title} />

                  <motion.p
                    className="max-w-none text-pretty text-sm leading-relaxed text-muted sm:max-w-lg sm:text-base md:max-w-xl md:text-[1.05rem] md:leading-relaxed"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.35, ease: EASE }}
                  >
                    <span className="font-bold text-text">{book.author}</span>
                    <span className="font-medium text-muted"> — </span>
                    <span className="font-medium">
                      <strong className="font-bold text-text/90">Discover</strong> this title
                      and thousands more in curated lists tailored to how you read.
                    </span>
                  </motion.p>
                </div>

                <motion.div
                  className="relative mx-auto w-[min(100%,12.5rem)] shrink-0 sm:mx-0 sm:w-38 md:w-44 lg:w-48"
                  initial={{ opacity: 0, rotateY: reduceMotion ? 0 : -10 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.45, ease: EASE }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-white/50 bg-bg shadow-[0_24px_56px_-28px_rgba(26,34,24,0.35),0_0_0_1px_rgba(133,199,39,0.12)] ring-1 ring-green/15 sm:rounded-3xl md:shadow-[0_32px_64px_-32px_rgba(26,34,24,0.4)]">
                    <Image
                      src={book.coverSrc}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 200px, (max-width: 1024px) 176px, 224px"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/55 via-green2/35 to-transparent opacity-90"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/72 via-black/15 to-transparent"
                    />
                    <div className="relative flex h-full min-h-0 flex-col justify-end p-3.5 sm:p-4 md:p-5">
                      <p className="font-display text-[0.8125rem] font-bold leading-snug text-white drop-shadow-md sm:text-sm md:text-[0.9375rem]">
                        {book.title}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold text-white/90 sm:text-xs">
                        {book.author}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="relative border-t border-line/70 bg-paper/90 px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3 md:px-4">
          <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-muted/90 sm:hidden">
            Swipe titles or tap a cover
          </p>
          <div
            ref={stripRef}
            role="list"
            aria-label="Featured titles — drag or scroll to browse"
            onPointerDown={onStripPointerDown}
            onPointerMove={onStripPointerMove}
            onPointerUp={onStripPointerUpOrCancel}
            onPointerCancel={onStripPointerUpOrCancel}
            className={`flex touch-pan-x snap-x snap-mandatory snap-always gap-2.5 overflow-x-auto overscroll-x-contain scroll-smooth scroll-pl-3 scroll-pr-3 pb-1.5 pt-0.5 scrollbar-none [-ms-overflow-style:none] sm:gap-3 sm:rounded-2xl sm:border sm:border-line/50 sm:bg-bg/50 sm:px-1 sm:py-1 sm:scroll-pl-5 sm:scroll-pr-5 md:gap-3.5 md:scroll-pl-6 md:scroll-pr-6 [&::-webkit-scrollbar]:hidden ${
              stripDragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
          >
            {HERO_BOOKS.map((b, i) => {
              const active = i === index;
              return (
                <motion.button
                  key={b.title}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  type="button"
                  role="listitem"
                  aria-current={active ? "true" : undefined}
                  onClick={(ev) => {
                    if (suppressThumbClickRef.current) {
                      ev.preventDefault();
                      suppressThumbClickRef.current = false;
                      return;
                    }
                    goTo(i);
                  }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 480, damping: 28 }}
                  className={`snap-center relative flex w-[min(11.25rem,calc(100vw-3.25rem))] max-w-54 shrink-0 scroll-m-2 gap-3 rounded-xl border px-3.5 py-2.5 text-left shadow-sm transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out sm:w-51 sm:scroll-m-3 sm:rounded-2xl sm:px-4 sm:py-3.5 md:w-53 ${
                    active
                      ? "border-green/45 bg-bg shadow-[0_12px_40px_-22px_rgba(133,199,39,0.48)] ring-2 ring-green/30 ring-offset-2 ring-offset-bg/90"
                      : "border-line/55 bg-bg/50 ring-0 hover:border-green/25 hover:bg-bg/95 hover:shadow-md active:scale-[0.99] sm:bg-bg/40"
                  }`}
                >
                  <div className="relative mt-0.5 h-13 w-[2.35rem] shrink-0 overflow-hidden rounded-md border border-line/60 bg-bg shadow-inner">
                    <Image
                      src={b.coverSrc}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                  <p
                    className={`line-clamp-2 min-h-10 font-display text-[0.8125rem] leading-snug sm:min-h-10.5 sm:text-sm ${
                      active ? "font-bold text-text" : "font-semibold text-text/85"
                    }`}
                  >
                    {b.title}
                  </p>
                  <p className="mt-1 truncate text-[11px] font-medium leading-tight text-muted sm:text-xs">
                    {b.author}
                  </p>
                  {b.topPick && (
                    <span className="mt-2 inline-block text-[9px] font-bold uppercase tracking-wide text-green">
                      Top Pick
                    </span>
                  )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
