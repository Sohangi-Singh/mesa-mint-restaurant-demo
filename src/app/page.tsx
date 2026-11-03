import type { Metadata } from "next";

import { Experience } from "@/components/home/Experience";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Philosophy } from "@/components/home/Philosophy";
import { SignatureDishes } from "@/components/home/SignatureDishes";
import { LocationHours } from "@/components/sections/LocationHours";
import { ReservationCta } from "@/components/sections/ReservationCta";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

/**
 * Structured data limited to truthful concept information: no street address,
 * telephone number or opening hours are published for this fictional venue.
 */
function RestaurantJsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    slogan: site.tagline,
    description: `${site.description} This is a fictional concept used as a portfolio demonstration, not an operating business.`,
    url: url.href,
    image: new URL("/opengraph-image.jpg", url).href,
    servesCuisine: site.cuisine,
    priceRange: site.priceRange,
    hasMenu: new URL("/menu", url).href,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <RestaurantJsonLd />
      <Hero />
      <Introduction />
      <SignatureDishes />
      <Experience />
      <Philosophy />
      <FeaturedMenu />
      <ReservationCta />
      <LocationHours />
    </>
  );
}
