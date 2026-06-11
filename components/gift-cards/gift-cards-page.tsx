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

import {
  GIFT_CARD_AUDIENCES,
  GIFT_CARD_FAQS,
  GIFT_CARD_OPTIONS,
  GIFT_CARD_PREVIEW,
  GIFT_CARD_PROCESS,
  GIFT_CARD_SERVICES,
  GIFT_CARD_TERMS,
  GIFT_CARDS_PAGE_IDS,
  type GiftCardFaq,
} from "@/components/gift-cards/gift-cards-data";
import { GiftCardForm } from "@/components/gift-cards/gift-cards-form";
import { GiftCardsHeroVisual } from "@/components/gift-cards/gift-cards-hero-visual";

const EASE = [0.22, 1, 0.36, 1] as const;
const DARK_BG = "#181818";

function DecorativeGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-green/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-green2/14 blur-3xl"
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

function GiftCardFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: GiftCardFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `gift-faq-panel-${faq.id}`;
  const buttonId = `gift-faq-button-${faq.id}`;
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
          className="group flex w-full items-center justify-between gap-4 px-1 py-5 text-left transition-colors sm:gap-5 sm:py-6"
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
              className="px-1 pb-5 sm:pb-6"
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

export function GiftCardsPage() {
  const reduceMotion = useReducedMotion();
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    GIFT_CARD_FAQS[0]?.id ?? null
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
        aria-labelledby="gift-cards-hero-heading"
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
                Gift Cards
              </motion.p>

              <motion.h1
                id="gift-cards-hero-heading"
                variants={softItemVariants}
                className="hero-heading font-display text-[clamp(2rem,4.5vw+0.5rem,3.35rem)] font-bold leading-[1.08] tracking-tight text-text"
              >
                <span className="hero-heading__line block">
                  Give Someone the Gift of a{" "}
                  <span className="hero-heading__accent">Published Idea</span>
                </span>
              </motion.h1>

              <motion.p
                variants={softItemVariants}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              >
                A Leaf Publisher gift card is a thoughtful way to support someone with a
                book idea, manuscript, or publishing dream. Whether they need writing
                help, editing, formatting, cover design, or publishing guidance, your
                gift can help them take the next step.
              </motion.p>

              <motion.div
                variants={softItemVariants}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <a
                  href={`#${GIFT_CARDS_PAGE_IDS.options}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  Buy a Gift Card
                  <HiArrowRight className="size-4" aria-hidden />
                </a>
                <a
                  href={`#${GIFT_CARDS_PAGE_IDS.process}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-bg/90 px-8 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  How It Works
                </a>
              </motion.div>
            </motion.div>

            <GiftCardsHeroVisual />
          </div>
        </div>
      </section>

      {/* Gift card options */}
      <section
        id={GIFT_CARDS_PAGE_IDS.options}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="gift-card-options-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="gift-card-options-heading"
              title={
                <span className="site-cta-banner__line block">
                  Choose a <span className="hero-heading__accent">Gift Card</span>
                </span>
              }
              subtitle="Select a gift amount or request a custom gift card for a specific ebook service."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {GIFT_CARD_OPTIONS.map((option) => (
              <motion.article
                key={option.id}
                variants={itemVariants}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 sm:p-7 ${
                  option.featured
                    ? "border-green/40 bg-linear-to-br from-green/6 via-bg to-bg shadow-[0_24px_70px_-36px_rgba(133,199,39,0.2)]"
                    : "border-line/80 bg-bg hover:border-green/35 hover:shadow-[0_24px_70px_-36px_rgba(133,199,39,0.18)]"
                }`}
              >
                {option.featured ? (
                  <span className="absolute right-4 top-4 rounded-full border border-green/30 bg-green/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-green">
                    Popular
                  </span>
                ) : null}
                <p className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                  {option.amount}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-text">
                  {option.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {option.description}
                </p>
                <a
                  href={`#${GIFT_CARDS_PAGE_IDS.form}`}
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-paper px-5 text-sm font-semibold text-text transition-[border-color,background-color,transform] duration-200 hover:border-green/40 hover:bg-green/8 hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  {option.buttonLabel}
                </a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who it is for */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="gift-card-audience-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="gift-card-audience-heading"
              title={
                <span className="site-cta-banner__line block">
                  Perfect For Writers, Readers, and{" "}
                  <span className="hero-heading__accent">Future Authors</span>
                </span>
              }
              subtitle="Give a practical gift that supports creativity, learning, and publishing dreams."
            />
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {GIFT_CARD_AUDIENCES.map((card) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  variants={itemVariants}
                  className="group flex h-full flex-col rounded-2xl border border-line/80 bg-paper p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl border border-line bg-bg text-green transition-colors duration-300 group-hover:border-green/40 group-hover:text-green2">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-text">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                    {card.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section
        id={GIFT_CARDS_PAGE_IDS.process}
        className="scroll-mt-28 border-t border-line/80 bg-paper text-text"
        aria-labelledby="gift-card-process-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="gift-card-process-heading"
              title={
                <span className="site-cta-banner__line block">
                  How Gift Cards <span className="hero-heading__accent">Work</span>
                </span>
              }
              subtitle="A simple process designed to make gifting easy."
            />
          </motion.div>

          <motion.ol
            className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {GIFT_CARD_PROCESS.map((step) => (
              <motion.li
                key={step.step}
                variants={itemVariants}
                className="relative flex h-full flex-col rounded-2xl border border-line/80 bg-bg p-6 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-green/30 bg-green/10 font-display text-lg font-bold text-green">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-text sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Services supported */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="gift-card-services-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="gift-card-services-heading"
              title={
                <span className="site-cta-banner__line block">
                  What Can a Gift Card Be{" "}
                  <span className="hero-heading__accent">Used For?</span>
                </span>
              }
              subtitle="Gift cards can support different stages of the ebook creation journey."
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {GIFT_CARD_SERVICES.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 rounded-xl border border-line/70 bg-paper px-4 py-3.5 text-sm text-text sm:text-[0.9375rem]"
                >
                  <HiCheck
                    className="mt-0.5 size-5 shrink-0 text-green"
                    aria-hidden
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
              Gift card usage may depend on the selected service, project scope, and
              available packages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personalized gift preview */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="gift-card-personal-heading"
      >
        <div className="container-site section-y">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-48px" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
            >
              <SectionHeader
                id="gift-card-personal-heading"
                title={
                  <span className="site-cta-banner__line block">
                    Make the Gift Feel{" "}
                    <span className="hero-heading__accent">Personal</span>
                  </span>
                }
                subtitle="Add a custom message for the recipient and give them more than a simple card. Give them encouragement to start the book, finish the manuscript, or finally bring their idea into the world."
              />
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-md lg:max-w-none"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: EASE, delay: 0.06 }}
            >
              <div className="relative rotate-[-1.5deg] rounded-2xl border border-line/80 bg-linear-to-br from-[#fdf9dc] via-[#faf6e8] to-[#f5f0dc] p-6 shadow-[0_24px_60px_-32px_rgba(26,34,24,0.18)] sm:p-8">
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded-sm bg-white/55 shadow-sm"
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  Gift message preview
                </p>
                <div className="mt-5 space-y-4 font-display text-text">
                  <p>
                    <span className="text-sm font-semibold text-muted">To:</span>{" "}
                    <span className="text-lg font-bold">{GIFT_CARD_PREVIEW.to}</span>
                  </p>
                  <div className="rounded-xl border border-line/60 bg-white/50 px-4 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                      Message
                    </p>
                    <p className="mt-2 text-base leading-relaxed italic text-text/90 sm:text-lg">
                      &ldquo;{GIFT_CARD_PREVIEW.message}&rdquo;
                    </p>
                  </div>
                  <p>
                    <span className="text-sm font-semibold text-muted">From:</span>{" "}
                    <span className="text-lg font-bold">{GIFT_CARD_PREVIEW.from}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Request form */}
      <section
        id={GIFT_CARDS_PAGE_IDS.form}
        className="scroll-mt-28 border-t border-line/80 bg-bg text-text"
        aria-labelledby="gift-card-form-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="gift-card-form-heading"
              title={
                <span className="site-cta-banner__line block">
                  Request a <span className="hero-heading__accent">Gift Card</span>
                </span>
              }
              subtitle="Fill out the details below and our team will help prepare the right gift card option for you."
            />
          </motion.div>

          <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
            <GiftCardForm id={GIFT_CARDS_PAGE_IDS.form} />
          </div>
        </div>
      </section>

      {/* Terms */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="gift-card-terms-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="gift-card-terms-heading"
              title={
                <span className="site-cta-banner__line block">
                  Gift Card <span className="hero-heading__accent">Terms</span>
                </span>
              }
            />
          </motion.div>

          <motion.article
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-line/80 bg-bg p-6 sm:mt-12 sm:p-8"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <ul className="space-y-4">
              {GIFT_CARD_TERMS.map((term) => (
                <li
                  key={term}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-green"
                  />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="gift-card-faq-heading"
      >
        <div className="container-site section-y">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <SectionHeader
              id="gift-card-faq-heading"
              title={
                <span className="site-cta-banner__line block">
                  Gift Card <span className="hero-heading__accent">Questions</span>
                </span>
              }
            />
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line/80 bg-paper/50 sm:mt-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            {GIFT_CARD_FAQS.map((faq) => (
              <GiftCardFaqItem
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
        aria-labelledby="gift-card-final-cta-heading"
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
              id="gift-card-final-cta-heading"
              className="site-cta-banner__headline"
            >
              <span className="site-cta-banner__line block">
                Give a Gift That Helps an Idea{" "}
                <span className="hero-heading__accent">Become a Book</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Whether it is for a birthday, graduation, business milestone, holiday,
              or creative encouragement, a Leaf Publisher gift card can help someone
              take their next step toward writing and publishing.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`#${GIFT_CARDS_PAGE_IDS.form}`}
                className="site-cta-btn site-cta-btn--primary"
              >
                Request a Gift Card
                <HiArrowRight className="size-4" aria-hidden />
              </a>
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
