import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional CTA row rendered under the description. */
  actions?: ReactNode;
  /** Optional supporting content aligned to the right on large screens. */
  aside?: ReactNode;
};

/** Shared masthead for every inner page — one h1, consistent rhythm. */
export function PageHero({ eyebrow, title, description, actions, aside }: PageHeroProps) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-900 text-brand-100">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_28rem_at_85%_0%,rgba(196,135,63,0.16),transparent_65%)]"
      />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-30" />

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
            <Eyebrow tone="dark" className="animate-fade-up">
              {eyebrow}
            </Eyebrow>
            <h1
              className="mt-6 text-h1 text-white animate-fade-up"
              style={{ animationDelay: "60ms" }}
            >
              {title}
            </h1>
            <p
              className="mt-6 max-w-2xl text-lead text-brand-200 animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {description}
            </p>
            {actions ? (
              <div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up"
                style={{ animationDelay: "180ms" }}
              >
                {actions}
              </div>
            ) : null}
          </div>

          {aside ? (
            <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: "160ms" }}>
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
