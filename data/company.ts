import type { IconName } from "@/components/ui/icons";

/**
 * ---------------------------------------------------------------------------
 * COMPANY NARRATIVE
 * ---------------------------------------------------------------------------
 * Sourced from the Inojas Hydraulic Repair Shop company profile (Nov 2024):
 * the About, Philosophy, Mission, Vision, Legal Documents, Vendor Projects and
 * Valued Clients pages. Wording is the company's own or a close paraphrase —
 * no claims, certifications or figures have been added.
 */

export type ValueProp = {
  title: string;
  description: string;
  icon: IconName;
};

/** "Why choose us" — drawn from the About and Philosophy pages. */
export const valueProps: ValueProp[] = [
  {
    title: "Skilled, trained technicians",
    description:
      "The shop was established in 2022 by technicians and engineers who had already spent years on this equipment. The people who quote your job are the people who work on it.",
    icon: "people",
  },
  {
    title: "Environmentally friendly repairs",
    description:
      "We advocate repair over replacement — rewinding a motor, resealing a cylinder, rebounding a wheel — through the brands we carry and distribute across the Philippines.",
    icon: "spark",
  },
  {
    title: "One shop for the whole plant",
    description:
      "Hydraulics, material handling, refrigeration, motors, fabrication and roll-up doors under one roof, so a mixed job does not need three separate contractors.",
    icon: "layers",
  },
  {
    title: "On site or in the shop",
    description:
      "Work is carried out wherever it costs you least downtime — at your facility, or brought into the Calamba shop and returned when it is running.",
    icon: "compass",
  },
];

/**
 * Registrations held, as listed on the Legal Documents pages of the company
 * profile. The permit scans themselves are deliberately not published here.
 */
export const legalDocuments: { title: string; description: string; icon: IconName }[] = [
  {
    title: "DTI permit",
    description: "Registered with the Department of Trade and Industry.",
    icon: "document",
  },
  {
    title: "Mayor's permit",
    description: "Business permit issued by the local government unit.",
    icon: "shield",
  },
  {
    title: "DOLE permit",
    description: "Registered with the Department of Labor and Employment.",
    icon: "people",
  },
  {
    title: "Certificate of registration",
    description: "Business registration certificate and registration plate on file.",
    icon: "checkCircle",
  },
];

export const philosophy =
  "Inojas Hydraulic Repair Shop strives to attain enduring contentment for both our clients and employees by establishing a resilient organisational framework that fosters significant global competitiveness and embraces new challenges while promoting teamwork to fulfil all expectations.";

export const mission =
  "Our goal is to ensure total customer satisfaction and deliver steady and enduring returns to our investors. To accomplish this mission, we consistently uphold the fundamental values that define our professional philosophy.";

export const vision =
  "To become acknowledged authorities in the industry and surpass the expectations of all our clients and investors.";

export type CoreValue = {
  title: string;
  description: string;
  icon: IconName;
};

/** Values as expressed in the company profile's philosophy and mission. */
export const coreValues: CoreValue[] = [
  {
    title: "Total customer satisfaction",
    description:
      "The measure of a job is a client who is satisfied with the outcome — not simply an invoice that has been issued.",
    icon: "checkCircle",
  },
  {
    title: "Teamwork",
    description:
      "We promote teamwork to fulfil all expectations, between our own technicians and with the client's maintenance staff.",
    icon: "people",
  },
  {
    title: "A resilient organisation",
    description:
      "A stable organisational framework is what lets a small shop take on demanding work and still be here for the next repair.",
    icon: "shield",
  },
  {
    title: "Global competitiveness",
    description:
      "We hold our workmanship to standards that stand comparison beyond our own region, not only within it.",
    icon: "compass",
  },
  {
    title: "Embracing new challenges",
    description:
      "Unfamiliar equipment and awkward site conditions are part of the trade. We take the work on and learn it properly.",
    icon: "spark",
  },
  {
    title: "Care for clients and employees",
    description:
      "Enduring contentment for both our clients and our employees is written into our philosophy, and it shapes how we schedule and staff work.",
    icon: "gauge",
  },
];

/**
 * Company timeline. 2022 is the founding year stated in the profile; the later
 * entries summarise the scope of work the profile documents rather than
 * claiming specific dates.
 */
