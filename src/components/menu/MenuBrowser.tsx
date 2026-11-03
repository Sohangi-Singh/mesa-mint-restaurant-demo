"use client";

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { MenuItemRow } from "@/components/menu/MenuItemRow";
import { DietMark } from "@/components/ui/DietMark";
import { isVegetarian, menuCategories, menuItems, type MenuCategoryId } from "@/data/menu";

type Filter = "all" | MenuCategoryId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...menuCategories.map((category) => ({ id: category.id, label: category.label })),
];

const numerals = ["I", "II", "III", "IV", "V", "VI"];

export function MenuBrowser() {
  const [active, setActive] = useState<Filter>("all");
  const [vegOnly, setVegOnly] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const switchLabelId = useId();

  const sections = useMemo(
    () =>
      menuCategories
        .filter((category) => active === "all" || category.id === active)
        .map((category) => ({
          category,
          numeral: numerals[menuCategories.indexOf(category)],
          items: menuItems.filter((item) => item.category === category.id && (!vegOnly || isVegetarian(item))),
        }))
        .filter((section) => section.items.length > 0),
    [active, vegOnly],
  );

  // Arriving from a signature dish link (/menu#dish-id): briefly highlight that dish.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const dish = id ? document.getElementById(id) : null;
    if (!dish || dish.tagName !== "ARTICLE") return;
    dish.dataset.highlight = "true";
    const timer = window.setTimeout(() => delete dish.dataset.highlight, 2600);
    return () => window.clearTimeout(timer);
  }, []);

  const total = sections.reduce((sum, section) => sum + section.items.length, 0);
  const activeLabel = filters.find((filter) => filter.id === active)?.label ?? "All";

  // Keep the start of the list in view after changing filters further down the page.
  function scrollListIntoView() {
    const list = listRef.current;
    if (!list) return;
    const filterBarOffset = 150;
    if (list.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: window.scrollY + list.getBoundingClientRect().top - filterBarOffset });
    }
  }

  function selectFilter(filter: Filter) {
    setActive(filter);
    scrollListIntoView();
  }

  function toggleVeg() {
    setVegOnly((value) => !value);
    scrollListIntoView();
  }

  return (
    // Motion is only loaded on this page: just the DOM feature set, honouring reduced motion.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="sticky top-[var(--mm-header-h)] z-30 border-y border-line bg-charcoal">
          <div className="container-luxe flex flex-col gap-1 py-2 md:flex-row md:items-center md:justify-between md:gap-8 md:py-0">
            <div
              role="group"
              aria-label="Filter menu by category"
              className="-mx-5 flex overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {filters.map((filter) => {
                const selected = filter.id === active;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => selectFilter(filter.id)}
                    className={`group/filter relative flex min-h-11 shrink-0 items-center whitespace-nowrap px-4 text-[0.71875rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 first:pl-0 md:min-h-16 ${
                      selected ? "text-cream" : "text-stone hover:text-cream"
                    }`}
                  >
                    {filter.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-1.5 left-4 right-4 h-px origin-left bg-olive-light transition-transform duration-500 ease-luxe group-first/filter:left-0 md:bottom-4 ${
                        selected ? "scale-x-100" : "scale-x-0 group-hover/filter:scale-x-50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-6 md:justify-end">
              <p aria-live="polite" className="text-xs tabular-nums text-stone">
                {total} {total === 1 ? "dish" : "dishes"}
                <span className="sr-only">
                  {" "}
                  shown in {activeLabel}
                  {vegOnly ? ", vegetarian only" : ""}
                </span>
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={vegOnly}
                aria-labelledby={switchLabelId}
                onClick={toggleVeg}
                className="group flex min-h-11 items-center gap-3"
              >
                <span
                  id={switchLabelId}
                  className="text-[0.71875rem] font-semibold uppercase tracking-[0.2em] text-cream"
                >
                  Vegetarian only
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-11 border transition-colors duration-300 ${
                    vegOnly ? "border-veg bg-veg/25" : "border-line bg-transparent group-hover:border-stone"
                  }`}
                >
                  <span
                    className={`absolute top-1 size-3.5 transition-[left,background-color] duration-300 ease-luxe ${
                      vegOnly ? "left-[1.4rem] bg-veg" : "left-1 bg-stone"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div ref={listRef} className="container-luxe">
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line py-4 text-xs text-stone">
            <span className="flex items-center gap-2">
              <DietMark diet="vegetarian" showLabel={false} /> Vegetarian &amp; vegan
            </span>
            <span className="flex items-center gap-2">
              <DietMark diet="non-vegetarian" showLabel={false} /> Non-vegetarian
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="text-olive-light">
                ✦
              </span>{" "}
              Signature dish
            </span>
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={`${active}-${vegOnly}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {sections.length === 0 ? (
                <p className="py-24 text-center text-stone">No dishes match these filters.</p>
              ) : (
                sections.map(({ category, numeral, items }) => (
                  <section
                    key={category.id}
                    id={category.id}
                    aria-labelledby={`${category.id}-title`}
                    className="grid scroll-mt-44 gap-8 border-b border-line py-14 last:border-b-0 lg:grid-cols-12 lg:gap-10 lg:py-24"
                  >
                    <header className="lg:col-span-4">
                      <div className="lg:sticky lg:top-[calc(var(--mm-header-h)+6.5rem)]">
                        <p
                          aria-hidden="true"
                          className="font-display text-5xl font-light italic leading-none text-olive-light lg:text-6xl"
                        >
                          {numeral}
                        </p>
                        <h2 id={`${category.id}-title`} className="display-md mt-4 text-cream">
                          {category.label}
                        </h2>
                        <p className="mt-3 max-w-xs font-display text-xl italic leading-snug text-cream/75">
                          {category.description}
                        </p>
                        <p className="mt-5 text-[0.71875rem] font-semibold uppercase tracking-[0.2em] text-stone">
                          {items.length} {items.length === 1 ? "dish" : "dishes"}
                        </p>
                      </div>
                    </header>
                    <div className="border-t border-line lg:col-span-8">
                      {items.map((item) => (
                        <MenuItemRow key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                ))
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
