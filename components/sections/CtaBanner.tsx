import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/icons";
import { t } from "@/lib/i18n";
import { site } from "@/data/site";

type CtaBannerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/**
 * Closing call to action, reused at the foot of every page with page-specific
 * copy so each one asks for the next step that actually makes sense there.
 */
export function CtaBanner({
  eyebrow = t.cta.eyebrow,
  title = t.cta.title,
  description = t.cta.description,
  primary = { label: t.actions.requestQuotation, href: "/contact" },
  secondary = { label: t.actions.seeOurServices, href: "/services" },
}: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark bg-white pb-20 pt-4 sm:pb-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl bg-brand-950 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(40rem_24rem_at_88%_10%,rgba(15,95,209,0.24),transparent_60%)]"
          />
          <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-25" />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              <h2 id="cta-heading" className="mt-5 text-h2 text-white">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-lead text-brand-200">{description}</p>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button href={primary.href} variant="accent" size="lg" icon="arrowRight">
                  {primary.label}
                </Button>
                <Button href={secondary.href} variant="outline" size="lg">
                  {secondary.label}
                </Button>
              </div>

              <div className="mt-6 space-y-1 text-sm text-brand-300">
                <p className="flex items-center gap-2">
                  <Icon name="phone" className="size-4 text-accent-400" />
                  <a
                    href={site.contact.mobileHref}
                    className="inline-block py-1 transition-colors hover:text-white"
                  >
                    {site.contact.mobileDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="mail" className="size-4 text-accent-400" />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-block break-all py-1 transition-colors hover:text-white"
                  >
                    {site.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
