import { openingHours } from "@/data/site";
import { formatTime12h } from "@/lib/format";

/** Opening hours as a definition list. Hours are illustrative concept content. */
export function HoursList({ compact = false }: { compact?: boolean }) {
  return (
    <dl className={compact ? "space-y-4" : "divide-y divide-line border-y border-line"}>
      {openingHours.map((day) => (
        <div
          key={day.days}
          className={compact ? "" : "grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6"}
        >
          <dt className={compact ? "text-sm text-cream" : "font-display text-2xl text-cream"}>{day.days}</dt>
          <dd className="text-sm leading-relaxed text-stone">
            {day.periods.length === 0 ? (
              "Closed"
            ) : (
              <ul className={compact ? "" : "space-y-1"}>
                {day.periods.map((period) => (
                  <li key={period.label}>
                    <span className={compact ? "" : "inline-block w-16 text-olive-light"}>{period.label}</span>{" "}
                    {formatTime12h(period.opens)} – {formatTime12h(period.closes)}
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
