"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/navigation/Logo";

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Sticky site header.
 *
 * Desktop: horizontal navigation with an underline marking the current page.
 * Mobile: a full-height dialog panel with a focus trap, Escape-to-close,
 * background scroll locking and focus returned to the toggle on close.
 */
export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  /* Close the menu whenever navigation completes. */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* Elevate the header once the page has scrolled past the hero edge. */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Menu behaviour: scroll lock, Escape, focus trap, focus restoration. */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const toggleButton = toggleRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      // Send focus back to the control that opened the menu, so keyboard users
      // resume where they left off rather than at the top of the document.
      const restoreTo = toggleButton?.isConnected ? toggleButton : previouslyFocused;
      restoreTo?.focus?.();
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        isScrolled || isOpen
          ? "border-b border-hairline bg-white/90 shadow-subtle backdrop-blur-md"
          : "border-b border-transparent bg-white",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo className="shrink-0" />

        {/* ---------------------------------------------------------------- */}
        {/* Desktop navigation                                               */}
        {/* ---------------------------------------------------------------- */}
        <nav aria-label={t.nav.mainLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center rounded-md px-3 text-[0.9375rem] font-medium transition-colors duration-200 xl:px-3.5",
                      active
                        ? "text-brand-900"
                        : "text-brand-600 hover:bg-brand-50 hover:text-brand-900",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500 transition-transform duration-300 ease-out xl:inset-x-3.5",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* The phone number only earns its space once the nav has room. */}
          <a
            href={site.contact.mobileHref}
            className="hidden items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-900 xl:inline-flex"
          >
            <Icon name="phone" className="size-4 text-accent-600" />
            <span>{site.contact.mobileDisplay}</span>
          </a>
          <Button href="/contact" size="sm" icon="arrowRight">
            {t.actions.requestQuotation}
          </Button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile toggle                                                    */}
        {/* ---------------------------------------------------------------- */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="inline-flex size-11 items-center justify-center rounded-md text-brand-800 ring-1 ring-inset ring-brand-200 transition-colors hover:bg-brand-50 lg:hidden"
        >
          <Icon name={isOpen ? "close" : "menu"} className="size-5" />
          <span className="sr-only">{isOpen ? t.nav.closeMenu : t.nav.openMenu}</span>
        </button>
      </Container>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile panel                                                       */}
      {/* ------------------------------------------------------------------ */}
      {isOpen ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={close}
            className="fixed inset-x-0 bottom-0 top-16 z-40 cursor-default bg-brand-950/40 backdrop-blur-[2px] animate-fade-in"
          />
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.siteMenuLabel}
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-hairline bg-white pb-8 shadow-lift animate-fade-up"
          >
            <Container className="pt-4">
              <nav aria-label={t.nav.mobileLabel}>
                <ul className="flex flex-col">
                  {mainNav.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href} className="border-b border-hairline last:border-b-0">
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between gap-4 py-4 transition-colors",
                            active ? "text-brand-900" : "text-brand-700",
                          )}
                        >
                          <span className="flex flex-col gap-1">
                            <span className="font-display text-lg font-bold tracking-tight">
                              {item.label}
                            </span>
                            {item.description ? (
                              <span className="text-sm text-brand-500">{item.description}</span>
                            ) : null}
                          </span>
                          <Icon
                            name="arrowRight"
                            className={cn(
                              "size-5 shrink-0",
                              active ? "text-accent-600" : "text-brand-300",
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contact" size="lg" icon="arrowRight" className="w-full">
                  {t.actions.requestQuotation}
                </Button>
                <Button
                  href={site.contact.mobileHref}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  <Icon name="phone" className="size-4 text-accent-600" />
                  {site.contact.mobileDisplay}
                </Button>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}
