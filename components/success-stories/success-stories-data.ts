/**
 * Success Stories page configuration — update with approved client stories only.
 *
 * NOTE: Only add real names, photos, testimonials, sales results, or rankings
 * after client approval. Until then, keep example/sample labels visible.
 */

export const SUCCESS_STORIES_PAGE_IDS = {
  stories: "success-stories-featured",
} as const;

export type InfoCard = {
  title: string;
  description: string;
};

export const SUCCESS_SNAPSHOT_CARDS: readonly InfoCard[] = [
  {
    title: "From Idea to Outline",
    description:
      "Helping authors organize scattered thoughts into a clear book structure.",
  },
  {
    title: "From Draft to Polished Manuscript",
    description:
      "Improving grammar, flow, tone, clarity, and readability through editing support.",
  },
  {
    title: "From Document to Designed Ebook",
    description:
      "Transforming plain manuscripts into formatted, professional digital books.",
  },
  {
    title: "From Uncertainty to Publishing Direction",
    description:
      "Guiding authors through categories, descriptions, file preparation, and launch readiness.",
  },
] as const;

export type FeaturedStory = {
  id: string;
  label: string;
  title: string;
  authorType: string;
  challenge: string;
  solution: string;
  outcome: string;
  buttonLabel: string;
};

export const FEATURED_STORIES: readonly FeaturedStory[] = [
  {
    id: "first-time-author",
    label: "Example Author Journey",
    title: "The First-Time Author Who Needed Structure",
    authorType: "First-Time Author",
    challenge:
      "The author had a strong book idea but no clear chapter structure, writing plan, or publishing direction.",
    solution:
      "Leaf Publisher helped shape the idea into a structured outline, developed a clear chapter flow, refined the message, and prepared the book for the next writing stage.",
    outcome:
      "The author moved from uncertainty to a clear ebook plan with organized chapters, a stronger concept, and a practical path forward.",
    buttonLabel: "Start a Similar Journey",
  },
  {
    id: "entrepreneur",
    label: "Example Author Journey",
    title: "The Entrepreneur Turning Expertise Into an Ebook",
    authorType: "Business Owner",
    challenge:
      "The author had years of knowledge but needed help turning that expertise into a professional ebook for their audience.",
    solution:
      "Leaf Publisher helped organize the content, refine the tone, create a practical structure, and prepare the ebook for a business-focused reader experience.",
    outcome:
      "The idea became a clear, useful ebook concept that could support authority, education, and brand growth.",
    buttonLabel: "Create My Business Ebook",
  },
  {
    id: "manuscript-finish",
    label: "Example Author Journey",
    title: "The Manuscript That Needed a Professional Finish",
    authorType: "Independent Writer",
    challenge:
      "The author already had a draft, but it needed editing, formatting, design direction, and publishing preparation.",
    solution:
      "Leaf Publisher supported editing, improved readability, prepared clean formatting, and guided the author toward a stronger final presentation.",
    outcome:
      "The manuscript became more polished, organized, and ready for reader-facing presentation.",
    buttonLabel: "Polish My Manuscript",
  },
] as const;

export const BEFORE_POINTS = [
  "Scattered notes and unfinished ideas",
  "Unclear chapter flow",
  "Rough manuscript structure",
  "Grammar and readability issues",
  "Plain document with no design direction",
  "Confusion around publishing steps",
] as const;

export const AFTER_POINTS = [
  "Clear ebook structure",
  "Stronger message and reader focus",
  "Polished manuscript",
  "Professional formatting direction",
  "Cover and design clarity",
  "Better publishing preparation",
] as const;

