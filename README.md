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
public/locale/  en.json — every word on the website
public/images/  brand/ (logo), projects/ (20 job photos), clients/ (14 logos)
```

Everything is a Server Component except four client islands: the header (mobile
menu), the equipment filter, the project gallery filter and the contact form.

---

## Editing content

Content is data-driven, so copy changes rarely require touching a layout.

**All website copy lives in `public/locale/en.json`.** Edit that file and the
site changes — no code edits. `data/*.ts` holds only structure (ids, icons,
image paths, links, phone numbers): things that would not change if the site
were translated.

To add a language: copy `public/locale/en.json` to e.g. `fil.json`, translate
the values (keys stay in English), and register it in `lib/i18n.ts`. TypeScript
flags any key you miss, and at runtime missing keys fall back to English, so a
partial translation is safe to ship. The site currently renders one locale, so
there is no URL prefix and no switcher.

| What                                                       | Where                |
| ---------------------------------------------------------- | -------------------- |
| **Every sentence, label, button and error message**         | `public/locale/en.json` |
| Phone numbers, emails, address, links, founding year        | `data/site.ts`       |
| Navigation and footer links                                 | `data/navigation.ts` |
| Service ids, icons, relationships                           | `data/services.ts`   |
| Equipment ids, categories, photo paths, relationships       | `data/products.ts`   |
| Value/value-prop ids, client logos, project relationships    | `data/company.ts`    |
| Brand colours, type scale, shadows, motion                  | `app/globals.css` (`@theme` block) |
| Logo artwork                                                | `public/images/brand/`, `app/icon.png` |

### Adding an equipment line

Two steps: structure in `data/products.ts`, words in `public/locale/en.json`.

```ts
// data/products.ts — structure only
{
  id: "new-line",                 // also the detail page route: /equipment/new-line
  category: "material-handling",  // must match a productCategories entry
  relatedServices: ["hydraulic-equipment-repair"],  // ids from data/services.ts
  icon: "forklift",
  image: "/images/projects/photo.webp",  // optional — an icon tile is used if omitted
  galleryKeys: ["another-photo"],        // optional, keys from projects.photos
  featured: true,                 // optional: promote to the home page
}
```

```jsonc
// public/locale/en.json — equipment.items."new-line"
{
  "name": "Equipment name",
  "description": "What we do with it.",
  "detail": "Opening paragraph for the detail page.",
  "workScope": ["What the work usually involves"],
  "offerings": ["Repair services", "Brand new"],
  "imageAlt": "Describe what the photo shows."
}
```

### Adding a project photo

Drop the file in `public/images/projects/` and append an entry to
`projectPhotos` in `data/company.ts` with an `alt`, a `caption` and a
`discipline` (`hydraulics`, `cooling`, `motors` or `fabrication`). The gallery,
its filter and the home-page preview pick it up automatically.

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

## Environment variables

Copy `.env.example` to `.env.local` for local work, and set the same keys in the
Vercel project settings.

| Variable                | Required | Purpose                                              |
| ----------------------- | -------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Yes      | Absolute base URL for canonicals, Open Graph, sitemap |
| `CONTACT_WEBHOOK_URL`   | No       | Where validated contact submissions are forwarded     |
| `CONTACT_WEBHOOK_TOKEN` | No       | Optional bearer token for that webhook                |

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
