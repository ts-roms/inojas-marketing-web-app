/**
 * ---------------------------------------------------------------------------
 * SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Sourced from the Inojas Hydraulic Repair Shop company profile (Nov 2024).
 * Contact details, address and phone numbers are the company's own published
 * details from that document.
 *
 * Items still to confirm with the client before launch are marked TO CONFIRM.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Key resolved by <SocialIcon /> in components/ui/icons.tsx */
  icon: "facebook" | "linkedin" | "youtube";
};

/**
 * Resolves the absolute base URL used for canonical tags, Open Graph URLs,
 * sitemap.xml and robots.txt.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL — set this once a custom domain is live.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — supplied automatically by Vercel and
 *      set to the project's production domain, so a deployment is never
 *      advertising a domain that does not exist.
 *   3. The placeholder below, used only for local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelDomain) {
    return `https://${vercelDomain.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }

  return "https://www.inojashydraulic.com";
}

export const site = {
  name: "Inojas Hydraulic Repair Shop",
  /** Short form used in the logo lockup and tight layouts. */
  shortName: "Inojas",
  /** Full registered name. TO CONFIRM: exact registered entity name. */
  legalName: "Inojas Hydraulic Repair Shop",
  /** Sits beside the logo in the footer and in Open Graph titles. */
  tagline: "Hydraulic, material handling and refrigeration repair",
  /** Default meta description; ~155 characters. */
  description:
    "Inojas Hydraulic Repair Shop repairs, supplies and installs forklifts, hand pallet trucks, hydraulic equipment, refrigeration and air-conditioning systems across the Philippines.",
  /** Absolute base URL — see resolveSiteUrl() above. */
  url: resolveSiteUrl(),
  /** Year the company was established, per the company profile. */
  foundedYear: 2022,

  contact: {
    /** Primary shop enquiry address. */
    email: "inojas.hydraulic.repair@gmail.com",
    /** Owner / management contact listed on the company profile. */
    managementEmail: "rodelperegrina1@gmail.com",
    /** Mobile number from the company profile. */
    mobileDisplay: "0946 5566 185",
    mobileHref: "tel:+639465566185",
    /** Landline (Laguna area code 049). */
    landlineDisplay: "(049) 548 3164",
    landlineHref: "tel:+63495483164",
    address: {
      line1: "0291 Brgy. Sirang Lupa",
      city: "Calamba City",
      region: "Laguna",
      country: "Philippines",
    },
    /**
     * TO CONFIRM: opening hours are not stated in the company profile.
     * Replace with the shop's actual schedule before launch.
     */
    hours: [
      { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
      { days: "Saturday", time: "8:00 AM – 12:00 NN" },
      { days: "Sunday", time: "Closed" },
    ],
    hoursNote: "Opening hours to be confirmed by the client before launch.",
    /** Emergency/after-hours note. TO CONFIRM with the client. */
    emergencyNote:
      "For urgent breakdowns, call or message the mobile number and our team will advise the soonest available schedule.",
  },

  /**
   * TO CONFIRM: no social profiles were listed in the company profile.
   * Add the company's real pages here and they will appear in the footer;
   * leave the array empty and the social row is hidden automatically.
   */
  social: [] as SocialLink[],
} as const;

/** Formats the company address as a single line. */
export function formattedAddress(): string {
  const { line1, city, region, country } = site.contact.address;
  return [line1, city, region, country].join(", ");
}
