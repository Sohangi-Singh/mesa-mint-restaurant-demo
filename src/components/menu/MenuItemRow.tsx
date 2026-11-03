import Image from "next/image";

import { DietMark } from "@/components/ui/DietMark";
import { allergenLabels, dietLabels, dietaryLabelText, type MenuItem } from "@/data/menu";
import { formatINR } from "@/lib/format";

/** One dish, set like a line on a printed menu with a small photograph alongside. */
export function MenuItemRow({ item }: { item: MenuItem }) {
  const isSignature = item.labels.includes("signature");
  const notes = [dietLabels[item.diet], ...item.labels.filter((l) => l !== "signature").map((l) => dietaryLabelText[l])];

  return (
    <article
      id={item.id}
      className="group grid scroll-mt-[calc(var(--mm-header-h)+6rem)] grid-cols-[4.75rem_minmax(0,1fr)] gap-5 border-b border-line py-7 transition-colors duration-700 target:bg-olive/[0.07] data-[highlight=true]:bg-olive/[0.1] sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8 lg:py-9"
    >
      <div className="dish-frame aspect-[4/5] overflow-hidden">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 640px) 120px, 76px"
          className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.06]"
          style={{ objectPosition: item.image.position }}
        />
      </div>

      <div className="min-w-0 self-center">
        <div className="flex items-baseline gap-4 sm:gap-0">
          <h3 className="font-display text-[1.375rem] leading-[1.15] text-cream sm:text-[1.625rem]">
            {item.name}
            {isSignature ? (
              <>
                <span aria-hidden="true" className="ml-2 inline-block -translate-y-[0.2em] text-[0.7rem] text-olive-light">
                  ✦
                </span>
                <span className="sr-only"> (signature dish)</span>
              </>
            ) : null}
          </h3>
          <span aria-hidden="true" className="leader hidden sm:block" />
          <p className="ml-auto shrink-0 font-display text-lg tabular-nums text-olive-light sm:ml-0 sm:text-xl">
            <span className="sr-only">Price: </span>
            {formatINR(item.price)}
          </p>
        </div>

        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-stone">{item.description}</p>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.75rem] text-stone">
          <DietMark diet={item.diet} showLabel={false} />
          {notes.map((note, index) => (
            <span key={note} className="flex items-center gap-2.5">
              {index > 0 ? (
                <span aria-hidden="true" className="text-stone/50">
                  ·
                </span>
              ) : null}
              {note}
            </span>
          ))}
        </div>
        <p className="mt-1 text-[0.75rem] italic leading-relaxed text-stone/85">
          {item.allergens.length > 0
            ? `Contains ${item.allergens.map((a) => allergenLabels[a].toLowerCase()).join(", ")}`
            : "No major allergens listed"}
        </p>
      </div>
    </article>
  );
}
