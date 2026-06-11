"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { HERO_FLOATING_TILES } from "@/components/categories/categories-data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CategoriesHeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-green/12 via-transparent to-green2/10 blur-2xl sm:-inset-8"
      />
      <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
        {HERO_FLOATING_TILES.map((tile, i) => (
          <motion.article
            key={tile.label}
            className={`group relative overflow-hidden rounded-2xl border border-line/80 bg-bg shadow-[0_20px_60px_-36px_rgba(26,34,24,0.2)] ${tile.rotate} ${tile.offset}`}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.55,
              ease: EASE,
              delay: reduceMotion ? 0 : 0.08 + i * 0.08,
            }}
            whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#181818]/80 via-transparent to-transparent z-10" />
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(max-width: 640px) 45vw, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:p-4">
              <p className="font-display text-sm font-bold tracking-tight text-white sm:text-base">
                {tile.label}
              </p>
              <span className="mt-1 inline-flex rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                Explore
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
