import Image from "next/image";

import { HoursList } from "@/components/sections/HoursList";
import { ConceptNote } from "@/components/ui/ConceptNote";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";
import { conceptLocation } from "@/data/site";

export function LocationHours({ index = "06" }: { index?: string }) {
  return (
    <section aria-labelledby="visit-title" className="py-24 sm:py-32 lg:py-44">
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionIntro id="visit-title" index={index} eyebrow="Location & Hours" title="Where the table is set." />
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-8">
            <div>
              <h3 className="eyebrow">{conceptLocation.label}</h3>
              <p className="mt-4 font-display text-2xl leading-snug text-cream">
                {conceptLocation.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <ConceptNote>
              {conceptLocation.note} Opening hours are illustrative and shown for demonstration.
            </ConceptNote>
            <div>
              <h3 className="eyebrow mb-4">Opening hours</h3>
              <HoursList />
            </div>
          </Reveal>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5]">
            <RevealImage className="absolute inset-0">
              <Image
                src={atmosphere.dimlyLitDiningRoom.src}
                alt={atmosphere.dimlyLitDiningRoom.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </RevealImage>
          </div>
          <figcaption className="mt-4 text-sm text-stone">
            Lunch from 12:30 pm, dinner from 7:00 pm — Tuesday to Sunday.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
