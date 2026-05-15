"use client";

import { useReducedMotion } from "framer-motion";
import Marquee from "react-fast-marquee";

const MARQUEE_BG = "#181818";

const GENRES = [
  "Fiction",
  "Self-Development",
  "Science & Nature",
  "History",
  "Business & Finance",
  "Romance",
  "Mystery & Thriller",
  "Children's",
  "Poetry",
  "Biographies",
] as const;

function GenrePill({ label }: { label: string }) {
  return (
    <span className="genre-marquee__label no-underline! shrink-0 whitespace-nowrap font-display text-[clamp(1.05rem,2.8vw+0.45rem,1.625rem)] leading-snug sm:text-[clamp(1.12rem,2.4vw+0.55rem,1.72rem)]">
      {label}
    </span>
  );
}

export function GenreMarqueeSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="cv-section genre-marquee-section w-full max-w-full min-w-0 overflow-hidden border-y border-white/10 text-white/90"
      style={{ backgroundColor: MARQUEE_BG }}
      aria-labelledby="genre-marquee-heading"
    >
      <h2 id="genre-marquee-heading" className="sr-only">
        Browse genres: {GENRES.join(", ")}
      </h2>

      {reduceMotion ? (
        <div className="container-site flex min-w-0 flex-wrap items-center justify-center gap-x-6 gap-y-5 py-7 sm:gap-x-8 sm:py-8 md:py-9">
          {GENRES.map((label) => (
            <GenrePill key={label} label={label} />
          ))}
        </div>
      ) : (
        <div
          className="relative isolate w-full min-w-0 max-w-full overflow-hidden"
          aria-hidden
        >
          <Marquee
            className="w-full max-w-full min-w-0 overflow-hidden overscroll-none py-6 sm:py-5 md:py-5"
            style={{ maxWidth: "100%", overflow: "hidden" }}
            speed={42}
            pauseOnHover
            autoFill
            gradient
            gradientColor={MARQUEE_BG}
            gradientWidth="clamp(36px, 10vw, 96px)"
            direction="left"
            delay={0}
            loop={0}
          >
            {GENRES.map((label) => (
              <div
                key={label}
                className="mx-4 flex shrink-0 items-center sm:mx-6 md:mx-8 lg:mx-10"
              >
                <GenrePill label={label} />
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
