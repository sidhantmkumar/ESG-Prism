"use client";

import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

// Mock data shaped EXACTLY like the real backend response — Phase F9 replaces this with the live API call
const mockResult = {
  company: "Tata Motors",
  overall_score: 73,
  environmental: {
    score: 72,
    reasons: [
      "Aiming for Net Zero emissions for passenger vehicles by 2040 and commercial vehicles by 2045, with 51% renewable electricity already achieved in FY26.",
      "Investing in EVs, hydrogen-based solutions, and lightweight materials R&D.",
      "Scope 3 emissions remain very high — roughly 162.3 billion kg CO2e in 2025, mostly from product use.",
      "Weaker performance on terrestrial biodiversity and ocean health metrics.",
    ],
  },
  social: {
    score: 83,
    reasons: [
      "Comprehensive Human Rights Policy aligned with international standards.",
      "Active gender equality and inclusion initiatives, including programs for transgender and differently-abled employees.",
      "Large-scale community programs — vocational training across 112 ITIs and women's empowerment initiatives reaching 1000+ women.",
    ],
  },
  governance: {
    score: 63,
    reasons: [
      "Strong adherence to the Tata Code of Conduct, with GRI-standard reporting externally assured by KPMG.",
      "Robust supplier and dealer sustainability governance frameworks in place.",
      "The 2016 Cyrus Mistry boardroom dispute raised real concerns about promoter influence and board independence, drawing SEBI scrutiny.",
    ],
  },
  risk_level: "Medium",
  top_risks: [
    "High Scope 3 emissions, particularly from the use of sold products, threatening net-zero targets.",
    "Historical governance concerns tied to promoter influence and board independence.",
    "Weaker environmental stewardship on biodiversity and ocean health versus peers.",
  ],
  recommendations: {
    environmental: [
      "Disclose a clear roadmap for cutting Scope 3 emissions via EV adoption and hydrogen solutions.",
    ],
    social: [
      "Expand vocational and community programs with stronger long-term impact tracking.",
    ],
    governance: [
      "Share concrete updates on board independence safeguards post-Mistry controversy.",
    ],
  },
  next_steps: [
    "Request updates on governance reforms since the Mistry dispute.",
    "Clarify Scope 3 emissions reduction timeline.",
    "Request biodiversity and ocean health action plans.",
  ],
  verdict: "CONDITIONAL",
  verdict_reason:
    "Strong social and environmental commitments, but Scope 3 emissions and past governance concerns warrant monitoring.",
  sources_used: [
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHixOFckkPxoAvF4ruG1hinMGYdrTZoPXrjCoxmP4jYpWzACpo4Nc7xaMnnCOCKVUMa7m6nRlLFp4M1WXR7niG5Pz8ldHo_DSOim0RFXBPvS3JCDgNf3WtBs-jVoFtmbYHVE9-NvuQROK3sY0aXkEPCZQ0CzoENggpRaF0QuMhTetph6iHMkwNxf4ZvZJeQoyfAfAVJj5O9JJDl5NUSSMQnYfUnJGB86Dz4RZZsu2wAZEs=",
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzKmFfXH7qvm145eAyDeQPGZqbc5hCPblHyIQYYhGZMpOBMBM036hAjsRwNY4h4bm91fJnTbh5BtSkzyT8SLBcefp7dqxAHqwaATZQOuA1G4DsSJhMkCqZPaw4xTVF_pKEws5v_F82ku2I-mPqKQR86ca4G9OoBjnczoe9qJucBYTVBa8g0u9DWc0ZhDgK806xT3k_6eoS6Rdf4pAxR_FgdELpD8G8KI85hUU9oMoN2DQO84qjd3iI9ZMA-Mef1uw=",
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHA5c5aTY3rveVP-fThf1PHZmR-ezJfIRUtwcUbmvHcDkiHZfbLBAxZLGWEx1izsi0fmZeX0Kx2v947aNKNDwAR5hKtqpLF3Xz1FX9SmxsKybUS0b7O2wcQ5rvprpzSkRUt0MM3wwEeAaexJGlg1RE1Fg1Z8hvAuHX9oyMxqg==",
  ],
};

const verdictConfig: Record<
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

