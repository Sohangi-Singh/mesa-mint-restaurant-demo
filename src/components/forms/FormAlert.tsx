import { CircleAlert, CircleCheck, Info } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "error" | "warning" | "success";

const tones: Record<Tone, { icon: typeof Info; classes: string }> = {
  error: { icon: CircleAlert, classes: "border-error/60 bg-error/[0.07] text-cream" },
  warning: { icon: Info, classes: "border-olive/70 bg-olive/10 text-cream" },
  success: { icon: CircleCheck, classes: "border-success/60 bg-success/[0.08] text-cream" },
};

interface FormAlertProps {
  tone: Tone;
  title: string;
  children?: ReactNode;
}

export function FormAlert({ tone, title, children }: FormAlertProps) {
  const { icon: Icon, classes } = tones[tone];
  const iconColor = tone === "error" ? "text-error" : tone === "success" ? "text-success" : "text-olive-light";

  return (
    <div className={`flex gap-4 border p-5 ${classes}`}>
      <Icon aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${iconColor}`} strokeWidth={1.5} />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold text-cream">{title}</p>
        {children ? <div className="mt-1 text-stone">{children}</div> : null}
      </div>
    </div>
  );
}
