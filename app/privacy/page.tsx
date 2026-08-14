import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";
import { fill, t } from "@/lib/i18n";
import { textVars } from "@/data/site";

const title = t.legal.privacy.title;
const description = fill(t.legal.privacy.metaDescription, textVars);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections: LegalSection[] = t.legal.privacy.sections;

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow={t.legal.privacy.eyebrow}
      title={title}
      description={t.legal.privacy.description}
      sections={sections}
    />
  );
}
