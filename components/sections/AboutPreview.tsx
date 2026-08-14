import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatsBand } from "@/components/sections/StatsBand";
import { mission } from "@/data/company";
import { site } from "@/data/site";

const commitments = [
  "Technicians and engineers, trained on this equipment",
  "Work carried out on site or in the Calamba shop",
  "Assessment before the scope is fixed",
  "Payment based on the terms in your quotation",
];

/** Short "about us" block on the home page, leading into the About page. */
export function AboutPreview() {
  return (
    <Section tone="muted" ariaLabelledby="about-preview-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="about-preview-heading"
              eyebrow="Who we are"
              title="Based in Calamba, working across the Philippines"
              description={`${site.name} started in ${site.foundedYear} with a simple proposition: give plants and warehouses one team that can actually fix the equipment, instead of quoting to replace it.`}
            />

            <blockquote className="mt-9 border-l-2 border-accent-500 pl-6">
              <p className="text-lead text-brand-800">{mission}</p>
              <footer className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
                Our mission
              </footer>
            </blockquote>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/about" icon="arrowRight">
                About the shop
              </Button>
              <Button href="/projects" variant="secondary">
                See completed work
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <StatsBand />
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {commitments.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-700">
                    <Icon name="checkCircle" className="mt-0.5 size-4 shrink-0 text-accent-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
