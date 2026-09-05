"use client";

import Link from "next/link";
import { ExternalLink, Download, Pin, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Owner recruitment (share)", href: "/list-your-park?ref=bradley" },
  { label: "Outreach command center", href: "/outreach" },
  { label: "Upload private list", href: "/upload-list" },
  { label: "Outreach playbook", href: "/resources/owners" },
  { label: "Marketplace", href: "/marketplace" },
];

const downloads = [
  { label: "Full owner prospect list (16,973)", href: "/downloads/owner-prospects.csv" },
  { label: "Full list JSON", href: "/downloads/owner-prospects.json" },
  { label: "Wave 1 — Sun Belt (9,112)", href: "/downloads/campaigns/wave1-sunbelt.csv" },
  { label: "Wave 2 — Southeast (1,441)", href: "/downloads/campaigns/wave2-southeast.csv" },
  { label: "Wave 3 — Midwest (3,089)", href: "/downloads/campaigns/wave3-midwest.csv" },
  { label: "Association emails", href: "/downloads/campaigns/association-emails.txt" },
];

function CopyLink({ url }: { url: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
      className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
    >
      {ok ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {ok ? "Copied" : "Copy"}
    </button>
  );
}

export default function LinksPage() {
  const origin = typeof window !== "undefined" ? window.location.origin : siteConfig.url;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            <Pin className="w-4 h-4" />
            Pinned — bookmark this page
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Key links & downloads</h1>
          <p className="mt-3 text-white/70">
            Everything you need in one place. Contact: {siteConfig.team.bradley.email}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section className="bg-card border border-border rounded-xl p-6 card-shadow">
          <h2 className="font-display text-xl font-bold text-navy mb-4">Website pages</h2>
          <ul className="space-y-3">
            {siteLinks.map((item) => {
              const full = `${origin}${item.href}`;
              return (
                <li
                  key={item.href}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-border last:border-0"
                >
                  <Link href={item.href} className="font-medium text-navy hover:text-primary inline-flex items-center gap-1">
                    {item.label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <div className="flex items-center gap-3">
                    <code className="text-xs text-muted break-all">{full}</code>
                    <CopyLink url={full} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="bg-card border border-border rounded-xl p-6 card-shadow">
          <h2 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            CSV & data downloads
          </h2>
          <ul className="space-y-3">
            {downloads.map((item) => {
              const full = `${origin}${item.href}`;
              return (
                <li
                  key={item.href}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-border last:border-0"
                >
                  <a href={item.href} className="font-medium text-navy hover:text-primary inline-flex items-center gap-1">
                    {item.label}
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <CopyLink url={full} />
                </li>
              );
            })}
          </ul>
        </section>

        <section className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-sm">
          <p className="font-semibold text-navy mb-1">Also saved in the repo</p>
          <p className="text-muted">
            <code className="text-xs bg-white px-1 py-0.5 rounded">trailer-parks/PINNED-LINKS.md</code>
            {" · "}
            <a href="/PINNED-LINKS.md" className="text-primary font-medium">
              /PINNED-LINKS.md
            </a>
            {" · "}
            GitHub: turneratom/VitalAI-PWA
          </p>
        </section>
      </div>
    </div>
  );
}
