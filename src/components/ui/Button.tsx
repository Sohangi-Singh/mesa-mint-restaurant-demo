import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "text";

const base =
  "group inline-flex items-center justify-center gap-3 font-sans text-[0.71875rem] font-semibold uppercase tracking-[0.22em] transition-[background-color,border-color,color,opacity,transform] duration-500 ease-luxe active:translate-y-px active:duration-100 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "min-h-12 border border-burgundy bg-burgundy px-7 py-4 text-cream shadow-[0_10px_30px_-12px_rgba(107,41,46,0.7)] hover:border-burgundy-light hover:bg-burgundy-light",
  outline:
    "min-h-12 border border-cream/35 px-7 py-4 text-cream hover:border-cream hover:bg-cream hover:text-charcoal",
  text: "min-h-11 py-2 text-cream link-underline",
};

export function buttonClasses(variant: Variant = "primary", className = ""): string {
  return `${base} ${variants[variant]} ${className}`.trim();
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
      strokeWidth={1.5}
    />
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}

export function ButtonLink({ children, variant = "primary", arrow = false, className, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

export { Arrow as ButtonArrow };
