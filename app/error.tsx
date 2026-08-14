"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { StatusContact, StatusPage } from "@/components/layout/StatusPage";
import { fill, t } from "@/lib/i18n";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * Segment error boundary — the "500" page.
 *
 * Renders inside the root layout, so the visitor keeps the header, the footer
 * and a way out. `reset()` retries the failed render without a full reload.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the Vercel function logs; wire up an error reporter here if
    // one is ever added.
    console.error("[page error]", error);
  }, [error]);

  return (
    <StatusPage
      eyebrow={t.error.eyebrow}
      title={t.error.title}
      description={t.error.description}
      actions={
        <>
          <Button variant="accent" size="lg" onClick={reset}>
            {t.error.retry}
          </Button>
          <Button href="/" variant="outline" size="lg">
            {t.actions.backToHome}
          </Button>
        </>
      }
    >
      {error.digest ? (
        <p className="mt-6 text-sm text-brand-400">
          {t.error.reference}{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-brand-200">{error.digest}</code>
        </p>
      ) : null}

      <p className="mt-6 text-sm text-brand-300">
        {fill(t.error.contactNote, {
          phone: site.contact.mobileDisplay,
          email: site.contact.email,
        })}
      </p>

      <nav aria-label={t.notFound.sectionsLabel} className="mt-10">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group inline-flex items-center gap-2 py-1 text-sm text-brand-200 transition-colors hover:text-white"
              >
                <Icon
                  name="arrowRight"
                  className="size-3.5 text-accent-300 transition-transform group-hover:translate-x-0.5"
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <StatusContact />
    </StatusPage>
  );
}
