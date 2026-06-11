import type { IconType } from "react-icons";
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineChatAlt2,
  HiOutlineClipboardCheck,
  HiOutlineColorSwatch,
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlinePencil,
  HiOutlinePhotograph,
  HiOutlineSparkles,
  HiOutlineTemplate,
  HiOutlineUserGroup,
} from "react-icons/hi";

export const FOR_AUTHORS_PAGE_IDS = {
  services: "author-services",
} as const;

export type PainPointCard = {
  title: string;
  description: string;
  icon: IconType;
};

export const PAIN_POINTS: readonly PainPointCard[] = [
  {
    title: "Unclear Structure",
    description:
      "You know the idea, but the chapters, flow, and message still need direction.",
    icon: HiOutlineDocumentText,
  },
  {
    title: "Rough Manuscript",
    description:
      "Your draft has potential, but it needs editing, clarity, and stronger readability.",
    icon: HiOutlinePencil,
  },
  {
    title: "Design Confusion",
    description:
      "Cover design, interior layout, and formatting can feel technical and time-consuming.",
    icon: HiOutlineColorSwatch,
  },
  {
    title: "Publishing Uncertainty",
    description:
      "You want to publish professionally, but you are unsure about files, platforms, or next steps.",
    icon: HiOutlineLightBulb,
  },
] as const;

export type AuthorService = {
  title: string;
  description: string;
  icon: IconType;
};

export const AUTHOR_SERVICES: readonly AuthorService[] = [
  {
    title: "Ebook Writing",
    description:
      "We help turn your idea, outline, notes, or topic into a clear and engaging ebook written around your voice, audience, and goals.",
    icon: HiOutlinePencil,
  },
  {
    title: "Editing & Proofreading",
    description:
      "We refine grammar, sentence flow, structure, tone, clarity, and readability so your manuscript feels polished and professional.",
    icon: HiOutlineClipboardCheck,
  },
  {
    title: "Book Formatting",
    description:
      "We prepare clean ebook layouts and digital-ready files that are easier to read across devices and publishing platforms.",
    icon: HiOutlineTemplate,
  },
  {
    title: "Cover Design",
    description:
      "We create professional ebook cover concepts that reflect your genre, message, and target audience.",
    icon: HiOutlinePhotograph,
  },
  {
    title: "Publishing Support",
    description:
      "We help prepare your ebook for publishing with guidance on files, presentation, categories, descriptions, and launch readiness.",
    icon: HiOutlineBookOpen,
  },
  {
    title: "Author Branding",
    description:
      "We support authors with positioning, book descriptions, author bios, and content direction to create a stronger online presence.",
    icon: HiOutlineSparkles,
  },
] as const;

export type ProcessStep = {
  title: string;
  description: string;
};

export const AUTHOR_PROCESS: readonly ProcessStep[] = [
  {
    title: "Share Your Idea",
    description:
      "Tell us about your book idea, manuscript, goals, audience, and the support you need.",
  },
  {
    title: "Plan the Direction",
    description:
      "We help define the structure, tone, chapters, service scope, and creative direction.",
  },
  {
    title: "Create and Refine",
    description:
      "Our team works on writing, editing, formatting, design, or publishing preparation based on your project.",
  },
  {
    title: "Review and Improve",
    description:
      "You review the work, share feedback, and we refine the details until the ebook feels ready.",
  },
  {
    title: "Prepare for Launch",
    description:
      "We help organize the final files, presentation, and publishing guidance so your book is ready for readers.",
  },
] as const;

export type AudienceCard = {
  title: string;
  description: string;
  icon: IconType;
};

export const AUDIENCE_CARDS: readonly AudienceCard[] = [
  {
    title: "First-Time Authors",
    description:
      "For writers who have an idea but need help turning it into a complete ebook.",
    icon: HiOutlinePencil,
  },
  {
    title: "Entrepreneurs",
    description:
      "For business owners who want to turn expertise into a professional ebook or lead magnet.",
    icon: HiOutlineBriefcase,
  },
  {
    title: "Coaches & Consultants",
    description:
      "For experts who want to share frameworks, lessons, or guidance through a polished book.",
    icon: HiOutlineChatAlt2,
  },
  {
    title: "Fiction Writers",
    description:
      "For storytellers who need help refining plot, characters, structure, and presentation.",
    icon: HiOutlineBookOpen,
  },
  {
    title: "Memoir Writers",
    description:
      "For authors sharing personal stories, life lessons, transformation, or legacy projects.",
    icon: HiOutlineDocumentText,
  },
  {
    title: "Brands & Businesses",
    description:
      "For companies creating educational ebooks, guides, reports, or branded publishing content.",
    icon: HiOutlineUserGroup,
  },
] as const;

