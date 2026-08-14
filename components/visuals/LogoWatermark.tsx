import { cn } from "@/lib/cn";

type LogoWatermarkProps = {
  /** `dark` tints the mark white for navy sections; `light` tints it navy. */
  tone?: "dark" | "light";
  /** Sizing classes. Positioning is handled here — the mark is always centred. */
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
        // Anchored to the right edge and vertically centred in its section, at
        // every width. Previously it was pushed past the edge with negative
        // offsets, so on wide screens the mark was cut in half.
        "logo-watermark pointer-events-none absolute right-0 top-1/2 select-none",
        "-translate-y-1/2",
        tone === "dark" ? "bg-white/4.5" : "bg-brand-900/[0.035]",
        className,
      )}
    />
  );
}
