export const BESTSELLERS_PAGE_IDS = {
  filters: "bestsellers-filters",
  grid: "bestsellers-grid",
} as const;

export type BestsellerBadge =
  | "Featured Pick"
  | "Popular Preview"
  | "Reader Favorite"
  | "Featured"
  | "Popular Pick"
  | "New Arrival"
  | "Coming Soon";

export type BestsellerTitle = {
  slug: string;
  title: string;
  author: string;
  category: string;
  format: string;
  description: string;
  coverSrc: string;
  badge: BestsellerBadge;
};

export const BESTSELLER_FILTER_CATEGORIES = [
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
  "Publishing",
  "Poetry",
] as const;

export const BESTSELLER_FILTER_FORMATS = [
  "All Formats",
  "Ebook",
  "Guide",
  "Workbook",
  "Series",
  "Short Read",
  "Sample Chapter",
  "Story",
  "Starter Guide",
] as const;

export const BESTSELLER_FILTER_SORT_OPTIONS = [
  "Featured",
  "Newest",
  "A-Z",
  "Popular Picks",
] as const;

export type BestsellerFilterCategory = (typeof BESTSELLER_FILTER_CATEGORIES)[number];
export type BestsellerFilterFormat = (typeof BESTSELLER_FILTER_FORMATS)[number];
export type BestsellerFilterSort = (typeof BESTSELLER_FILTER_SORT_OPTIONS)[number];

/** Placeholder/demo featured picks — replace with CMS, API, or database data. */
export const BESTSELLER_HIGHLIGHTS: readonly BestsellerTitle[] = [
  {
    slug: "the-digital-author",
    title: "The Digital Author",
    author: "By Leaf Publisher Studio",
    category: "Publishing",
    format: "Guide",
    description:
      "A modern guide for writers preparing to create, polish, and publish their first ebook with more clarity and confidence.",
    coverSrc: "/e-books/demo-ebook1.png",
    badge: "Featured Pick",
  },
  {
    slug: "the-quiet-strategy",
    title: "The Quiet Strategy",
    author: "By Leaf Publisher Studio",
    category: "Business",
    format: "Ebook",
    description:
      "A practical ebook for entrepreneurs who want stronger systems, clearer offers, and better long-term direction.",
    coverSrc: "/e-books/demo-ebook4.jpg",
    badge: "Popular Preview",
  },
  {
    slug: "the-focus-habit",
    title: "The Focus Habit",
    author: "By Leaf Publisher Studio",
    category: "Self-Help",
    format: "Short Read",
    description:
      "A simple guide to building clarity, improving discipline, and creating daily routines that support meaningful progress.",
    coverSrc: "/e-books/demo-ebook2.png",
    badge: "Reader Favorite",
  },
] as const;

/** Placeholder/demo grid titles — replace when real ranking data is available. */
export const BESTSELLER_GRID_TITLES: readonly BestsellerTitle[] = [
  {
    slug: "the-digital-author",
    title: "The Digital Author",
    author: "By Leaf Publisher Studio",
    category: "Publishing",
    format: "Guide",
    description:
      "A clear guide for authors who want to understand ebook creation, formatting, design, and publishing preparation.",
    coverSrc: "/e-books/demo-ebook1.png",
    badge: "Featured",
  },
  {
    slug: "the-quiet-strategy",
    title: "The Quiet Strategy",
    author: "By Leaf Publisher Studio",
    category: "Business",
    format: "Ebook",
    description:
      "A practical business ebook about building smarter systems, better offers, and stronger strategic direction.",
    coverSrc: "/e-books/demo-ebook4.jpg",
    badge: "Popular Pick",
  },
  {
    slug: "the-focus-habit",
    title: "The Focus Habit",
    author: "By Leaf Publisher Studio",
    category: "Self-Help",
    format: "Short Read",
    description:
      "A simple guide to building better routines, improving focus, and creating more intentional daily progress.",
    coverSrc: "/e-books/demo-ebook2.png",
    badge: "Reader Favorite",
  },
  {
    slug: "pages-of-becoming",
    title: "Pages of Becoming",
    author: "By Leaf Publisher Studio",
    category: "Memoir",
    format: "Ebook",
    description:
      "A reflective personal journey about identity, growth, change, and the moments that shape a life.",
    coverSrc: "/e-books/demo-ebook5.jpg",
    badge: "Featured",
  },
  {
    slug: "learning-made-simple",
    title: "Learning Made Simple",
    author: "By Leaf Publisher Studio",
    category: "Education",
    format: "Guide",
    description:
      "A friendly learning guide for students, teachers, and lifelong learners who want clearer study direction.",
    coverSrc: "/e-books/demo-ebook3.png",
    badge: "New Arrival",
  },
  {
    slug: "little-forest-lessons",
    title: "Little Forest Lessons",
    author: "By Leaf Publisher Studio",
    category: "Children's Books",
    format: "Story",
    description:
      "A gentle children's ebook built around kindness, curiosity, and small lessons from nature.",
    coverSrc: "/e-books/demo-ebook2.png",
    badge: "Popular Preview",
  },
  {
    slug: "the-wellness-reset",
    title: "The Wellness Reset",
    author: "By Leaf Publisher Studio",
    category: "Health & Wellness",
    format: "Guide",
    description:
      "A calm and practical wellness guide about balance, better habits, and everyday lifestyle improvement.",
    coverSrc: "/e-books/demo-ebook3.png",
    badge: "Coming Soon",
  },
  {
    slug: "the-smart-money-starter",
    title: "The Smart Money Starter",
    author: "By Leaf Publisher Studio",
    category: "Finance",
    format: "Starter Guide",
    description:
      "A beginner-friendly finance guide focused on simple money habits, planning, and better financial confidence.",
    coverSrc: "/e-books/demo-ebook4.jpg",
    badge: "Coming Soon",
  },
] as const;

