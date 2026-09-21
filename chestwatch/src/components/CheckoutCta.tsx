"use client";

import { CHECKOUT_URL, PRICE_LABEL } from "@/lib/checkout";

type Props = {
  variant?: "primary" | "text";
  className?: string;
};

export function CheckoutCta({ variant = "primary", className = "" }: Props) {
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

  return (
    <a
      href={CHECKOUT_URL}
      className={`inline-flex w-full items-center justify-center rounded-full bg-gold px-5 py-3.5 text-center text-sm font-semibold tracking-wide text-ink ${className}`}
    >
      Get your digital twin · {PRICE_LABEL}
    </a>
  );
}
