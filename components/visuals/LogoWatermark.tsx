import { cn } from "@/lib/cn";

type LogoWatermarkProps = {
  /**
   * `dark` — the full badge in white, for navy sections.
   * `light` — the hexagon mark alone in brand blue, for pale sections. The
   * badge's rings of fine lettering speckle at the low opacity a light
   * background needs, so light sections get the bare mark instead.
   */
  tone?: "dark" | "light";
  /** Sizing classes. Positioning is handled here — the mark is always right-centred. */
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
 *
 * Use it on solid bands only. Behind a photo grid the cards chop it into
 * fragments, and on every single section it stops reading as an accent.
 */
export function LogoWatermark({ tone = "dark", className }: LogoWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        // Anchored to the right edge and vertically centred in its section, at
        // every width. Previously it was pushed past the edge with negative
        // offsets, so on wide screens the mark was cut in half.
        "pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none",
        tone === "dark"
          ? "logo-watermark bg-white/4.5"
          : "logo-watermark-mark bg-accent-600/5",
        className,
      )}
    />
  );
}
