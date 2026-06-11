export const NEW_RELEASES_PAGE_IDS = {
  filters: "new-releases-filters",
  grid: "new-releases-grid",
  comingSoon: "coming-soon-section",
} as const;

export type NewReleaseBadge =
  | "Fresh Pick"
  | "Recently Added"
  | "New Preview"
  | "Coming Soon"
  | "New Release"
  | "Updated Edition";

export type NewReleaseTitle = {
  slug: string;
  title: string;
  author: string;
  category: string;
  format: string;
  description: string;
  coverSrc: string;
  badge: NewReleaseBadge;
};

export const NEW_RELEASE_FILTER_CATEGORIES = [
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
  "Writing",
  "Wellness",
] as const;

export const NEW_RELEASE_FILTER_FORMATS = [
  "All Formats",
  "Ebook",
  "Guide",
  "Workbook",
  "Short Read",
  "Sample Chapter",
  "Coming Soon",
  "Sample Story",
  "Starter Guide",
] as const;

export const NEW_RELEASE_FILTER_SORT_OPTIONS = [
  "Newest First",
  "Featured",
  "A-Z",
  "Recently Added",
  "Coming Soon",
] as const;

export type NewReleaseFilterCategory = (typeof NEW_RELEASE_FILTER_CATEGORIES)[number];
export type NewReleaseFilterFormat = (typeof NEW_RELEASE_FILTER_FORMATS)[number];
export type NewReleaseFilterSort = (typeof NEW_RELEASE_FILTER_SORT_OPTIONS)[number];

/** Placeholder/demo featured releases — replace with CMS, API, or database data. */
export const FEATURED_NEW_RELEASES: readonly NewReleaseTitle[] = [
  {
    slug: "the-digital-author",
    title: "The Digital Author",
    author: "By Leaf Publisher Studio",
    category: "Publishing",
    format: "Guide",
    description:
      "A practical guide for writers preparing to create, polish, format, and publish their first ebook with more clarity.",
    coverSrc: "/e-books/demo-ebook1.png",
    badge: "Fresh Pick",
  },
  {
    slug: "small-habits-clearer-days",
    title: "Small Habits, Clearer Days",
    author: "By Leaf Publisher Studio",
    category: "Self-Help",
    format: "Short Read",
    description:
      "A simple short read about building better routines, improving focus, and creating progress through small daily choices.",
    coverSrc: "/e-books/demo-ebook2.png",
    badge: "Recently Added",
  },
  {
    slug: "little-forest-lessons",
    title: "Little Forest Lessons",
    author: "By Leaf Publisher Studio",
    category: "Children's Books",
    format: "Sample Story",
    description:
      "A gentle children's story about kindness, curiosity, and small lessons from nature.",
    coverSrc: "/e-books/demo-ebook4.jpg",
    badge: "New Preview",
  },
] as const;

