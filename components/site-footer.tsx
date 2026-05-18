"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Same as header top bar; footer uses a solid fill (no glass layers). */
const FOOTER_DARK_BG = "#181818";

const SOCIAL = [
  { label: "X", href: "https://x.com/", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FaLinkedin },
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/", icon: FaYoutube },
] as const;

const READERS = [
  { label: "Browse Library", href: "/browse" },
  { label: "New Releases", href: "/new-releases" },
  { label: "Bestsellers", href: "/bestsellers" },
  { label: "Free Titles", href: "/free" },
  { label: "Gift Cards", href: "/gift-cards" },
] as const;

const AUTHORS = [
  { label: "Start Publishing", href: "/get-started" },
  { label: "Pricing", href: "/pricing" },
  { label: "Royalties", href: "/royalties" },
  { label: "Author Dashboard", href: "/dashboard" },
  { label: "Success Stories", href: "/success-stories" },
] as const;

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Help Centre", href: "/help" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

const sectionReveal: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.06 },
  },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: EASE },
  },
};

const brandReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  const reduce = useReducedMotion();
  const id = `footer-col-${slugify(title)}`;
  return (
    <nav aria-labelledby={id} className="min-w-0">
      <h2
        id={id}
        className="font-display pl-5 text-base font-bold tracking-wide text-white sm:text-lg"
      >
        {title}
      </h2>
      <motion.ul
        className="mt-5 flex list-none flex-col p-0"
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-32px" }}
      >
        {links.map((item) => (
          <motion.li key={item.href} variants={itemReveal} className="min-w-0">
            <Link
              href={item.href}
              className="group flex min-h-10 w-full items-center gap-2 py-2.5 text-sm font-medium text-white/60 transition-colors duration-200 ease-out hover:text-white"
            >
              <span
                aria-hidden
                className="inline-flex w-3 shrink-0 items-center justify-center text-green transition-colors duration-200 ease-out group-hover:text-white"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-current" />
              </span>
              <motion.span
                className="min-w-0 flex-1 truncate border-b border-transparent pb-px transition-[border-color,transform]"
                whileHover={reduce ? undefined : { x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
}

export function SiteFooter() {
  const reduce = useReducedMotion();

  return (
    <footer
      className="mt-auto border-t border-white/10 text-white/90"
      style={{ backgroundColor: FOOTER_DARK_BG }}
    >
      <div className="container-site py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <motion.div
            className="w-full shrink-0 lg:max-w-sm"
            variants={brandReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            <Link
              href="/"
              className="group flex w-full flex-col items-start outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-green2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] rounded-xl"
              aria-label="Leaf Publisher home"
            >
              <Image
                src="/logo-light.svg"
                alt="Leaf Publisher"
                width={165}
                height={61}
                className="h-6 sm:h-7"
                unoptimized
              />
              <p className="mt-4 w-full text-sm leading-relaxed text-white/70 sm:text-[15px]">
                A premium ebook platform for readers who take reading seriously, and
                authors who take publishing personally.
              </p>
            </Link>

            <div className="mt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
                Social links
              </p>
              <ul
                className="mt-3 flex list-none flex-wrap gap-2 sm:gap-5"
                style={{ padding: 0 }}
                aria-label="Social media"
              >
                {SOCIAL.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.li
                      key={s.label}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: reduce ? 0 : 0.06 + i * 0.05,
                        duration: 0.35,
                        ease: EASE,
                      }}
                    >
                      <motion.a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/70 shadow-none transition-colors hover:bg-white/10 hover:text-white"
                        whileHover={reduce ? undefined : { y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                      >
                        <Icon className="size-[18px]" />
                      </motion.a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            <FooterColumn title="Readers" links={READERS} />
            <FooterColumn title="Authors" links={AUTHORS} />
            <FooterColumn title="Company" links={COMPANY} />
          </div>
        </div>

        <motion.div
          className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-center text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:text-left"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <p>© 2026 Leaf Publisher Ltd. All rights reserved.</p>
          <p className="font-medium tracking-wide text-white/85">
            Available on <span className="text-green2">iOS</span>
            <span className="mx-1.5 text-white/25">·</span>
            <span className="text-green2">Android</span>
            <span className="mx-1.5 text-white/25">·</span>
            <span className="text-green2">Web</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
