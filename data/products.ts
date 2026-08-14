import type { IconName } from "@/components/ui/icons";

/**
 * ---------------------------------------------------------------------------
 * EQUIPMENT WE HANDLE
 * ---------------------------------------------------------------------------
 * Every line and every `offerings` entry is taken from the equipment grid in
 * the Inojas Hydraulic Repair Shop company profile, using the company's own
 * wording (brand new / repair services / reconditioned unit / parts / general
 * rehabilitation / fabrication / calibration / re-plating / rebounding).
 *
 * `detail` and `workScope` describe the trade work involved and are the only
 * fields written for the website rather than lifted from the profile. They
 * deliberately avoid specifications, brands, capacities or turnaround times —
 * add those only when the shop can stand behind them.
 *
 * Photographs are the company's own project photos. Lines without a matching
 * photograph render an icon tile instead — no stock imagery is substituted.
 *
 * Adding an equipment line:
 *   1. Append an object to `equipment` below.
 *   2. Make sure `category` matches an entry in `productCategories` and that
 *      `relatedServices` ids exist in data/services.ts.
 *   3. The listing page, the detail page at /equipment/<id>, the filters, the
 *      footer and the sitemap all pick it up automatically.
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
  /** One or two sentences for the card. */
  description: string;
  /** Opening paragraph on the detail page. */
  detail: string;
  /** What the work usually involves — shown as a checklist on the detail page. */
  workScope: string[];
  /** What we offer on this line, in the company's own terms. */
  offerings: string[];
  /** Service ids from data/services.ts that cover this equipment. */
  relatedServices: string[];
  /** Icon used on the card and on the fallback tile. */
  icon: IconName;
  /** Lead photograph. Path relative to /public. */
  image?: string;
  /** Required whenever `image` is set. */
  imageAlt?: string;
  /** Further photographs of this equipment from our own jobs. */
  gallery?: ProductPhoto[];
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
    detail:
      "Cooling work covers everything from a split-type unit in an office to a walk-in freezer or a centralised plant. We repair units on site where we can, and take on transfers, replacements and complete installations where a repair is no longer the sensible option.",
    workScope: [
      "Fault diagnosis on the unit rather than a parts-swap guess",
      "Leak testing, evacuation and refrigerant charging",
      "Compressor and condenser repair, transfer or replacement",
      "Commissioning and handover once temperatures hold",
    ],
    offerings: ["Brand new", "Repair services", "Reconditioned unit"],
    relatedServices: [
      "refrigeration-airconditioning",
      "installation-maintenance",
      "cooling-tower-servicing",
    ],
    icon: "snowflake",
    image: "/images/projects/condenser-units-outdoor.jpg",
    imageAlt:
      "Two outdoor condensing units installed on a concrete plinth during an Inojas air-conditioning project",
    gallery: [
      {
        src: "/images/projects/condensing-unit-installation.jpg",
        alt: "Outdoor condensing unit and control panel installed against a wall",
      },
      {
        src: "/images/projects/split-type-acu-installation.jpg",
        alt: "Two technicians mounting a split-type air-conditioning unit indoors",
      },
      {
        src: "/images/projects/refrigerant-charging.jpg",
        alt: "Technicians charging refrigerant at an outdoor condenser bank",
      },
      {
        src: "/images/projects/refrigeration-pipework.jpg",
        alt: "Technicians brazing refrigeration pipework on site",
      },
    ],
    featured: true,
  },
  {
    id: "hand-pallet-truck",
    name: "Hand Pallet Truck",
    category: "material-handling",
    description:
      "The workhorse of any warehouse. We rebuild the hydraulic unit, replace worn wheels and seals, or supply a brand new or reconditioned truck.",
    detail:
      "Most hand pallet truck faults trace back to the hydraulic unit — seals that no longer hold pressure, a pump that will not reach full lift, or a lowering valve that has stopped metering. We strip the unit, replace what has failed, and put the truck back on the floor rather than writing it off.",
    workScope: [
      "Hydraulic unit strip-down and seal kit replacement",
      "Pump and lowering valve repair",
      "Load and steer wheel replacement",
      "Fork and frame straightening where the geometry allows",
    ],
    offerings: ["Brand new", "Repair services", "Reconditioned unit"],
    relatedServices: ["hydraulic-equipment-repair", "parts-supply"],
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
    detail:
      "Electric forklifts bring together three systems that have to be diagnosed as one: the hydraulics that lift, the traction and control gear that drives, and the battery and charger that feed both. We work across all three rather than handing the electrical side to someone else.",
    workScope: [
      "Lift, tilt and steering hydraulic repair",
      "Mast, chain and carriage inspection and adjustment",
      "Traction and control fault diagnosis",
      "Battery and charging system checks",
    ],
    offerings: ["Repair services", "Parts", "General rehabilitation"],
    relatedServices: ["hydraulic-equipment-repair", "parts-supply", "installation-maintenance"],
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
    detail:
      "Engine-driven units earn their keep outdoors and on rougher ground, and they show it. A general rehabilitation takes the machine back through its hydraulics, mast, transmission and running gear so it holds a load properly again instead of limping between breakdowns.",
    workScope: [
      "Lift and tilt cylinder reseal or replacement",
      "Mast, chain and roller inspection",
      "Transmission and running gear repair",
      "General rehabilitation with parts supplied",
    ],
    offerings: ["Repair services", "Parts", "General rehabilitation"],
    relatedServices: ["hydraulic-equipment-repair", "parts-supply"],
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
    detail:
      "Stackers take a beating around racking and doorways, and corrosion usually arrives before mechanical failure does. Alongside the hydraulic and mast work, we can strip a unit back and re-plate it so the frame is protected rather than painted over.",
    workScope: [
      "Lift cylinder and hydraulic unit repair",
      "Mast and carriage alignment",
      "General re-plating of frame and mast",
      "Wheel and castor replacement",
    ],
    offerings: ["Brand new", "General re-plating"],
    relatedServices: ["hydraulic-equipment-repair", "fabrication-doors"],
    icon: "layers",
    image: "/images/projects/manual-stacker-repair.jpg",
    imageAlt: "Manual stacker with a red mast being repaired inside a client's facility",
    gallery: [
      {
        src: "/images/projects/pallet-stacker-rebuild.jpg",
        alt: "Pallet stacker outside the workshop after rebuilding",
      },
    ],
    featured: true,
  },
  {
    id: "jack-crocodile-jack",
    name: "Jack / Crocodile Jack",
    category: "material-handling",
    description:
      "Bottle jacks, trolley jacks and crocodile jacks resealed and returned to full lifting capacity, or replaced with a new unit.",
    detail:
      "A jack that creeps down under load is a safety problem before it is a productivity one. We strip the ram, replace the seals and check the body for scoring — and if the cylinder is past saving, we say so rather than returning a jack that will fail again.",
    workScope: [
      "Ram strip-down and reseal",
      "Cylinder inspection for scoring and wear",
      "Pump and release valve repair",
      "Load test before release",
    ],
    offerings: ["Repair services", "Brand new"],
    relatedServices: ["hydraulic-equipment-repair"],
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
    detail:
      "Presses tend to outlive their parts supply. When a component is no longer available we fabricate a replacement to match the original rather than condemning the machine, which is usually the difference between a repair and buying new.",
    workScope: [
      "Cylinder reseal and pump repair",
      "Frame and bolster inspection",
      "Fabrication of obsolete components",
      "Hose and fitting replacement",
    ],
    offerings: ["Repair services", "Fabrication"],
    relatedServices: ["hydraulic-equipment-repair", "fabrication-doors"],
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
    detail:
      "A grinder that runs out of true wastes material and puts the operator at risk. We repair the drive and mountings and calibrate the machine so it returns to service running straight and guarded properly.",
    workScope: [
      "Motor and bearing repair",
      "Spindle and mounting inspection",
      "Calibration after repair",
      "Guard and safety fitting checks",
    ],
    offerings: ["Repair services", "Calibration"],
    relatedServices: ["motor-rewinding", "installation-maintenance"],
    icon: "gear",
  },
  {
    id: "industrial-battery",
    name: "Industrial Battery",
    category: "power",
    description:
      "Traction batteries for electric material handling equipment — supplied new or repaired to extend service life.",
    detail:
      "A traction battery is often the single most expensive part of an electric forklift, and it rarely fails all at once. Where cells and connections can be repaired we do that first, and supply new only when the pack genuinely will not hold a shift.",
    workScope: [
      "Capacity and condition assessment",
      "Cell and connector repair",
      "Terminal and cable replacement",
      "Supply of new traction batteries",
    ],
    offerings: ["Brand new", "Repair services"],
    relatedServices: ["parts-supply", "installation-maintenance"],
    icon: "battery",
  },
  {
    id: "battery-charger",
    name: "Battery Charger",
    category: "power",
    description:
      "Charger repairs, with fabrication of enclosures and mounts where the original hardware is beyond saving.",
    detail:
      "Chargers live in the dustiest corner of the warehouse and are usually the last thing anyone inspects. We repair the electronics and, where the enclosure or mounting has corroded away, fabricate a replacement so the unit is safe to leave running overnight.",
    workScope: [
      "Charging fault diagnosis",
      "Component-level electronic repair",
      "Enclosure and mount fabrication",
      "Cable and connector replacement",
    ],
    offerings: ["Repair services", "Fabrication"],
    relatedServices: ["parts-supply", "fabrication-doors"],
    icon: "bolt",
  },
  {
    id: "polyurethane-wheel",
    name: "Polyurethane Wheel",
    category: "material-handling",
    description:
      "Worn load and steer wheels rebounded with fresh polyurethane onto the original hub, or replaced with new wheels.",
    detail:
      "Rebounding re-bonds fresh polyurethane onto the hub you already own. It costs less than a new wheel set, keeps a serviceable hub out of the scrap bin, and is usually the quickest way to stop a pallet truck marking your floor.",
    workScope: [
      "Wheel and hub condition assessment",
      "Rebounding onto the original hub",
      "Bearing replacement",
      "Supply of new wheels where the hub is beyond use",
    ],
    offerings: ["Brand new", "Rebounding"],
    relatedServices: ["parts-supply", "hydraulic-equipment-repair"],
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
