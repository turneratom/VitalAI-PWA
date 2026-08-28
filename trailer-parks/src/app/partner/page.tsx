import Link from "next/link";
import {
  Bot,
  Building2,
  Mail,
  ArrowRight,
  CheckCircle,
  Pin,
  Download,
  Handshake,
} from "lucide-react";
import { partner } from "@/lib/partner";
import { siteConfig, withBasePath } from "@/lib/site";

export const metadata = {
  title: `${partner.name} — ${partner.title} | Trailer Parks`,
  description: partner.tagline,
};

const responsibilities = [
  "Build and ship the Trailer Parks product",
  "Owner outreach engine & prospect lists",
  "Lead capture → your inbox",
  "Underwriting, buyer, and lender tools",
  "Keep links, CSVs, and ops pinned and current",
];

const bradOwns = [
  "Recruit park owners",
  "Relationship-driven sales conversations",
  "Industry relationships & Tread brand",
  "Final say on deals and capital partners",
];

export default function PartnerPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="gradient-hero text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            <Handshake className="w-4 h-4 text-accent" />
            Business partners with {siteConfig.company.name}
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
              <Bot className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold">{partner.name}</h1>
              <p className="mt-2 text-xl text-white/80">
                {partner.title}, {partner.company}
              </p>
              <p className="mt-4 text-white/70 max-w-2xl leading-relaxed">{partner.tagline}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${partner.emailFallback}?subject=Re%3A%20Trailer%20Parks%20partnership`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-navy font-semibold rounded-lg"
            >
              <Mail className="w-4 h-4" />
              {partner.email}
            </a>
            <Link
              href="/links"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/30 font-semibold rounded-lg"
            >
              <Pin className="w-4 h-4" />
              Pinned links
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Auto owns
            </h2>
            <ul className="space-y-2">
              {responsibilities.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Bradley owns
            </h2>
            <ul className="space-y-2">
              {bradOwns.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 card-shadow">
            <h2 className="font-display text-xl font-bold text-navy mb-2">Contact</h2>
            <p className="text-sm text-muted mb-4">
              Professional partner address (alias to Bradley until mailbox is live):
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Partner email</dt>
                <dd className="font-semibold text-navy">{partner.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Delivers to</dt>
                <dd className="font-semibold text-navy">{partner.emailFallback}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Company</dt>
                <dd>
                  <a
                    href={siteConfig.company.website}
                    className="font-semibold text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {siteConfig.company.name}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Your links (from Auto)</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/list-your-park?ref=bradley"
                className="inline-flex items-center justify-center gap-1 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg"
              >
                Owner recruitment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={withBasePath("/downloads/owner-prospects.csv")}
                className="inline-flex items-center justify-center gap-1 px-4 py-2.5 border border-primary text-primary text-sm font-semibold rounded-lg"
              >
                <Download className="w-4 h-4" />
                Full CSV (16,973)
              </a>
              <Link
                href="/outreach"
                className="inline-flex items-center justify-center gap-1 px-4 py-2.5 border border-border text-sm font-semibold rounded-lg"
              >
                Outreach HQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
