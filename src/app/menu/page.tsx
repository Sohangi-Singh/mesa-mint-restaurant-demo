import type { Metadata } from "next";

import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { ConceptNote } from "@/components/ui/ConceptNote";
import { PageHero } from "@/components/ui/PageHero";
import { atmosphere } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Menu",
  description:
    "Small plates, mains, desserts and a considered bar — the illustrative concept menu for MESA & MINT, with prices in Indian rupees and dietary information.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="The Menu"
        title={
          <>
            Made to be <em className="font-light italic text-olive-light">shared</em>.
          </>
        }
        intro={
          <p>
            Small plates to open, generous mains, quiet desserts and a bar built on Indian ingredients. Order a
            few things for the table and let the evening find its pace.
          </p>
        }
        image={atmosphere.sharedTableWine}
        focus="50% 60%"
      />

      <div className="container-luxe pb-10">
        <ConceptNote className="max-w-3xl">
          All dishes, descriptions and prices on this page are illustrative concept content for a fictional
          restaurant. Prices are shown in Indian rupees (₹).
        </ConceptNote>
      </div>

      <MenuBrowser />

      <div className="container-luxe pb-24 pt-4 lg:pb-32">
        <div className="grid gap-6 border-t border-line pt-10 text-sm leading-relaxed text-stone md:grid-cols-3">
          <p>
            <span className="block font-display text-xl text-cream">Vegetarian, the Indian way</span>
            Vegetarian dishes are prepared without meat, fish or egg. The square-and-dot mark denotes vegetarian
            and vegan dishes; the square-and-triangle mark denotes non-vegetarian dishes.
          </p>
          <p>
            <span className="block font-display text-xl text-cream">Allergies &amp; intolerances</span>
            Allergen notes are illustrative. In a working kitchen, guests should always tell their server about
            allergies, as dishes are prepared in a shared space.
          </p>
          <p>
            <span className="block font-display text-xl text-cream">Taxes &amp; service</span>
            In a live menu, prices would state whether applicable taxes and service charges are included.
          </p>
        </div>
      </div>

      <ReservationCta image={atmosphere.tableLowLight} title="Hungry for more? Save a seat." />
    </>
  );
}
