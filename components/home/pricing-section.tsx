"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiCheck } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;
const ANNUAL_DISCOUNT = 0.2;
/** Plain card surface (matches footer / featured). */
const PRICING_CARD_BG = "#181818";

type Billing = "monthly" | "annual";

type Plan = {
  id: string;
  name: string;
  badge?: string;
  monthly: number;
  description: string;
  features: readonly string[];
  cta: string;
  href: string;
  emphasized?: boolean;
};

const PLANS: readonly Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    description: "Great for casual readers just getting started.",
    features: [
      "Access to 10,000 free titles",
      "Basic reading experience",
      "1 device only",
      "Offline reading",
      "Unlimited library",
      "Publish ebooks",
    ],
    cta: "Get Started Free",
    href: "/get-started",
  },
  {
    id: "reader",
    name: "Reader",
    badge: "Most Popular",
    monthly: 9.99,
    description: "Unlimited reading for the dedicated bookworm.",
    features: [
      "Full access — all 2.4M titles",
      "Offline reading on 5 devices",
      "Highlights, notes & exports",
      "Early access to new releases",
      "Community reading circles",
      "Publish ebooks",
    ],
    cta: "Start 30-Day Free Trial",
    href: "/get-started",
    emphasized: true,
  },
  {
    id: "publisher",
    name: "Publisher",
    monthly: 19.99,
    description: "Everything in Reader, plus tools to publish and earn.",
    features: [
      "Everything in Reader",
      "Publish unlimited ebooks",
      "Sales analytics dashboard",
      "70% royalty on every sale",
      "Author profile & storefront",
      "Priority editorial consideration",
    ],
    cta: "Start Publishing",
    href: "/get-started",
  },
];

function formatPrice(amount: number) {
  if (amount === 0) return "$0";
  return `$${amount.toFixed(2).replace(/\.00$/, "")}`;
}

function monthlyEquivalent(monthly: number, billing: Billing) {
  if (monthly === 0) return 0;
  if (billing === "monthly") return monthly;
  return Math.round(monthly * (1 - ANNUAL_DISCOUNT) * 100) / 100;
}

export function PricingSection() {
  const reduceMotion = useReducedMotion();
  const [billing, setBilling] = useState<Billing>("monthly");

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    }),
    [reduceMotion]
  );

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.55, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  const cardVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
      show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: reduceMotion ? 0.2 : 0.52,
          ease: EASE,
          delay: reduceMotion ? 0 : 0.06 + i * 0.07,
        },
      }),
    }),
    [reduceMotion]
  );

  return (
    <section
      id="pricing"
      className="cv-section relative overflow-x-hidden border-t border-line/50 bg-white text-text"
      aria-labelledby="pricing-heading"
    >
      <div className="container-site section-y">
        <header aria-labelledby="pricing-heading">
          <motion.div
            className="relative text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <p className="relative mb-5 flex justify-center sm:mb-6">
              <span className="inline-flex items-center rounded-full border border-line/80 bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs">
                Simple Pricing
              </span>
            </p>
            <h2
              id="pricing-heading"
              className="site-cta-banner__headline relative mx-auto max-w-3xl text-text whitespace-nowrap"
            >
              <span className="site-cta-banner__line inline-block!">
                Plans That{" "}
                <span className="site-cta-banner__accent">Grow With You</span>
              </span>
            </h2>
          </motion.div>
        </header>

        <motion.div
          className="mx-auto mt-6 max-w-3xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-56px" }}
        >
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:mx-auto sm:text-[1.05rem]"
          >
            Start free. Upgrade when you&apos;re ready. No hidden fees.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex justify-center"
            role="group"
            aria-label="Billing period"
          >
            <div className="inline-flex rounded-full border border-line bg-bg/90 p-1 shadow-[0_8px_32px_-20px_rgba(26,34,24,0.25)] backdrop-blur-sm">
              <button
                type="button"
                aria-pressed={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                  billing === "monthly"
                    ? "text-text"
                    : "text-muted hover:text-text/90"
                }`}
              >
                {billing === "monthly" && (
                  <motion.span
                    layoutId="pricing-billing-pill"
                    className="absolute inset-0 rounded-full bg-paper shadow-sm ring-1 ring-line/80"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10">Monthly</span>
              </button>
              <button
                type="button"
                aria-pressed={billing === "annual"}
                onClick={() => setBilling("annual")}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                  billing === "annual"
                    ? "text-text"
                    : "text-muted hover:text-text/90"
                }`}
              >
                {billing === "annual" && (
                  <motion.span
                    layoutId="pricing-billing-pill"
                    className="absolute inset-0 rounded-full bg-paper shadow-sm ring-1 ring-green/35"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  Annual
                  <span className="rounded-full bg-green/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green sm:text-[11px]">
                    Save 20%
                  </span>
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {PLANS.map((plan, i) => {
            const m = monthlyEquivalent(plan.monthly, billing);
            const showAnnualNote = billing === "annual" && plan.monthly > 0;

            return (
              <motion.article
                key={plan.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-20px" }}
                className={`relative flex flex-col rounded-2xl border p-6 text-center text-white sm:p-7 ${
                  plan.emphasized
                    ? "border-green/45 shadow-[0_24px_60px_-28px_rgba(217,34,67,0.25)] ring-2 ring-green/30 ring-offset-2 ring-offset-paper lg:scale-[1.02]"
                    : "border-white/10 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.45)] hover:border-white/18"
                }`}
                style={{ backgroundColor: PRICING_CARD_BG }}
              >
                {plan.badge && (
                  <div className="mb-4 flex justify-center lg:-mt-1">
                    <span className="rounded-full bg-green px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_-12px_rgba(217,34,67,0.55)]">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="font-display text-xl font-bold text-white">
                  {plan.name}
                </div>

                <div className="mt-3">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${plan.id}-${billing}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: EASE }}
                    >
                      <span className="font-display text-4xl font-bold tabular-nums tracking-tight text-white sm:text-[2.65rem]">
                        {formatPrice(m)}
                        <span className="text-lg font-semibold text-white/65 sm:text-xl">
                          /mo
                        </span>
                      </span>
                      {showAnnualNote && (
                        <p className="mt-1.5 text-xs font-medium text-white/55 sm:text-sm">
                          Billed annually (20% off)
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-[0.9375rem]">
                  {plan.description}
                </p>

                <ul
                  className="mx-auto mt-6 flex w-full max-w-sm flex-1 flex-col gap-3 border-t border-white/10 pt-6 text-left sm:gap-3.5 sm:pt-7"
                  role="list"
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green/15 text-green2">
                        <HiCheck className="size-3.5" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="text-sm leading-snug text-white/90 sm:text-[0.9375rem]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold no-underline transition-colors sm:mt-9 ${
                    plan.emphasized
                      ? "bg-green text-white! shadow-[0_12px_36px_-14px_rgba(217,34,67,0.55)] hover:bg-green2 hover:text-white!"
                      : "border border-white/15 bg-white/8 text-white! visited:text-white! hover:border-green/40 hover:bg-white/12 hover:text-green2!"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
