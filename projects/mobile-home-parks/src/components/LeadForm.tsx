"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/site";

function LeadFormInner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? undefined;
  const utmSource = searchParams.get("utm_source") ?? undefined;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") || undefined,
      parkName: fd.get("parkName"),
      location: fd.get("location"),
      lotCount: fd.get("lotCount"),
      askingPrice: fd.get("askingPrice") || undefined,
      notes: fd.get("notes") || undefined,
      source: utmSource ?? "direct",
      referrer: ref,
    };

    try {
      let ok = false;
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) ok = true;
      } catch {
        /* static host — no API */
      }

      if (!ok) {
        // Browser FormSubmit fallback (works on GitHub Pages)
        const formData = new FormData();
        formData.append("name", String(payload.name));
        formData.append("email", String(payload.email));
        formData.append("phone", String(payload.phone || ""));
        formData.append("park_name", String(payload.parkName));
        formData.append("location", String(payload.location));
        formData.append("lot_count", String(payload.lotCount));
        formData.append("asking_price", String(payload.askingPrice || ""));
        formData.append("notes", String(payload.notes || ""));
        formData.append("source", String(payload.source || ""));
        formData.append("referrer", String(payload.referrer || ""));
        formData.append("_subject", `Owner Lead: ${payload.parkName} — ${payload.location}`);
        formData.append("_captcha", "false");
        formData.append("_template", "table");

        const fsRes = await fetch(
          `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.team.bradley.email)}`,
          {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
          }
        );
        if (!fsRes.ok) {
          setError("Submission failed. Email brad@treadcompanies.com directly.");
          return;
        }
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-sky-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-navy mb-2">
          You&apos;re on the list!
        </h3>
        <p className="text-muted text-sm leading-relaxed">
          We&apos;ll reach out within 24 hours — a {siteConfig.company.name} expert will be in
          touch. No fees, no obligations.
        </p>
        <Link
          href="/marketplace"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light"
        >
          Browse existing listings
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <h3 className="font-display text-2xl font-bold text-navy mb-1">
        List Your Park Free
      </h3>
      <p className="text-sm text-muted mb-6">Takes 2 minutes. We handle the rest.</p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Your Name *</label>
          <input
            required
            name="name"
            type="text"
            placeholder="John Smith"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Email *</label>
          <input
            required
            name="email"
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Phone</label>
          <input
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Park Name *</label>
          <input
            required
            name="parkName"
            type="text"
            placeholder="Sunset Ridge MHP"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Location *</label>
          <input
            required
            name="location"
            type="text"
            placeholder="Phoenix, AZ"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Lot Count *</label>
            <input
              required
              name="lotCount"
              type="number"
              min="1"
              placeholder="85"
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Asking Price</label>
            <input
              name="askingPrice"
              type="number"
              placeholder="4200000"
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Tell us about your park</label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Occupancy, amenities, reason for selling..."
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3.5 bg-accent hover:bg-accent-light disabled:opacity-60 text-navy font-bold rounded-xl transition-colors text-base flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit — $0 Cost"
          )}
        </button>
        <p className="text-[11px] text-muted text-center">
          No fees. No obligation. We never share your info without permission.
        </p>
      </form>
    </>
  );
}

export function LeadForm() {
  return (
    <Suspense fallback={<div className="py-8 text-center text-sm text-muted">Loading form...</div>}>
      <LeadFormInner />
    </Suspense>
  );
}
