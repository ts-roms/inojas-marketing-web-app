import { cn } from "@/lib/cn";
import { stats, statsSource } from "@/data/company";

/**
 * Headline figures, counted from the company profile rather than estimated.
 * The source line is rendered so a reader can see where the numbers come from.
 */
export function StatsBand({
  tone = "light",
  columns = 4,
}: {
  tone?: "light" | "dark";
  /** Use 2 inside a half-width column — four cells there wrap to four lines. */
  columns?: 2 | 4;
}) {
  const dark = tone === "dark";

  return (
    <div>
      <dl
        className={cn(
          "grid gap-px overflow-hidden rounded-xl",
          dark ? "bg-white/10 ring-1 ring-white/10" : "bg-hairline ring-1 ring-hairline",
          columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2",
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label} className={cn("p-6 sm:p-7", dark ? "bg-brand-950" : "bg-white")}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span
                className={cn(
                  "block font-display text-4xl font-extrabold tracking-tight",
                  dark ? "text-white" : "text-brand-900",
                )}
              >
                {stat.value}
              </span>
              <span
                className={cn(
                  "mt-2 block text-sm font-semibold",
                  dark ? "text-accent-300" : "text-accent-700",
                )}
              >
                {stat.label}
              </span>
              <span
                className={cn(
                  "mt-1 block text-sm",
                  dark ? "text-brand-300" : "text-brand-500",
                )}
              >
                {stat.description}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <p className={cn("mt-4 text-xs", dark ? "text-brand-400" : "text-brand-500")}>
        {statsSource}
      </p>
    </div>
  );
}
