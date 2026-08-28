import Link from "next/link";
import { MapPin, Home, TrendingUp } from "lucide-react";
import type { ParkListing } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

const parkGradients: Record<string, string> = {
  sunset: "from-sky-400 via-cyan-500 to-teal-500",
  oak: "from-cyan-700 via-sky-500 to-teal-400",
  pine: "from-slate-700 via-cyan-600 to-sky-400",
  river: "from-blue-700 via-cyan-500 to-sky-300",
  meadow: "from-teal-600 via-cyan-500 to-sky-400",
};

const statusStyles: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-sky-100 text-sky-900" },
  under_contract: { label: "Under Contract", className: "bg-amber-100 text-amber-800" },
  pending_review: { label: "Pending Review", className: "bg-cyan-100 text-cyan-900" },
};

type ParkCardProps = {
  park: ParkListing;
  showFinancials?: boolean;
};

export function ParkCard({ park, showFinancials = true }: ParkCardProps) {
  const gradient = parkGradients[park.image] ?? "from-gray-600 to-gray-800";
  const status = statusStyles[park.status];

  return (
    <Link
      href={`/parks/${park.id}`}
      className="group block bg-card rounded-xl overflow-hidden card-shadow border border-border hover:card-shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className={cn("h-40 bg-gradient-to-br relative", gradient)}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 right-3">
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", status.className)}>
            {status.label}
          </span>
        </div>
        <div className="absolute bottom-3 left-4">
          <h3 className="font-display text-lg font-bold text-white drop-shadow-md group-hover:text-accent-light transition-colors">
            {park.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-sm text-muted mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {park.location}
        </div>

        <div className="flex items-baseline justify-between mb-4">
          <span className="text-2xl font-bold text-navy">
            {park.askingPrice > 0 ? formatCurrency(park.askingPrice) : "Portfolio listing"}
          </span>
          {showFinancials && park.underwriting.capRate > 0 && (
            <span className="text-sm font-semibold text-primary">
              {formatPercent(park.underwriting.capRate)} cap
            </span>
          )}
          {park.askingPrice === 0 && (
            <span className="text-sm font-semibold text-primary">Demo listing</span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted mb-0.5">
              <Home className="w-3 h-3" />
            </div>
            <p className="text-sm font-semibold text-navy">{park.lotCount}</p>
            <p className="text-[10px] text-muted uppercase">Lots</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted mb-0.5">
              <TrendingUp className="w-3 h-3" />
            </div>
            <p className="text-sm font-semibold text-navy">
              {formatPercent(park.underwriting.occupancyRate)}
            </p>
            <p className="text-[10px] text-muted uppercase">Occupied</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-navy mt-3">{formatCurrency(park.padRent)}</p>
            <p className="text-[10px] text-muted uppercase">Pad Rent</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
