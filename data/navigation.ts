export type NavItem = {
  label: string;
  href: string;
  /** Short description surfaced in the mobile menu. */
  description?: string;
};

/** Primary navigation — drives the header, the mobile menu and the footer. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/", description: "What we repair and where" },
  { label: "About Us", href: "/about", description: "The shop, our philosophy and permits" },
  { label: "Services", href: "/services", description: "Hydraulics, cooling, motors, fabrication" },
  { label: "Equipment", href: "/equipment", description: "Forklifts, pallet trucks, HVAC and more" },
  { label: "Projects", href: "/projects", description: "Completed work and clients served" },
  { label: "Contact Us", href: "/contact", description: "Request a quotation" },
];

/** Secondary links grouped in the footer. */
export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
