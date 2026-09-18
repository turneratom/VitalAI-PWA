export const MONTHLY_PRICE = "$6.99";
export const YEARLY_PRICE = "$49";
export const YEARLY_PER_MONTH = "$4.08";

export const DEFAULT_CHECKOUT_MONTHLY =
  "https://whop.com/checkout/plan_8e6gE2sW5tuNn";
export const DEFAULT_CHECKOUT_YEARLY =
  "https://whop.com/checkout/plan_FN7cAjfaoPHUb";

export function checkoutUrl(plan: "monthly" | "yearly"): string {
  const monthly =
    process.env.NEXT_PUBLIC_CHECKOUT_MONTHLY?.trim() || DEFAULT_CHECKOUT_MONTHLY;
  const yearly =
    process.env.NEXT_PUBLIC_CHECKOUT_YEARLY?.trim() || DEFAULT_CHECKOUT_YEARLY;
  if (plan === "monthly") return monthly;
  return yearly;
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
