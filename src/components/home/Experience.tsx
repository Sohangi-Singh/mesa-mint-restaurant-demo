import Image from "next/image";

import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";

const moments = [
  {
    title: "The Room",
    text: "Warm wood, soft pools of light and tables spaced so conversation stays your own.",
  },
  {
    title: "The Service",
    text: "Attentive without hovering. We'll guide you through the menu, or simply let the evening unfold.",
  },
  {
    title: "The Pace",
    text: "Plates arrive when the table is ready for them. Linger over dessert — there is no rush to turn the table.",
  },
];

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="pb-24 sm:pb-32 lg:pb-44">
      <div className="relative h-[58svh] min-h-[22rem] overflow-hidden lg:h-[86svh]">
        <RevealImage className="absolute inset-0">
          <Image
            src={atmosphere.diningRoomHangingLights.src}
            alt={atmosphere.diningRoomHangingLights.alt}
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </RevealImage>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,20,0.2)_0%,rgba(23,23,20,0)_40%,#171714_100%)]"
        />
      </div>

      <div className="container-luxe relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="relative -mt-28 border border-line bg-charcoal p-7 sm:-mt-36 sm:p-12 lg:col-span-6 lg:-mt-56 lg:self-start lg:p-14">
            <SectionIntro
              id="experience-title"
              index="03"
              eyebrow="The Experience"
              title={
                <>
                  An evening, <em className="italic text-olive-light">not</em> a sitting.
                </>
              }
            >
              <p>
                Hospitality, to us, is the feeling of being expected. A table dressed before you arrive, a
                glass poured as you settle in, a kitchen cooking at the rhythm of your conversation.
              </p>
            </SectionIntro>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <ol className="border-t border-line">
              {moments.map((moment, index) => (
                <li key={moment.title} className="border-b border-line py-7">
                  <Reveal delay={index * 0.08} className="grid grid-cols-[3rem_1fr] gap-4">
                    <span className="font-display text-lg italic text-olive-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-cream">{moment.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">{moment.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <div className="relative ml-auto mt-12 aspect-[3/4] w-3/4 overflow-hidden sm:w-2/3">
              <RevealImage className="absolute inset-0">
                <Image
                  src={atmosphere.tableLampGlasses.src}
                  alt={atmosphere.tableLampGlasses.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 26vw, 66vw"
                  className="object-cover"
                />
              </RevealImage>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
