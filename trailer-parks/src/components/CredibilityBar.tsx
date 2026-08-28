import { siteConfig } from "@/lib/site";

export function CredibilityBar() {
  return (
    <div className="bg-primary/5 border-y border-primary/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">MH</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">{siteConfig.name}</p>
              <p className="text-xs text-muted">{siteConfig.tagline}</p>
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
