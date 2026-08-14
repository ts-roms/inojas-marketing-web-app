import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const widths = {
  /** Reading width for long-form copy. */
  prose: "max-w-3xl",
  /** Standard content width. */
  default: "max-w-7xl",
  /** Slightly narrower for centred, focused sections. */
  narrow: "max-w-5xl",
} as const;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: keyof typeof widths;
  as?: ElementType;
};

/** The single horizontal-rhythm primitive: every section uses it, so gutters
 *  stay identical across the site and nothing can overflow the viewport. */
export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", widths[width], className)}>
      {children}
    </Tag>
  );
}
