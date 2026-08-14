import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProcessSection } from "@/components/sections/ProcessSection";
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
      {/* Jump list                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="canvas" spacing="sm" ariaLabelledby="service-index-heading">
        <Container>
          <h2 id="service-index-heading" className="sr-only">
            Service index
          </h2>
          <nav aria-label="Services on this page">
            <ul className="flex flex-wrap gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`#${service.id}`}
                    className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-200 transition-colors hover:bg-brand-50 hover:text-brand-900"
                  >
                    <Icon name={service.icon} className="size-4 text-accent-600" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Service detail                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="service-detail-heading">
        <Container>
          <h2 id="service-detail-heading" className="sr-only">
            Our services in detail
          </h2>

          <div className="divide-y divide-hairline">
            {services.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-28 py-12 first:pt-0 last:pb-0 lg:py-16"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-5">
                    <Reveal>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex size-12 items-center justify-center rounded-lg bg-brand-900 text-accent-300">
                          <Icon name={service.icon} className="size-6" />
                        </span>
                        <span className="font-display text-sm font-bold tracking-[0.16em] text-brand-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-6 text-h2 text-brand-900">{service.title}</h3>
                      <p className="mt-4 text-lead text-brand-600">{service.summary}</p>

                      <div className="mt-7">
                        <Button
                          href={`/contact?subject=${encodeURIComponent(`Service enquiry: ${service.title}`)}`}
                          variant="secondary"
                          size="sm"
                          icon="arrowRight"
                        >
                          Request a quotation
                        </Button>
                      </div>
                    </Reveal>
                  </div>

                  <div className="lg:col-span-7">
                    <Reveal delay={80}>
                      <Card tone="muted" padding="lg" className="h-full">
                        <p className="leading-relaxed text-brand-700">{service.description}</p>

                        <h4 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                          What you get
                        </h4>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                          {service.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="flex items-start gap-3 text-[0.9375rem] text-brand-700"
                            >
                              <Icon
                                name="checkCircle"
                                className="mt-0.5 size-4 shrink-0 text-accent-600"
                              />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </Reveal>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <ProcessSection />

      <CtaBanner
        eyebrow="Start here"
        title="Describe the fault — we will tell you what it needs"
        description="Send the equipment, the symptom and the site. If we need to inspect it before quoting, we will arrange a check-up first rather than guess at a price."
        primary={{ label: "Request a quotation", href: "/contact" }}
        secondary={{ label: "Browse equipment", href: "/equipment" }}
      />
    </>
  );
}
