/**
 * Privacy Policy configuration — update company details, providers, and dates here.
 *
 * NOTE: The final Privacy Policy should be reviewed by the business owner
 * or a qualified legal advisor before public launch.
 */

export const PRIVACY_POLICY_CONFIG = {
  companyName: "Leaf Publisher",
  lastUpdated: "June 11, 2026",
  contactEmail: "support@leafpublisher.com",

  /** Hosting — Leaf Publisher uses Next.js deployed on Vercel. */
  hosting: {
    provider: "Vercel",
    description:
      "Our website is hosted using Vercel and related web infrastructure services.",
  },

  /**
   * Payment gateway — set `provider` when confirmed (e.g. "Stripe").
   * Leave null to show placeholder wording until a gateway is chosen.
   */
  payment: {
    provider: null as "Stripe" | null,
    placeholderNote:
      "The payment provider name should be updated once the final payment gateway is confirmed.",
    stripeNote:
      "If payments are processed through Stripe, your payment information is handled according to Stripe's privacy and security practices.",
  },

  /**
   * Analytics — set `provider` when tracking is installed (e.g. "Google Analytics").
   * Leave null to show placeholder wording until tools are confirmed.
   */
  analytics: {
    provider: null as "Google Analytics" | null,
    placeholderNote:
      "Analytics provider details should be updated once the final tracking tools are confirmed.",
    googleAnalyticsNote:
      "We may use Google Analytics to better understand website visits and page activity.",
  },
} as const;

export type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: readonly string[];
  /** Optional trailing paragraph after bullets (e.g. cookies browser note). */
  closingParagraph?: string;
  showContactEmail?: boolean;
  closingText?: string;
};
