"use client";

import Link from "next/link";
import { useCallback, useMemo } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  PRIVACY_POLICY_CONFIG,
  type PolicySection,
} from "@/components/legal/privacy-policy-data";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const EASE = [0.22, 1, 0.36, 1] as const;
const { companyName, lastUpdated, contactEmail, hosting, payment, analytics } =
  PRIVACY_POLICY_CONFIG;

function buildSections(): PolicySection[] {
  return [
    {
      id: "information-we-collect",
      title: "What Information Do We Collect?",
      paragraphs: [
        `When you interact with ${companyName}, we may collect personal information that you choose to share with us. This can include your name, email address, phone number, company name, billing details, project information, manuscript details, and any message or file you submit through our forms or communication channels.`,
        `When you browse our website, we may also automatically collect technical information such as your IP address, browser type, device type, operating system, pages visited, referring links, and general usage activity. This helps us understand how visitors use our website and how we can improve the experience.`,
        "We may collect information when you:",
      ],
      bullets: [
        "Fill out a contact form",
        "Request ebook writing, editing, design, or publishing services",
        "Subscribe to updates or marketing emails",
        "Purchase a service or package",
        "Communicate with our team",
        "Browse or interact with our website",
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      paragraphs: [
        `${companyName} uses the information we collect to provide services, respond to inquiries, process orders, improve our website, communicate project updates, and deliver a better customer experience.`,
        "We may use your information to:",
      ],
      bullets: [
        "Respond to your messages and service requests",
        "Prepare quotes, proposals, or project recommendations",
        "Process payments and service orders",
        "Manage ebook writing, editing, formatting, design, or publishing projects",
        "Send service updates and important notices",
        "Improve our website, content, and user experience",
        "Send marketing emails if you have given permission",
        "Prevent fraud, misuse, or unauthorized activity",
        "Comply with legal obligations",
      ],
    },
    {
      id: "consent",
      title: "Your Consent",
      paragraphs: [
        `When you provide personal information to complete a transaction, request a service, submit a form, or communicate with us, you consent to ${companyName} collecting and using that information for the specific purpose for which it was provided.`,
        "If we ask for your information for a secondary reason, such as email marketing, we will either ask for your direct consent or give you the option to decline.",
      ],
    },
    {
      id: "withdrawing-consent",
      title: "How to Withdraw Your Consent",
      paragraphs: [
        "You may withdraw your consent at any time. If you no longer want us to contact you, collect your information, use your information, or disclose your information where consent is required, you can contact us using the details below.",
      ],
      showContactEmail: true,
    },
    {
      id: "disclosure",
      title: "Disclosure of Your Information",
      paragraphs: [
        "We do not sell your personal information. However, we may disclose your information when required by law, when necessary to protect our rights, when enforcing our Terms of Service, or when needed to provide services through trusted third-party providers.",
        "We may share limited information with:",
      ],
      bullets: [
        "Payment processors",
        "Website hosting providers",
        "Analytics tools",
        "Email communication platforms",
        "Customer support tools",
        "Project management or file delivery systems",
        "Legal or regulatory authorities when required",
      ],
    },
    {
      id: "hosting",
      title: "Website Hosting and Data Storage",
      paragraphs: [
        `${companyName}'s website may be hosted through third-party hosting providers and modern web infrastructure services. These providers help us operate the website, store website data, and deliver a secure browsing experience.`,
        hosting.description,
        "Your information may be stored through secure servers, databases, form tools, email systems, or service platforms used to operate Leaf Publisher. We take reasonable steps to ensure that service providers handle information securely.",
      ],
    },
    {
      id: "payments",
      title: "Payments",
      paragraphs: [
        `If you purchase a service from ${companyName}, payment information may be processed by a secure third-party payment provider. We do not intentionally store full credit card details on our website.`,
        "Payment providers may collect, process, and store payment information according to their own privacy policies and security standards. These providers are responsible for handling payment card data in compliance with applicable payment industry requirements.",
        payment.provider === "Stripe"
          ? payment.stripeNote
          : payment.placeholderNote,
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      paragraphs: [
        "We may use trusted third-party services to help operate our website, manage communications, process payments, analyze website activity, deliver services, or support customer requests.",
        "These third-party providers only receive the information necessary to perform their services. Some providers may operate in different countries or jurisdictions, which means your information may be subject to the laws of those locations.",
        "We encourage users to review the privacy policies of any third-party services they interact with through our website.",
      ],
    },
    {
      id: "external-links",
      title: "External Links",
      paragraphs: [
        `Our website may contain links to third-party websites, tools, payment pages, or partner platforms. When you click a link that takes you away from ${companyName}, this Privacy Policy no longer applies.`,
        "We are not responsible for the privacy practices, content, or security of third-party websites. We recommend reviewing their privacy policies before sharing any personal information.",
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      paragraphs: [
        `${companyName} may use analytics tools to understand how visitors interact with our website. These tools may collect information such as pages visited, time spent on pages, device type, browser type, and general traffic behavior.`,
        "This information helps us improve website performance, content, navigation, and user experience.",
        analytics.provider === "Google Analytics"
          ? analytics.googleAnalyticsNote
          : analytics.placeholderNote,
      ],
    },
    {
      id: "security",
      title: "How We Protect Your Information",
      paragraphs: [
        "We take reasonable precautions and follow industry best practices to protect your personal information from unauthorized access, misuse, loss, disclosure, alteration, or destruction.",
        "Where applicable, we use secure connections, encrypted communication, access controls, trusted service providers, and other standard security measures.",
        "However, no method of internet transmission or electronic storage is completely secure. While we work to protect your information, we cannot guarantee absolute security.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      paragraphs: [
        `${companyName} may use cookies and similar technologies to improve website functionality, remember preferences, analyze traffic, prevent fraud, and enhance the browsing experience.`,
        "We may use cookies to:",
      ],
      bullets: [
        "Keep the website functioning properly",
        "Remember user preferences",
        "Improve website performance",
        "Understand visitor behavior",
        "Prevent spam, fraud, or misuse",
        "Support analytics and marketing activity",
      ],
      closingParagraph:
        "Users may choose to allow, block, or delete cookies through their browser settings. Some website features may not function properly if cookies are disabled.",
    },
    {
      id: "email-marketing",
      title: "Email Marketing",
      paragraphs: [
        `With your permission, we may send emails about ${companyName} services, updates, offers, publishing resources, or related content. You can unsubscribe from marketing emails at any time by using the unsubscribe link in the email or contacting us directly.`,
        "We will not send marketing emails without consent where consent is required by applicable law.",
      ],
    },
    {
      id: "age",
      title: "Age of Consent",
      paragraphs: [
        "By using this website, you confirm that you are at least the age of majority in your state, province, or country of residence, or that you have permission from a parent or legal guardian to use this website.",
        `${companyName} does not knowingly collect personal information from children without appropriate consent.`,
      ],
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      paragraphs: [
        `${companyName} may update this Privacy Policy from time to time. Changes will take effect immediately once posted on this page.`,
        'If we make significant changes, we may update the "Last Updated" date or provide a notice on the website. We encourage users to review this page regularly to stay informed about how we collect, use, and protect information.',
        `If ${companyName} is acquired, merged, or transferred to another business, user information may be transferred as part of that transaction so services can continue.`,
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      paragraphs: [
        "Depending on your location, you may have rights related to your personal information. These rights may include the ability to access, correct, update, delete, restrict, or request a copy of the personal information we hold about you.",
        "To make a privacy-related request, contact us using the email address below.",
      ],
    },
    {
      id: "contact",
      title: "Questions and Contact Information",
      paragraphs: [
        "If you would like to access, correct, update, delete, or ask questions about personal information we may hold about you, or if you want to make a privacy-related complaint, contact us at:",
      ],
      showContactEmail: true,
      closingText:
        "We value your trust and are committed to handling your information responsibly.",
    },
  ];
}

function DecorativeGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-green/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-green2/12 blur-3xl"
      />
    </>
  );
}

function PolicyNavLink({
  section,
  index,
  isActive,
  onNavigate,
  compact = false,
}: {
  section: PolicySection;
  index: number;
  isActive: boolean;
  onNavigate: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <li>
      <a
        href={`#${section.id}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(section.id);
        }}
        aria-current={isActive ? "location" : undefined}
        className={`group flex items-start gap-2.5 rounded-lg py-2 transition-colors ${
          compact ? "shrink-0 px-3" : "px-3 -mx-3"
        } ${isActive ? "text-text" : "text-muted hover:text-text"}`}
      >
        <span
          aria-hidden
          className={`mt-0.5 shrink-0 text-xs font-semibold tabular-nums ${
            isActive ? "text-green" : "text-muted/70"
          }`}
        >
          {index + 1}.
        </span>
        <span
          className={`text-sm leading-snug ${
            isActive ? "font-semibold text-text" : "font-medium"
          } ${compact ? "whitespace-nowrap" : ""}`}
        >
          {section.title}
        </span>
        {isActive && !compact ? (
          <span
            aria-hidden
            className="ml-auto mt-1.5 size-1.5 shrink-0 rounded-full bg-green"
          />
        ) : null}
      </a>
    </li>
  );
}

function PolicySectionCard({
  section,
  index,
}: {
  section: PolicySection;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      id={section.id}
      className="scroll-mt-28 rounded-2xl border border-line/80 bg-bg p-5 shadow-[0_12px_40px_-32px_rgba(26,34,24,0.1)] sm:p-6 lg:p-7"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.45,
        ease: EASE,
        delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.2),
      }}
    >
      <h2 className="font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
        {section.title}
      </h2>

      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
        {section.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        {section.bullets && section.bullets.length > 0 && (
          <ul className="list-disc space-y-2 pl-5 marker:text-green">
            {section.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        {section.closingParagraph ? (
          <p>{section.closingParagraph}</p>
        ) : null}

        {section.showContactEmail ? (
          <p>
            {section.id === "withdrawing-consent" ? "Contact email: " : "Email: "}
            <Link
              href={`mailto:${contactEmail}`}
              className="font-medium text-green transition-colors hover:text-green2"
            >
              {contactEmail}
            </Link>
          </p>
        ) : null}

        {section.closingText ? <p>{section.closingText}</p> : null}
      </div>
    </motion.article>
  );
}

function PolicySidebar({
  sections,
  activeId,
  onNavigate,
}: {
  sections: PolicySection[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Privacy policy table of contents"
      className="pr-2 sm:pr-4"
    >
      <h2 className="font-display text-lg font-bold tracking-tight text-text">
        On this page
      </h2>
      <ol className="mt-4 flex list-none flex-col gap-0.5 p-0">
        {sections.map((section, index) => (
          <PolicyNavLink
            key={section.id}
            section={section}
            index={index}
            isActive={activeId === section.id}
            onNavigate={onNavigate}
          />
        ))}
      </ol>
    </nav>
  );
}

export function PrivacyPolicyPage() {
  const reduceMotion = useReducedMotion();
  const sections = useMemo(() => buildSections(), []);
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const activeId = useScrollSpy(sectionIds, { offset: 140 });

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }, []);

  const softItemVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0.2 : 0.5, ease: EASE },
      },
    }),
    [reduceMotion]
  );

  const softContainerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.07,
          delayChildren: reduceMotion ? 0 : 0.05,
        },
      },
    }),
    [reduceMotion]
  );

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-linear-to-b from-paper via-bg to-bg"
        aria-labelledby="privacy-hero-heading"
      >
        <DecorativeGlow />
        <div className="container-site relative py-14 sm:py-16 lg:py-20">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={softContainerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={softItemVariants}
              className="mb-4 inline-flex items-center rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted backdrop-blur-sm sm:text-xs"
            >
              Privacy Policy
            </motion.p>

            <motion.h1
              id="privacy-hero-heading"
              variants={softItemVariants}
              className="hero-heading font-display text-[clamp(2rem,5vw+0.35rem,3.25rem)] font-bold leading-[1.08] tracking-tight text-text"
            >
              <span className="hero-heading__line block">
                Your Privacy Matters to{" "}
                <span className="hero-heading__accent">Leaf Publisher</span>
              </span>
            </motion.h1>

            <motion.p
              variants={softItemVariants}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              This Privacy Policy explains how {companyName} collects, uses,
              protects, and shares information when you visit our website,
              contact us, purchase services, or use our ebook writing, editing,
              design, formatting, and publishing support.
            </motion.p>

            <motion.p
              variants={softItemVariants}
              className="mt-5 text-sm font-medium text-muted sm:text-base"
            >
              Last Updated:{" "}
              <time dateTime={lastUpdated}>{lastUpdated}</time>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Policy sections — no cv-section here; content-visibility breaks sticky sidebar */}
      <section
        className="relative border-t border-line/80 bg-paper text-text"
        aria-label="Privacy policy sections"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/20 to-transparent"
        />
        <div className="container-site section-y">
          {/* Mobile / tablet — sticky horizontal nav */}
          <nav
            aria-label="Privacy policy sections"
            className="sticky top-[var(--nav-h)] z-30 -mx-[var(--gutter)] mb-8 border-b border-line/80 bg-paper/95 px-[var(--gutter)] py-3 backdrop-blur-md lg:hidden"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              On this page
            </p>
            <ol className="flex list-none gap-2 overflow-x-auto p-0 pb-1 scrollbar-none">
              {sections.map((section, index) => (
                <PolicyNavLink
                  key={section.id}
                  section={section}
                  index={index}
                  isActive={activeId === section.id}
                  onNavigate={scrollToSection}
                  compact
                />
              ))}
            </ol>
          </nav>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            {/* Desktop sidebar — sticky for full scroll length of content column */}
            <aside className="hidden lg:col-span-4 lg:block lg:sticky lg:top-[calc(var(--nav-h)+1.25rem)] lg:max-h-[calc(100vh-var(--nav-h)-2.5rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain lg:scrollbar-none xl:col-span-3">
              <PolicySidebar
                sections={sections}
                activeId={activeId}
                onNavigate={scrollToSection}
              />
            </aside>

            {/* Policy content */}
            <div className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-span-8 xl:col-span-9">
              {sections.map((section, index) => (
                <PolicySectionCard
                  key={section.id}
                  section={section}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
