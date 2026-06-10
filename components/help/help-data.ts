import type { IconType } from "react-icons";
import {
  HiOutlineBookOpen,
  HiOutlineClipboardCheck,
  HiOutlineCreditCard,
  HiOutlinePencil,
  HiOutlinePlay,
  HiOutlineTemplate,
} from "react-icons/hi";

/** Editable help centre content — update support email and copy here. */
export const HELP_CONFIG = {
  supportEmail: "support@leafpublisher.com",
} as const;

export type HelpTopic = {
  title: string;
  description: string;
  icon: IconType;
};

export const HELP_TOPICS: readonly HelpTopic[] = [
  {
    title: "Getting Started",
    description:
      "Learn how to begin your ebook project and share your requirements with our team.",
    icon: HiOutlinePlay,
  },
  {
    title: "Writing Services",
    description:
      "Understand how our ebook writing process works, from idea development to final draft.",
    icon: HiOutlinePencil,
  },
  {
    title: "Editing & Proofreading",
    description:
      "Find out how we refine grammar, structure, clarity, tone, and readability.",
    icon: HiOutlineClipboardCheck,
  },
  {
    title: "Design & Formatting",
    description:
      "Learn about ebook layout, formatting, cover design, and digital publishing files.",
    icon: HiOutlineTemplate,
  },
  {
    title: "Payments & Packages",
    description:
      "Get information about service packages, payment steps, and project estimates.",
    icon: HiOutlineCreditCard,
  },
  {
    title: "Publishing Support",
    description:
      "Understand how Leaf Publisher helps prepare your ebook for launch and distribution.",
    icon: HiOutlineBookOpen,
  },
] as const;

export type HelpFaq = {
  id: string;
  question: string;
  answer: string;
};

export const HELP_FAQS: readonly HelpFaq[] = [
  {
    id: "start-project",
    question: "How do I start a project with Leaf Publisher?",
    answer:
      "You can start by contacting us through the contact page and sharing your book idea, manuscript, or publishing goals. Our team will review your requirements and guide you toward the right service.",
  },
  {
    id: "write-from-scratch",
    question: "Can Leaf Publisher write my ebook from scratch?",
    answer:
      "Yes. Leaf Publisher can help with ebook writing from the initial idea stage, outline, chapter development, editing, formatting, and final publishing preparation.",
  },
  {
    id: "edit-manuscript",
    question: "Do you also edit existing manuscripts?",
    answer:
      "Yes. If you already have a manuscript, we can help improve grammar, structure, clarity, flow, tone, and overall readability.",
  },
  {
    id: "cover-layout",
    question: "Can you design the ebook cover and layout?",
    answer:
      "Yes. We can support ebook cover design, interior formatting, layout preparation, and digital file setup based on your publishing needs.",
  },
  {
    id: "project-timeline",
    question: "How long does an ebook project take?",
    answer:
      "Timelines depend on the length, complexity, service type, and revision needs of the project. Once we review your requirements, we can provide a clearer estimate.",
  },
  {
    id: "contact-support",
    question: "How can I contact support?",
    answer:
      "You can contact Leaf Publisher through the contact page or email our support team at support@leafpublisher.com.",
  },
] as const;
