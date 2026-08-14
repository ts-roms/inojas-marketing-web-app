import type { Metadata } from "next";
import { StatusContact, StatusPage } from "@/components/layout/StatusPage";
import { t } from "@/lib/i18n";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: t.maintenance.metaTitle,
  description: t.maintenance.description,
  // Never index a maintenance notice as if it were the site's content.
  robots: { index: false, follow: false },
};

/**
 * Maintenance notice.
 *
 * Reached in two ways: directly at /maintenance, or via middleware.ts when
 * MAINTENANCE_MODE is switched on, which serves this page for every route.
 * The shop stays contactable either way — the phone number is the point of the
 * page, not the apology.
 */
export default function MaintenancePage() {
  return (
    <StatusPage
      eyebrow={t.maintenance.eyebrow}
      title={t.maintenance.title}
      description={t.maintenance.description}
    >
      <p className="mt-6 text-brand-300">{t.maintenance.backSoon}</p>
      <StatusContact heading={t.maintenance.contactHeading} />
      <p className="mt-8 text-sm text-brand-400">{site.name}</p>
    </StatusPage>
  );
}
