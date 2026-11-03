import { CircleAlert, ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

/** Underline-style control shared by inputs, selects and textareas. */
export const controlClasses =
  "w-full appearance-none rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-base text-cream placeholder:text-stone/55 transition-[border-color,box-shadow] duration-300 focus:border-olive-light focus:shadow-[0_1px_0_0_var(--mm-olive-light)] focus:outline-none aria-[invalid=true]:border-error aria-[invalid=true]:focus:shadow-[0_1px_0_0_var(--mm-error)] disabled:opacity-60";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, required = false, error, hint, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-stone"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-olive-light">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal normal-case tracking-normal text-stone/70"> (optional)</span>
        )}
      </label>
      {children}
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
}

export function FieldMessage({ id, error, hint }: { id: string; error?: string; hint?: ReactNode }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-sm text-error">
        <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
        <span>{error}</span>
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-stone/80">
        {hint}
      </p>
    );
  }
  return null;
}

/** aria-describedby value pointing at whichever message is currently shown. */
export function describedBy(id: string, error?: string, hasHint = false): string | undefined {
  if (error) return `${id}-error`;
  return hasHint ? `${id}-hint` : undefined;
}

export function SelectChevron() {
  return (
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-stone"
      strokeWidth={1.5}
    />
  );
}

/** Small uppercase label used for fieldset legends and grouped controls. */
export const labelClasses = "block text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-stone";

type ChoiceChipProps = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
  sublabel?: ReactNode;
};

/**
 * A radio button presented as a selectable tile. The native input stays in the
 * accessibility tree (visually hidden), so arrow-key navigation, labels and
 * form libraries work exactly as with a plain radio group.
 */
export function ChoiceChip({ label, sublabel, className = "", ...input }: ChoiceChipProps) {
  return (
    <label className={`group/chip relative block cursor-pointer has-[:disabled]:cursor-not-allowed ${className}`}>
      <input type="radio" className="peer sr-only" {...input} />
      <span className="flex min-h-11 flex-col items-center justify-center border border-line px-3 py-2 text-center text-sm text-cream transition-[background-color,border-color,color] duration-300 ease-luxe group-hover/chip:border-stone/70 peer-checked:border-olive-light peer-checked:bg-olive-light peer-checked:text-charcoal peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-olive-light peer-disabled:border-line/40 peer-disabled:text-stone/40 peer-disabled:line-through peer-aria-[invalid=true]:border-error/70">
        {label}
        {sublabel ? <span className="mt-0.5 text-[0.6875rem] opacity-80">{sublabel}</span> : null}
      </span>
    </label>
  );
}

/** Visually hidden honeypot input. Real visitors never see or fill it. */
export function HoneypotField(props: ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
      <label htmlFor="website-field">Leave this field empty</label>
      <input id="website-field" type="text" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  );
}
