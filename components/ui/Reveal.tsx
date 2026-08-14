"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds, for items in a grid or list. */
  delay?: number;
};

/**
 * Reveals content on first scroll into view.
 *
 * Deliberately small: one IntersectionObserver per element, disconnected after
 * the first intersection, no animation library, no layout thrash. Users who ask
 * their OS to reduce motion get the content immediately (checked here as well
 * as in CSS), and the hidden starting state only applies once the root layout's
 * inline script has confirmed scripting works — see `html.js` in globals.css.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A document that is not being rendered — a background tab, a prerender —
    // never runs intersection checks. Show the content rather than gamble the
    // page's visibility on an observer that may not report in time.
    const isRendered = document.visibilityState === "visible";

    if (prefersReducedMotion || !isRendered || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", isVisible && "reveal-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
