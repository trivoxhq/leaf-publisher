"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  HiArrowRight,
  HiOutlineBeaker,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineSearchCircle,
} from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORIES = [
  {
    name: "Fiction",
    titles: "84,300",
    href: "/browse/fiction",
    icon: HiOutlineBookOpen,
  },
  {
    name: "Self-Development",
    titles: "31,800",
    href: "/browse/self-development",
    icon: HiOutlineLightBulb,
  },
  {
    name: "Science & Nature",
    titles: "22,500",
    href: "/browse/science-nature",
    icon: HiOutlineBeaker,
  },
  {
    name: "Mystery & Thriller",
    titles: "47,200",
    href: "/browse/mystery-thriller",
    icon: HiOutlineSearchCircle,
  },
] as const;

function formatTitleCount(count: string) {
  return `${count} Titles`;
}

const FORM_LABEL_CLASS = "mb-1 block text-xs font-medium text-white/80";

const FORM_FIELD_CLASS =
  "w-full rounded-lg border border-white/15 bg-white/8 px-3 py-2 text-xs leading-snug placeholder:text-white/45 outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#85C727]/45 focus:ring-2 focus:ring-[#85C727]/20 sm:text-[0.8125rem]";

/** Inline only — overrides global `color: inherit` on inputs and autofill. */
const FORM_FIELD_STYLE: CSSProperties = {
  color: "#ffffff",
  caretColor: "#ffffff",
  WebkitTextFillColor: "#ffffff",
};

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_FORM: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function CategoriesContactForm({ motionEnabled }: { motionEnabled: boolean }) {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback(
    (field: keyof ContactFormState) =>
      (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (submitted) setSubmitted(false);
      },
    [submitted]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <div className="relative isolate flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] sm:rounded-2xl">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#181818]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/6 backdrop-blur-sm"
      />

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-1 flex flex-1 flex-col p-5 sm:p-6 lg:p-7"
        initial={motionEnabled ? { opacity: 0, y: 16 } : false}
        whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE }}
        noValidate
      >
        <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Get in touch
        </h3>
       

        <motion.div
          className="mt-5 flex flex-1 flex-col gap-3"
          aria-live="polite"
        >
          {submitted && (
            <p
              className="rounded-xl border border-[#85C727]/35 bg-[#85C727]/10 px-4 py-3 text-sm font-medium text-[#85C727]"
              role="status"
            >
              Thanks — your message has been sent.
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="categories-contact-name" className={FORM_LABEL_CLASS}>
                Name
              </label>
              <input
                id="categories-contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={update("name")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="categories-contact-email" className={FORM_LABEL_CLASS}>
                Email
              </label>
              <input
                id="categories-contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update("email")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="categories-contact-phone" className={FORM_LABEL_CLASS}>
                Phone number
              </label>
              <input
                id="categories-contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={update("phone")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="categories-contact-message" className={FORM_LABEL_CLASS}>
                Message
              </label>
              <textarea
                id="categories-contact-message"
                name="message"
                required
                rows={3}
                value={form.message}
                onChange={update("message")}
                className={`${FORM_FIELD_CLASS} min-h-20 resize-none`}
                style={FORM_FIELD_STYLE}
                placeholder="How can we help?"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green px-6 py-3 text-sm font-semibold text-[#ffffff]! visited:text-[#ffffff]! transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] active:scale-[0.98] sm:mt-auto"
          >
            Send message
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}

function CategoryCard({
  category,
}: {
  category: (typeof CATEGORIES)[number];
}) {
  const Icon = category.icon;

  return (
    <Link
      href={category.href}
      className="group relative isolate flex min-h-54 flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] p-5 transition-[border-color,box-shadow] duration-300 hover:border-green/40 hover:shadow-[0_16px_44px_-28px_rgba(133,199,39,0.35)] sm:min-h-58 sm:p-6"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#181818]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/6 backdrop-blur-sm"
      />

      <div className="relative z-2 flex h-full flex-col">
        <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-[#85C727] shadow-sm transition-colors duration-300 group-hover:border-[#85C727]/40 group-hover:bg-white/12">
          <Icon className="size-5" aria-hidden />
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-[1.35rem]">
          {category.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium tabular-nums text-white/65 sm:text-[0.9375rem]">
          {formatTitleCount(category.titles)}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[#85C727] transition-colors group-hover:text-[#85C727]">
          Browse
          <HiArrowRight
            className="size-4 text-[#85C727] transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

export function CategoriesSection() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const motionEnabled = mounted && !reduceMotion;

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE },
      },
    }),
    []
  );

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.07,
          delayChildren: 0.08,
        },
      },
    }),
    []
  );

  return (
    <section
      className="cv-section relative border-t border-line/80 bg-bg"
      aria-labelledby="categories-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/25 to-transparent"
      />

      <div className="container-site section-y">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial={motionEnabled ? "hidden" : false}
          whileInView={motionEnabled ? "show" : undefined}
          viewport={{ once: true, margin: "-48px" }}
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 inline-flex items-center rounded-full border border-line bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs"
          >
            Browse by Genre
          </motion.p>
          <h2
            id="categories-heading"
            className="site-cta-banner__headline text-text"
          >
            <motion.span variants={itemVariants} className="site-cta-banner__line block">
              Find Your Next{" "}
              <span className="hero-heading__accent">Obsession</span>
            </motion.span>
          </h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
          >
            Every taste, every mood — our curators pick the finest across every
            genre.
          </motion.p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 sm:mt-12 lg:mt-14 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <motion.div
            className="min-w-0"
            variants={containerVariants}
            initial={motionEnabled ? "hidden" : false}
            whileInView={motionEnabled ? "show" : undefined}
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.ul
              className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:gap-6"
              variants={containerVariants}
            >
              {CATEGORIES.map((category) => (
                <motion.li key={category.name} variants={itemVariants}>
                  <motion.div
                    whileHover={motionEnabled ? { y: -6 } : undefined}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 26,
                    }}
                  >
                    <CategoryCard category={category} />
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.aside
            className="flex min-w-0 flex-col"
            variants={itemVariants}
            initial={motionEnabled ? "hidden" : false}
            whileInView={motionEnabled ? "show" : undefined}
            viewport={{ once: true, margin: "-40px" }}
          >
            <CategoriesContactForm motionEnabled={motionEnabled} />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