export const milestones: { year: string; title: string; description: string }[] = [
  {
    year: "2022",
    title: "The shop is established",
    description:
      "Founded in Calamba City, Laguna by skilled and trained technicians and engineers.",
  },
  {
    year: "Hydraulics",
    title: "Forklifts and pallet trucks",
    description:
      "Repair, supply and installation of various forklift and hand pallet truck brands becomes the core of the business.",
  },
  {
    year: "Cooling",
    title: "Refrigeration and air-conditioning",
    description:
      "Walk-in freezers, condensing units, chillers and vehicle air-conditioning are added to the service list.",
  },
  {
    year: "Today",
    title: "A full plant maintenance partner",
    description:
      "Motor rewinding, fabrication, roll-up doors and preventive maintenance contracts for clients across the Philippines.",
  },
];

/**
 * Figures counted directly from the company profile — not estimates.
 * Update these if the underlying data in this folder changes.
 */
export const stats: { value: string; label: string; description: string }[] = [
  { value: "2022", label: "Established", description: "By skilled technicians and engineers" },
  { value: "16", label: "Client companies", description: "Documented in our project record" },
  { value: "11", label: "Equipment lines", description: "Serviced, supplied or rehabilitated" },
  { value: "4", label: "Registrations", description: "DTI, Mayor's, DOLE and business permits" },
];

export const statsSource =
  "Figures counted from the Inojas Hydraulic Repair Shop company profile, November 2024.";

/** Sectors represented among the clients listed in the company profile. */
export const sectors: string[] = [
  "Food & beverage manufacturing",
  "Logistics & warehousing",
  "Pharmaceutical",
  "Electronics",
  "Hospitality & clubs",
  "Education",
];

/**
 * Clients listed on the "Our Valued Clients" page. Logos are the marks used in
 * the company profile.
 *
 * NOTE FOR THE CLIENT: these are third-party trade marks. You already display
 * them in your printed profile; confirm you are comfortable publishing them on
 * a public website before launch, and remove any customer who objects.
 */
export type Client = { name: string; logo?: string };

export const clients: Client[] = [
  { name: "Canlubang Golf and Country Club", logo: "/images/clients/canlubang-golf-and-country-club.png" },
  { name: "ATKINS Import Export", logo: "/images/clients/atkins.png" },
  { name: "VAREX Imaging", logo: "/images/clients/varex-imaging.png" },
  { name: "AcBel Philippines", logo: "/images/clients/acbel.png" },
  { name: "Universal Robina Corporation", logo: "/images/clients/universal-robina.png" },
  { name: "Ninja Van Philippines", logo: "/images/clients/ninjavan.png" },
  { name: "San Miguel Corporation", logo: "/images/clients/san-miguel-corporation.png" },
  { name: "Interphil Laboratories Inc.", logo: "/images/clients/interphil-laboratories.png" },
  { name: "Blue Macay Food Corporation", logo: "/images/clients/blue-macay.png" },
  { name: "Crestec Philippines Inc.", logo: "/images/clients/crestec.png" },
  { name: "Samsof Technologies Inc.", logo: "/images/clients/samsof-technologies.png" },
  { name: "Kerry Logistikus Philippines", logo: "/images/clients/kerry-logistics.png" },
  { name: "Pioneer Adhesive Incorporated", logo: "/images/clients/pioneer-adhesive.png" },
  {
    name: "San Sebastian College – Recoletos, Canlubang",
    logo: "/images/clients/san-sebastian-college-recoletos.png",
  },
  { name: "The Country Club" },
  { name: "VL&DJ Metal Fabrication and Construction Corporation" },
];

/**
 * Vendor projects completed to date, as listed in the company profile.
 *
 * `client` and `scope` follow the profile's own descriptions verbatim in
 * substance. `services` and `equipment` are cross-references into
 * data/services.ts and data/products.ts, derived from the scope wording — they
 * add navigation, not new claims. `id` is the detail page route.
 *
 * Note: the profile does not attribute individual photographs to individual
 * clients, so detail pages never claim a photo is from that job.
 */
export type VendorProject = {
  /** Stable slug — also the detail page route: /projects/<id>. */
  id: string;
  client: string;
  scope: string;
  /** Disciplines involved, used for related-work links. */
  disciplines: ProjectPhoto["discipline"][];
  /** Service ids from data/services.ts. */
  services: string[];
  /** Equipment ids from data/products.ts. */
  equipment: string[];
};

