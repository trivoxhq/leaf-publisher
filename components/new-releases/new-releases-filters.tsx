"use client";

import { HiOutlineSearch } from "react-icons/hi";

import {
  NEW_RELEASE_FILTER_CATEGORIES,
  NEW_RELEASE_FILTER_FORMATS,
  NEW_RELEASE_FILTER_SORT_OPTIONS,
  type NewReleaseFilterCategory,
  type NewReleaseFilterFormat,
  type NewReleaseFilterSort,
} from "@/components/new-releases/new-releases-data";

export type NewReleasesFilterState = {
  query: string;
  category: NewReleaseFilterCategory;
  format: NewReleaseFilterFormat;
  sort: NewReleaseFilterSort;
};

type NewReleasesFiltersProps = {
  filters: NewReleasesFilterState;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: NewReleaseFilterCategory) => void;
  onFormatChange: (format: NewReleaseFilterFormat) => void;
  onSortChange: (sort: NewReleaseFilterSort) => void;
  onSearch: () => void;
};

const SELECT_CLASS =
  "h-12 w-full appearance-none rounded-xl border border-line/80 bg-bg px-4 pr-10 text-sm font-medium text-text outline-none transition-[border-color,box-shadow] focus:border-green/45 focus:ring-2 focus:ring-green/20";

export function NewReleasesFilters({
  filters,
  onQueryChange,
  onCategoryChange,
  onFormatChange,
  onSortChange,
  onSearch,
}: NewReleasesFiltersProps) {
  return (
    <form
      className="rounded-3xl border border-line/80 bg-bg p-5 shadow-[0_20px_60px_-36px_rgba(26,34,24,0.1)] sm:p-6 lg:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <label className="sr-only" htmlFor="new-releases-search">
        Search new releases
      </label>
      <div className="relative">
        <HiOutlineSearch
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          id="new-releases-search"
          type="search"
          value={filters.query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search new releases, authors, categories, or keywords..."
          className="h-14 w-full rounded-2xl border border-line/80 bg-paper/60 pl-12 pr-4 text-sm text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted/80 focus:border-green/45 focus:ring-2 focus:ring-green/20 sm:text-base"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onCategoryChange(e.target.value as NewReleaseFilterCategory)}
            className={SELECT_CLASS}
            aria-label="Filter by category"
          >
            {NEW_RELEASE_FILTER_CATEGORIES.map((option) => (
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
            onChange={(e) => onFormatChange(e.target.value as NewReleaseFilterFormat)}
            className={SELECT_CLASS}
            aria-label="Filter by format"
          >
            {NEW_RELEASE_FILTER_FORMATS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="relative sm:col-span-2 lg:col-span-1">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Sort
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onSortChange(e.target.value as NewReleaseFilterSort)}
            className={SELECT_CLASS}
            aria-label="Sort results"
          >
            {NEW_RELEASE_FILTER_SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
