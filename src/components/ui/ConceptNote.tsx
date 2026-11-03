import { Info } from "lucide-react";
import type { ReactNode } from "react";

/** A quiet, clearly visible disclosure that content is illustrative. */
export function ConceptNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-start gap-3 border border-line px-4 py-3 text-[0.8125rem] leading-relaxed text-stone ${className}`}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-olive-light" strokeWidth={1.5} />
      <span>{children}</span>
    </p>
  );
}
