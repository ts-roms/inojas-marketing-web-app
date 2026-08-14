import type { IconName } from "@/components/ui/icons";
import { fill, t } from "@/lib/i18n";
import { photoSrc } from "@/data/products";
import { textVars } from "@/data/site";

/**
 * ---------------------------------------------------------------------------
 * COMPANY NARRATIVE
 * ---------------------------------------------------------------------------
 * Philosophy, mission, vision, values, permits, figures, clients, vendor
 * projects and project photographs all live in `public/locale/en.json`. This
 * module types those records and provides the cross-lookups the pages use.
 *
 * Sourced from the Inojas Hydraulic Repair Shop company profile (Nov 2024). No
 * claims, certifications or figures have been added beyond that document.
 */

type IconRecord = { icon: string; title: string; description: string };

function withIcon(records: Record<string, IconRecord>, interpolate = false) {
  return Object.entries(records).map(([id, record]) => ({
    id,
    icon: record.icon as IconName,
    title: record.title,
    description: interpolate ? fill(record.description, textVars) : record.description,
  }));
}

/* ---------------------------------------------------------------- values -- */

export type ValueProp = { id: string; title: string; description: string; icon: IconName };

export const valueProps: ValueProp[] = withIcon(
  t.valueProps as unknown as Record<string, IconRecord>,
  true,
);

export type CoreValue = ValueProp;

export const coreValues: CoreValue[] = withIcon(
  t.company.coreValues as unknown as Record<string, IconRecord>,
);

export type LegalDocument = ValueProp;

/** Registrations held, from the Legal Documents pages of the profile. */
export const legalDocuments: LegalDocument[] = withIcon(
  t.trust.documents as unknown as Record<string, IconRecord>,
);

/* ------------------------------------------------------------- narrative -- */

export const philosophy = t.company.philosophy;
export const mission = t.company.mission;
export const vision = t.company.vision;
export const statsSource = t.company.statsSource;
export const sectors: string[] = t.company.sectors;
export const milestones = Object.values(t.company.milestones);
export const stats = Object.values(t.company.stats);

/* -------------------------------------------------------------- projects -- */

export type ProjectDiscipline = "hydraulics" | "cooling" | "motors" | "fabrication";

export type VendorProject = {
  /** Stable slug — also the detail page route: /projects/<id>. */
  id: string;
  client: string;
  scope: string;
  disciplines: ProjectDiscipline[];
  /** Service ids from the locale file. */
  services: string[];
  /** Equipment ids from the locale file. */
  equipment: string[];
  /** Client logo file stem in public/images/clients, when we have one. */
  logo: string | null;
};

type ProjectRecord = {
  disciplines: string[];
  services: string[];
  equipment: string[];
  logo: string | null;
  client: string;
  scope: string;
};

const projectRecords = t.projects.items as unknown as Record<string, ProjectRecord>;

export const vendorProjects: VendorProject[] = Object.entries(projectRecords).map(
  ([id, record]) => ({
    id,
    client: record.client,
    scope: record.scope,
    disciplines: record.disciplines as ProjectDiscipline[],
    services: record.services,
    equipment: record.equipment,
    logo: record.logo,
  }),
);

export function getVendorProject(id: string): VendorProject | undefined {
  return vendorProjects.find((project) => project.id === id);
}

/** Projects where this service was part of the scope. */
export function vendorProjectsForService(serviceId: string, limit = 4): VendorProject[] {
  return vendorProjects.filter((project) => project.services.includes(serviceId)).slice(0, limit);
}

/** Other projects sharing a discipline, for the detail page footer. */
export function relatedVendorProjects(project: VendorProject, limit = 3): VendorProject[] {
  return vendorProjects
    .filter(
      (other) =>
        other.id !== project.id &&
        other.disciplines.some((discipline) => project.disciplines.includes(discipline)),
    )
    .slice(0, limit);
}

/* --------------------------------------------------------------- clients -- */

/**
 * NOTE FOR THE CLIENT: these are third-party trade marks, shown because they
 * appear in your printed company profile. Confirm you are comfortable
 * publishing them on a public website before launch — removing a `logo` from a
 * project in the locale file drops it from the strip.
 *
 * Derived from the projects, so a client is named identically everywhere.
 */
export type Client = { name: string; logo?: string };

export const clients: Client[] = vendorProjects.map((project) => ({
  name: project.client,
  logo: project.logo ? `/images/clients/${project.logo}.webp` : undefined,
}));

/* ---------------------------------------------------------------- photos -- */

export type ProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
  discipline: ProjectDiscipline;
};

const photoRecords = t.projects.photos as unknown as Record<
  string,
  { discipline: string; alt: string; caption: string }
>;

export const projectPhotos: ProjectPhoto[] = Object.entries(photoRecords).map(([key, record]) => ({
  src: photoSrc(key),
  alt: record.alt,
  caption: record.caption,
  discipline: record.discipline as ProjectDiscipline,
}));

/** Photographs of the same kind of work — never presented as one client's job. */
export function photosForDisciplines(
  disciplines: ProjectDiscipline[],
  limit = 3,
): ProjectPhoto[] {
  return projectPhotos.filter((photo) => disciplines.includes(photo.discipline)).slice(0, limit);
}
