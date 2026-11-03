import { dietLabels, type DietType } from "@/data/menu";

/**
 * Indian-style food designation mark: a square outline with a dot for
 * vegetarian/vegan dishes, or a triangle for non-vegetarian dishes.
 */
export function DietMark({ diet, showLabel = true }: { diet: DietType; showLabel?: boolean }) {
  const isVeg = diet !== "non-vegetarian";
  const color = isVeg ? "border-veg text-veg" : "border-nonveg text-nonveg";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className={`grid size-3.5 shrink-0 place-items-center border ${color}`}
      >
        {isVeg ? (
          <span className="size-1.5 rounded-full bg-current" />
        ) : (
          <svg viewBox="0 0 10 10" className="size-2 fill-current">
            <path d="M5 1.2 9 8.8H1z" />
          </svg>
        )}
      </span>
      {showLabel ? (
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-stone">
          {dietLabels[diet]}
        </span>
      ) : (
        <span className="sr-only">{dietLabels[diet]}</span>
      )}
    </span>
  );
}
