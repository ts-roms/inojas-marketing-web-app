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
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceCard } from "@/components/services/ServiceCard";
import { LogoWatermark } from "@/components/visuals/LogoWatermark";
import { services } from "@/data/services";
import { fill, t } from "@/lib/i18n";
import { site, textVars } from "@/data/site";

const title = t.services.meta.title;
const description = fill(t.services.meta.description, textVars);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/services",
  },
};

const workingApproach = [
  { icon: "compass" as const, ...t.services.approach.items.assessed },
  { icon: "people" as const, ...t.services.approach.items.location },
  { icon: "spark" as const, ...t.services.approach.items.repairFirst },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={t.services.hero.eyebrow}
        title={t.services.hero.title}
        description={description}
        actions={
          <>
            <Button href="/contact" variant="accent" icon="arrowRight">
              {t.actions.requestQuotation}
            </Button>
            <Button href="/equipment" variant="outline">
              {t.actions.viewEquipment}
            </Button>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Service lines                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="service-list-heading">
        <Container>
          <SectionHeading
            id="service-list-heading"
            eyebrow={t.services.list.eyebrow}
            title={fill(t.services.list.title, { count: services.length })}
            description={t.services.list.description}
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.id} className="h-full">
                <Reveal delay={index * 60} className="h-full">
                  <ServiceCard service={service} variant="full" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How we work                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section
        tone="canvas"
        ariaLabelledby="approach-heading"
        className="isolate overflow-hidden"
      >
        <LogoWatermark tone="light" className="size-[22rem] lg:size-[30rem]" />

        <Container>
          <SectionHeading
            id="approach-heading"
            align="center"
            eyebrow={t.services.approach.eyebrow}
            title={t.services.approach.title}
          />

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {workingApproach.map((item, index) => (
              <li key={item.title} className="h-full">
                <Reveal delay={index * 70} className="h-full">
                  <Card className="h-full" padding="lg">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <h3 className="mt-6 text-h3 text-brand-900">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-brand-600">{item.description}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ProcessSection />

      <CtaBanner
        eyebrow={t.services.cta.eyebrow}
        title={t.services.cta.title}
        description={t.services.cta.description}
        primary={{ label: t.actions.requestQuotation, href: "/contact" }}
        secondary={{ label: t.actions.browseEquipment, href: "/equipment" }}
      />
    </>
  );
}
