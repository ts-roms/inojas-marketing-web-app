import type { SVGProps } from "react";

/**
 * A small hand-authored icon set.
 *
 * Inline SVG keeps the bundle free of an icon dependency, renders on the
 * server, inherits `currentColor`, and scales with font size. Icons are
 * decorative by default (`aria-hidden`); pass a `title` only when an icon
 * carries meaning that the surrounding text does not.
 */

export type IconName =
  | "circuit"
  | "gear"
  | "bolt"
  | "wrench"
  | "layers"
  | "academy"
  | "shield"
  | "gauge"
  | "flow"
  | "compass"
  | "document"
  | "clock"
  | "check"
  | "checkCircle"
  | "spark"
  | "people"
  | "forklift"
  | "snowflake"
  | "fan"
  | "door"
  | "cylinder"
  | "battery"
  | "arrowRight"
  | "arrowUpRight"
  | "phone"
  | "mail"
  | "mapPin"
  | "menu"
  | "close"
  | "chevronDown"
  | "alert"
  | "spinner";

const paths: Record<IconName, React.ReactNode> = {
  circuit: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" />
    </>
  ),
  bolt: <path d="M13.5 2.5 5 13.5h5.5L10 21.5 19 10.5h-5.5l0-8Z" />,
  wrench: (
    <path d="M20.6 4.4 17.4 7.6l-3.4-.6-.6-3.4 3.2-3.2a5.6 5.6 0 0 0-6.9 7.2l-7.1 7.1a2.5 2.5 0 0 0 3.5 3.5l7.1-7.1a5.6 5.6 0 0 0 7.4-6.7Z" />
  ),
  layers: (
    <>
      <path d="m12 3 9 4.5-9 4.5L3 7.5 12 3Z" />
      <path d="m3 12 9 4.5L21 12" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  academy: (
    <>
      <path d="m12 4 9.5 4.5L12 13 2.5 8.5 12 4Z" />
      <path d="M6.5 10.8v4.4c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.4" />
      <path d="M21.5 8.5v5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.8 5.9v5.4c0 4.3 2.9 8 7.2 9.9 4.3-1.9 7.2-5.6 7.2-9.9V5.9L12 2.8Z" />
      <path d="m9 11.8 2.2 2.2L15.4 9.8" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.2 17.5a9 9 0 1 1 17.6 0" />
      <path d="M12 15.5 16.5 9" />
      <circle cx="12" cy="17" r="1.3" />
    </>
  ),
  flow: (
    <>
      <path d="M2.5 12h5M16.5 12h5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 7.5V3M9.5 3h5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" />
    </>
  ),
  document: (
    <>
      <path d="M14 2.8H7.5a2 2 0 0 0-2 2v14.4a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7.8l-5-5Z" />
      <path d="M14 2.8v5h5" />
      <path d="M9 13h6M9 16.5h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.3 2.6 2.6L16.2 9.3" />
    </>
  ),
  spark: (
    <path d="M12 2.8c.95 4.6 3 6.65 7.6 7.6-4.6.95-6.65 3-7.6 7.6-.95-4.6-3-6.65-7.6-7.6 4.6-.95 6.65-3 7.6-7.6Z" />
  ),
  people: (
    <>
      <circle cx="9" cy="7.8" r="3.3" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.2 5.2a3.3 3.3 0 0 1 0 5.2" />
      <path d="M17.8 14.6a6.2 6.2 0 0 1 3.4 5.4" />
    </>
  ),
  forklift: (
    <>
      <path d="M2.8 5.5v9.7h9.4" />
      <path d="M15.4 15.2V4.4h3.1l2.7 6.4v4.4" />
      <circle cx="6.3" cy="18" r="2.4" />
      <circle cx="16.6" cy="18" r="2.4" />
      <path d="M12.2 15.2V8.4M12.2 15.2h2.6" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 2.6v18.8M4 7.3l16 9.4M20 7.3 4 16.7" />
      <path d="M12 6.2 9.4 4M12 6.2 14.6 4M12 17.8l-2.6 2.2M12 17.8l2.6 2.2" />
      <path d="m7.1 9.5-3-.6M7.1 14.5l-3 .6M16.9 9.5l3-.6M16.9 14.5l3 .6" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="1.8" />
      <path d="M12 10.2c0-3 1.2-5.4 3.6-5.4 1.6 0 2.6 1.4 1.9 3-.7 1.6-3 2.4-5.5 2.4Z" />
      <path d="M13.6 13c2.6 1.5 4 3.7 2.8 5.8-.8 1.4-2.5 1.5-3.5.1-1-1.4-.5-3.8.7-5.9Z" />
      <path d="M10.4 13c-2.6 1.5-5 1.7-6.2-.4-.8-1.4 0-2.9 1.7-3 1.7-.1 3.5 1.5 4.5 3.4Z" />
    </>
  ),
  door: (
    <>
      <rect x="3.4" y="3.2" width="17.2" height="17.6" rx="2" />
      <path d="M3.4 7.2h17.2M3.4 10.4h17.2M3.4 13.6h17.2M3.4 16.8h17.2" />
    </>
  ),
  cylinder: (
    <>
      <rect x="2.8" y="8.4" width="12" height="7.2" rx="2" />
      <path d="M14.8 12h3.4" />
      <rect x="18.2" y="9.6" width="3" height="4.8" rx="1" />
      <path d="M6 8.4v7.2" />
    </>
  ),
  battery: (
    <>
      <rect x="2.6" y="7" width="17" height="10" rx="2.4" />
      <path d="M21.6 10.4v3.2" />
      <path d="M7 12h3.4M8.7 10.3v3.4M13.6 12H17" />
    </>
  ),
  arrowRight: <path d="M4 12h15m-5.5-5.5L19.5 12l-6 5.5" />,
  arrowUpRight: <path d="M7 17 17 7m-8.5 0H17v8.5" />,
  phone: (
    <path d="M6.4 3.5h3l1.5 3.8-2 1.3a11 11 0 0 0 5.5 5.5l1.3-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.4 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  mail: (
    <>
      <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.4" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M19 10.3c0 5.2-7 11-7 11s-7-5.8-7-11a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </>
  ),
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="m5.5 5.5 13 13m0-13-13 13" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.2" />
      <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  spinner: (
    <>
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  /** Supply only when the icon conveys information not present in nearby text. */
  title?: string;
};

export function Icon({ name, title, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Social marks — filled glyphs, kept separate from the line-icon set.         */
/* -------------------------------------------------------------------------- */

const socialPaths = {
  facebook:
    "M13.5 21v-8.2h2.8l.42-3.25H13.5V7.47c0-.94.26-1.58 1.61-1.58h1.72V2.98A23 23 0 0 0 14.32 2.8c-2.48 0-4.18 1.51-4.18 4.29v2.46H7.3v3.25h2.84V21h3.36Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3.1 9h3.8v12H3.1V9Zm6.2 0h3.6v1.7h.05c.5-.95 1.75-1.95 3.6-1.95 3.85 0 4.55 2.4 4.55 5.5V21h-3.8v-5.05c0-1.2 0-2.75-1.75-2.75s-2 1.3-2 2.65V21H9.3V9Z",
  x: "M17.4 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.4L4.3 21H1l7.7-8.8L1.5 3h6.8l4.7 5.9L17.4 3Zm-1.2 16h1.8L7.9 4.9H6L16.2 19Z",
  youtube:
    "M21.6 7.2a2.6 2.6 0 0 0-1.8-1.85C18.2 5 12 5 12 5s-6.2 0-7.8.35A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.85C5.8 19 12 19 12 19s6.2 0 7.8-.35a2.6 2.6 0 0 0 1.8-1.85A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15.1V8.9l5.2 3.1-5.2 3.1Z",
} as const;

export type SocialIconName = keyof typeof socialPaths;

export function SocialIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: SocialIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={socialPaths[name]} />
    </svg>
  );
}
