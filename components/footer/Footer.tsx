import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { fill, t } from "@/lib/i18n";
import { Icon, SocialIcon } from "@/components/ui/icons";
import { Logo } from "@/components/navigation/Logo";
import { LogoWatermark } from "@/components/visuals/LogoWatermark";
import { legalNav, mainNav } from "@/data/navigation";
import { productCategories } from "@/data/products";
import { services } from "@/data/services";
import { formattedAddress, site } from "@/data/site";

const currentYear = new Date().getFullYear();

/** Site-wide footer: company summary, three link columns, contact block. */
export function Footer() {
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-brand-950 text-brand-200">
      <LogoWatermark className="-z-10 size-[26rem] lg:size-[34rem]" />

      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Company summary */}
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-300">
              {site.description}
            </p>

            {site.social.length > 0 ? (
              <ul className="mt-7 flex items-center gap-3">
                {site.social.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-10 items-center justify-center rounded-md text-brand-300 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <SocialIcon name={social.icon} className="size-4" />
                      <span className="sr-only">
                        {fill(t.footer.socialLabel, {
                          company: site.shortName,
                          network: social.label,
                        })}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Link columns */}
          <nav aria-label={t.nav.footerLabel} className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
                {t.footer.companyHeading}
              </h2>
              <ul className="mt-4 space-y-1 text-sm">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
                {t.footer.servicesHeading}
              </h2>
              <ul className="mt-4 space-y-1 text-sm">
                {services.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <FooterLink href={`/services/${service.id}`}>{service.title}</FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink href="/services">{t.footer.allServices}</FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
                {t.footer.equipmentHeading}
              </h2>
              <ul className="mt-4 space-y-1 text-sm">
                {productCategories.map((category) => (
                  <li key={category.id}>
                    <FooterLink href={`/equipment?category=${category.id}`}>
                      {category.name}
                    </FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink href="/equipment">{t.footer.allEquipment}</FooterLink>
                </li>
              </ul>
            </div>
          </nav>

          {/* Contact block */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              {t.footer.contactHeading}
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="mapPin" className="mt-0.5 size-4 shrink-0 text-accent-400" />
                <address className="not-italic text-brand-300">{formattedAddress()}</address>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-accent-400" />
                <div className="text-brand-300">
                  <a
                    href={site.contact.mobileHref}
                    className="inline-block py-1 transition-colors hover:text-white"
                  >
                    {site.contact.mobileDisplay}
                  </a>
                  <br />
                  <a
                    href={site.contact.landlineHref}
                    className="inline-block py-1 transition-colors hover:text-white"
                  >
                    {site.contact.landlineDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-accent-400" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-block break-all py-1 text-brand-300 transition-colors hover:text-white"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-accent-400" />
                <div className="text-brand-300">
                  {site.contact.hours.map((entry) => (
                    <p key={entry.days}>
                      <span className="text-brand-200">{entry.days}:</span> {entry.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-brand-400">
            {/* Strip a trailing period so entity suffixes like "Ltd." do not double up. */}
            © {site.foundedYear}–{currentYear} {site.legalName.replace(/\.$/, "")}. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {legalNav.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      // Vertical padding keeps the tap target at 24px+ (WCAG 2.2 target size)
      // without changing the visual rhythm of the list.
      className="inline-block py-1 text-brand-300 transition-colors duration-200 hover:text-white"
    >
      {children}
    </Link>
  );
}
