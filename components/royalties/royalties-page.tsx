"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight, HiCheck, HiOutlinePlus } from "react-icons/hi";

import { RoyaltiesCalculator } from "@/components/royalties/royalties-calculator";
import { RoyaltiesHeroVisual } from "@/components/royalties/royalties-hero-visual";
import {
  AUTHOR_RIGHTS_CHECKLIST,
  computeExampleBreakdown,
  EXAMPLE_BREAKDOWN,
  EXAMPLE_BREAKDOWN_NOTE,
  LEAF_PUBLISHER_ROLE_CARDS,
  PAYOUT_STEPS,
  ROYALTIES_PAGE_IDS,
  ROYALTY_EXPLANATION_CARDS,
  ROYALTY_FAQS,
  ROYALTY_MODEL_CARDS,
  TRANSPARENCY_CARDS,
  type RoyaltyFaq,
} from "@/components/royalties/royalties-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

const exampleValues = computeExampleBreakdown(
  EXAMPLE_BREAKDOWN.salePrice,
  EXAMPLE_BREAKDOWN.platformFeePercent,
  EXAMPLE_BREAKDOWN.royaltyPercent
);

function DecorativeGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-green/16 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-green2/12 blur-3xl"
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
      <h2 id={id} className={`site-cta-banner__headline ${isDark ? "" : "text-text"}`}>
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

function RoyaltyFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: RoyaltyFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `royalty-faq-panel-${faq.id}`;
  const buttonId = `royalty-faq-button-${faq.id}`;
  const panelTransition = reduceMotion
    ? { duration: 0.15 }
    : { duration: 0.38, ease: EASE };

  return (
    <motion.div
      layout={!reduceMotion}
      className={`border-b border-line/80 last:border-b-0 ${isOpen ? "bg-green/4" : ""}`}
      transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: EASE }}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors sm:gap-5 sm:px-6 sm:py-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span
            className={`min-w-0 flex-1 font-display text-base font-bold tracking-tight transition-colors sm:text-lg ${
              isOpen ? "text-text" : "text-text group-hover:text-green"
            }`}
          >
            {faq.question}
          </span>
          <motion.span
            aria-hidden
            className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 shadow-[0_4px_16px_-6px_rgba(26,34,24,0.12)] transition-colors duration-300 sm:size-11 ${
              isOpen
                ? "border-green/50 bg-green/12 text-green shadow-[0_6px_20px_-8px_rgba(133,199,39,0.35)]"
                : "border-line bg-bg text-muted group-hover:border-green/35 group-hover:text-green"
            }`}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 320, damping: 22 }
            }
          >
            <HiOutlinePlus className="size-5 sm:size-6" strokeWidth={2.25} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden"
          >
            <motion.div
              initial={reduceMotion ? false : { y: -6 }}
              animate={{ y: 0 }}
              exit={reduceMotion ? undefined : { y: -4 }}
              transition={panelTransition}
              className="px-5 pb-6 sm:px-6 sm:pb-7"
            >
              <p className="text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function RoyaltiesPage() {
  const reduceMotion = useReducedMotion();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    ROYALTY_FAQS[0]?.id ?? null
  );

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.04,
        },
      },
    }),
    [reduceMotion]
  );

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
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
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="royalties-hero-heading"
      >
        <DecorativeGlow />
        <div className="container-site relative py-14 sm:py-16 lg:py-20 xl:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <motion.div
              className="min-w-0 max-w-xl lg:max-w-none"
              variants={softContainerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.p
                variants={softItemVariants}
                className="mb-4 inline-flex items-center rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
              >
                Author Royalties
              </motion.p>

              <motion.h1
                id="royalties-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2rem,4.5vw+0.5rem,3.35rem)] font-bold leading-[1.08] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Understand Your Ebook Earnings{" "}
                  <span className="hero-heading__accent">With Clarity</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              >
                Leaf Publisher helps authors prepare, publish, and present ebooks with
                a clearer understanding of royalties, pricing, platform fees, and payout
                expectations. Our goal is to make the financial side of publishing
                easier to understand before your book reaches readers.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href={`#${ROYALTIES_PAGE_IDS.explanation}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  How Royalties Work
                  <HiArrowRight className="size-4" aria-hidden />
                </a>
                <Link
                  href="/for-authors"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-bg/90 px-8 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Start Publishing
                </Link>
              </motion.div>
            </motion.div>

            <RoyaltiesHeroVisual />
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section
        id={ROYALTIES_PAGE_IDS.explanation}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="royalties-explanation-heading"
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
              id="royalties-explanation-heading"
              title={
                <span className="site-cta-banner__line block">
                  How Ebook <span className="hero-heading__accent">Royalties Work</span>
                </span>
              }
            />
            <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg">
              Royalties are the earnings an author receives from book sales after
              platform fees, payment processing costs, distribution costs, service
              agreements, or other applicable deductions. The final amount can vary
              depending on where the book is sold, how it is priced, and what
              publishing setup is used.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
              Leaf Publisher helps authors understand these moving parts so they can
              make better decisions about pricing, formats, distribution, and
              long-term book strategy.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {ROYALTY_EXPLANATION_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-line/80 bg-bg p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Royalty models */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="royalty-models-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="royalty-models-heading"
              title={
                <span className="site-cta-banner__line block">
                  Royalty Models Authors{" "}
                  <span className="hero-heading__accent">Should Know</span>
                </span>
              }
              subtitle="Different publishing paths may calculate earnings differently."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {ROYALTY_MODEL_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <h3 className="font-display text-xl font-bold tracking-tight text-text">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="royalty-calculator-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="royalty-calculator-heading"
              title={
                <span className="site-cta-banner__line block">
                  Estimate Your Potential{" "}
                  <span className="hero-heading__accent">Earnings</span>
                </span>
              }
              subtitle="Use this simple calculator layout to understand how pricing, fees, and royalty rates may affect author earnings."
            />
          </motion.div>

          <div className="mx-auto mt-10 max-w-4xl sm:mt-12">
            <RoyaltiesCalculator />
          </div>
        </div>
      </section>

      {/* Leaf Publisher role */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="leaf-publisher-role-heading"
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
              id="leaf-publisher-role-heading"
              title={
                <span className="site-cta-banner__line block">
                  How Leaf Publisher Helps Authors With{" "}
                  <span className="hero-heading__accent">Royalties</span>
                </span>
              }
              subtitle="Leaf Publisher does not just help authors create ebooks. We also help them understand the publishing decisions that can affect visibility, pricing, royalties, and long-term earning potential."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {LEAF_PUBLISHER_ROLE_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Payout timeline */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="payout-process-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="payout-process-heading"
              title={
                <span className="site-cta-banner__line block">
                  Understanding the{" "}
                  <span className="hero-heading__accent">Payout Process</span>
                </span>
              }
              subtitle="Royalty payouts usually follow a clear path from reader purchase to author payment."
            />
          </motion.div>

          <motion.ol
            className="relative mt-10 space-y-4 sm:mt-12 sm:space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <div
              aria-hidden
              className="absolute bottom-4 left-6 top-4 hidden w-px bg-linear-to-b from-green/40 via-line to-transparent sm:block"
            />
            {PAYOUT_STEPS.map((step) => (
              <motion.li
                key={step.step}
                variants={itemVariants}
                className="relative flex gap-4 rounded-2xl border border-line/80 bg-bg p-5 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow] duration-300 hover:border-green/35 sm:gap-5 sm:p-6 sm:pl-8"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-green/30 bg-green/10 font-display text-lg font-bold text-green sm:absolute sm:left-0 sm:-translate-x-1/2">
                  {step.step}
                </span>
                <div className="min-w-0 sm:ml-4">
                  <h3 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Transparency */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="transparency-heading"
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
              id="transparency-heading"
              title={
                <span className="site-cta-banner__line block">
                  Royalty <span className="hero-heading__accent">Transparency Matters</span>
                </span>
              }
              subtitle="Authors deserve to understand how their book can earn, what costs may apply, and what terms affect their final payout. Leaf Publisher encourages clear agreements, simple reporting, and realistic expectations before any publishing decision is made."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {TRANSPARENCY_CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={itemVariants}
                className="rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] sm:p-7"
              >
                <h3 className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Example breakdown */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="example-breakdown-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="example-breakdown-heading"
              title={
                <span className="site-cta-banner__line block">
                  Example Royalty <span className="hero-heading__accent">Breakdown</span>
                </span>
              }
              subtitle="A simple example showing how royalties may be estimated."
            />
          </motion.div>

          <motion.article
            className="mx-auto mt-10 max-w-lg rounded-2xl border border-line/80 bg-bg p-6 sm:mt-12 sm:p-8"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <dl className="space-y-4">
              {[
                {
                  label: "Ebook Sale Price",
                  value: `${EXAMPLE_BREAKDOWN.currency}${EXAMPLE_BREAKDOWN.salePrice.toFixed(2)}`,
                },
                {
                  label: "Estimated Platform Fee",
                  value: `${EXAMPLE_BREAKDOWN.platformFeePercent}%`,
                },
                {
                  label: "Remaining Amount",
                  value: `${EXAMPLE_BREAKDOWN.currency}${exampleValues.remaining.toFixed(2)}`,
                },
                {
                  label: "Estimated Royalty Rate",
                  value: `${EXAMPLE_BREAKDOWN.royaltyPercent}%`,
                },
                {
                  label: "Estimated Author Royalty",
                  value: `${EXAMPLE_BREAKDOWN.currency}${exampleValues.authorRoyalty.toFixed(2)}`,
                  highlight: true,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between gap-4 border-b border-line/60 pb-4 last:border-b-0 last:pb-0 ${
                    "highlight" in row && row.highlight ? "rounded-xl border-none bg-green/6 px-4 py-3" : ""
                  }`}
                >
                  <dt className="text-sm text-muted">{row.label}</dt>
                  <dd
                    className={`font-display text-lg font-bold ${
                      "highlight" in row && row.highlight ? "text-green" : "text-text"
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-muted">{EXAMPLE_BREAKDOWN_NOTE}</p>
          </motion.article>
        </div>
      </section>

      {/* Author rights */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="author-rights-heading"
      >
        <div className="container-site section-y">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            >
              <SectionHeader
                id="author-rights-heading"
                title={
                  <span className="site-cta-banner__line block">
                    Author Rights and <span className="hero-heading__accent">Ownership</span>
                  </span>
                }
                subtitle="Authors should understand ownership and royalty terms before publishing. Leaf Publisher should clearly define whether it is providing services, publishing support, distribution assistance, or any rights-related arrangement."
              />
            </motion.div>

            <motion.ul
              className="mt-10 space-y-4 sm:mt-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {AUTHOR_RIGHTS_CHECKLIST.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-start gap-3 rounded-xl border border-line/70 bg-paper px-4 py-3.5 text-sm text-text sm:text-[0.9375rem]"
                >
                  <HiCheck className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="royalties-faq-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="royalties-faq-heading"
              title={
                <span className="site-cta-banner__line block">
                  Royalties <span className="hero-heading__accent">Questions</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line/80 bg-bg/50 py-1 sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            {ROYALTY_FAQS.map((faq) => (
              <RoyaltyFaqItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqId === faq.id}
                onToggle={() =>
                  setOpenFaqId((current) => (current === faq.id ? null : faq.id))
                }
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative overflow-hidden border-t border-line/80 text-white"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="royalties-final-cta-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(133,199,39,0.14),transparent_65%)]"
        />
        <div className="container-site relative section-y">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <h2
              id="royalties-final-cta-heading"
              className="site-cta-banner__headline"
            >
              <span className="site-cta-banner__line block">
                Publish With More <span className="hero-heading__accent">Confidence</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              A strong ebook needs more than polished writing and design. It also needs
              clear pricing, royalty expectations, publishing direction, and ownership
              terms. Leaf Publisher helps authors move forward with more clarity.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/for-authors" className="site-cta-btn site-cta-btn--primary">
                Start Publishing
                <HiArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/contact" className="site-cta-btn site-cta-btn--secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
