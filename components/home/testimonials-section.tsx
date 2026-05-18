"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { IoStarSharp } from "react-icons/io5";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6500;
const CARD_GAP_PX = 16;

const TESTIMONIALS = [
  {
    id: "amara",
    quote:
      "Leaf Publisher completely changed how I read. The curation is impeccable — I've discovered more books in three months than in the past three years.",
    name: "Amara O.",
    role: "Subscriber since 2023",
  },
  {
    id: "daniel",
    quote:
      "As an indie author I was nervous about self-publishing. Leaf made it genuinely simple — within a week my book was live and earning royalties.",
    name: "Daniel K.",
    role: "Author, 3 published titles",
  },
  {
    id: "priya",
    quote:
      "The reading app is beautiful. Night mode, custom fonts, offline sync — it's the first ebook reader I've used every single day. Worth every penny.",
    name: "Priya M.",
    role: "Reader Plan subscriber",
  },
  {
    id: "Raahim",
    quote:
      "The reading app is beautiful. Night mode, custom fonts, offline sync — it's the first ebook reader I've used every single day. Worth every penny.",
    name: "Raahim M.",
    role: "Reader Advisor",
  },
  {
    id: "Anas",
    quote:
      "Night mode, custom fonts, offline sync — it's the first ebook reader I've used every single day. Worth every penny.",
    name: "Anas M.",
    role: "Only  Advisor",
  },
  {
    id: "Ammad Shapatar",
    quote:
      "Night mode, custom fonts, offline sync — it's the first ebook reader I've used every single day. Worth every penny.",
    name: "Ammad Siddiqui",
    role: "Shapatar Gang Leader",
  },
] as const;

const COUNT = TESTIMONIALS.length;

function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");

    const update = () => {
      if (lg.matches) setSlidesPerView(3);
      else if (md.matches) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    const updateMd = () => {
      if (!lg.matches) update();
    };

    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", updateMd);
    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", updateMd);
    };
  }, []);

  return slidesPerView;
}

function StarRow() {
  return (
    <motion.div
      className="flex items-center gap-0.5"
      aria-label="5 out of 5 stars"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <IoStarSharp key={i} className="size-4 text-green2 sm:size-4.5" aria-hidden />
      ))}
    </motion.div>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  featured,
}: {
  quote: string;
  name: string;
  role: string;
  featured?: boolean;
}) {
  return (
    <blockquote
      className={`group relative isolate flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 sm:min-h-72 sm:p-6 lg:p-7 ${
        featured
          ? "border-green/40 shadow-[0_20px_56px_-28px_rgba(106,191,46,0.22)]"
          : "border-white/10 hover:border-white/18"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#181818]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/6 backdrop-blur-sm"
      />
      <div className="relative z-1 flex h-full flex-col">
        <StarRow />
        <p className="mt-4 flex-1 font-display text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg lg:text-[1.0625rem]">
          <span aria-hidden className="text-green2/70">
            &ldquo;
          </span>
          {quote}
          <span aria-hidden className="text-green2/70">
            &rdquo;
          </span>
        </p>
        <footer className="mt-5 border-t border-white/10 pt-4 sm:mt-6">
          <strong className="font-semibold text-white">{name}</strong>
          <p className="mt-1 text-sm text-white/55">{role}</p>
        </footer>
      </div>
    </blockquote>
  );
}

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const slidesPerView = useSlidesPerView();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stridePx, setStridePx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxActive = Math.max(0, COUNT - slidesPerView);
  const allVisible = maxActive === 0;

  const measureStride = useCallback(() => {
    const track = trackRef.current;
    const first = track?.querySelector<HTMLElement>("[data-testimonial-slide]");
    if (!first) return;
    setStridePx(first.offsetWidth + CARD_GAP_PX);
  }, []);

  useLayoutEffect(() => {
    measureStride();
    const ro = new ResizeObserver(measureStride);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [measureStride, slidesPerView]);

  useEffect(() => {
    setActive((i) => Math.min(i, maxActive));
  }, [maxActive]);

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.min(Math.max(0, index), maxActive || COUNT - 1));
    },
    [maxActive]
  );

  const goNext = useCallback(() => {
    setActive((i) => {
      if (allVisible) return (i + 1) % COUNT;
      return i >= maxActive ? 0 : i + 1;
    });
  }, [allVisible, maxActive]);

  const goPrev = useCallback(() => {
    setActive((i) => {
      if (allVisible) return (i - 1 + COUNT) % COUNT;
      return i <= 0 ? maxActive : i - 1;
    });
  }, [allVisible, maxActive]);

  useEffect(() => {
    if (reduceMotion || paused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion, paused, goNext]);

  const translateX = allVisible ? 0 : -active * stridePx;

  const headerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.5, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  return (
    <section
      className="cv-section relative overflow-x-clip border-t border-line/80 bg-bg text-text"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: EASE }}
      />

      <motion.div
        className="container-site section-y"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-48px" }}
        transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
      >
        <motion.header
          className="mx-auto max-w-2xl text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <p className="mb-4 flex justify-center sm:mb-5">
            <span className="inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs">
              What Readers Say
            </span>
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-[clamp(2rem,4.5vw+0.5rem,3.25rem)] font-bold leading-[1.08] tracking-tight text-text"
          >
            Loved by{" "}
            <span className="hero-heading__accent">real readers</span>
          </h2>
        </motion.header>

        <motion.div
          className="relative mt-10 sm:mt-12 lg:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <motion.div
            ref={viewportRef}
            className="overflow-hidden"
            aria-live="polite"
          >
            <motion.ul
              ref={trackRef}
              className="flex list-none gap-4 p-0"
              animate={{
                x: reduceMotion ? 0 : translateX,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.55, ease: EASE }
              }
            >
              {TESTIMONIALS.map((t, i) => (
                <motion.li
                  key={t.id}
                  data-testimonial-slide
                  className="w-full shrink-0 md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                >
                  <TestimonialCard
                    quote={t.quote}
                    name={t.name}
                    role={t.role}
                    featured={i === active}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center gap-4 sm:mt-8"
            role="group"
            aria-label="Testimonial slider controls"
          >
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-bg text-text shadow-sm transition-colors hover:border-green/35 hover:bg-paper hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-label="Previous testimonial"
            >
              <HiOutlineChevronLeft className="size-5" strokeWidth={2} aria-hidden />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Choose testimonial"
            >
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => goTo(allVisible ? i : Math.min(i, maxActive))}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-green"
                      : "w-2 bg-line hover:bg-green/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-bg text-text shadow-sm transition-colors hover:border-green/35 hover:bg-paper hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              aria-label="Next testimonial"
            >
              <HiOutlineChevronRight className="size-5" strokeWidth={2} aria-hidden />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
