import type { IconName } from "@/components/ui/icons";

/**
 * ---------------------------------------------------------------------------
 * SERVICES
 * ---------------------------------------------------------------------------
 * Taken directly from the "Services Offered" pages of the Inojas Hydraulic
 * Repair Shop company profile. Nothing here is added beyond what the company
 * states it offers.
 *
 * To add a service: append an object below. To reorder: move it. To remove:
 * delete it. `featured: true` promotes a service to the home page overview.
 */

export type Service = {
  /** Stable identifier, also used as the in-page anchor (`/services#id`). */
  id: string;
  title: string;
  /** One line shown under the title in cards. */
  summary: string;
  /** Two to three sentences used on the services page. */
  description: string;
  /** Scannable specifics — kept to what the company profile lists. */
  benefits: string[];
  icon: IconName;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "hydraulic-equipment-repair",
    title: "Hydraulic Equipment Repair",
    summary: "Forklifts, hand pallet trucks, stackers, jacks and presses put back to work.",
    description:
      "The core of the shop. Our technicians repair, supply and install various forklift and hand pallet truck brands — from a leaking cylinder to a full mechanical rehabilitation. Units can be worked on at your site or brought into the shop, whichever keeps your operation moving.",
    benefits: [
      "Electric, diesel and gas forklift repair",
      "Hand pallet truck, stacker and crocodile jack repair",
      "Hydraulic cylinder reseal and rebuild",
      "General rehabilitation and parts supply",
    ],
    icon: "forklift",
    featured: true,
  },
  {
    id: "refrigeration-airconditioning",
    title: "Refrigeration & Air-Conditioning",
    summary: "Low temperature, industrial, domestic, transport and vehicle cooling systems.",
    description:
      "We cover the full range of cooling work, from a walk-in freezer to a package-type air-conditioning unit or a refrigerated van. Repairs, transfers and complete installations are all handled by the same team.",
    benefits: [
      "Low temperature refrigeration",
      "Industrial refrigeration — centralised and package-type ACU",
      "Domestic refrigeration — fridges, freezers and others",
      "Transport refrigeration — refrigerated vans and reefer units",
      "Vehicle air-conditioning units",
    ],
    icon: "snowflake",
    featured: true,
  },
  {
    id: "installation-maintenance",
    title: "Installation & Preventive Maintenance",
    summary: "Scheduled upkeep for cooling systems, motors, pumps and dock equipment.",
    description:
      "Planned maintenance keeps small faults from becoming shutdowns. We install refrigeration and air-conditioning systems, induction and DC motors and submersible pumps, then keep them on a maintenance schedule agreed with your team.",
    benefits: [
      "Refrigeration and air-conditioning system installation",
      "Induction motor, DC motor and submersible pump servicing",
      "Quarterly and scheduled preventive maintenance",
      "Dock leveller and roll-up door maintenance",
    ],
    icon: "clock",
    featured: true,
  },
  {
    id: "motor-rewinding",
    title: "Motor Rewinding & Reconditioning",
    summary: "Rewinding and reconditioning rather than replacing a failed motor.",
    description:
      "A rewound motor is usually back in service for a fraction of the cost of a new unit, which is part of how the shop keeps repairs environmentally friendly. We handle induction motors, DC motors, submersible pump motors and compressor motors.",
    benefits: [
      "Motor rewinding",
      "Motor reconditioning",
      "Induction and DC motors",
      "Submersible pump and compressor motors",
    ],
    icon: "gear",
    featured: true,
  },
  {
    id: "cooling-tower-servicing",
    title: "Cooling Tower Servicing",
    summary: "General servicing through to complete cooling tower rehabilitation.",
    description:
      "Scale, rust and algae quietly cost you cooling capacity. We service cooling tower units end to end, and where a tower is too far gone for cleaning alone we carry out a complete rehabilitation.",
    benefits: [
      "De-scaling",
      "De-rusting",
      "Removal of algae",
      "Complete cooling tower rehabilitation",
    ],
    icon: "fan",
    featured: true,
  },
  {
    id: "fabrication-doors",
    title: "Fabrication & Roll-Up Doors",
    summary: "Aluminium and stainless fabrication, plus motorised and manual roll-up doors.",
    description:
      "In-house fabrication in aluminium, stainless steel and other materials — from replacement parts and company logo signage to minor construction repairs. We also supply and install motorised and manual roll-up doors.",
    benefits: [
      "Aluminium, stainless steel and other fabrication",
      "Supply and installation of motorised roll-up doors",
      "Manual roll-up doors",
      "Minor construction repairs and logo fabrication",
    ],
    icon: "door",
    featured: true,
  },
  {
    id: "parts-supply",
    title: "Spare Parts & Consumables",
    summary: "Refrigerants, wheels, batteries and replacement parts, supplied on request.",
    description:
      "We supply the consumables and spare parts that go with the work — refrigerants, hydraulic components, polyurethane wheels, industrial batteries and chargers — so a repair is not held up waiting on a separate supplier.",
    benefits: [
      "Refrigerants and other consumables",
      "Forklift and hand pallet truck parts",
      "Polyurethane wheel supply and rebounding",
      "Industrial batteries and battery chargers",
    ],
    icon: "layers",
  },
];

/** Services promoted on the home page overview. */
export const featuredServices = services.filter((service) => service.featured);

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

/**
 * The engagement process, as set out on the "Our Process" page of the
 * company profile.
 */
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Contact us / request for quotation",
    description:
      "Call, message or send the enquiry form with the unit or system you need looked at. We come back with a quotation.",
  },
  {
    step: "02",
    title: "Check-up and assessment",
    description:
      "Our technicians inspect the equipment — on your site or at the shop — and confirm the actual scope before any work starts.",
  },
  {
    step: "03",
    title: "Rendering of services",
    description:
      "The repair, installation or maintenance is carried out, with payment based on the terms agreed in the quotation.",
  },
  {
    step: "04",
    title: "Project completion",
    description:
      "The unit is turned over in working condition and the balance is settled based on the agreed terms.",
  },
];
