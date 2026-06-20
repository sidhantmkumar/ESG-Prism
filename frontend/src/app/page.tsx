"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [pdfName, setPdfName] = useState<string | null>(null);

 const handleAnalyze = () => {
    if (!company.trim()) return;
    const params = new URLSearchParams({
      company: company.trim(),
      hasUrl: url.trim() ? "1" : "0",
      hasPdf: pdfName ? "1" : "0",
    });
    router.push(`/loading?${params.toString()}`);
    // Phase F9 will wire this to the real backend call
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight leading-tight whitespace-nowrap">
            Know exactly who you&apos;re doing business with.
         </h1>
          <p className="mt-3 text-text-secondary font-body text-base md:text-lg">
            AI-powered ESG due diligence. One search, a clear verdict.
          </p>
        </div>

        {/* Input cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Company name */}
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 shadow-lg shadow-black/20 hover:border-accent/30 transition-all duration-300">
            <label className="text-sm text-text-secondary font-medium uppercase tracking-wider">
              Company name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Tata Steel"
              className="mt-2 w-full bg-transparent text-text-primary font-body text-sm outline-none placeholder:text-text-tertiary"
            />
          </div>

          {/* Website URL */}
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 shadow-lg shadow-black/20 hover:border-accent/30 transition-all duration-300">
            <label className="text-sm text-text-secondary font-medium uppercase tracking-wider">
              Website URL 
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://company.com"
              className="mt-2 w-full bg-transparent text-text-primary font-body text-sm outline-none placeholder:text-text-tertiary"
            />
          </div>

          {/* PDF upload */}
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 shadow-lg shadow-black/20 hover:border-accent/30 transition-all duration-300">
            <label className="text-sm text-text-secondary font-medium uppercase tracking-wider">
              ESG report
            </label>
            <label className="mt-2 flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-tertiary font-body truncate">
                {pdfName ?? "Upload PDF"}
              </span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setPdfName(e.target.files?.[0]?.name ?? null)}
              />
              <span className="text-accent text-xs font-body shrink-0 ml-2">Browse</span>
            </label>
          </div>
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={!company.trim()}
         className="w-full bg-accent text-bg-base font-body font-semibold text-sm py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-accent/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Analyze
        </button>

        <p className="text-center text-text-tertiary text-xs font-body mt-4">
          Provide a company name, or add a URL and report for a deeper read.
        </p>
      </div>
    </main>
  );
}