export const vendorProjects: VendorProject[] = [
  {
    id: "canlubang-golf-and-country-club",
    client: "Canlubang Golf and Country Club",
    scope: "Walk-in freezer repair and installation.",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "atkins-import-export",
    client: "ATKINS Import Export",
    scope:
      "Various hydraulic repairs for forklift, hand pallet truck and dock leveller, plus storage facility fan repair.",
    disciplines: ["hydraulics", "cooling"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["electric-forklift", "hand-pallet-truck", "diesel-gas-forklift"],
  },
  {
    id: "varex-imaging",
    client: "VAREX Imaging",
    scope: "Transfer of cooling system — condenser and compressor — as subcontractor.",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "acbel-philippines",
    client: "AcBel Philippines",
    scope: "Forklift and hand pallet truck repairs as subcontractor; company logo fabrication.",
    disciplines: ["hydraulics", "fabrication"],
    services: ["hydraulic-equipment-repair", "fabrication-doors"],
    equipment: ["electric-forklift", "hand-pallet-truck"],
  },
  {
    id: "universal-robina",
    client: "Universal Robina Corporation",
    scope: "Compressor conversion and technical support as subcontractor.",
    disciplines: ["cooling", "motors"],
    services: ["refrigeration-airconditioning", "motor-rewinding"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "ninja-van-philippines",
    client: "Ninja Van Philippines",
    scope: "Quarterly preventive maintenance for dock leveller and mechanical roll-up doors.",
    disciplines: ["hydraulics", "fabrication"],
    services: ["installation-maintenance", "fabrication-doors"],
    equipment: [],
  },
  {
    id: "san-miguel-corporation",
    client: "San Miguel Corporation",
    scope: "Various repairs and maintenance for forklifts and hand pallet trucks.",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["diesel-gas-forklift", "electric-forklift", "hand-pallet-truck"],
  },
  {
    id: "interphil-laboratories",
    client: "Interphil Laboratories Inc.",
    scope: "ACU installations and preventive maintenance.",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "blue-macay-food-corporation",
    client: "Blue Macay Food Corporation",
    scope: "Hand pallet truck repairs.",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair"],
    equipment: ["hand-pallet-truck"],
  },
  {
    id: "the-country-club",
    client: "The Country Club",
    scope: "ACU maintenance and installations.",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "crestec-philippines",
    client: "Crestec Philippines Inc.",
    scope:
      "Various fabrication and minor construction repairs, including hand pallet truck and forklift repair and maintenance.",
    disciplines: ["fabrication", "hydraulics"],
    services: ["fabrication-doors", "hydraulic-equipment-repair"],
    equipment: ["hand-pallet-truck", "electric-forklift"],
  },
  {
    id: "samsof-technologies",
    client: "Samsof Technologies Inc.",
    scope: "Overall fix and rehabilitation of mechanical parts of hand pallet trucks.",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "parts-supply"],
    equipment: ["hand-pallet-truck", "polyurethane-wheel"],
  },
  {
    id: "kerry-logistikus-philippines",
    client: "Kerry Logistikus Philippines",
    scope: "Repair of ACU and freezers.",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "pioneer-adhesive",
    client: "Pioneer Adhesive Incorporated",
    scope: "Hand pallet truck repair and maintenance.",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["hand-pallet-truck"],
  },
  {
    id: "san-sebastian-college-recoletos",
    client: "San Sebastian College – Recoletos, Canlubang",
    scope: "ACU supply and installation.",
    disciplines: ["cooling"],
    services: ["refrigeration-airconditioning", "installation-maintenance"],
    equipment: ["hvac-refrigeration-chiller"],
  },
  {
    id: "vl-dj-metal-fabrication",
    client: "VL&DJ Metal Fabrication and Construction Corporation",
    scope: "Forklift repair including maintenance.",
    disciplines: ["hydraulics"],
    services: ["hydraulic-equipment-repair", "installation-maintenance"],
    equipment: ["diesel-gas-forklift", "electric-forklift"],
  },
];

export function getVendorProject(id: string): VendorProject | undefined {
  return vendorProjects.find((project) => project.id === id);
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

/** Photographs of the same kind of work — never presented as this client's job. */
export function photosForDisciplines(
  disciplines: ProjectPhoto["discipline"][],
  limit = 3,
): ProjectPhoto[] {
  return projectPhotos
    .filter((photo) => disciplines.includes(photo.discipline))
    .slice(0, limit);
}

/**
 * Completed work photographed in the company profile. Captions describe what
 * the photograph actually shows.
 */
export type ProjectPhoto = {
  src: string;
  alt: string;
  caption: string;
  /** Loose grouping used by the gallery filter. */
  discipline: "hydraulics" | "cooling" | "motors" | "fabrication";
};

export const projectPhotos: ProjectPhoto[] = [
  {
    src: "/images/projects/vehicle-lift-installation.jpg",
    alt: "Two-post vehicle lift installed in a car service bay",
    caption: "Two-post vehicle lift installation",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/vehicle-lift-service.jpg",
    alt: "Technician's view of a two-post vehicle lift column during servicing",
    caption: "Vehicle lift servicing",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/dock-leveler-platform.jpg",
    alt: "Dock leveller platform raised in a loading bay",
    caption: "Dock leveller platform repair",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/dock-leveler-cylinder.jpg",
    alt: "Hydraulic cylinder mounted beneath a dock leveller platform",
    caption: "Dock leveller cylinder replacement",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/dock-leveler-welding.jpg",
    alt: "Technician in protective gear welding underneath a dock leveller",
    caption: "Dock leveller structural repair",
    discipline: "fabrication",
  },
  {
    src: "/images/projects/hydraulic-cylinder-workshop.jpg",
    alt: "Large hydraulic cylinder standing on the workshop floor",
    caption: "Hydraulic cylinder overhaul",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/hydraulic-cylinder-assembly.jpg",
    alt: "Hydraulic cylinder assembly removed from a machine for inspection",
    caption: "Cylinder strip-down and reseal",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/hydraulic-seal-kit.jpg",
    alt: "Hydraulic seal kit and components laid out on a workbench",
    caption: "Seal kit replacement",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/forklift-service-yard.jpg",
    alt: "Forklift with its mast raised parked in a service yard",
    caption: "Forklift repair and maintenance",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/diesel-forklift-overhaul.jpg",
    alt: "Yellow diesel forklift undergoing general rehabilitation outdoors",
    caption: "Diesel forklift rehabilitation",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/manual-stacker-repair.jpg",
    alt: "Manual stacker with a red mast being repaired inside a facility",
    caption: "Manual stacker repair",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/pallet-stacker-rebuild.jpg",
    alt: "Pallet stacker outside the workshop after rebuilding",
    caption: "Pallet stacker rebuild",
    discipline: "hydraulics",
  },
  {
    src: "/images/projects/condensing-unit-installation.jpg",
    alt: "Outdoor condensing unit and control panel installed against a wall",
    caption: "Condensing unit installation",
    discipline: "cooling",
  },
  {
    src: "/images/projects/condenser-units-outdoor.jpg",
    alt: "Two outdoor condenser units installed on a concrete plinth",
    caption: "Condenser installation",
    discipline: "cooling",
  },
  {
    src: "/images/projects/split-type-acu-installation.jpg",
    alt: "Two technicians mounting a split-type air-conditioning unit indoors",
    caption: "Split-type ACU installation",
    discipline: "cooling",
  },
  {
    src: "/images/projects/refrigerant-charging.jpg",
    alt: "Technicians charging refrigerant at an outdoor condenser bank",
    caption: "Refrigerant charging and commissioning",
    discipline: "cooling",
  },
  {
    src: "/images/projects/refrigeration-pipework.jpg",
    alt: "Technicians brazing refrigeration pipework on site",
    caption: "Refrigeration pipework",
    discipline: "cooling",
  },
  {
    src: "/images/projects/motor-rewinding-bench.jpg",
    alt: "Motor stator and compressor components laid out for rewinding",
    caption: "Motor rewinding",
    discipline: "motors",
  },
  {
    src: "/images/projects/compressor-motor-repair.jpg",
    alt: "Technician working on a compressor motor stator",
    caption: "Compressor motor repair",
    discipline: "motors",
  },
  {
    src: "/images/projects/roll-up-door-installation.jpg",
    alt: "Metal roll-up door installed at a warehouse entrance",
    caption: "Roll-up door installation",
    discipline: "fabrication",
  },
];
