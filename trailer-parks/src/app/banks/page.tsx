"use client";

import Link from "next/link";
import {
  Landmark,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  TrendingUp,
  FileCheck,
  Shield,
  ArrowRight,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { loanOffers, parks, platformStats } from "@/lib/data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";

const statusConfig = {
  pending: { label: "Pending Review", icon: Clock, className: "bg-amber-100 text-amber-800" },
  approved: { label: "Approved", icon: CheckCircle, className: "bg-sky-100 text-sky-900" },
  declined: { label: "Declined", icon: XCircle, className: "bg-red-100 text-red-800" },
  funded: { label: "Funded", icon: DollarSign, className: "bg-blue-100 text-blue-800" },
};

export default function BanksPage() {
  const totalPipeline = loanOffers.reduce((sum, l) => sum + l.loanAmount, 0);
  const approvedLoans = loanOffers.filter((l) => l.status === "approved" || l.status === "funded");
  const avgRate = loanOffers.reduce((sum, l) => sum + l.interestRate, 0) / loanOffers.length;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Landmark className="w-8 h-8 text-accent" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Lender Portal</h1>
          </div>
          <p className="text-white/70 max-w-xl">
            Review pre-vetted MHP deals with verified financials. Deploy capital faster with
            standardized underwriting and direct borrower access.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Pipeline"
            value={formatCurrency(totalPipeline)}
            icon={DollarSign}
          />
          <StatCard
            label="Loans Approved"
            value={String(approvedLoans.length)}
            icon={FileCheck}
            trend="up"
          />
          <StatCard
            label="Avg. Rate"
            value={formatPercent(avgRate)}
            icon={TrendingUp}
          />
          <StatCard
            label="Capital Deployed"
            value={formatCurrency(platformStats.capitalDeployed)}
            icon={Landmark}
            subtext="Platform lifetime"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Loan pipeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                Loan Pipeline
              </h2>
              <div className="space-y-4">
                {loanOffers.map((loan) => {
                  const status = statusConfig[loan.status];
                  const StatusIcon = status.icon;
                  const park = parks.find((p) => p.id === loan.parkId);

                  return (
                    <div
                      key={loan.id}
                      className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-navy">{loan.parkName}</p>
                          <p className="text-xs text-muted mt-0.5">{loan.bankName}</p>
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
                            status.className
                          )}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-[10px] text-muted uppercase">Loan Amount</p>
                          <p className="font-semibold text-navy">{formatCurrency(loan.loanAmount)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted uppercase">Rate</p>
                          <p className="font-semibold text-navy">{loan.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted uppercase">LTV</p>
                          <p className="font-semibold text-navy">{loan.ltv}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted uppercase">DSCR</p>
                          <p className="font-semibold text-navy">{loan.dscr.toFixed(2)}x</p>
                        </div>
                      </div>
                      {park && (
                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                          <div className="text-xs text-muted">
                            {park.lotCount} lots · {formatPercent(park.underwriting.occupancyRate)} occ. ·{" "}
                            {formatPercent(park.underwriting.capRate)} cap
                          </div>
                          <Link
                            href={`/parks/${park.id}`}
                            className="text-xs font-semibold text-primary hover:text-primary-light inline-flex items-center gap-1"
                          >
                            View Deal
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deal flow */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                Available Deals for Lending
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 pr-4 font-medium text-muted">Property</th>
                      <th className="py-2 px-2 font-medium text-muted">Price</th>
                      <th className="py-2 px-2 font-medium text-muted">NOI</th>
                      <th className="py-2 px-2 font-medium text-muted">DSCR</th>
                      <th className="py-2 px-2 font-medium text-muted">Cap</th>
                      <th className="py-2 pl-2 font-medium text-muted">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parks.map((park) => (
                      <tr key={park.id} className="border-b border-border hover:bg-primary/5">
                        <td className="py-3 pr-4">
                          <Link
                            href={`/parks/${park.id}`}
                            className="font-medium text-navy hover:text-primary"
                          >
                            {park.name}
                          </Link>
                        </td>
                        <td className="py-3 px-2">{formatCurrency(park.askingPrice)}</td>
                        <td className="py-3 px-2">
                          {formatCurrency(park.financials.netOperatingIncome)}
                        </td>
                        <td className="py-3 px-2 font-semibold">
                          {park.underwriting.debtServiceCoverage.toFixed(2)}x
                        </td>
                        <td className="py-3 px-2 text-primary font-semibold">
                          {formatPercent(park.underwriting.capRate)}
                        </td>
                        <td className="py-3 pl-2">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-[10px] font-semibold uppercase",
                              park.status === "active"
                                ? "bg-sky-100 text-sky-900"
                                : park.status === "under_contract"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                            )}
                          >
                            {park.status.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join as lender */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Landmark className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-navy mb-2">
                Join as a Lender
              </h3>
              <p className="text-sm text-muted mb-4">
                Access pre-vetted MHP deals with standardized financials. No referral fees or
                platform charges.
              </p>
              <button
                type="button"
                className="w-full px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                Register Your Institution
              </button>
            </div>

            {/* Lender benefits */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Lender Benefits
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Pre-vetted deal flow",
                  "Standardized T-12 financials",
                  "Built-in DSCR calculations",
                  "Direct borrower access",
                  "Zero platform fees",
                  "Analyst-reviewed underwriting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lending criteria */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-4">
                Typical Lending Criteria
              </h3>
              <dl className="space-y-3 text-sm">
                {[
                  ["Min. DSCR", "1.25x"],
                  ["Max LTV", "75%"],
                  ["Min. Occupancy", "85%"],
                  ["Min. Lot Count", "30 lots"],
                  ["Loan Terms", "20–30 years"],
                  ["Rate Range", "5.5% – 7.5%"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-semibold text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-accent/10 rounded-xl p-6 border border-accent/30 text-center">
              <p className="text-sm font-semibold text-navy mb-1">No Referral Fees</p>
              <p className="text-xs text-muted">
                Lenders pay zero platform fees. Deals flow directly from verified listings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
