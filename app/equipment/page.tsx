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
import { equipment, productCategories, type ProductCategoryId } from "@/data/products";
import { site } from "@/data/site";

const title = "Equipment";
const description =
  "Forklifts, hand pallet trucks, stackers, jacks, hydraulic presses, HVAC and chiller units, industrial batteries and more — supplied brand new, repaired, reconditioned or rehabilitated.";

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
  {
    icon: "wrench" as const,
    title: "Repaired in place or in the shop",
    description:
      "Most units can be worked on at your facility. Where a strip-down is needed, we collect, rebuild and return the unit running.",
  },
  {
    icon: "spark" as const,
    title: "Reconditioned as an option",
    description:
      "For several lines we can supply a reconditioned unit instead of new — the same capability at a lower cost, and less equipment scrapped.",
  },
  {
    icon: "layers" as const,
    title: "Parts and consumables supplied",
    description:
      "Seal kits, wheels, batteries, chargers and refrigerants are supplied with the work, so a repair is not held up waiting on a third party.",
  },
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
        eyebrow="Equipment"
        title="The equipment we repair, supply and rebuild"
        description={description}
        actions={
          <>
            <Button href="/contact" variant="accent" icon="arrowRight">
              Request a quotation
            </Button>
            <Button href="/services" variant="outline">
              See our services
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
            eyebrow="What we handle"
            title={`${equipment.length} equipment lines across four families`}
            description="Filter by family to see what we work on and what we can offer for each line. If your equipment is not listed, ask — hydraulic, mechanical and refrigeration equipment is our trade regardless of badge."
          />

          <div className="mt-12">
            <ProductGrid initialCategory={initialCategory} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How we supply                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="canvas" ariaLabelledby="supply-heading">
        <Container>
          <SectionHeading
            id="supply-heading"
            align="center"
            eyebrow="How we supply"
            title="New is not always the right answer"
            description="Every line above can be quoted more than one way. We will tell you which option we would choose if the unit were ours."
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
        eyebrow="Quotations"
        title="Need pricing, availability or a site visit?"
        description="Tell us the equipment, the fault and how soon you need it back. We will quote the repair, the reconditioned option and the brand new one where all three apply."
        primary={{ label: "Request a quotation", href: "/contact" }}
        secondary={{ label: "See completed work", href: "/projects" }}
      />
    </>
  );
}
