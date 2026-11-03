import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { DietMark } from "@/components/ui/DietMark";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { dietaryLabelText, getMenuItem, signatureDishIds } from "@/data/menu";
import { formatINR } from "@/lib/format";

/** Asymmetric editorial placement for each of the four dishes on large screens. */
const layout = [
  { slot: "lg:col-span-5", aspect: "aspect-[4/5]" },
  { slot: "lg:col-span-5 lg:col-start-8 lg:mt-40", aspect: "aspect-[4/5]" },
  { slot: "lg:col-span-5 lg:col-start-2 lg:-mt-6", aspect: "aspect-[4/5]" },
  { slot: "lg:col-span-6 lg:col-start-7 lg:mt-28", aspect: "aspect-[3/2]" },
];

export function SignatureDishes() {
  const dishes = signatureDishIds.map(getMenuItem);

  return (
    <section aria-labelledby="signature-title" className="border-t border-line py-24 sm:py-32 lg:py-40">
      <div className="container-luxe">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionIntro
              id="signature-title"
              index="02"
              eyebrow="Signature Dishes"
              title="Four plates that define the table."
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="prose-luxe">
              From a chilled beetroot tartare to a saffron-poached pear — the dishes we would cook for you on
              your first visit, and hope you return for.
            </p>
            <p className="mt-4 text-xs text-stone/80">Illustrative concept dishes and prices.</p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-y-0">
          {dishes.map((dish, index) => (
            <li key={dish.id} className={`${layout[index].slot} ${index % 2 === 1 ? "sm:mt-20" : ""}`}>
              <Reveal delay={index % 2 === 1 ? 0.12 : 0}>
                <article className="group relative">
                  <div className={`dish-frame overflow-hidden ${layout[index].aspect}`}>
                    <Image
                      src={dish.image.src}
                      alt={dish.image.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.04]"
                      style={{ objectPosition: dish.image.position }}
                    />
                    <span className="absolute left-0 top-0 z-[2] bg-charcoal/85 px-3 py-2 font-display text-sm italic text-cream">
                      No. {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-7 flex items-baseline justify-between gap-6 border-b border-line pb-4 transition-colors duration-500 group-hover:border-olive/60">
                    <h3 className="font-display text-[1.75rem] leading-tight text-cream sm:text-[2rem]">
                      {/* Stretched link: the whole card opens this dish on the menu. */}
                      <Link
                        href={`/menu#${dish.id}`}
                        className="after:absolute after:inset-0 after:z-[3] after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-olive-light"
                      >
                        {dish.name}
                      </Link>
                    </h3>
                    <p className="shrink-0 font-display text-xl tabular-nums text-olive-light">{formatINR(dish.price)}</p>
                  </div>
                  <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-stone">{dish.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <DietMark diet={dish.diet} />
                    {dish.labels
                      .filter((label) => label !== "signature")
                      .map((label) => (
                        <span
                          key={label}
                          className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-stone"
                        >
                          {dietaryLabelText[label]}
                        </span>
                      ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-20 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8 lg:mt-28">
          <ButtonLink href="/menu" variant="outline" arrow>
            View the Full Menu
          </ButtonLink>
          <ButtonLink href="/reservations" variant="text" arrow>
            Reserve to taste them
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
