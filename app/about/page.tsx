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
import { fill, t } from "@/lib/i18n";
import { formattedAddress, site, textVars } from "@/data/site";

const title = t.about.meta.title;
const description = fill(t.about.meta.description, textVars);

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
  t.about.profile.facts.established,
  t.about.profile.facts.foundedBy,
  t.about.profile.facts.basedIn,
  t.about.profile.facts.coverage,
  t.about.profile.facts.workCarriedOut,
].map((fact) => ({ label: fact.label, value: fill(fact.value, textVars) }));

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={t.about.hero.eyebrow}
        title={t.about.hero.title}
        description={description}
        actions={
          <>
            <Button href="/services" variant="accent" icon="arrowRight">
              {t.actions.whatWeRepair}
            </Button>
            <Button href="/contact" variant="outline">
              {t.actions.talkToOurTeam}
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
                eyebrow={t.about.profile.eyebrow}
                title={t.about.profile.title}
              />

              <div className="mt-8 space-y-6 text-brand-600">
                <p className="text-lead text-brand-700">
                  {fill(t.about.profile.lead, textVars)}
                </p>
                <p className="leading-relaxed">
                  {t.about.profile.body1}
                </p>
                <p className="leading-relaxed">
                  {t.about.profile.body2}
                </p>
              </div>

              <blockquote className="mt-10 rounded-xl border-l-2 border-accent-500 bg-canvas p-6">
                <p className="text-lead text-brand-800">{philosophy}</p>
                <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-500">
                  {t.about.profile.philosophyLabel}
                </footer>
              </blockquote>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <Card tone="muted" padding="lg">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                    {t.labels.atAGlance}
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
                        {t.about.profile.facts.workshop.label}
                      </dt>
                      <dd className="text-sm text-brand-800 sm:col-span-3">
                        <address className="not-italic">{formattedAddress()}</address>
                      </dd>
                    </div>
                  </dl>

                  <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                    {t.labels.sectorsServed}
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
            eyebrow={t.about.missionVision.eyebrow}
            title={t.about.missionVision.title}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { label: t.about.missionVision.missionLabel, body: mission, icon: "compass" as const },
              { label: t.about.missionVision.visionLabel, body: vision, icon: "spark" as const },
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
            eyebrow={t.about.story.eyebrow}
            title={t.about.story.title}
            description={t.about.story.description}
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
            eyebrow={t.about.values.eyebrow}
            title={t.about.values.title}
            description={t.about.values.description}
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
            eyebrow={t.about.figures.eyebrow}
            title={t.about.figures.title}
          />
          <div className="mt-12">
            <StatsBand />
          </div>
        </Container>
      </Section>

      <CtaBanner
        eyebrow={t.about.cta.eyebrow}
        title={t.about.cta.title}
        description={t.about.cta.description}
        primary={{ label: t.actions.contactTheShop, href: "/contact" }}
        secondary={{ label: t.actions.seeCompletedWork, href: "/projects" }}
      />
    </>
  );
}
