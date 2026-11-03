/**
 * An abstract, hand-drawn style map. It intentionally shows no real streets or
 * coordinates — MESA & MINT is a fictional venue with no physical address.
 */
export function ConceptMap() {
  return (
    <figure className="border border-line bg-umber">
      <svg
        viewBox="0 0 640 440"
        role="img"
        aria-labelledby="concept-map-title concept-map-desc"
        className="block h-auto w-full"
      >
        <title id="concept-map-title">Illustrative concept map</title>
        <desc id="concept-map-desc">
          An abstract, stylised city map marking the fictional MESA &amp; MINT concept location in central
          Bengaluru. It does not depict a real street or address.
        </desc>

        <defs>
          <pattern id="concept-map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="var(--mm-line)" strokeOpacity="0.35" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="640" height="440" fill="url(#concept-map-grid)" />

        {/* Lake and park forms */}
        <path
          d="M462 64c38-10 86 4 104 38 17 32-6 66-44 76-36 9-78-2-94-30-16-30 0-76 34-84Z"
          fill="var(--mm-olive)"
          fillOpacity="0.12"
          stroke="var(--mm-olive)"
          strokeOpacity="0.45"
        />
        <path
          d="M70 300c30-22 92-26 118 2 24 26 8 70-30 82-40 12-92 0-104-30-8-22 0-40 16-54Z"
          fill="var(--mm-olive)"
          fillOpacity="0.08"
          stroke="var(--mm-olive)"
          strokeOpacity="0.3"
          strokeDasharray="3 4"
        />

        {/* Main avenues */}
        <g fill="none" stroke="var(--mm-stone)" strokeOpacity="0.45" strokeLinecap="round">
          <path d="M-10 236C120 220 240 214 336 226s220 32 320 18" strokeWidth="3" />
          <path d="M300 -10c10 90 24 160 36 236 12 80 4 150-14 224" strokeWidth="3" />
          <path d="M40 -10c60 110 150 190 296 236" strokeWidth="1.5" />
          <path d="M650 120c-100 30-200 66-314 106" strokeWidth="1.5" />
        </g>
        <g fill="none" stroke="var(--mm-stone)" strokeOpacity="0.22" strokeLinecap="round" strokeWidth="1">
          <path d="M-10 120c140 6 270 0 380-12" />
          <path d="M-10 360c160-10 330-4 660 8" />
          <path d="M180 -10c-6 150 4 300 18 460" />
          <path d="M460 230c6 70 10 140 2 220" />
          <path d="M540 -10c-14 90-10 170 4 250" />
          <path d="M80 160c90 20 170 50 230 60" />
        </g>

        {/* Marker */}
        <g transform="translate(336 226)">
          <circle r="26" fill="var(--mm-burgundy)" fillOpacity="0.18" className="[transform-box:fill-box] [transform-origin:center] motion-safe:animate-ping" />
          <circle r="14" fill="var(--mm-burgundy)" fillOpacity="0.35" />
          <circle r="6" fill="var(--mm-cream)" />
        </g>

        <g fontFamily="var(--font-display)" fill="var(--mm-cream)">
          <text x="360" y="208" fontSize="22">
            MESA &amp; MINT
          </text>
          <text x="361" y="228" fontSize="13" fontStyle="italic" fill="var(--mm-olive-light)">
            Concept location
          </text>
        </g>
        <text
          x="24"
          y="420"
          fontFamily="var(--font-sans)"
          fontSize="10"
          letterSpacing="2"
          fill="var(--mm-stone)"
          fillOpacity="0.8"
        >
          ILLUSTRATIVE MAP · NOT TO SCALE · NO REAL ADDRESS
        </text>
      </svg>
    </figure>
  );
}
