"use client";

import { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { fill, t } from "@/lib/i18n";
import { ProductCard } from "@/components/products/ProductCard";
import { Icon } from "@/components/ui/icons";
import { equipment, productCategories, type ProductCategoryId } from "@/data/products";

type Filter = ProductCategoryId | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: t.equipment.filters.all },
  ...productCategories.map((category) => ({ id: category.id, label: category.name })),
];

/**
 * Catalogue with category filtering.
 *
 * The filter is client state, but the URL is kept in step with
 * `history.replaceState` so a filtered view stays shareable and the footer's
 * `?category=` links land correctly — without a server round trip per click.
 */
export function ProductGrid({ initialCategory = "all" }: { initialCategory?: Filter }) {
  const [active, setActive] = useState<Filter>(initialCategory);

  const visible = useMemo(
    () => (active === "all" ? equipment : equipment.filter((item) => item.category === active)),
    [active],
  );

  const select = useCallback((next: Filter) => {
    setActive(next);
    const url = next === "all" ? "/equipment" : `/equipment?category=${next}`;
    window.history.replaceState(null, "", url);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-hairline pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label={t.equipment.filters.groupLabel}
          className="-mx-1 flex flex-wrap gap-2 px-1"
        >
          {filters.map((filter) => {
            const isActive = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => select(filter.id)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-brand-900 text-white"
                    : "bg-white text-brand-600 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:text-brand-900",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-sm text-brand-500">
          {fill(t.equipment.filters.showing, {
            visible: visible.length,
            total: equipment.length,
          })}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product, index) => (
            <li key={product.id} className="h-full">
              <ProductCard product={product} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-brand-200 p-12 text-center">
          <Icon name="alert" className="mx-auto size-6 text-brand-400" />
          <p className="mt-3 text-brand-600">{t.equipment.filters.emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