/** Placeholder/demo grid releases — replace when real release data is available. */
export const NEW_RELEASE_GRID_TITLES: readonly NewReleaseTitle[] = [
  {
    slug: "the-digital-author",
    title: "The Digital Author",
    author: "By Leaf Publisher Studio",
    category: "Publishing",
    format: "Guide",
    description:
      "A clear guide for authors who want to understand ebook creation, formatting, design, and publishing preparation.",
    coverSrc: "/e-books/demo-ebook1.png",
    badge: "Fresh Pick",
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
    badge: "Recently Added",
  },
  {
    slug: "little-forest-lessons",
    title: "Little Forest Lessons",
    author: "By Leaf Publisher Studio",
    category: "Children's Books",
    format: "Sample Story",
    description:
      "A warm children's sample story about kindness, curiosity, and learning from the world around us.",
    coverSrc: "/e-books/demo-ebook4.jpg",
    badge: "New Preview",
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
    badge: "Fresh Pick",
  },
  {
    slug: "pages-of-reflection",
    title: "Pages of Reflection",
    author: "By Leaf Publisher Studio",
    category: "Memoir",
    format: "Sample Chapter",
    description:
      "A reflective sample chapter about memory, growth, identity, and the stories that shape who we become.",
    coverSrc: "/e-books/demo-ebook5.jpg",
    badge: "Recently Added",
  },
  {
    slug: "learning-made-simple",
    title: "Learning Made Simple",
    author: "By Leaf Publisher Studio",
    category: "Education",
    format: "Guide",
    description:
      "A friendly learning guide designed for students, teachers, and lifelong learners who want clearer study direction.",
    coverSrc: "/e-books/demo-ebook3.png",
    badge: "New Release",
  },
  {
    slug: "the-wellness-reset",
    title: "The Wellness Reset",
    author: "By Leaf Publisher Studio",
    category: "Health & Wellness",
    format: "Guide",
    description:
      "A calm wellness guide about balance, daily habits, and simple lifestyle improvements.",
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

export type ComingSoonTitle = {
  slug: string;
  title: string;
  category: string;
  status: "Coming Soon";
};

export const COMING_SOON_TITLES: readonly ComingSoonTitle[] = [
  {
    slug: "the-wellness-reset",
    title: "The Wellness Reset",
    category: "Health & Wellness",
    status: "Coming Soon",
  },
  {
    slug: "the-smart-money-starter",
    title: "The Smart Money Starter",
    category: "Finance",
    status: "Coming Soon",
  },
  {
    slug: "creative-writing-basics",
    title: "Creative Writing Basics",
    category: "Writing",
    status: "Coming Soon",
  },
  {
    slug: "the-first-time-author-kit",
    title: "The First-Time Author Kit",
    category: "Publishing",
    status: "Coming Soon",
  },
] as const;

export type ReleaseTypePill = {
  label: string;
  action: "browse" | "for-authors" | "coming-soon" | "filter-format";
  format?: NewReleaseFilterFormat;
};

export const RELEASE_TYPE_PILLS: readonly ReleaseTypePill[] = [
  { label: "New Ebooks", action: "browse" },
  { label: "Sample Chapters", action: "filter-format", format: "Sample Chapter" },
  { label: "Starter Guides", action: "filter-format", format: "Starter Guide" },
  { label: "Author Resources", action: "for-authors" },
  { label: "Coming Soon Titles", action: "coming-soon" },
] as const;

export type NewReleaseCategoryPill = {
  label: string;
  href: string;
};

export const NEW_RELEASE_CATEGORY_PILLS: readonly NewReleaseCategoryPill[] = [
  { label: "Publishing", href: "/categories" },
  { label: "Writing", href: "/categories" },
  { label: "Business", href: "/categories" },
  { label: "Self-Help", href: "/categories" },
  { label: "Memoir", href: "/categories" },
  { label: "Fiction", href: "/categories" },
  { label: "Children's Books", href: "/categories" },
  { label: "Education", href: "/categories" },
  { label: "Wellness", href: "/categories" },
  { label: "Technology", href: "/categories" },
  { label: "Finance", href: "/categories" },
  { label: "Poetry", href: "/categories" },
] as const;

export type AuthorReleaseCard = {
  title: string;
  description: string;
};

export const AUTHOR_RELEASE_CARDS: readonly AuthorReleaseCard[] = [
  {
    title: "Polish Your Manuscript",
    description:
      "Improve clarity, structure, grammar, tone, and readability before release.",
  },
  {
    title: "Prepare the Presentation",
    description:
      "Create a stronger cover, layout, description, and category direction.",
  },
  {
    title: "Get Ready to Publish",
    description:
      "Organize final files and publishing details so your ebook is easier to launch.",
  },
] as const;

export type NewReleaseFaq = {
  id: string;
  question: string;
  answer: string;
};

export const NEW_RELEASE_FAQS: readonly NewReleaseFaq[] = [
  {
    id: "newly-released",
    question: "Are these books newly released?",
    answer:
      "New release labels should only be used when real publishing or upload data is available. Until then, this page can use placeholder demo titles and coming soon content.",
  },
  {
    id: "how-often",
    question: "How often are new titles added?",
    answer:
      "New titles can be added whenever the final ebook library, author submissions, or publishing system is connected. This page should be easy to update with real data later.",
  },
  {
    id: "by-category",
    question: "Can I browse new releases by category?",
    answer:
      "Yes. Readers can explore new releases by category, format, reading interest, or future filters once the data system is active.",
  },
  {
    id: "authors-submit",
    question: "Can authors submit a new release?",
    answer:
      "Authors can contact Leaf Publisher for help preparing an ebook for writing, editing, design, formatting, and publishing support.",
  },
  {
    id: "coming-soon-access",
    question: "Can I access coming soon titles?",
    answer:
      "Coming soon titles should only become available once final files, permissions, or preview pages are ready. Until then, keep them as preview cards.",
  },
] as const;

export function releaseBadgeTone(badge: NewReleaseBadge): string {
  switch (badge) {
    case "Fresh Pick":
    case "New Release":
      return "border-green/35 bg-green/12 text-green";
    case "Recently Added":
    case "Updated Edition":
      return "border-green2/30 bg-green2/10 text-green";
    case "New Preview":
      return "border-line bg-paper/90 text-text";
    case "Coming Soon":
      return "border-line/80 bg-bg/90 text-muted";
    default:
      return "border-line bg-paper/90 text-muted";
  }
}