export const BOOK_TYPES = [
  "Business Ebooks",
  "Self-Help Books",
  "Memoirs",
  "Fiction",
  "Children's Books",
  "Educational Guides",
  "Workbooks",
  "Coaching Ebooks",
  "Brand Ebooks",
  "Lead Magnets",
  "How-To Guides",
  "Thought Leadership Books",
] as const;

export type WhyCard = {
  title: string;
  description: string;
  icon: IconType;
};

export const WHY_CHOOSE: readonly WhyCard[] = [
  {
    title: "Full-Service Support",
    description:
      "You do not need to manage separate writers, editors, designers, and formatting specialists. We help bring the process together.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Clear Creative Direction",
    description:
      "We help organize your ideas, strengthen your message, and shape your ebook around the audience you want to reach.",
    icon: HiOutlineLightBulb,
  },
  {
    title: "Professional Presentation",
    description:
      "From content to cover design, your ebook should look and feel polished before it reaches readers.",
    icon: HiOutlineColorSwatch,
  },
  {
    title: "Author-Friendly Process",
    description:
      "We keep the process simple, supportive, and easy to understand from first contact to final delivery.",
    icon: HiOutlineAcademicCap,
  },
] as const;

export const BEFORE_POINTS = [
  "Scattered notes or unfinished ideas",
  "Unclear chapters and structure",
  "Drafts needing editing and polish",
  "Confusing formatting requirements",
  "No clear publishing direction",
] as const;

export const AFTER_POINTS = [
  "Clear ebook structure",
  "Refined manuscript",
  "Professional formatting",
  "Stronger cover and presentation",
  "Publishing-ready direction",
] as const;

export type GuidanceCard = {
  title: string;
  description: string;
};

export const GUIDANCE_CARDS: readonly GuidanceCard[] = [
  {
    title: "Book Positioning",
    description: "Clarify who your book is for and how it should be presented.",
  },
  {
    title: "Content Structure",
    description: "Organize ideas into chapters, sections, and a smoother reading flow.",
  },
  {
    title: "Launch Preparation",
    description:
      "Prepare the final ebook files, description, and publishing assets with more confidence.",
  },
] as const;

export type AuthorFaq = {
  id: string;
  question: string;
  answer: string;
};

export const AUTHOR_FAQS: readonly AuthorFaq[] = [
  {
    id: "write-from-scratch",
    question: "Can Leaf Publisher write my ebook from scratch?",
    answer:
      "Yes. We can help develop your idea into an outline, structure chapters, and write content based on your goals, audience, and preferred direction.",
  },
  {
    id: "edit-manuscript",
    question: "Can you edit a manuscript I already wrote?",
    answer:
      "Yes. We can edit and proofread existing manuscripts for grammar, clarity, structure, tone, flow, and readability.",
  },
  {
    id: "cover-design",
    question: "Do you design ebook covers?",
    answer:
      "Yes. Leaf Publisher can help create professional ebook cover designs that match your genre, message, and target readers.",
  },
  {
    id: "format-ebook",
    question: "Can you format my ebook for publishing?",
    answer:
      "Yes. We can prepare clean ebook formatting and digital-ready files based on the publishing direction and platform requirements.",
  },
  {
    id: "timeline",
    question: "How long does the process take?",
    answer:
      "Timelines depend on the book length, project complexity, service type, and revision needs. Once we review your requirements, we can provide a clearer estimate.",
  },
  {
    id: "rights",
    question: "Do I keep the rights to my book?",
    answer:
      "The author should retain ownership of their original ideas and final book content unless a separate written agreement says otherwise. Add final ownership terms based on the company's official policy.",
  },
] as const;

export const HERO_TIMELINE_STEPS = [
  { label: "Idea", status: "done" },
  { label: "Draft", status: "active" },
  { label: "Design", status: "upcoming" },
  { label: "Launch", status: "upcoming" },
] as const;

export const HERO_BOOK_COVERS = [
  { title: "Earning Seven Figures", coverSrc: "/e-books/demo-ebook4.jpg" },
  { title: "The Quiet Strategy", coverSrc: "/e-books/demo-ebook1.png" },
  { title: "The Focus Habit", coverSrc: "/e-books/demo-ebook2.png" },
  { title: "Learning Made Simple", coverSrc: "/e-books/demo-ebook3.png" },
  { title: "Pages of Becoming", coverSrc: "/e-books/demo-ebook5.jpg" },
] as const;
