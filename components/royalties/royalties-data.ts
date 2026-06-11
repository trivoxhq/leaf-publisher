/**
 * Royalties page configuration — update rates, examples, and copy here.
 *
 * NOTE: Final royalty terms should be reviewed and approved by the business
 * owner or legal advisor before launch.
 */

export const ROYALTIES_PAGE_IDS = {
  explanation: "royalties-explanation",
} as const;

export type RoyaltyInfoCard = {
  title: string;
  description: string;
};

export const ROYALTY_EXPLANATION_CARDS: readonly RoyaltyInfoCard[] = [
  {
    title: "Book Price",
    description:
      "The sale price of your ebook affects the potential royalty amount and may vary by platform or promotion.",
  },
  {
    title: "Platform Fees",
    description:
      "Retailers, marketplaces, payment processors, or distribution platforms may deduct fees before royalties are calculated.",
  },
  {
    title: "Royalty Rate",
    description:
      "The royalty percentage depends on the publishing platform, agreement type, territory, and distribution model.",
  },
  {
    title: "Payout Timeline",
    description:
      "Payments are usually released according to the platform or service provider's payout schedule.",
  },
] as const;

export const ROYALTY_MODEL_CARDS: readonly RoyaltyInfoCard[] = [
  {
    title: "Direct Platform Royalties",
    description:
      "If your ebook is published directly on a platform, royalties are usually calculated based on that platform's pricing rules, fees, and payout schedule.",
  },
  {
    title: "Distribution Royalties",
    description:
      "If a distributor is used, the distributor may collect payments from multiple stores and apply its own terms before sending author earnings.",
  },
  {
    title: "Service-Based Publishing Support",
    description:
      "If Leaf Publisher provides writing, editing, formatting, cover design, or publishing preparation services, royalty ownership and earnings terms should follow the final agreement with the author.",
  },
] as const;

export const LEAF_PUBLISHER_ROLE_CARDS: readonly RoyaltyInfoCard[] = [
  {
    title: "Pricing Guidance",
    description:
      "We help authors think through pricing based on book type, audience, category, and publishing goals.",
  },
  {
    title: "Platform Preparation",
    description:
      "We help prepare ebook files, descriptions, categories, and presentation details for publishing readiness.",
  },
  {
    title: "Clear Expectations",
    description:
      "We explain the difference between sales price, fees, royalty rates, and estimated author earnings.",
  },
  {
    title: "Author Ownership Clarity",
    description:
      "Ownership, usage rights, and royalty terms should be clearly defined before publishing begins.",
  },
] as const;

export type PayoutStep = {
  step: number;
  title: string;
  description: string;
};

export const PAYOUT_STEPS: readonly PayoutStep[] = [
  {
    step: 1,
    title: "Reader Purchases the Ebook",
    description:
      "A reader buys the ebook through a marketplace, platform, website, or approved sales channel.",
  },
  {
    step: 2,
    title: "Platform Processes the Sale",
    description:
      "The platform or payment provider processes the transaction and applies any required fees.",
  },
  {
    step: 3,
    title: "Royalty Is Calculated",
    description:
      "The royalty amount is calculated based on the sale price, applicable fees, and royalty rate.",
  },
  {
    step: 4,
    title: "Reporting Becomes Available",
    description:
      "Sales and earnings reports may become available through the publishing platform or distribution system.",
  },
  {
    step: 5,
    title: "Author Receives Payment",
    description:
      "Payouts are sent according to the platform, distributor, or agreement's payment schedule.",
  },
] as const;

export const TRANSPARENCY_CARDS: readonly RoyaltyInfoCard[] = [
  {
    title: "No Hidden Promises",
    description:
      "We avoid unrealistic income claims and focus on clear publishing guidance.",
  },
  {
    title: "Editable Terms",
    description:
      "Royalty rates, payment timelines, and platform details should be updated based on final business terms.",
  },
  {
    title: "Author Confidence",
    description:
      "Clear information helps authors make smarter decisions about publishing, pricing, and promotion.",
  },
] as const;

/** Sample example values for the breakdown section — illustrative only. */
export const EXAMPLE_BREAKDOWN = {
  salePrice: 9.99,
  platformFeePercent: 30,
  royaltyPercent: 70,
  currency: "$",
} as const;

export function computeExampleBreakdown(
  salePrice: number,
  platformFeePercent: number,
  royaltyPercent: number
) {
  const remaining = salePrice * (1 - platformFeePercent / 100);
  const authorRoyalty = remaining * (royaltyPercent / 100);
  return {
    remaining,
    authorRoyalty,
    platformFeeAmount: salePrice * (platformFeePercent / 100),
  };
}

export const AUTHOR_RIGHTS_CHECKLIST: readonly string[] = [
  "Confirm who owns the final manuscript and book files",
  "Confirm whether royalties go directly to the author or through a platform",
  "Confirm how payments, fees, and reports are handled",
  "Confirm all rights and usage terms in writing before launch",
] as const;

export type RoyaltyFaq = {
  id: string;
  question: string;
  answer: string;
};

export const ROYALTY_FAQS: readonly RoyaltyFaq[] = [
  {
    id: "what-are",
    question: "What are ebook royalties?",
    answer:
      "Ebook royalties are the earnings an author receives from ebook sales after applicable platform fees, payment processing costs, distribution fees, taxes, refunds, or other deductions.",
  },
  {
    id: "guarantee",
    question: "Does Leaf Publisher guarantee royalties?",
    answer:
      "No. Royalties depend on book sales, pricing, platform rules, fees, market demand, promotion, and final publishing terms. Leaf Publisher should not guarantee income or sales results.",
  },
  {
    id: "who-sets-rate",
    question: "Who sets the royalty rate?",
    answer:
      "Royalty rates are usually determined by the publishing platform, distributor, sales channel, or final agreement between the author and service provider.",
  },
  {
    id: "pricing-help",
    question: "Can Leaf Publisher help me choose a price for my ebook?",
    answer:
      "Yes. Leaf Publisher can help authors think through pricing based on book type, audience, category, positioning, and publishing goals.",
  },
  {
    id: "when-paid",
    question: "When do authors receive royalty payments?",
    answer:
      "Payout timelines depend on the platform, distributor, payment provider, or final agreement. Some platforms pay monthly or after a specific reporting period.",
  },
  {
    id: "ownership",
    question: "Do I keep ownership of my ebook?",
    answer:
      "Ownership should be defined in the final service agreement. In general, authors should confirm rights, royalties, usage permissions, and file ownership before publishing.",
  },
  {
    id: "track-sales",
    question: "Can I track my book sales?",
    answer:
      "Sales tracking depends on the publishing platform, store, distributor, or reporting system used. Leaf Publisher can help explain what reporting options may be available.",
  },
] as const;

export const CALCULATOR_DISCLAIMER =
  "This calculator provides an estimate only. Actual earnings depend on the publishing platform, pricing, taxes, fees, territories, refunds, and final agreement terms.";

export const EXAMPLE_BREAKDOWN_NOTE =
  "This is only a sample calculation for explanation purposes. Actual royalty rates, fees, deductions, taxes, refunds, and payouts depend on the publishing platform and final agreement.";
