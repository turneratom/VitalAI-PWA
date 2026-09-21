"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { Seal } from "./Seal";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule/40 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3 text-ink">
          <Seal size="sm" />
          <span className="leading-tight">
            <span className="block font-display text-lg tracking-wide">
              {site.vaultTitle}
            </span>
            <span className="kicker text-[0.65rem] text-seal">Private family archive</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Vault">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`kicker text-[0.7rem] transition-colors ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="kicker text-[0.7rem] text-ink md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          className="grid gap-2 border-t border-rule/40 px-5 py-4 md:hidden"
          aria-label="Vault mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-xl text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
