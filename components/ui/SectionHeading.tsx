import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Heading level — `h2` by default; pages that need it can pass `h1`. */
  as?: "h1" | "h2" | "h3";
  /** Used with `aria-labelledby` on the parent section. */
  id?: string;
  className?: string;
  /** Optional action (usually a link) aligned with the heading on wide screens. */
  action?: ReactNode;
};

const headingSize = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

/** Consistent section intro: eyebrow, heading, supporting paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  id,
  className,
  action,
}: SectionHeadingProps) {
  const centred = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        action ? "lg:flex-row lg:items-end lg:justify-between" : undefined,
        className,
      )}
    >
      <div className={cn("max-w-2xl", centred && "mx-auto text-center")}>
        {eyebrow ? (
          <Eyebrow tone={tone} className={cn("mb-5", centred && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        ) : null}

        <Tag
          id={id}
          className={cn(
            headingSize[Tag],
            tone === "light" ? "text-brand-900" : "text-white",
          )}
        >
          {title}
        </Tag>

        {description ? (
          <p
            className={cn(
              "mt-5 text-lead",
              tone === "light" ? "text-brand-600" : "text-brand-200",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className={cn("shrink-0", centred && "mx-auto")}>{action}</div> : null}
    </div>
  );
}