export const STORY_CATEGORIES: readonly InfoCard[] = [
  {
    title: "First-Time Authors",
    description:
      "For writers who need help moving from idea to complete ebook direction.",
  },
  {
    title: "Entrepreneurs",
    description:
      "For business owners turning expertise, frameworks, or services into digital books.",
  },
  {
    title: "Coaches & Consultants",
    description:
      "For experts creating guides, workbooks, or thought leadership ebooks.",
  },
  {
    title: "Memoir Writers",
    description:
      "For people sharing personal journeys, lessons, transformation, or legacy stories.",
  },
  {
    title: "Creative Writers",
    description:
      "For fiction, children's books, poetry, and imaginative storytelling projects.",
  },
  {
    title: "Brands & Businesses",
    description:
      "For companies creating educational ebooks, lead magnets, reports, or branded guides.",
  },
] as const;

export type ProcessStep = {
  title: string;
  description: string;
};

export const SUCCESS_PROCESS_STEPS: readonly ProcessStep[] = [
  {
    title: "Listen to the Author",
    description:
      "We understand the idea, purpose, audience, and current stage of the book.",
  },
  {
    title: "Shape the Direction",
    description:
      "We help define the structure, tone, category, message, and creative path.",
  },
  {
    title: "Create and Refine",
    description:
      "Writing, editing, formatting, design, or publishing support begins based on the project needs.",
  },
  {
    title: "Review and Improve",
    description:
      "The author reviews progress and shares feedback so the book keeps moving in the right direction.",
  },
  {
    title: "Prepare for Readers",
    description:
      "The final book is organized, polished, and prepared for publishing or presentation.",
  },
] as const;

export const TRUST_CARDS: readonly InfoCard[] = [
  {
    title: "No Fake Testimonials",
    description: "Only approved client feedback should be shown on this page.",
  },
  {
    title: "No Fake Earnings",
    description:
      "Sales, royalties, rankings, or revenue should never be claimed without real proof.",
  },
  {
    title: "Honest Author Journeys",
    description:
      "Case studies should clearly explain the challenge, support provided, and realistic outcome.",
  },
] as const;

export const TESTIMONIAL_PLACEHOLDER = {
  label: "Coming Soon",
  text: "Approved author testimonials and client feedback will appear here once real stories are available.",
} as const;

export const CASE_STUDY_TEMPLATE = {
  title: "[Author or Book Journey Title]",
  authorType: "[First-Time Author / Entrepreneur / Memoir Writer / Business Owner]",
  challenge: "What problem did the author face before Leaf Publisher?",
  support: "Which services helped them move forward?",
  result: "What changed after the project was completed?",
  cta: "Create Your Success Story",
} as const;

export type SuccessFaq = {
  id: string;
  question: string;
  answer: string;
};

export const SUCCESS_FAQS: readonly SuccessFaq[] = [
  {
    id: "real-stories",
    question: "Are these real client stories?",
    answer:
      "Only approved real client stories should be presented as real. Until then, this page can use clearly labeled example journeys or coming soon placeholders.",
  },
  {
    id: "first-time",
    question: "Can Leaf Publisher help first-time authors?",
    answer:
      "Yes. Leaf Publisher can help first-time authors with book planning, writing, editing, formatting, cover design, and publishing preparation.",
  },
  {
    id: "submit-story",
    question: "Can I submit my own success story?",
    answer:
      "Yes. Once your project is complete, you can contact Leaf Publisher to discuss whether your story can be featured with your approval.",
  },
  {
    id: "bestseller",
    question: "Do you guarantee bestseller results?",
    answer:
      "No. Leaf Publisher does not guarantee bestseller status, sales, royalties, rankings, or income. We focus on professional ebook creation and publishing support.",
  },
  {
    id: "expect-results",
    question: "What kind of results can authors expect?",
    answer:
      "Results depend on the author's goals and project scope. Common outcomes may include clearer structure, improved writing, stronger presentation, better formatting, and publishing-ready direction.",
  },
  {
    id: "business",
    question: "Can businesses use Leaf Publisher for ebooks?",
    answer:
      "Yes. Leaf Publisher can support businesses with guides, lead magnets, educational ebooks, branded content, and thought leadership books.",
  },
] as const;
