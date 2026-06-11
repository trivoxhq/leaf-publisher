import type { IconType } from "react-icons";
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineChatAlt2,
  HiOutlineHeart,
  HiOutlinePencil,
  HiOutlineSparkles,
} from "react-icons/hi";

export const GIFT_CARDS_PAGE_IDS = {
  options: "gift-card-options",
  process: "gift-card-process",
  form: "gift-card-form",
} as const;

export type GiftCardOption = {
  id: string;
  title: string;
  amount: string;
  description: string;
  buttonLabel: string;
  featured?: boolean;
};

export const GIFT_CARD_OPTIONS: readonly GiftCardOption[] = [
  {
    id: "starter",
    title: "Starter Gift Card",
    amount: "$50",
    description:
      "A simple way to help someone begin their ebook journey, book consultation, or early planning.",
    buttonLabel: "Select Gift Card",
  },
  {
    id: "creative",
    title: "Creative Support Gift Card",
    amount: "$100",
    description:
      "Perfect for authors who need help with editing, formatting, content planning, or design direction.",
    buttonLabel: "Select Gift Card",
    featured: true,
  },
  {
    id: "author-boost",
    title: "Author Boost Gift Card",
    amount: "$250",
    description:
      "A meaningful gift for someone preparing to write, refine, or professionally present their ebook.",
    buttonLabel: "Select Gift Card",
  },
  {
    id: "custom",
    title: "Custom Gift Card",
    amount: "Custom",
    description:
      "Choose a flexible gift amount based on the author's needs, service package, or project scope.",
    buttonLabel: "Request Custom Card",
  },
] as const;

export type GiftCardAudience = {
  title: string;
  description: string;
  icon: IconType;
};

export const GIFT_CARD_AUDIENCES: readonly GiftCardAudience[] = [
  {
    title: "Aspiring Authors",
    description:
      "For someone who keeps talking about writing a book but needs help getting started.",
    icon: HiOutlinePencil,
  },
  {
    title: "Entrepreneurs",
    description:
      "For business owners who want to turn their knowledge into an ebook, guide, or lead magnet.",
    icon: HiOutlineBriefcase,
  },
  {
    title: "Students & Educators",
    description:
      "For people creating educational content, study guides, workbooks, or learning material.",
    icon: HiOutlineAcademicCap,
  },
  {
    title: "Memoir Writers",
    description:
      "For someone ready to share their personal story, life lessons, or family legacy.",
    icon: HiOutlineHeart,
  },
  {
    title: "Coaches & Consultants",
    description:
      "For experts who want to package their methods, frameworks, or advice into a polished ebook.",
    icon: HiOutlineChatAlt2,
  },
  {
    title: "Creative Writers",
    description:
      "For storytellers working on fiction, children's books, poetry, or imaginative book ideas.",
    icon: HiOutlineSparkles,
  },
] as const;

export type GiftCardProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const GIFT_CARD_PROCESS: readonly GiftCardProcessStep[] = [
  {
    step: 1,
    title: "Choose a Gift Amount",
    description:
      "Pick a preset gift card amount or request a custom value based on the service you want to support.",
  },
  {
    step: 2,
    title: "Add Recipient Details",
    description:
      "Share the recipient's name, email, and optional message so the gift feels personal.",
  },
  {
    step: 3,
    title: "Send or Schedule the Gift",
    description:
      "The gift card can be sent digitally or prepared for delivery based on the available setup.",
  },
  {
    step: 4,
    title: "Redeem for Services",
    description:
      "The recipient can use the gift card toward eligible Leaf Publisher services such as writing, editing, formatting, design, or publishing support.",
  },
] as const;

export const GIFT_CARD_SERVICES: readonly string[] = [
  "Ebook writing support",
  "Manuscript editing",
  "Proofreading",
  "Ebook formatting",
  "Cover design",
  "Publishing guidance",
  "Book description writing",
  "Author bio writing",
  "Content planning",
  "Book consultation",
  "Launch preparation",
  "Author branding support",
] as const;

export const GIFT_CARD_AMOUNT_OPTIONS = ["$50", "$100", "$250", "Custom Amount"] as const;

export const GIFT_CARD_OCCASIONS = [
  "Birthday",
  "Graduation",
  "Book Launch",
  "Business Gift",
  "Holiday",
  "Just Because",
  "Other",
] as const;

export const GIFT_CARD_TERMS: readonly string[] = [
  "Gift cards can be used toward eligible Leaf Publisher services.",
  "Gift cards are not redeemable for cash unless required by law.",
  "Gift card balance, expiry, and usage rules should be confirmed by the final business policy.",
  "Custom gift card amounts may require team confirmation.",
  "Services may vary depending on project scope and availability.",
  "Final gift card terms should be reviewed and approved before launch.",
] as const;

export type GiftCardFaq = {
  id: string;
  question: string;
  answer: string;
};

export const GIFT_CARD_FAQS: readonly GiftCardFaq[] = [
  {
    id: "write-a-book",
    question: "Can I buy a gift card for someone who wants to write a book?",
    answer:
      "Yes. A Leaf Publisher gift card can help support writing, editing, formatting, design, or publishing preparation depending on the recipient's needs.",
  },
  {
    id: "choose-service",
    question: "Can the recipient choose which service to use it for?",
    answer:
      "Yes, the recipient can discuss their project with Leaf Publisher and apply the gift card toward eligible services.",
  },
  {
    id: "custom-amount",
    question: "Can I choose a custom amount?",
    answer:
      "Yes. You can request a custom gift card amount based on your budget or the type of ebook support you want to gift.",
  },
  {
    id: "digital-delivery",
    question: "Are gift cards delivered digitally?",
    answer:
      "Gift cards can be prepared for digital delivery if that option is supported. Final delivery method should be updated based on the website's actual setup.",
  },
  {
    id: "expiry",
    question: "Do gift cards expire?",
    answer:
      "Expiration rules should follow the final company policy and applicable laws. Keep this answer editable until the official policy is confirmed.",
  },
  {
    id: "which-card",
    question: "What if I am not sure which gift card to choose?",
    answer:
      "You can contact Leaf Publisher and our team can help recommend a suitable option based on the recipient's book idea or publishing goal.",
  },
] as const;

/** Preview copy for the personalized gift card UI mockup. */
export const GIFT_CARD_PREVIEW = {
  to: "[Recipient Name]",
  message:
    "Your story deserves to be shared. Here is a little support to help you begin.",
  from: "[Your Name]",
} as const;
