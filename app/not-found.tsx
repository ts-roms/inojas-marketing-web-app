import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { t } from "@/lib/i18n";
import { mainNav } from "@/data/navigation";

export const metadata: Metadata = {
  title: t.notFound.metaTitle,
  description: t.notFound.metaDescription,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-950 text-brand-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_28rem_at_80%_0%,rgba(15,95,209,0.18),transparent_65%)]"
      />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-30" />

      <Container className="py-24 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">{t.notFound.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-h1 text-white">{t.notFound.title}</h1>
          <p className="mt-6 text-lead text-brand-200">
            {t.notFound.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/" variant="accent" size="lg" icon="arrowRight">
              {t.actions.backToHome}
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              {t.actions.contactUs}
            </Button>
          </div>

          <nav aria-label={t.notFound.sectionsLabel} className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
              {t.notFound.tryThese}
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-brand-200 transition-colors hover:text-white"
                  >
                    <Icon
                      name="arrowRight"
                      className="size-4 text-accent-400 transition-transform group-hover:translate-x-0.5"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
