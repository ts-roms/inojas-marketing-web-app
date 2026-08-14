import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

/** Small label that sits above a section heading, with a short cyan rule. */
export function Eyebrow({ children, className, tone = "light" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "light" ? "text-accent-700" : "text-accent-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8 shrink-0",
          tone === "light" ? "bg-accent-500/70" : "bg-accent-400/60",
        )}
      />
      {children}
    </p>
  );
}
