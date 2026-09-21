"use client";

import { CHECKOUT_URL, PRICE_LABEL } from "@/lib/checkout";

type Props = {
  variant?: "bar" | "button" | "text";
  className?: string;
};

export function CheckoutCta({ variant = "button", className = "" }: Props) {
  if (variant === "text") {
    return (
      <a
        href={CHECKOUT_URL}
        className={`text-gold underline-offset-4 hover:underline ${className}`}
      >
        {PRICE_LABEL}
      </a>
    );
  }

  if (variant === "bar") {
    return (
      <a
        href={CHECKOUT_URL}
        className={`flex items-center justify-between gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-ivory ${className}`}
      >
        <span className="font-medium tracking-wide">Unlock your twin</span>
        <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
          {PRICE_LABEL}
        </span>
      </a>
    );
  }

  return (
    <a
      href={CHECKOUT_URL}
      className={`inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold tracking-wide text-ink ${className}`}
    >
      Subscribe {PRICE_LABEL}
    </a>
  );
}
