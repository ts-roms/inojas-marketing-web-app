# Inojas Hydraulic Repair Shop — marketing website

A production-ready marketing site for Inojas Hydraulic Repair Shop (Calamba City,
Laguna), built with the Next.js App Router, React, TypeScript and Tailwind CSS v4.

Content, branding and photography are taken from the company profile document
(November 2024): the About, Philosophy, Mission, Vision, Legal Documents, Vendor
Projects, Services Offered, Equipment, Valued Clients and Process pages.

---

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The site runs at <http://localhost:3000>.

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Development server                          |
| `npm run build`     | Production build                            |
| `npm run start`     | Serve the production build                  |
| `npm run lint`      | ESLint (`next/core-web-vitals` + TypeScript) |
| `npm run typecheck` | `tsc --noEmit`                              |

---

## Pages

| Route               | Contents                                                          |
| ------------------- | ----------------------------------------------------------------- |
| `/`                 | Hero, about, services, strengths, equipment, project photos, clients, process, permits, figures, CTA |
| `/about`            | Company profile, philosophy, mission, vision, story, values, permits, figures |
| `/services`         | Seven service lines as cards, how we work, the four-step process  |
| `/services/[slug]`  | Detail page per service — 7 pages, statically generated           |
| `/equipment`        | Eleven equipment lines, filterable by family                      |
| `/equipment/[slug]` | Detail page per equipment line — 11 pages, statically generated   |
| `/projects`         | Photo gallery filterable by discipline, plus the vendor project record |
| `/projects/[slug]`  | Detail page per vendor project — 16 pages, statically generated   |
| `/contact`          | Shop details, hours, enquiry form, what happens next              |
| `/privacy`, `/terms` | Placeholder legal pages pending review                           |
| `/maintenance`      | Maintenance notice — also served site-wide by middleware, below   |

Three status pages share one shell (`components/layout/StatusPage.tsx`), because
each is a dead end for the visitor and all three should end with a phone number:

| File                   | When it shows                                              |
| ---------------------- | ---------------------------------------------------------- |
| `app/not-found.tsx`    | 404 — unknown URL                                          |
| `app/error.tsx`        | 500 — a page failed to render; keeps the header and footer, and offers a retry that re-renders without a reload |
| `app/global-error.tsx` | The root layout itself failed; renders its own `<html>`, so it is deliberately minimal |
| `app/maintenance/page.tsx` | Planned downtime                                       |

Detail pages are generated from `data/services.ts`, `data/products.ts` and
`data/company.ts` via `generateStaticParams`, so adding a record creates its
page, its breadcrumb, its metadata and its sitemap entry with no further work.
Each carries `BreadcrumbList` structured data; service and equipment pages also
carry `Service` schema (repair work on the customer's equipment — not a priced
retail product).

The three detail types cross-link: a service lists the equipment it applies to
and the clients it has been delivered for, equipment lists its related services,
and a project lists both. Those links are data, not hand-maintained markup — see
`relatedEquipment` in `data/services.ts`, `relatedServices` in
`data/products.ts`, and `services` / `equipment` on each vendor project.

**Note on `/services` anchors.** Service detail now lives at `/services/<id>`
rather than `/services#<id>`. Old anchor links still land on the services page,
they simply no longer scroll to a section.

**Honesty note on project pages.** The company profile does not attribute
individual photographs to individual clients, so a project page never claims a
photo is from that job. The photo section is labelled "work of this type" and
says so in the copy.

---

## Project structure

```text
app/
  layout.tsx            Root layout: fonts, metadata, header/footer, LocalBusiness JSON-LD
  page.tsx              Home
  about/ services/ equipment/ projects/ contact/    Main pages
  privacy/ terms/       Placeholder legal pages (so no footer link is broken)
  api/contact/route.ts  Contact form endpoint — see "Contact form" below
  icon.png              Favicon (hexagon mark from the logo badge)
  apple-icon.png        iOS home-screen icon
  opengraph-image.tsx   Social share card (generated)
  robots.ts sitemap.ts  Generated robots.txt and sitemap.xml
  not-found.tsx         404
  globals.css           Design tokens: colour, type scale, shadows, motion

components/
  layout/       Container, Section, PageHero, LegalPage
  navigation/   Header (sticky + mobile dialog), Logo
  footer/       Footer
  ui/           Button, Card, SectionHeading, Eyebrow, Reveal, icons
  sections/     Composed page sections (Hero, ServicesOverview, ClientsStrip, …)
  products/     ProductCard, ProductGrid (equipment catalogue + filter)
  projects/     ProjectGallery (photo gallery + discipline filter)
  services/     ServiceCard
  forms/        ContactForm

data/           site.ts, navigation.ts, services.ts, products.ts, company.ts
lib/            cn.ts, i18n.ts (locale loader), contact.ts (shared validation)
public/locale/  en/*.json — all copy and content, split by page
public/images/  brand/ (logo), projects/ (20 job photos), clients/ (14 logos)
```

