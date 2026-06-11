"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { ComingSoonTitle } from "@/components/new-releases/new-releases-data";

type ComingSoonCardProps = {
  title: ComingSoonTitle;
};

export function ComingSoonCard({ title }: ComingSoonCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group flex h-full flex-col rounded-2xl border border-dashed border-line/80 bg-paper/80 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-green/35 hover:shadow-[0_20px_60px_-32px_rgba(133,199,39,0.15)] sm:p-7"
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
    >
      <span className="w-fit rounded-full border border-line/80 bg-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
        {title.status}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
        {title.title}
      </h3>
      <p className="mt-2 text-sm font-medium text-muted">{title.category}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
        This title is being prepared for the Leaf Publisher library. Preview access
        will open once files and permissions are ready.
      </p>
    </motion.article>
  );
}
