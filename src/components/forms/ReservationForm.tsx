"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";

import {
  ChoiceChip,
  Field,
  FieldMessage,
  HoneypotField,
  controlClasses,
  describedBy,
  labelClasses,
} from "@/components/forms/fields";
import { FormAlert } from "@/components/forms/FormAlert";
import { ButtonArrow, buttonClasses } from "@/components/ui/Button";
import { formatDateParts, formatLongDate, formatTime12h } from "@/lib/format";
import {
  CLOSED_WEEKDAYS,
  MAX_DAYS_AHEAD,
  MAX_GUESTS,
  SAME_DAY_NOTICE_MINUTES,
  addDays,
  allTimeSlots,
  nowInRestaurantZone,
  occasions,
  slotToMinutes,
  timeSlotGroups,
  weekdayOf,
} from "@/lib/reservation-rules";
import { submitForm } from "@/lib/submit-form";
import {
  SPECIAL_REQUESTS_MAX,
  createReservationSchema,
  type ReservationFormValues,
  type ReservationRequest,
} from "@/lib/validation/reservation";

const defaultValues: ReservationFormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  occasion: "",
  specialRequests: "",
  consent: false,
  website: "",
};

const QUICK_DATE_COUNT = 6;

// Rebuild the schema on every validation so "today" and "now" are always current.
const resolver: Resolver<ReservationFormValues, unknown, ReservationRequest> = (values, context, options) =>
  zodResolver(createReservationSchema())(values, context, options);

/**
 * The current date and minute in Bengaluru, refreshed every 30 seconds. It is
 * only known in the browser (the server snapshot is null), so date-dependent
 * UI never causes a hydration mismatch.
 */
function subscribeToClock(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

function useRestaurantClock(): { date: string; minutes: number } | null {
  const snapshot = useSyncExternalStore(
    subscribeToClock,
    () => {
      const now = nowInRestaurantZone();
      return `${now.date}|${now.minutes}`;
    },
    () => null,
  );
  return useMemo(() => {
    if (!snapshot) return null;
    const [date, minutes] = snapshot.split("|");
    return { date, minutes: Number(minutes) };
  }, [snapshot]);
}

const isClosed = (isoDate: string) => (CLOSED_WEEKDAYS as readonly number[]).includes(weekdayOf(isoDate));
const lastSlotMinutes = slotToMinutes(allTimeSlots[allTimeSlots.length - 1]);

function Step({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`step-${number}`} className="border-t border-line pt-8 sm:pt-10">
      <div className="flex items-baseline gap-4">
        <span aria-hidden="true" className="font-display text-xl italic text-olive-light">
          {number}
        </span>
        <h2 id={`step-${number}`} className="font-display text-[1.75rem] leading-tight text-cream sm:text-[2rem]">
          {title}
        </h2>
      </div>
      <div className="mt-8 space-y-9">{children}</div>
    </section>
  );
}

type Status =
  | { state: "idle" }
  | { state: "success"; message: string; summary: ReservationRequest }
  | { state: "not-configured"; message: string }
  | { state: "error"; message: string };

