export const BROWSE_PAGE_IDS = {
  filters: "search-filters",
  grid: "book-grid",
} as const;

export type BrowseBook = {
  slug: string;
  title: string;
  author: string;
  category: string;
  format: string;
  description: string;
  coverSrc: string;
};

export const FILTER_CATEGORIES = [
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
  "Publishing",
] as const;

export const FILTER_FORMATS = [
  "All Formats",
  "Ebook",
  "Guide",
  "Workbook",
  "Series",
  "Short Read",
] as const;

export const FILTER_SORT_OPTIONS = [
  "Recommended",
  "Newest",
  "Popular",
  "A-Z",
] as const;

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];
export type FilterFormat = (typeof FILTER_FORMATS)[number];
export type FilterSort = (typeof FILTER_SORT_OPTIONS)[number];

export const FEATURED_BOOKS: readonly BrowseBook[] = [
  {
    slug: "the-quiet-strategy",
    title: "The Quiet Strategy",
    author: "By Leaf Publisher Studio",
    category: "Business",
    format: "Guide",
    description:
      "A practical ebook for entrepreneurs who want to build smarter systems, clearer offers, and stronger long-term direction.",
    coverSrc: "/e-books/demo-ebook4.jpg",
  },
  {
    slug: "pages-of-becoming",
    title: "Pages of Becoming",
    author: "By Leaf Publisher Studio",
    category: "Memoir",
    format: "Ebook",
    description:
      "A reflective personal journey about growth, identity, change, and the moments that shape a life.",
    coverSrc: "/e-books/demo-ebook5.jpg",
  },
  {
    slug: "the-focus-habit",
    title: "The Focus Habit",
    author: "By Leaf Publisher Studio",
    category: "Self-Help",
    format: "Guide",
    description:
      "A simple guide to building clarity, improving discipline, and creating daily routines that support meaningful progress.",
    coverSrc: "/e-books/demo-ebook2.png",
  },
  {
    slug: "learning-made-simple",
    title: "Learning Made Simple",
    author: "By Leaf Publisher Studio",
    category: "Education",
    format: "Guide",
    description:
      "A clear and friendly learning guide designed for students, teachers, and lifelong learners.",
    coverSrc: "/e-books/demo-ebook3.png",
  },
  {
    slug: "the-digital-author",
    title: "The Digital Author",
    author: "By Leaf Publisher Studio",
    category: "Publishing",
    format: "Guide",
    description:
      "A modern guide for writers preparing to create, polish, and publish their first ebook.",
    coverSrc: "/e-books/demo-ebook1.png",
  },
  {
    slug: "little-forest-lessons",
    title: "Little Forest Lessons",
    author: "By Leaf Publisher Studio",
    category: "Children's Books",
    format: "Ebook",
    description:
      "A gentle children's ebook built around kindness, curiosity, and small lessons from nature.",
    coverSrc: "/e-books/demo-ebook2.png",
  },
] as const;

export type PopularCategory = {
  label: string;
  slug: string;
};

export const POPULAR_CATEGORIES: readonly PopularCategory[] = [
  { label: "Fiction", slug: "fiction" },
  { label: "Business", slug: "business" },
  { label: "Self-Help", slug: "self-help" },
  { label: "Memoir", slug: "memoir" },
  { label: "Education", slug: "education" },
  { label: "Children's Books", slug: "childrens-books" },
  { label: "Wellness", slug: "wellness" },
  { label: "Technology", slug: "technology" },
  { label: "Finance", slug: "finance" },
  { label: "Poetry", slug: "poetry" },
] as const;

export type NoteworthyCard = {
  title: string;
  description: string;
  accent: string;
};

export const NEW_NOTEWORTHY: readonly NoteworthyCard[] = [
  {
    title: "New Business Guides",
    description:
      "Practical ebooks for founders, freelancers, and professionals building smarter systems.",
    accent: "from-green/18 via-green2/8 to-transparent",
  },
  {
    title: "Fresh Fiction Picks",
    description:
      "Story-driven titles across romance, mystery, fantasy, and literary fiction.",
    accent: "from-paper via-green/10 to-transparent",
  },
  {
    title: "Author Resources",
    description:
      "Publishing guides, formatting tips, and resources for writers preparing their first ebook.",
    accent: "from-green2/14 via-transparent to-green/12",
  },
  {
    title: "Learning & Education",
    description:
      "Clear, approachable ebooks for students, teachers, and lifelong learners.",
    accent: "from-green/12 via-paper to-green2/10",
  },
] as const;

export type ReaderMood = {
  title: string;
  description: string;
  gradient: string;
};

export const READER_MOODS: readonly ReaderMood[] = [
  {
    title: "Learn Something Useful",
    description:
      "Explore business, education, finance, technology, and career-focused ebooks.",
    gradient: "from-green/16 via-bg to-paper",
  },
  {
    title: "Feel Inspired",
    description:
      "Browse memoirs, self-help books, biographies, and personal growth titles.",
    gradient: "from-paper via-green/12 to-bg",
  },
  {
    title: "Escape Into a Story",
    description:
      "Find fiction, fantasy, romance, mystery, thriller, and young adult books.",
    gradient: "from-green2/14 via-paper to-green/10",
  },
  {
    title: "Build Better Habits",
    description:
      "Discover wellness, productivity, mindset, lifestyle, and health-focused guides.",
    gradient: "from-green/10 via-bg to-green2/12",
  },
] as const;

export type HeroCarouselBook = {
  title: string;
  author: string;
  category: string;
  coverSrc: string;
};

export const HERO_CAROUSEL_BOOKS: readonly HeroCarouselBook[] = [
  {
    title: "The Quiet Strategy",
    author: "Leaf Publisher Studio",
    category: "Business",
    coverSrc: "/e-books/demo-ebook4.jpg",
  },
  {
    title: "Pages of Becoming",
    author: "Leaf Publisher Studio",
    category: "Memoir",
    coverSrc: "/e-books/demo-ebook5.jpg",
  },
  {
    title: "The Focus Habit",
    author: "Leaf Publisher Studio",
    category: "Self-Help",
    coverSrc: "/e-books/demo-ebook2.png",
  },
  {
    title: "Little Forest Lessons",
    author: "Leaf Publisher Studio",
    category: "Children's Books",
    coverSrc: "/e-books/demo-ebook1.png",
  },
  {
    title: "Learning Made Simple",
    author: "Leaf Publisher Studio",
    category: "Education",
    coverSrc: "/e-books/demo-ebook3.png",
  },
] as const;
