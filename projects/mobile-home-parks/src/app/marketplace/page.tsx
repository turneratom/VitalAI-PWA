"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ParkCard } from "@/components/ParkCard";
import { parks } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = ["All", "Active", "Under Contract", "Pending Review"] as const;
const sortOptions = [
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Cap Rate: High to Low", value: "cap-desc" },
  { label: "Occupancy: High to Low", value: "occ-desc" },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sort, setSort] = useState("price-desc");

  const filtered = parks
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.state.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Active" && p.status === "active") ||
        (activeFilter === "Under Contract" && p.status === "under_contract") ||
        (activeFilter === "Pending Review" && p.status === "pending_review");
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.askingPrice - a.askingPrice;
        case "price-asc":
          return a.askingPrice - b.askingPrice;
        case "cap-desc":
          return b.underwriting.capRate - a.underwriting.capRate;
        case "occ-desc":
          return b.underwriting.occupancyRate - a.underwriting.occupancyRate;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Marketplace</h1>
          <p className="mt-2 text-white/70 max-w-xl">
            Browse mobile home parks with full financial transparency. Every listing includes
            verified T-12 data and underwriting metrics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by name, city, or state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted hidden sm:block" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-card text-muted border border-border hover:border-primary/30"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted mb-6">
          Showing {filtered.length} of {parks.length} listings
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((park) => (
              <ParkCard key={park.id} park={park} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted">No parks match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
