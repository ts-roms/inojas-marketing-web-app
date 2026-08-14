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
import {
  clients,
  getVendorProject,
  photosForDisciplines,
  relatedVendorProjects,
  vendorProjects,
} from "@/data/company";
import { getEquipment } from "@/data/products";
import { getService } from "@/data/services";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

const disciplineLabels: Record<string, string> = {
  hydraulics: "Hydraulics & material handling",
  cooling: "Refrigeration & air-conditioning",
  motors: "Motors",
  fabrication: "Fabrication & doors",
};

/** One static page per vendor project, generated at build time. */
export function generateStaticParams() {
  return vendorProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getVendorProject(slug);

  if (!project) return { title: "Project not found" };

  const description = `${project.scope} Completed by ${site.name} for ${project.client}.`;

  return {
    title: `${project.client} — project`,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.client} | ${site.name}`,
      description,
      url: `/projects/${project.id}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getVendorProject(slug);

  if (!project) notFound();

  const services = project.services.map(getService).filter((s) => s !== undefined);
  const equipmentItems = project.equipment.map(getEquipment).filter((e) => e !== undefined);
  const related = relatedVendorProjects(project);
  const photos = photosForDisciplines(project.disciplines, 3);
  const clientLogo = clients.find((entry) => entry.name === project.client)?.logo;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Masthead                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="on-dark relative isolate overflow-hidden bg-brand-900 text-brand-100">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_28rem_at_85%_0%,rgba(0,168,240,0.18),transparent_65%)]"
        />
        <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-30" />

        <Container className="py-10 sm:py-12 lg:py-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.client },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow tone="dark">Vendor project</Eyebrow>
              <h1 className="mt-5 text-h1 text-white">{project.client}</h1>
              <p className="mt-5 max-w-2xl text-lead text-brand-200">{project.scope}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {project.disciplines.map((discipline) => (
                  <li
                    key={discipline}
                    className="rounded-md bg-accent-500/15 px-3 py-1.5 text-sm font-medium text-accent-200 ring-1 ring-inset ring-accent-400/30"
                  >
                    {disciplineLabels[discipline] ?? discipline}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`/contact?subject=${encodeURIComponent(`Enquiry: similar work to ${project.client}`)}`}
                  variant="accent"
                  icon="arrowRight"
                >
                  Request similar work
                </Button>
                <Button href="/projects" variant="outline">
                  All projects
                </Button>
              </div>
            </div>

            {clientLogo ? (
              <div className="lg:col-span-4 lg:justify-self-end">
                <div className="flex h-28 w-56 items-center justify-center rounded-xl bg-white p-6">
                  <Image
                    src={clientLogo}
                    alt={project.client}
                    width={200}
                    height={80}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Scope detail                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="scope-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                id="scope-heading"
                as="h2"
                eyebrow="Scope of work"
                title="What we were asked to do"
              />

              <p className="mt-8 text-lead text-brand-700">{project.scope}</p>

              <p className="mt-6 leading-relaxed text-brand-600">
                Work of this type is quoted after a check-up rather than from a catalogue, because
                the same symptom can have very different causes on two units of the same age. The
                services and equipment listed here are the disciplines this job drew on.
              </p>

              {services.length > 0 ? (
                <>
                  <h3 className="mt-10 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                    Services involved
                  </h3>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {services.map((service) => (
                      <li key={service.id} className="h-full">
                        <Link
                          href={`/services#${service.id}`}
                          className="group flex h-full items-start gap-3 rounded-xl bg-canvas p-4 ring-1 ring-inset ring-transparent transition-all hover:bg-white hover:shadow-card hover:ring-brand-200"
                        >
                          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 ring-1 ring-inset ring-brand-100 group-hover:text-accent-700">
                            <Icon name={service.icon} className="size-4" />
                          </span>
                          <span>
                            <span className="block font-semibold text-brand-900">
                              {service.title}
                            </span>
                            <span className="mt-1 block text-sm text-brand-600">
                              {service.summary}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <Card tone="muted" padding="lg">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                  Project summary
                </h3>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-brand-500">Client</dt>
                    <dd className="mt-1 text-brand-800">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-500">Disciplines</dt>
                    <dd className="mt-1 text-brand-800">
                      {project.disciplines
                        .map((discipline) => disciplineLabels[discipline] ?? discipline)
                        .join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-500">Delivered by</dt>
                    <dd className="mt-1 text-brand-800">{site.name}</dd>
                  </div>
                </dl>

                {equipmentItems.length > 0 ? (
                  <>
                    <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-500">
                      Equipment involved
                    </h3>
                    <ul className="mt-4 space-y-2">
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
                  </>
                ) : null}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Representative photographs                                       */}
      {/* ---------------------------------------------------------------- */}
      {photos.length > 0 ? (
        <Section tone="canvas" ariaLabelledby="photos-heading">
          <Container>
            <SectionHeading
              id="photos-heading"
              eyebrow="Work of this type"
              title="What this kind of job looks like"
              description="Photographs of comparable work from our gallery. They are our own photos, but they are not necessarily from this client's site."
              action={
                <Button href="/projects" variant="secondary" icon="arrowRight">
                  Full gallery
                </Button>
              }
            />

            <ul className="mt-12 grid gap-5 sm:grid-cols-3">
              {photos.map((photo, index) => (
                <li key={photo.src}>
                  <Reveal delay={index * 60}>
                    <figure className="overflow-hidden rounded-xl bg-brand-950 ring-1 ring-hairline">
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 640px) 30vw, 92vw"
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
      {/* Related projects                                                 */}
      {/* ---------------------------------------------------------------- */}
      {related.length > 0 ? (
        <Section tone="white" ariaLabelledby="related-heading">
          <Container>
            <SectionHeading
              id="related-heading"
              eyebrow="Similar projects"
              title="Other work in the same disciplines"
            />

            <ul className="mt-12 grid gap-4 lg:grid-cols-3">
              {related.map((other, index) => (
                <li key={other.id} className="h-full">
                  <Reveal delay={index * 60} className="h-full">
                    <Link href={`/projects/${other.id}`} className="group block h-full">
                      <Card interactive className="flex h-full gap-4" padding="lg">
                        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-100">
                          <Icon name="checkCircle" className="size-5" />
                        </span>
                        <div>
                          <h3 className="font-display text-base font-bold text-brand-900 group-hover:text-accent-700">
                            {other.client}
                          </h3>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-brand-600">
                            {other.scope}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBanner
        eyebrow="Your site next"
        title="Have work like this that needs doing?"
        description="Tell us the equipment, the fault and the location. We will arrange a check-up and quote what it actually needs."
        primary={{ label: "Request a quotation", href: "/contact" }}
        secondary={{ label: "Browse equipment", href: "/equipment" }}
      />
    </>
  );
}
