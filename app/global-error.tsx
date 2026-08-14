"use client";

import { useEffect } from "react";
import { fill, t } from "@/lib/i18n";
import { site } from "@/data/site";
import "./globals.css";

/**
 * Root error boundary.
 *
 * This replaces the root layout entirely, so it must render its own <html> and
 * <body> and cannot rely on the header, footer or fonts. Deliberately minimal:
 * if this is on screen, something fundamental failed, and the only job left is
 * to say so and show a phone number.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-dvh bg-brand-950 antialiased">
        <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
            {t.error.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.globalError.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-200">
            {fill(t.globalError.description, { phone: site.contact.mobileDisplay })}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent-600 px-6 text-base font-medium text-white transition-colors hover:bg-accent-500"
            >
              {t.globalError.retry}
            </button>
            <a
              href={site.contact.mobileHref}
              className="inline-flex h-12 items-center justify-center rounded-md px-6 text-base font-medium text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/10"
            >
              {site.contact.mobileDisplay}
            </a>
          </div>

          {error.digest ? (
            <p className="mt-8 text-sm text-brand-400">
              {t.error.reference} <code className="text-brand-200">{error.digest}</code>
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
