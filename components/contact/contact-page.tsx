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

import { CONTACT_FORM_ID, CONTACT_INFO } from "@/components/contact/contact-data";
import { ContactForm } from "@/components/contact/contact-form";

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

function ContactInfoCards() {
  const reduceMotion = useReducedMotion();

  const cards = [
    {
      key: "office",
      title: CONTACT_INFO.office.title,
      icon: CONTACT_INFO.office.icon,
      content: (
        <address className="not-italic text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {CONTACT_INFO.office.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    },
    {
      key: "email",
      title: CONTACT_INFO.email.title,
      icon: CONTACT_INFO.email.icon,
      content: (
        <a
          href={`mailto:${CONTACT_INFO.email.address}`}
          className="text-sm font-medium text-green transition-colors hover:text-green2 sm:text-[0.9375rem]"
        >
          {CONTACT_INFO.email.address}
        </a>
      ),
    },
    {
      key: "phone",
      title: CONTACT_INFO.phone.title,
      icon: CONTACT_INFO.phone.icon,
      content: (
        <a
          href={CONTACT_INFO.phone.href}
          className="text-sm font-medium text-text transition-colors hover:text-green sm:text-[0.9375rem]"
        >
          {CONTACT_INFO.phone.display}
        </a>
      ),
    },
  ] as const;

  return (
    <ul className="flex list-none flex-col gap-4 p-0" role="list">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.li
            key={card.key}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-32px" }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.45,
              ease: EASE,
              delay: reduceMotion ? 0 : i * 0.08,
            }}
          >
            <article className="group flex h-full gap-4 rounded-2xl border border-line/80 bg-bg p-5 shadow-[0_16px_50px_-36px_rgba(26,34,24,0.1)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-green transition-colors duration-300 group-hover:border-green/40 group-hover:text-green2">
                <Icon className="size-6" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold tracking-tight text-text">
                  {card.title}
                </h3>
                <div className="mt-2">{card.content}</div>
              </div>
            </article>
          </motion.li>
        );
      })}
    </ul>
  );
}

export function ContactPage() {
  const reduceMotion = useReducedMotion();

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
      hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
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
        aria-labelledby="contact-hero-heading"
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
              Contact Us
            </motion.p>

            <motion.h1
              id="contact-hero-heading"
              variants={softItemVariants}
              className="hero-heading font-display text-[clamp(2rem,5.5vw+0.35rem,3.75rem)] font-bold leading-[1.08] tracking-tight text-text"
            >
              <span className="hero-heading__line block">
                Empowering Ebook Success With Support That Is{" "}
                <span className="hero-heading__accent">Always Within Reach</span>
              </span>
            </motion.h1>

            <motion.p
              variants={softItemVariants}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Have a book idea, a manuscript, or questions about publishing? Leaf
              Publisher is here to help you move forward with writing, editing,
              design, formatting, and publishing support built around your goals.
            </motion.p>

            <motion.div
              variants={softItemVariants}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <a
                href={`#${CONTACT_FORM_ID}`}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2 sm:w-auto"
              >
                Send a Message
              </a>
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

      {/* 2. Get In Touch */}
      <section
        className="cv-section relative border-t border-line/80 bg-paper text-text"
        aria-labelledby="contact-touch-heading"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          <motion.header
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <h2
              id="contact-touch-heading"
              className="site-cta-banner__headline text-text"
            >
              <span className="site-cta-banner__line block">
                Get In <span className="hero-heading__accent">Touch</span>
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              Tell us what you are working on, and our team will help guide you
              toward the right ebook solution.
            </p>
          </motion.header>

          <motion.div
            className="mt-10 grid grid-cols-1 items-start gap-8 sm:mt-12 lg:mt-14 lg:grid-cols-12 lg:gap-10 xl:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div className="lg:col-span-7" variants={itemVariants}>
              <ContactForm id={CONTACT_FORM_ID} />
            </motion.div>
            <motion.div className="lg:col-span-5" variants={itemVariants}>
              <ContactInfoCards />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Help */}
      <section
        className="cv-section border-t border-line/80 bg-bg text-text"
        aria-labelledby="contact-help-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <h2
              id="contact-help-heading"
              className="site-cta-banner__headline text-text"
            >
              <span className="site-cta-banner__line block">
                We Are Here to <span className="hero-heading__accent">Help</span>
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
              Our team is committed to making your writing, publishing, and book
              launch journey smoother. Whether you need help shaping an idea,
              editing a manuscript, designing an ebook, formatting files, or
              preparing for publishing, Leaf Publisher is ready to support you with
              clear guidance and professional care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. Ready to Get Started */}
      <section
        className="cv-section border-t border-line/80 bg-paper text-text"
        aria-labelledby="contact-ready-heading"
      >
        <div className="container-site section-y">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-line/80 bg-bg shadow-[0_24px_80px_-40px_rgba(26,34,24,0.12)] sm:rounded-3xl"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-green/6 via-transparent to-green2/8"
            />
            <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10 xl:p-12">
              <div className="min-w-0">
                <h2
                  id="contact-ready-heading"
                  className="font-display text-[clamp(1.75rem,3.5vw+0.5rem,2.5rem)] font-bold leading-[1.12] tracking-tight text-text"
                >
                  Ready to Get Started?
                </h2>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
                  Leaf Publisher helps authors bring their ideas to life, refine
                  their message, and prepare ebooks that feel polished,
                  professional, and ready for readers.
                </p>
                <a
                  href={`#${CONTACT_FORM_ID}`}
                  className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-7 py-3 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.45)] transition-[background-color,transform] hover:bg-green2 active:scale-[0.98] sm:mt-8"
                >
                  Start Your Project
                  <HiArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>

              <div className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-green/10 via-transparent to-green2/10 blur-2xl"
                />
                <div className="relative flex items-end justify-center gap-3 sm:gap-4">
                  {[
                    { src: "/e-books/demo-ebook1.png", alt: "Ebook cover", rotate: "-rotate-6" },
                    { src: "/e-books/demo-ebook3.png", alt: "Ebook cover", rotate: "rotate-0 z-10 scale-105" },
                    { src: "/e-books/demo-ebook5.jpg", alt: "Ebook cover", rotate: "rotate-6" },
                  ].map((book) => (
                    <div
                      key={book.src}
                      className={`relative h-36 w-24 overflow-hidden rounded-xl border border-line/80 bg-paper shadow-[0_20px_50px_-24px_rgba(26,34,24,0.25)] sm:h-44 sm:w-28 ${book.rotate}`}
                    >
                      <Image
                        src={book.src}
                        alt={book.alt}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Support Message */}
      <section
        className="cv-section relative overflow-x-clip border-t border-white/10 text-white/90"
        style={{ backgroundColor: DARK_BG }}
        aria-labelledby="contact-support-heading"
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
            <h2 id="contact-support-heading" className="site-cta-banner__headline">
              <span className="site-cta-banner__line block">
                Let&apos;s Talk About{" "}
                <span className="site-cta-banner__accent">Your Book</span>
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg">
              Contact us and one of our support representatives will reach out to
              learn more about your project. We would be happy to answer your
              questions, explain our process, and help you understand the best next
              step for your ebook.
            </p>
            <p className="mt-5 font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
              We look forward to helping you create something meaningful.
            </p>
            <a
              href={`#${CONTACT_FORM_ID}`}
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-green/40 hover:bg-white/12 sm:mt-10"
            >
              Send a Message
              <HiArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
