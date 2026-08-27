"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/list-your-park", label: "List Free" },
  { href: "/outreach", label: "Outreach" },
  { href: "/upload-list", label: "Upload List" },
  { href: "/owners", label: "Owners" },
  { href: "/buyers", label: "Buyers" },
  { href: "/analysts", label: "Analysts" },
  { href: "/banks", label: "Lenders" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-bold text-navy tracking-tight">
                Trailer Parks
              </span>
              <span className="hidden sm:block text-[10px] text-muted uppercase tracking-widest -mt-0.5">
                Mobile Home Park Exchange
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/list-your-park"
              className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              List Your Park
            </Link>
            <Link
              href="/marketplace"
              className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-light transition-colors rounded-lg"
            >
              Browse Deals
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-foreground/70 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden border-t border-border bg-white overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-md hover:bg-primary/5"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            <Link
              href="/list-your-park"
              className="block w-full text-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              List Your Park
            </Link>
            <Link
              href="/marketplace"
              className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Browse Deals
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
