"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useStepNavigation } from "@/hooks/use-step-navigation";

export function StepNavigation() {
  const { previous, canContinue, blocker, nextLabel, goNext, goBack } = useStepNavigation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {previous && (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-ink transition hover:border-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </button>
        )}
        <button
          type="button"
          onClick={goNext}
          disabled={!canContinue}
          aria-describedby={blocker ? "step-blocker" : undefined}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-medium text-white transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-muted"
        >
          {nextLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      {blocker && (
        <p id="step-blocker" className="text-center text-xs text-muted">
          {blocker}
        </p>
      )}
    </div>
  );
}
