# MESA & MINT

> *A table worth returning to.*

A complete, production-quality website for **MESA & MINT** — a **fictional** premium contemporary restaurant and cafe concept set in Bengaluru, India. It is built as a portfolio demonstration for independent restaurants, cafes, fine-dining rooms, bistros and cloud kitchens, and as a reusable foundation for real client sites.

> **This is a concept.** MESA & MINT does not exist. The menu, prices, hours, location and copy are illustrative; no real customers, reviews, chefs, awards or press are claimed. The site says so in its footer, on the menu, reservations, story and contact pages, and in its structured data.

---

## Contents

- [What's included](#whats-included)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Reservation email configuration](#reservation-email-configuration)
- [Deploying to Vercel](#deploying-to-vercel)
- [Project structure](#project-structure)
- [Image attribution](#image-attribution)
- [Demo limitations](#demo-limitations)
- [Customisation guide for client projects](#customisation-guide-for-client-projects)

---

## What's included

| Route | Highlights |
| --- | --- |
| `/` | Cinematic hero, philosophy introduction, four signature dishes in an asymmetric editorial layout, the experience, our philosophy, featured menu by course, bar feature, reservation call to action, location & hours |
| `/menu` | 21 illustrative dishes across Small Plates, Main Course, Desserts and Beverages; accessible category filters, a vegetarian-only switch, Indian veg/non-veg marks, allergens and dietary labels, animated transitions |
| `/reservations` | A guided three-step reservation **request**: one-tap dates for the next open days (plus a calendar), time slots that disable when too soon or on closed days, guest and occasion chips, a live summary, client- and server-side validation, honeypot, rate limiting, loading/success/error states and an honest "not configured" mode |
| `/our-story` | Editorial page covering philosophy, culinary approach, ingredients & sourcing and the dining experience |
| `/contact` | Enquiry form (server-processed, honest states), configurable WhatsApp call to action, clearly labelled illustrative map |
| 404 | Branded "This table isn't set" page |

Also: page-specific metadata, Open Graph and Twitter images, `sitemap.xml`, `robots.txt`, truthful `Restaurant` JSON-LD, SVG favicon and Apple touch icon, skip link, keyboard-accessible mobile navigation with focus trapping, `prefers-reduced-motion` support and security headers.

### Design system

- **Palette** (CSS variables in `src/app/globals.css`, exposed to Tailwind via `@theme`): charcoal `#171714`, umber `#24221F`, burgundy `#6B292E`, olive `#85866B`, cream `#F5F0E7`, stone `#B7B1A7`, line `#49443D`.
- **Type**: Cormorant Garamond (display) and Manrope (body) via `next/font`.
- **Language**: hairline borders, numbered editorial sections, underline-style form controls, square (not rounded) shapes, a fine film-grain overlay and restrained motion.

---

## Technology stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components, Partial Prefetching) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4.3 with CSS-variable design tokens |
| Animation | Motion for React 14 for the menu filter transitions only (`LazyMotion` + `domAnimation`, loaded on `/menu`); scroll reveals, the hero and the mobile menu use CSS transitions |
| Icons | Lucide React |
| Forms | React Hook Form + Zod 4 (one shared schema validates in the browser and on the server) |
| Email | Resend (server-side only) |
| Images | `next/image` with locally stored, pre-optimised JPEGs, AVIF/WebP delivery and blur placeholders |

Server components are the default; only the header, menu filters, forms and a tiny reveal helper are client components. Scroll reveals never hide content without JavaScript or for visitors who prefer reduced motion.

---

## Getting started

**Requirements:** Node.js 20.9 or newer, npm.

```bash
npm install
cp .env.example .env.local   # optional — the site runs without email configured
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript, no emit |
| `npm run images` | Download and optimise the photography listed in `scripts/image-manifest.json` (`-- --force` re-encodes from the local cache, `-- --refetch` re-downloads) |
| `npm run brand-assets` | Regenerate `opengraph-image.jpg` and `apple-icon.png` |

The optimised images are committed in `src/assets/images`, so `npm run images` is only needed when you change the photography.

---

## Environment variables

Copy `.env.example` to `.env.local`. **Never commit `.env.local`** — it is git-ignored.

| Variable | Required | Scope | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public | Canonical origin for metadata, sitemap and JSON-LD. Falls back to Vercel's production domain, then `http://localhost:3000`. |
| `RESEND_API_KEY` | For email | **Server only** | Resend API key. |
| `RESERVATION_FROM_EMAIL` | For email | Server only | Sender on a Resend-verified domain, e.g. `MESA & MINT <reservations@your-domain.com>`. |
| `RESERVATION_TO_EMAIL` | For email | Server only | Inbox that receives reservation requests. |
| `CONTACT_TO_EMAIL` | Optional | Server only | Inbox for contact enquiries; defaults to `RESERVATION_TO_EMAIL`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Public | Digits only with country code (e.g. `919876543210`). When unset or implausible, the contact page shows a "not yet available" card instead of a link. |

Pages are prerendered, so the "not configured" notices on the forms reflect the environment **at build time**. The API routes always read the live environment, so they never claim success without delivering an email.

---

## Reservation email configuration

The reservation form submits a **request**, never a confirmed booking. There is no live availability and no booking calendar.

1. Create an account at [resend.com](https://resend.com) and an API key.
2. Verify your sending domain in Resend (DNS records). For a quick test you can use the sandbox sender `onboarding@resend.dev`, which can only deliver to the email address on your Resend account.
3. Set `RESEND_API_KEY`, `RESERVATION_FROM_EMAIL` and `RESERVATION_TO_EMAIL` (and optionally `CONTACT_TO_EMAIL`).
4. Restart the dev server, or redeploy.

**How a request flows** (`src/app/api/reservations/route.ts`):

1. A best-effort, per-instance rate limit (8 requests / 10 minutes / IP).
2. JSON is read with a 16 KB size limit and content-type check.
3. Honeypot field `website` must be empty.
4. The shared Zod schema (`src/lib/validation/reservation.ts`) validates and sanitises every field: name, email and phone format; date not in the past, not a Monday (closed) and at most 60 days ahead, all judged in **Asia/Kolkata** time; time from the listed lunch or dinner slots and at least 90 minutes ahead for same-day requests; 1–8 guests; a known occasion; requests of up to 500 characters with control characters stripped.
5. If email is not configured, the API returns `503 NOT_CONFIGURED` and the form tells the visitor plainly that **their request was not sent**.
6. Otherwise an HTML and plain-text notification (all values HTML-escaped) is sent to the restaurant with `reply-to` set to the guest.
7. Only after Resend confirms delivery does the visitor see:
   > Your reservation request has been received. Our team will contact you to confirm your table.

   A provider failure returns `502` and a "not received — please try again" message. Network failures are handled in the browser the same way.

The contact form (`src/app/api/contact/route.ts`) follows the same pipeline.

---

## Deploying to Vercel

1. Push the project to a Git repository (GitHub, GitLab or Bitbucket).
2. In Vercel choose **Add New → Project** and import the repository. The Next.js preset needs no changes.
3. Under **Settings → Environment Variables** add the variables above for Production (and Preview if wanted). Set `NEXT_PUBLIC_SITE_URL` to your final domain.
4. Deploy. After changing environment variables, redeploy so the prerendered pages pick them up.
5. Optional: add a custom domain, and replace the in-memory rate limiter with a shared store (for example Upstash Redis) if you expect abuse — serverless instances do not share memory.

---

## Project structure

```
src/
  app/                    Routes, metadata files, API route handlers
    api/reservations/     Reservation request endpoint
    api/contact/          Contact enquiry endpoint
    menu/ reservations/ our-story/ contact/
    layout.tsx            Fonts, metadata, header/footer, motion provider
    template.tsx          Subtle CSS route fade
    not-found.tsx         404 page
    sitemap.ts robots.ts  SEO routes
    opengraph-image.jpg   Generated share image (npm run brand-assets)
  assets/images/          Optimised photography (npm run images)
  components/
    home/                 Homepage sections
    menu/                 Menu filters and item rows
    forms/                Form controls, reservation and contact forms
    contact/              WhatsApp card, illustrative map
    sections/             Shared sections (reservation CTA, hours, location)
    layout/               Header, footer, wordmark
    ui/                   Buttons, headings, reveal animations, diet marks, notices
  data/                   Restaurant content: site.ts, menu.ts, images.ts
  lib/                    Validation, reservation rules, email, formatting, metadata
scripts/
  image-manifest.json     Photo sources and credits
  fetch-images.mjs        Download + optimise photography
  generate-brand-assets.mjs
```

---

## Image attribution

All photography is from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license), which permits free commercial and non-commercial use without required attribution. Credit is given here with thanks. Only images marked *Free* on Unsplash were used — none from Unsplash+.

Each dish photograph represents exactly one menu item. Food and drink photos receive a shared, gentle house grade in `scripts/fetch-images.mjs` (slightly warmer, softer whites, with extra lift-down for photos shot on bright white surfaces) so that work by different photographers reads as one cohesive set; framing focal points live in `src/data/images.ts`. Dishes were named and described to match their photographs; the photos are of real dishes and spaces by the credited photographers and are **not** of MESA & MINT, which does not exist. People appear only incidentally — hands, partial or distant figures — and no one is presented as MESA & MINT staff or guests.

| File | Photographer | Source |
| --- | --- | --- |
| `interior-pendant-lights.jpg` | Takahiro Taguchi | [unsplash.com/photos/lighted-lamps-in-room-8l_RuuZrOyY](https://unsplash.com/photos/lighted-lamps-in-room-8l_RuuZrOyY) |
| `table-low-light.jpg` | Alexandr Popadin | [unsplash.com/photos/a-dimly-lit-restaurant-table-setting-with-place-settings-DtfzqdgC7AQ](https://unsplash.com/photos/a-dimly-lit-restaurant-table-setting-with-place-settings-DtfzqdgC7AQ) |
| `table-lamp-glasses.jpg` | Jivan Garcha | [unsplash.com/photos/two-empty-wine-glasses-on-a-table-in-a-restaurant-Eq82Au8Gwrc](https://unsplash.com/photos/two-empty-wine-glasses-on-a-table-in-a-restaurant-Eq82Au8Gwrc) |
| `dining-room-hanging-lights.jpg` | Eirc Shi | [unsplash.com/photos/modern-restaurant-interior-with-hanging-lights-knvnCoc5qH4](https://unsplash.com/photos/modern-restaurant-interior-with-hanging-lights-knvnCoc5qH4) |
| `chef-garnish-greens.jpg` | Alfonso Betancourt | [unsplash.com/photos/chef-garnishing-a-small-dish-with-fresh-greens-Bq44jpoeFf4](https://unsplash.com/photos/chef-garnishing-a-small-dish-with-fresh-greens-Bq44jpoeFf4) |
| `wine-and-plate-low-light.jpg` | Tommaso Ubezio | [unsplash.com/photos/elegant-plate-of-food-with-a-glass-of-wine-Upz2cj1Y-qM](https://unsplash.com/photos/elegant-plate-of-food-with-a-glass-of-wine-Upz2cj1Y-qM) |
| `dimly-lit-dining-room.jpg` | Oliver Guhr | [unsplash.com/photos/a-dimly-lit-restaurant-with-tables-and-chairs-EjHiN2KxTO4](https://unsplash.com/photos/a-dimly-lit-restaurant-with-tables-and-chairs-EjHiN2KxTO4) |
| `amber-lights-dining-room.jpg` | Dmitry Spravko | [unsplash.com/photos/a-restaurant-with-a-bunch-of-lights-hanging-from-the-ceiling-wrW1mQTja7w](https://unsplash.com/photos/a-restaurant-with-a-bunch-of-lights-hanging-from-the-ceiling-wrW1mQTja7w) |
| `sauce-pour.jpg` | Urban Gyllström | [unsplash.com/photos/chef-pouring-sauce-over-plated-steak-MaWMfm-HCqQ](https://unsplash.com/photos/chef-pouring-sauce-over-plated-steak-MaWMfm-HCqQ) |
| `chef-tweezers-herbs.jpg` | Alfonso Betancourt | [unsplash.com/photos/chef-meticulously-garnishes-a-gourmet-dish-with-fresh-herbs-u3OOrE2jeHg](https://unsplash.com/photos/chef-meticulously-garnishes-a-gourmet-dish-with-fresh-herbs-u3OOrE2jeHg) |
| `spices-curry-leaves.jpg` | Anju Ravindranath | [unsplash.com/photos/a-table-topped-with-different-types-of-spices-Nihdo084Yos](https://unsplash.com/photos/a-table-topped-with-different-types-of-spices-Nihdo084Yos) |
| `fresh-mint.jpg` | Simon Lee | [unsplash.com/photos/green-mint-leaves-texture-bHWRSq8fUUE](https://unsplash.com/photos/green-mint-leaves-texture-bHWRSq8fUUE) |
| `white-linen-dining.jpg` | Tanja Tepavac | [unsplash.com/photos/elegant-dining-tables-set-in-a-cozy-restaurant-interior-jSH-7IjJVsQ](https://unsplash.com/photos/elegant-dining-tables-set-in-a-cozy-restaurant-interior-jSH-7IjJVsQ) |
| `shared-table-wine.jpg` | Kamilla Isalieva | [unsplash.com/photos/a-table-is-set-with-wine-glasses-and-plates-of-food-JDjarj_oSyo](https://unsplash.com/photos/a-table-is-set-with-wine-glasses-and-plates-of-food-JDjarj_oSyo) |
| `table-glasses-linen.jpg` | Julie Mallet | [unsplash.com/photos/restaurant-table-set-with-wine-glasses-and-cutlery-qKfSyHj1Y20](https://unsplash.com/photos/restaurant-table-set-with-wine-glasses-and-cutlery-qKfSyHj1Y20) |
| `round-table-alcove.jpg` | Decima Athens | [unsplash.com/photos/a-restaurant-with-a-round-table-and-chairs-PisnUZWdsms](https://unsplash.com/photos/a-restaurant-with-a-round-table-and-chairs-PisnUZWdsms) |
| `empty-dining-room.jpg` | Justin Smith | [unsplash.com/photos/a-dimly-lit-room-with-tables-and-chairs-Mxy87tWuMVE](https://unsplash.com/photos/a-dimly-lit-room-with-tables-and-chairs-Mxy87tWuMVE) |
| `bartender-pour.jpg` | Hybrid Storytellers | [unsplash.com/photos/bartender-pouring-amber-liquid-into-a-glass-with-ice-x07Im_cq6tY](https://unsplash.com/photos/bartender-pouring-amber-liquid-into-a-glass-with-ice-x07Im_cq6tY) |
| `cocktail-trio.jpg` | Mediha Ekici | [unsplash.com/photos/three-colorful-cocktails-arranged-on-a-dark-reflective-surface-RQIq-yBMPAA](https://unsplash.com/photos/three-colorful-cocktails-arranged-on-a-dark-reflective-surface-RQIq-yBMPAA) |
| `dish-burrata.jpg` | Pinar Kucuk | [unsplash.com/photos/cooked-food-on-brown-plate-rq0GMrnLj8c](https://unsplash.com/photos/cooked-food-on-brown-plate-rq0GMrnLj8c) |
| `dish-kingfish-crudo.jpg` | Harrison Chang | [unsplash.com/photos/fish-appetizer-with-green-topping-and-oil-dAUQZiUMGW0](https://unsplash.com/photos/fish-appetizer-with-green-topping-and-oil-dAUQZiUMGW0) |
| `dish-tiger-prawns.jpg` | Vino Li | [unsplash.com/photos/cooked-shrimp-with-sliced-of-lime-and-basil-TqOEGdRNowY](https://unsplash.com/photos/cooked-shrimp-with-sliced-of-lime-and-basil-TqOEGdRNowY) |
| `dish-heirloom-carrots.jpg` | Adam Jaime | [unsplash.com/photos/vegetable-dish-on-white-plate-oFljzK61O1s](https://unsplash.com/photos/vegetable-dish-on-white-plate-oFljzK61O1s) |
| `dish-beetroot-tartare.jpg` | Anto Meneghini | [unsplash.com/photos/a-small-white-bowl-filled-with-food-on-top-of-a-wooden-tray-HDa6FZBsOEg](https://unsplash.com/photos/a-small-white-bowl-filled-with-food-on-top-of-a-wooden-tray-HDa6FZBsOEg) |
| `dish-tandoor-paneer.jpg` | Viktor Forgacs | [unsplash.com/photos/cooked-foods-WmKXu-bzygo](https://unsplash.com/photos/cooked-foods-WmKXu-bzygo) |
| `dish-lamb-chops.jpg` | Jonathan Borba | [unsplash.com/photos/a-wooden-plate-topped-with-meat-next-to-a-bowl-of-sauce-pJ5LO8OWDF8](https://unsplash.com/photos/a-wooden-plate-topped-with-meat-next-to-a-bowl-of-sauce-pJ5LO8OWDF8) |
| `dish-lobster-morels.jpg` | Trình Minh Thư | [unsplash.com/photos/cooked-food-on-black-round-plate-a6kYPun9_ao](https://unsplash.com/photos/cooked-food-on-black-round-plate-a6kYPun9_ao) |
| `dish-seabass.jpg` | Jessica Hearn | [unsplash.com/photos/a-plate-of-food-2LXuRH4JCEM](https://unsplash.com/photos/a-plate-of-food-2LXuRH4JCEM) |
| `dish-ghee-roast-chicken.jpg` | Nathan Dumlao | [unsplash.com/photos/cooked-meat-on-white-ceramic-plate-Xt4yZUIpRTo](https://unsplash.com/photos/cooked-meat-on-white-ceramic-plate-Xt4yZUIpRTo) |
| `dish-tagliatelle.jpg` | Jean-claude Attipoe | [unsplash.com/photos/pasta-dish-on-black-ceramic-plate--sbE6MDlEuM](https://unsplash.com/photos/pasta-dish-on-black-ceramic-plate--sbE6MDlEuM) |
| `dish-roast-cauliflower.jpg` | Alexandra Tran | [unsplash.com/photos/brown-and-white-food-on-blue-ceramic-plate-zv9UJYF209M](https://unsplash.com/photos/brown-and-white-food-on-blue-ceramic-plate-zv9UJYF209M) |
| `dish-mushroom-risotto.jpg` | Max Griss | [unsplash.com/photos/cooked-rice-with-green-vegetable-on-white-round-plate-D9fAmtjC284](https://unsplash.com/photos/cooked-rice-with-green-vegetable-on-white-round-plate-D9fAmtjC284) |
| `dish-poached-pear.jpg` | Madeline Liu | [unsplash.com/photos/gourmet-dessert-with-caramel-sauce-and-edible-flowers-gvar4yxpBWk](https://unsplash.com/photos/gourmet-dessert-with-caramel-sauce-and-edible-flowers-gvar4yxpBWk) |
| `dish-chocolate-tart.jpg` | Razvan Mirel | [unsplash.com/photos/brown-cake-on-white-ceramic-plate-ufK6dVE4KHA](https://unsplash.com/photos/brown-cake-on-white-ceramic-plate-ufK6dVE4KHA) |
| `dish-coffee-tiramisu.jpg` | Taylor Heery | [unsplash.com/photos/a-piece-of-cake-sitting-on-top-of-a-white-plate-_Bs62oh7x5Q](https://unsplash.com/photos/a-piece-of-cake-sitting-on-top-of-a-white-plate-_Bs62oh7x5Q) |
| `dish-rose-panna-cotta.jpg` | Mantra Media | [unsplash.com/photos/desert-with-red-berries-on-plate-W7b8Sqb7PG8](https://unsplash.com/photos/desert-with-red-berries-on-plate-W7b8Sqb7PG8) |
| `drink-mint-cooler.jpg` | Paige Ledford | [unsplash.com/photos/clear-drinking-glass-with-pink-liquid-and-lemon-1Di03LTniYE](https://unsplash.com/photos/clear-drinking-glass-with-pink-liquid-and-lemon-1Di03LTniYE) |
| `drink-passionfruit-sour.jpg` | Natalia Marcelewicz | [unsplash.com/photos/a-couple-of-glasses-that-are-sitting-on-a-table-IKFEtXukVy8](https://unsplash.com/photos/a-couple-of-glasses-that-are-sitting-on-a-table-IKFEtXukVy8) |
| `drink-jaggery-old-fashioned.jpg` | Milan Trninic | [unsplash.com/photos/cocktail-with-orange-peel-on-a-bar-counter-IHvtgDaeJvo](https://unsplash.com/photos/cocktail-with-orange-peel-on-a-bar-counter-IHvtgDaeJvo) |
| `drink-masala-chai.jpg` | Amir Shrestha | [unsplash.com/photos/a-glass-of-liquid-on-a-table-Ke0BiErDX_Y](https://unsplash.com/photos/a-glass-of-liquid-on-a-table-Ke0BiErDX_Y) |

Sources and credits live in `scripts/image-manifest.json`; update it when swapping images, then run `npm run images`.

---

## Demo limitations

- **Fictional business.** No real address, phone number, email inbox or social accounts exist. Contact details use a reserved `.example` domain and a zeroed number, and are labelled as placeholders.
- **Reservations are requests.** There is no availability engine, table management or booking calendar, and the site never auto-confirms a booking.
- **Email delivery was not tested end to end.** No Resend credentials were available during development. The not-configured, validation, network-failure, delivery-failure and success paths were exercised in the browser — the last two with mocked API responses.
- **Rate limiting is per instance** and in memory, so it is a speed bump rather than a guarantee on serverless hosting.
- **No CMS.** Content is edited in typed TypeScript files (see below).
- **Allergen information is illustrative** and must be replaced with verified kitchen data for any real menu.
- **Map is illustrative.** It is an abstract SVG, not a map embed.

---

## Customisation guide for client projects

| To change | Edit |
| --- | --- |
| Name, tagline, description, cuisine, disclaimer | `src/data/site.ts` |
| Navigation, opening hours, placeholder contacts, location copy | `src/data/site.ts` |
| Menu items, categories, prices, diets, allergens, signature and featured dishes | `src/data/menu.ts` |
| Photography, alt text and crops | Add files to `scripts/image-manifest.json` (optional `brightness` for bright food shots) → `npm run images` → map them in `src/data/images.ts` with an optional `position` focal point |
| Colours, spacing utilities, type scale, animation keyframes | `src/app/globals.css` (tokens on `:root`, mapped in `@theme inline`) |
| Fonts | `src/app/layout.tsx` (`next/font/google`) |
| Reservation rules (time slots, closed days, party size, booking window, same-day notice) | `src/lib/reservation-rules.ts` |
| Form fields and validation messages | `src/lib/validation/*.ts` and `src/components/forms/*` |
| Notification email layout | `src/lib/email.ts` |
| Page copy | Section components in `src/components/home/*` and the route files in `src/app/*/page.tsx` |
| Share image and icons | `src/app/icon.svg`, then `npm run brand-assets` |
| Structured data | `RestaurantJsonLd` in `src/app/page.tsx` — for a real venue, add `address`, `telephone`, `openingHoursSpecification` and `geo` only once they are verified |

**For a real restaurant, remember to:** remove the concept disclaimers (`site.conceptNotice`, `ConceptNote` usages and the footer note), replace the placeholder contact details and social links, replace the illustrative map with a real embed or directions link, confirm allergen and pricing data (including tax and service notes) with the kitchen, and connect a verified email domain.
