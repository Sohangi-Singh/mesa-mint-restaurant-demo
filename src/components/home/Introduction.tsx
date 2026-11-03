import Image from "next/image";

import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";

const pillars = [
  { title: "Seasonal produce", text: "Chosen for flavour first, and cooked while it is at its best." },
  { title: "Fire & restraint", text: "Charcoal, tandoor and slow heat — used to lift, never to mask." },
  { title: "Plates to share", text: "Dishes designed to travel around the table, start to finish." },
];

export function Introduction() {
  const image = atmosphere.tableLowLight;

  return (
    <section id="introduction" aria-labelledby="intro-title" className="py-24 sm:py-32 lg:py-44">
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionIntro
              id="intro-title"
              index="01"
              eyebrow="The Table"
              title={
                <>
                  Dining as it should feel — <em className="italic text-olive-light">generous</em>, unhurried
                  and shared.
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1} className="prose-luxe mt-10 max-w-xl space-y-5">
            <p>
              MESA &amp; MINT is built around a simple idea: the best evenings happen at a table where nothing
              is rushed. <span className="text-cream">Mesa</span> is the table itself — the gathering point.{" "}
              <span className="text-cream">Mint</span> is the brightness we bring to it: fresh herbs, clean
              flavours and a lightness of touch.
            </p>
            <p>
              The kitchen follows the seasons. Vegetables and fruit are chosen for flavour, spices are toasted
              and ground in-house, and every plate is built to be passed, tasted and talked about.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="bg-charcoal p-6">
                  <h3 className="font-display text-xl text-cream">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{pillar.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <figure className="lg:col-span-5 lg:col-start-8 lg:mt-28">
          <div className="relative aspect-[4/5] overflow-hidden">
            <RevealImage className="absolute inset-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </RevealImage>
          </div>
          <figcaption className="mt-4 flex items-start gap-4 text-sm text-stone">
            <span aria-hidden="true" className="mt-2.5 h-px w-8 shrink-0 bg-olive/60" />
            Low light, warm wood and time — the room is set for lingering.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
