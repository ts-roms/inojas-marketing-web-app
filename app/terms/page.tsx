import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";
import { fill, t } from "@/lib/i18n";
import { textVars } from "@/data/site";

const title = t.legal.terms.title;
const description = fill(t.legal.terms.metaDescription, textVars);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

const sections: LegalSection[] = t.legal.terms.sections;

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow={t.legal.terms.eyebrow}
      title={title}
      description={t.legal.terms.description}
      sections={sections}
    />
  );
}
