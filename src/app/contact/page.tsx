import type { Metadata } from "next";

import { ConceptMap } from "@/components/contact/ConceptMap";
import { WhatsAppCard } from "@/components/contact/WhatsAppCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { HoursList } from "@/components/sections/HoursList";
import { ButtonLink } from "@/components/ui/Button";
import { ConceptNote } from "@/components/ui/ConceptNote";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionIntro } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";
import { conceptLocation, contactPlaceholders } from "@/data/site";
import { isEmailConfigured } from "@/lib/email";
import { pageMetadata } from "@/lib/metadata";
import { MAX_GUESTS } from "@/lib/reservation-rules";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Questions, private dining, large groups or feedback — get in touch with MESA & MINT, a fictional contemporary restaurant concept in Bengaluru.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Get in <em className="font-light italic text-olive-light">touch</em>.
          </>
        }
        intro={
          <p>
            Private dining, a larger celebration, a dietary question or simply feedback — write to us and the
            team will reply by email.
          </p>
        }
        image={atmosphere.roundTableAlcove}
        focus="50% 45%"
      />

      <section aria-labelledby="enquiry-title" className="pb-24 pt-10 sm:pb-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="enquiry-title" className="display-md mb-10 text-cream">
              Send an enquiry
            </h2>
            <ContactForm emailConfigured={isEmailConfigured()} />
          </div>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
            <div className="border border-line bg-umber/60 p-6">
              <p className="font-display text-2xl text-cream">Booking a table?</p>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                For up to {MAX_GUESTS} guests, the reservation request form is the quickest way to reach us.
              </p>
              <ButtonLink href="/reservations" variant="text" arrow className="mt-3">
                Request a reservation
              </ButtonLink>
            </div>

            <WhatsAppCard />

            <div>
              <Eyebrow>Direct contact</Eyebrow>
              <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                <div className="flex flex-col gap-1 py-4">
                  <dt className="text-stone">Email</dt>
                  <dd className="text-cream">
                    {contactPlaceholders.email}
                    <span className="block text-xs text-stone/70">Placeholder — not a monitored inbox</span>
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-4">
                  <dt className="text-stone">Phone</dt>
                  <dd className="text-cream">
                    {contactPlaceholders.phone}
                    <span className="block text-xs text-stone/70">Placeholder — not a working number</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <Eyebrow>Hours</Eyebrow>
              <div className="mt-6">
                <HoursList compact />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="location-title" className="border-t border-line py-24 sm:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-4">
            <SectionIntro id="location-title" eyebrow="Location" title="A fictional address, a real idea." size="md">
              <p>
                MESA &amp; MINT is imagined as a neighbourhood dining room in {conceptLocation.area}. As a
                demonstration concept it has no physical premises, so no street address or directions are given.
              </p>
            </SectionIntro>
            <ConceptNote className="mt-8">{conceptLocation.note}</ConceptNote>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <ConceptMap />
          </Reveal>
        </div>
      </section>
    </>
  );
}
