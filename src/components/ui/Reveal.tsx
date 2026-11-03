"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
}

/**
 * Restrained fade-and-rise as content scrolls into view, driven by CSS
 * transitions (see `.reveal` in globals.css). Content renders visible on the
 * server; only elements that start below the fold are held back, and only
 * when the visitor has not asked for reduced motion.
 */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.reveal === "shown") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function delayStyle(delay: number): CSSProperties | undefined {
  return delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={delayStyle(delay)}>
      {children}
    </div>
  );
}

/** Image wrapper that eases from a slight zoom as it scrolls into view. */
export function RevealImage({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal-image ${className}`} style={delayStyle(delay)}>
      {children}
    </div>
  );
}
