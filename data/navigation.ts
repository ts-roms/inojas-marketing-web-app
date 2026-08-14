import { t } from "@/lib/i18n";

/**
 * Navigation structure. Routes live here; labels and descriptions live in
 * `public/locale/en.json` under `nav.items`.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Short description surfaced in the mobile menu. */
  description?: string;
};

type NavKey = keyof typeof t.nav.items;

function navItem(key: NavKey, href: string): NavItem {
  const copy = t.nav.items[key];
  return {
    href,
    label: copy.label,
    description: copy.description || undefined,
  };
}

/** Primary navigation — drives the header, the mobile menu and the footer. */
export const mainNav: NavItem[] = [
  navItem("home", "/"),
  navItem("about", "/about"),
  navItem("services", "/services"),
  navItem("equipment", "/equipment"),
  navItem("projects", "/projects"),
  navItem("contact", "/contact"),
];

/** Secondary links grouped in the footer. */
export const legalNav: NavItem[] = [navItem("privacy", "/privacy"), navItem("terms", "/terms")];