Everything is a Server Component except four client islands: the header (mobile
menu), the equipment filter, the project gallery filter and the contact form.

---

## Editing content

Content is data-driven, so copy changes rarely require touching a layout.

**Everything the site says, and every record it is built from, lives in
`public/locale/en/`.** Copy, contact details, opening hours, navigation,
services, equipment, projects, photo captions and client logos are all there.
Edit those files and the site changes — no code edits.

The content is split by page so no single file gets unwieldy:

| File             | Contains                                                          |
| ---------------- | ----------------------------------------------------------------- |
| `common.json`    | Company details and contact info, navigation, buttons, shared labels, footer, default CTA |
| `company.json`   | Philosophy, mission, vision, values, permits, figures, sectors, the four-step process, clients |
| `home.json`      | Home page sections                                                |
| `about.json`     | About page                                                        |
| `services.json`  | Services page + one record per service                            |
| `equipment.json` | Equipment page + families + one record per equipment line         |
| `projects.json`  | Projects page + photographs + one record per vendor project       |
| `contact.json`   | Contact page + the enquiry form and its validation messages       |
| `legal.json`     | Privacy Policy and Terms                                          |
| `status.json`    | 404, 500 and the maintenance notice                               |

`lib/i18n.ts` composes them into one object, so call sites stay
`t.home.hero.title` no matter which file a key lives in — moving a key between
files changes nothing for components.

`data/*.ts` no longer holds content. Each module is now a thin typed reader over
the locale file: it declares the TypeScript types, resolves image paths, and
provides the lookups pages use (`getService`, `relatedEquipment`,
`vendorProjectsForService`, and so on).

Records are keyed by id and render **in the order they appear in the file**, so
moving a block reorders that part of the site.

| What                                                        | Where                              |
| ----------------------------------------------------------- | ---------------------------------- |
| **Everything: copy, contact details, services, equipment, projects, clients** | `public/locale/en/*.json` |
| Brand colours, type scale, shadows, motion                   | `app/globals.css` (`@theme` block) |
| Logo artwork and photography                                 | `public/images/`, `app/icon.png`   |
| Types, lookups and image-path resolution                     | `data/*.ts`                        |

### Adding a language

Copy the `public/locale/en/` folder to e.g. `public/locale/fil/`, translate the
text values (keys stay in English) and register the files in `lib/i18n.ts`.
Structural fields —
`icon`, `photo`, `category`, `href`, `relatedServices` — do not need repeating:
missing keys deep-merge from English, so a translation only carries the words.
TypeScript flags any key you miss. The site currently renders one locale, so
there is no URL prefix and no switcher.

### Adding an equipment line

One step: add a block under `equipment.items` in
`public/locale/en/equipment.json`. The key is the id, and also the detail page
route.

```jsonc
"new-line": {
  "category": "material-handling",   // must match an equipment.categories key
  "icon": "forklift",                // see components/ui/icons.tsx
  "photo": "forklift-service-yard",  // a projects.photos key, or null for an icon tile
  "gallery": [],                     // more projects.photos keys
  "relatedServices": ["hydraulic-equipment-repair"],
  "featured": true,                  // promote to the home page
  "name": "Equipment name",
  "description": "What we do with it.",
  "detail": "Opening paragraph for the detail page.",
  "workScope": ["What the work usually involves"],
  "offerings": ["Repair services", "Brand new"],
  "imageAlt": "Describe what the photo shows."
}
```

The listing, the filter, the detail page at `/equipment/new-line`, the footer
and the sitemap all pick it up. Services and projects work the same way, under
`services.items` and `projects.items`.

### Adding a project photo

Drop a `.webp` in `public/images/projects/` and add an entry under
`projects.photos` in `public/locale/en/projects.json`, keyed by the filename without its
extension, with a `discipline` (`hydraulics`, `cooling`, `motors` or
`fabrication`), an `alt` and a `caption`. The gallery, its filter, the
home-page preview and any equipment referencing that key pick it up.

---

## Before launch — items to confirm

These are the only things on the site not taken directly from the company
profile. They are marked `TO CONFIRM` in the source.

1. **Opening hours** — `data/site.ts`. The profile does not state them; the
   current Mon–Sat schedule is a reasonable guess and is flagged as such on the
   contact page until you replace it.
2. **Domain** — `data/site.ts` and `NEXT_PUBLIC_SITE_URL` currently use
   `inojashydraulic.com`. Point both at the real domain once registered.
3. **Social profiles** — `site.social` is empty, so the footer's social row is
   hidden. Add Facebook or other pages and the row appears automatically.
4. **Legal entity name** — confirm the exact registered name for the footer
   copyright and structured data.
5. **Client logos** — `/projects` and the home page display the 14 client marks
   from your printed profile. These are third-party trade marks; confirm you are
   comfortable publishing them on a public website, and remove any customer who
   objects (`clients` in `data/company.ts`).
6. **Privacy Policy and Terms** — structural placeholders only. They need
   wording reviewed against the Data Privacy Act of 2012 before launch.
