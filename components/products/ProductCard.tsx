import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { getCategory, type Product } from "@/data/products";

/** Sizes hint for the optimiser: 1 column on mobile, 2 on tablet, 3 on desktop. */
const IMAGE_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw";

type ProductCardProps = {
  product: Product;
  /** Above-the-fold cards opt out of lazy loading. */
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const category = getCategory(product.category);

  return (
    <Card
      as="article"
      id={product.id}
      padding="none"
      interactive
      className="group flex h-full flex-col overflow-hidden scroll-mt-28"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-hairline bg-brand-950">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt ?? ""}
            fill
            sizes={IMAGE_SIZES}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          /* No photograph of this line yet — an icon tile rather than stock imagery. */
          <div
            aria-hidden="true"
            className="grid-lines flex h-full w-full items-center justify-center bg-brand-950"
          >
            <Icon name={product.icon} className="size-16 text-accent-500/80" strokeWidth={1.2} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {category ? (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-700">
            {category.name}
          </p>
        ) : null}

        <h3 className="mt-2.5 text-h3 text-brand-900">
          {/* Stretched link: the whole card is clickable, but there is still
              exactly one focusable link per card for keyboard users. */}
          <Link
            href={`/equipment/${product.id}`}
            className="transition-colors after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:text-accent-700"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-600">
          {product.description}
        </p>

        <div className="mt-5 border-t border-hairline pt-5">
          <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-500">
            What we offer
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.offerings.map((offering) => (
              <li
                key={offering}
                className="rounded-md bg-accent-50 px-2.5 py-1 text-[0.8125rem] font-medium text-accent-800 ring-1 ring-inset ring-accent-100"
              >
                {offering}
              </li>
            ))}
          </ul>
        </div>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-800 transition-colors group-hover:text-accent-700">
          View details
          <Icon
            name="arrowRight"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Card>
  );
}
