import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { DietMark } from "@/components/ui/DietMark";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";
import { featuredMenuIds, getCategory, getMenuItem, type MenuCategoryId } from "@/data/menu";
import { formatINR } from "@/lib/format";

const columns = Object.entries(featuredMenuIds) as [Exclude<MenuCategoryId, "beverages">, string[]][];

export function FeaturedMenu() {
  return (
    <section aria-labelledby="featured-title" className="py-24 sm:py-32 lg:py-44">
      <div className="container-luxe">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionIntro id="featured-title" index="05" eyebrow="From the Menu" title="A taste of the table." />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/menu" variant="text" arrow>
              View the full menu
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-line lg:mt-20 lg:grid-cols-3">
          {columns.map(([categoryId, ids], columnIndex) => {
            const category = getCategory(categoryId);
            return (
              <Reveal
                key={categoryId}
                delay={columnIndex * 0.08}
                className={`border-b border-line py-10 lg:border-b-0 lg:py-12 ${
                  columnIndex > 0 ? "lg:border-l lg:pl-10" : ""
                } ${columnIndex < columns.length - 1 ? "lg:pr-10" : ""}`}
              >
                <h3 className="font-display text-3xl text-cream">{category.label}</h3>
                <p className="mt-2 text-sm text-stone">{category.description}</p>
                <ul className="mt-8 space-y-7">
                  {ids.map((id) => {
                    const item = getMenuItem(id);
                    return (
                      <li key={id}>
                        <div className="flex items-baseline">
                          <span className="mr-3 translate-y-[-0.1em]">
                            <DietMark diet={item.diet} showLabel={false} />
                          </span>
                          <span className="font-display text-xl leading-snug text-cream">{item.name}</span>
                          <span aria-hidden="true" className="leader" />
                          <span className="font-display text-lg text-olive-light">{formatINR(item.price)}</span>
                        </div>
                        <p className="mt-1.5 pl-[1.625rem] text-sm leading-relaxed text-stone">{item.description}</p>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 grid items-center gap-10 border border-line lg:mt-20 lg:grid-cols-12 lg:gap-0">
          <div className="relative aspect-[16/10] overflow-hidden lg:col-span-6 lg:aspect-[16/11]">
            <RevealImage className="absolute inset-0">
              <Image
                src={atmosphere.cocktailTrio.src}
                alt={atmosphere.cocktailTrio.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </RevealImage>
          </div>
          <Reveal className="px-6 pb-10 sm:px-10 lg:col-span-5 lg:col-start-8 lg:px-0 lg:py-12">
            <p className="eyebrow">The Bar</p>
            <h3 className="display-md mt-5 text-cream">Considered pours, zero-proof included.</h3>
            <p className="prose-luxe mt-5">
              Cocktails built on Indian ingredients — kokum, jaggery, butterfly pea — alongside non-alcoholic
              coolers and chai pulled to order.
            </p>
            <div className="mt-8">
              <ButtonLink href="/menu#beverages" variant="text" arrow>
                See beverages
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 text-xs text-stone/80">
          All dishes and prices are illustrative concept content, shown in Indian rupees.
        </p>
      </div>
    </section>
  );
}
