import Link from "next/link";

export function BrowseEmptyState() {
  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-line/80 bg-bg px-6 py-12 text-center shadow-[0_20px_60px_-36px_rgba(26,34,24,0.12)] sm:px-10 sm:py-14">
      <h3 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
        No Books Found
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        Try adjusting your search, changing categories, or exploring another
        reading path.
      </p>
      <Link
        href="/categories"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-green px-8 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
      >
        View All Categories
      </Link>
    </div>
  );
}
