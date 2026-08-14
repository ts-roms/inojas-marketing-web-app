import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
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
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg",
          tone === "dark" ? "bg-white p-1" : "bg-transparent",
        )}
      >
        <Image
          src="/images/brand/ihrs-logo.png"
          alt=""
          width={420}
          height={383}
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
            Hydraulic Repair Shop
          </span>
        ) : null}
      </span>
    </Link>
  );
}
