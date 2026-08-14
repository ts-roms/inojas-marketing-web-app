import enCommon from "@/public/locale/en/common.json";
import enCompany from "@/public/locale/en/company.json";
import enHome from "@/public/locale/en/home.json";
import enAbout from "@/public/locale/en/about.json";
import enServices from "@/public/locale/en/services.json";
import enEquipment from "@/public/locale/en/equipment.json";
import enProjects from "@/public/locale/en/projects.json";
import enContact from "@/public/locale/en/contact.json";
import enLegal from "@/public/locale/en/legal.json";
import enStatus from "@/public/locale/en/status.json";

/**
 * ---------------------------------------------------------------------------
 * Content and localisation
 * ---------------------------------------------------------------------------
 * Everything the website says — and every record it is built from — lives in
 * `public/locale/<locale>/*.json`, split by page so no single file gets
 * unwieldy:
 *
 *   common.json     company details, navigation, buttons, labels, footer, CTA
 *   company.json    philosophy, mission, vision, values, permits, figures,
 *                   process, clients — the narrative shared across pages
 *   home.json       home page sections
 *   about.json      about page
 *   services.json   services page + one record per service
 *   equipment.json  equipment page + categories + one record per line
 *   projects.json   projects page + photographs + one record per project
 *   contact.json    contact page + the enquiry form and its validation
 *   legal.json      privacy policy and terms
 *   status.json     404, 500 and the maintenance notice
 *
 * The files are composed back into one object below, so call sites stay
 * `t.home.hero.title` regardless of which file a key lives in. Moving a key
 * between files changes nothing for components.
 *
 * Adding a language:
 *   1. Copy `public/locale/en/` to e.g. `public/locale/fil/` and translate the
 *      text values. Keys stay in English, and structural fields (icon, photo,
 *      category, href) do not need repeating — they fall back.
 *   2. Import the files below and add the locale to `dictionaries`.
 *   3. TypeScript flags any key you miss; at runtime missing keys fall back to
 *      English, so a partial translation is safe to ship.
 *
 * The site currently renders a single locale, so there is no URL prefix and no
 * switcher. Both can be added later without changing this contract.
 */

const en = {
  ...enCommon,
  ...enCompany,
  ...enHome,
  ...enAbout,
  ...enServices,
  ...enEquipment,
  ...enProjects,
  ...enContact,
  ...enLegal,
  ...enStatus,
};

export type Dictionary = typeof en;

/** Every locale with a folder in public/locale. */
export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en };

/**
 * Recursively fills gaps in a partial translation from the English base, so a
 * half-finished locale renders English for the missing keys rather than
 * blank space.
 */
function withFallback<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;

  if (Array.isArray(base)) {
    return (Array.isArray(override) && override.length > 0 ? override : base) as T;
  }

  if (typeof base === "object" && typeof override === "object") {
    const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      merged[key] = withFallback(value, (override as Record<string, unknown>)[key]);
    }
    return merged as T;
  }

  return (typeof override === typeof base && override !== "" ? override : base) as T;
}

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  const dictionary = dictionaries[locale];
  if (!dictionary || locale === defaultLocale) return dictionaries[defaultLocale];
  return withFallback(dictionaries[defaultLocale], dictionary);
}

/**
 * The active dictionary.
 *
 * Server Components import this directly. When a second locale and a switcher
 * are added, swap these call sites for `getDictionary(locale)`.
 */
export const t: Dictionary = getDictionary();

/**
 * Replaces `{placeholders}` in a string from the locale files.
 *
 *   fill("Est. {year}", { year: 2022 })  ->  "Est. 2022"
 *
 * An unknown placeholder is left untouched rather than blanked, so a typo in
 * the locale file is visible instead of silently deleting text.
 */
export function fill(template: string, values: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
