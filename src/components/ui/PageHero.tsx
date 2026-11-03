import Image from "next/image";
import type { ReactNode } from "react";

import type { SiteImage } from "@/data/images";
import { Eyebrow } from "@/components/ui/SectionIntro";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: SiteImage;
  /** CSS object-position for the background image. */
  focus?: string;
  children?: ReactNode;
}

/** Full-bleed photographic header for inner pages. */
export function PageHero({ eyebrow, title, intro, image, focus = "center", children }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[74svh] items-end overflow-hidden pb-14 pt-36 sm:pb-20 lg:min-h-[78svh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-20 animate-hero-zoom object-cover"
        style={{ objectPosition: focus }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(15,14,12,0.55)_0%,rgba(15,14,12,0.35)_35%,rgba(23,23,20,0.92)_85%,#171714_100%)]"
      />
      <div className="container-luxe">
        <div className="max-w-3xl">
          <div className="animate-rise">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="display-xl mt-6 animate-rise text-cream [animation-delay:120ms]">{title}</h1>
          {intro ? (
            <div className="prose-luxe mt-7 max-w-xl animate-rise text-cream/80 [animation-delay:240ms]">
              {intro}
            </div>
          ) : null}
          {children ? <div className="mt-9 animate-rise [animation-delay:360ms]">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
