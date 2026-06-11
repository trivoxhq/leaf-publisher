"use client";

import { HiOutlineSearch } from "react-icons/hi";

import {
  FILTER_CATEGORIES,
  FILTER_FORMATS,
  FILTER_SORT_OPTIONS,
  type FilterCategory,
  type FilterFormat,
  type FilterSort,
} from "@/components/browse/browse-data";

export type BrowseFilterState = {
  query: string;
  category: FilterCategory;
  format: FilterFormat;
  sort: FilterSort;
};

type BrowseFiltersProps = {
  filters: BrowseFilterState;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: FilterCategory) => void;
  onFormatChange: (format: FilterFormat) => void;
  onSortChange: (sort: FilterSort) => void;
  onSearch: () => void;
};

const SELECT_CLASS =
  "h-12 w-full appearance-none rounded-xl border border-line/80 bg-bg px-4 pr-10 text-sm font-medium text-text outline-none transition-[border-color,box-shadow] focus:border-green/45 focus:ring-2 focus:ring-green/20";

export function BrowseFilters({
  filters,
  onQueryChange,
  onCategoryChange,
  onFormatChange,
  onSortChange,
  onSearch,
}: BrowseFiltersProps) {
  return (
    <form
      className="rounded-3xl border border-line/80 bg-bg p-5 shadow-[0_20px_60px_-36px_rgba(26,34,24,0.1)] sm:p-6 lg:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <label className="sr-only" htmlFor="browse-search">
        Search ebooks
      </label>
      <div className="relative">
        <HiOutlineSearch
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id="browse-search"
          type="search"
          value={filters.query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by title, author, keyword, or category..."
          className="h-14 w-full rounded-2xl border border-line/80 bg-paper/60 pl-12 pr-4 text-sm text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted/80 focus:border-green/45 focus:ring-2 focus:ring-green/20 sm:text-base"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onCategoryChange(e.target.value as FilterCategory)}
            className={SELECT_CLASS}
            aria-label="Filter by category"
          >
            {FILTER_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Format
          </label>
          <select
            value={filters.format}
            onChange={(e) => onFormatChange(e.target.value as FilterFormat)}
            className={SELECT_CLASS}
            aria-label="Filter by format"
          >
            {FILTER_FORMATS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Sort
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onSortChange(e.target.value as FilterSort)}
            className={SELECT_CLASS}
            aria-label="Sort results"
          >
            {FILTER_SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green px-6 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-colors hover:bg-green2"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
