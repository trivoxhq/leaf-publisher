"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useGetStartedModal } from "@/components/get-started/get-started-modal";

type GetStartedButtonProps = {
  children: ReactNode;
  className?: string;
  plan?: string;
  type?: "button" | "submit";
  /** Called after the modal opens (e.g. close mobile menu). */
  onActivate?: () => void;
};

function wrapperWidthClass(className: string): string | undefined {
  const hasFull = /\bw-full\b/.test(className);
  const hasSmAuto = /\bsm:w-auto\b/.test(className);
  if (hasFull && hasSmAuto) return "w-full sm:w-auto";
  if (hasFull) return "w-full";
  return undefined;
}

/** Primary CTA — opens the Get Started form modal. */
export function GetStartedButton({
  children,
  className = "",
  plan,
  type = "button",
  onActivate,
}: GetStartedButtonProps) {
  const reduce = useReducedMotion();
  const { openModal } = useGetStartedModal();

  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={wrapperWidthClass(className)}
    >
      <button
        type={type}
        onClick={() => {
          openModal(plan ? { plan } : undefined);
          onActivate?.();
        }}
        className={className}
      >
        {children}
      </button>
    </motion.div>
  );
}
