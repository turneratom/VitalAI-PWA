"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/partner", label: "Partner" },
  { href: "/links", label: "Links" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/list-your-park", label: "List Free" },
  { href: "/featured", label: "Featured $299" },
  { href: "/valuation", label: "Valuation $1.5k" },
  { href: "/outreach", label: "Outreach" },
  { href: "/upload-list", label: "Upload List" },
  { href: "/owners", label: "Owners" },
  { href: "/buyers", label: "Buyers" },
  { href: "/buyer-pro", label: "Buyer Pro $99" },
  { href: "/deal-room", label: "Deal Room $199" },
  { href: "/lender-intro", label: "Lender Intro $499" },
  { href: "/underwriting", label: "Underwriting $799" },
  { href: "/comps", label: "Comps $349" },
  { href: "/loi", label: "LOI Review $599" },
  { href: "/rent-roll", label: "Rent Roll $449" },
  { href: "/cap-rate", label: "Cap Rate $299" },
  { href: "/noi", label: "NOI $349" },
  { href: "/tax", label: "Tax Basis $399" },
  { href: "/insurance", label: "Insurance $499" },
  { href: "/survey", label: "Site Survey $599" },
  { href: "/epa", label: "EPA Diligence $449" },
  { href: "/zoning", label: "Zoning Diligence $549" },
  { href: "/title", label: "Title Diligence $699" },
  { href: "/flood", label: "Flood Diligence $599" },
  { href: "/utility", label: "Utility Diligence $479" },
  { href: "/traffic", label: "Traffic Diligence $429" },
  { href: "/septic", label: "Septic Diligence $389" },
  { href: "/wells", label: "Wells Diligence $459" },
  { href: "/wetlands", label: "Wetlands Diligence $439" },
  { href: "/access", label: "Access Diligence $419" },
  { href: "/soils", label: "Soils Diligence $399" },
  { href: "/drainage", label: "Drainage Diligence $389" },
  { href: "/easement", label: "Easement Diligence $379" },
  { href: "/setbacks", label: "Setbacks Diligence $369" },
  { href: "/pads", label: "Pads Diligence $359" },
  { href: "/skirts", label: "Skirts Diligence $349" },
  { href: "/tie-downs", label: "Tie-Downs Diligence $339" },
  { href: "/foundations", label: "Foundations Diligence $329" },
  { href: "/fencing", label: "Fencing Diligence $319" },
  { href: "/meters", label: "Meters Diligence $309" },
  { href: "/lighting", label: "Lighting Diligence $299" },
  { href: "/signage", label: "Signage Diligence $289" },
  { href: "/mailboxes", label: "Mailboxes Diligence $279" },
  { href: "/wifi", label: "Wi-Fi Diligence $269" },
  { href: "/laundry", label: "Laundry Diligence $259" },
  { href: "/playground", label: "Playground Diligence $249" },
  { href: "/clubhouse", label: "Clubhouse Diligence $239" },
  { href: "/pool", label: "Pool Diligence $229" },
  { href: "/gym", label: "Gym Diligence $219" },
  { href: "/office", label: "Office Diligence $209" },
  { href: "/parking", label: "Parking Diligence $199" },
  { href: "/mailroom", label: "Mailroom Diligence $189" },
  { href: "/storage", label: "Storage Diligence $179" },
  { href: "/pavilion", label: "Pavilion Diligence $169" },
  { href: "/dog-park", label: "Dog-Park Diligence $159" },
  { href: "/firepit", label: "Firepit Diligence $149" },
  { href: "/bbq", label: "BBQ Diligence $139" },
  { href: "/gazebo", label: "Gazebo Diligence $129" },
  { href: "/pergola", label: "Pergola Diligence $119" },
  { href: "/courtyard", label: "Courtyard Diligence $109" },
  { href: "/garden", label: "Garden Diligence $99" },
  { href: "/patio", label: "Patio Diligence $89" },
  { href: "/deck", label: "Deck Diligence $79" },
  { href: "/porch", label: "Porch Diligence $69" },
  { href: "/stoop", label: "Stoop Diligence $59" },
  { href: "/veranda", label: "Veranda Diligence $49" },
  { href: "/breezeway", label: "Breezeway Diligence $39" },
  { href: "/carport", label: "Carport Diligence $29" },
  { href: "/shed", label: "Shed Diligence $19" },
  { href: "/lanai", label: "Lanai Diligence $15" },
  { href: "/cabana", label: "Cabana Diligence $10" },
  { href: "/solarium", label: "Solarium Diligence $5" },
  { href: "/conservatory", label: "Conservatory Diligence $3" },
  { href: "/orangery", label: "Orangery Diligence $2" },
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
