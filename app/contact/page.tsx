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
import { fill, t } from "@/lib/i18n";
import { site, textVars } from "@/data/site";

const title = t.contact.meta.title;
const description = fill(t.contact.meta.description, textVars);

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
        eyebrow={t.contact.hero.eyebrow}
        title={t.contact.hero.title}
        description={description}
      />

      <Section tone="canvas" ariaLabelledby="contact-heading">
        <Container>
          <h2 id="contact-heading" className="sr-only">
            {t.contact.sectionLabel}
          </h2>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ------------------------------------------------------- */}
            {/* Details                                                 */}
            {/* ------------------------------------------------------- */}
            <div className="lg:col-span-5">
              <Card padding="lg">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                  {t.labels.companyDetails}
                </h3>

                <ul className="mt-6 space-y-6">
                  <li className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon name="mapPin" className="size-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-900">{t.labels.workshop}</h4>
                      <address className="mt-1 text-sm not-italic leading-relaxed text-brand-600">
                        {site.contact.address.line1}
                        <br />
                        {site.contact.address.city}, {site.contact.address.region}{" "}
                        {site.contact.address.postalCode}
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
                      <h4 className="text-sm font-semibold text-brand-900">{t.labels.phone}</h4>
                      <ul className="mt-1 space-y-1 text-sm text-brand-600">
                        <li>
                          {t.labels.mobile}:{" "}
                          <a
                            href={site.contact.mobileHref}
                            className="inline-block py-1 text-accent-700 underline underline-offset-4 hover:text-accent-800"
                          >
                            {site.contact.mobileDisplay}
                          </a>
                        </li>
                        <li>
                          {t.labels.landline}:{" "}
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
                      <h4 className="text-sm font-semibold text-brand-900">{t.labels.email}</h4>
                      <ul className="mt-1 space-y-1 text-sm text-brand-600">
                        <li>
                          {t.labels.enquiries}:{" "}
                          <a
                            href={`mailto:${site.contact.email}`}
                            className="break-all text-accent-700 underline underline-offset-4 hover:text-accent-800"
                          >
                            {site.contact.email}
                          </a>
                        </li>
                        <li>
                          {t.labels.management}:{" "}
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
                      <h4 className="text-sm font-semibold text-brand-900">{t.labels.businessHours}</h4>
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
                  <strong className="font-semibold text-brand-700">
                    {t.contact.clientNote.label}
                  </strong>{" "}
                  {site.contact.hoursNote} {t.contact.clientNote.body}
                </p>
              </Card>

              {/* The embed only loads when it scrolls into view, so the rest of
                  the page — including the form — is never held up by Google's
                  frame, and a visitor who never reaches it makes no request. */}
              <Reveal>
                <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-hairline">
                  <iframe
                    src={site.contact.mapEmbedUrl}
                    title={fill(t.contact.map.title, textVars)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="block aspect-[16/10] w-full border-0"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3">
                    <p className="flex items-center gap-2 text-sm text-brand-600">
                      <Icon name="mapPin" className="size-4 shrink-0 text-accent-700" />
                      {site.contact.address.city}, {site.contact.address.region}
                    </p>
                    <a
                      href={site.contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-800"
                    >
                      {t.contact.map.directions}
                      <Icon name="arrowUpRight" className="size-3.5" />
                    </a>
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
                eyebrow={t.contact.form.eyebrow}
                title={t.contact.form.title}
                description={t.contact.form.description}
              />

              <div className="mt-8">
                <ContactForm defaultSubject={defaultSubject} />
              </div>

              <Card tone="muted" padding="lg" className="mt-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                  {t.labels.whatHappensNext}
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
