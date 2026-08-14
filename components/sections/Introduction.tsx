import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { fill, t } from "@/lib/i18n";
import { textVars } from "@/data/site";

/** Company introduction, from the About page of the company profile. */
export function Introduction() {
  return (
    <Section tone="white" spacing="md" ariaLabelledby="introduction-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>{t.home.introduction.eyebrow}</Eyebrow>
            <h2 id="introduction-heading" className="mt-5 text-h2 text-brand-900">
              {t.home.introduction.title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-lead text-brand-700">
                {fill(t.home.introduction.lead, textVars)}
              </p>
              <p className="mt-6 leading-relaxed text-brand-600">
                {fill(t.home.introduction.body, textVars)}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
