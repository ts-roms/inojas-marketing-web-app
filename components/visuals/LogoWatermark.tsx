import { cn } from "@/lib/cn";

type LogoWatermarkProps = {
  /** `dark` tints the mark white for navy sections; `light` tints it navy. */
  tone?: "dark" | "light";
  /** Extra positioning/sizing classes. */
  className?: string;
};

/**
 * The company badge as a faint backdrop.
 *
 * Rendered through a CSS mask rather than an <img>, so the artwork takes its
 * colour from the section it sits in and never shows the white disc the source
 * logo is drawn on. It is decorative — hidden from assistive tech, ignores
 * pointer events, and sits behind content at an opacity low enough that it
 * cannot affect text contrast.
 */
export function LogoWatermark({ tone = "dark", className }: LogoWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "logo-watermark pointer-events-none absolute select-none",
        tone === "dark" ? "bg-white/4.5" : "bg-brand-900/[0.035]",
        className,
      )}
    />
  );
}
