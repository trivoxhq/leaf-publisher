export const FREE_TITLES_PAGE_IDS = {
  filters: "free-titles-filters",
  grid: "free-titles-grid",
} as const;

export type FreeTitle = {
  slug: string;
  title: string;
  author: string;
  category: string;
  format: string;
  description: string;
  coverSrc: string;
  buttonLabel: "View Details" | "Request Access";
};

export const FREE_FILTER_CATEGORIES = [
  "All Categories",
  "Fiction",
  "Business",
  "Self-Help",
  "Memoir",
  "Education",
  "Children's Books",
  "Health & Wellness",
  "Technology",
  "Finance",
  "Poetry",
  "Writing",
  "Publishing",
  "Wellness",
] as const;

export const FREE_FILTER_FORMATS = [
  "All Formats",
  "Full Ebook",
  "Sample Chapter",
  "Starter Guide",
  "Workbook",
  "Short Read",
  "Free Ebook",
  "Sample Story",
] as const;

export const FREE_FILTER_SORT_OPTIONS = [
  "Recommended",
  "Newest",
  "A-Z",
  "Most Viewed",
] as const;

export type FreeFilterCategory = (typeof FREE_FILTER_CATEGORIES)[number];
export type FreeFilterFormat = (typeof FREE_FILTER_FORMATS)[number];
export type FreeFilterSort = (typeof FREE_FILTER_SORT_OPTIONS)[number];

/** Placeholder/demo free titles — replace with CMS, API, or database data. */
export const FEATURED_FREE_TITLES: readonly FreeTitle[] = [
  {
    slug: "the-first-chapter-blueprint",
    title: "The First Chapter Blueprint",
    author: "By Leaf Publisher Studio",
    category: "Writing",
    format: "Starter Guide",
    description:
      "A simple guide to help new authors plan their first chapter, organize ideas, and begin with more confidence.",
    coverSrc: "/e-books/demo-ebook1.png",
    buttonLabel: "View Details",
  },
  {
    slug: "small-habits-clearer-days",
    title: "Small Habits, Clearer Days",
    author: "By Leaf Publisher Studio",
    category: "Self-Help",
    format: "Short Read",
    description:
      "A gentle read about building better routines, improving focus, and creating progress through small daily choices.",
    coverSrc: "/e-books/demo-ebook2.png",
    buttonLabel: "View Details",
  },
  {
    slug: "the-digital-book-starter",
    title: "The Digital Book Starter",
    author: "By Leaf Publisher Studio",
    category: "Publishing",
    format: "Free Ebook",
    description:
      "An introduction to ebook writing, formatting, design, and publishing preparation for first-time authors.",
    coverSrc: "/e-books/demo-ebook3.png",
    buttonLabel: "Request Access",
  },
  {
    slug: "little-lessons-from-the-forest",
    title: "Little Lessons From the Forest",
    author: "By Leaf Publisher Studio",
    category: "Children's Books",
    format: "Sample Story",
    description:
      "A warm children's sample story about kindness, curiosity, and learning from the world around us.",
    coverSrc: "/e-books/demo-ebook4.jpg",
    buttonLabel: "View Details",
  },
  {
    slug: "the-simple-business-guide",
    title: "The Simple Business Guide",
    author: "By Leaf Publisher Studio",
    category: "Business",
    format: "Starter Guide",
    description:
      "A practical short guide for entrepreneurs who want to turn their knowledge into clear, useful content.",
    coverSrc: "/e-books/demo-ebook5.jpg",
    buttonLabel: "View Details",
  },
  {
    slug: "pages-of-reflection",
    title: "Pages of Reflection",
    author: "By Leaf Publisher Studio",
    category: "Memoir",
    format: "Sample Chapter",
    description:
      "A reflective sample chapter about memory, growth, identity, and the stories that shape who we become.",
    coverSrc: "/e-books/demo-ebook4.jpg",
    buttonLabel: "View Details",
  },
] as const;

export type FreeCategoryPill = {
  label: string;
  href: string;
};

export const FREE_CATEGORY_PILLS: readonly FreeCategoryPill[] = [
  { label: "Writing", href: "/categories" },
  { label: "Publishing", href: "/categories" },
  { label: "Business", href: "/categories" },
  { label: "Self-Help", href: "/categories" },
  { label: "Memoir", href: "/categories" },
  { label: "Fiction", href: "/categories" },
  { label: "Children's Books", href: "/categories" },
  { label: "Education", href: "/categories" },
  { label: "Wellness", href: "/categories" },
  { label: "Technology", href: "/categories" },
  { label: "Poetry", href: "/categories" },
  { label: "Finance", href: "/categories" },
] as const;

export type FreeTitleBenefit = {
  title: string;
  description: string;
};

export const WHY_FREE_TITLES: readonly FreeTitleBenefit[] = [
  {
    title: "Discover New Authors",
    description:
      "Free titles help readers explore new voices, styles, and ideas before choosing what to read next.",
  },
  {
    title: "Preview Before You Commit",
    description:
      "Sample chapters and starter reads give you a better feel for the book's tone, structure, and value.",
  },
  {
    title: "Learn Something Useful",
    description:
      "Starter guides and short reads can help you gain practical knowledge without a full-book commitment.",
  },
  {
    title: "Start Your Reading Habit",
    description:
      "Free titles make it easier to begin reading, explore categories, and build a personal digital library.",
  },
] as const;

export type AuthorFreeSample = {
  title: string;
  description: string;
};

export const AUTHOR_FREE_SAMPLES: readonly AuthorFreeSample[] = [
  {
    title: "Sample Chapters",
    description:
      "Share a polished preview from your book to help readers understand your style and message.",
  },
  {
    title: "Reader Magnets",
    description:
      "Create a free guide, workbook, or short ebook that introduces your expertise and grows interest.",
  },
  {
    title: "Launch Previews",
    description:
      "Prepare a free title or excerpt to support your ebook launch and build early reader attention.",
  },
] as const;

export type FreeTitleFaq = {
  id: string;
  question: string;
  answer: string;
};

export const FREE_TITLE_FAQS: readonly FreeTitleFaq[] = [
  {
    id: "really-free",
    question: "Are the titles really free?",
    answer:
      "Some titles may be free full ebooks, while others may be sample chapters, starter guides, or short reads. Final access depends on the available content and publishing setup.",
  },
  {
    id: "account",
    question: "Do I need an account to read free titles?",
    answer:
      "Account requirements should depend on the final reader system. If accounts are not active yet, keep free title access as a preview or request-based flow.",
  },
  {
    id: "authors",
    question: "Can authors offer free samples on Leaf Publisher?",
    answer:
      "Yes. Authors can prepare sample chapters, free guides, or reader magnets with Leaf Publisher support.",
  },
  {
    id: "download",
    question: "Can I download free titles?",
    answer:
      "Downloads should only be available when actual files and permissions are added. Until then, use safe View Details or Request Access buttons.",
  },
  {
    id: "more-titles",
    question: "Will more free titles be added?",
    answer:
      "Yes, this page can be updated as new free ebooks, samples, and starter resources become available.",
  },
] as const;
