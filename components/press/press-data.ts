import type { IconType } from "react-icons";
import {
  HiOutlineCollection,
  HiOutlineColorSwatch,
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineMail,
  HiOutlineDeviceMobile,
  HiOutlineUserGroup,
} from "react-icons/hi";

/** Editable press & media details — update when official info is confirmed. */
export const PRESS_CONFIG = {
  founded: "[Add Year]",
  pressEmail: "support@leafpublisher.com",
  pressSubject: "Press Inquiry — Leaf Publisher",
  companyFocus:
    "Ebook Writing, Editing, Design, Formatting, Publishing Support, and Author Growth",
  approvedDescription:
    "Leaf Publisher is an ebook writing, editing, design, and publishing support platform that helps authors, entrepreneurs, and businesses turn ideas into polished digital books. Through professional creative support and publishing guidance, Leaf Publisher simplifies the journey from concept to finished ebook.",
} as const;

export const PRESS_SECTION_IDS = {
  mediaKit: "media-kit",
  pressContact: "press-contact",
} as const;

export type QuickFact = { label: string; value: string };

export const QUICK_FACTS: readonly QuickFact[] = [
  { label: "Founded", value: PRESS_CONFIG.founded },
  { label: "Industry", value: "Ebook Publishing Services" },
  {
    label: "Services",
    value: "Writing, Editing, Formatting, Cover Design, Publishing Support",
  },
  {
    label: "Audience",
    value: "Authors, Entrepreneurs, Coaches, Businesses, and Independent Creators",
  },
  {
    label: "Platform",
    value: "Digital Book Creation and Publishing Support",
  },
] as const;

export type NewsworthyCard = {
  title: string;
  description: string;
  icon: IconType;
};

export const NEWSWORTHY_CARDS: readonly NewsworthyCard[] = [
  {
    title: "Full-Service Ebook Support",
    description:
      "Leaf Publisher supports authors through writing, editing, formatting, design, and publishing preparation, helping reduce the confusion of managing multiple creative steps.",
    icon: HiOutlineCollection,
  },
  {
    title: "Author-Centered Process",
    description:
      "Every project is shaped around the author's message, goals, audience, and publishing needs.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Modern Digital Publishing Focus",
    description:
      "Leaf Publisher is built for today's ebook market, helping authors prepare books that feel polished, readable, and ready for digital platforms.",
    icon: HiOutlineDeviceMobile,
  },
  {
    title: "Creative and Professional Balance",
    description:
      "The platform combines storytelling, structure, design, and publishing knowledge to create books that feel both creative and market-ready.",
    icon: HiOutlineLightBulb,
  },
] as const;

export type PressUpdate = {
  title: string;
  date: string;
  excerpt: string;
};

/** Placeholder updates — replace with real press releases when available. */
export const PRESS_UPDATES: readonly PressUpdate[] = [
  {
    title: "Leaf Publisher Expands Ebook Creation Support for Independent Authors",
    date: "Coming Soon",
    excerpt:
      "A closer look at how Leaf Publisher is helping authors move from early ideas to professionally prepared ebooks.",
  },
  {
    title: "New Publishing Resources Coming Soon for Authors",
    date: "Coming Soon",
    excerpt:
      "Leaf Publisher is preparing helpful resources for writers, entrepreneurs, and creators planning their next ebook.",
  },
  {
    title: "Leaf Publisher Introduces a Cleaner Path to Digital Book Launches",
    date: "Coming Soon",
    excerpt:
      "A modern approach to ebook writing, editing, design, and publishing preparation for authors who want clarity.",
  },
] as const;

export type MediaKitCard = {
  title: string;
  description: string;
  icon: IconType;
};

export const MEDIA_KIT_CARDS: readonly MediaKitCard[] = [
  {
    title: "Brand Overview",
    description:
      "Short company description, mission, services, and audience overview.",
    icon: HiOutlineDocumentText,
  },
  {
    title: "Logo and Brand Assets",
    description:
      "Approved logo files, brand colors, and visual guidelines when available.",
    icon: HiOutlineColorSwatch,
  },
  {
    title: "Founder or Team Information",
    description:
      "Leadership information, team bios, and official company background when available.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Press Contact",
    description:
      "The correct contact information for media inquiries and partnership requests.",
    icon: HiOutlineMail,
  },
] as const;
