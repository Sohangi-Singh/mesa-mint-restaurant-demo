"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Wordmark } from "@/components/layout/Wordmark";
import { buttonClasses } from "@/components/ui/Button";
import { mainNav, openingHours, site } from "@/data/site";
import { formatTime12h } from "@/lib/format";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Lock page scroll, trap focus and support Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // The close toggle lives in the header bar, so include it in the trap.
    const panelItems = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    const focusables = () => [toggleRef.current, ...panelItems()].filter((el): el is HTMLElement => !!el);
    panelItems()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
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
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Close the menu if the viewport grows to desktop width.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || open;
  const servicePeriods = openingHours[1]?.periods;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-luxe ${
        solid ? "border-b border-line bg-charcoal" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink/70 to-transparent transition-opacity duration-500 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="container-luxe flex h-[var(--mm-header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="relative z-10 text-[1.0625rem] sm:text-xl"
          onClick={() => close(false)}
          aria-label={`${site.name} — home`}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="link-underline py-2 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-cream/75 transition-colors duration-300 hover:text-cream aria-[current=page]:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/reservations"
            aria-current={pathname === "/reservations" ? "page" : undefined}
            className={buttonClasses(
              "primary",
              "!min-h-10 !px-4 !py-2.5 !tracking-[0.2em] !shadow-none sm:!px-6 lg:!min-h-11 aria-[current=page]:!border-cream/40 aria-[current=page]:!bg-transparent",
            )}
          >
            <span className="sm:hidden">Reserve</span>
            <span className="hidden sm:inline">Reserve a Table</span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 grid size-11 place-items-center text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            <Menu
              aria-hidden="true"
              className={`absolute size-6 transition-[opacity,transform] duration-300 ${open ? "rotate-90 opacity-0" : "opacity-100"}`}
              strokeWidth={1.25}
            />
            <X
              aria-hidden="true"
              className={`absolute size-6 transition-[opacity,transform] duration-300 ${open ? "opacity-100" : "-rotate-90 opacity-0"}`}
              strokeWidth={1.25}
            />
          </button>
        </div>
      </div>

      {/* Always mounted so it can transition out; `inert` removes it from focus and the accessibility tree. */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-[var(--mm-header-h)] z-40 flex flex-col overflow-y-auto bg-charcoal lg:hidden ${
          // Visible immediately on open (so focus can move in); hidden only after the fade-out.
          open
            ? "visible opacity-100 [transition:opacity_400ms_var(--mm-ease)]"
            : "pointer-events-none invisible opacity-0 [transition:opacity_400ms_var(--mm-ease),visibility_0s_linear_400ms]"
        }`}
      >
        <nav aria-label="Mobile" className="container-luxe flex-1 pt-8">
          <ul className="border-t border-line">
            {mainNav.map((item, index) => (
              <li
                key={item.href}
                className={`border-b border-line transition-[opacity,transform] duration-500 ease-luxe ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${60 * index + 80}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="group flex items-baseline justify-between gap-4 py-5 text-cream"
                >
                  <span className="font-display text-[2.375rem] font-light leading-none transition-colors group-aria-[current=page]:italic group-aria-[current=page]:text-olive-light">
                    {item.label}
                  </span>
                  <span className="eyebrow tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-luxe space-y-6 pb-10 pt-10">
          {servicePeriods ? (
            <p className="text-sm leading-relaxed text-stone">
              Tuesday – Sunday · Lunch {formatTime12h(servicePeriods[0].opens)} · Dinner{" "}
              {formatTime12h(servicePeriods[1].opens)}
              <br />
              Closed on Mondays
            </p>
          ) : null}
          <Link
            href="/reservations"
            onClick={() => close(false)}
            className={buttonClasses("primary", "w-full")}
          >
            Request a Reservation
          </Link>
          <p className="text-xs leading-relaxed text-stone/80">
            {site.name} is a fictional concept restaurant created for demonstration.
          </p>
        </div>
      </div>
    </header>
  );
}
