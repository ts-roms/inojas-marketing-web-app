import type { IconName } from "@/components/ui/icons";
import { fill, t } from "@/lib/i18n";
import { textVars } from "@/data/site";

/**
 * ---------------------------------------------------------------------------
 * COMPANY NARRATIVE — structure only
 * ---------------------------------------------------------------------------
 * Icons, ids, image paths, orderings and relationships live here. Every word —
 * philosophy, mission, vision, values, milestones, figures, project scopes and
 * photo captions — lives in `public/locale/en.json`.
 *
 * Sourced from the Inojas Hydraulic Repair Shop company profile (Nov 2024).
 * No claims, certifications or figures have been added beyond that document.
 */

/* -------------------------------------------------------------------------- */
/* Why choose us                                                              */
/* -------------------------------------------------------------------------- */

export type ValueProp = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
};

const valuePropStructure: { id: string; icon: IconName }[] = [
  { id: "skilled-technicians", icon: "people" },
  { id: "environmentally-friendly", icon: "spark" },
  { id: "one-shop", icon: "layers" },
  { id: "on-site-or-shop", icon: "compass" },
];

const valuePropCopy = t.valueProps as unknown as Record<
  string,
  { title: string; description: string }
>;

export const valueProps: ValueProp[] = valuePropStructure.map((item) => ({
  ...item,
  title: valuePropCopy[item.id]?.title ?? item.id,
  description: fill(valuePropCopy[item.id]?.description ?? "", textVars),
}));

/* -------------------------------------------------------------------------- */
/* Registrations held                                                         */
/* -------------------------------------------------------------------------- */

export type LegalDocument = { id: string; title: string; description: string; icon: IconName };

const legalDocumentStructure: { id: keyof typeof t.trust.documents; icon: IconName }[] = [
  { id: "dti", icon: "document" },
  { id: "mayors", icon: "shield" },
  { id: "dole", icon: "people" },
  { id: "registration", icon: "checkCircle" },
];

export const legalDocuments: LegalDocument[] = legalDocumentStructure.map((item) => ({
  id: item.id,
  icon: item.icon,
  title: t.trust.documents[item.id].title,
  description: t.trust.documents[item.id].description,
}));

/* -------------------------------------------------------------------------- */
/* Narrative                                                                  */
/* -------------------------------------------------------------------------- */

export const philosophy = t.company.philosophy;
export const mission = t.company.mission;
export const vision = t.company.vision;
export const statsSource = t.company.statsSource;
export const sectors: string[] = t.company.sectors;

export type CoreValue = { id: string; title: string; description: string; icon: IconName };

const coreValueStructure: { id: keyof typeof t.company.coreValues; icon: IconName }[] = [
  { id: "customer-satisfaction", icon: "checkCircle" },
  { id: "teamwork", icon: "people" },
  { id: "resilient-organisation", icon: "shield" },
  { id: "global-competitiveness", icon: "compass" },
  { id: "new-challenges", icon: "spark" },
  { id: "care", icon: "gauge" },
];

export const coreValues: CoreValue[] = coreValueStructure.map((item) => ({
  id: item.id,
  icon: item.icon,
  title: t.company.coreValues[item.id].title,
  description: t.company.coreValues[item.id].description,
}));

const milestoneOrder = ["founded", "hydraulics", "cooling", "today"] as const;

export const milestones = milestoneOrder.map((key) => t.company.milestones[key]);

const statOrder = ["established", "clients", "equipmentLines", "registrations"] as const;

export const stats = statOrder.map((key) => t.company.stats[key]);

/* -------------------------------------------------------------------------- */
/* Clients                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * NOTE FOR THE CLIENT: these are third-party trade marks, shown because they
 * appear in your printed company profile. Confirm you are comfortable
 * publishing them on a public website before launch.
 *
 * Names come from `projects.items.<id>.client` where a project exists, so a
 * client is named identically everywhere.
 */
export type Client = { name: string; logo?: string };

const clientStructure: { projectId?: string; name?: string; logo?: string }[] = [
  { projectId: "canlubang-golf-and-country-club", logo: "/images/clients/canlubang-golf-and-country-club.webp" },
  { projectId: "atkins-import-export", logo: "/images/clients/atkins.webp" },
  { projectId: "varex-imaging", logo: "/images/clients/varex-imaging.webp" },
  { projectId: "acbel-philippines", logo: "/images/clients/acbel.webp" },
  { projectId: "universal-robina", logo: "/images/clients/universal-robina.webp" },
  { projectId: "ninja-van-philippines", logo: "/images/clients/ninjavan.webp" },
  { projectId: "san-miguel-corporation", logo: "/images/clients/san-miguel-corporation.webp" },
  { projectId: "interphil-laboratories", logo: "/images/clients/interphil-laboratories.webp" },
  { projectId: "blue-macay-food-corporation", logo: "/images/clients/blue-macay.webp" },
  { projectId: "crestec-philippines", logo: "/images/clients/crestec.webp" },
  { projectId: "samsof-technologies", logo: "/images/clients/samsof-technologies.webp" },
  { projectId: "kerry-logistikus-philippines", logo: "/images/clients/kerry-logistics.webp" },
  { projectId: "pioneer-adhesive", logo: "/images/clients/pioneer-adhesive.webp" },
  {
    projectId: "san-sebastian-college-recoletos",
    logo: "/images/clients/san-sebastian-college-recoletos.webp",
  },
  { projectId: "the-country-club" },
  { projectId: "vl-dj-metal-fabrication" },
];

