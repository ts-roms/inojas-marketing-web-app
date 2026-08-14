import { t } from "@/lib/i18n";

/**
 * ---------------------------------------------------------------------------
 * SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * The values themselves live in `public/locale/en.json` under `site` — company
 * name, contact details, address, opening hours and social links. This module
 * only types them and derives a few conveniences.
 *
 * To change a phone number, an email or the address: edit the locale file.
 *
 * TO CONFIRM before launch: the production domain, the exact registered entity
 * name, and the opening hours (the profile does not state them).
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Key resolved by <SocialIcon /> in components/ui/icons.tsx */
  icon: "facebook" | "linkedin" | "youtube";
};

/**
 * Absolute base URL for canonicals, Open Graph, sitemap and robots.
 * Prefers NEXT_PUBLIC_SITE_URL, then Vercel's production domain, then a
 * placeholder for local development.
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

const config = t.site;

export const site = {
  name: config.name,
  shortName: config.shortName,
  legalName: config.legalName,
  tagline: config.tagline,
  description: config.description,
  foundedYear: config.foundedYear,
  url: resolveSiteUrl(),
  contact: config.contact,
  social: config.social as SocialLink[],
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
