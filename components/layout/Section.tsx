import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  white: "bg-white text-brand-900",
  canvas: "bg-canvas text-brand-900",
  muted: "bg-muted text-brand-900",
  /** `on-dark` switches the global focus ring to a light colour. */
  dark: "on-dark bg-brand-950 text-brand-100",
  brand: "on-dark bg-brand-900 text-brand-100",
} as const;

const spacing = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
} as const;

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
  spacing?: keyof typeof spacing;
  /** Renders an id for in-page anchors and skip links. */
  id?: string;
  /** Accessible name for the region when the heading is not descriptive. */
  ariaLabelledby?: string;
};

/** Vertical rhythm primitive. Section padding is defined once, here. */
export function Section({
  children,
  className,
  tone = "white",
  spacing: space = "md",
  id,
  ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("relative", tones[tone], spacing[space], className)}
    >
      {children}
    </section>
  );
}
