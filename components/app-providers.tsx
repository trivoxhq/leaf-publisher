"use client";

import type { ReactNode } from "react";

import { GetStartedModalProvider } from "@/components/get-started/get-started-modal";

export function AppProviders({ children }: { children: ReactNode }) {
  return <GetStartedModalProvider>{children}</GetStartedModalProvider>;
}
