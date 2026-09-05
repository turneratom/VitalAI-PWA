"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChartBar,
  Calculator,
  Download,
  ArrowRight,
  TrendingUp,
  Percent,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { parks } from "@/lib/data";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";

export default function AnalystsPage() {
  const [selectedPark, setSelectedPark] = useState(parks[0].id);
  const [purchasePrice, setPurchasePrice] = useState(parks[0].askingPrice);
  const [ltv, setLtv] = useState(70);
  const [interestRate, setInterestRate] = useState(6.75);
  const [termYears, setTermYears] = useState(25);
  const [rentGrowth, setRentGrowth] = useState(3);
  const [exitCap, setExitCap] = useState(7.5);

  const park = parks.find((p) => p.id === selectedPark) ?? parks[0];
  const noi = park.financials.netOperatingIncome;

  const loanAmount = purchasePrice * (ltv / 100);
  const equity = purchasePrice - loanAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const annualDebtService = monthlyPayment * 12;
  const dscr = noi / annualDebtService;
  const capRate = (noi / purchasePrice) * 100;
  const cashFlow = noi - annualDebtService;
  const cashOnCash = (cashFlow / equity) * 100;

  const year5Noi = noi * Math.pow(1 + rentGrowth / 100, 5);
  const exitValue = year5Noi / (exitCap / 100);
  const totalReturn = exitValue - purchasePrice + cashFlow * 5;
  const irr = (Math.pow(exitValue / purchasePrice, 1 / 5) - 1) * 100 + cashOnCash * 0.3;

  const sensitivityMatrix = [-1, -0.5, 0, 0.5, 1].map((capDelta) => {
    const adjustedCap = exitCap + capDelta;
    const adjustedExit = year5Noi / (adjustedCap / 100);
    const adjustedReturn = ((adjustedExit - purchasePrice + cashFlow * 5) / equity) * 100;
    return { capRate: adjustedCap, return: adjustedReturn };
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <ChartBar className="w-8 h-8 text-accent" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Analyst Workbench</h1>
          </div>
          <p className="text-white/70 max-w-xl">
            Professional MHP underwriting tools. DCF models, sensitivity analysis, and
            standardized metrics — built for mobile home park deals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Output metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Cap Rate" value={formatPercent(capRate)} icon={Percent} />
          <StatCard
            label="DSCR"
            value={dscr.toFixed(2) + "x"}
            icon={Calculator}
            trend={dscr >= 1.25 ? "up" : "down"}
            subtext={dscr >= 1.25 ? "Meets threshold" : "Below 1.25x"}
          />
          <StatCard label="Cash-on-Cash" value={formatPercent(cashOnCash)} icon={DollarSign} trend="up" />
          <StatCard label="Projected IRR" value={formatPercent(irr)} icon={TrendingUp} trend="up" />
          <StatCard label="Year 5 Exit" value={formatCurrency(exitValue)} icon={ChartBar} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Underwriting model */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property selector */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                Select Property
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {parks.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPark(p.id);
                      setPurchasePrice(p.askingPrice);
                    }}
                    className={cn(
                      "text-left p-3 rounded-lg border transition-colors",
                      selectedPark === p.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <p className="text-sm font-semibold text-navy">{p.name}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {p.city}, {p.state} · {formatCurrency(p.askingPrice)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Assumptions */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                Underwriting Assumptions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Purchase Price", value: purchasePrice, setter: setPurchasePrice, min: 500000, max: 15000000, step: 50000, prefix: "$" },
                  { label: "LTV (%)", value: ltv, setter: setLtv, min: 50, max: 85, step: 5, prefix: "" },
                  { label: "Interest Rate (%)", value: interestRate, setter: setInterestRate, min: 4, max: 10, step: 0.25, prefix: "" },
                  { label: "Term (Years)", value: termYears, setter: setTermYears, min: 10, max: 30, step: 5, prefix: "" },
                  { label: "Rent Growth (%)", value: rentGrowth, setter: setRentGrowth, min: 0, max: 8, step: 0.5, prefix: "" },
                  { label: "Exit Cap (%)", value: exitCap, setter: setExitCap, min: 5, max: 12, step: 0.25, prefix: "" },
                ].map((input) => (
                  <div key={input.label}>
                    <div className="flex justify-between mb-1">
                      <label className="text-xs font-medium text-muted">{input.label}</label>
                      <span className="text-xs font-semibold text-navy">
                        {input.prefix === "$" ? formatCurrency(input.value) : input.value + (input.prefix === "" && input.label.includes("%") ? "%" : input.prefix === "" && input.label.includes("Years") ? " yr" : input.prefix === "" ? "%" : "")}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={input.min}
                      max={input.max}
                      step={input.step}
                      value={input.value}
                      onChange={(e) => input.setter(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sensitivity analysis */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-1">
                Exit Cap Sensitivity
              </h2>
              <p className="text-sm text-muted mb-4">
                5-year total return at various exit cap rates (holding {formatPercent(rentGrowth)} rent growth)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 text-left font-medium text-muted">Exit Cap</th>
                      <th className="py-2 text-right font-medium text-muted">Exit Value</th>
                      <th className="py-2 text-right font-medium text-muted">Total Return</th>
                      <th className="py-2 text-right font-medium text-muted">Return on Equity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityMatrix.map((row) => {
                      const ev = year5Noi / (row.capRate / 100);
                      const ret = ev - purchasePrice + cashFlow * 5;
                      const roe = (ret / equity) * 100;
                      const isBase = row.capRate === exitCap;
                      return (
                        <tr
                          key={row.capRate}
                          className={cn(
                            "border-b border-border",
                            isBase && "bg-primary/5 font-semibold"
                          )}
                        >
                          <td className="py-2.5 text-navy">
                            {formatPercent(row.capRate)}
                            {isBase && " (base)"}
                          </td>
                          <td className="py-2.5 text-right">{formatCurrency(ev)}</td>
                          <td className="py-2.5 text-right">{formatCurrency(ret)}</td>
                          <td
                            className={cn(
                              "py-2.5 text-right font-semibold",
                              roe > 0 ? "text-teal-700" : "text-red-600"
                            )}
                          >
                            {formatPercent(roe)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pro forma summary */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                Pro Forma Summary
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["Net Operating Income (T-12)", formatCurrency(noi)],
                      ["Annual Debt Service", `(${formatCurrency(annualDebtService)})`],
                      ["Cash Flow After Debt", formatCurrency(cashFlow)],
                      ["Equity Required", formatCurrency(equity)],
                      ["Loan Amount", formatCurrency(loanAmount)],
                      ["Monthly Payment", formatCurrency(monthlyPayment)],
                      ["Year 5 Projected NOI", formatCurrency(year5Noi)],
                      ["Year 5 Exit Value", formatCurrency(exitValue)],
                      ["5-Year Total Return", formatCurrency(totalReturn)],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-b border-border">
                        <td className="py-2.5 text-muted">{label}</td>
                        <td className="py-2.5 text-right font-semibold text-navy">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* DSCR warning */}
            {dscr < 1.25 && (
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">DSCR Below Threshold</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Current DSCR of {dscr.toFixed(2)}x is below the typical 1.25x lender minimum.
                    Consider adjusting LTV or purchase price.
                  </p>
                </div>
              </div>
            )}

            {/* Quick metrics */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-4">
                Deal Scorecard
              </h3>
              <dl className="space-y-3 text-sm">
                {[
                  ["Property", park.name],
                  ["Location", park.location],
                  ["Lots", `${park.lotCount} (${park.occupiedLots} occ.)`],
                  ["Pad Rent", formatCurrency(park.padRent) + "/mo"],
                  ["Expense Ratio", formatPercent(park.underwriting.expenseRatio)],
                  ["Break-Even Occ.", formatPercent(park.underwriting.breakEvenOccupancy)],
                  ["Price/Lot", formatCurrency(park.underwriting.pricePerLot)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-semibold text-navy text-right max-w-[55%]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Underwriting Model
              </button>
              <Link
                href={`/parks/${park.id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary/5 transition-colors"
              >
                View Full Financials
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-accent/10 rounded-xl p-6 border border-accent/30 text-center">
              <p className="text-sm font-semibold text-navy mb-1">Free Underwriting Tools</p>
              <p className="text-xs text-muted">
                No subscription. No per-deal fees. Professional-grade MHP analysis included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
