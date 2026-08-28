import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChartBar,
  DollarSign,
  Landmark,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { ParkCard } from "@/components/ParkCard";
import { StatCard } from "@/components/StatCard";
import { CredibilityBar } from "@/components/CredibilityBar";
import { parks, platformStats } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { formatCurrency, formatPercent } from "@/lib/utils";

const roles = [
  {
    icon: Building2,
    title: "Park Owners",
    description: "List your mobile home park for free. Reach qualified buyers, analysts, and lenders instantly.",
    href: "/owners",
    cta: "List Your Park",
  },
  {
    icon: Users,
    title: "Buyers & Investors",
    description: "Access verified financials, T-12 statements, and underwriting metrics on every listing.",
    href: "/buyers",
    cta: "Browse Deals",
  },
  {
    icon: ChartBar,
    title: "Analysts",
    description: "Professional underwriting tools, DCF models, and sensitivity analysis — built for MHP.",
    href: "/analysts",
    cta: "Start Underwriting",
  },
  {
    icon: Landmark,
    title: "Banks & Lenders",
    description: "Review pre-vetted deals, access borrower financials, and deploy capital faster.",
    href: "/banks",
    cta: "Join as Lender",
  },
];

const features = [
  {
    icon: DollarSign,
    title: "Zero Fees",
    description: "No listing fees. No buyer fees. No success fees. We believe deals should keep more value in your pocket.",
  },
  {
    icon: Shield,
    title: "Verified Financials",
    description: "Every listing includes audited T-12 data, expense breakdowns, and standardized underwriting metrics.",
  },
  {
    icon: Zap,
    title: "One Stop Shop",
    description: "From listing to closing — owners, buyers, analysts, and lenders collaborate on a single platform.",
  },
];

export default function HomePage() {
  const featuredParks = [
    ...parks.filter((p) => p.ownerId === "owner-demo"),
    ...parks.filter((p) => p.status === "active" && p.ownerId !== "owner-demo"),
  ].slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-light rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {siteConfig.name} — The Experts
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up animate-delay-100">
              List. Analyze.{" "}
              <span className="text-accent">Close.</span>
              <br />
              No Fees. Ever.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
              The one stop shop for mobile home park transactions — operators of{" "}
              {siteConfig.credentials.spacesOperated} spaces with{" "}
              {siteConfig.credentials.communitiesSold} communities sold. Owners list for free.
              Buyers access full financials. Banks deploy capital.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light text-navy font-semibold rounded-lg transition-colors"
              >
                Browse Marketplace
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/owners"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 font-semibold rounded-lg transition-colors"
              >
                List Your Park Free
              </Link>
            </div>
          </div>

          {/* Platform stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up animate-delay-400">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold">{platformStats.totalListings}</p>
              <p className="text-sm text-white/60 mt-1">Active Listings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold">
                {formatCurrency(platformStats.totalValue).replace(".00", "")}
              </p>
              <p className="text-sm text-white/60 mt-1">Total Value Listed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold">{platformStats.dealsClosed}</p>
              <p className="text-sm text-white/60 mt-1">Deals Closed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-bold">{platformStats.activeLenders}</p>
              <p className="text-sm text-white/60 mt-1">Active Lenders</p>
            </div>
          </div>
        </div>
      </section>

      <CredibilityBar />

      {/* Role cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy">
              Built for Every Stakeholder
            </h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              Whether you own, buy, analyze, or finance — Mobile Home Parks connects the entire MHP
              ecosystem with zero friction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <Link
                key={role.title}
                href={role.href}
                className="group p-6 rounded-xl border border-border bg-card card-shadow hover:card-shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <role.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy mb-2">{role.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{role.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-primary-light">
                  {role.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center px-4">
                <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy">Featured Listings</h2>
              <p className="mt-2 text-muted">Verified financials on every deal</p>
            </div>
            <Link
              href="/marketplace"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredParks.map((park) => (
              <ParkCard key={park.id} park={park} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              View All Listings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-hero text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Ready to Transact?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Join {platformStats.dealsClosed}+ deals closed on the only fee-free MHP marketplace.
            List your park or start browsing today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/owners"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-accent hover:bg-accent-light text-navy font-semibold rounded-lg transition-colors"
            >
              List Your Park — Free
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 font-semibold rounded-lg transition-colors"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