export type BestsellerCategoryPill = {
  label: string;
  href: string;
};

export const BESTSELLER_CATEGORY_PILLS: readonly BestsellerCategoryPill[] = [
  { label: "Fiction", href: "/categories" },
  { label: "Business", href: "/categories" },
  { label: "Self-Help", href: "/categories" },
  { label: "Memoir", href: "/categories" },
  { label: "Publishing", href: "/categories" },
  { label: "Education", href: "/categories" },
  { label: "Children's Books", href: "/categories" },
  { label: "Wellness", href: "/categories" },
  { label: "Technology", href: "/categories" },
  { label: "Finance", href: "/categories" },
  { label: "Poetry", href: "/categories" },
  { label: "Leadership", href: "/categories" },
] as const;

export type ReadingPathCard = {
  rank: number;
  title: string;
  description: string;
  categories: string;
};

export const POPULAR_READING_PATHS: readonly ReadingPathCard[] = [
  {
    rank: 1,
    title: "For Big Ideas",
    description:
      "Explore business, entrepreneurship, leadership, technology, and finance titles.",
    categories: "Business, Leadership, Finance, Technology",
  },
  {
    rank: 2,
    title: "For Personal Growth",
    description:
      "Browse self-help, wellness, mindset, productivity, and personal development books.",
    categories: "Self-Help, Wellness, Psychology, Lifestyle",
  },
  {
    rank: 3,
    title: "For Real Stories",
    description:
      "Discover memoirs, biographies, personal journeys, and life lesson books.",
    categories: "Memoir, Biography, History, Personal Essays",
  },
  {
    rank: 4,
    title: "For Story Lovers",
    description:
      "Explore fiction, fantasy, romance, mystery, thriller, and young adult titles.",
    categories: "Fiction, Fantasy, Romance, Mystery",
  },
] as const;

export type TrustInfoCard = {
  title: string;
  description: string;
};

export const READER_TRUST_CARDS: readonly TrustInfoCard[] = [
  {
    title: "Curated Picks",
    description:
      "Books can be highlighted by the Leaf Publisher team based on quality, category fit, and reader relevance.",
  },
  {
    title: "Reader Activity",
    description:
      "Future bestseller rankings can be powered by real views, saves, purchases, downloads, or reading engagement.",
  },
  {
    title: "Transparent Labels",
    description:
      "Use clear labels such as Featured, Popular Pick, Coming Soon, or Bestseller once real data supports the claim.",
  },
] as const;

export type AuthorOpportunityCard = {
  title: string;
  description: string;
};

export const AUTHOR_OPPORTUNITY_CARDS: readonly AuthorOpportunityCard[] = [
  {
    title: "Stronger Book Positioning",
    description:
      "Clarify your audience, category, message, and book promise before launch.",
  },
  {
    title: "Professional Presentation",
    description:
      "Improve your manuscript, cover, layout, description, and publishing assets.",
  },
  {
    title: "Reader-Ready Launch",
    description:
      "Prepare your ebook with the structure and polish needed to make a stronger first impression.",
  },
] as const;

export type BestsellerFaq = {
  id: string;
  question: string;
  answer: string;
};

export const BESTSELLER_FAQS: readonly BestsellerFaq[] = [
  {
    id: "real-bestsellers",
    question: "Are these real bestsellers?",
    answer:
      "Bestseller labels should only be used when real sales, download, or reader activity data is available. Until then, this page can use curated featured picks and placeholder demo content.",
  },
  {
    id: "selection",
    question: "How are bestsellers selected?",
    answer:
      "Once real data is connected, bestsellers can be selected based on sales, downloads, views, saves, ratings, or verified reader engagement. Featured picks may also be selected editorially.",
  },
  {
    id: "authors-featured",
    question: "Can authors get their book featured?",
    answer:
      "Authors can work with Leaf Publisher to improve their ebook's writing, editing, formatting, cover design, description, and category direction. Featured placement should depend on the final platform rules.",
  },
  {
    id: "browse-category",
    question: "Can I browse by category?",
    answer:
      "Yes. Readers can explore popular titles by category, topic, format, or reading mood.",
  },
  {
    id: "updates",
    question: "Will this page update over time?",
    answer:
      "Yes. The Bestsellers page should be easy to update as new titles, real ranking data, and platform activity become available.",
  },
] as const;

export function badgeTone(badge: BestsellerBadge): string {
  switch (badge) {
    case "Featured Pick":
    case "Featured":
      return "border-green/35 bg-green/12 text-green";
    case "Popular Preview":
    case "Popular Pick":
      return "border-green2/30 bg-green2/10 text-green";
    case "Reader Favorite":
      return "border-line bg-paper/90 text-text";
    case "New Arrival":
      return "border-green/25 bg-green/8 text-green";
    case "Coming Soon":
      return "border-line/80 bg-bg/90 text-muted";
    default:
      return "border-line bg-paper/90 text-muted";
  }
}
