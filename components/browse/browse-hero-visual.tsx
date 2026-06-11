"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import {
  HERO_CAROUSEL_BOOKS,
  type HeroCarouselBook,
} from "@/components/browse/browse-data";
import { useInView } from "@/hooks/use-in-view";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 5000;
const BOOK_COUNT = HERO_CAROUSEL_BOOKS.length;

function wrapOffset(itemIndex: number, activeIndex: number) {
  let diff = itemIndex - activeIndex;
  if (diff > BOOK_COUNT / 2) diff -= BOOK_COUNT;
  if (diff < -BOOK_COUNT / 2) diff += BOOK_COUNT;
  return diff;
}

type SlideMotion = {
  x: string;
  scale: number;
  rotateY: number;
  opacity: number;
  zIndex: number;
};

function getSlideMotion(offset: number, reduceMotion: boolean): SlideMotion {
  if (offset === 0) {
    return {
      x: "-50%",
      scale: 1,
      rotateY: reduceMotion ? 0 : -6,
      opacity: 1,
      zIndex: 10,
    };
  }
  if (offset === -1) {
    return {
      x: "calc(-50% - 8rem)",
      scale: 0.78,
      rotateY: reduceMotion ? 0 : 24,
      opacity: 0.72,
      zIndex: 2,
    };
  }
  if (offset === 1) {
    return {
      x: "calc(-50% + 8rem)",
      scale: 0.78,
      rotateY: reduceMotion ? 0 : -24,
      opacity: 0.72,
      zIndex: 2,
    };
  }
  return {
    x: offset < 0 ? "calc(-50% - 12rem)" : "calc(-50% + 12rem)",
    scale: 0.6,
    rotateY: 0,
    opacity: 0,
    zIndex: 0,
  };
}

function CoverCard({
  book,
  isCenter,
  priority,
}: {
  book: HeroCarouselBook;
  isCenter: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-3/4 w-full overflow-hidden rounded-xl border bg-bg ring-1 sm:rounded-2xl ${
        isCenter
          ? "border-white/40 shadow-[0_18px_40px_-16px_rgba(26,34,24,0.45),0_0_0_1px_rgba(133,199,39,0.1)] ring-green/15"
          : "border-line/70 shadow-[0_12px_28px_-14px_rgba(26,34,24,0.3)] ring-transparent"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Image
        src={book.coverSrc}
        alt={book.title}
        fill
        sizes={
          isCenter
            ? "(max-width: 640px) 200px, (max-width: 1024px) 224px, 256px"
            : "(max-width: 640px) 144px, 168px"
        }
        className="object-cover"
        priority={priority}
      />
      {isCenter ? (
        <>
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-green/60 via-green2/40 to-transparent"
          />
          <div aria-hidden className="absolute inset-y-0 right-0 w-px bg-black/10" />
        </>
      ) : null}
    </div>
  );
}

type CarouselSlideProps = {
  book: HeroCarouselBook;
  i: number;
  offset: number;
  reduceMotion: boolean;
  onSelect: (i: number) => void;
};

function CarouselSlide({
  book,
  i,
  offset,
  reduceMotion,
  onSelect,
}: CarouselSlideProps) {
  const isCenter = offset === 0;
  const slideMotion = getSlideMotion(offset, reduceMotion);
  const widthClass = isCenter
    ? "w-48 sm:w-52 md:w-56 lg:w-64"
    : "w-32 sm:w-36 md:w-40 lg:w-44";

  const sharedProps = {
    className: `absolute left-1/2 top-1/2 ${widthClass} ${isCenter ? "" : "cursor-pointer"}`,
    style: { transformStyle: "preserve-3d" as const, zIndex: slideMotion.zIndex },
    initial: false as const,
    animate: {
      x: slideMotion.x,
      y: "-50%",
      scale: slideMotion.scale,
      rotateY: slideMotion.rotateY,
      opacity: slideMotion.opacity,
    },
    transition: { duration: reduceMotion ? 0.15 : 0.45, ease: EASE },
  };

  if (isCenter) {
    return (
      <motion.div key={book.coverSrc} {...sharedProps} aria-hidden={false}>
        <CoverCard book={book} isCenter priority={i === 0} />
      </motion.div>
    );
  }

  return (
    <motion.button
      key={book.coverSrc}
      type="button"
      {...sharedProps}
      onClick={() => onSelect(i)}
      aria-label={`Show ${book.title}`}
    >
      <CoverCard book={book} isCenter={false} />
    </motion.button>
  );
}

export function BrowseHeroVisual() {
  const reduceMotion = useReducedMotion();
  const { ref: carouselRef, inView } = useInView<HTMLDivElement>({
    rootMargin: "80px 0px",
  });
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const paginate = useCallback((dir: number) => {
    setIndex((i) => (i + dir + BOOK_COUNT) % BOOK_COUNT);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const visibleSlides = useMemo(
    () =>
      HERO_CAROUSEL_BOOKS.map((book, i) => ({
        book,
        i,
        offset: wrapOffset(i, index),
      })).filter(({ offset }) => Math.abs(offset) <= 1),
    [index]
  );

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
      if (reduceMotion) return;
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
  }, [paginate, inView, reduceMotion]);

  return (
    <div
      ref={carouselRef}
      className="relative mx-auto w-full max-w-lg sm:max-w-xl lg:max-w-2xl lg:justify-self-end"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
        <div
          className="relative h-72 sm:h-80 md:h-96"
          style={{ perspective: "1100px" }}
        >
          <button
            type="button"
            aria-label="Previous book cover"
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 z-30 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-line/80 bg-bg/90 text-text shadow-sm transition-colors hover:border-green/40 hover:text-green sm:left-3 sm:size-9"
          >
            <HiOutlineChevronLeft className="size-4 sm:size-5" strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next book cover"
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 z-30 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-line/80 bg-bg/90 text-text shadow-sm transition-colors hover:border-green/40 hover:text-green sm:right-3 sm:size-9"
          >
            <HiOutlineChevronRight className="size-4 sm:size-5" strokeWidth={2} aria-hidden />
          </button>

          <div className="relative h-full w-full">
            {visibleSlides.map(({ book, i, offset }) => (
              <CarouselSlide
                key={book.coverSrc}
                book={book}
                i={i}
                offset={offset}
                reduceMotion={!!reduceMotion}
                onSelect={goTo}
              />
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-2 px-4 py-2.5"
          role="tablist"
          aria-label="Book covers"
        >
          {HERO_CAROUSEL_BOOKS.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.coverSrc}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={item.title}
                onClick={() => goTo(i)}
                className={`size-2 rounded-full transition-colors ${
                  active ? "bg-green" : "bg-text/25 hover:bg-text/40"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
