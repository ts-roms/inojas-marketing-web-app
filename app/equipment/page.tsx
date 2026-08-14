import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProductGrid } from "@/components/products/ProductGrid";
import { LogoWatermark } from "@/components/visuals/LogoWatermark";
import { equipment, productCategories, type ProductCategoryId } from "@/data/products";
import { fill, t } from "@/lib/i18n";
import { site } from "@/data/site";

const title = t.equipment.meta.title;
const description = t.equipment.meta.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/equipment" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/equipment",
  },
};

const categoryIds = new Set<string>(productCategories.map((category) => category.id));

function toCategory(value: string | undefined): ProductCategoryId | "all" {
  return value && categoryIds.has(value) ? (value as ProductCategoryId) : "all";
}

const supplyNotes = [
  { icon: "wrench" as const, ...t.equipment.supply.items.inPlace },
  { icon: "spark" as const, ...t.equipment.supply.items.reconditioned },
  { icon: "layers" as const, ...t.equipment.supply.items.parts },
];

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = toCategory(params.category);

  return (
    <>
      <PageHero
        eyebrow={t.equipment.hero.eyebrow}
        title={t.equipment.hero.title}
        description={description}
        actions={
          <>
            <Button href="/contact" variant="accent" icon="arrowRight">
              {t.actions.requestQuotation}
            </Button>
            <Button href="/services" variant="outline">
              {t.actions.seeOurServices}
            </Button>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Catalogue                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="catalogue-heading">
        <Container>
          <SectionHeading
            id="catalogue-heading"
            eyebrow={t.equipment.catalogue.eyebrow}
            title={fill(t.equipment.catalogue.title, { count: equipment.length })}
            description={t.equipment.catalogue.description}
          />

          <div className="mt-12">
            <ProductGrid initialCategory={initialCategory} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How we supply                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section
        tone="canvas"
        ariaLabelledby="supply-heading"
        className="isolate overflow-hidden"
      >
        <LogoWatermark tone="light" className="size-[22rem] lg:size-[30rem]" />

        <Container>
          <SectionHeading
            id="supply-heading"
            align="center"
            eyebrow={t.equipment.supply.eyebrow}
            title={t.equipment.supply.title}
            description={t.equipment.supply.description}
          />

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {supplyNotes.map((note, index) => (
              <li key={note.title} className="h-full">
                <Reveal delay={index * 70} className="h-full">
                  <Card className="h-full" padding="lg">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100">
                      <Icon name={note.icon} className="size-5" />
                    </span>
                    <h3 className="mt-6 text-h3 text-brand-900">{note.title}</h3>
                    <p className="mt-3 leading-relaxed text-brand-600">{note.description}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner
        eyebrow={t.equipment.cta.eyebrow}
        title={t.equipment.cta.title}
        description={t.equipment.cta.description}
        primary={{ label: t.actions.requestQuotation, href: "/contact" }}
        secondary={{ label: t.actions.seeCompletedWork, href: "/projects" }}
      />
    </>
  );
}
