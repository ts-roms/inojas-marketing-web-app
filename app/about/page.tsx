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
import { StatsBand } from "@/components/sections/StatsBand";
import { TrustSection } from "@/components/sections/TrustSection";
import { ValueProps } from "@/components/sections/ValueProps";
import {
  coreValues,
  milestones,
  mission,
  philosophy,
  sectors,
  vision,
} from "@/data/company";
import { formattedAddress, site } from "@/data/site";

const title = "About us";
const description = `${site.name} was established in ${site.foundedYear} by skilled and trained technicians and engineers, repairing hydraulic, material handling and refrigeration equipment across the Philippines.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/about",
  },
};

/** Company profile facts, from the company profile document. */
const profileFacts = [
  { label: "Established", value: String(site.foundedYear) },
  { label: "Founded by", value: "Skilled and trained technicians and engineers" },
  { label: "Based in", value: `${site.contact.address.city}, ${site.contact.address.region}` },
  { label: "Coverage", value: "Client sites across the Philippines" },
  { label: "Work carried out", value: "On site or in the Calamba workshop" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Skilled technicians, environmentally friendly repairs"
        description={description}
        actions={
          <>
            <Button href="/services" variant="accent" icon="arrowRight">
              What we repair
            </Button>
            <Button href="/contact" variant="outline">
              Talk to our team
            </Button>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Company profile                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="profile-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                id="profile-heading"
                eyebrow="Company profile"
                title="A shop set up to fix things properly"
              />

              <div className="mt-8 space-y-6 text-brand-600">
                <p className="text-lead text-brand-700">
                  {site.name} was established in {site.foundedYear} by skilled and trained
                  technicians and engineers. The company advocates for environmentally friendly
                  repairs through the brands it carries and distributes across the Philippines.
                </p>
                <p className="leading-relaxed">
                  We provide a diverse array of products and services, including the repair, supply
                  and installation of various forklift and hand pallet truck brands,
                  air-conditioning and refrigeration repairs, motor rewinding and reconditioning,
                  fabrication, and the supply and installation of roll-up doors.
                </p>
                <p className="leading-relaxed">
                  That breadth is the point. Warehouses and plants rarely fail in neat categories —
                  a dock leveller that will not lift, a chiller that will not hold temperature, a
                  forklift down on a Monday morning. Having hydraulics, cooling, electrical and
                  fabrication skills in the same team means one call, one assessment and one team
                  accountable for the outcome.
                </p>
              </div>

              <blockquote className="mt-10 rounded-xl border-l-2 border-accent-500 bg-canvas p-6">
                <p className="text-lead text-brand-800">{philosophy}</p>
                <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
                  Our philosophy
                </footer>
              </blockquote>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <Card tone="muted" padding="lg">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                    At a glance
                  </h3>
                  <dl className="mt-6 divide-y divide-brand-200">
                    {profileFacts.map((fact) => (
                      <div key={fact.label} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-5">
                        <dt className="text-sm font-semibold text-brand-500 sm:col-span-2">
                          {fact.label}
                        </dt>
                        <dd className="text-sm text-brand-800 sm:col-span-3">{fact.value}</dd>
                      </div>
                    ))}
                    <div className="grid gap-1 py-4 sm:grid-cols-5">
                      <dt className="text-sm font-semibold text-brand-500 sm:col-span-2">
                        Workshop
                      </dt>
                      <dd className="text-sm text-brand-800 sm:col-span-3">
                        <address className="not-italic">{formattedAddress()}</address>
                      </dd>
                    </div>
                  </dl>

                  <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                    Sectors served
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {sectors.map((sector) => (
                      <li
                        key={sector}
                        className="rounded-md bg-white px-3 py-1.5 text-sm text-brand-700 ring-1 ring-inset ring-brand-100"
                      >
                        {sector}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Mission & vision                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="dark" ariaLabelledby="mission-heading" className="overflow-hidden">
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-25" />
        <Container className="relative">
          <SectionHeading
            id="mission-heading"
            tone="dark"
            align="center"
            eyebrow="Mission & vision"
            title="What we are working towards"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { label: "Our mission", body: mission, icon: "compass" as const },
              { label: "Our vision", body: vision, icon: "spark" as const },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * 90}>
                <Card tone="dark" padding="lg" className="h-full">
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent-500/15 text-accent-300">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-[0.16em] text-accent-300">
                    {item.label}
                  </h3>
                  <p className="mt-4 text-lead text-brand-100">{item.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How the shop grew                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="story-heading">
        <Container>
          <SectionHeading
            id="story-heading"
            eyebrow="Our story"
            title="From hydraulic repairs to full plant maintenance"
            description="How the scope of the shop widened as customers kept asking for the next thing."
          />

          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <li key={milestone.year}>
                <Reveal delay={index * 70}>
                  <div className="relative border-t-2 border-brand-100 pt-6">
                    <span
                      aria-hidden="true"
                      className="absolute -top-[5px] left-0 size-2 rounded-full bg-accent-500"
                    />
                    <p className="font-display text-xl font-extrabold uppercase tracking-tight text-accent-700">
                      {milestone.year}
                    </p>
                    <h3 className="mt-3 text-h3 text-brand-900">{milestone.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-600">
                      {milestone.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Core values                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="canvas" ariaLabelledby="values-heading">
        <Container>
          <SectionHeading
            id="values-heading"
            eyebrow="Core values"
            title="The values behind our professional philosophy"
            description="These are the fundamental values our mission refers to — the ones we fall back on when a job gets difficult."
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <li key={value.title} className="h-full">
                <Reveal delay={index * 60} className="h-full">
                  <Card className="h-full" padding="lg">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                      <Icon name={value.icon} className="size-5" />
                    </span>
                    <h3 className="mt-6 text-h3 text-brand-900">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-brand-600">{value.description}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Strengths — shared with the home page. */}
      <ValueProps />

      {/* Registrations and permits. */}
      <TrustSection />

      {/* ---------------------------------------------------------------- */}
      {/* Figures                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" spacing="md" ariaLabelledby="figures-heading">
        <Container>
          <SectionHeading
            id="figures-heading"
            align="center"
            eyebrow="By the numbers"
            title="The shop, in figures"
          />
          <div className="mt-12">
            <StatsBand />
          </div>
        </Container>
      </Section>

      <CtaBanner
        eyebrow="Work with us"
        title="Bring us the unit everyone else wants to replace"
        description="We will assess it honestly and tell you whether it is worth repairing. If it is not, we will say so — and quote the replacement instead."
        primary={{ label: "Contact the shop", href: "/contact" }}
        secondary={{ label: "See completed work", href: "/projects" }}
      />
    </>
  );
}
