import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { atmosphere, type SiteImage } from "@/data/images";

interface ReservationCtaProps {
  image?: SiteImage;
  title?: string;
}

export function ReservationCta({
  image = atmosphere.wineAndPlateLowLight,
  title = "Let us set a table for you.",
}: ReservationCtaProps) {
  return (
    <section
      aria-labelledby="reserve-cta-title"
      className="relative isolate overflow-hidden py-28 sm:py-36 lg:py-48"
    >
      <Image
        src={image.src}
        alt=""
        fill
        quality={60}
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[50%_65%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(107,41,46,0.55)_0%,rgba(15,14,12,0.86)_55%,rgba(15,14,12,0.94)_100%)]"
      />
      <div className="container-luxe">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Reservations</Eyebrow>
          <h2 id="reserve-cta-title" className="display-lg mt-6 text-cream">
            {title}
          </h2>
          <p className="prose-luxe mx-auto mt-6 max-w-xl text-cream/80">
            Share your preferred date and time, and our team will personally confirm your table. Requests are
            answered by phone or email — never auto-confirmed.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/reservations" arrow>
              Request a Reservation
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Private Dining Enquiries
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
