import type { Metadata } from "next";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionIntro";
import { atmosphere } from "@/data/images";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  const image = atmosphere.emptyDiningRoom;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden py-36">
      <Image
        src={image.src}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#171714_0%,rgba(23,23,20,0.85)_45%,rgba(23,23,20,0.4)_100%)]"
      />
      <div className="container-luxe">
        <div className="max-w-2xl">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="display-xl mt-6 text-cream">
            This table <em className="font-light italic text-olive-light">isn&rsquo;t</em> set.
          </h1>
          <p className="prose-luxe mt-7 max-w-md">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let us show you back to the
            dining room.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/" arrow>
              Return Home
            </ButtonLink>
            <ButtonLink href="/menu" variant="outline">
              View the Menu
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
