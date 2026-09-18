import type { ReactNode } from "react";
import { BrandMark } from "@/components/BrandMark";

export function SiteHeader({ right }: { right?: ReactNode }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
      <BrandMark />
      {right}
    </header>
  );
}
