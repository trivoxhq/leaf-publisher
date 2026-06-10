"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HiArrowRight, HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";

import {
  HELP_CONFIG,
  HELP_FAQS,
  HELP_TOPICS,
  type HelpFaq,
} from "@/components/help/help-data";

const EASE = [0.22, 1, 0.36, 1] as const;

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

function FaqAnswer({ faq }: { faq: HelpFaq }) {
  return (
    <p className="text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
      {faq.id === "contact-support" ? (
        <>
          You can contact Leaf Publisher through the{" "}
          <Link href="/contact" className="font-medium text-green hover:text-green2">
            contact page
          </Link>{" "}
          or email our support team at{" "}
          <a
            href={`mailto:${HELP_CONFIG.supportEmail}`}
            className="font-medium text-green hover:text-green2"
          >
            {HELP_CONFIG.supportEmail}
          </a>
          .
        </>
      ) : (
        faq.answer
      )}
    </p>
  );
}

function HelpFaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: HelpFaq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const panelId = `faq-panel-${faq.id}`;
  const buttonId = `faq-button-${faq.id}`;

  const panelTransition = reduceMotion
    ? { duration: 0.15 }
    : { duration: 0.38, ease: EASE };

  return (
    <motion.div
      layout={!reduceMotion}
      className={`border-b border-line/80 last:border-b-0 ${
        isOpen ? "bg-green/4" : ""
      }`}
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
              <FaqAnswer faq={faq} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HelpPage() {
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(HELP_FAQS[0]?.id ?? null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredFaqs = useMemo(() => {
    if (!normalizedQuery) return HELP_FAQS;
    return HELP_FAQS.filter(
      (faq) =>
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const filteredTopics = useMemo(() => {
    if (!normalizedQuery) return HELP_TOPICS;
    return HELP_TOPICS.filter(
      (topic) =>
        topic.title.toLowerCase().includes(normalizedQuery) ||
        topic.description.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

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
        transition: { duration: reduceMotion ? 0.2 : 0.4, ease: EASE },
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

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="help-hero-heading"
      >
        <DecorativeGlow />
        <div className="container-site relative py-14 sm:py-16 lg:py-20">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={softContainerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={softItemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
            >
              Help Centre
            </motion.p>

            <motion.h1
              id="help-hero-heading"
              variants={softItemVariants}
              className="hero-heading font-display text-[clamp(2rem,5vw+0.35rem,3.25rem)] font-bold leading-[1.08] tracking-tight text-text"
            >
              <span className="hero-heading__line block">
                How Can We <span className="hero-heading__accent">Help You?</span>
              </span>
            </motion.h1>

            <motion.p
              variants={softItemVariants}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Find quick answers about Leaf Publisher services, ebook writing, editing,
              design, formatting, publishing support, payments, and project timelines.
            </motion.p>

            <motion.form
              variants={softItemVariants}
              onSubmit={handleSearchSubmit}
              className="relative mx-auto mt-8 max-w-xl"
              role="search"
              aria-label="Search help topics"
            >
              <label htmlFor="help-search" className="sr-only">
                Search for help articles
              </label>
              <HiOutlineSearch
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                id="help-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="h-12 w-full rounded-full border border-line bg-bg/90 py-3 pl-12 pr-4 text-sm text-text placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] focus:border-green/45 focus:ring-2 focus:ring-green/15 sm:text-[0.9375rem]"
              />
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section
        className="relative border-t border-line/80 bg-paper text-text"
        aria-labelledby="help-topics-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          <motion.h2
            id="help-topics-heading"
            className="site-cta-banner__headline text-center text-text"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
          >
            <span className="site-cta-banner__line block">
              Popular Help <span className="hero-heading__accent">Topics</span>
            </span>
          </motion.h2>

          <motion.ul
            key={normalizedQuery || "all-topics"}
            className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <motion.li key={topic.title} variants={itemVariants}>
                  <article className="flex h-full flex-col rounded-2xl border border-line/80 bg-bg p-5 shadow-[0_12px_40px_-32px_rgba(26,34,24,0.1)] transition-[border-color] duration-300 hover:border-green/35 sm:p-6">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-paper text-green">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-text">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {topic.description}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </motion.ul>

          {normalizedQuery && filteredTopics.length === 0 ? (
            <p className="mt-6 text-center text-sm text-muted">
              No help topics match your search.
            </p>
          ) : null}
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-line/80 bg-bg text-text"
        aria-labelledby="help-faq-heading"
      >
        <div className="container-site section-y">
          <motion.h2
            id="help-faq-heading"
            className="site-cta-banner__headline mx-auto max-w-3xl text-center text-text"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
          >
            <span className="site-cta-banner__line block">
              Frequently Asked <span className="hero-heading__accent">Questions</span>
            </span>
          </motion.h2>

          <motion.div
            className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line/80 bg-paper/50 px-4 sm:mt-12 sm:px-5 lg:px-6"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <HelpFaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaqId === faq.id}
                  onToggle={() =>
                    setOpenFaqId((current) => (current === faq.id ? null : faq.id))
                  }
                />
              ))
            ) : (
              <p className="py-8 text-center text-sm text-muted">
                No FAQs match your search. Try a different term or{" "}
                <Link href="/contact" className="font-medium text-green hover:text-green2">
                  contact support
                </Link>
                .
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Still Need Help */}
      <section
        className="border-t border-line/80 bg-paper text-text"
        aria-labelledby="help-support-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.45, ease: EASE }}
          >
            <h2
              id="help-support-heading"
              className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl"
            >
              Still Need Help?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Can&apos;t find the answer you are looking for? Send us a message and our
              team will help guide you through the next step.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 sm:mt-8"
            >
              Contact Support
              <HiArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
