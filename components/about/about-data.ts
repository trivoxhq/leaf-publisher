import type { IconType } from "react-icons";
import {
  HiOutlineAdjustments,
  HiOutlineClipboardCheck,
  HiOutlinePencil,
  HiOutlinePhotograph,
  HiOutlineSparkles,
  HiOutlineTemplate,
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

/** Core services Leaf Publisher offers — edit titles and copy here. */
export const OFFERED_SERVICES: readonly ServiceCard[] = [
  {
    title: "eBook Writing",
    description:
      "Turn your ideas into a complete manuscript with clear structure, engaging chapters, and a voice that feels true to your message — from first outline to finished draft.",
    icon: HiOutlinePencil,
  },
  {
    title: "Editing & Proof-Reading",
    description:
      "Polish every page with professional editing and proof-reading that improves clarity, flow, grammar, and consistency so your book reads smoothly from start to finish.",
    icon: HiOutlineClipboardCheck,
  },
  {
    title: "Cover Design",
    description:
      "Make a strong first impression with custom cover design crafted to reflect your genre, audience, and story — professional visuals that invite readers to open your book.",
    icon: HiOutlinePhotograph,
  },
  {
    title: "Book Formatting",
    description:
      "Prepare your ebook for launch with clean, reader-friendly formatting — proper layout, typography, chapter styling, and export-ready files built for digital publishing.",
    icon: HiOutlineTemplate,
  },
] as const;

export type PortfolioItem = {
  title: string;
  imageSrc: string;
};

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  { title: "eBook Writing", imageSrc: "/e-books/demo-ebook3.png" },
  { title: "Editing & Proof-Reading", imageSrc: "/e-books/demo-ebook2.png" },
  { title: "Cover Design", imageSrc: "/e-books/demo-ebook1.png" },
  { title: "Book Formatting", imageSrc: "/e-books/demo-ebook4.jpg" },
  { title: "Published Ebook", imageSrc: "/e-books/demo-ebook5.jpg" },
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
