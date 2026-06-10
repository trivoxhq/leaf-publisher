"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

import { OFFERED_SERVICES } from "@/components/about/about-data";
import { GetStartedButton } from "@/components/get-started/get-started-button";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

export function ServicesPage() {
  const reduceMotion = useReducedMotion();

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.1,
          delayChildren: reduceMotion ? 0 : 0.06,
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

  return (
    <>
      <section
        className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="services-hero-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-green/15 blur-3xl"
        />
        <div className="container-site relative py-14 sm:py-16 lg:py-20 xl:py-24">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <p className="mb-4 inline-flex items-center rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs">
              Our Services
            </p>
            <h1
              id="services-hero-heading"
              className="hero-heading font-display text-[clamp(2rem,5vw+0.35rem,3.5rem)] font-bold leading-[1.08] tracking-tight text-text"
            >
              <span className="hero-heading__line block">
                Ebook Services Built for{" "}
                <span className="hero-heading__accent">Authors Who Care</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              From first draft to final launch, Leaf Publisher offers writing,
              editing, design, formatting, and publishing support tailored to
              your book goals.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <GetStartedButton className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! visited:text-[#ffffff]! hover:bg-green2 hover:text-[#ffffff]! sm:w-auto shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors">
                Get Started
              </GetStartedButton>
              <Link
                href="/about"
                className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-bg/90 px-6 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
              >
                About Us
                <HiArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="cv-section border-t border-line/80 bg-paper text-text"
        aria-labelledby="services-list-heading"
      >
        <div className="container-site section-y">
          <motion.header
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <h2 id="services-list-heading" className="site-cta-banner__headline text-text">
              <span className="site-cta-banner__line block">
                What We <span className="hero-heading__accent">Offer</span>
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Professional support across every stage of your ebook journey.
            </p>
          </motion.header>

          <motion.ul
            className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {OFFERED_SERVICES.map((card) => {
              const Icon = card.icon;
              return (
                <motion.li key={card.title} variants={itemVariants}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-bg p-6 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_24px_70px_-36px_rgba(133,199,39,0.18)] sm:p-7">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-paper text-green transition-colors duration-300 group-hover:border-green/40 group-hover:text-green2">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-text">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                      {card.description}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      <section className="cv-section border-t border-line/80 bg-bg text-text">
        <div className="container-site section-y">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/10 px-5 py-12 text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:rounded-3xl sm:px-8 sm:py-14"
            style={{ backgroundColor: DARK_BG }}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <h2 className="site-cta-banner__headline">
              <span className="site-cta-banner__line block">
                Ready to <span className="site-cta-banner__accent">Begin?</span>
              </span>
            </h2>
            <p className="site-cta-banner__sub mx-auto mt-5 max-w-xl font-sans">
              Tell us about your book and we will help you shape the right
              service plan.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <GetStartedButton className="site-cta-btn site-cta-btn--primary group text-[#ffffff]! visited:text-[#ffffff]! hover:text-[#ffffff]!">
                <span className="text-[#ffffff]">Get Started</span>
                <span className="site-cta-btn__icon">
                  <HiArrowRight
                    className="size-4 text-[#ffffff] transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </GetStartedButton>
              <Link href="/pricing" className="site-cta-btn site-cta-btn--secondary">
                <span className="text-white">View Pricing</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
