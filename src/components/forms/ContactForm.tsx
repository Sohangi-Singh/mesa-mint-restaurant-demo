"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  Field,
  HoneypotField,
  SelectChevron,
  controlClasses,
  describedBy,
} from "@/components/forms/fields";
import { FormAlert } from "@/components/forms/FormAlert";
import { ButtonArrow, buttonClasses } from "@/components/ui/Button";
import { submitForm } from "@/lib/submit-form";
import {
  MESSAGE_MAX,
  contactSchema,
  enquiryTypes,
  type ContactFormValues,
  type ContactRequest,
} from "@/lib/validation/contact";

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  enquiryType: "",
  message: "",
  website: "",
};

type Status =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "not-configured"; message: string }
  | { state: "error"; message: string };

export function ContactForm({ emailConfigured }: { emailConfigured: boolean }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const successRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues, unknown, ContactRequest>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  const messageLength = (useWatch({ control, name: "message" }) ?? "").length;

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
    if (status.state === "error" || status.state === "not-configured") alertRef.current?.focus();
  }, [status]);

  async function onSubmit(values: ContactRequest) {
    setStatus({ state: "idle" });
    const outcome = await submitForm("/api/contact", values);

    switch (outcome.kind) {
      case "success":
        setStatus({ state: "success", message: outcome.message });
        reset(defaultValues);
        break;
      case "validation":
        for (const [field, message] of Object.entries(outcome.fieldErrors)) {
          setError(field as keyof ContactFormValues, { type: "server", message }, { shouldFocus: true });
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
    return (
      <div className="border border-line bg-umber p-8 sm:p-12" aria-live="polite">
        <p className="eyebrow">Message sent</p>
        <h2 ref={successRef} tabIndex={-1} className="display-md mt-5 text-cream outline-none">
          Thank you for writing.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-cream/90">{status.message}</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className={buttonClasses("outline", "mt-8")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="relative">
      {!emailConfigured ? (
        <div className="mb-10">
          <FormAlert tone="warning" title="The contact form is not currently configured">
            This demonstration site has no email delivery set up, so messages submitted here will not be sent to
            anyone. You&rsquo;ll see a clear message if you try.
          </FormAlert>
        </div>
      ) : null}

      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <Field id="contact-name" label="Name" required error={errors.name?.message}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={controlClasses}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("contact-name", errors.name?.message)}
            aria-required="true"
            {...register("name")}
          />
        </Field>

        <Field id="contact-email" label="Email" required error={errors.email?.message}>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={controlClasses}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("contact-email", errors.email?.message)}
            aria-required="true"
            {...register("email")}
          />
        </Field>

        <Field id="contact-phone" label="Phone" error={errors.phone?.message}>
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={controlClasses}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("contact-phone", errors.phone?.message)}
            {...register("phone")}
          />
        </Field>

        <Field id="contact-type" label="Enquiry type" required error={errors.enquiryType?.message}>
          <div className="relative">
            <select
              id="contact-type"
              className={`${controlClasses} pr-8`}
              aria-invalid={errors.enquiryType ? true : undefined}
              aria-describedby={describedBy("contact-type", errors.enquiryType?.message)}
              aria-required="true"
              {...register("enquiryType")}
            >
              <option value="" disabled className="bg-charcoal">
                Choose a topic
              </option>
              {enquiryTypes.map((type) => (
                <option key={type} value={type} className="bg-charcoal">
                  {type}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>

        <Field
          id="contact-message"
          label="Message"
          required
          error={errors.message?.message}
          hint={`${messageLength}/${MESSAGE_MAX}`}
          className="sm:col-span-2"
        >
          <textarea
            id="contact-message"
            rows={6}
            maxLength={MESSAGE_MAX}
            className={`${controlClasses} resize-y`}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("contact-message", errors.message?.message, true)}
            aria-required="true"
            {...register("message")}
          />
        </Field>
      </div>

      <HoneypotField {...register("website")} />

      <div ref={alertRef} tabIndex={-1} aria-live="assertive" className="mt-10 outline-none empty:hidden">
        {status.state === "not-configured" ? (
          <FormAlert tone="warning" title="Your message was not sent">
            {status.message}
          </FormAlert>
        ) : null}
        {status.state === "error" ? (
          <FormAlert tone="error" title="Your message was not sent">
            {status.message}
          </FormAlert>
        ) : null}
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-stone/80 sm:max-w-xs">
          Fields marked <span className="text-olive-light">*</span> are required. We reply by email.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={buttonClasses("primary", "w-full sm:w-auto")}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={1.75} />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <ButtonArrow />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
