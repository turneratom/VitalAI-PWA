"use client";

import Link from "next/link";
import {
  Building2,
  CheckCircle,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
} from "lucide-react";
import { platformStats } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { LeadForm } from "@/components/LeadForm";
import { CredibilityBar } from "@/components/CredibilityBar";
import { siteConfig } from "@/lib/site";

const benefits = [
  {
    icon: DollarSign,
    title: "$0 Listing Fee",
    description: "List your park completely free. No upfront cost, no hidden charges.",
  },
  {
    icon: DollarSign,
    title: "$0 Success Fee",
    description: "When your park sells, you keep 100% of the proceeds. We never take a cut.",
  },
  {
    icon: Users,
    title: "2,400+ Active Buyers",
    description: "Reach qualified investors actively searching for mobile home parks.",
  },
  {
    icon: TrendingUp,
    title: "Full Financial Tools",
    description: "We help you present T-12 data, underwriting metrics, and lender-ready packages.",
  },
  {
    icon: Shield,
    title: "Verified Network",
    description: "Every buyer, analyst, and lender on the platform is vetted.",
  },
  {
    icon: Building2,
    title: "One Stop Shop",
    description: "Buyers, underwriters, and banks — all connected on one platform.",
  },
];

const steps = [
  { step: "1", title: "Submit Your Park", description: "Fill out a simple form with basic details and financials." },
  { step: "2", title: "We Verify & Publish", description: "Our team reviews and publishes your listing within 24 hours." },
  { step: "3", title: "Buyers Come to You", description: "Qualified buyers, analysts, and lenders reach out directly." },
  { step: "4", title: "Close the Deal", description: "Use our tools to underwrite, finance, and close — fee-free." },
];

export default function ListYourParkPage() {
  return (
    <div className="min-h-screen">
      {/* Hero — optimized for owner recruitment */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-80 h-80 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-sm font-semibold text-accent mb-6">
            <DollarSign className="w-4 h-4" />
            Always Free for Park Owners
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Sell Your Mobile Home Park.
            <br />
            <span className="text-accent">Pay Nothing. Ever.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
            List on Mobile Home Parks — operators of{" "}
            {siteConfig.credentials.spacesOperated} manufactured housing spaces. Reach{" "}
            {formatNumber(2400)}+ qualified buyers with zero listing fees and zero success fees.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-accent" />
              {platformStats.dealsClosed}+ deals closed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-accent" />
              {platformStats.activeLenders} active lenders
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-accent" />
              Avg. 47 days on market
            </span>
          </div>
          <a
            href="#list-form"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-navy font-bold text-lg rounded-xl transition-colors"
          >
            List My Park — Free
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <CredibilityBar />

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy text-center mb-10">
            Why Owners Choose Mobile Home Parks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-xl border border-border bg-card card-shadow">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy mb-2">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + Form */}
      <section id="list-form" className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Steps */}
            <div>
              <h2 className="font-display text-3xl font-bold text-navy mb-8">How It Works</h2>
              <div className="space-y-6">
                {steps.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy">{s.title}</h3>
                      <p className="text-sm text-muted mt-1">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-semibold text-navy mb-2">Compare the cost:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Traditional broker (6% fee on $4M park)</span>
                    <span className="font-semibold text-red-600">-$240,000</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Mobile Home Parks</span>
                    <span className="font-bold text-primary">$0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead capture form */}
            <div className="bg-card rounded-2xl p-8 card-shadow-lg border border-border sticky top-24">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-8">
            Join {platformStats.dealsClosed}+ Deals Closed on Mobile Home Parks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold text-accent">{platformStats.totalListings}</p>
              <p className="text-sm text-white/60 mt-1">Active Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">
                {formatCurrency(platformStats.totalValue).replace(".00", "")}
              </p>
              <p className="text-sm text-white/60 mt-1">Total Value</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{platformStats.activeLenders}</p>
              <p className="text-sm text-white/60 mt-1">Active Lenders</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">$0</p>
              <p className="text-sm text-white/60 mt-1">Owner Fees</p>
            </div>
          </div>
          <a
            href="#list-form"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-navy font-bold rounded-xl transition-colors"
          >
            List My Park Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
