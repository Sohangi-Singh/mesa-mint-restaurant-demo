import { ArrowUpRight, MessageCircle } from "lucide-react";

import { getWhatsAppLink } from "@/lib/whatsapp";

/**
 * Shows a working WhatsApp link only when a real business number is
 * configured; otherwise explains that the channel is not yet available.
 */
export function WhatsAppCard() {
  const href = getWhatsAppLink();

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-4 border border-line p-6 transition-colors duration-500 hover:border-olive-light hover:bg-olive/10"
      >
        <MessageCircle aria-hidden="true" className="mt-1 size-6 shrink-0 text-olive-light" strokeWidth={1.25} />
        <span className="flex-1">
          <span className="block font-display text-2xl text-cream">Message us on WhatsApp</span>
          <span className="mt-2 block text-sm leading-relaxed text-stone">
            Quick questions about timings, menus or directions. Opens WhatsApp in a new tab.
          </span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-stone transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream"
          strokeWidth={1.5}
        />
      </a>
    );
  }

  return (
    <div className="flex items-start gap-4 border border-dashed border-line p-6">
      <MessageCircle aria-hidden="true" className="mt-1 size-6 shrink-0 text-stone/60" strokeWidth={1.25} />
      <div>
        <p className="font-display text-2xl text-cream/80">WhatsApp enquiries</p>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          Not yet available — a WhatsApp business number has not been configured for this demonstration site.
        </p>
      </div>
    </div>
  );
}
