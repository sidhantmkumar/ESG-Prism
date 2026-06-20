"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Loading() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasUrl = searchParams.get("hasUrl") === "1";
  const hasPdf = searchParams.get("hasPdf") === "1";

  // Build the step list dynamically based on what was actually submitted
  const steps = useMemo(() => {
    const list = ["Searching web sources..."];
    if (hasUrl) list.push("Reading website content...");
    if (hasPdf) list.push("Extracting PDF data...");
    list.push("Running semantic retrieval...");
    list.push("Calculating ESG scores...");
    list.push("Generating verdict...");
    return list;
  }, [hasUrl, hasPdf]);

  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 9000;
    const stepDuration = totalDuration / steps.length;

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (totalDuration / 100);
        return next >= 100 ? 100 : next;
      });
    }, 100);

    const redirectTimeout = setTimeout(() => {
      router.push("/results");
    }, totalDuration + 500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router, steps.length]);

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <h2 className="font-display text-2xl font-semibold text-text-primary mb-8">
          Analyzing
        </h2>

        <div className="space-y-3 mb-10 text-left">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 font-body text-sm transition-opacity duration-300 ${
                i <= stepIndex ? "opacity-100" : "opacity-30"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  i < stepIndex
                    ? "bg-accent"
                    : i === stepIndex
                    ? "bg-accent animate-pulse"
                    : "bg-text-tertiary"
                }`}
              />
              <span
                className={i <= stepIndex ? "text-text-primary" : "text-text-tertiary"}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full h-1.5 bg-bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 font-data text-xs text-text-tertiary">
          {Math.round(progress)}%
        </p>
      </div>
    </main>
  );
}