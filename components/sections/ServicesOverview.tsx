import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { featuredServices } from "@/data/services";

/** Home-page services overview: the six capability lines, at a glance. */
export function ServicesOverview() {
  return (
    <Section tone="white" ariaLabelledby="services-overview-heading">
      <Container>
        <SectionHeading
          id="services-overview-heading"
          eyebrow={t.home.servicesOverview.eyebrow}
          title={t.home.servicesOverview.title}
          description={t.home.servicesOverview.description}
          action={
            <Button href="/services" variant="secondary" icon="arrowRight">
              {t.actions.allServices}
            </Button>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <li key={service.id} className="h-full">
              <Reveal delay={index * 70} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
