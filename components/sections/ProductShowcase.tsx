import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { featuredProducts, productCategories } from "@/data/products";

/** Home-page equipment showcase: three highlights plus the four categories. */
export function ProductShowcase() {
  return (
    <Section tone="white" ariaLabelledby="equipment-showcase-heading">
      <Container>
        <SectionHeading
          id="equipment-showcase-heading"
          eyebrow="Equipment we handle"
          title="Brand new, repaired, reconditioned or rebuilt"
          description="Each line below can be supplied new, repaired in place, or rehabilitated and returned to service — whichever makes sense for the unit in front of us."
          action={
            <Button href="/equipment" variant="secondary" icon="arrowRight">
              All equipment
            </Button>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 3).map((product, index) => (
            <li key={product.id} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>

        <nav aria-label="Equipment categories" className="mt-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/equipment?category=${category.id}`}
                  className="group flex h-full items-start gap-4 rounded-xl bg-canvas p-5 ring-1 ring-inset ring-transparent transition-all duration-300 hover:bg-white hover:shadow-card hover:ring-brand-200"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 ring-1 ring-inset ring-brand-100 transition-colors group-hover:text-accent-700">
                    <Icon name={category.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1.5 font-semibold text-brand-900">
                      {category.name}
                      <Icon
                        name="arrowUpRight"
                        className="size-3.5 text-brand-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="mt-1 block text-sm text-brand-600">
                      {category.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
