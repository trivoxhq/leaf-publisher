import type { IconType } from "react-icons";
import {
  HiOutlineAcademicCap,
  HiOutlineBeaker,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineColorSwatch,
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineLightningBolt,
  HiOutlineMusicNote,
  HiOutlineOfficeBuilding,
  HiOutlinePencil,
  HiOutlinePresentationChartLine,
  HiOutlineSearchCircle,
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineSun,
  HiOutlineTrendingUp,
  HiOutlineUserGroup,
} from "react-icons/hi";

export const CATEGORIES_PAGE_IDS = {
  featured: "featured-categories",
  grid: "browse-all-categories",
} as const;

export type FeaturedCategory = {
  slug: string;
  title: string;
  description: string;
  icon: IconType;
  accent: string;
};

export const FEATURED_CATEGORIES: readonly FeaturedCategory[] = [
  {
    slug: "fiction",
    title: "Fiction",
    description:
      "Explore imaginative stories, emotional journeys, character-driven plots, and original worlds.",
    icon: HiOutlineBookOpen,
    accent: "from-green/20 via-green2/10 to-transparent",
  },
  {
    slug: "business",
    title: "Business & Entrepreneurship",
    description:
      "Discover practical ebooks for founders, professionals, coaches, and growing brands.",
    icon: HiOutlineBriefcase,
    accent: "from-green2/18 via-green/8 to-transparent",
  },
  {
    slug: "self-help",
    title: "Self-Help & Personal Growth",
    description:
      "Find books focused on mindset, confidence, habits, productivity, healing, and transformation.",
    icon: HiOutlineLightBulb,
    accent: "from-green/16 via-transparent to-green2/12",
  },
  {
    slug: "memoir",
    title: "Memoir & Biography",
    description:
      "Read real stories, personal journeys, life lessons, and inspiring experiences.",
    icon: HiOutlineDocumentText,
    accent: "from-green2/14 via-green/6 to-transparent",
  },
  {
    slug: "education",
    title: "Education & Learning",
    description:
      "Explore guides, study material, learning resources, and knowledge-focused ebooks.",
    icon: HiOutlineAcademicCap,
    accent: "from-green/18 via-green2/8 to-transparent",
  },
  {
    slug: "wellness",
    title: "Health & Wellness",
    description:
      "Browse ebooks about wellness, lifestyle, balance, nutrition, fitness, and better living.",
    icon: HiOutlineHeart,
    accent: "from-green2/16 via-green/10 to-transparent",
  },
] as const;

export type CategoryItem = {
  slug: string;
  name: string;
  description: string;
  icon: IconType;
};

