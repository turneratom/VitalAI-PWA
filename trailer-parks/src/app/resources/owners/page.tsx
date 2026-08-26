"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  CheckCircle,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Copy,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Share2,
} from "lucide-react";
import { platformStats } from "@/lib/data";
import { getOwnerRecruitmentUrl, siteConfig } from "@/lib/site";
import { formatCurrency, formatNumber } from "@/lib/utils";

const { bradley } = siteConfig.team;
const { company, credentials } = siteConfig;

const outreachTemplates = [
  {
    id: "cold-email",
    icon: Mail,
    title: "Cold Email — First Touch",
    subject: "Sell your mobile home park with $0 fees?",
    body: `Hi [Owner Name],

I'm Bradley with Trailer Parks — a free marketplace built by ${company.name}, manufactured housing experts with ${credentials.spacesOperated} spaces operated and ${credentials.communitiesSold} communities sold.

Traditional brokers take 6% on a sale. On a $4M park, that's $240,000 out of your pocket. Trailer Parks charges nothing — no listing fee, no success fee.

When you list, you get:
• Exposure to 2,400+ qualified buyers
• Professional financial presentation tools
• Direct access to lenders and underwriters
• Backed by a team that's done this hundreds of times

It takes 2 minutes to submit your park: ${getOwnerRecruitmentUrl("email")}

Happy to answer any questions — no pressure, no obligation.

Best,
Bradley
${company.name} | ${bradley.email}`,
  },
  {
    id: "follow-up",
    icon: Mail,
    title: "Follow-Up Email (3 days later)",
    subject: "Quick follow-up — listing your park for free",
    body: `Hi [Owner Name],

Following up on Trailer Parks. We're the team behind ${company.name} — we've acquired, operated, and sold manufactured housing communities across the country.

Every listing includes the financial tools buyers and lenders expect: T-12 statements, underwriting metrics, and lender-ready packages. We help you look institutional without paying broker fees.

If you're thinking about selling in the next 12 months, listing now costs nothing and there's no obligation.

Submit here: ${getOwnerRecruitmentUrl("followup")}

Happy to jump on a 10-minute call anytime.

Best,
Bradley
${bradley.email}`,
  },
  {
    id: "text-message",
    icon: MessageSquare,
    title: "Text Message",
    subject: null,
    body: `Hi [Name], Bradley here from ${company.name}. We built a free marketplace for park owners — zero broker fees. We've operated ${credentials.spacesOperated} spaces. If you're thinking about selling [Park Name]: ${getOwnerRecruitmentUrl("sms")}`,
  },
  {
    id: "voicemail",
    icon: Phone,
    title: "Voicemail Script",
    subject: null,
    body: `Hi [Name], this is Bradley with ${company.name} and Trailer Parks. We're manufactured housing experts — ${credentials.spacesOperated} spaces operated, ${credentials.communitiesSold} communities sold — and we built a free marketplace where park owners list with zero fees. No listing fee, no success fee. If you're curious, submit your park in 2 minutes at our website, or call me back at [your number]. My email is ${bradley.email}. Thanks!`,
  },
  {
    id: "facebook",
    icon: Share2,
    title: "Facebook Group Post",
    subject: null,
    body: `Park owners — if you're thinking about selling, check out Trailer Parks. It's a free marketplace built by ${company.name} (${credentials.spacesOperated} spaces operated, ${credentials.communitiesSold} communities sold).

No listing fees, no success fees. Brokers typically charge 6% — on a $4M park that's $240K.

They handle financial presentation, connect you with buyers and lenders, and the team actually knows MHP inside and out.

Listing takes 2 minutes: ${getOwnerRecruitmentUrl("facebook")}`,
  },
];

const objectionHandlers = [
  {
    objection: "I already have a broker.",
    response:
      "Totally understand. Many owners list on Trailer Parks alongside a broker to maximize exposure — and since we're free, there's no conflict. You only pay the broker if they close the deal.",
  },
  {
    objection: "I'm not ready to sell yet.",
    response:
      "No problem at all. Listing is free and there's no obligation. A lot of owners get on the platform 6–12 months before they're ready, just to test the market and see what buyers offer.",
  },
  {
    objection: "How do you make money if it's free?",
    response:
      "We connect the full ecosystem — buyers, analysts, and lenders — and monetize on the professional tools side. Owners and sellers never pay platform fees. That's our promise.",
  },
  {
    objection: "I've never heard of you.",
    response: `Fair question. Trailer Parks is built by ${company.name} — we've operated ${credentials.spacesOperated} manufactured housing spaces and sold ${credentials.communitiesSold} communities. Visit ${company.website.replace("https://www.", "")} or email me at ${bradley.email}. Happy to walk you through it in 10 minutes.`,
  },
];

