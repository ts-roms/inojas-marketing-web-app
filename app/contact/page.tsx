import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { processSteps } from "@/data/services";
import { site } from "@/data/site";

const title = "Contact us";
const description = `Request a quotation from ${site.name} in Calamba City, Laguna — forklift and hand pallet truck repair, hydraulics, refrigeration, air-conditioning, motor rewinding and fabrication.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/contact",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const params = await searchParams;
  // Equipment and service pages deep-link here with a pre-filled subject.
  const defaultSubject = (params.subject ?? "").slice(0, 120);

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Tell us what needs fixing"
        description={description}
      />

      <Section tone="canvas" ariaLabelledby="contact-heading">
        <Container>
          <h2 id="contact-heading" className="sr-only">
            Contact details and enquiry form
          </h2>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ------------------------------------------------------- */}
            {/* Details                                                 */}
            {/* ------------------------------------------------------- */}
            <div className="lg:col-span-5">
              <Card padding="lg">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                  Shop details
                </h3>

                <ul className="mt-6 space-y-6">
                  <li className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon name="mapPin" className="size-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-900">Workshop</h4>
                      <address className="mt-1 text-sm not-italic leading-relaxed text-brand-600">
                        {site.contact.address.line1}
                        <br />
                        {site.contact.address.city}, {site.contact.address.region}
                        <br />
                        {site.contact.address.country}
                      </address>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon name="phone" className="size-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-900">Phone</h4>
                      <ul className="mt-1 space-y-1 text-sm text-brand-600">
                        <li>
                          Mobile:{" "}
                          <a
                            href={site.contact.mobileHref}
                            className="inline-block py-1 text-accent-700 underline underline-offset-4 hover:text-accent-800"
                          >
                            {site.contact.mobileDisplay}
                          </a>
                        </li>
                        <li>
                          Landline:{" "}
                          <a
                            href={site.contact.landlineHref}
                            className="inline-block py-1 text-accent-700 underline underline-offset-4 hover:text-accent-800"
                          >
                            {site.contact.landlineDisplay}
                          </a>
                        </li>
                      </ul>
                      <p className="mt-2 text-sm text-brand-500">
                        {site.contact.emergencyNote}
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon name="mail" className="size-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-900">Email</h4>
                      <ul className="mt-1 space-y-1 text-sm text-brand-600">
                        <li>
                          Enquiries:{" "}
                          <a
                            href={`mailto:${site.contact.email}`}
                            className="break-all text-accent-700 underline underline-offset-4 hover:text-accent-800"
                          >
                            {site.contact.email}
                          </a>
                        </li>
                        <li>
                          Management:{" "}
                          <a
                            href={`mailto:${site.contact.managementEmail}`}
                            className="break-all text-accent-700 underline underline-offset-4 hover:text-accent-800"
                          >
                            {site.contact.managementEmail}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon name="clock" className="size-5" />
                    </span>
                    <div className="w-full">
                      <h4 className="text-sm font-semibold text-brand-900">Business hours</h4>
                      <dl className="mt-2 space-y-1 text-sm">
                        {site.contact.hours.map((entry) => (
                          <div key={entry.days} className="flex justify-between gap-4">
                            <dt className="text-brand-600">{entry.days}</dt>
                            <dd className="font-medium text-brand-800">{entry.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </li>
                </ul>

                <p className="mt-8 rounded-md bg-canvas p-4 text-xs leading-relaxed text-brand-500 ring-1 ring-inset ring-hairline">
                  <strong className="font-semibold text-brand-700">Note for the client:</strong>{" "}
                  {site.contact.hoursNote} Everything else on this page comes from your company
                  profile — update any of it in{" "}
                  <code className="rounded bg-white px-1 py-0.5">data/site.ts</code>.
                </p>
              </Card>

              {/* Map placeholder: no third-party embed is loaded, so no consent
                  banner or tracking is introduced before the client decides. */}
              <Reveal>
                <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-hairline">
                  <div className="relative flex aspect-[16/10] items-center justify-center bg-brand-50">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(19,25,32,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(19,25,32,0.06)_1px,transparent_1px)] [background-size:32px_32px]"
                    />
                    <div className="relative max-w-xs px-6 text-center">
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-white text-accent-700 ring-1 ring-brand-100">
                        <Icon name="mapPin" className="size-5" />
                      </span>
                      <p className="mt-4 text-sm font-semibold text-brand-800">
                        {site.contact.address.city}, {site.contact.address.region}
                      </p>
                      <p className="mt-1 text-sm text-brand-500">
                        Add a Google Maps embed here once the exact pin is confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ------------------------------------------------------- */}
            {/* Form                                                    */}
            {/* ------------------------------------------------------- */}
            <div className="lg:col-span-7">
              <SectionHeading
                as="h3"
                eyebrow="Request for quotation"
                title="Send us the details"
                description="The more you can tell us — equipment, brand, fault and location — the more useful our first reply will be."
              />

              <div className="mt-8">
                <ContactForm defaultSubject={defaultSubject} />
              </div>

              <Card tone="muted" padding="lg" className="mt-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                  What happens next
                </h3>
                <ol className="mt-5 space-y-4">
                  {processSteps.map((step, index) => (
                    <li key={step.step} className="flex gap-4">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-brand-700">
                        <span className="font-semibold text-brand-900">{step.title}.</span>{" "}
                        {step.description}
                      </span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
