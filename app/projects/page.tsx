import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { vendorProjects } from "@/data/company";
import { site } from "@/data/site";

const title = "Projects";
const description =
  "Completed hydraulic, material handling, refrigeration and fabrication work by Inojas Hydraulic Repair Shop — with the clients and scopes we have delivered to date.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Finished projects"
        title="Equipment we have put back into service"
        description={description}
        actions={
          <>
            <Button href="/contact" variant="accent" icon="arrowRight">
              Request a quotation
            </Button>
            <Button href="/services" variant="outline">
              See our services
            </Button>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Photo gallery                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="white" ariaLabelledby="gallery-heading">
        <Container>
          <SectionHeading
            id="gallery-heading"
            eyebrow="On the job"
            title="Photographs from our own workshop and client sites"
            description="Filter by discipline to see the kind of work we take on. Every photograph here is our own — no stock imagery."
          />

          <div className="mt-12">
            <ProjectGallery />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Vendor project record                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="canvas" ariaLabelledby="record-heading">
        <Container>
          <SectionHeading
            id="record-heading"
            eyebrow="Vendor projects to date"
            title="What we delivered, and for whom"
            description="The record of vendor work from our company profile — the scope in each case is described as it was carried out."
          />

          <ul className="mt-12 grid gap-4 lg:grid-cols-2">
            {vendorProjects.map((project, index) => (
              <li key={project.id} className="h-full">
                <Reveal delay={Math.min(index, 8) * 40} className="h-full">
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
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors group-hover:text-accent-700">
                        View project
                        <Icon
                          name="arrowRight"
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClientsStrip tone="white" />

      <CtaBanner
        eyebrow="Your equipment next"
        title="Have something that needs the same treatment?"
        description="Tell us the unit, the fault and where it sits. We will advise whether it is a repair, a rehabilitation or a replacement — and quote accordingly."
        primary={{ label: "Request a quotation", href: "/contact" }}
        secondary={{ label: "Browse equipment", href: "/equipment" }}
      />
    </>
  );
}
