import type { IconName } from "@/components/ui/icons";
import { t } from "@/lib/i18n";

/**
 * ---------------------------------------------------------------------------
 * SERVICES
 * ---------------------------------------------------------------------------
 * The records live in `public/locale/en.json` under `services.items`, keyed by
 * id. Each entry carries both its structure (icon, discipline, featured, the
 * equipment it applies to) and its copy (title, summary, description,
 * benefits). This module types them and provides the lookups pages need.
 *
 * Adding a service: add a block to `services.items` in the locale file. It
 * renders in the order it appears there, and the listing, the detail page at
 * /services/<id>, the footer and the sitemap all pick it up automatically.
 */

export type ServiceDiscipline = "hydraulics" | "cooling" | "motors" | "fabrication";

export type Service = {
  /** Stable identifier — also the detail page route: /services/<id>. */
  id: string;
  title: string;
  summary: string;
  description: string;
  benefits: string[];
  /** Equipment ids this service applies to. */
  relatedEquipment: string[];
  /** Groups the service with matching project photographs. */
  discipline: ServiceDiscipline;
  icon: IconName;
  featured?: boolean;
};

type ServiceRecord = {
  icon: string;
  discipline: string;
  featured: boolean;
  relatedEquipment: string[];
  title: string;
  summary: string;
  description: string;
  benefits: string[];
};

const records = t.services.items as unknown as Record<string, ServiceRecord>;

/** Order follows the locale file, so moving a block reorders the site. */
export const services: Service[] = Object.entries(records).map(([id, record]) => ({
  id,
  title: record.title,
  summary: record.summary,
  description: record.description,
  benefits: record.benefits,
  relatedEquipment: record.relatedEquipment,
  discipline: record.discipline as ServiceDiscipline,
  icon: record.icon as IconName,
  featured: record.featured,
}));

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
 * The engagement process from the company profile. Copy lives under
 * `process.steps`; `process.order` sets the sequence.
 */
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type ProcessKey = keyof typeof t.process.steps;

export const processSteps: ProcessStep[] = (t.process.order as ProcessKey[]).map((key, index) => ({
  step: String(index + 1).padStart(2, "0"),
  title: t.process.steps[key].title,
  description: t.process.steps[key].description,
}));
