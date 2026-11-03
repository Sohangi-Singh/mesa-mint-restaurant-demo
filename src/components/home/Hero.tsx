import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";
import { site } from "@/data/site";

export function Hero() {
  const image = atmosphere.heroInterior;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        quality={80}
        placeholder="blur"
        sizes="100vw"
        className="-z-20 animate-hero-settle object-cover object-[46%_50%] sm:object-[58%_50%]"
      />

      {/* Lighting: keep the pendant lamps glowing while seating the type in shadow. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,14,12,0.65)_0%,rgba(15,14,12,0.08)_17%,rgba(15,14,12,0.2)_29%,rgba(15,14,12,0.62)_42%,rgba(15,14,12,0.84)_66%,#171714_100%)] sm:bg-[linear-gradient(90deg,rgba(15,14,12,0.86)_0%,rgba(15,14,12,0.55)_34%,rgba(15,14,12,0.12)_62%,rgba(15,14,12,0.05)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(180deg,rgba(15,14,12,0.55)_0%,transparent_20%,transparent_70%,#171714_100%)] sm:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_90%_at_60%_40%,transparent_45%,rgba(15,14,12,0.55)_100%)]"
      />

      <div className="container-luxe flex flex-1 flex-col justify-end pb-12 pt-36 sm:pb-20 lg:pb-24">
        <div className="animate-rise [text-shadow:0_1px_16px_rgba(15,14,12,0.8)]">
          <Eyebrow>Contemporary dining · {site.city}</Eyebrow>
        </div>
        <h1
          id="hero-title"
          className="display-xl mt-6 max-w-[13ch] animate-rise text-cream [animation-delay:140ms] [text-shadow:0_2px_40px_rgba(15,14,12,0.45)] sm:mt-8"
        >
          A table worth <em className="font-light italic text-olive-light">returning</em> to.
        </h1>
        <p className="mt-6 max-w-[34ch] animate-rise text-[1.0625rem] leading-relaxed text-cream/85 [animation-delay:280ms] sm:mt-8 sm:max-w-none sm:text-lg">
          Thoughtfully prepared. Beautifully served. Meant to be shared.
        </p>
        <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:420ms] sm:mt-11 sm:flex-row sm:gap-4">
          <ButtonLink href="/reservations" arrow>
            Reserve a Table
          </ButtonLink>
          <ButtonLink href="/menu" variant="outline">
            Explore the Menu
          </ButtonLink>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-luxe grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 text-[0.6875rem] uppercase tracking-[0.22em] text-cream/70 sm:py-5">
          <p className="hidden sm:block">Lunch &amp; dinner · Tuesday – Sunday</p>
          <a
            href="#introduction"
            className="col-start-2 flex flex-col items-center gap-3 py-1 text-cream/75 transition-colors hover:text-cream"
          >
            <span>Scroll</span>
            <span aria-hidden="true" className="relative block h-9 w-px overflow-hidden bg-cream/20">
              <span className="absolute inset-0 animate-scroll-cue bg-cream" />
            </span>
          </a>
          <p className="hidden text-right sm:block">A concept restaurant</p>
        </div>
      </div>
    </section>
  );
}
