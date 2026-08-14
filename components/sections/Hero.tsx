import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { LogoWatermark } from "@/components/visuals/LogoWatermark";
import { fill, t } from "@/lib/i18n";
import { sectors } from "@/data/company";
import { textVars } from "@/data/site";

/**
 * Home hero. Answers, in order: who we are, what we repair, why us, and what
 * to do next.
 */
export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-950 text-brand-100">
      {/* Depth: one soft cyan wash plus a hairline grid. No heavy gradients. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_80%_-10%,rgba(15,95,209,0.22),transparent_60%)]"
      />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-40" />
      <LogoWatermark className="-z-10 -right-24 -top-16 size-136 sm:-right-16 lg:right-24 lg:size-168" />

      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Eyebrow tone="dark" className="animate-fade-up">
              {fill(t.home.hero.eyebrow, textVars)}
            </Eyebrow>

            <h1
              className="mt-6 text-display text-white animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {t.home.hero.title}
            </h1>

            <p
              className="mt-7 max-w-xl text-lead text-brand-200 animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              {fill(t.home.hero.lead, textVars)}
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              <Button href="/contact" variant="accent" size="lg" icon="arrowRight">
                {t.actions.requestQuotation}
              </Button>
              <Button href="/services" variant="outline" size="lg">
                {t.actions.seeWhatWeRepair}
              </Button>
            </div>

            <ul className="mt-10 grid gap-3 animate-fade-up" style={{ animationDelay: "320ms" }}>
              {t.home.hero.assurances.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-200">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Work photographs */}
          <div
            className="lg:col-span-6 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <HeroPhoto
                  src="/images/projects/diesel-forklift-overhaul.webp"
                  alt="Diesel forklift undergoing general rehabilitation in the yard"
                  className="aspect-4/5"
                  priority
                />
                <HeroPhoto
                  src="/images/projects/motor-rewinding-bench.webp"
                  alt="Motor stator and compressor components laid out for rewinding"
                  className="aspect-square"
                />
              </div>
              <div className="space-y-4 pt-10">
                <HeroPhoto
                  src="/images/projects/refrigerant-charging.webp"
                  alt="Technicians charging refrigerant at an outdoor condenser bank"
                  className="aspect-square"
                  priority
                />
                <HeroPhoto
                  src="/images/projects/hydraulic-cylinder-workshop.webp"
                  alt="Large hydraulic cylinder standing on the workshop floor"
                  className="aspect-4/5"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Sector strip */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
            {t.labels.sectorsWeServe}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {sectors.map((sector) => (
              <li key={sector} className="text-sm text-brand-300">
                {sector}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}

function HeroPhoto({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ring-1 ring-white/15 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 24vw, 45vw"
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
