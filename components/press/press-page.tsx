"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

import {
  MEDIA_KIT_CARDS,
  NEWSWORTHY_CARDS,
  PRESS_CONFIG,
  PRESS_SECTION_IDS,
  PRESS_UPDATES,
  QUICK_FACTS,
} from "@/components/press/press-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

function DecorativeGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-green/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-green2/12 blur-3xl"
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

export function PressPage() {
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
      {/* 1. Hero */}
      <section
        className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="press-hero-heading"
      >
        <DecorativeGlow />
        <div className="container-site relative py-14 sm:py-16 lg:py-20 xl:py-24">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            variants={softContainerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={softItemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
            >
              Press &amp; Media
            </motion.p>

            <motion.h1
              id="press-hero-heading"
              variants={softItemVariants}
              className="hero-heading font-display text-[clamp(2rem,5.5vw+0.35rem,3.5rem)] font-bold leading-[1.08] tracking-tight text-text"
            >
              <span className="hero-heading__line block">
                Stories, Updates, and Media Resources From{" "}
                <span className="hero-heading__accent">Leaf Publisher</span>
              </span>
            </motion.h1>

            <motion.p
              variants={softItemVariants}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Leaf Publisher helps authors turn ideas into polished digital books
              through writing, editing, design, formatting, and publishing support.
              Our press page brings together brand information, company updates,
              media resources, and contact details for journalists, partners, and
              collaborators.
            </motion.p>

            <motion.div
              variants={softItemVariants}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <a
                href={`#${PRESS_SECTION_IDS.mediaKit}`}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 sm:w-auto"
              >
                Media Kit
              </a>
              <a
                href={`#${PRESS_SECTION_IDS.pressContact}`}
                className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-bg/90 px-6 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
              >
                Contact Press Team
                <HiArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Company Overview */}
      <section
        className="relative border-t border-line/80 bg-bg text-text"
        aria-labelledby="press-overview-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="press-overview-heading"
              title={
                <span className="site-cta-banner__line block">
                  About <span className="hero-heading__accent">Leaf Publisher</span>
                </span>
              }
            />
            <div className="mt-8 space-y-5 text-center text-base leading-relaxed text-muted sm:mt-10 sm:text-lg">
              <p>
                Leaf Publisher is a modern ebook creation and publishing support
                platform built for authors, entrepreneurs, storytellers, and
                businesses who want to turn their ideas into professionally finished
                digital books.
              </p>
              <p>
                From writing and editing to formatting, cover design, publishing
                guidance, and author support, Leaf Publisher helps simplify the book
                creation journey so authors can move from concept to launch with
                confidence.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-line/80 bg-paper/80 px-5 py-4 text-center sm:mt-10 sm:px-6 sm:py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                Company Focus
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-text sm:text-base">
                {PRESS_CONFIG.companyFocus}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Quick Facts */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="press-facts-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="press-facts-heading"
              title={
                <span className="site-cta-banner__line block">
                  Leaf Publisher at a{" "}
                  <span className="hero-heading__accent">Glance</span>
                </span>
              }
            />
          </motion.div>

          <motion.ul
            className="mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            role="list"
          >
            {QUICK_FACTS.map((fact) => (
              <motion.li key={fact.label} variants={itemVariants} role="listitem">
                <div className="hero-stat-card h-full">
                  <p className="hero-stat-card__value text-[clamp(1rem,2vw+0.5rem,1.35rem)]!">
                    {fact.value}
                  </p>
                  <p className="hero-stat-card__label">{fact.label}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* 4. Mission */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="press-mission-heading"
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
              id="press-mission-heading"
              title={
                <span className="site-cta-banner__line block">
                  Our <span className="hero-heading__accent">Mission</span>
                </span>
              }
            />
            <p className="mt-8 text-base leading-relaxed text-muted sm:mt-10 sm:text-lg">
              Our mission is to make ebook creation feel clearer, smarter, and more
              accessible. We help authors shape their message, refine their manuscript,
              design their book, and prepare for publishing with a process that feels
              professional and supportive from start to finish.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. Newsworthy */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="press-newsworthy-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="press-newsworthy-heading"
              title={
                <span className="site-cta-banner__line block">
                  What Makes Leaf Publisher{" "}
                  <span className="hero-heading__accent">Newsworthy?</span>
                </span>
              }
            />
          </motion.div>

          <motion.ul
            className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {NEWSWORTHY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.li key={card.title} variants={itemVariants}>
                  <article className="group flex h-full flex-col rounded-2xl border border-line/80 bg-bg p-6 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-green/35 sm:p-7">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-paper text-green transition-colors group-hover:border-green/40 group-hover:text-green2">
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

      {/* 6. Latest Updates */}
      <section
        className="relative overflow-x-clip border-t border-white/10 text-white/90"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="press-updates-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="press-updates-heading"
              variant="dark"
              title={
                <span className="site-cta-banner__line block">
                  Latest <span className="site-cta-banner__accent">Updates</span>
                </span>
              }
              subtitle="Company news, announcements, and publishing updates from Leaf Publisher."
            />
          </motion.div>

          <motion.ul
            className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {PRESS_UPDATES.map((update) => (
              <motion.li key={update.title} variants={itemVariants}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm transition-[border-color] duration-300 hover:border-green/35 sm:p-7">
                  <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
                    {update.date}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
                    {update.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                    {update.excerpt}
                  </p>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* 7. Media Kit */}
      <section
        id={PRESS_SECTION_IDS.mediaKit}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="press-media-kit-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="press-media-kit-heading"
              title={
                <span className="site-cta-banner__line block">
                  Media <span className="hero-heading__accent">Kit</span>
                </span>
              }
              subtitle="For media partners, journalists, and collaborators, the Leaf Publisher media kit can include brand assets, company information, service details, approved descriptions, and contact information."
            />
          </motion.div>

          <motion.ul
            className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {MEDIA_KIT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.li key={card.title} variants={itemVariants}>
                  <article className="flex h-full flex-col rounded-2xl border border-line/80 bg-bg p-6 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] sm:p-7">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-paper text-green">
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

          <motion.div
            className="mt-10 text-center sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
            >
              Request Media Kit
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 8. Approved Description */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="press-approved-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="press-approved-heading"
              title={
                <span className="site-cta-banner__line block">
                  Approved <span className="hero-heading__accent">Description</span>
                </span>
              }
            />
            <p className="mt-6 text-center text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
              Use this description when introducing Leaf Publisher in articles,
              collaborations, or media mentions:
            </p>
            <blockquote className="relative mt-8 overflow-hidden rounded-2xl border border-green/25 bg-green/6 px-6 py-8 sm:px-8 sm:py-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-green/10 blur-2xl"
              />
              <p className="relative font-display text-lg font-semibold leading-relaxed tracking-tight text-text sm:text-xl">
                &ldquo;{PRESS_CONFIG.approvedDescription}&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* 9. Media Inquiries */}
      <section
        id={PRESS_SECTION_IDS.pressContact}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="press-inquiries-heading"
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
              id="press-inquiries-heading"
              title={
                <span className="site-cta-banner__line block">
                  Media <span className="hero-heading__accent">Inquiries</span>
                </span>
              }
            />
            <p className="mt-6 text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
              For interviews, press questions, brand information, partnership
              opportunities, or media kit requests, please contact the Leaf Publisher
              team.
            </p>

            <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-line/80 bg-bg p-6 text-left shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] sm:mt-10 sm:p-8">
              <p className="text-sm text-muted">
                <span className="font-semibold text-text">Email: </span>
                <Link
                  href={`mailto:${PRESS_CONFIG.pressEmail}?subject=${encodeURIComponent(PRESS_CONFIG.pressSubject)}`}
                  className="font-medium text-green transition-colors hover:text-green2"
                >
                  {PRESS_CONFIG.pressEmail}
                </Link>
              </p>
              <p className="mt-4 text-sm text-muted">
                <span className="font-semibold text-text">Subject suggestion: </span>
                {PRESS_CONFIG.pressSubject}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Our team will review your inquiry and respond as soon as possible.
              </p>
            </div>

            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 sm:mt-10"
            >
              Contact Press Team
              <HiArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="press-cta-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/10 px-5 py-12 text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] sm:rounded-3xl sm:px-8 sm:py-14 md:px-10 lg:px-16 lg:py-16"
            style={{ backgroundColor: DARK_BG }}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(55% 45% at 50% 0%, color-mix(in srgb, var(--green) 16%, transparent), transparent 58%),
                  radial-gradient(40% 35% at 80% 100%, color-mix(in srgb, var(--green2) 10%, transparent), transparent 50%),
                  linear-gradient(180deg, #141414 0%, ${DARK_BG} 100%)
                `,
              }}
            />
            <div className="relative mx-auto max-w-3xl">
              <h2 id="press-cta-heading" className="site-cta-banner__headline">
                <span className="site-cta-banner__line block">
                  Want to Feature{" "}
                  <span className="site-cta-banner__accent">Leaf Publisher?</span>
                </span>
              </h2>
              <p className="site-cta-banner__sub mx-auto mt-5 max-w-xl font-sans">
                We are open to meaningful conversations around digital publishing,
                ebook creation, author support, and the future of independent book
                publishing.
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3.5 sm:mt-11 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <Link
                  href="/contact"
                  className="site-cta-btn site-cta-btn--primary group text-[#ffffff]! visited:text-[#ffffff]! hover:text-[#ffffff]!"
                >
                  <span className="text-[#ffffff]">Contact Us</span>
                  <span className="site-cta-btn__icon">
                    <HiArrowRight
                      className="size-4 text-[#ffffff] transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
                <Link href="/services" className="site-cta-btn site-cta-btn--secondary">
                  <span className="text-white">Explore Services</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
