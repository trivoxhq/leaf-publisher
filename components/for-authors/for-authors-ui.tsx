import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type StickyTone = "yellow" | "mint" | "blush" | "cream" | "white";

export const STICKY_ROTATIONS = [-2.4, 1.6, -1.3, 2.1, -0.9, 1.8, -1.7, 0.8] as const;

type StickyNoteProps = {
  tone?: StickyTone;
  rotate?: number;
  tape?: boolean;
  pinned?: boolean;
  className?: string;
  children: ReactNode;
};

export function StickyNote({
  tone = "yellow",
  rotate = 0,
  tape = true,
  pinned = false,
  className = "",
  children,
}: StickyNoteProps) {
  return (
    <div
      className={`fa-sticky-note fa-sticky-note--${tone}${pinned ? " fa-sticky-note--pinned" : ""} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape ? <span className="fa-sticky-tape" aria-hidden /> : null}
      {children}
    </div>
  );
}

type BookPageProps = {
  variant?: "plain" | "lined" | "success";
  className?: string;
  children: ReactNode;
};

export function BookPage({
  variant = "lined",
  className = "",
  children,
}: BookPageProps) {
  return (
    <div className={`fa-book-page fa-book-page--${variant} ${className}`}>
      {children}
    </div>
  );
}

export function BookmarkTab({ children }: { children: ReactNode }) {
  return <span className="fa-bookmark-tab">{children}</span>;
}

type IndexCardProps = {
  tab: string;
  tabTone?: StickyTone;
  className?: string;
  children: ReactNode;
};

export function IndexCard({
  tab,
  tabTone = "mint",
  className = "",
  children,
}: IndexCardProps) {
  return (
    <article className={`fa-index-card ${className}`}>
      <span className={`fa-index-card__tab fa-sticky-note--${tabTone}`}>{tab}</span>
      <div className="fa-index-card__body">{children}</div>
    </article>
  );
}

type StickyTagProps = {
  tone?: StickyTone;
  rotate?: number;
  children: ReactNode;
};

export function StickyTag({ tone = "yellow", rotate = 0, children }: StickyTagProps) {
  return (
    <span
      className={`fa-sticky-tag fa-sticky-note--${tone}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

export function NotebookSection({
  className = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={`fa-notebook-section ${className}`} {...props}>
      {children}
    </section>
  );
}

export function CorkBoardSection({
  className = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={`fa-cork-section ${className}`} {...props}>
      {children}
    </section>
  );
}
