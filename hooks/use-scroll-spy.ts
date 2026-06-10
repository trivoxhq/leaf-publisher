"use client";

import { useEffect, useState } from "react";

type UseScrollSpyOptions = {
  /** Distance from top of viewport (px) used to determine the active section. */
  offset?: number;
};

/**
 * Tracks which section id is currently in the reading zone while scrolling.
 */
export function useScrollSpy(
  sectionIds: readonly string[],
  options: UseScrollSpyOptions = {}
) {
  const { offset = 120 } = options;
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const updateActive = () => {
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sectionIds, offset]);

  return activeId;
}
