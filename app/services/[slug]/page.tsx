import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LogoWatermark } from "@/components/visuals/LogoWatermark";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServiceCard } from "@/components/services/ServiceCard";
import { photosForDisciplines, vendorProjectsForService } from "@/data/company";
import { getEquipment } from "@/data/products";
import { getService, relatedServices, services } from "@/data/services";
import { fill, t } from "@/lib/i18n";
import { site, textVars } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

/** One static page per service line, generated at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.summary,
      url: `/services/${service.id}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const equipmentItems = service.relatedEquipment.map(getEquipment).filter((e) => e !== undefined);
  const projects = vendorProjectsForService(service.id);
  const photos = photosForDisciplines([service.discipline], 4);
  const others = relatedServices(service);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "Philippines" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} — what you get`,
      itemListElement: service.benefits.map((benefit) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: benefit },
      })),
    },
  };

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Masthead                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="on-dark relative isolate overflow-hidden bg-brand-900 text-brand-100">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_28rem_at_85%_0%,rgba(15,95,209,0.18),transparent_65%)]"
        />
        <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-30" />
        <LogoWatermark className="-z-10 -right-20 -top-12 size-[26rem] lg:right-[-4rem] lg:size-[32rem]" />

        <Container className="py-10 sm:py-12 lg:py-16">
          <Breadcrumbs
            items={[
              { label: t.nav.items.home.label, href: "/" },
              { label: t.nav.items.services.label, href: "/services" },
              { label: service.title },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="dark">{t.labels.service}</Eyebrow>
              <h1 className="mt-5 flex flex-wrap items-center gap-4 text-h1 text-white">
                <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300 ring-1 ring-inset ring-accent-400/30">
                  <Icon name={service.icon} className="size-7" />
                </span>
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lead text-brand-200">{service.summary}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`/contact?subject=${encodeURIComponent(`Service enquiry: ${service.title}`)}`}
                  variant="accent"
                  icon="arrowRight"
                >
                  {t.actions.requestQuotation}
                </Button>
                <Button href={site.contact.mobileHref} variant="outline">
                  <Icon name="phone" className="size-4" />
                  {site.contact.mobileDisplay}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl bg-white/[0.045] p-6 ring-1 ring-inset ring-white/10 backdrop-blur-[2px]">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent-300">
                  {t.labels.whatYouGet}
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-brand-100">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent-400" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Detail                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="detail-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                id="detail-heading"
                as="h2"
                eyebrow={t.services.detail.coverage.eyebrow}
                title={t.services.detail.coverage.title}
              />

              <p className="mt-8 text-lead text-brand-700">{service.description}</p>

              <p className="mt-6 leading-relaxed text-brand-600">
                {fill(t.services.detail.coverage.body, textVars)}
              </p>

              <div className="mt-8">
                <Button href="/contact" icon="arrowRight">
                  {t.actions.arrangeCheckUp}
                </Button>
              </div>
            </div>

            {equipmentItems.length > 0 ? (
              <div className="lg:col-span-5">
                <Card tone="muted" padding="lg">
                  <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                    {t.labels.equipmentWeApplyItTo}
                  </h2>
                  <ul className="mt-5 space-y-2">
                    {equipmentItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/equipment/${item.id}`}
                          className="group flex items-center justify-between gap-3 rounded-lg bg-white p-3 ring-1 ring-inset ring-brand-100 transition-colors hover:ring-accent-200"
                        >
                          <span className="flex items-center gap-3">
                            <Icon name={item.icon} className="size-4 shrink-0 text-accent-600" />
                            <span className="text-sm font-medium text-brand-800 group-hover:text-accent-700">
                              {item.name}
                            </span>
                          </span>
                          <Icon
                            name="arrowRight"
                            className="size-4 shrink-0 text-brand-300 transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Photographs of this kind of work                                 */}
      {/* ---------------------------------------------------------------- */}
      {photos.length > 0 ? (
        <Section tone="canvas" ariaLabelledby="photos-heading">
          <Container>
            <SectionHeading
              id="photos-heading"
              eyebrow={t.services.detail.photos.eyebrow}
              title={t.services.detail.photos.title}
              description={t.services.detail.photos.description}
              action={
                <Button href="/projects" variant="secondary" icon="arrowRight">
                  {t.actions.fullGallery}
                </Button>
              }
            />

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {photos.map((photo, index) => (
                <li key={photo.src}>
                  <Reveal delay={index * 60}>
                    <figure className="overflow-hidden rounded-xl bg-brand-950 ring-1 ring-hairline">
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="bg-white px-4 py-3.5 text-sm font-medium text-brand-800">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Where we have done it                                            */}
      {/* ---------------------------------------------------------------- */}
      {projects.length > 0 ? (
        <Section tone="white" ariaLabelledby="projects-heading">
          <Container>
            <SectionHeading
              id="projects-heading"
              eyebrow={t.services.detail.projects.eyebrow}
              title={t.services.detail.projects.title}
              description={t.services.detail.projects.description}
            />

            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {projects.map((project, index) => (
                <li key={project.id} className="h-full">
                  <Reveal delay={index * 60} className="h-full">
                    <Card interactive className="group flex h-full gap-4" padding="lg">
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100">
                        <Icon name="checkCircle" className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-brand-900">
                          <Link
                            href={`/projects/${project.id}`}
                            className="transition-colors after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:text-accent-700"
                          >
                            {project.client}
                          </Link>
                        </h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-brand-600">
                          {project.scope}
                        </p>
                      </div>
                    </Card>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <ProcessSection />

      {/* ---------------------------------------------------------------- */}
      {/* Other services                                                   */}
      {/* ---------------------------------------------------------------- */}
      {others.length > 0 ? (
        <Section tone="canvas" ariaLabelledby="others-heading">
          <Container>
            <SectionHeading
              id="others-heading"
              eyebrow={t.services.detail.others.eyebrow}
              title={t.services.detail.others.title}
              action={
                <Button href="/services" variant="secondary" icon="arrowRight">
                  {t.actions.allServices}
                </Button>
              }
            />

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <li key={other.id} className="h-full">
                  <ServiceCard service={other} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBanner
        eyebrow={t.services.detail.cta.eyebrow}
        title={fill(t.services.detail.cta.title, { service: service.title.toLowerCase() })}
        description={t.services.detail.cta.description}
        primary={{ label: t.actions.requestQuotation, href: "/contact" }}
        secondary={{ label: t.actions.browseEquipment, href: "/equipment" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
