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
import { services } from "@/data/services";
import { site } from "@/data/site";

const title = "Services";
const description =
  "Hydraulic equipment repair, refrigeration and air-conditioning, preventive maintenance, motor rewinding, cooling tower servicing, fabrication and roll-up doors — from one shop in Calamba City.";

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
  {
    icon: "compass" as const,
    title: "Assessed before it is quoted",
    description:
      "A check-up confirms the actual fault first, so the quotation covers what the unit needs rather than a standard package.",
  },
  {
    icon: "people" as const,
    title: "On your site or in our shop",
    description:
      "Whichever costs you less downtime. Equipment that cannot be moved is worked on where it stands.",
  },
  {
    icon: "spark" as const,
    title: "Repair before replacement",
    description:
      "Rewinding, resealing and rebounding keep serviceable equipment out of the scrap bin — and off your capital budget.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services offered"
        title="Repair, installation and maintenance under one roof"
        description={description}
        actions={
          <>
            <Button href="/contact" variant="accent" icon="arrowRight">
              Request a quotation
            </Button>
            <Button href="/equipment" variant="outline">
              View equipment
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
            eyebrow="What we do"
            title={`${services.length} service lines, one accountable team`}
            description="Open any service for what it covers, the equipment it applies to, and the clients we have delivered it for."
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
      <Section tone="canvas" ariaLabelledby="approach-heading">
        <Container>
          <SectionHeading
            id="approach-heading"
            align="center"
            eyebrow="How we work"
            title="The same approach on every job"
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
        eyebrow="Start here"
        title="Describe the fault — we will tell you what it needs"
        description="Send the equipment, the symptom and the site. If we need to inspect it before quoting, we will arrange a check-up rather than guess at a price."
        primary={{ label: "Request a quotation", href: "/contact" }}
        secondary={{ label: "Browse equipment", href: "/equipment" }}
      />
    </>
  );
}
