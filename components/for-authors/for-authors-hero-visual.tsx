"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { HERO_BOOK_COVERS } from "@/components/for-authors/for-authors-data";
import { StickyNote } from "@/components/for-authors/for-authors-ui";
import { useInView } from "@/hooks/use-in-view";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 3000;
const COVER_COUNT = HERO_BOOK_COVERS.length;

export function ForAuthorsHeroVisual() {
  const reduceMotion = useReducedMotion();
  const { ref: deskRef, inView } = useInView<HTMLDivElement>({ rootMargin: "80px 0px" });
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const cover = HERO_BOOK_COVERS[index];

  const nextCover = useCallback(() => {
    setIndex((i) => (i + 1) % COVER_COUNT);
  }, []);

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
      id = window.setInterval(() => {
        if (pausedRef.current || document.hidden || !inView) return;
        nextCover();
      }, AUTO_MS);
    };

    start();
    return stop;
  }, [inView, nextCover, reduceMotion]);

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <motion.div
        ref={deskRef}
        className="fa-desk-surface relative min-h-[24rem] overflow-visible rounded-3xl border border-[#d5cabb] p-4 shadow-[0_24px_60px_-32px_rgba(26,34,24,0.22)] sm:min-h-[26rem] sm:p-5 md:min-h-[28rem] md:p-6"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        {/* 1 — top-left */}
        <StickyNote
          tone="yellow"
          rotate={-2.5}
          pinned
          className="left-2 top-2 z-20 w-[8.25rem] origin-top-left sm:left-3 sm:top-3 sm:w-[9.25rem]"
        >
          <p className="font-display text-sm font-bold leading-snug text-[#4a4038]">
            Chapter outline
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-[#6f6468]">
            Shape the message before writing begins.
          </p>
        </StickyNote>

        {/* 2 — top-right */}
        <StickyNote
          tone="blush"
          rotate={2.5}
          pinned
          className="right-2 top-2 z-20 w-[7.75rem] origin-top-right sm:right-3 sm:top-3 sm:w-[8.75rem]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6f6468]">
            Reminder
          </p>
          <p className="mt-1.5 font-display text-sm font-bold text-[#4a4038]">
            Edit for clarity
          </p>
        </StickyNote>

        {/* Book — center autoplay */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 w-44 sm:w-52 md:w-60"
          initial={
            reduceMotion
              ? { x: "-50%", y: "-50%", rotate: -4 }
              : { opacity: 0, x: "-50%", y: "-45%", rotate: -4 }
          }
          animate={{ opacity: 1, x: "-50%", y: "-50%", rotate: -4 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.08 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative aspect-3/4 overflow-hidden rounded-sm border border-[#d8d0c4] bg-bg shadow-[0_20px_44px_-20px_rgba(26,34,24,0.38)] ring-1 ring-black/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={cover.coverSrc}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.4, ease: EASE }}
              >
                <Image
                  src={cover.coverSrc}
                  alt={cover.title}
                  fill
                  sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
                  className="object-cover"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 z-10 w-2 bg-linear-to-b from-[#e8dfd0] via-[#d9cfc0] to-[#cfc4b4]"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-2 z-10 w-px bg-black/10"
            />
          </div>
        </motion.div>

        {/* 3 — bottom-right */}
        <StickyNote
          tone="mint"
          rotate={-2}
          pinned
          className="bottom-2 right-2 z-20 w-[7.75rem] origin-bottom-right sm:bottom-3 sm:right-3 sm:w-[8.75rem]"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6f6468]">
            Production
          </p>
          <p className="mt-1 font-display text-sm font-bold text-[#4a4038]">
            Format &amp; polish
          </p>
        </StickyNote>

        {/* 4 — bottom-left */}
        <StickyNote
          tone="cream"
          rotate={2.2}
          pinned
          className="bottom-2 left-2 z-20 w-[7.75rem] origin-bottom-left sm:bottom-3 sm:left-3 sm:w-[8.75rem]"
        >
          <p className="font-display text-sm font-bold text-[#4a4038]">Launch prep</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-[#6f6468]">
            Files, cover, and publishing direction.
          </p>
        </StickyNote>
      </motion.div>
    </div>
  );
}
