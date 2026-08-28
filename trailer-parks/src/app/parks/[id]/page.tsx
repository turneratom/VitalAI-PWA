import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Home,
  Calendar,
  Ruler,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Percent,
  BarChart3,
} from "lucide-react";
import { FinancialChart } from "@/components/FinancialChart";
import { StatCard } from "@/components/StatCard";
import { getParkById, getLoansByPark, parks } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return parks.map((park) => ({ id: park.id }));
}

export default async function ParkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const park = getParkById(id);

  if (!park) notFound();

  const loans = getLoansByPark(park.id);
  const { financials, underwriting } = park;
  const opEx = financials.operatingExpenses;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">{park.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-white/70">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {park.location}
            </span>
            <span className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              {park.lotCount} lots ({park.occupiedLots} occupied)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Built {park.yearBuilt}
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              {park.acres} acres
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Asking Price"
            value={park.askingPrice > 0 ? formatCurrency(park.askingPrice) : "Portfolio"}
            icon={DollarSign}
          />
          <StatCard
            label="Cap Rate"
            value={park.underwriting.capRate > 0 ? formatPercent(park.underwriting.capRate) : "N/A"}
            subtext={park.askingPrice > 0 ? "Based on T-12 NOI" : "Portfolio — not priced"}
            icon={Percent}
            trend={park.underwriting.capRate > 0 ? "up" : undefined}
          />
          <StatCard
            label="Net Operating Income"
            value={formatCurrency(financials.netOperatingIncome)}
            subtext="Trailing 12 months"
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            label="Occupancy"
            value={formatPercent(underwriting.occupancyRate)}
            subtext={`${park.occupiedLots} of ${park.lotCount} lots`}
            icon={BarChart3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-3">Property Overview</h2>
              <p className="text-sm text-muted leading-relaxed">{park.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {park.amenities.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/5 text-xs font-medium text-primary"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* NOI Chart */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-1">
                Trailing 12-Month NOI
              </h2>
              <p className="text-sm text-muted mb-4">Monthly net operating income trend</p>
              <FinancialChart data={financials.trailing12Months} type="noi" />
            </div>

            {/* Revenue vs Expenses */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-1">
                Revenue vs. Expenses
              </h2>
              <p className="text-sm text-muted mb-4">Monthly breakdown</p>
              <FinancialChart data={financials.trailing12Months} type="revenue-expenses" />
            </div>

            {/* Income Statement */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                T-12 Income Statement
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium text-navy">Gross Potential Rent</td>
                      <td className="py-2.5 text-right font-semibold">
                        {formatCurrency(financials.grossPotentialRent)}
                      </td>
                    </tr>
                    <tr className="border-b border-border text-muted">
                      <td className="py-2.5 pl-4">Less: Vacancy Loss</td>
                      <td className="py-2.5 text-right">
                        ({formatCurrency(financials.vacancyLoss)})
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium text-navy">Effective Gross Income</td>
                      <td className="py-2.5 text-right font-semibold">
                        {formatCurrency(financials.effectiveGrossIncome)}
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2.5">Other Income</td>
                      <td className="py-2.5 text-right">{formatCurrency(financials.otherIncome)}</td>
                    </tr>
                    <tr className="border-b border-border bg-primary/5">
                      <td className="py-2.5 font-bold text-navy">Total Revenue</td>
                      <td className="py-2.5 text-right font-bold">
                        {formatCurrency(financials.totalRevenue)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pt-4 pb-2 font-medium text-navy">
                        Operating Expenses
                      </td>
                    </tr>
                    {Object.entries(opEx).map(([key, value]) => (
                      <tr key={key} className="border-b border-border text-muted">
                        <td className="py-2 pl-4 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                        <td className="py-2 text-right">{formatCurrency(value)}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-border bg-red-50">
                      <td className="py-2.5 font-bold text-navy">Total OpEx</td>
                      <td className="py-2.5 text-right font-bold text-red-700">
                        ({formatCurrency(financials.totalOpEx)})
                      </td>
                    </tr>
                    <tr className="bg-sky-50">
                      <td className="py-3 font-bold text-navy text-base">Net Operating Income</td>
                      <td className="py-3 text-right font-bold text-teal-700 text-base">
                        {formatCurrency(financials.netOperatingIncome)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Underwriting */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-4">
                Underwriting Metrics
              </h3>
              <dl className="space-y-3 text-sm">
                {[
                  ["Cap Rate", formatPercent(underwriting.capRate)],
                  ["Price / Lot", formatCurrency(underwriting.pricePerLot)],
                  ["Price / Pad", formatCurrency(underwriting.pricePerPad)],
                  ["Expense Ratio", formatPercent(underwriting.expenseRatio)],
                  ["Pad Rent", formatCurrency(park.padRent) + "/mo"],
                  ["DSCR", underwriting.debtServiceCoverage.toFixed(2) + "x"],
                  ["Break-Even Occ.", formatPercent(underwriting.breakEvenOccupancy)],
                  ["Projected IRR", formatPercent(underwriting.projectedIRR)],
                  ["Cash-on-Cash", formatPercent(underwriting.cashOnCash)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-semibold text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/analysts"
                className="mt-4 block w-full text-center px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                Run Full Underwriting
              </Link>
            </div>

            {/* Owner info */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-2">Listed By</h3>
              <p className="text-sm font-medium text-navy">{park.ownerName}</p>
              <p className="text-xs text-muted mt-1">Verified owner since 2024</p>
            </div>

            {/* Financing */}
            {loans.length > 0 && (
              <div className="bg-card rounded-xl p-6 card-shadow border border-border">
                <h3 className="font-display text-lg font-bold text-navy mb-4">
                  Available Financing
                </h3>
                <div className="space-y-3">
                  {loans.map((loan) => (
                    <div key={loan.id} className="p-3 rounded-lg bg-background border border-border">
                      <p className="text-sm font-semibold text-navy">{loan.bankName}</p>
                      <div className="mt-1 flex justify-between text-xs text-muted">
                        <span>{formatCurrency(loan.loanAmount)}</span>
                        <span>{loan.interestRate}% · {loan.termYears}yr</span>
                      </div>
                      <span
                        className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          loan.status === "approved"
                            ? "bg-sky-100 text-sky-900"
                            : loan.status === "funded"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/banks"
                  className="mt-4 block w-full text-center px-4 py-2.5 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary/5 transition-colors"
                >
                  View Lender Options
                </Link>
              </div>
            )}

            {/* Quick actions */}
            <div className="bg-accent/10 rounded-xl p-6 border border-accent/30">
              <p className="text-sm font-semibold text-navy mb-1">No fees on this deal</p>
              <p className="text-xs text-muted mb-4">
                Mobile Home Parks charges zero listing, buyer, or success fees.
              </p>
              <Link
                href="/buyers"
                className="block w-full text-center px-4 py-2.5 bg-accent hover:bg-accent-light text-navy text-sm font-semibold rounded-lg transition-colors"
              >
                Request Full Data Room
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
