import en from "@/public/locale/en.json";

/**
 * ---------------------------------------------------------------------------
 * Localisation
 * ---------------------------------------------------------------------------
 * All user-facing copy lives in `public/locale/<locale>.json`. Editing that
 * file changes the website — no code edits, no component changes.
 *
 * Adding a language:
 *   1. Copy `public/locale/en.json` to e.g. `public/locale/fil.json` and
 *      translate the values (keys must stay in English).
 *   2. Import it below and add it to `dictionaries`.
 *   3. TypeScript will flag any key you missed, and at runtime any key still
 *      missing falls back to English — a partial translation is safe to ship.
 *
 * The site currently renders a single locale, so there is no URL prefix and no
 * language switcher. Both can be added later without touching this contract.
 */

export type Dictionary = typeof en;

/** Every locale with a file in public/locale. */
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
 * Server Components can import this directly. When a second locale and a
 * switcher are added, swap these call sites for `getDictionary(locale)`.
 */
export const t: Dictionary = getDictionary();

/**
 * Replaces `{placeholders}` in a string from the locale file.
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
