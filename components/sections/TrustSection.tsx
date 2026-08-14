import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { fill, t } from "@/lib/i18n";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { legalDocuments } from "@/data/company";
import { textVars } from "@/data/site";

/**
 * Credibility section, built from the registrations listed on the Legal
 * Documents pages of the company profile. The permit scans themselves are not
 * published — they contain registration numbers and signatures — but the
 * documents can be produced on request.
 */
export function TrustSection() {
  return (
    <Section tone="brand" ariaLabelledby="trust-heading" className="overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-30" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="trust-heading"
              tone="dark"
              eyebrow={t.trust.eyebrow}
              title={t.trust.title}
              description={fill(t.trust.description, textVars)}
            />

            <div className="mt-9">
              <Button href="/about" variant="outline" icon="arrowRight">
                {t.actions.moreAboutCompany}
              </Button>
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {legalDocuments.map((document, index) => (
              <li key={document.title} className="h-full">
                <Reveal delay={index * 80} className="h-full">
                  <Card tone="dark" padding="lg" className="h-full">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-500/15 text-accent-300">
                      <Icon name={document.icon} className="size-5" />
                    </span>
                    <h3 className="mt-5 text-h3 text-white">{document.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-brand-200">{document.description}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
