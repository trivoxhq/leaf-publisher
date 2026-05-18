"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const TOP_BAR_BG = "#181818";
/** Scroll past this → show fixed compact bar. */
const SCROLL_SHOW_COMPACT_PX = 100;
/** Scroll above this → hide compact bar (before reaching top). */
const SCROLL_HIDE_COMPACT_PX = 56;

const NAV_TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

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


function LogoBlock() {
  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-xl"
      aria-label="Leaf Publisher home"
    >
      <Image
        src="/logo-dark.svg"
        alt="Leaf Publisher"
        width={249}
        height={61}
        className="h-4 w-auto sm:h-5"
        priority
        unoptimized
      />
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
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-[#ffffff]! visited:text-[#ffffff]! hover:text-[#ffffff]! shadow-[0_8px_32px_-12px_rgba(133,199,39,0.75)] outline-none ring-1 ring-white/10 transition-shadow focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${className}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-[#6ba820] via-green to-green2 opacity-95 transition-opacity group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.28),transparent_55%)] opacity-35"
        />
        <span className="relative z-10 tracking-tight text-[#ffffff]">Get Started</span>
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
  theme,
  activeLineId,
  className = "",
}: {
  pathname: string;
  theme: "light" | "dark";
  activeLineId: string;
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
                    ? "text-white! transition-colors duration-200 ease-out"
                    : "text-white/90! transition-colors duration-200 ease-out hover:text-white!"
                  : active
                    ? "text-text transition-colors duration-200 ease-out"
                    : "text-text/70 transition-colors duration-200 ease-out hover:text-text"
              }`}
            >
              {item.label}
            </Link>
            {active && (
              <motion.span
                layoutId={activeLineId}
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
                    : { duration: 0.22, ease: NAV_TRANSITION_EASE }
                }
              />
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}

function MenuToggleButton({
  open,
  onToggle,
  variant,
  reduce,
  menuControlsId,
}: {
  open: boolean;
  onToggle: () => void;
  variant: "light" | "dark";
  reduce: boolean;
  menuControlsId: string;
}) {
  const isDark = variant === "dark";

  return (
    <motion.button
      type="button"
      className={`relative flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm outline-none transition-[border-color,background-color,color] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 lg:hidden ${
        isDark
          ? "border-white/15 bg-white/10 text-white hover:border-green/40 hover:bg-white/15 focus-visible:ring-green2 focus-visible:ring-offset-[#181818]"
          : "border-line bg-paper/60 text-text hover:border-green/35 hover:bg-paper focus-visible:ring-green focus-visible:ring-offset-bg"
      }`}
      aria-expanded={open}
      aria-controls={menuControlsId}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
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
  );
}

/** Full header row — static, in document flow at top of page. */
function ExpandedNavBar({
  pathname,
  open,
  onMenuToggle,
  reduce,
  menuControlsId,
}: {
  pathname: string;
  open: boolean;
  onMenuToggle: () => void;
  reduce: boolean;
  menuControlsId: string;
}) {
  return (
    <div className="relative border-b border-line/80 bg-bg text-text shadow-[0_4px_24px_-16px_rgba(26,34,24,0.06)]">
      <div className="container-site relative flex min-h-[var(--nav-h)] min-w-0 items-center gap-2 sm:gap-3">
        <div className="shrink-0 pr-2 sm:pr-3">
          <LogoBlock />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3 lg:gap-5">
          <DesktopNav
            pathname={pathname}
            theme="light"
            activeLineId="nav-active-expanded"
            className="hidden max-w-full justify-center overflow-x-auto scrollbar-none lg:flex"
          />

          <motion.div className="hidden shrink-0 lg:flex">
            <GetStartedButton className="max-[380px]:px-4 max-[380px]:py-2 max-[380px]:text-[13px]" />
          </motion.div>

          <motion.div className="flex shrink-0 lg:hidden">
            <GetStartedButton className="max-[380px]:px-4 max-[380px]:py-2 max-[380px]:text-[13px]" />
          </motion.div>

          <MenuToggleButton
            open={open}
            onToggle={onMenuToggle}
            variant="light"
            reduce={reduce}
            menuControlsId={menuControlsId}
          />
        </div>
      </div>
    </div>
  );
}

/** Compact bar — fixed overlay, slides in/out; never resizes the page header. */
function CompactNavBar({
  pathname,
  open,
  onMenuToggle,
  reduce,
  menuControlsId,
}: {
  pathname: string;
  open: boolean;
  onMenuToggle: () => void;
  reduce: boolean;
  menuControlsId: string;
}) {
  return (
    <div
      className="relative border-b border-white/10 text-white shadow-[0_12px_40px_-18px_rgba(0,0,0,0.45)]"
      style={{ backgroundColor: TOP_BAR_BG }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 to-transparent"
      />
      <div className="container-site relative flex min-h-13 min-w-0 items-center justify-end gap-2 sm:gap-3 lg:justify-center lg:gap-5">
        <DesktopNav
          pathname={pathname}
          theme="dark"
          activeLineId="nav-active-compact"
          className="hidden max-w-full flex-1 justify-center overflow-x-auto scrollbar-none lg:flex"
        />

        <MenuToggleButton
          open={open}
          onToggle={onMenuToggle}
          variant="dark"
          reduce={reduce}
          menuControlsId={menuControlsId}
        />
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [compactVisible, setCompactVisible] = useState(false);
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollRafRef = useRef<number | null>(null);
  const pendingScrollY = useRef(0);

  useLayoutEffect(() => {
    setCompactVisible(window.scrollY > SCROLL_SHOW_COMPACT_PX);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      pendingScrollY.current = window.scrollY;
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const y = pendingScrollY.current;
        setCompactVisible((was) => {
          if (!was && y > SCROLL_SHOW_COMPACT_PX) return true;
          if (was && y < SCROLL_HIDE_COMPACT_PX) return false;
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
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

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

  const compactSlideTransition = reduce
    ? { duration: 0.12 }
    : { duration: 0.32, ease: NAV_TRANSITION_EASE };

  return (
    <>
      {/* Static header — stays in document flow; no sticky morphing */}
      <header className="relative z-40">
        <ExpandedNavBar
          pathname={pathname}
          open={open}
          onMenuToggle={toggleMenu}
          reduce={!!reduce}
          menuControlsId={panelId}
        />
      </header>

      {/* Fixed compact bar — separate layer; transform-only show/hide */}
      <AnimatePresence>
        {compactVisible && (
          <motion.div
            key="compact-header"
            role="banner"
            aria-label="Compact navigation"
            className="fixed inset-x-0 top-0 z-50 transform-gpu"
            initial={reduce ? false : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: "-100%" }}
            transition={compactSlideTransition}
          >
            <CompactNavBar
              pathname={pathname}
              open={open}
              onMenuToggle={toggleMenu}
              reduce={!!reduce}
              menuControlsId={panelId}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
              className="fixed inset-y-0 right-0 z-70 flex w-[min(100%,22rem)] flex-col border-l border-line bg-bg py-6 shadow-[-24px_0_60px_-32px_rgba(0,0,0,0.35)] lg:hidden"
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
    </>
  );
}