7. **Map embed** — the contact page shows a styled placeholder rather than
   loading Google Maps, so no third-party tracking is introduced without your
   decision. Swap in an embed once the exact pin is confirmed.
8. **Permit scans** — the profile's permit images are deliberately *not*
   published (they carry registration numbers and signatures). The site lists
   which registrations are held and offers copies on request.

---

## Contact form

The form is fully implemented on the client (controlled state, blur and submit
validation, loading, success and error states, honeypot spam trap) and validated
again on the server. Validation rules live in one place, `lib/contact.ts`, so the
two can never drift.

**No email provider is configured yet, and the site does not pretend otherwise.**
`app/api/contact/route.ts` behaves as follows:

- `CONTACT_WEBHOOK_URL` **unset** → responds `503 not_configured`, and the form
  tells the visitor their message was *not* sent, offering the phone numbers and
  email addresses instead.
- `CONTACT_WEBHOOK_URL` **set** → the validated submission is `POST`ed there as
  JSON (optionally with a `Bearer` token from `CONTACT_WEBHOOK_TOKEN`), and the
  visitor gets a genuine success state.

The simplest route to a working form is a free Zapier/Make webhook that forwards
to `inojas.hydraulic.repair@gmail.com`. To use a provider SDK instead (Resend,
Postmark, Brevo), replace the body of `deliver()` in that route. Credentials
belong in environment variables — never in the repository.

---

## Maintenance mode

Set `MAINTENANCE_MODE=1` in the Vercel environment variables and every route
serves the maintenance notice instead of the site. Set it back to `0` to
restore. No code change and no branch.

The response is **HTTP 503 with `Retry-After`**, not 200. That distinction
matters: a maintenance page served as 200 tells search engines the page has
*become* that notice, which is how sites lose their rankings during an outage.
A 503 says "temporarily unavailable, come back".

To keep viewing the real site while it is down for everyone else, set
`MAINTENANCE_BYPASS_TOKEN` to a long random string and visit any URL with
`?preview=<token>`. That sets an HTTP-only cookie good for 8 hours.

The logic is in `middleware.ts`; its matcher lets Next's own assets and
`/images`, `/locale` through, so the notice itself still renders styled.

---

## Environment variables

Copy `.env.example` to `.env.local` for local work, and set the same keys in the
Vercel project settings.

| Variable                | Required | Purpose                                              |
| ----------------------- | -------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Yes      | Absolute base URL for canonicals, Open Graph, sitemap |
| `CONTACT_WEBHOOK_URL`   | No       | Where validated contact submissions are forwarded     |
| `CONTACT_WEBHOOK_TOKEN` | No       | Optional bearer token for that webhook                |
| `MAINTENANCE_MODE`       | No       | `1` serves the maintenance notice on every route (503) |
| `MAINTENANCE_BYPASS_TOKEN` | No     | `?preview=<token>` bypasses maintenance mode for you  |

---

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — the framework preset is detected automatically; no
   build configuration is needed.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain (this is what makes
   `sitemap.xml`, `robots.txt` and canonical URLs correct).
4. Deploy.

---

## Design and engineering notes

**Brand.** Colours are sampled from the company logo badge: the deep navy
(`#001840`, `--color-brand-950` family) and the blue of the hexagon mark
(`#0048b0`, `--color-accent-600`). Headings are set in Archivo, which echoes the
heavy squared lettering of the wordmark; body copy is Inter. Everything is
defined in the `@theme` block of `app/globals.css`, so the whole site re-themes
from one place.

The favicon and touch icon are generated from the inner hexagon of the badge —
the full circular logo with its ring of text is unreadable at 16px.

**Photography.** All 20 project photographs and the 14 client logos are the
company's own, extracted from the profile PDF and re-encoded as WebP (~1400px
longest edge) — about 28% smaller than the JPEG/PNG originals, on top of the
per-request optimisation `next/image` already does. Equipment lines with no
matching photograph show an icon tile rather than a stock substitute — nothing on
the site is illustrated with imagery that is not the company's.

**Accessibility.** Semantic landmarks and a skip link; one `h1` per page with no
skipped heading levels; `aria-current` on the active navigation item; a mobile
menu that traps focus, closes on `Escape`, locks background scroll and returns
focus to its toggle; form fields with real labels, `aria-invalid` and linked
error messages; a live region for form-level outcomes. Every text/background pair
was measured against WCAG AA (4.5:1 body, 3:1 large text) and passes.
`prefers-reduced-motion` is honoured globally in CSS and again in the reveal
component.

**Motion.** Fades and short slide-ups only, driven by one small
`IntersectionObserver` per revealed element and disconnected after first use. The
hidden starting state is gated behind an `html.js` class set by an inline script,
so a disabled or failed JavaScript bundle can never leave content invisible.

**Performance.** Fonts are self-hosted at build time by `next/font` with
`display: swap`. Images go through `next/image` with explicit `sizes` and lazy
loading below the fold. There are no runtime dependencies beyond React and
Next.js — no icon library, no animation library, no class-merge utility.
