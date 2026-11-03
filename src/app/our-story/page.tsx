import type { Metadata } from "next";
import Image from "next/image";

import { ReservationCta } from "@/components/sections/ReservationCta";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { Eyebrow, SectionIntro } from "@/components/ui/SectionIntro";
import { atmosphere, type SiteImage } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "The philosophy behind MESA & MINT — seasonal cooking, careful sourcing and unhurried hospitality, imagined for a contemporary dining room in Bengaluru.",
  path: "/our-story",
});

function StoryImage({ image, sizes, className = "" }: { image: SiteImage; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <RevealImage className="absolute inset-0">
        <Image src={image.src} alt={image.alt} fill placeholder="blur" sizes={sizes} className="object-cover" />
      </RevealImage>
    </div>
  );
}

const sourcingNotes = [
  {
    title: "Close to home",
    text: "Vegetables, herbs and dairy from growers within reach of the city, chosen at their peak.",
  },
  {
    title: "Whole spices, ground daily",
    text: "Cardamom, Byadgi chilli, kokum and curry leaf — toasted and ground in small batches.",
  },
  {
    title: "Nothing wasted",
    text: "Peels become stocks, trimmings become pickles, and the menu shifts with what is plentiful.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            Built around the <em className="font-light italic text-olive-light">table</em>.
          </>
        }
        intro={
          <p>
            Mesa means table. Mint is the brightness we bring to it. Together they describe what we care about
            most: good food, shared generously, in a room you won&rsquo;t want to leave.
          </p>
        }
        image={atmosphere.amberLightsDiningRoom}
        focus="50% 35%"
      />

      {/* Philosophy */}
      <section aria-labelledby="story-philosophy" className="py-24 sm:py-32 lg:py-40">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionIntro id="story-philosophy" index="01" eyebrow="Philosophy" title="A restaurant should feel like an invitation." />
          </Reveal>
          <Reveal delay={0.1} className="prose-luxe space-y-6 lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="font-display text-2xl leading-snug text-cream sm:text-[1.75rem]">
              We believe the meal is only half of the evening. The rest is the light, the pace, the people you
              share it with — and the feeling that someone has thought about all of it before you arrived.
            </p>
            <p>
              MESA &amp; MINT is imagined as a contemporary dining room and cafe for Bengaluru: relaxed enough for a
              Tuesday lunch, considered enough for a celebration. The menu draws on Indian ingredients and
              Mediterranean simplicity without being bound by either.
            </p>
            <p>
              Everything here is designed to be shared. Plates move around the table, conversations stretch, and
              dessert is never rushed.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-luxe">
        <StoryImage
          image={atmosphere.whiteLinenDining}
          sizes="100vw"
          className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
        />
      </div>

      {/* Culinary approach */}
      <section aria-labelledby="story-culinary" className="py-24 sm:py-32 lg:py-40">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-6">
            <StoryImage image={atmosphere.saucePour} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4]" />
            <StoryImage
              image={atmosphere.chefTweezersHerbs}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="mt-16 aspect-[3/4] sm:mt-24"
            />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <SectionIntro id="story-culinary" index="02" eyebrow="Culinary Approach" title="Precise, but never fussy.">
              <p>
                The kitchen pairs careful technique with a light hand. Charcoal and tandoor bring depth; acidity,
                herbs and freshly ground spice keep each plate bright.
              </p>
              <p className="mt-5">
                Menus are short and change with the seasons. When an ingredient is at its best, we build around
                it — and when it isn&rsquo;t, it waits until next year.
              </p>
            </SectionIntro>
          </Reveal>
        </div>
      </section>

      {/* Ingredients & sourcing */}
      <section aria-labelledby="story-sourcing" className="bg-umber py-24 sm:py-32 lg:py-40">
        <div className="container-luxe">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <SectionIntro
                id="story-sourcing"
                index="03"
                eyebrow="Ingredients & Sourcing"
                title={
                  <>
                    Start with what&rsquo;s <em className="italic text-olive-light">good</em>.
                  </>
                }
              >
                <p>
                  A dish can only be as honest as its ingredients. Our sourcing philosophy is simple: buy close
                  to home where we can, buy whole where we can, and let the season set the menu.
                </p>
              </SectionIntro>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
            <StoryImage
              image={atmosphere.spicesCurryLeaves}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[4/3] lg:col-span-7"
            />
            <div className="flex flex-col gap-6 lg:col-span-5">
              <StoryImage
                image={atmosphere.freshMint}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="aspect-[16/9] lg:aspect-[4/3]"
              />
              <ul className="border-t border-line">
                {sourcingNotes.map((note, index) => (
                  <li key={note.title} className="border-b border-line py-5">
                    <Reveal delay={index * 0.06}>
                      <h3 className="font-display text-xl text-cream">{note.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-stone">{note.text}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The dining experience */}
      <section aria-labelledby="story-experience" className="py-24 sm:py-32 lg:py-40">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <SectionIntro
              id="story-experience"
              index="04"
              eyebrow="The Dining Experience"
              title="Low light. Warm wood. Time."
            >
              <p>
                The room is designed for lingering: soft pools of light over each table, warm timber, and enough
                space between guests that conversations stay private.
              </p>
              <p className="mt-5">
                At the bar, cocktails are built on Indian ingredients and zero-proof drinks get the same
                attention as the rest. However you spend the evening, the table is yours.
              </p>
            </SectionIntro>
            <div className="mt-10">
              <Eyebrow>A note on this concept</Eyebrow>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
                MESA &amp; MINT is a fictional restaurant created as a design demonstration. It has no founders,
                staff or premises; the photography shows real spaces and dishes from Unsplash contributors and
                is used for illustration only.
              </p>
            </div>
          </Reveal>
          <div className="order-1 grid grid-cols-5 gap-4 sm:gap-6 lg:order-2 lg:col-span-6 lg:col-start-7">
            <StoryImage
              image={atmosphere.bartenderPour}
              sizes="(min-width: 1024px) 28vw, 60vw"
              className="col-span-3 aspect-[3/4]"
            />
            <StoryImage
              image={atmosphere.tableGlassesLinen}
              sizes="(min-width: 1024px) 20vw, 40vw"
              className="col-span-2 mt-20 aspect-[3/5] sm:mt-32"
            />
          </div>
        </div>
      </section>

      <ReservationCta image={atmosphere.roundTableAlcove} title="Come and see it for yourself." />
    </>
  );
}
