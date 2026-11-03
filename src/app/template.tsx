import type { ReactNode } from "react";

/** A subtle, CSS-only fade between routes (disabled under reduced motion). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