/* -------------------------------------------------------------------------- */
/* Vendor projects                                                            */
/* -------------------------------------------------------------------------- */

export type ProjectDiscipline = "hydraulics" | "cooling" | "motors" | "fabrication";

export type VendorProject = {
  /** Stable slug — also the detail page route: /projects/<id>. */
  id: string;
  client: string;
  scope: string;
  disciplines: ProjectDiscipline[];
  /** Service ids from data/services.ts. */
  services: string[];
  /** Equipment ids from data/products.ts. */
  equipment: string[];
};

type VendorStructure = Omit<VendorProject, "client" | "scope">;

const vendorStructure: VendorStructure[] = [
  {
    id: "canlubang-golf-and-country-club",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "atkins-import-export",
    disciplines: ["hydraulics", "cooling"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["electric-forklift", "hand-pallet-truck", "diesel-gas-forklift"],
  },
  {
    id: "varex-imaging",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "acbel-philippines",
    disciplines: ["hydraulics", "fabrication"],
    services: ["hydraulic-equipment-repair", "fabrication-doors"],
    equipment: ["electric-forklift", "hand-pallet-truck"],
  },
  {
    id: "universal-robina",
    disciplines: ["cooling", "motors"],
    services: ["refrigeration-airconditioning", "motor-rewinding"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "ninja-van-philippines",
    disciplines: ["hydraulics", "fabrication"],
    services: ["installation-maintenance", "fabrication-doors"],
    equipment: [],
  },
  {
    id: "san-miguel-corporation",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["diesel-gas-forklift", "electric-forklift", "hand-pallet-truck"],
  },
  {
    id: "interphil-laboratories",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "blue-macay-food-corporation",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair"],
    equipment: ["hand-pallet-truck"],
  },
  {
    id: "the-country-club",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "crestec-philippines",
    disciplines: ["fabrication", "hydraulics"],
    services: ["fabrication-doors", "hydraulic-equipment-repair"],
    equipment: ["hand-pallet-truck", "electric-forklift"],
  },
  {
    id: "samsof-technologies",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "parts-supply"],
    equipment: ["hand-pallet-truck", "polyurethane-wheel"],
  },
  {
    id: "kerry-logistikus-philippines",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "pioneer-adhesive",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["hand-pallet-truck"],
  },
  {
    id: "san-sebastian-college-recoletos",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "vl-dj-metal-fabrication",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["diesel-gas-forklift", "electric-forklift"],
  },
];

const projectCopy = t.projects.items as unknown as Record<
  string,
  { client: string; scope: string }
>;

export const vendorProjects: VendorProject[] = vendorStructure.map((structure) => ({
  ...structure,
  client: projectCopy[structure.id]?.client ?? structure.id,
  scope: projectCopy[structure.id]?.scope ?? "",
}));

export const clients: Client[] = clientStructure.map((entry) => ({
  name: entry.projectId ? (projectCopy[entry.projectId]?.client ?? entry.projectId) : (entry.name ?? ""),
  logo: entry.logo,
}));

export function getVendorProject(id: string): VendorProject | undefined {
  return vendorProjects.find((project) => project.id === id);
}

/** Projects from the company profile where this service was part of the scope. */
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

/* -------------------------------------------------------------------------- */
/* Project photographs                                                        */
/* -------------------------------------------------------------------------- */

export type ProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
  discipline: ProjectDiscipline;
};

/** Photo key (also the filename) paired with its discipline. */
const photoStructure: { key: keyof typeof t.projects.photos; discipline: ProjectDiscipline }[] = [
  { key: "vehicle-lift-installation", discipline: "hydraulics" },
  { key: "vehicle-lift-service", discipline: "hydraulics" },
  { key: "dock-leveler-platform", discipline: "hydraulics" },
  { key: "dock-leveler-cylinder", discipline: "hydraulics" },
  { key: "dock-leveler-welding", discipline: "fabrication" },
  { key: "hydraulic-cylinder-workshop", discipline: "hydraulics" },
  { key: "hydraulic-cylinder-assembly", discipline: "hydraulics" },
  { key: "hydraulic-seal-kit", discipline: "hydraulics" },
  { key: "forklift-service-yard", discipline: "hydraulics" },
  { key: "diesel-forklift-overhaul", discipline: "hydraulics" },
  { key: "manual-stacker-repair", discipline: "hydraulics" },
  { key: "pallet-stacker-rebuild", discipline: "hydraulics" },
  { key: "condensing-unit-installation", discipline: "cooling" },
  { key: "condenser-units-outdoor", discipline: "cooling" },
  { key: "split-type-acu-installation", discipline: "cooling" },
  { key: "refrigerant-charging", discipline: "cooling" },
  { key: "refrigeration-pipework", discipline: "cooling" },
  { key: "motor-rewinding-bench", discipline: "motors" },
  { key: "compressor-motor-repair", discipline: "motors" },
  { key: "roll-up-door-installation", discipline: "fabrication" },
];

export const projectPhotos: ProjectPhoto[] = photoStructure.map((photo) => ({
  src: `/images/projects/${photo.key}.webp`,
  discipline: photo.discipline,
  alt: t.projects.photos[photo.key].alt,
  caption: t.projects.photos[photo.key].caption,
}));

/** Photographs of the same kind of work — never presented as one client's job. */
export function photosForDisciplines(
  disciplines: ProjectDiscipline[],
  limit = 3,
): ProjectPhoto[] {
  return projectPhotos.filter((photo) => disciplines.includes(photo.discipline)).slice(0, limit);
}
