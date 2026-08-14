import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { mainNav } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-950 text-brand-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_28rem_at_80%_0%,rgba(196,135,63,0.18),transparent_65%)]"
      />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-30" />

      <Container className="py-24 lg:py-32">
        <div className="max-w-2xl">
          <Eyebrow tone="dark">Error 404</Eyebrow>
          <h1 className="mt-6 text-h1 text-white">This page is not in the shop</h1>
          <p className="mt-6 text-lead text-brand-200">
            The address you followed does not match anything on this site. It may have moved, or
            the link may be out of date.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/" variant="accent" size="lg" icon="arrowRight">
              Back to home
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact us
            </Button>
          </div>

          <nav aria-label="Site sections" className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
              Or try one of these
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
