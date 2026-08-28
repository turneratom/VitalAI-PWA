"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Eye,
  MessageSquare,
  Upload,
  CheckCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { ParkCard } from "@/components/ParkCard";
import { StatCard } from "@/components/StatCard";
import { getParksByOwner } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";

const ownerParks = getParksByOwner("owner-demo");

export default function OwnersPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalViews = 1247;
  const totalInquiries = 34;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-accent" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Owner Portal</h1>
          </div>
          <p className="text-white/70 max-w-xl">
            List your mobile home park for free. Reach qualified buyers, analysts, and lenders
            — with zero fees, ever.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submitted && (
          <div className="mb-6 p-4 rounded-lg bg-sky-50 border border-sky-200 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-sky-600" />
            <div>
              <p className="text-sm font-semibold text-sky-900">Listing submitted!</p>
              <p className="text-xs text-teal-700">
                Our team will review your submission within 24 hours. No fees apply.
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Your Listings" value={String(ownerParks.length)} icon={Building2} />
          <StatCard label="Total Views" value={formatNumber(totalViews)} icon={Eye} trend="up" subtext="+18% this month" />
          <StatCard label="Inquiries" value={String(totalInquiries)} icon={MessageSquare} trend="up" subtext="+5 this week" />
          <StatCard
            label="Fees Paid"
            value="$0"
            icon={DollarSign}
            subtext="Always free"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Listings */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-navy">Your Listings</h2>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                <Plus className="w-4 h-4" />
                List New Park
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ownerParks.map((park) => (
                <ParkCard key={park.id} park={park} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* List form or CTA */}
            {showForm ? (
              <div className="bg-card rounded-xl p-6 card-shadow border border-border">
                <h3 className="font-display text-lg font-bold text-navy mb-4">List Your Park</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1">Park Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sunset Ridge MHP"
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1">Location</label>
                    <input
                      required
                      type="text"
                      placeholder="City, State"
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1">Lot Count</label>
                      <input
                        required
                        type="number"
                        placeholder="85"
                        className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1">Asking Price</label>
                      <input
                        required
                        type="number"
                        placeholder="4200000"
                        className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your park..."
                      className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light"
                    >
                      Submit Listing
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2.5 border border-border text-sm font-medium rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-card rounded-xl p-6 card-shadow border border-border text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy mb-2">
                  Ready to Sell?
                </h3>
                <p className="text-sm text-muted mb-4">
                  List your park in minutes. Upload financials and reach thousands of qualified
                  buyers — completely free.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="w-full px-4 py-2.5 bg-accent hover:bg-accent-light text-navy text-sm font-semibold rounded-lg transition-colors"
                >
                  List Your Park — $0
                </button>
              </div>
            )}

            {/* Benefits */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-4">Why List Here?</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Zero listing fees — ever",
                  "Verified buyer network",
                  "Built-in financial reporting",
                  "Direct lender connections",
                  "Professional underwriting included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-display text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Market Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Avg. days on market</span>
                  <span className="font-semibold text-navy">47 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Avg. cap rate</span>
                  <span className="font-semibold text-navy">7.6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Active buyers</span>
                  <span className="font-semibold text-navy">2,400+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
