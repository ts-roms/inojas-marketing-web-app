import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/** Company introduction, from the About page of the company profile. */
export function Introduction() {
  return (
    <Section tone="white" spacing="md" ariaLabelledby="introduction-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>About the company</Eyebrow>
            <h2 id="introduction-heading" className="mt-5 text-h2 text-brand-900">
              A repair shop built by technicians, not by salesmen
            </h2>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-lead text-brand-700">
                {site.name} was established in {site.foundedYear} by skilled and trained technicians
                and engineers. We advocate environmentally friendly repairs through the brands we
                carry and distribute across the Philippines — because a motor that can be rewound or
                a cylinder that can be resealed should not become scrap.
              </p>
              <p className="mt-6 leading-relaxed text-brand-600">
                The shop provides a diverse array of products and services: repair, supply and
                installation of various forklift and hand pallet truck brands, air-conditioning and
                refrigeration repairs, motor rewinding, fabrication and more. That range is
                deliberate. A dock leveller that will not lift can turn out to be a hydraulic fault,
                an electrical fault or a worn structure, and our customers should not have to hire
                three different contractors to find out which.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