const targetChannels = [
  { icon: MapPin, title: "Drive the park", detail: "Stop by local parks and leave a card or talk to the manager." },
  { icon: Users, title: "Facebook groups", detail: "Search 'mobile home park owners', 'MHP investing', 'trailer park owners'." },
  { icon: Mail, title: "County records", detail: "Pull park ownership records from county assessor databases." },
  { icon: Building2, title: "Industry events", detail: "MHI Congress, state manufactured housing association meetings." },
  { icon: Phone, title: "Warm introductions", detail: "Ask buyers and lenders on the platform for owner referrals." },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
    >
      <Copy className="w-3.5 h-3.5" />
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function OwnerOutreachPage() {
  const recruitmentLink = getOwnerRecruitmentUrl("bradley");

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            Owner Recruitment Kit
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Your Outreach Playbook
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl">
            Everything you need to recruit park owners. Copy, paste, send. The platform handles
            the rest.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Your link */}
        <section className="bg-accent/10 border border-accent/30 rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold text-navy mb-2">
            Your Link to Share
          </h2>
          <p className="text-sm text-muted mb-4">
            Send this to every owner you talk to. The <code className="text-xs bg-white px-1 py-0.5 rounded">?ref=bradley</code> tag
            tracks leads from your outreach.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <code className="flex-1 px-4 py-3 bg-white rounded-lg text-sm text-navy border border-border break-all">
              {recruitmentLink}
            </code>
            <CopyButton text={recruitmentLink} />
          </div>
          <Link
            href="/list-your-park?ref=bradley"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light"
          >
            Preview the page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Elevator pitch */}
        <section className="bg-card rounded-xl p-6 card-shadow border border-border">
          <h2 className="font-display text-xl font-bold text-navy mb-3">30-Second Pitch</h2>
          <blockquote className="text-muted leading-relaxed border-l-4 border-accent pl-4 italic">
            &ldquo;Trailer Parks is built by {company.name} — manufactured housing experts with{" "}
            {credentials.spacesOperated} spaces operated and {credentials.communitiesSold}{" "}
            communities sold. Owners list for zero dollars — no listing fee, no success fee. We
            connect you with buyers, underwriters, and lenders on one platform. Traditional brokers
            take 6% — on a $4 million park, that&apos;s $240,000. We take nothing.&rdquo;
          </blockquote>
          <div className="mt-3">
            <CopyButton
              text={`Trailer Parks is built by ${company.name} — manufactured housing experts with ${credentials.spacesOperated} spaces operated and ${credentials.communitiesSold} communities sold. Owners list for zero dollars — no listing fee, no success fee. Traditional brokers take 6%. We take nothing. ${getOwnerRecruitmentUrl("bradley")}`}
            />
          </div>
        </section>

        {/* Templates */}
        <section>
          <h2 className="font-display text-xl font-bold text-navy mb-4">Outreach Templates</h2>
          <div className="space-y-4">
            {outreachTemplates.map((template) => (
              <div key={template.id} className="bg-card rounded-xl p-5 card-shadow border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <template.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-navy">{template.title}</h3>
                  </div>
                  <CopyButton text={template.subject ? `Subject: ${template.subject}\n\n${template.body}` : template.body} />
                </div>
                {template.subject && (
                  <p className="text-xs text-muted mb-2">
                    <strong>Subject:</strong> {template.subject}
                  </p>
                )}
                <pre className="text-sm text-muted whitespace-pre-wrap font-sans leading-relaxed">
                  {template.body}
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Objection handlers */}
        <section>
          <h2 className="font-display text-xl font-bold text-navy mb-4">Objection Handlers</h2>
          <div className="space-y-3">
            {objectionHandlers.map((item) => (
              <div key={item.objection} className="bg-card rounded-xl p-5 card-shadow border border-border">
                <p className="text-sm font-semibold text-navy mb-1">
                  &ldquo;{item.objection}&rdquo;
                </p>
                <p className="text-sm text-muted leading-relaxed">{item.response}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where to find owners */}
        <section>
          <h2 className="font-display text-xl font-bold text-navy mb-4">Where to Find Owners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {targetChannels.map((channel) => (
              <div key={channel.title} className="flex gap-3 p-4 bg-card rounded-xl border border-border">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <channel.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{channel.title}</p>
                  <p className="text-xs text-muted mt-0.5">{channel.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats to cite */}
        <section className="bg-navy text-white rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold mb-4">Numbers to Cite</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-accent">{credentials.spacesOperated}</p>
              <p className="text-xs text-white/60 mt-1">Spaces operated</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{credentials.communitiesSold}</p>
              <p className="text-xs text-white/60 mt-1">Communities sold</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{platformStats.activeLenders}</p>
              <p className="text-xs text-white/60 mt-1">Active lenders</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">$0</p>
              <p className="text-xs text-white/60 mt-1">Owner fees</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
