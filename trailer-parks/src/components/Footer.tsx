import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">Trailer Parks</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              The leader in mobile home park transactions. No fees. One stop shop for the entire
              deal lifecycle.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/marketplace" className="hover:text-accent transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/resources/owners" className="hover:text-accent transition-colors">
                  Owner Outreach Kit
                </Link>
              </li>
              <li>
                <Link href="/list-your-park" className="hover:text-accent transition-colors">
                  List a Park
                </Link>
              </li>
              <li>
                <Link href="/buyers" className="hover:text-accent transition-colors">
                  For Buyers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Professionals
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/analysts" className="hover:text-accent transition-colors">
                  Underwriting Tools
                </Link>
              </li>
              <li>
                <Link href="/banks" className="hover:text-accent transition-colors">
                  Lender Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
              Our Promise
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Zero listing fees</li>
              <li>Zero buyer fees</li>
              <li>Zero success fees</li>
              <li>Full financial transparency</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Trailer Parks. All rights reserved.
          </p>
          <p className="text-xs text-accent font-medium">
            No fees. Ever. That&apos;s our guarantee.
          </p>
        </div>
      </div>
    </footer>
  );
}
