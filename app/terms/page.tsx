import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";
import { site } from "@/data/site";

const title = "Terms of Service";
const description = `The terms on which ${site.name} makes this website available. Placeholder document pending legal review.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: "Use of this website",
    paragraphs: [
      "Set out the basis on which visitors may use the site, and any restrictions on automated access, scraping or republication of its content.",
    ],
  },
  {
    heading: "Information accuracy",
    paragraphs: [
      "Equipment listings, service descriptions and figures shown on this website are indicative. They do not form part of any contract unless repeated in a signed quotation or agreement.",
      "Availability of brand new, reconditioned and repaired units varies. Scope, price and lead time are confirmed in the quotation issued after assessment.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "State who owns the site content, trade marks and imagery, and what limited use visitors may make of them.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "This section must be drafted by the company's legal advisers so that it is enforceable in the relevant jurisdiction.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "State that these terms are governed by the laws of the Republic of the Philippines, and name the courts that have jurisdiction over disputes arising from use of this website.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={title}
      description="A structural placeholder for the terms governing use of this website."
      sections={sections}
    />
  );
}
