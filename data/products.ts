import type { IconName } from "@/components/ui/icons";
import { t } from "@/lib/i18n";

/**
 * ---------------------------------------------------------------------------
 * EQUIPMENT
 * ---------------------------------------------------------------------------
 * The records live in `public/locale/en.json` under `equipment.items` and
 * `equipment.categories`, keyed by id. Each entry carries its structure
 * (category, icon, photo, gallery, related services) alongside its copy. This
 * module types them and derives the image paths.
 *
 * Adding an equipment line: add a block to `equipment.items` in the locale
 * file. `photo` and `gallery` take photo keys from `projects.photos`, which are
 * also the filenames in `public/images/projects/`. Omit `photo` and the card
 * falls back to an icon tile rather than borrowed stock imagery.
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
  /** Service ids that cover this equipment. */
  relatedServices: string[];
  icon: IconName;
  image?: string;
  imageAlt?: string;
  gallery?: ProductPhoto[];
  featured?: boolean;
};

/** Photo keys map 1:1 to files in public/images/projects. */
export function photoSrc(key: string): string {
  return `/images/projects/${key}.webp`;
}

const photoRecords = t.projects.photos as unknown as Record<
  string,
  { discipline: string; alt: string; caption: string }
>;

const categoryRecords = t.equipment.categories as unknown as Record<
  string,
  { icon: string; name: string; description: string }
>;

export const productCategories: ProductCategory[] = Object.entries(categoryRecords).map(
  ([id, record]) => ({
    id: id as ProductCategoryId,
    name: record.name,
    description: record.description,
    icon: record.icon as IconName,
  }),
);

type EquipmentRecord = {
  category: string;
  icon: string;
  photo: string | null;
  gallery: string[];
  relatedServices: string[];
  featured: boolean;
  name: string;
  description: string;
  detail: string;
  workScope: string[];
  offerings: string[];
  imageAlt?: string;
};

const records = t.equipment.items as unknown as Record<string, EquipmentRecord>;

/** Order follows the locale file, so moving a block reorders the catalogue. */
export const equipment: Product[] = Object.entries(records).map(([id, record]) => ({
  id,
  name: record.name,
  category: record.category as ProductCategoryId,
  description: record.description,
  detail: record.detail,
  workScope: record.workScope,
  offerings: record.offerings,
  relatedServices: record.relatedServices,
  icon: record.icon as IconName,
  image: record.photo ? photoSrc(record.photo) : undefined,
  imageAlt: record.imageAlt,
  gallery: record.gallery.length
    ? record.gallery.map((key) => ({
        src: photoSrc(key),
        alt: photoRecords[key]?.alt ?? "",
      }))
    : undefined,
  featured: record.featured,
}));

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
