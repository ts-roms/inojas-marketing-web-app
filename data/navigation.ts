import { t } from "@/lib/i18n";

/**
 * Navigation. Labels, descriptions and routes all live in
 * `public/locale/en.json` under `nav.items`; this module only types them and
 * splits the primary menu from the footer's legal links.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Short description surfaced in the mobile menu. */
  description?: string;
};

type NavKey = keyof typeof t.nav.items;

function navItem(key: NavKey): NavItem {
  const item = t.nav.items[key];
  return {
    href: item.href,
    label: item.label,
    description: item.description || undefined,
  };
}

const legalKeys: NavKey[] = ["privacy", "terms"];

/** Primary navigation — drives the header, the mobile menu and the footer. */
export const mainNav: NavItem[] = (Object.keys(t.nav.items) as NavKey[])
  .filter((key) => !legalKeys.includes(key))
  .map(navItem);

/** Secondary links grouped in the footer. */
export const legalNav: NavItem[] = legalKeys.map(navItem);
