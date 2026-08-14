import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { valueProps } from "@/data/company";

/** "Why choose us" — four differentiators, phrased as commitments. */
export function ValueProps() {
  return (
    <Section tone="canvas" ariaLabelledby="value-props-heading">
      <Container>
        <SectionHeading
          id="value-props-heading"
          align="center"
          eyebrow="Why work with us"
          title="Repair first, replace only when it is the honest answer"
          description="Four things that shape how every job is quoted, carried out and turned over."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {valueProps.map((prop, index) => (
            <li key={prop.title} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <Card className="flex h-full gap-5" padding="lg">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100">
                    <Icon name={prop.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-h3 text-brand-900">{prop.title}</h3>
                    <p className="mt-3 leading-relaxed text-brand-600">{prop.description}</p>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
