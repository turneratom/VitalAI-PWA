import Link from "next/link";

export function BrandMark({ href = "/", size = "md" }: { href?: string; size?: "sm" | "md" }) {
  const mark = size === "sm" ? "h-7 w-7 text-sm" : "h-8 w-8 text-base";
  const word = size === "sm" ? "text-sm" : "text-base";

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <span
        className={`inline-flex ${mark} items-center justify-center rounded-md bg-ink font-serif text-paper`}
        aria-hidden
      >
        1
      </span>
      <span className={`${word} tracking-[0.22em] uppercase text-ink`}>One Win</span>
    </Link>
  );
}
