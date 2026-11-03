interface WordmarkProps {
  className?: string;
}

/** Typographic logotype: MESA & MINT with an italic olive ampersand. */
export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span className={`font-display font-normal uppercase tracking-[0.2em] text-cream ${className}`}>
      Mesa <span className="font-light italic normal-case tracking-normal text-olive-light">&amp;</span> Mint
    </span>
  );
}
