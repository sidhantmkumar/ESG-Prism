"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const verdictConfig: Record
  string,
  { label: string; text: string; bg: string; border: string }
> = {
  APPROVED: {
    label: "Approved",
    text: "text-verdict-green",
    bg: "bg-verdict-green-bg",
    border: "border-verdict-green/30",
  },
  CONDITIONAL: {
    label: "Approved with conditions",
    text: "text-verdict-amber",
    bg: "bg-verdict-amber-bg",
    border: "border-verdict-amber/30",
  },
  CAUTION: {
    label: "Proceed with caution",
    text: "text-verdict-orange",
    bg: "bg-verdict-orange-bg",
    border: "border-verdict-orange/30",
  },
  REJECTED: {
    label: "Not recommended",
    text: "text-verdict-red",
    bg: "bg-verdict-red-bg",
    border: "border-verdict-red/30",
  },
};

const riskLevelConfig: Record
  string,
  { text: string; bg: string; border: string }
> = {
  Low: {
    text: "text-verdict-green",
    bg: "bg-verdict-green-bg",
    border: "border-verdict-green/30",
  },
  Medium: {
    text: "text-verdict-amber",
    bg: "bg-verdict-amber-bg",
    border: "border-verdict-amber/30",
  },
  High: {
    text: "text-verdict-orange",
    bg: "bg-verdict-orange-bg",
    border: "border-verdict-orange/30",
  },
  Critical: {
    text: "text-verdict-red",
    bg: "bg-verdict-red-bg",
    border: "border-verdict-red/30",
  },
};

function scoreColor(score: number) {
  if (score >= 75) return "#34D399";
  if (score >= 60) return "#FBBF24";
  if (score >= 40) return "#FB923C";
  return "#F87171";
}

function Gauge({ label, score }: { label: string; score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-5 flex flex-col items-center">
      <svg width="84" height="84" viewBox="0 0 84 84">
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 42 42)"
        />
        <text
          x="42"
          y="47"
          textAnchor="middle"
          fontSize="20"
          fontWeight="500"
          fill="#E8EAED"
          fontFamily="var(--font-data)"
        >
          {score}
        </text>
      </svg>
      <p className="mt-3 text-sm text-text-secondary font-body tracking-wide">
        {label}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-text-tertiary font-body uppercase tracking-wide mb-3">
      {children}
    </p>
  );
}

