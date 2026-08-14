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
import { ProductCard } from "@/components/products/ProductCard";
import {
  equipment,
  getCategory,
  getEquipment,
  relatedEquipment,
} from "@/data/products";
import { getService } from "@/data/services";
import { fill, t } from "@/lib/i18n";
import { site, textVars } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

/** One static page per equipment line, generated at build time. */
export function generateStaticParams() {
  return equipment.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getEquipment(slug);

  if (!item) return { title: "Equipment not found" };

  const title = fill(t.equipment.detail.metaTitle, { name: item.name });

  return {
    title,
    description: item.description,
    alternates: { canonical: `/equipment/${item.id}` },
    openGraph: {
      title: `${item.name} | ${site.name}`,
      description: item.description,
      url: `/equipment/${item.id}`,
      ...(item.image ? { images: [{ url: item.image, alt: item.imageAlt ?? item.name }] } : {}),
    },
  };
}

export default async function EquipmentDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getEquipment(slug);

  if (!item) notFound();

  const category = getCategory(item.category);
  const services = item.relatedServices.map(getService).filter((s) => s !== undefined);
  const related = relatedEquipment(item);

  /**
   * Service schema rather than Product: we are describing repair work on the
   * customer's equipment, not selling a stocked item with a price.
   */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${item.name} repair and supply`,
    serviceType: item.name,
    description: item.description,
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "Philippines" },
    ...(item.image ? { image: `${site.url}${item.image}` } : {}),
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
              { label: t.nav.items.equipment.label, href: "/equipment" },
              { label: item.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-6">
              {category ? <Eyebrow tone="dark">{category.name}</Eyebrow> : null}
              <h1 className="mt-5 text-h1 text-white">{item.name}</h1>
              <p className="mt-5 max-w-xl text-lead text-brand-200">{item.description}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {item.offerings.map((offering) => (
                  <li
                    key={offering}
                    className="rounded-md bg-accent-500/15 px-3 py-1.5 text-sm font-medium text-accent-200 ring-1 ring-inset ring-accent-400/30"
                  >
                    {offering}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`/contact?subject=${encodeURIComponent(`Enquiry: ${item.name}`)}`}
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

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/15">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.name}
                    fill
                    sizes="(min-width: 1024px) 44vw, 92vw"
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="grid-lines flex h-full w-full items-center justify-center bg-brand-950"
                  >
                    <Icon name={item.icon} className="size-24 text-accent-500/80" strokeWidth={1} />
                  </div>
                )}
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
                eyebrow={t.equipment.detail.work.eyebrow}
                title={fill(t.equipment.detail.work.title, { name: item.name.toLowerCase() })}
              />

              <p className="mt-8 text-lead text-brand-700">{item.detail}</p>

              <h3 className="mt-10 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                {t.labels.whatTheWorkInvolves}
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {item.workScope.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-[0.9375rem] text-brand-700">
                    <Icon name="checkCircle" className="mt-0.5 size-4 shrink-0 text-accent-600" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 rounded-xl bg-canvas p-5 text-sm leading-relaxed text-brand-600 ring-1 ring-inset ring-hairline">
                {t.equipment.detail.quoteNote}{" "}
                <Link
                  href="/services"
                  className="font-medium text-accent-700 underline underline-offset-4 hover:text-accent-800"
                >
                  {t.actions.howAJobRuns}
                </Link>
                .
              </p>
            </div>

            <div className="lg:col-span-5">
              <Card tone="muted" padding="lg">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                  {t.labels.atAGlance}
                </h3>

                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-brand-500">{t.labels.family}</dt>
                    <dd className="mt-1 text-brand-800">
                      {category ? (
                        <Link
                          href={`/equipment?category=${category.id}`}
                          className="text-accent-700 underline underline-offset-4 hover:text-accent-800"
                        >
                          {category.name}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-500">{t.labels.availableAs}</dt>
                    <dd className="mt-1 text-brand-800">{item.offerings.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-500">{t.labels.whereWeWork}</dt>
                    <dd className="mt-1 text-brand-800">
                      {fill(t.labels.onSiteOrWorkshop, textVars)}
                    </dd>
                  </div>
                </dl>

                {services.length > 0 ? (
                  <>
                    <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                      {t.labels.relatedServices}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {services.map((service) => (
                        <li key={service.id}>
                          <Link
                            href={`/services/${service.id}`}
                            className="group flex items-start gap-3 rounded-lg bg-white p-3 ring-1 ring-inset ring-brand-100 transition-colors hover:ring-accent-200"
                          >
                            <Icon
                              name={service.icon}
                              className="mt-0.5 size-4 shrink-0 text-accent-600"
                            />
                            <span className="text-sm font-medium text-brand-800 group-hover:text-accent-700">
                              {service.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Gallery                                                          */}
      {/* ---------------------------------------------------------------- */}
      {item.gallery && item.gallery.length > 0 ? (
        <Section tone="canvas" ariaLabelledby="gallery-heading">
          <Container>
            <SectionHeading
              id="gallery-heading"
              eyebrow={t.equipment.detail.gallery.eyebrow}
              title={t.equipment.detail.gallery.title}
              description={t.equipment.detail.gallery.description}
            />

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {item.gallery.map((photo, index) => (
                <li key={photo.src}>
                  <Reveal delay={index * 60}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-brand-950 ring-1 ring-hairline">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Related equipment                                                */}
      {/* ---------------------------------------------------------------- */}
      {related.length > 0 ? (
        <Section tone="white" ariaLabelledby="related-heading">
          <Container>
            <SectionHeading
              id="related-heading"
              eyebrow={t.equipment.detail.related.eyebrow}
              title={
                category
                  ? fill(t.equipment.detail.related.title, {
                      category: category.name.toLowerCase(),
                    })
                  : t.equipment.detail.related.titleFallback
              }
              action={
                <Button href="/equipment" variant="secondary" icon="arrowRight">
                  {t.actions.allEquipment}
                </Button>
              }
            />

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <li key={other.id} className="h-full">
                  <ProductCard product={other} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBanner
        eyebrow={t.equipment.detail.cta.eyebrow}
        title={fill(t.equipment.detail.cta.title, { name: item.name.toLowerCase() })}
        description={t.equipment.detail.cta.description}
        primary={{ label: t.actions.requestQuotation, href: "/contact" }}
        secondary={{ label: t.actions.seeCompletedWork, href: "/projects" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
