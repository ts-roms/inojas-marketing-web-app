import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { LogoWatermark } from "@/components/visuals/LogoWatermark";
import { t } from "@/lib/i18n";
import { site } from "@/data/site";

type StatusPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Buttons or links. */
  actions?: ReactNode;
  /** Extra content under the actions, e.g. a link list or contact block. */
  children?: ReactNode;
};

/**
 * Shared shell for the 404, 500 and maintenance pages.
 *
 * Each of those is a dead end for the visitor, so all three lead with the same
 * thing: what happened, and how to reach a human anyway.
 */
export function StatusPage({ eyebrow, title, description, actions, children }: StatusPageProps) {
  return (
    <section className="on-dark relative isolate flex min-h-[70vh] items-center overflow-hidden bg-brand-950 text-brand-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_28rem_at_80%_0%,rgba(15,95,209,0.18),transparent_65%)]"
      />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-30" />
      <LogoWatermark className="-z-10 size-[26rem] lg:size-[34rem]" />

      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-h1 text-white">{title}</h1>
          <p className="mt-6 text-lead text-brand-200">{description}</p>

          {actions ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>
          ) : null}

          {children}
        </div>
      </Container>
    </section>
  );
}

/** Phone and email, shown on every status page so nobody hits a dead end. */
export function StatusContact({ heading }: { heading?: string }) {
  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      {heading ? (
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
          {heading}
        </h2>
      ) : null}

      <ul className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8">
        <li>
          <a
            href={site.contact.mobileHref}
            className="inline-flex items-center gap-2 py-1 text-brand-100 transition-colors hover:text-white"
          >
            <Icon name="phone" className="size-4 text-accent-300" />
            {site.contact.mobileDisplay}
          </a>
        </li>
        <li>
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex items-center gap-2 break-all py-1 text-brand-100 transition-colors hover:text-white"
          >
            <Icon name="mail" className="size-4 text-accent-300" />
            {site.contact.email}
          </a>
        </li>
        <li className="flex items-start gap-2 text-brand-300">
          <Icon name="mapPin" className="mt-1 size-4 shrink-0 text-accent-300" />
          <span>
            {site.contact.address.city}, {site.contact.address.region}
          </span>
        </li>
      </ul>

      <p className="mt-5 text-sm text-brand-400">
        {site.contact.hours.map((entry) => `${entry.days}: ${entry.time}`).join(" · ")}
      </p>
      <span className="sr-only">{t.labels.businessHours}</span>
    </div>
  );
}