const riskLevelConfig: Record<string, { text: string; bg: string; border: string }> = {
  Low: { text: "text-verdict-green", bg: "bg-verdict-green-bg", border: "border-verdict-green/30" },
  Medium: { text: "text-verdict-amber", bg: "bg-verdict-amber-bg", border: "border-verdict-amber/30" },
  High: { text: "text-verdict-orange", bg: "bg-verdict-orange-bg", border: "border-verdict-orange/30" },
  Critical: { text: "text-verdict-red", bg: "bg-verdict-red-bg", border: "border-verdict-red/30" },
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
        <circle cx="42" cy="42" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
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
        <text x="42" y="47" textAnchor="middle" fontSize="20" fontWeight="500" fill="#E8EAED" fontFamily="var(--font-data)">
          {score}
        </text>
      </svg>
      <p className="mt-3 text-sm text-text-secondary font-body tracking-wide">{label}</p>
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

// Reusable card for E/S/G "why this score" explanations
function ExplainCard({ label, score, reasons }: { label: string; score: number; reasons: string[] }) {
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
          <li key={i} className="text-xs text-text-secondary font-body leading-relaxed flex gap-2">
            <span className="text-text-tertiary shrink-0">•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Results() {
  const verdict = verdictConfig[mockResult.verdict];
  const riskBadge = riskLevelConfig[mockResult.risk_level];
  const reportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const recGroups = [
    { key: "environmental", label: "Environmental" },
    { key: "social", label: "Social" },
    { key: "governance", label: "Governance" },
  ] as const;

const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#0B0D10",
        scale: 2,
        onclone: (clonedDoc) => {
          // html2canvas can't parse modern oklch/oklab colors that Tailwind v4 generates.
          // Force every element in the cloned snapshot to plain hex/rgb colors before capture.
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
      pdf.save(`${mockResult.company.replace(/\s+/g, "_")}_ESG_Report.pdf`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 flex flex-col items-center">
      <div ref={reportRef} className="w-full max-w-3xl">
        {/* Company name header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-semibold text-text-primary">
            {mockResult.company}
          </h1>
          <span
            className={`text-xs font-body px-3 py-1 rounded-full border ${riskBadge.border} ${riskBadge.bg} ${riskBadge.text}`}
          >
            {mockResult.risk_level} risk
          </span>
        </div>

        {/* Verdict banner */}
        <div className={`flex items-center gap-4 rounded-xl border ${verdict.border} ${verdict.bg} px-6 py-4 mb-6`}>
          <div className="flex-1">
            <p className={`font-body font-semibold text-base ${verdict.text}`}>{verdict.label}</p>
            <p className="text-text-secondary text-sm font-body mt-0.5">{mockResult.verdict_reason}</p>
          </div>
          <p className="font-data text-3xl text-text-primary shrink-0">
            {mockResult.overall_score}
            <span className="text-sm text-text-tertiary">/100</span>
          </p>
        </div>

        {/* Gauges */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Gauge label="Environmental" score={mockResult.environmental.score} />
          <Gauge label="Social" score={mockResult.social.score} />
          <Gauge label="Governance" score={mockResult.governance.score} />
        </div>

        {/* Explainable AI — why each score */}
        <section className="mb-10">
          <SectionLabel>Why these scores</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExplainCard label="Environmental" score={mockResult.environmental.score} reasons={mockResult.environmental.reasons} />
            <ExplainCard label="Social" score={mockResult.social.score} reasons={mockResult.social.reasons} />
            <ExplainCard label="Governance" score={mockResult.governance.score} reasons={mockResult.governance.reasons} />
          </div>
        </section>

        {/* Risks + Recommendations side by side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <SectionLabel>Top Risks</SectionLabel>
            <div className="space-y-3">
              {mockResult.top_risks.map((risk, i) => (
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
                  style={{ borderLeftWidth: "3px", borderLeftColor: "#34D399" }}
                >
                  <p className="text-xs text-accent font-body mb-1.5">{group.label}</p>
                  <div className="space-y-1.5">
                    {mockResult.recommendations[group.key].map((rec, i) => (
                      <p key={i} className="text-sm text-text-primary font-body">
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
            {mockResult.next_steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 flex-1">
                <span className="font-data text-xs text-accent shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-text-primary font-body">{step}</span>
              </div>
            ))}
          </div>
        </section>

       {/* Sources */}
<section className="mb-8">
  <SectionLabel>
    Sources ({mockResult.sources_used.length})
  </SectionLabel>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {mockResult.sources_used.map((src, i) => (
      <a
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

{/* Download PDF — outside the ref so it's not captured in the export */}
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