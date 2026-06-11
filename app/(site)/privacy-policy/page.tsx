import type { Metadata } from "next";

import { PrivacyPolicyPage } from "@/components/legal/privacy-policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Leaf Publisher",
  description:
    "Read the Leaf Publisher Privacy Policy to learn how we collect, use, protect, and manage your personal information when you use our website and services.",
};

export default function PrivacyPolicyRoute() {
  return (
    <div className="flex min-h-full min-w-0 flex-1 flex-col overflow-x-clip bg-paper font-sans text-text">
      <PrivacyPolicyPage />
    </div>
  );
}
