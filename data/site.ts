import { t } from "@/lib/i18n";

/**
 * ---------------------------------------------------------------------------
 * SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * This file holds the values that do NOT change between languages: phone
 * numbers, email addresses, the street address, links and the founding year.
 *
 * All wording — including the tagline, description, opening hours labels and
 * every other sentence on the website — lives in `public/locale/en.json`.
 * Change words there; change numbers and links here.
 *
 * Sourced from the Inojas Hydraulic Repair Shop company profile (Nov 2024).
 * Items still to confirm before launch are marked TO CONFIRM.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Key resolved by <SocialIcon /> in components/ui/icons.tsx */
  icon: "facebook" | "linkedin" | "youtube";
};

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
  /** TO CONFIRM: exact registered entity name. */
  legalName: "Inojas Hydraulic Repair Shop",
  /** Wording lives in the locale file. */
  tagline: t.site.tagline,
  description: t.site.description,
  /**
   * Absolute base URL. Prefers NEXT_PUBLIC_SITE_URL, then Vercel's production
   * domain, then the placeholder below. TO CONFIRM: the production domain.
   */
  url: resolveSiteUrl(),
  /** Year the company was established, per the company profile. */
  foundedYear: 2022,

  contact: {
    email: "inojas.hydraulic.repair@gmail.com",
    managementEmail: "rodelperegrina1@gmail.com",
    /* Number and address below are taken from the company tarpaulin, which is
       more recent and more complete than the 2024 company profile. */
    mobileDisplay: "0946-556-6185",
    mobileHref: "tel:+639465566185",
    landlineDisplay: "(049) 548 3164",
    landlineHref: "tel:+63495483164",
    address: {
      line1: "#217 Purok 2, Barangay Sirang Lupa",
      city: "Calamba City",
      region: "Laguna",
      postalCode: "4027",
      country: "Philippines",
    },
    /** Opening hours text lives in public/locale/en.json. TO CONFIRM. */
    hours: t.contact.hours,
    hoursNote: t.contact.hoursNote,
    emergencyNote: t.contact.emergencyNote,
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
  const { line1, city, region, postalCode, country } = site.contact.address;
  return [line1, `${city}, ${region} ${postalCode}`, country].join(", ");
}

/**
 * Values interpolated into locale strings, e.g. "Est. {year}".
 * Pass this to `fill()` alongside any page-specific values.
 */
export const textVars: Record<string, string | number> = {
  company: site.name,
  shortName: site.shortName,
  legalName: site.legalName,
  year: site.foundedYear,
  city: site.contact.address.city,
  region: site.contact.address.region,
  country: site.contact.address.country,
  email: site.contact.email,
  phone: site.contact.mobileDisplay,
};