/** Full category list — edit names, descriptions, and slugs here. */
export const ALL_CATEGORIES: readonly CategoryItem[] = [
  { slug: "fiction", name: "Fiction", description: "Stories, imagination, and narrative worlds.", icon: HiOutlineBookOpen },
  { slug: "non-fiction", name: "Non-Fiction", description: "Real ideas, facts, and practical insight.", icon: HiOutlineClipboardList },
  { slug: "business", name: "Business", description: "Strategy, operations, and professional growth.", icon: HiOutlineBriefcase },
  { slug: "entrepreneurship", name: "Entrepreneurship", description: "Building, launching, and scaling ventures.", icon: HiOutlineLightningBolt },
  { slug: "self-help", name: "Self-Help", description: "Mindset, habits, and personal improvement.", icon: HiOutlineLightBulb },
  { slug: "personal-development", name: "Personal Development", description: "Skills, confidence, and life direction.", icon: HiOutlineTrendingUp },
  { slug: "memoir", name: "Memoir", description: "Personal stories and lived experience.", icon: HiOutlineDocumentText },
  { slug: "biography", name: "Biography", description: "Lives, lessons, and inspiring journeys.", icon: HiOutlineUserGroup },
  { slug: "education", name: "Education", description: "Learning resources and study support.", icon: HiOutlineAcademicCap },
  { slug: "childrens-books", name: "Children's Books", description: "Stories for young readers and families.", icon: HiOutlineStar },
  { slug: "young-adult", name: "Young Adult", description: "Coming-of-age stories and teen fiction.", icon: HiOutlineSparkles },
  { slug: "romance", name: "Romance", description: "Love stories, connection, and emotion.", icon: HiOutlineHeart },
  { slug: "mystery-thriller", name: "Mystery & Thriller", description: "Suspense, twists, and page-turning tension.", icon: HiOutlineSearchCircle },
  { slug: "fantasy", name: "Fantasy", description: "Magic, myth, and extraordinary worlds.", icon: HiOutlineCube },
  { slug: "science-fiction", name: "Science Fiction", description: "Future worlds, technology, and speculation.", icon: HiOutlineBeaker },
  { slug: "health-wellness", name: "Health & Wellness", description: "Balance, fitness, and better living.", icon: HiOutlineSun },
  { slug: "spirituality", name: "Spirituality", description: "Meaning, reflection, and inner growth.", icon: HiOutlineGlobeAlt },
  { slug: "finance", name: "Finance", description: "Money, investing, and financial clarity.", icon: HiOutlineCurrencyDollar },
  { slug: "marketing", name: "Marketing", description: "Branding, audience, and promotion.", icon: HiOutlinePresentationChartLine },
  { slug: "leadership", name: "Leadership", description: "Teams, vision, and decision-making.", icon: HiOutlineOfficeBuilding },
  { slug: "technology", name: "Technology", description: "Digital tools, innovation, and tech insight.", icon: HiOutlineCog },
  { slug: "travel", name: "Travel", description: "Places, journeys, and exploration.", icon: HiOutlineGlobeAlt },
  { slug: "poetry", name: "Poetry", description: "Language, rhythm, and emotional expression.", icon: HiOutlineMusicNote },
  { slug: "cookbooks", name: "Cookbooks", description: "Recipes, food culture, and kitchen inspiration.", icon: HiOutlineColorSwatch },
  { slug: "lifestyle", name: "Lifestyle", description: "Everyday living, style, and personal taste.", icon: HiOutlineStar },
  { slug: "history", name: "History", description: "Past events, context, and cultural memory.", icon: HiOutlineDocumentText },
  { slug: "psychology", name: "Psychology", description: "Mind, behavior, and human understanding.", icon: HiOutlineLightningBolt },
  { slug: "career-guides", name: "Career Guides", description: "Jobs, skills, and professional pathways.", icon: HiOutlineChartBar },
  { slug: "academic-guides", name: "Academic Guides", description: "Research, study, and scholarly support.", icon: HiOutlineAcademicCap },
  { slug: "creative-writing", name: "Creative Writing", description: "Craft, voice, and storytelling technique.", icon: HiOutlinePencil },
] as const;

export const READER_PATHS = [
  {
    title: "I Want to Learn Something Useful",
    description:
      "Start with Business, Education, Finance, Technology, or Career Guides.",
    gradient: "from-green/12 via-bg to-green2/8",
  },
  {
    title: "I Want to Feel Inspired",
    description:
      "Explore Memoir, Self-Help, Biography, Spirituality, and Personal Growth.",
    gradient: "from-green2/10 via-paper to-green/8",
  },
  {
    title: "I Want to Escape Into a Story",
    description:
      "Browse Fiction, Fantasy, Romance, Mystery, Thriller, Young Adult, and Science Fiction.",
    gradient: "from-green/10 via-bg to-green2/12",
  },
  {
    title: "I Want to Improve My Lifestyle",
    description:
      "Explore Health, Wellness, Cookbooks, Travel, Psychology, and Lifestyle categories.",
    gradient: "from-green2/8 via-paper to-green/10",
  },
] as const;

export const AUTHOR_CARDS = [
  {
    title: "Find Your Book's Category",
    description:
      "We help clarify where your book fits so the message reaches the right readers.",
  },
  {
    title: "Shape the Content Direction",
    description:
      "Our team supports structure, tone, chapters, and positioning based on your genre.",
  },
  {
    title: "Prepare for Publishing",
    description:
      "From formatting to design and publishing support, we help your ebook feel ready for launch.",
  },
] as const;

/** Visual discovery strip — not presented as live trending data. */
export const DISCOVERY_TAGS = [
  "Business",
  "Self-Help",
  "Memoir",
  "Fiction",
  "Children's Books",
  "Education",
  "Wellness",
  "Finance",
  "Technology",
  "Poetry",
] as const;

export const HERO_FLOATING_TILES = [
  { label: "Fiction", image: "/e-books/demo-ebook1.png", rotate: "-rotate-6", offset: "translate-y-2" },
  { label: "Business", image: "/e-books/demo-ebook4.jpg", rotate: "rotate-3", offset: "-translate-y-3" },
  { label: "Self-Help", image: "/e-books/demo-ebook2.png", rotate: "-rotate-2", offset: "translate-y-1" },
  { label: "Memoir", image: "/e-books/demo-ebook5.jpg", rotate: "rotate-6", offset: "-translate-y-4" },
] as const;
