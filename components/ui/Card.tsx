import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  light: "bg-white ring-1 ring-hairline shadow-subtle",
  muted: "bg-muted ring-1 ring-brand-100 shadow-subtle",
  dark: "bg-white/[0.045] ring-1 ring-white/10 backdrop-blur-[2px]",
} as const;

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
} as const;

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  tone?: keyof typeof tones;
  padding?: keyof typeof paddings;
  /** Adds the shared hover treatment used by service and product cards. */
  interactive?: boolean;
  /** Anchor target, e.g. for deep links into a catalogue. */
  id?: string;
};

/** The site's surface primitive: one radius, one border weight, one shadow ramp. */
export function Card({
  children,
  className,
  as: Tag = "div",
  tone = "light",
  padding = "md",
  interactive = false,
  id,
}: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative rounded-xl",
        tones[tone],
        paddings[padding],
        interactive &&
          "transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out " +
            (tone === "dark"
              ? "hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-white/20"
              : "hover:-translate-y-1 hover:shadow-lift hover:ring-brand-200"),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
