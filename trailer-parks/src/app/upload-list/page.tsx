"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function UploadListPage() {
  const [file, setFile] = useState<File | null>(null);
  const [paste, setPaste] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    filename: string;
    approximateRows: number;
    emailed: boolean;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      if (file) form.append("file", file);
      if (paste.trim()) form.append("paste", paste.trim());
      if (notes.trim()) form.append("notes", notes.trim());

      if (!file && !paste.trim()) {
        setError("Choose a CSV/Excel file or paste your list below.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/upload-list", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }
      setResult({
        filename: data.filename,
        approximateRows: data.approximateRows ?? 0,
        emailed: !!data.emailed,
      });
      setFile(null);
      setPaste("");
    } catch {
      setError("Network error. You can also drag the file into the Cursor chat.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-navy text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
            List Intake
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Send your owner list
          </h1>
          <p className="mt-3 text-white/70">
            Upload CSV/Excel or paste contacts. A copy goes to{" "}
            <strong className="text-white">{siteConfig.team.bradley.email}</strong> and into the
            Trailer Parks intake queue for merging with the 16,973 public parks.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Three ways */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-accent/40 bg-accent/10">
            <MessageSquare className="w-5 h-5 text-navy mb-2" />
            <p className="text-sm font-semibold text-navy">Best: Cursor chat</p>
            <p className="text-xs text-muted mt-1">
              Drag the file into this chat. The agent merges it immediately.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <Upload className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-semibold text-navy">This page</p>
            <p className="text-xs text-muted mt-1">Upload or paste below. Email + queue.</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <Mail className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-semibold text-navy">Email</p>
            <p className="text-xs text-muted mt-1">
              Send to{" "}
              <a className="text-primary font-medium" href={`mailto:${siteConfig.team.bradley.email}?subject=Owner%20list%20for%20Trailer%20Parks`}>
                {siteConfig.team.bradley.email}
              </a>{" "}
              subject: &quot;Owner list for Trailer Parks&quot;
            </p>
          </div>
        </div>

        {result ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h2 className="font-display text-2xl font-bold text-navy">List received</h2>
            <p className="text-sm text-muted mt-2">
              <strong>{result.filename}</strong>
              {result.approximateRows ? ` · ~${result.approximateRows.toLocaleString()} rows` : ""}
              {result.emailed ? " · emailed to you" : ""}
            </p>
            <p className="text-sm text-muted mt-3 max-w-md mx-auto">
              For fastest processing, also drag that same file into the Cursor chat so the agent can
              merge and prioritize it now.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => setResult(null)}
                className="px-4 py-2.5 border border-border rounded-lg text-sm font-semibold"
              >
                Upload another
              </button>
              <Link
                href="/outreach"
                className="inline-flex items-center justify-center gap-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold"
              >
                Back to outreach
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 card-shadow space-y-5">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) setFile(f);
              }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragOver ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <FileSpreadsheet className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="font-semibold text-navy">Drop CSV / Excel / TXT here</p>
              <p className="text-xs text-muted mt-1">Columns help: park name, owner, phone, email, city, state</p>
              <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-primary-light">
                <Upload className="w-4 h-4" />
                Choose file
                <input
                  type="file"
                  accept=".csv,.txt,.xlsx,.xls,.tsv"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              {file && (
                <p className="mt-3 text-sm text-primary font-medium">
                  Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Or paste list</label>
              <textarea
                value={paste}
                onChange={(e) => setPaste(e.target.value)}
                rows={8}
                placeholder={"Park Name, Owner, Phone, Email, City, State\nSunset Ridge, Jane Doe, 555-0100, jane@..., Phoenix, AZ"}
                className="w-full px-4 py-3 rounded-lg border border-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Notes (optional)</label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Warm leads from Virginia — prioritize these"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-light disabled:opacity-60 text-navy font-bold rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Send list to Trailer Parks
                </>
              )}
            </button>
          </form>
        )}

        <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted">
          <p className="font-semibold text-navy mb-2">About creating a new email address</p>
          <p className="leading-relaxed">
            I can&apos;t spin up a real inbox from here without email hosting. Fastest setup on your
            side: in Google Workspace / Microsoft 365, add an alias{" "}
            <code className="text-xs bg-background px-1 py-0.5 rounded">list@treadcompanies.com</code>{" "}
            that forwards to {siteConfig.team.bradley.email}. Until then, use this upload page, Cursor
            chat, or email {siteConfig.team.bradley.email} directly.
          </p>
        </div>
      </div>
    </div>
  );
}
