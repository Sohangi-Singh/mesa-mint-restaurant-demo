import type { Metadata } from "next";
import Link from "next/link";

import { ReservationForm } from "@/components/forms/ReservationForm";
import { HoursList } from "@/components/sections/HoursList";
import { ConceptNote } from "@/components/ui/ConceptNote";
import { PageHero } from "@/components/ui/PageHero";
import { atmosphere } from "@/data/images";
import { isEmailConfigured } from "@/lib/email";
import { pageMetadata } from "@/lib/metadata";
import { MAX_GUESTS } from "@/lib/reservation-rules";

export const metadata: Metadata = pageMetadata({
  title: "Reservations",
  description:
    "Request a table at MESA & MINT. Share your preferred date, time and party size — our team will contact you personally to confirm.",
  path: "/reservations",
});

const steps = [
  {
    title: "Send a request",
    text: "Choose a preferred date, time and party size, and tell us about any occasion or dietary needs.",
  },
  {
    title: "We check the book",
    text: "A member of our team reviews every request by hand — availability is never auto-confirmed online.",
  },
  {
    title: "We confirm with you",
    text: "We'll contact you by phone or email to confirm your table, or to suggest the closest alternative.",
  },
];

export default function ReservationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title={
          <>
            Reserve a <em className="font-light italic text-olive-light">table</em>.
          </>
        }
        intro={
          <p>
            Tell us when you&rsquo;d like to join us. This form sends a request — our team will contact you
            personally to confirm your table.
          </p>
        }
        image={atmosphere.tableGlassesLinen}
        focus="50% 55%"
      />

      <section aria-label="Reservation request" className="pb-24 pt-10 sm:pb-32 lg:pb-40">
        {/* DOM order (steps → form → details) gives mobile visitors the form early;
            on large screens the steps and details share the left column. */}
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-12">
          <div className="lg:col-span-4 lg:row-start-1">
            <div>
              <h2 className="eyebrow">How it works</h2>
              <ol className="mt-8 space-y-8">
                {steps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="font-display text-xl italic text-olive-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-cream">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <ReservationForm emailConfigured={isEmailConfigured()} />
          </div>

          <aside aria-label="Hours and policies" className="space-y-12 lg:col-span-4 lg:row-start-2">
            <div>
              <h2 className="eyebrow">Opening hours</h2>
              <div className="mt-6">
                <HoursList />
              </div>
            </div>

            <div className="border border-line p-6">
              <h2 className="font-display text-2xl text-cream">Larger parties &amp; private dining</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone">
                Online requests are for up to {MAX_GUESTS} guests. For larger groups, celebrations or a private
                room, please{" "}
                <Link href="/contact" className="link-underline text-cream">
                  send us an enquiry
                </Link>
                .
              </p>
            </div>

            <ConceptNote>
              MESA &amp; MINT is a fictional concept. Hours and policies shown here are illustrative.
            </ConceptNote>
          </aside>
        </div>
      </section>
    </>
  );
}
