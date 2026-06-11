"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STACKED_COVERS = [
  { src: "/e-books/demo-ebook4.jpg", rotate: -6, z: 0, x: "18%", y: "18%" },
  { src: "/e-books/demo-ebook1.png", rotate: 2, z: 10, x: "38%", y: "12%" },
  { src: "/e-books/demo-ebook2.png", rotate: 8, z: 20, x: "54%", y: "22%" },
] as const;

export function BestsellersHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green/16 via-transparent to-green2/14 blur-2xl sm:-inset-8"
      />

      <motion.div
        className="relative min-h-[22rem] sm:min-h-[24rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE }}
      >
        {/* Stacked book covers */}
        {STACKED_COVERS.map((cover, i) => (
          <motion.div
            key={cover.src}
            className="absolute w-[7.5rem] overflow-hidden rounded-sm border border-line/80 bg-bg shadow-[0_20px_50px_-20px_rgba(26,34,24,0.35)] sm:w-36"
            style={{
              left: cover.x,
              top: cover.y,
              zIndex: cover.z,
              rotate: `${cover.rotate}deg`,
            }}
            animate={reduceMotion ? undefined : { y: [0, i % 2 === 0 ? -4 : 4, 0] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <div className="relative aspect-3/4">
              <Image
                src={cover.src}
                alt=""
                fill
                sizes="144px"
                className="object-cover"
                aria-hidden
              />
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-[#e8dfd0] to-[#cfc4b4]"
              />
            </div>
          </motion.div>
        ))}

        {/* Ranking badges */}
        <motion.span
          aria-hidden
          className="absolute left-4 top-6 z-30 inline-flex items-center gap-1.5 rounded-full border border-green/35 bg-bg/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-green shadow-sm backdrop-blur-sm sm:left-8"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-green/15 font-display text-xs text-green">
            1
          </span>
          Featured Pick
        </motion.span>

        <motion.span
          aria-hidden
          className="absolute right-4 top-16 z-30 rounded-full border border-line bg-paper/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted shadow-sm backdrop-blur-sm sm:right-8"
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          Reader Favorite
        </motion.span>

        {/* Featured picks card */}
        <motion.div
          className="absolute bottom-6 left-1/2 z-30 w-[17rem] -translate-x-1/2 sm:bottom-8 sm:w-[19rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.12 }}
        >
          <div className="overflow-hidden rounded-2xl border border-line/80 bg-linear-to-br from-[#181818] via-[#1f1f1f] to-[#181818] p-5 text-white shadow-[0_28px_70px_-24px_rgba(26,34,24,0.45)] ring-1 ring-white/8 sm:p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full bg-green/15 blur-2xl"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green2">
              Featured Picks
            </p>
            <p className="mt-3 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              Curated Standouts
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/65">
              Popular previews and reader-focused titles — updated as real data
              connects.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Business", "Self-Help", "Publishing"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-[10px] font-semibold text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Shelf line */}
        <div
          aria-hidden
          className="absolute bottom-2 left-1/2 z-0 h-1 w-56 -translate-x-1/2 rounded-full bg-linear-to-r from-transparent via-green/25 to-transparent sm:w-64"
        />
      </motion.div>
    </div>
  );
}
