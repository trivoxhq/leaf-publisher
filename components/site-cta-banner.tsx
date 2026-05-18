"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Match `SiteFooter` solid fill. */
const FOOTER_DARK_BG = "#181818";

/**
 * Global pre-footer CTA — footer-dark strip, centered copy + actions.
 */
export function SiteCtaBanner() {
  const reduce = useReducedMotion();

  return (
    <section
      className="container-site relative py-14 sm:py-16 lg:py-20 xl:py-24"
      aria-labelledby="site-cta-heading"
    >
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/35 to-transparent"
      /> */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.65)] px-5 py-12 sm:rounded-3xl sm:px-8 sm:py-14 md:px-10 lg:px-16 lg:py-16"
        style={{ backgroundColor: FOOTER_DARK_BG }}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-48px" }}
        transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE }}
      >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background: `
                radial-gradient(55% 45% at 50% 0%, color-mix(in srgb, var(--green) 16%, transparent), transparent 58%),
                radial-gradient(40% 35% at 80% 100%, color-mix(in srgb, var(--green2) 10%, transparent), transparent 50%),
                linear-gradient(180deg, #141414 0%, ${FOOTER_DARK_BG} 100%)
              `,
            }}
          />

          <div className="relative mx-auto max-w-3xl">
            <h2 id="site-cta-heading" className="site-cta-banner__headline">
              <span className="site-cta-banner__line">
                <span className="site-cta-banner__accent">Start Today</span> 
              </span>
              <span className="site-cta-banner__line mt-1 sm:mt-1.5">
                No Credit Card <span className="site-cta-banner__accent">Required</span>
              </span>
            </h2>
            <p className="site-cta-banner__sub mx-auto max-w-xl font-sans">
              30 days free. Cancel anytime.
            </p>
            <p className="site-cta-banner__tagline mx-auto max-w-xl font-sans">
              Unlimited books. Offline reading. One flat rate.
            </p>

            <motion.div
              className="mt-9 flex flex-col items-stretch justify-center gap-3.5 sm:mt-11 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.4 }}
            >
              <Link
                href="/get-started"
                className="site-cta-btn site-cta-btn--primary group text-[#ffffff]! visited:text-[#ffffff]! hover:text-[#ffffff]!"
              >
                <span className="text-[#ffffff]">Start Free Trial</span>
                <span className="site-cta-btn__icon">
                  <HiArrowRight
                    className="size-4 text-[#ffffff] transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
              <Link href="/pricing" className="site-cta-btn site-cta-btn--secondary">
                <span className="text-white">See Plans</span>
              </Link>
            </motion.div>
          </div>
      </motion.div>
    </section>
  );
}
