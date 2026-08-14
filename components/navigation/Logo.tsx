import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { site } from "@/data/site";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
  /** Hides the descriptor line under the wordmark. */
  compact?: boolean;
  href?: string;
};

/**
 * Logo lockup: the Inojas mark from the company profile, plus a typographic
 * wordmark so the name stays legible at small sizes.
 *
 * The supplied artwork is drawn on white, so on dark surfaces the mark sits on
 * a white chip rather than being recoloured — that keeps the black wrenches and
 * the cyan gear reading correctly.
 */
export function Logo({ tone = "light", className, compact = false, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-3 rounded-md", className)}
      aria-label={`${site.name} — home`}
    >
      {/* The badge is drawn on white, so on dark surfaces it sits on a white
          disc rather than being recoloured — the navy and blue stay true. */}
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full",
          tone === "dark" ? "bg-white p-0.5" : "bg-transparent",
        )}
      >
        <Image
          src="/images/brand/inojas-logo.webp"
          alt=""
          width={512}
          height={512}
          priority
          className="h-full w-full object-contain"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold uppercase tracking-[0.02em]",
            tone === "light" ? "text-brand-900" : "text-white",
          )}
        >
          {site.shortName}
        </span>
        {!compact ? (
          <span
            className={cn(
              "mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em]",
              tone === "light" ? "text-brand-500" : "text-brand-300",
            )}
          >
            {t.site.logoDescriptor}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
