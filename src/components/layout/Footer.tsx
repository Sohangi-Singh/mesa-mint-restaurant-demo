import Link from "next/link";

import { Wordmark } from "@/components/layout/Wordmark";
import { HoursList } from "@/components/sections/HoursList";
import { ButtonLink } from "@/components/ui/Button";
import { conceptLocation, contactPlaceholders, mainNav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink pt-20 sm:pt-24">
      <div className="container-luxe">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-2 lg:col-span-5">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block text-2xl sm:text-3xl">
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-sm font-display text-2xl font-light italic leading-snug text-cream/90">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
              A contemporary dining room and cafe concept for {site.city} — seasonal plates, considered drinks and
              unhurried evenings.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <ButtonLink href="/reservations" arrow>
                Reserve a Table
              </ButtonLink>
              <ButtonLink href="/contact" variant="text">
                Private dining
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-6 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-sm text-cream/85 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow">Hours</h2>
            <div className="mt-6">
              <HoursList compact />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-6 space-y-3 text-sm text-stone">
              <li>
                <span className="text-cream/85">{contactPlaceholders.email}</span>
                <span className="block text-xs text-stone/70">Placeholder email</span>
              </li>
              <li>
                <span className="text-cream/85">{contactPlaceholders.phone}</span>
                <span className="block text-xs text-stone/70">Placeholder phone</span>
              </li>
              <li>
                {conceptLocation.area}, {site.city}
                <span className="block text-xs text-stone/70">Fictional concept location</span>
              </li>
            </ul>
            <ul aria-label="Social channels (placeholders)" className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {contactPlaceholders.social.map((channel) => (
                <li
                  key={channel}
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-stone/80"
                  title={`${channel} — placeholder, no account linked`}
                >
                  {channel}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-stone/75">Social links are placeholders.</p>
          </div>
        </div>

        <div className="mt-20 border-t border-line py-8">
          <div className="grid gap-4 text-xs leading-relaxed text-stone/80 lg:grid-cols-12 lg:gap-10">
            <p className="lg:col-span-7">
              <strong className="font-semibold text-cream/80">Concept disclaimer.</strong> {site.conceptNotice}
            </p>
            <p className="lg:col-span-5 lg:text-right">
              {site.photographyNotice}
              <br />
              <span className="text-stone/75">© {site.name} concept. All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
