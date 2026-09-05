"use client";

import Link from "next/link";
import {
  Users,
  Search,
  FileText,
  Bookmark,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Percent,
  Eye,
} from "lucide-react";
import { ParkCard } from "@/components/ParkCard";
import { StatCard } from "@/components/StatCard";
import { parks, platformStats } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";

export default function BuyersPage() {
  const savedDeals = parks.slice(0, 2);
  const avgCap = platformStats.avgCapRate;
  const avgOcc = platformStats.avgOccupancy;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-accent" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Buyer Portal</h1>
          </div>
          <p className="text-white/70 max-w-xl">
            Access verified financials on every listing. Full T-12 statements, expense breakdowns,
            and underwriting metrics — no buyer fees.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Available Deals"
            value={String(parks.length)}
            icon={Search}
            subtext="Full financials included"
          />
          <StatCard
            label="Total Pipeline"
            value={formatCurrency(platformStats.totalValue)}
            icon={DollarSign}
          />
          <StatCard
            label="Avg. Cap Rate"
            value={formatPercent(avgCap)}
            icon={Percent}
            trend="up"
          />
          <StatCard
            label="Avg. Occupancy"
            value={formatPercent(avgOcc)}
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deal pipeline */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-navy">Available Deals</h2>
                <Link
                  href="/marketplace"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {parks.slice(0, 4).map((park) => (
                  <ParkCard key={park.id} park={park} />
                ))}
              </div>
            </div>

            {/* Financial comparison table */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border overflow-x-auto">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                Deal Comparison
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4 font-medium text-muted">Property</th>
                    <th className="py-2 px-2 font-medium text-muted">Price</th>
                    <th className="py-2 px-2 font-medium text-muted">Cap</th>
                    <th className="py-2 px-2 font-medium text-muted">NOI</th>
                    <th className="py-2 px-2 font-medium text-muted">Occ.</th>
                    <th className="py-2 pl-2 font-medium text-muted">$/Lot</th>
                  </tr>
                </thead>
                <tbody>
                  {parks.map((park) => (
                    <tr key={park.id} className="border-b border-border hover:bg-primary/5">
                      <td className="py-3 pr-4">
                        <Link href={`/parks/${park.id}`} className="font-medium text-navy hover:text-primary">
                          {park.name}
                        </Link>
                        <p className="text-xs text-muted">{park.city}, {park.state}</p>
                      </td>
                      <td className="py-3 px-2 font-semibold">{formatCurrency(park.askingPrice)}</td>
                      <td className="py-3 px-2 text-primary font-semibold">
                        {formatPercent(park.underwriting.capRate)}
                      </td>
                      <td className="py-3 px-2">{formatCurrency(park.financials.netOperatingIncome)}</td>
                      <td className="py-3 px-2">{formatPercent(park.underwriting.occupancyRate)}</td>
                      <td className="py-3 pl-2">{formatCurrency(park.underwriting.pricePerLot)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved deals */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-accent" />
                Saved Deals
              </h3>
              <div className="space-y-3">
                {savedDeals.map((park) => (
                  <Link
                    key={park.id}
                    href={`/parks/${park.id}`}
                    className="block p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors"
                  >
                    <p className="text-sm font-semibold text-navy">{park.name}</p>
                    <div className="mt-1 flex justify-between text-xs text-muted">
                      <span>{formatCurrency(park.askingPrice)}</span>
                      <span>{formatPercent(park.underwriting.capRate)} cap</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* What you get */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Every Listing Includes
              </h3>
              <ul className="space-y-2.5 text-sm text-muted">
                {[
                  "Verified T-12 income statement",
                  "Detailed expense breakdown",
                  "Trailing 12-month charts",
                  "Standardized underwriting metrics",
                  "Occupancy history",
                  "Available financing options",
                  "Direct owner contact",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Eye className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* No fees CTA */}
            <div className="bg-accent/10 rounded-xl p-6 border border-accent/30 text-center">
              <p className="font-display text-lg font-bold text-navy mb-1">$0 Buyer Fees</p>
              <p className="text-xs text-muted mb-4">
                Browse, analyze, and close deals without paying platform fees.
              </p>
              <Link
                href="/marketplace"
                className="block w-full px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                Start Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
