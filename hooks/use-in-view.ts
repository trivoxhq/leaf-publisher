"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
  /** Fire once when visible, then stop observing (cheaper for below-fold sections). */
  once?: boolean;
};

/**
 * Lightweight visibility hook — pause carousels / marquees when off-screen.
 */
export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {}
) {
  const { rootMargin = "120px 0px", threshold = 0, once = false } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (once && visible) observer.disconnect();
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, inView };
}