function ExplainCard({
  label,
  score,
  reasons,
}: {
  label: string;
  score: number;
  reasons: string[];
}) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-text-primary font-body font-medium">{label}</p>
        <p className="font-data text-sm" style={{ color: scoreColor(score) }}>
          {score}
        </p>
      </div>
      <ul className="space-y-1.5">
        {reasons.map((r, i) => (
          <li
            key={i}
            className="text-xs text-text-secondary font-body leading-relaxed flex gap-2"
          >
            <span className="text-text-tertiary shrink-0">•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const emptyResult = {
  company: "",
  overall_score: 0,
  environmental: { score: 0, reasons: [] as string[] },
  social: { score: 0, reasons: [] as string[] },
  governance: { score: 0, reasons: [] as string[] },
  risk_level: "Medium",
  top_risks: [] as string[],
  recommendations: {
    environmental: [] as string[],
    social: [] as string[],
    governance: [] as string[],
  },
  next_steps: [] as string[],
  verdict: "CONDITIONAL",
  verdict_reason: "",
  sources_used: [] as string[],
};

export default function Results() {
  const router = useRouter();
  const [result, setResult] = useState(emptyResult);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("esg_result");
    if (!stored) {
      router.push("/");
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.error) {
      setError(parsed.error);
    } else {
      setResult(parsed);
    }
    setPageLoading(false);
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#0B0D10",
        scale: 2,
        onclone: (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll("*");
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computed = window.getComputedStyle(htmlEl);
            htmlEl.style.color = computed.color;
            htmlEl.style.backgroundColor = computed.backgroundColor;
            htmlEl.style.borderColor = computed.borderColor;
          });
        },
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${result.company.replace(/\s+/g, "_")}_ESG_Report.pdf`);
    } finally {
      setExporting(false);
    }
  };

  if (pageLoading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p className="text-text-secondary font-body">Loading results...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-verdict-red font-body text-sm">
          Analysis failed: {error}
        </p>
        <button
          onClick={() => router.push("/")}
          className="text-accent font-body text-sm underline"
        >
          Try again
        </button>
      </main>
    );
  }

  const verdict =
    verdictConfig[result.verdict] ?? verdictConfig["CONDITIONAL"];
  const riskBadge =
    riskLevelConfig[result.risk_level] ?? riskLevelConfig["Medium"];

  const recGroups = [
    { key: "environmental" as const, label: "Environmental" },
    { key: "social" as const, label: "Social" },
    { key: "governance" as const, label: "Governance" },
  ];

  return (
    <main className="min-h-screen px-6 py-10 flex flex-col items-center">
      <div ref={reportRef} className="w-full max-w-3xl">
        {/* Company name header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-semibold text-text-primary">
            {result.company}
          </h1>
          <span
            className={`text-xs font-body px-3 py-1 rounded-full border ${riskBadge.border} ${riskBadge.bg} ${riskBadge.text}`}
          >
            {result.risk_level} risk
          </span>
        </div>

        {/* Verdict banner */}
        <div
          className={`flex items-center gap-4 rounded-xl border ${verdict.border} ${verdict.bg} px-6 py-4 mb-6`}
        >
          <div className="flex-1">
            <p className={`font-body font-semibold text-base ${verdict.text}`}>
              {verdict.label}
            </p>
            <p className="text-text-secondary text-sm font-body mt-0.5">
              {result.verdict_reason}
            </p>
          </div>
          <p className="font-data text-3xl text-text-primary shrink-0">
            {result.overall_score}
            <span className="text-sm text-text-tertiary">/100</span>
          </p>
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Gauge label="Environmental" score={result.environmental.score} />
          <Gauge label="Social" score={result.social.score} />
          <Gauge label="Governance" score={result.governance.score} />
        </div>

        {/* Why these scores */}
        <section className="mb-10">
          <SectionLabel>Why these scores</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExplainCard
              label="Environmental"
              score={result.environmental.score}
              reasons={result.environmental.reasons}
            />
            <ExplainCard
              label="Social"
              score={result.social.score}
              reasons={result.social.reasons}
            />
            <ExplainCard
              label="Governance"
              score={result.governance.score}
              reasons={result.governance.reasons}
            />
          </div>
        </section>

        {/* Risks + Recommendations */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <SectionLabel>Top Risks</SectionLabel>
            <div className="space-y-3">
              {result.top_risks.map((risk, i) => (
                <div
                  key={i}
                  className="bg-verdict-red-bg border border-verdict-red/30 rounded-lg px-4 py-3"
                  style={{ borderLeftWidth: "3px", borderLeftColor: "#F87171" }}
                >
                  <p className="text-sm text-text-primary font-body">{risk}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Recommendations</SectionLabel>
            <div className="space-y-3">
              {recGroups.map((group) => (
                <div
                  key={group.key}
                  className="bg-verdict-green-bg border border-verdict-green/30 rounded-lg px-4 py-3"
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: "#34D399",
                  }}
                >
                  <p className="text-xs text-accent font-body mb-1.5">
                    {group.label}
                  </p>
                  <div className="space-y-1.5">
                    {result.recommendations[group.key].map((rec, i) => (
                      <p
                        key={i}
                        className="text-sm text-text-primary font-body"
                      >
                        {rec}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-10">
          <SectionLabel>Suggested Next Steps</SectionLabel>
          <div className="bg-bg-surface border border-border-subtle rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
            {result.next_steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 flex-1">
                <span className="font-data text-xs text-accent shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-text-primary font-body">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mb-8">
          <SectionLabel>Sources ({result.sources_used.length})</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {result.sources_used.map((src, i) => (
              
                key={i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-surface border border-border-subtle rounded-lg px-4 py-3 hover:border-accent/40 transition-colors"
              >
                <p className="text-xs text-accent font-body mb-1">
                  Source {i + 1}
                </p>
                <p className="text-xs text-text-tertiary font-body truncate">
                  {src}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Download button outside ref */}
      <div className="w-full max-w-3xl">
        <button
          onClick={handleDownloadPDF}
          disabled={exporting}
          className="w-full bg-accent text-bg-base font-body font-semibold text-sm py-3.5 rounded-xl transition-opacity disabled:opacity-50 hover:opacity-90 mb-10"
        >
          {exporting ? "Preparing PDF..." : "Download PDF Report"}
        </button>
      </div>
    </main>
  );
}
