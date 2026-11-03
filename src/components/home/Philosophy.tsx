import Image from "next/image";

import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";

const principles = [
  {
    numeral: "I",
    title: "Source with intent",
    text: "Fewer ingredients, chosen carefully — and when something isn't at its best, it comes off the menu.",
  },
  {
    numeral: "II",
    title: "Cook with restraint",
    text: "Technique in service of flavour. A dish is finished when there is nothing left to take away.",
  },
  {
    numeral: "III",
    title: "Serve with warmth",
    text: "Good food deserves good company. We set the table, then step back and let you enjoy it.",
  },
];

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="bg-umber py-24 sm:py-32 lg:py-44">
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden">
            <RevealImage className="absolute inset-0">
              <Image
                src={atmosphere.chefGarnishGreens.src}
                alt={atmosphere.chefGarnishGreens.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </RevealImage>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Reveal>
            <Eyebrow index="04">Our Philosophy</Eyebrow>
            <h2 id="philosophy-title" className="display-lg mt-6 text-cream">
              Restraint is an <em className="italic text-olive-light">ingredient</em>.
            </h2>
            <p className="prose-luxe mt-7 max-w-lg">
              We would rather do fewer things, with more care. The menu is short, it changes often, and every
              element on the plate has a reason to be there.
            </p>
          </Reveal>

          <ol className="mt-14 space-y-10">
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <Reveal delay={index * 0.08} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line pt-6">
                  <span aria-hidden="true" className="font-display text-3xl font-light italic text-olive-light">
                    {principle.numeral}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-cream">{principle.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">{principle.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
