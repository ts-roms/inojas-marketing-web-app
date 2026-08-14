import type { IconName } from "@/components/ui/icons";
import { t } from "@/lib/i18n";

/**
 * ---------------------------------------------------------------------------
 * EQUIPMENT — structure only
 * ---------------------------------------------------------------------------
 * Ids, categories, icons, photo paths and relationships live here. Every word —
 * names, descriptions, detail paragraphs, work scopes, offerings and image alt
 * text — lives in `public/locale/en.json` under `equipment.items.<id>` and
 * `equipment.categories.<id>`.
 *
 * Adding an equipment line:
 *   1. Add an entry to `equipmentStructure` below.
 *   2. Add the matching `equipment.items.<id>` block to the locale file.
 *   3. Optionally drop a photo in `public/images/projects/`.
 * The listing, the detail page at /equipment/<id>, the filters, the footer and
 * the sitemap all pick it up automatically.
 */

export type ProductCategoryId = "material-handling" | "cooling" | "power" | "workshop";

export type ProductCategory = {
  id: ProductCategoryId;
  name: string;
  description: string;
  icon: IconName;
};

export type ProductPhoto = { src: string; alt: string };

export type Product = {
  /** Stable slug — also the detail page route: /equipment/<id>. */
  id: string;
  name: string;
  category: ProductCategoryId;
  description: string;
  detail: string;
  workScope: string[];
  offerings: string[];
  /** Service ids from data/services.ts that cover this equipment. */
  relatedServices: string[];
  icon: IconName;
  image?: string;
  imageAlt?: string;
  /** Further photographs; alt text comes from `projects.photos.<key>`. */
  gallery?: ProductPhoto[];
  featured?: boolean;
};

const categoryStructure: { id: ProductCategoryId; icon: IconName }[] = [
  { id: "material-handling", icon: "forklift" },
  { id: "cooling", icon: "snowflake" },
  { id: "power", icon: "battery" },
  { id: "workshop", icon: "gear" },
];

export const productCategories: ProductCategory[] = categoryStructure.map((category) => ({
  ...category,
  name: t.equipment.categories[category.id].name,
  description: t.equipment.categories[category.id].description,
}));

type EquipmentStructure = Omit<
  Product,
  "name" | "description" | "detail" | "workScope" | "offerings" | "imageAlt" | "gallery"
> & {
  /** Photo keys from `projects.photos` in the locale file. */
  galleryKeys?: string[];
};

const equipmentStructure: EquipmentStructure[] = [
  {
    id: "hvac-refrigeration-chiller",
    category: "cooling",
    relatedServices: [
      "refrigeration-airconditioning",
      "installation-maintenance",
      "cooling-tower-servicing",
    ],
    icon: "snowflake",
    image: "/images/projects/condenser-units-outdoor.webp",
    galleryKeys: [
      "condensing-unit-installation",
      "split-type-acu-installation",
      "refrigerant-charging",
      "refrigeration-pipework",
    ],
    featured: true,
  },
  {
    id: "hand-pallet-truck",
    category: "material-handling",
    relatedServices: ["hydraulic-equipment-repair", "parts-supply"],
    icon: "cylinder",
    image: "/images/projects/hydraulic-seal-kit.webp",
    featured: true,
  },
  {
    id: "electric-forklift",
    category: "material-handling",
    relatedServices: ["hydraulic-equipment-repair", "parts-supply", "installation-maintenance"],
    icon: "forklift",
    image: "/images/projects/forklift-service-yard.webp",
    featured: true,
  },
  {
    id: "diesel-gas-forklift",
    category: "material-handling",
    relatedServices: ["hydraulic-equipment-repair", "parts-supply"],
    icon: "forklift",
    image: "/images/projects/diesel-forklift-overhaul.webp",
    featured: true,
  },
  {
    id: "electrical-manual-stacker",
    category: "material-handling",
    relatedServices: ["hydraulic-equipment-repair", "fabrication-doors"],
    icon: "layers",
    image: "/images/projects/manual-stacker-repair.webp",
    galleryKeys: ["pallet-stacker-rebuild"],
    featured: true,
  },
  {
    id: "jack-crocodile-jack",
    category: "material-handling",
    relatedServices: ["hydraulic-equipment-repair"],
    icon: "cylinder",
    image: "/images/projects/hydraulic-cylinder-assembly.webp",
  },
  {
    id: "hydraulic-press",
    category: "workshop",
    relatedServices: ["hydraulic-equipment-repair", "fabrication-doors"],
    icon: "cylinder",
    image: "/images/projects/hydraulic-cylinder-workshop.webp",
    featured: true,
  },
  {
    id: "grinding-machine",
    category: "workshop",
    relatedServices: ["motor-rewinding", "installation-maintenance"],
    icon: "gear",
  },
  {
    id: "industrial-battery",
    category: "power",
    relatedServices: ["parts-supply", "installation-maintenance"],
    icon: "battery",
  },
  {
    id: "battery-charger",
    category: "power",
    relatedServices: ["parts-supply", "fabrication-doors"],
    icon: "bolt",
  },
  {
    id: "polyurethane-wheel",
    category: "material-handling",
    relatedServices: ["parts-supply", "hydraulic-equipment-repair"],
    icon: "flow",
  },
];

type EquipmentCopy = {
  name: string;
  description: string;
  detail: string;
  workScope: string[];
  offerings: string[];
  imageAlt: string;
};

const equipmentCopy = t.equipment.items as unknown as Record<string, EquipmentCopy>;
const photoCopy = t.projects.photos as unknown as Record<string, { alt: string; caption: string }>;

/** Structure joined with the copy from the locale file. */
export const equipment: Product[] = equipmentStructure.map((structure) => {
  const { galleryKeys, ...rest } = structure;
  const copy = equipmentCopy[structure.id];

  return {
    ...rest,
    name: copy?.name ?? structure.id,
    description: copy?.description ?? "",
    detail: copy?.detail ?? "",
    workScope: copy?.workScope ?? [],
    offerings: copy?.offerings ?? [],
    imageAlt: copy?.imageAlt,
    gallery: galleryKeys?.map((key) => ({
      src: `/images/projects/${key}.webp`,
      alt: photoCopy[key]?.alt ?? "",
    })),
  };
});

/** Backwards-compatible alias — the catalogue is equipment, not retail stock. */
export const products = equipment;

/** Equipment promoted on the home page showcase. */
export const featuredProducts = equipment.filter((item) => item.featured);

export function getCategory(id: ProductCategoryId): ProductCategory | undefined {
  return productCategories.find((category) => category.id === id);
}

export function getEquipment(id: string): Product | undefined {
  return equipment.find((item) => item.id === id);
}

export function productsByCategory(id: ProductCategoryId): Product[] {
  return equipment.filter((item) => item.category === id);
}

/** Other equipment in the same family, for the detail page footer. */
export function relatedEquipment(item: Product, limit = 3): Product[] {
  return equipment
    .filter((other) => other.id !== item.id && other.category === item.category)
    .slice(0, limit);
}
