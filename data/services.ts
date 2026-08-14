import type { IconName } from "@/components/ui/icons";
import { t } from "@/lib/i18n";

/**
 * ---------------------------------------------------------------------------
 * SERVICES — structure only
 * ---------------------------------------------------------------------------
 * Ids, icons, relationships and ordering live here. Every word — titles,
 * summaries, descriptions and benefit lists — lives in
 * `public/locale/en.json` under `services.items.<id>`.
 *
 * Adding a service:
 *   1. Add an entry to `serviceStructure` below.
 *   2. Add the matching `services.items.<id>` block to the locale file.
 * The listing page, the detail page at /services/<id>, the footer and the
 * sitemap all pick it up automatically.
 */

export type ServiceDiscipline = "hydraulics" | "cooling" | "motors" | "fabrication";

export type Service = {
  /** Stable identifier — also the detail page route: /services/<id>. */
  id: string;
  title: string;
  summary: string;
  description: string;
  benefits: string[];
  /** Equipment ids from data/products.ts that this service covers. */
  relatedEquipment: string[];
  /** Groups the service with matching project photographs. */
  discipline: ServiceDiscipline;
  icon: IconName;
  featured?: boolean;
};

type ServiceStructure = Omit<Service, "title" | "summary" | "description" | "benefits">;

const serviceStructure: ServiceStructure[] = [
  {
    id: "hydraulic-equipment-repair",
    relatedEquipment: [
      "hand-pallet-truck",
      "electric-forklift",
      "diesel-gas-forklift",
      "electrical-manual-stacker",
      "jack-crocodile-jack",
      "hydraulic-press",
    ],
    discipline: "hydraulics",
    icon: "forklift",
    featured: true,
  },
  {
    id: "refrigeration-airconditioning",
    relatedEquipment: ["hvac-refrigeration-chiller"],
    discipline: "cooling",
    icon: "snowflake",
    featured: true,
  },
  {
    id: "installation-maintenance",
    relatedEquipment: [
      "hvac-refrigeration-chiller",
      "electric-forklift",
      "industrial-battery",
      "grinding-machine",
    ],
    discipline: "cooling",
    icon: "clock",
    featured: true,
  },
  {
    id: "motor-rewinding",
    relatedEquipment: ["grinding-machine", "hvac-refrigeration-chiller"],
    discipline: "motors",
    icon: "gear",
    featured: true,
  },
  {
    id: "cooling-tower-servicing",
    relatedEquipment: ["hvac-refrigeration-chiller"],
    discipline: "cooling",
    icon: "fan",
    featured: true,
  },
  {
    id: "fabrication-doors",
    relatedEquipment: ["battery-charger", "electrical-manual-stacker", "hydraulic-press"],
    discipline: "fabrication",
    icon: "door",
    featured: true,
  },
  {
    id: "parts-supply",
    relatedEquipment: [
      "polyurethane-wheel",
      "industrial-battery",
      "battery-charger",
      "hand-pallet-truck",
    ],
    discipline: "hydraulics",
    icon: "layers",
  },
];

type ServiceCopy = { title: string; summary: string; description: string; benefits: string[] };

const serviceCopy = t.services.items as unknown as Record<string, ServiceCopy>;

/** Structure joined with the copy from the locale file. */
export const services: Service[] = serviceStructure.map((structure) => {
  const copy = serviceCopy[structure.id];
  return {
    ...structure,
    title: copy?.title ?? structure.id,
    summary: copy?.summary ?? "",
    description: copy?.description ?? "",
    benefits: copy?.benefits ?? [],
  };
});

/** Services promoted on the home page overview. */
export const featuredServices = services.filter((service) => service.featured);

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

/** Other services sharing a discipline, for the detail page footer. */
export function relatedServices(service: Service, limit = 3): Service[] {
  const sameDiscipline = services.filter(
    (other) => other.id !== service.id && other.discipline === service.discipline,
  );
  const rest = services.filter(
    (other) => other.id !== service.id && other.discipline !== service.discipline,
  );
  return [...sameDiscipline, ...rest].slice(0, limit);
}

/**
 * The engagement process, as set out in the company profile.
 * Wording lives in the locale file under `process.steps`.
 */
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

const processOrder = ["enquiry", "assessment", "delivery", "completion"] as const;

export const processSteps: ProcessStep[] = processOrder.map((key, index) => ({
  step: String(index + 1).padStart(2, "0"),
  title: t.process.steps[key].title,
  description: t.process.steps[key].description,
}));
