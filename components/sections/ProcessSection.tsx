import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LogoWatermark } from "@/components/visuals/LogoWatermark";
import { t } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/services";

/** "Our Process" from the company profile, shared by the home and services pages. */
export function ProcessSection() {
  return (
    <Section tone="dark" ariaLabelledby="process-heading" className="overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-25" />
      <LogoWatermark className="size-[28rem] lg:size-[36rem]" />
      <Container className="relative">
        <SectionHeading
          id="process-heading"
          tone="dark"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.step} className="h-full">
              <Reveal delay={index * 80} className="h-full">
                <Card tone="dark" padding="lg" className="h-full">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-accent-400">
                    {step.step}
                  </span>
                  <h3 className="mt-5 text-h3 text-white">{step.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-200">
                    {step.description}
                  </p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
