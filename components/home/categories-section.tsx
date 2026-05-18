"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  HiArrowRight,
  HiOutlineBeaker,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineSearchCircle,
} from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
  {
    name: "Fiction",
    titles: "84,300",
    href: "/browse/fiction",
    icon: HiOutlineBookOpen,
  },
  {
    name: "Self-Development",
    titles: "31,800",
    href: "/browse/self-development",
    icon: HiOutlineLightBulb,
  },
  {
    name: "Science & Nature",
    titles: "22,500",
    href: "/browse/science-nature",
    icon: HiOutlineBeaker,
  },
  {
    name: "Mystery & Thriller",
    titles: "47,200",
    href: "/browse/mystery-thriller",
    icon: HiOutlineSearchCircle,
  },
] as const;

function formatTitleCount(count: string) {
  return `${count} Titles`;
}

function CategoryCard({
  category,
}: {
  category: (typeof CATEGORIES)[number];
}) {
  const Icon = category.icon;

  return (
    <Link
      href={category.href}
      className="group relative isolate flex min-h-54 flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] p-5 transition-[border-color,box-shadow] duration-300 hover:border-green/40 hover:shadow-[0_16px_44px_-28px_rgba(217,34,67,0.35)] sm:min-h-58 sm:p-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#181818]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/6 backdrop-blur-sm"
      />

      <div className="relative z-2 flex h-full flex-col">
        <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-green shadow-sm transition-colors duration-300 group-hover:border-green/40 group-hover:bg-white/12">
          <Icon className="size-5" aria-hidden />
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
          {category.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium tabular-nums text-white/65 sm:text-[0.9375rem]">
          {formatTitleCount(category.titles)}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-green transition-colors group-hover:text-green2">
          Browse
          <HiArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

export function CategoriesSection() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const motionEnabled = mounted && !reduceMotion;

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE },
      },
    }),
    []
  );

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.07,
          delayChildren: 0.08,
        },
      },
    }),
    []
  );

  return (
    <section
      className="cv-section relative border-t border-line/80 bg-bg"
      aria-labelledby="categories-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/25 to-transparent"
      />

      <div className="container-site section-y">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial={motionEnabled ? "hidden" : false}
          whileInView={motionEnabled ? "show" : undefined}
          viewport={{ once: true, margin: "-48px" }}
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs"
          >
            Browse by Genre
          </motion.p>
          <h2
            id="categories-heading"
            className="font-display text-[clamp(2rem,4.5vw+0.5rem,3.25rem)] font-bold leading-[1.08] tracking-tight text-text"
          >
            <motion.span variants={itemVariants} className="block">
              Find your next{" "}
              <span className="hero-heading__accent">obsession</span>
            </motion.span>
          </h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
          >
            Every taste, every mood — our curators pick the finest across every
            genre.
          </motion.p>
        </motion.div>

        <motion.ul
          className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial={motionEnabled ? "hidden" : false}
          whileInView={motionEnabled ? "show" : undefined}
          viewport={{ once: true, margin: "-40px" }}
        >
          {CATEGORIES.map((category) => (
            <motion.li key={category.name} variants={itemVariants}>
              <motion.div
                whileHover={motionEnabled ? { y: -6 } : undefined}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
