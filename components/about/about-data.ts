import type { IconType } from "react-icons";
import {
  HiOutlineAdjustments,
  HiOutlineGlobeAlt,
  HiOutlineLightningBolt,
  HiOutlinePencil,
  HiOutlineSparkles,
  HiOutlineTrendingUp,
} from "react-icons/hi";

export type AboutStat = { value: string; label: string };

/** Editable stats — update values here when brand numbers change. */
export const ABOUT_STATS: readonly AboutStat[] = [
  { value: "700+", label: "Books Written" },
  { value: "400+", label: "Happy Clients" },
  { value: "150+", label: "Returning Customers" },
  { value: "7", label: "Years Experience" },
] as const;

export type HighlightCard = {
  title: string;
  description: string;
  icon: IconType;
};

export const HIGHLIGHT_CARDS: readonly HighlightCard[] = [
  {
    title: "Crafting Inspirational Narratives",
    description:
      "We help shape stories and ideas into clear, emotional, and engaging narratives that keep readers connected from the first page to the last.",
    icon: HiOutlineSparkles,
  },
  {
    title: "Excellence in Every Detail",
    description:
      "From writing and editing to formatting and design, we focus on precision, flow, and presentation so every book feels professionally built.",
    icon: HiOutlineAdjustments,
  },
  {
    title: "Impactful Ebook Growth",
    description:
      "We create ebooks that do more than fill pages. Our goal is to help authors build trust, strengthen their message, and reach the right audience.",
    icon: HiOutlineTrendingUp,
  },
] as const;

export type ServiceCard = {
  title: string;
  description: string;
  icon: IconType;
};

export const WHY_CHOOSE_CARDS: readonly ServiceCard[] = [
  {
    title: "Authentic Book Narratives",
    description:
      "Need help expressing your book's message clearly? We help turn your ideas into original, well-structured content with a voice that feels natural and true to your purpose.",
    icon: HiOutlinePencil,
  },
  {
    title: "Captivating Ebook Content",
    description:
      "Want content that keeps readers engaged? Our writing and editing support helps shape strong chapters, smooth flow, clear messaging, and persuasive storytelling.",
    icon: HiOutlineLightningBolt,
  },
  {
    title: "Stronger Online Presence",
    description:
      "Looking to build your author brand or ebook visibility? We support publishing direction, presentation, and content strategy so your book can make a stronger impression online.",
    icon: HiOutlineGlobeAlt,
  },
] as const;

export type PortfolioItem = {
  title: string;
  imageSrc: string;
};

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  { title: "Book Cover Design", imageSrc: "/e-books/demo-ebook1.png" },
  { title: "Ebook Formatting", imageSrc: "/e-books/demo-ebook2.png" },
  { title: "Fiction Writing", imageSrc: "/e-books/demo-ebook3.png" },
  { title: "Business Ebook", imageSrc: "/e-books/demo-ebook4.jpg" },
  { title: "Author Branding", imageSrc: "/e-books/demo-ebook5.jpg" },
] as const;

export type TeamRole = {
  role: string;
  initial: string;
};

export const TEAM_ROLES: readonly TeamRole[] = [
  { role: "Founder", initial: "F" },
  { role: "Creative Director", initial: "C" },
  { role: "Senior Editor", initial: "E" },
  { role: "Book Designer", initial: "D" },
  { role: "Publishing Specialist", initial: "P" },
  { role: "Author Support Lead", initial: "A" },
] as const;

export const MISSION_VISION = {
  vision: {
    title: "Our Vision",
    description:
      "To redefine digital publishing by helping authors create books that cross boundaries, speak to diverse readers, and leave a meaningful impression.",
  },
  mission: {
    title: "Our Mission",
    description:
      "Our mission is to guide authors through writing, editing, design, and publishing with a process that feels simple, professional, and focused on impact.",
  },
} as const;
