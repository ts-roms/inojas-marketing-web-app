import type { IconName } from "@/components/ui/icons";

/**
 * ---------------------------------------------------------------------------
 * EQUIPMENT WE HANDLE
 * ---------------------------------------------------------------------------
 * Every line and every offering below is taken from the equipment grid in the
 * Inojas Hydraulic Repair Shop company profile. `offerings` uses the company's
 * own wording (brand new / repair services / reconditioned unit / parts /
 * general rehabilitation / fabrication / calibration / re-plating / rebounding).
 *
 * Photographs are the company's own project photos from the same document.
 * Lines without a matching photograph render an icon tile instead — no stock
 * imagery is substituted.
 *
 * Adding an equipment line:
 *   1. Append an object to `equipment` below.
 *   2. Make sure `category` matches an entry in `productCategories`.
 *   3. Optionally add a photo to `public/images/projects/` and reference it.
 */

export type ProductCategoryId = "material-handling" | "cooling" | "power" | "workshop";

export type ProductCategory = {
  id: ProductCategoryId;
  name: string;
  description: string;
  icon: IconName;
};

export type Product = {
  /** Stable slug — used for React keys and deep links (`/equipment#id`). */
  id: string;
  name: string;
  category: ProductCategoryId;
  /** One or two sentences describing the work we do on this equipment. */
  description: string;
  /** What we offer on this line, in the company's own terms. */
  offerings: string[];
  /** Icon used on the card and on the fallback tile. */
  icon: IconName;
  /** Optional project photograph. Path relative to /public. */
  image?: string;
  /** Required whenever `image` is set. */
  imageAlt?: string;
  /** Promoted to the home page showcase. */
  featured?: boolean;
};

export const productCategories: ProductCategory[] = [
  {
    id: "material-handling",
    name: "Material Handling",
    description: "Forklifts, pallet trucks, stackers and jacks.",
    icon: "forklift",
  },
  {
    id: "cooling",
    name: "Cooling & HVAC",
    description: "Air-conditioning, refrigeration and chiller units.",
    icon: "snowflake",
  },
  {
    id: "power",
    name: "Power & Batteries",
    description: "Industrial batteries and charging equipment.",
    icon: "battery",
  },
  {
    id: "workshop",
    name: "Workshop Equipment",
    description: "Presses, grinders and shop machinery.",
    icon: "gear",
  },
];

export const equipment: Product[] = [
  {
    id: "hvac-refrigeration-chiller",
    name: "HVAC, AC Refrigeration & Chiller",
    category: "cooling",
    description:
      "Package-type and centralised units, chillers and refrigeration systems — supplied brand new, repaired in place, or offered as a reconditioned unit.",
    offerings: ["Brand new", "Repair services", "Reconditioned unit"],
    icon: "snowflake",
    image: "/images/projects/condenser-units-outdoor.jpg",
    imageAlt:
      "Two outdoor condensing units installed on a concrete plinth during an Inojas air-conditioning project",
    featured: true,
  },
  {
    id: "hand-pallet-truck",
    name: "Hand Pallet Truck",
    category: "material-handling",
    description:
      "The workhorse of any warehouse. We rebuild the hydraulic unit, replace worn wheels and seals, or supply a brand new or reconditioned truck.",
    offerings: ["Brand new", "Repair services", "Reconditioned unit"],
    icon: "cylinder",
    image: "/images/projects/hydraulic-seal-kit.jpg",
    imageAlt:
      "Hydraulic seal kit and components laid out on a workbench during a pallet truck rebuild",
    featured: true,
  },
  {
    id: "electric-forklift",
    name: "Electric Forklift",
    category: "material-handling",
    description:
      "Repairs, parts supply and general rehabilitation for electric forklifts, carried out at your site or in the shop.",
    offerings: ["Repair services", "Parts", "General rehabilitation"],
    icon: "forklift",
    image: "/images/projects/forklift-service-yard.jpg",
    imageAlt: "Forklift with its mast raised undergoing repair in the service yard",
    featured: true,
  },
  {
    id: "diesel-gas-forklift",
    name: "Diesel / Gas Forklift",
    category: "material-handling",
    description:
      "Engine-driven forklifts serviced end to end — hydraulics, mast, transmission and running gear — with parts supplied as part of the job.",
    offerings: ["Repair services", "Parts", "General rehabilitation"],
    icon: "forklift",
    image: "/images/projects/diesel-forklift-overhaul.jpg",
    imageAlt: "Yellow diesel forklift undergoing general rehabilitation outdoors",
    featured: true,
  },
  {
    id: "electrical-manual-stacker",
    name: "Electrical / Manual Stacker",
    category: "material-handling",
    description:
      "Walk-behind stackers supplied brand new, or restored — including general re-plating of the frame and mast.",
    offerings: ["Brand new", "General re-plating"],
    icon: "layers",
    image: "/images/projects/manual-stacker-repair.jpg",
    imageAlt: "Manual stacker with a red mast being repaired inside a client's facility",
    featured: true,
  },
  {
    id: "jack-crocodile-jack",
    name: "Jack / Crocodile Jack",
    category: "material-handling",
    description:
      "Bottle jacks, trolley jacks and crocodile jacks resealed and returned to full lifting capacity, or replaced with a new unit.",
    offerings: ["Repair services", "Brand new"],
    icon: "cylinder",
    image: "/images/projects/hydraulic-cylinder-assembly.jpg",
    imageAlt: "Hydraulic cylinder assembly removed for reseal and inspection",
  },
  {
    id: "hydraulic-press",
    name: "Hydraulic Press",
    category: "workshop",
    description:
      "Shop presses repaired and, where a part is no longer available, fabricated in-house to match the original.",
    offerings: ["Repair services", "Fabrication"],
    icon: "cylinder",
    image: "/images/projects/hydraulic-cylinder-workshop.jpg",
    imageAlt: "Large hydraulic cylinder on the workshop floor awaiting repair",
    featured: true,
  },
  {
    id: "grinding-machine",
    name: "Grinding Machine",
    category: "workshop",
    description:
      "Bench and pedestal grinding machines repaired and calibrated so they cut true and run safely.",
    offerings: ["Repair services", "Calibration"],
    icon: "gear",
  },
  {
    id: "industrial-battery",
    name: "Industrial Battery",
    category: "power",
    description:
      "Traction batteries for electric material handling equipment — supplied new or repaired to extend service life.",
    offerings: ["Brand new", "Repair services"],
    icon: "battery",
  },
  {
    id: "battery-charger",
    name: "Battery Charger",
    category: "power",
    description:
      "Charger repairs, with fabrication of enclosures and mounts where the original hardware is beyond saving.",
    offerings: ["Repair services", "Fabrication"],
    icon: "bolt",
  },
  {
    id: "polyurethane-wheel",
    name: "Polyurethane Wheel",
    category: "material-handling",
    description:
      "Worn load and steer wheels rebounded with fresh polyurethane onto the original hub, or replaced with new wheels.",
    offerings: ["Brand new", "Rebounding"],
    icon: "flow",
  },
];

/** Backwards-compatible alias — the catalogue is equipment, not retail stock. */
export const products = equipment;

/** Equipment promoted on the home page showcase. */
export const featuredProducts = equipment.filter((item) => item.featured);

export function getCategory(id: ProductCategoryId): ProductCategory | undefined {
  return productCategories.find((category) => category.id === id);
}

export function productsByCategory(id: ProductCategoryId): Product[] {
  return equipment.filter((item) => item.category === id);
}
