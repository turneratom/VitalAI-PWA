"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageSquare,
  Mail,
  Download,
  MapPin,
  Search,
  Copy,
  ExternalLink,
  CheckCircle,
  Radio,
  Building2,
} from "lucide-react";
import {
  prospects,
  prospectsMeta,
  getUniqueStates,
  buildCallScript,
  buildSmsScript,
  buildEmailBody,
  buildEmailSubject,
  phoneDigits,
  type ProspectPark,
} from "@/lib/prospects";
import { getOwnerRecruitmentUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const WAVES: { id: string; label: string; states: string[] }[] = [
  { id: "wave1", label: "Wave 1 — Sun Belt", states: ["FL", "TX", "AZ", "CA"] },
  { id: "wave2", label: "Wave 2 — Southeast", states: ["NC", "SC", "GA", "TN", "AL", "MS", "LA"] },
  { id: "wave3", label: "Wave 3 — Midwest", states: ["OH", "IN", "MI", "IL", "WI", "MO"] },
  { id: "wave4", label: "Wave 4 — All others", states: [] },
];

function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold border border-border rounded-md hover:bg-primary/5"
    >
      {copied ? <CheckCircle className="w-3 h-3 text-sky-600" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function ProspectRow({
  park,
  link,
  contacted,
  onContact,
}: {
  park: ProspectPark;
  link: string;
  contacted: boolean;
  onContact: () => void;
}) {
  const digits = phoneDigits(park.phone);
  const sms = buildSmsScript(park, link);
  const emailBody = buildEmailBody(park, link);
  const subject = buildEmailSubject(park);
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  const smsLink = `sms:${digits}?body=${encodeURIComponent(sms)}`;

  return (
    <div
      className={cn(
        "p-4 rounded-xl border bg-card",
        contacted ? "border-sky-200 bg-sky-50/40" : "border-border"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-navy">{park.name}</h3>
            {contacted && (
              <span className="text-[10px] uppercase font-bold text-teal-700 bg-sky-100 px-2 py-0.5 rounded-full">
                Contacted
              </span>
            )}
          </div>
          <p className="text-sm text-muted mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {park.address}, {park.city}, {park.state} {park.zip}
          </p>
          <p className="text-xs text-muted mt-1">
            {park.county && `${park.county} County · `}
            {park.size || "Size n/a"}
            {park.units ? ` · ${park.units} units` : ""} · Source: {park.source}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`tel:${digits}`}
            onClick={onContact}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-light"
          >
            <Phone className="w-3.5 h-3.5" />
            Call {park.phone}
          </a>
          <a
            href={smsLink}
            onClick={onContact}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-primary text-primary text-xs font-semibold rounded-lg hover:bg-primary/5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            SMS
          </a>
          <a
            href={mailto}
            onClick={onContact}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-xs font-semibold rounded-lg hover:bg-gray-50"
          >
            <Mail className="w-3.5 h-3.5" />
            Email draft
          </a>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <CopyBtn text={buildCallScript(park)} label="Copy call script" />
        <CopyBtn text={sms} label="Copy SMS" />
        <CopyBtn text={emailBody} label="Copy email" />
      </div>
    </div>
  );
}

export default function OutreachPage() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("ALL");
  const [wave, setWave] = useState("wave1");
  const [contacted, setContacted] = useState<Record<string, boolean>>({});
  const link = getOwnerRecruitmentUrl("bradley-outreach");
  const states = useMemo(() => getUniqueStates(), []);

  const activeWave = WAVES.find((w) => w.id === wave) ?? WAVES[0];

  const filtered = useMemo(() => {
    return prospects.filter((p) => {
      if (wave !== "wave4" && activeWave.states.length && !activeWave.states.includes(p.state)) {
        return false;
      }
      if (wave === "wave4") {
        const covered = new Set(WAVES.flatMap((w) => w.states));
        if (covered.has(p.state)) return false;
      }
      if (state !== "ALL" && p.state !== state) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.county.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, state, wave, activeWave]);

  const contactedCount = Object.values(contacted).filter(Boolean).length;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            <Radio className="w-4 h-4" />
            Owner Notification Engine
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Reach every mobile home park owner
          </h1>
          <p className="mt-3 text-white/70 max-w-3xl">
            {prospectsMeta.totalAvailable.toLocaleString()} open mobile home parks with public phone
            numbers from federal HIFLD open data. {prospectsMeta.count.toLocaleString()} loaded in
            this command center for Wave outreach. Built by {siteConfig.company.name}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/downloads/owner-prospects.csv"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-navy font-semibold rounded-lg text-sm"
            >
              <Download className="w-4 h-4" />
              Download full list ({prospectsMeta.totalAvailable.toLocaleString()} parks CSV)
            </a>
            <a
              href="/downloads/campaigns/wave1-sunbelt.csv"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 font-semibold rounded-lg text-sm"
            >
              Wave 1 dialer CSV (9,112)
            </a>
            <a
              href="/downloads/campaigns/association-emails.txt"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 font-semibold rounded-lg text-sm"
            >
              Association emails
            </a>
            <Link
              href="/list-your-park?ref=bradley-outreach"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 font-semibold rounded-lg text-sm"
            >
              Owner landing page
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-bold text-navy">{prospectsMeta.totalAvailable.toLocaleString()}</p>
            <p className="text-xs text-muted mt-1">Public parks w/ phones</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-bold text-navy">{filtered.length.toLocaleString()}</p>
            <p className="text-xs text-muted mt-1">In current filter</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-bold text-navy">{contactedCount}</p>
            <p className="text-xs text-muted mt-1">Marked contacted (this session)</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-2xl font-bold text-navy">{states.length}</p>
            <p className="text-xs text-muted mt-1">States in this wave set</p>
          </div>
        </div>

        {/* Your link */}
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
          <p className="text-sm font-semibold text-navy mb-2">Link to send every owner</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <code className="flex-1 px-3 py-2 bg-white rounded-lg text-sm break-all border border-border">
              {link}
            </code>
            <CopyBtn text={link} label="Copy link" />
          </div>
        </div>

        {/* Public channels */}
        <section className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-navy mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Public channels to post today
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              {
                title: "Facebook groups",
                body: "Search: Mobile Home Park Owners, MHP Investing, Trailer Park Investors, Manufactured Housing Association groups. Paste the Wave post below.",
              },
              {
                title: "LinkedIn",
                body: `Post from your ${siteConfig.company.name} profile + company page. Tag manufactured housing keywords.`,
              },
              {
                title: "State associations",
                body: "Email Florida MH Association, Texas MH Association, WMA, MHI state affiliates — introduce Trailer Parks as free owner tool.",
              },
              {
                title: "County assessor outreach",
                body: "Use the CSV + county filters. Cross-check ownership on public assessor sites, then call the park phone from HIFLD.",
              },
            ].map((c) => (
              <div key={c.title} className="p-4 rounded-lg bg-background border border-border">
                <p className="font-semibold text-navy">{c.title}</p>
                <p className="text-muted mt-1 text-xs leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-navy text-white">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-sm font-semibold">Ready-to-post announcement</p>
              <CopyBtn
                text={`Park owners: Trailer Parks is a FREE marketplace built by Tread Companies (4,000+ MH spaces operated, 24 communities sold).\n\n$0 listing fee. $0 success fee. Brokers often take 6%.\n\nList your park in 2 minutes:\n${link}\n\nBuyers, analysts, and lenders — one stop shop.`}
                label="Copy post"
              />
            </div>
            <pre className="text-xs text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
              {`Park owners: Trailer Parks is a FREE marketplace built by Tread Companies (4,000+ MH spaces operated, 24 communities sold).

$0 listing fee. $0 success fee. Brokers often take 6%.

List your park in 2 minutes:
${link}

Buyers, analysts, and lenders — one stop shop.`}
            </pre>
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search park, city, county, phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm"
            />
          </div>
          <select
            value={wave}
            onChange={(e) => setWave(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm"
          >
            {WAVES.map((w) => (
              <option key={w.id} value={w.id}>
                {w.label}
              </option>
            ))}
          </select>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm"
          >
            <option value="ALL">All states in wave</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-muted">
          Showing {filtered.length.toLocaleString()} parks · Click Call / SMS to notify · Scripts
          auto-personalize with park name
        </p>

        <div className="space-y-3">
          {filtered.slice(0, 100).map((park) => (
            <ProspectRow
              key={park.id}
              park={park}
              link={link}
              contacted={!!contacted[park.id]}
              onContact={() => setContacted((prev) => ({ ...prev, [park.id]: true }))}
            />
          ))}
        </div>

        {filtered.length > 100 && (
          <p className="text-center text-sm text-muted py-4">
            Showing first 100 of {filtered.length.toLocaleString()}. Narrow by state or download the
            full CSV for dialer/CRM import.
          </p>
        )}
      </div>
    </div>
  );
}
