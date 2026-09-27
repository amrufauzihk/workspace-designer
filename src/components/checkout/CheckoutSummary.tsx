"use client";

import { Pencil } from "lucide-react";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import type { LineItem, WorkspaceConfiguration } from "@/types/workspace";
import { WorkspaceScene } from "../workspace/illustrations/WorkspaceScene";
import { PriceSummary } from "../workspace/PriceSummary";

interface CheckoutSummaryProps {
  title: string;
  configuration: WorkspaceConfiguration;
  lineItems: LineItem[];
  monthlySubtotal: number;
  estimatedTotal: number;
}

export function CheckoutSummary({
  title,
  configuration,
  lineItems,
  monthlySubtotal,
  estimatedTotal,
}: CheckoutSummaryProps) {
  const { goTo } = useStepNavigation();

  return (
    <aside aria-labelledby="checkout-summary-heading" className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-3xl border border-line bg-surface">
        <WorkspaceScene
          configuration={configuration}
          animated={false}
          className="block aspect-[3/2] w-full"
          label={`Preview of ${title}`}
        />
        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Your workspace</p>
              <h3 id="checkout-summary-heading" className="mt-1 font-display text-3xl leading-tight text-ink">
                {title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => goTo("review")}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-forest transition hover:border-forest"
            >
              <Pencil className="size-3" aria-hidden="true" />
              Edit
            </button>
          </div>
          <PriceSummary
            lineItems={lineItems}
            monthlySubtotal={monthlySubtotal}
            estimatedTotal={estimatedTotal}
            duration={configuration.duration}
            defaultExpanded
          />
        </div>
      </div>
    </aside>
  );
}
