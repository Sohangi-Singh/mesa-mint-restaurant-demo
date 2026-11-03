import type { ReactNode } from "react";

interface EyebrowProps {
  index?: string;
  children: ReactNode;
  className?: string;
}

/** Small uppercase label, optionally numbered: "01 —— The Table". */
export function Eyebrow({ index, children, className = "" }: EyebrowProps) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      {index ? (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-olive/60" />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

interface SectionIntroProps {
  /** id for the heading, so the section can reference it with aria-labelledby. */
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  size?: "lg" | "md";
  className?: string;
}

export function SectionIntro({
  id,
  index,
  eyebrow,
  title,
  children,
  as: Heading = "h2",
  align = "left",
  size = "lg",
  className = "",
}: SectionIntroProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <Eyebrow index={index} className={centered ? "justify-center" : ""}>
        {eyebrow}
      </Eyebrow>
      <Heading id={id} className={`${size === "lg" ? "display-lg" : "display-md"} mt-6 text-cream`}>{title}</Heading>
      {children ? (
        <div className={`prose-luxe mt-6 max-w-xl ${centered ? "mx-auto" : ""}`}>{children}</div>
      ) : null}
    </div>
  );
}
