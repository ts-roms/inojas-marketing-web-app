import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectPhotos } from "@/data/company";

const SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw";

/** Six photographs of completed work, leading into the full gallery. */
export function ProjectsPreview() {
  const highlights = [
    projectPhotos[8],
    projectPhotos[15],
    projectPhotos[5],
    projectPhotos[14],
    projectPhotos[17],
    projectPhotos[19],
  ].filter((photo) => photo !== undefined);

  return (
    <Section tone="canvas" ariaLabelledby="projects-preview-heading">
      <Container>
        <SectionHeading
          id="projects-preview-heading"
          eyebrow={t.home.projectsPreview.eyebrow}
          title={t.home.projectsPreview.title}
          description={t.home.projectsPreview.description}
          action={
            <Button href="/projects" variant="secondary" icon="arrowRight">
              {t.actions.viewAllWork}
            </Button>
          }
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((photo, index) => (
            <li key={photo.src}>
              <Reveal delay={index * 60}>
                <figure className="group overflow-hidden rounded-xl bg-brand-950 ring-1 ring-hairline">
                  <div className="relative aspect-4/5 overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={SIZES}
                      loading="lazy"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="flex items-center gap-2 bg-white px-4 py-3.5 text-sm font-medium text-brand-800">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-accent-500"
                    />
                    {photo.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
