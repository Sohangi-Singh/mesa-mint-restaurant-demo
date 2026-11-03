/**
 * Restaurant-level content. Everything here is fictional demonstration
 * content — swap these values when adapting the site for a real client.
 */

export const site = {
  name: "MESA & MINT",
  shortName: "Mesa & Mint",
  tagline: "A table worth returning to.",
  description:
    "MESA & MINT is a fictional contemporary restaurant and cafe concept set in Bengaluru — thoughtfully prepared food, beautifully served, and meant to be shared.",
  city: "Bengaluru",
  region: "Karnataka, India",
  cuisine: ["Contemporary", "Modern Indian", "Mediterranean-inspired"],
  priceRange: "₹₹₹",
  conceptNotice:
    "MESA & MINT is a fictional restaurant concept created as a portfolio demonstration. Menu items, prices, opening hours and location details are illustrative and do not describe a real business.",
  photographyNotice:
    "Photography sourced from Unsplash and used under the Unsplash License.",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/our-story" },
  { label: "Reservations", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

export interface ServicePeriod {
  label: string;
  /** 24-hour "HH:mm" */
  opens: string;
  closes: string;
}

export interface OpeningDay {
  days: string;
  periods: ServicePeriod[];
}

export const openingHours: OpeningDay[] = [
  { days: "Monday", periods: [] },
  {
    days: "Tuesday – Sunday",
    periods: [
      { label: "Lunch", opens: "12:30", closes: "15:00" },
      { label: "Dinner", opens: "19:00", closes: "23:30" },
    ],
  },
];

/**
 * Placeholder contact details. These deliberately use a reserved `.example`
 * domain and a zeroed phone number so they can never reach a real person.
 */
export const contactPlaceholders = {
  email: "hello@mesaandmint.example",
  phone: "+91 00000 00000",
  social: ["Instagram", "Facebook", "LinkedIn"],
} as const;

/** Clearly fictional location copy — no real street address is invented. */
export const conceptLocation = {
  label: "Concept location",
  area: "Central Bengaluru",
  lines: [
    "A fictional neighbourhood dining room",
    "Bengaluru, Karnataka, India",
  ],
  note: "No physical address exists — this location is illustrative only.",
} as const;
