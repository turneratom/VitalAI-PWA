export const MONTHLY_PRICE = "$6.99";
export const YEARLY_PRICE = "$49";
export const YEARLY_PER_MONTH = "$4.08";

export function checkoutUrl(plan: "monthly" | "yearly"): string {
  const monthly = process.env.NEXT_PUBLIC_CHECKOUT_MONTHLY?.trim();
  const yearly = process.env.NEXT_PUBLIC_CHECKOUT_YEARLY?.trim();
  if (plan === "monthly") return monthly || "/thanks";
  return yearly || "/thanks";
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
