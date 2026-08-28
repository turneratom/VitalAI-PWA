import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function TreadBadge({ className = "" }: { className?: string }) {
  return (
    <Link
      href={siteConfig.company.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium hover:bg-white/20 transition-colors ${className}`}
    >
      <span className="text-accent font-semibold">Tread Companies</span>
      <span className="text-white/70">— The Experts</span>
      <ExternalLink className="w-3 h-3 text-white/50" />
    </Link>
  );
}

export function TreadCredibilityBar() {
  return (
    <div className="bg-primary/5 border-y border-primary/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">
                Built by{" "}
                <Link
                  href={siteConfig.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light"
                >
                  Tread Companies
                </Link>
              </p>
              <p className="text-xs text-muted">{siteConfig.company.tagline}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="text-center">
              <p className="font-bold text-navy">{siteConfig.credentials.spacesOperated}</p>
              <p className="text-xs text-muted">Spaces operated</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-navy">{siteConfig.credentials.communitiesSold}</p>
              <p className="text-xs text-muted">Communities sold</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-navy">{siteConfig.credentials.dealsClosed}+</p>
              <p className="text-xs text-muted">Platform deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