export function ReservationForm({ emailConfigured }: { emailConfigured: boolean }) {
  const clock = useRestaurantClock();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const successRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues, unknown, ReservationRequest>({
    resolver,
    defaultValues,
    mode: "onTouched",
  });

  const [date, time, guests, occasion, specialRequests] = useWatch({
    control,
    name: ["date", "time", "guests", "occasion", "specialRequests"],
  });

  // The next few open days, offered as one-tap choices. Today is included only
  // while a same-day request is still possible.
  const quickDates = useMemo(() => {
    if (!clock) return [];
    const days: { iso: string; caption: string }[] = [];
    for (let offset = 0; days.length < QUICK_DATE_COUNT && offset <= MAX_DAYS_AHEAD; offset++) {
      const iso = addDays(clock.date, offset);
      if (isClosed(iso)) continue;
      if (offset === 0 && lastSlotMinutes < clock.minutes + SAME_DAY_NOTICE_MINUTES) continue;
      days.push({ iso, caption: offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : formatDateParts(iso).weekday });
    }
    return days;
  }, [clock]);

  const slotUnavailable = (slot: string) =>
    !!date &&
    (isClosed(date) ||
      (clock !== null && date === clock.date && slotToMinutes(slot) < clock.minutes + SAME_DAY_NOTICE_MINUTES));

  // If a new date makes the chosen time impossible, clear it rather than submit a doomed request.
  const selectedSlotUnavailable = !!time && slotUnavailable(time);
  useEffect(() => {
    if (selectedSlotUnavailable) setValue("time", "", { shouldValidate: false });
  }, [selectedSlotUnavailable, setValue]);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
    if (status.state === "error" || status.state === "not-configured") alertRef.current?.focus();
  }, [status]);

  async function onSubmit(values: ReservationRequest) {
    setStatus({ state: "idle" });
    const outcome = await submitForm("/api/reservations", values);

    switch (outcome.kind) {
      case "success":
        setStatus({ state: "success", message: outcome.message, summary: values });
        reset(defaultValues);
        break;
      case "validation":
        for (const [field, message] of Object.entries(outcome.fieldErrors)) {
          setError(field as keyof ReservationFormValues, { type: "server", message }, { shouldFocus: true });
        }
        setStatus({ state: "error", message: outcome.message });
        break;
      case "not-configured":
        setStatus({ state: "not-configured", message: outcome.message });
        break;
      default:
        setStatus({ state: "error", message: outcome.message });
    }
  }

  if (status.state === "success") {
    const { summary } = status;
    return (
      <div className="border border-line bg-umber p-8 sm:p-12" aria-live="polite">
        <p className="eyebrow">Request received</p>
        <h2 ref={successRef} tabIndex={-1} className="display-md mt-5 text-cream outline-none">
          Thank you, {summary.name.split(" ")[0]}.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-cream/90">{status.message}</p>
        <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
          {[
            ["Date", formatLongDate(summary.date)],
            ["Preferred time", formatTime12h(summary.time)],
            ["Guests", String(summary.guests)],
          ].map(([label, value]) => (
            <div key={label} className="bg-umber p-5">
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-stone">{label}</dt>
              <dd className="mt-2 font-display text-xl text-cream">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-stone">
          Your table is not confirmed until our team contacts you. If your plans change, simply reply to our
          message.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className={buttonClasses("outline", "mt-8")}
        >
          Make another request
        </button>
      </div>
    );
  }

  const guestCount = Number(guests);
  const summaryParts = [
    date ? formatLongDate(date) : null,
    time ? formatTime12h(time) : null,
    guestCount ? `${guestCount} ${guestCount === 1 ? "guest" : "guests"}` : null,
    occasion || null,
  ].filter(Boolean);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-describedby="reservation-form-note" className="relative">
      {!emailConfigured ? (
        <div className="mb-10">
          <FormAlert tone="warning" title="Reservation requests are not currently configured">
            This demonstration site has no email delivery set up, so requests submitted here will not be sent to
            anyone. You&rsquo;ll see a clear message if you try.
          </FormAlert>
        </div>
      ) : null}

      <p id="reservation-form-note" className="mb-10 text-sm leading-relaxed text-stone">
        Three short steps. Fields marked <span className="text-olive-light">*</span> are required. This sends a{" "}
        <strong className="font-semibold text-cream">reservation request</strong> — our team confirms every table
        personally.
      </p>

      <div className="space-y-12">
        <Step number="01" title="Your visit">
          {/* Date: quick choices plus a full calendar */}
          <div>
            <p id="date-heading" className={labelClasses}>
              Date <span aria-hidden="true" className="text-olive-light">*</span>
            </p>
            <div
              role="group"
              aria-labelledby="date-heading"
              className="mt-4 grid min-h-[4.75rem] grid-cols-3 gap-2 sm:grid-cols-6"
            >
              {quickDates.map(({ iso, caption }) => {
                const parts = formatDateParts(iso);
                const selected = date === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    aria-pressed={selected}
                    aria-label={`${caption === "Today" || caption === "Tomorrow" ? `${caption}, ` : ""}${formatLongDate(iso)}`}
                    onClick={() => setValue("date", iso, { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                    className={`flex flex-col items-center justify-center border px-2 py-2.5 transition-[background-color,border-color,color] duration-300 ease-luxe active:translate-y-px ${
                      selected
                        ? "border-olive-light bg-olive-light text-charcoal"
                        : "border-line text-cream hover:border-stone/70"
                    }`}
                  >
                    <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] opacity-80">
                      {caption}
                    </span>
                    <span className="font-display text-2xl leading-none">{parts.day}</span>
                    <span className="text-[0.6875rem] opacity-80">{parts.month}</span>
                  </button>
                );
              })}
            </div>
            <label htmlFor="date" className="mt-5 block text-sm text-stone">
              Or choose another date
            </label>
            <input
              id="date"
              type="date"
              min={clock?.date}
              max={clock ? addDays(clock.date, MAX_DAYS_AHEAD) : undefined}
              className={`${controlClasses} [color-scheme:dark]`}
              aria-invalid={errors.date ? true : undefined}
              aria-describedby={describedBy("date", errors.date?.message, true)}
              aria-required="true"
              {...register("date")}
            />
            <FieldMessage
              id="date"
              error={errors.date?.message}
              hint={`Open Tuesday to Sunday · requests up to ${MAX_DAYS_AHEAD} days ahead.`}
            />
          </div>

          {/* Time */}
          <fieldset aria-describedby={describedBy("time", errors.time?.message, true)}>
            <legend className={labelClasses}>
              Preferred time <span aria-hidden="true" className="text-olive-light">*</span>
            </legend>
            <div className="mt-4 space-y-5">
              {timeSlotGroups.map((group) => (
                <div key={group.label} className="grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:items-center">
                  <p className="font-display text-lg italic text-cream/80">{group.label}</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {group.slots.map((slot) => (
                      <ChoiceChip
                        key={slot}
                        value={slot}
                        label={formatTime12h(slot)}
                        disabled={slotUnavailable(slot)}
                        aria-invalid={errors.time ? true : undefined}
                        {...register("time")}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <FieldMessage
              id="time"
              error={errors.time?.message}
              hint={
                date && isClosed(date)
                  ? "We are closed on Mondays — please choose another day."
                  : "Same-day requests need at least 90 minutes' notice."
              }
            />
          </fieldset>

          {/* Guests */}
          <fieldset aria-describedby={describedBy("guests", errors.guests?.message, true)}>
            <legend className={labelClasses}>
              Guests <span aria-hidden="true" className="text-olive-light">*</span>
            </legend>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {Array.from({ length: MAX_GUESTS }, (_, i) => String(i + 1)).map((count) => (
                <ChoiceChip
                  key={count}
                  value={count}
                  label={count}
                  aria-label={`${count} ${count === "1" ? "guest" : "guests"}`}
                  aria-invalid={errors.guests ? true : undefined}
                  {...register("guests")}
                />
              ))}
            </div>
            <FieldMessage
              id="guests"
              error={errors.guests?.message}
              hint={
                <>
                  Nine or more?{" "}
                  <Link href="/contact" className="link-underline text-cream">
                    Send a group enquiry
                  </Link>
                  .
                </>
              }
            />
          </fieldset>

          {/* Occasion */}
          <fieldset aria-describedby={describedBy("occasion", errors.occasion?.message)}>
            <legend className={labelClasses}>
              Occasion <span className="font-normal normal-case tracking-normal text-stone/80">(optional)</span>
            </legend>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <ChoiceChip value="" label="Just dinner" {...register("occasion")} />
              {occasions.map((option) => (
                <ChoiceChip key={option} value={option} label={option} {...register("occasion")} />
              ))}
            </div>
            <FieldMessage id="occasion" error={errors.occasion?.message} />
          </fieldset>
        </Step>

        <Step number="02" title="Your details">
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            <Field id="name" label="Full name" required error={errors.name?.message} className="sm:col-span-2">
              <input
                id="name"
                type="text"
                autoComplete="name"
                className={controlClasses}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy("name", errors.name?.message)}
                aria-required="true"
                {...register("name")}
              />
            </Field>

            <Field id="email" label="Email" required error={errors.email?.message}>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={controlClasses}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy("email", errors.email?.message)}
                aria-required="true"
                {...register("email")}
              />
            </Field>

            <Field
              id="phone"
              label="Phone"
              required
              error={errors.phone?.message}
              hint="Indian mobile, or include your country code."
            >
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className={controlClasses}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={describedBy("phone", errors.phone?.message, true)}
                aria-required="true"
                {...register("phone")}
              />
            </Field>
          </div>
        </Step>

        <Step number="03" title="Final touches">
          <Field
            id="specialRequests"
            label="Special requests"
            error={errors.specialRequests?.message}
            hint={`Dietary needs, accessibility, seating preferences · ${(specialRequests ?? "").length}/${SPECIAL_REQUESTS_MAX}`}
          >
            <textarea
              id="specialRequests"
              rows={3}
              maxLength={SPECIAL_REQUESTS_MAX}
              className={`${controlClasses} resize-y`}
              aria-invalid={errors.specialRequests ? true : undefined}
              aria-describedby={describedBy("specialRequests", errors.specialRequests?.message, true)}
              {...register("specialRequests")}
            />
          </Field>

          <div>
            <label htmlFor="consent" className="flex cursor-pointer items-start gap-4">
              <input
                id="consent"
                type="checkbox"
                className="peer sr-only"
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={describedBy("consent", errors.consent?.message)}
                {...register("consent")}
              />
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center border border-stone/60 transition-colors peer-checked:border-olive-light peer-checked:bg-olive-light peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive-light peer-aria-[invalid=true]:border-error [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
              >
                <svg viewBox="0 0 16 16" className="size-3 fill-none stroke-charcoal stroke-[2.5]">
                  <path d="M3 8.5 6.5 12 13 4.5" />
                </svg>
              </span>
              <span className="text-sm leading-relaxed text-stone">
                I understand this is a <span className="text-cream">reservation request</span>, not a confirmed
                booking, and I agree to be contacted by phone or email about it.{" "}
                <span aria-hidden="true" className="text-olive-light">
                  *
                </span>
              </span>
            </label>
            <FieldMessage id="consent" error={errors.consent?.message} />
          </div>
        </Step>
      </div>

      <HoneypotField {...register("website")} />

      <div ref={alertRef} tabIndex={-1} aria-live="assertive" className="mt-10 outline-none empty:hidden">
        {status.state === "not-configured" ? (
          <FormAlert tone="warning" title="Your request was not sent">
            {status.message}
          </FormAlert>
        ) : null}
        {status.state === "error" ? (
          <FormAlert tone="error" title="Your request was not sent">
            {status.message}
          </FormAlert>
        ) : null}
      </div>

      <div className="mt-10 border border-line bg-umber/60 p-6 sm:p-8">
        <p className={labelClasses}>Your request</p>
        <p className="mt-3 font-display text-2xl leading-snug text-cream sm:text-[1.75rem]">
          {summaryParts.length > 1 ? (
            summaryParts.join(" · ")
          ) : (
            <span className="text-cream/60">Choose a date and time to see your request here.</span>
          )}
        </p>
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-stone sm:max-w-xs">
            We&rsquo;ll reply to confirm or suggest the closest alternative. Live availability is not shown online.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={buttonClasses("primary", "w-full shrink-0 sm:w-auto")}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={1.75} />
                <span>Sending request…</span>
              </>
            ) : (
              <>
                <span>Send Request</span>
                <ButtonArrow />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
