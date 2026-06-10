"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

import {
  ABOUT_STATS,
  HIGHLIGHT_CARDS,
  MISSION_VISION,
  PORTFOLIO_ITEMS,
  TEAM_ROLES,
  OFFERED_SERVICES,
} from "@/components/about/about-data";
import { GetStartedButton } from "@/components/get-started/get-started-button";

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

function Eyebrow({
  children,
  variant = "light",
  align = "center",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
  align?: "center" | "left";
}) {
  const isDark = variant === "dark";
  return (
    <p
      className={`mb-4 sm:mb-5 ${align === "center" ? "flex justify-center" : ""}`}
    >
      <span
        className={
          isDark
            ? "inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm sm:text-xs"
            : "inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
        }
      >
        {children}
      </span>
    </p>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  variant = "light",
  align = "center",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  variant?: "light" | "dark";
  align?: "center" | "left";
}) {
  const isDark = variant === "dark";
  const alignClass = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <header className={alignClass}>
      {eyebrow ? <Eyebrow variant={variant}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={`site-cta-banner__headline ${isDark ? "" : "text-text"}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 text-base leading-relaxed sm:mt-6 sm:text-lg ${
            isDark ? "text-white/70" : "text-muted"
          } ${align === "center" ? "mx-auto max-w-2xl" : "max-w-prose"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function AboutPage() {
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
        aria-labelledby="about-hero-heading"
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
              Welcome to Leaf Publisher
            </motion.p>

            <motion.h1
              id="about-hero-heading"
              variants={softItemVariants}
              className="hero-heading font-display text-[clamp(2rem,5.5vw+0.35rem,3.75rem)] font-bold leading-[1.08] tracking-tight text-text"
            >
              <span className="hero-heading__line block">
                Full-Service Ebook Writing, Editing, Designing, and{" "}
                <span className="hero-heading__accent">Publishing Support</span>
              </span>
            </motion.h1>

            <motion.p
              variants={softItemVariants}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Leaf Publisher helps authors turn ideas into polished digital books
              through professional writing, editing, formatting, design, and
              publishing guidance. From the first draft to the final launch, we
              create ebook experiences that feel clear, compelling, and ready for
              readers.
            </motion.p>

            <motion.div
              variants={softItemVariants}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <GetStartedButton className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! visited:text-[#ffffff]! hover:bg-green2 hover:text-[#ffffff]! sm:w-auto shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors">
                Get Started
              </GetStartedButton>
              <Link
                href="/services"
                className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-bg/90 px-6 text-sm font-semibold text-text backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-paper sm:w-auto"
              >
                Explore Services
                <HiArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Story */}
      <section
        className="cv-section relative border-t border-line/80 bg-bg text-text"
        aria-labelledby="about-story-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="about-story-heading"
              title={
                <span className="site-cta-banner__line block">
                  Unveiling <span className="hero-heading__accent">Our Story</span>
                </span>
              }
              subtitle="Crafting books with purpose, precision, and heart."
              align="center"
            />
            <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-muted sm:mt-10 sm:text-lg">
              <p>
                Leaf Publisher was built with one belief: every strong idea
                deserves a book that feels professional, engaging, and ready for
                the world. Many authors have powerful stories, expert knowledge,
                or business ideas, but struggle with writing structure, editing,
                formatting, cover design, and publishing decisions.
              </p>
              <p>
                We created Leaf Publisher to make that journey easier. Our team
                supports authors through every stage of ebook creation, shaping
                raw ideas into polished books that connect with readers and carry
                a lasting impact.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Highlight Cards */}
      <section
        className="cv-section border-t border-line/60 bg-paper text-text"
        aria-labelledby="about-highlights-heading"
      >
        <div className="container-site section-y">
          <motion.ul
            className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            aria-labelledby="about-highlights-heading"
          >
            <li className="sr-only">
              <h2 id="about-highlights-heading">What we deliver</h2>
            </li>
            {HIGHLIGHT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.li key={card.title} variants={itemVariants}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-bg p-6 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-green/35 hover:shadow-[0_24px_70px_-36px_rgba(133,199,39,0.18)] sm:p-7">
                    <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-paper text-green shadow-[0_0_24px_-8px_rgba(133,199,39,0.25)] transition-colors duration-300 group-hover:border-green/40 group-hover:text-green2">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-text sm:text-[1.35rem]">
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

      {/* 4. Our Value */}
      <section
        className="cv-section border-t border-line/80 bg-bg text-text"
        aria-labelledby="about-value-heading"
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
              id="about-value-heading"
              title={
                <span className="site-cta-banner__line block">
                  Forging Compelling Narratives for{" "}
                  <span className="hero-heading__accent">Captivating Book Journeys</span>
                </span>
              }
              align="center"
            />
            <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-muted sm:mt-10 sm:text-lg">
              <p>
                At Leaf Publisher, we believe a book should do more than look
                complete. It should feel purposeful, readable, and memorable. Our
                value lies in bringing together writing skill, creative direction,
                publishing knowledge, and design clarity to create ebooks that
                readers can connect with.
              </p>
              <p>
                Whether it is a personal story, business ebook, guide, memoir,
                fiction project, or educational book, we help transform the idea
                into a finished digital product with structure, style, and
                confidence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Mission & Vision */}
      <section
        className="cv-section relative overflow-x-clip border-t border-white/10 text-white/90"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="about-mission-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {[MISSION_VISION.vision, MISSION_VISION.mission].map((card, i) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-green/35 sm:p-8"
                aria-labelledby={i === 0 ? "about-mission-heading" : undefined}
              >
                <h2
                  id={i === 0 ? "about-mission-heading" : undefined}
                  className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.65rem]"
                >
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Our Services */}
      <section
        id="our-services"
        className="cv-section border-t border-line/80 bg-paper text-text"
        aria-labelledby="about-services-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="about-services-heading"
              eyebrow="What We Offer"
              title={
                <span className="site-cta-banner__line block">
                  Services We <span className="hero-heading__accent">Provide</span>
                </span>
              }
              subtitle="Professional ebook support across writing, editing, design, and formatting — everything you need to publish with confidence."
            />
          </motion.div>

          <motion.ul
            className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6"
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

      {/* 7. Stats */}
      <section
        className="cv-section border-t border-line/80 bg-bg text-text"
        aria-label="Leaf Publisher by the numbers"
      >
        <div className="container-site section-y">
          <motion.div
            className="hero-stat-grid mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            role="list"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} role="listitem" className="hero-stat-card">
                <p className="hero-stat-card__value">
                  <span className="tabular-nums">{stat.value}</span>
                </p>
                <p className="hero-stat-card__label">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. Portfolio Preview */}
      <section
        className="cv-section relative overflow-x-clip border-t border-white/10 text-white/90"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="about-portfolio-heading"
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
              id="about-portfolio-heading"
              eyebrow="Our Work"
              variant="dark"
              title={
                <span className="site-cta-banner__line block">
                  Our <span className="site-cta-banner__accent">Portfolio</span>
                </span>
              }
              subtitle="Captivating ebook writing, formatting, and cover design work created to spark reader curiosity."
            />
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
              From polished manuscript layouts to scroll-stopping book covers, Leaf
              Publisher focuses on creating ebooks that look professional, read
              smoothly, and feel ready for launch.
            </p>
          </motion.div>

          <motion.ul
            className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {PORTFOLIO_ITEMS.map((item) => (
              <motion.li key={item.title} variants={itemVariants}>
                <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-30px_rgba(133,199,39,0.2)]">
                  <div className="relative aspect-3/4 overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#181818]/90 via-[#181818]/20 to-transparent" />
                    <h3 className="absolute inset-x-0 bottom-0 p-4 font-display text-lg font-bold tracking-tight text-white sm:p-5">
                      {item.title}
                    </h3>
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* 9. Team */}
      <section
        className="cv-section border-t border-line/80 bg-bg text-text"
        aria-labelledby="about-team-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="about-team-heading"
              eyebrow="The People Behind the Books"
              title={
                <span className="site-cta-banner__line block">
                  Meet <span className="hero-heading__accent">Our Team</span>
                </span>
              }
              subtitle="Creative minds. Publishing experts. Better book results."
            />
            <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg">
              Behind every successful ebook is a team that understands writing,
              design, editing, and publishing. Leaf Publisher brings together
              creative talent and technical publishing knowledge to help authors
              move from rough ideas to refined books.
            </p>
          </motion.div>

          <motion.ul
            className="mt-10 grid list-none grid-cols-2 gap-3 p-0 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {TEAM_ROLES.map((member) => (
              <motion.li key={member.role} variants={itemVariants}>
                <article className="group flex h-full flex-col items-center rounded-2xl border border-line/80 bg-paper/60 p-5 text-center shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-6">
                  <span className="flex size-14 items-center justify-center rounded-full border border-line bg-bg font-display text-2xl font-bold text-green shadow-[0_0_24px_-8px_rgba(133,199,39,0.3)] transition-colors duration-300 group-hover:border-green/40 group-hover:text-green2 sm:size-16 sm:text-[1.65rem]">
                    {member.initial}
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold tracking-tight text-text sm:text-lg">
                    {member.role}
                  </h3>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* 10. Teamwork */}
      <section
        className="cv-section border-t border-line/80 bg-paper text-text"
        aria-labelledby="about-teamwork-heading"
      >
        <div className="container-site section-y">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <motion.div
              className="min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            >
              <Eyebrow align="left">Collaboration</Eyebrow>
              <h2
                id="about-teamwork-heading"
                className="site-cta-banner__headline text-text"
              >
                <span className="site-cta-banner__line block">
                  Talent Creates Books.{" "}
                  <span className="hero-heading__accent">Teamwork Builds Publishing Success.</span>
                </span>
              </h2>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
                A successful book needs more than one skill. It needs strong
                writing, careful editing, thoughtful design, clean formatting,
                and smart publishing direction. Our collaborative approach brings
                those pieces together so authors can move forward with clarity
                instead of confusion.
              </p>
            </motion.div>

            <motion.div
              className="relative min-w-0"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: reduceMotion ? 0.2 : 0.55,
                ease: EASE,
                delay: reduceMotion ? 0 : 0.06,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-4xl bg-linear-to-br from-green/8 via-transparent to-green2/10 blur-2xl sm:-inset-6"
              />
              <div className="relative overflow-hidden rounded-3xl border border-line/80 bg-bg shadow-[0_28px_80px_-36px_rgba(26,34,24,0.2)] ring-1 ring-line/50">
                <Image
                  src="/break_throught_single_img_with_bg.webp"
                  alt="Leaf Publisher team collaborating on ebook projects"
                  width={640}
                  height={480}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section
        className="cv-section border-t border-line/80 bg-bg text-text"
        aria-labelledby="about-final-cta-heading"
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
              <h2 id="about-final-cta-heading" className="site-cta-banner__headline">
                <span className="site-cta-banner__line block">
                  Writing Ebooks Like You Have{" "}
                  <span className="site-cta-banner__accent">Never Had Before</span>
                </span>
              </h2>
              <p className="site-cta-banner__sub mx-auto mt-5 max-w-xl font-sans">
                Experience a smoother way to create, refine, and publish your
                ebook. Leaf Publisher helps elevate your message with writing,
                editing, design, and publishing support built around your goals.
              </p>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3.5 sm:mt-11 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
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
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
