import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { t } from "@/lib/i18n";
import { site } from "@/data/site";
import "./globals.css";

/* Self-hosted at build time by next/font: no render-blocking request to a third
   party, no layout shift, and `swap` keeps text visible while fonts load. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* Archivo echoes the heavy, squared lettering of the Inojas wordmark. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "forklift repair Philippines",
    "hand pallet truck repair",
    "hydraulic repair Calamba",
    "aircon and refrigeration repair Laguna",
    "motor rewinding",
    "dock leveller repair",
    "roll-up door installation",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Industrial engineering",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0d12",
  colorScheme: "light",
};

/**
 * LocalBusiness structured data — the shop has a physical address and serves a
 * defined area, so this is a better fit than a bare Organization. Values come
 * from data/site.ts; update them there and this stays correct.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair"],
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  foundingDate: String(site.foundedYear),
  image: `${site.url}/images/brand/inojas-logo.png`,
  logo: `${site.url}/images/brand/inojas-logo.png`,
  telephone: site.contact.mobileDisplay,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.line1,
    addressLocality: site.contact.address.city,
    addressRegion: site.contact.address.region,
    postalCode: site.contact.address.postalCode,
    addressCountry: "PH",
  },
  areaServed: { "@type": "Country", name: "Philippines" },
  knowsAbout: [
    "Forklift repair",
    "Hand pallet truck repair",
    "Hydraulic cylinder repair",
    "Refrigeration and air-conditioning",
    "Motor rewinding",
    "Fabrication and roll-up doors",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: site.contact.mobileDisplay,
    email: site.contact.email,
    areaServed: "PH",
    availableLanguage: ["English", "Filipino"],
  },
  sameAs: site.social.map((social) => social.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only rounded-md bg-brand-900 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          {t.nav.skipToContent}
        </a>

        <Header />

        <main id="main">{children}</main>

        <Footer />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          // Static, author-controlled JSON — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
