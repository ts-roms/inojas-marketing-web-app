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

| Route        | Contents                                                                |
| ------------ | ----------------------------------------------------------------------- |
| `/`          | Hero, about, services, strengths, equipment, project photos, clients, process, permits, figures, CTA |
| `/about`     | Company profile, philosophy, mission, vision, story, values, permits, figures |
| `/services`  | Seven service lines in detail, with the four-step process               |
| `/equipment` | Eleven equipment lines, filterable by family                            |
| `/projects`  | Photo gallery filterable by discipline, plus the vendor project record  |
| `/contact`   | Shop details, hours, enquiry form, what happens next                    |
| `/privacy`, `/terms` | Placeholder legal pages pending review                          |

---

## Project structure

```text
app/
  layout.tsx            Root layout: fonts, metadata, header/footer, LocalBusiness JSON-LD
  page.tsx              Home
  about/ services/ equipment/ projects/ contact/    Main pages
  privacy/ terms/       Placeholder legal pages (so no footer link is broken)
  api/contact/route.ts  Contact form endpoint — see "Contact form" below
  icon.svg              Favicon
  apple-icon.tsx        iOS home-screen icon (generated)
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
lib/            cn.ts, contact.ts (validation shared by form and API)
public/images/  brand/ (logo), projects/ (20 job photos), clients/ (14 logos)
```

Everything is a Server Component except four client islands: the header (mobile
menu), the equipment filter, the project gallery filter and the contact form.

---

## Editing content

Content is data-driven, so copy changes rarely require touching a layout.

| What                                                       | Where                |
| ---------------------------------------------------------- | -------------------- |
| Company name, address, phone numbers, emails, hours, social | `data/site.ts`       |
| Navigation and footer links                                 | `data/navigation.ts` |
| Services, benefits, four-step process                       | `data/services.ts`   |
| Equipment lines and families                                | `data/products.ts`   |
| Philosophy, mission, vision, values, permits, clients, vendor projects, project photos, figures | `data/company.ts` |
| Legal copy                                                  | `app/privacy/page.tsx`, `app/terms/page.tsx` |
| Brand colours, type scale, shadows, motion                  | `app/globals.css` (`@theme` block) |
| Logo artwork                                                | `public/images/brand/ihrs-logo.png`, `app/icon.svg` |

### Adding an equipment line

```ts
// data/products.ts
{
  id: "new-line",                 // also the deep-link anchor: /equipment#new-line
  name: "Equipment name",
  category: "material-handling",  // must match a productCategories entry
  description: "What we do with it.",
  offerings: ["Repair services", "Brand new"],
  icon: "forklift",
  image: "/images/projects/photo.jpg",  // optional — an icon tile is used if omitted
  imageAlt: "Describe what the photo shows.",
  featured: true,                 // optional: promote to the home page
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

**Brand.** Colours are taken from the logo: the cyan of the gear
(`#00a8f0`, `--color-accent-500`) against the near-black of the wrenches
(`--color-brand-950`). Headings are set in Archivo, which echoes the heavy
squared lettering of the wordmark; body copy is Inter. Everything is defined in
the `@theme` block of `app/globals.css`, so the whole site re-themes from one
place.

**Photography.** All 20 project photographs and the 14 client logos are the
company's own, extracted from the profile PDF and re-encoded for the web
(progressive JPEG, ~1400px longest edge, 25–85 KB each). Equipment lines with no
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
