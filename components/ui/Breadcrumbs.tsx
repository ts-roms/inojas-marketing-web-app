import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { site } from "@/data/site";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb trail for detail pages.
 *
 * Emits both the visible navigation and matching BreadcrumbList structured
 * data, so search results can show the same trail. The final crumb is the
 * current page and is not a link.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-block py-1 text-brand-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="py-1 text-white">
                    {item.label}
                  </span>
                )}
                {!isLast ? (
                  <Icon
                    name="arrowRight"
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-brand-500"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        // Static, author-controlled JSON — no user input is interpolated.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
