"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLeaf,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineBookOpen, HiOutlineMenuAlt3, HiOutlineNewspaper, HiOutlineSparkles, HiX } from "react-icons/hi";
import { MdHeadsetMic } from "react-icons/md";

const TOP_BAR_BG = "#181818";
/** Past this Y → compact (top bar hides). */
const SCROLL_COMPACT_PX = 64;
/** Past this Y → leave compact (top bar shows). Keep gap large enough to avoid oscillation. */
const SCROLL_EXPAND_PX = 28;

const NAV_TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;
const NAV_TRANSITION_NORMAL = {
  duration: 0.48,
  ease: NAV_TRANSITION_EASE,
} as const;
const NAV_TRANSITION_REDUCE = { duration: 0.15 } as const;

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/categories", label: "Categories" },
  { href: "/for-authors", label: "For Authors" },
  { href: "/pricing", label: "Pricing" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function TopBarTaglineIcon() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="relative mr-2.5 flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.07] text-green2 shadow-[0_0_20px_-8px_rgba(131,217,63,0.55)] sm:size-8"
      animate={
        reduce
          ? undefined
          : {
              y: [0, -2.5, 0],
            }
      }
      transition={{
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.06, 1],
                opacity: [0.88, 1, 0.88],
              }
        }
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <HiOutlineNewspaper className="size-[15px] sm:size-4" />
      </motion.div>
      <motion.span
        className="absolute -right-0.5 -top-0.5 text-white/90"
        animate={
          reduce
            ? undefined
            : {
                rotate: [0, 12, -6, 0],
                scale: [1, 1.12, 1],
                opacity: [0.65, 1, 0.65],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <HiOutlineSparkles className="size-2.5 sm:size-3" />
      </motion.span>
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-r from-transparent via-white/12 to-transparent"
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: ["-120%", "140%"], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}

function TopBar() {
  return (
    <div
      className="relative border-b border-white/6 text-white/90 backdrop-blur-xl backdrop-saturate-150"
      style={{ backgroundColor: `color-mix(in srgb, ${TOP_BAR_BG} 88%, transparent)` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent"
      />
      <div className="container-site relative flex min-h-10 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2 text-[11px] font-medium tracking-wide sm:text-xs">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2">
          <TopBarTaglineIcon />
          <p className="min-w-0 text-white/75">
            <span className="text-white/90">Publish</span>
            <span className="mx-2 text-white/25" aria-hidden>
              ·
            </span>
            <span className="text-white/90">Discover</span>
            <span className="mx-2 text-white/25" aria-hidden>
              ·
            </span>
            <span className="text-white/90">Read</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6">
          <span className="inline-flex items-center gap-2 text-white/80">
            <MdHeadsetMic className="size-4 shrink-0 text-green2 opacity-90" aria-hidden />
            24/7 Support
          </span>
          <ul
            className="hidden items-center gap-1.5 sm:flex sm:gap-2"
            aria-label="Social links"
          >
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram className="size-[15px]" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF className="size-3" />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="X"
              >
                <FaXTwitter className="size-[15px]" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <motion.div
      className="relative flex size-11 items-center justify-center rounded-2xl border border-line bg-paper/80 shadow-[0_12px_40px_-16px_rgba(106,191,46,0.45)] backdrop-blur-sm"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.span
        variants={{
          rest: { rotate: -6, y: 0 },
          hover: { rotate: -14, y: -1 },
        }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className="absolute text-green"
        aria-hidden
      >
        <FaLeaf className="size-5" />
      </motion.span>
      <motion.span
        variants={{
          rest: { rotate: 8, y: 2, opacity: 0.92 },
          hover: { rotate: 14, y: 3, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className="text-text/90"
        aria-hidden
      >
        <HiOutlineBookOpen className="size-[22px]" />
      </motion.span>
    </motion.div>
  );
}

function LogoBlock() {
  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-2 sm:gap-3 outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-xl"
      aria-label="Leaf Publisher home"
    >
      <BrandMark />
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-text sm:text-2xl">
          Leaf Publisher
        </span>
        <span className="mt-1 hidden text-[11px] font-medium uppercase tracking-[0.22em] text-muted sm:block">
          Editorial studio
        </span>
      </div>
    </Link>
  );
}

function GetStartedButton({ className = "" }: { className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className.includes("w-full") ? "w-full" : undefined}
    >
      <Link
        href="/get-started"
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_32px_-12px_rgba(106,191,46,0.75)] outline-none ring-1 ring-white/10 transition-shadow focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${className}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-[#4a9a22] via-green to-green2 opacity-95 transition-opacity group-hover:opacity-100"
        />
        <motion.span
          aria-hidden
          className="absolute -inset-8 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.35),transparent_55%)] opacity-40 blur-2xl"
          animate={{ x: ["-20%", "10%", "-20%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative z-10 tracking-tight">Get Started</span>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="absolute -left-1/2 top-0 h-full w-1/2 skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent" />
        </motion.span>
      </Link>
    </motion.div>
  );
}

const drawerListVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const drawerItemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
};

function DesktopNav({
  pathname,
  theme = "light",
  className = "",
}: {
  pathname: string;
  theme?: "light" | "dark";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <nav
      className={`flex flex-nowrap items-center gap-0.5 sm:gap-1 ${className}`}
      aria-label="Primary"
    >
      {NAV_ITEMS.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <motion.div
            key={item.href}
            className="relative rounded-lg px-0.5 sm:px-1"
            initial={false}
            animate="rest"
            whileHover={!active && !reduce ? "hover" : undefined}
            variants={{ rest: {}, hover: {} }}
          >
            <Link
              href={item.href}
              className={`relative z-10 block px-2 py-2 text-sm font-medium tracking-wide sm:px-3 ${
                isDark
                  ? active
                    ? "text-white! transition-colors duration-300 ease-out"
                    : "text-white/90! transition-colors duration-300 ease-out hover:text-white!"
                  : active
                    ? "text-text transition-colors duration-300 ease-out"
                    : "text-text/70 transition-colors duration-300 ease-out hover:text-text"
              }`}
            >
              {item.label}
            </Link>
            {active && (
              <motion.span
                layoutId="nav-active-line"
                className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-linear-to-r from-green via-green2 to-green sm:left-4 sm:right-4"
                transition={
                  reduce
                    ? { duration: 0.15 }
                    : { type: "spring", stiffness: 400, damping: 34 }
                }
              />
            )}
            {!active && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-3 right-3 block h-0.5 origin-left rounded-full bg-linear-to-r from-green/70 to-green2/70 sm:left-4 sm:right-4"
                variants={{
                  rest: { scaleX: 0, opacity: 0 },
                  hover: { scaleX: 1, opacity: 1 },
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
                }
              />
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollRafRef = useRef<number | null>(null);
  const pendingScrollY = useRef(0);

  useLayoutEffect(() => {
    const y = window.scrollY;
    setCompact(y > SCROLL_COMPACT_PX);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      pendingScrollY.current = window.scrollY;
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const ly = pendingScrollY.current;
        setCompact((was) => {
          if (!was && ly > SCROLL_COMPACT_PX) return true;
          if (was && ly < SCROLL_EXPAND_PX) return false;
          return was;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), reduce ? 0 : 60);
    return () => {
      document.documentElement.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, reduce]);

  const drawerTransition = reduce
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 320, damping: 36, mass: 0.85 };

  const navTransition = reduce ? NAV_TRANSITION_REDUCE : NAV_TRANSITION_NORMAL;

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`grid min-h-0 overflow-hidden transform-gpu transition-[grid-template-rows] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[grid-template-rows] ${reduce ? "duration-150" : "duration-480"}`}
        style={{
          gridTemplateRows: compact ? "0fr" : "1fr",
          pointerEvents: compact ? "none" : "auto",
        }}
        aria-hidden={compact}
      >
        <div className="min-h-0 overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              opacity: compact ? 0 : 1,
            }}
            transition={navTransition}
            className="origin-top will-change-[opacity]"
          >
            <TopBar />
          </motion.div>
        </div>
      </div>

      <motion.div
        className={`relative transform-gpu border-b backdrop-saturate-150 transition-[background-color,box-shadow,backdrop-filter,border-color,color] ease-[cubic-bezier(0.22,1,0.36,1)] ${reduce ? "duration-150" : "duration-480"} ${
          compact
            ? "border-white/10 text-white shadow-[0_12px_40px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-line/80 bg-bg/90 text-text shadow-[0_4px_24px_-16px_rgba(26,34,24,0.06)] backdrop-blur-md"
        }`}
        style={
          compact
            ? {
                backgroundColor: `color-mix(in srgb, ${TOP_BAR_BG} 92%, transparent)`,
              }
            : undefined
        }
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 to-transparent ${reduce ? "duration-150" : "duration-480"} transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)] ${compact ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`container-site relative flex min-w-0 items-center gap-2 transition-[min-height] ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-3 ${reduce ? "duration-150" : "duration-480"}`}
          style={{
            minHeight: compact ? "3.25rem" : "var(--nav-h)",
          }}
        >
          <motion.div
            initial={false}
            animate={{
              maxWidth: compact ? 0 : 272,
              opacity: compact ? 0 : 1,
            }}
            transition={navTransition}
            className={`shrink-0 overflow-hidden ${compact ? "pointer-events-none" : ""}`}
          >
            <div className="w-[272px] max-w-[72vw] pr-2 sm:max-w-none sm:pr-3">
              <LogoBlock />
            </div>
          </motion.div>

          <div
            className={`flex min-w-0 min-h-0 flex-1 items-center gap-2 sm:gap-3 lg:gap-5 ${compact ? "justify-center" : "justify-end"}`}
          >
            <LayoutGroup id="site-header-nav">
              <DesktopNav
                pathname={pathname}
                theme={compact ? "dark" : "light"}
                className="hidden max-w-full justify-center overflow-x-auto scrollbar-none lg:flex"
              />
            </LayoutGroup>

            <motion.div
              initial={false}
              animate={{
                maxWidth: compact ? 0 : 280,
                opacity: compact ? 0 : 1,
              }}
              transition={navTransition}
              className={`hidden shrink-0 overflow-hidden lg:flex ${compact ? "pointer-events-none" : ""}`}
            >
              <div className="pl-1">
                <GetStartedButton className="max-[380px]:px-4 max-[380px]:py-2 max-[380px]:text-[13px]" />
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                maxWidth: compact ? 0 : 260,
                opacity: compact ? 0 : 1,
              }}
              transition={navTransition}
              className={`flex shrink-0 overflow-hidden lg:hidden ${compact ? "pointer-events-none" : ""}`}
            >
              <div className="min-w-[200px] pr-2">
                <GetStartedButton className="max-[380px]:px-4 max-[380px]:py-2 max-[380px]:text-[13px]" />
              </div>
            </motion.div>

            <motion.button
              type="button"
              className={`relative flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm outline-none transition-[border-color,background-color,color] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 lg:hidden ${
                compact
                  ? "border-white/15 bg-white/10 text-white hover:border-green/40 hover:bg-white/15 focus-visible:ring-green2 focus-visible:ring-offset-[#181818]"
                  : "border-line bg-paper/60 text-text hover:border-green/35 hover:bg-paper focus-visible:ring-green focus-visible:ring-offset-bg"
              }`}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              whileTap={{ scale: reduce ? 1 : 0.94 }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={
                      reduce ? { duration: 0.1 } : { duration: 0.22, ease: NAV_TRANSITION_EASE }
                    }
                    className="inline-flex"
                  >
                    <HiX className="size-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={
                      reduce ? { duration: 0.1 } : { duration: 0.22, ease: NAV_TRANSITION_EASE }
                    }
                    className="inline-flex"
                  >
                    <HiOutlineMenuAlt3 className="size-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="mobile-backdrop"
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-60 bg-black/45 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.12 : 0.22 }}
              onClick={close}
            />
            <motion.div
              key="mobile-drawer"
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-y-0 right-0 z-70 flex w-[min(100%,22rem)] flex-col border-l border-line bg-bg/95 py-6 shadow-[-24px_0_60px_-32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={drawerTransition}
            >
              <div className="flex items-center justify-between gap-3 border-b border-line px-6 pb-5">
                <span className="font-display text-lg font-semibold text-text">
                  Menu
                </span>
                <motion.button
                  ref={closeBtnRef}
                  type="button"
                  className="flex size-10 items-center justify-center rounded-xl border border-line bg-paper text-text outline-none transition-colors hover:border-green/40 focus-visible:ring-2 focus-visible:ring-green"
                  aria-label="Close menu"
                  onClick={close}
                  whileHover={reduce ? undefined : { rotate: 90, scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <HiX className="size-5" />
                </motion.button>
              </div>

              <div className="px-6 pt-5">
                <GetStartedButton className="w-full justify-center" />
              </div>

              <motion.nav
                className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pt-8 pb-10"
                aria-label="Mobile primary"
                variants={drawerListVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {NAV_ITEMS.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.div key={item.href} variants={drawerItemVariants}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium tracking-wide transition-colors ${
                          active
                            ? "bg-paper text-text ring-1 ring-line"
                            : "text-text/80 hover:bg-paper/80 hover:text-text"
                        }`}
                      >
                        {item.label}
                        {active && (
                          <span className="size-1.5 rounded-full bg-green" aria-hidden />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
