"use client";

import { Minus, Plus } from "lucide-react";
import { getProduct } from "@/data/products";
import { formatIDR } from "@/lib/pricing";
import { useWorkspaceStore } from "@/store/workspace-store";

export function MonitorQuantityStepper() {
  const quantity = useWorkspaceStore((state) => state.monitorQuantity);
  const setQuantity = useWorkspaceStore((state) => state.setMonitorQuantity);
  const product = getProduct("single-monitor");
  const max = product.maxQuantity ?? 1;

  const buttonClass =
    "flex size-8 items-center justify-center rounded-full border border-line-strong bg-surface text-ink transition hover:border-forest disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex items-center justify-between gap-3 border-t border-line bg-sage-tint/60 px-3 py-2.5">
      <p className="text-sm text-muted">
        Screens <span className="text-subtle">· {formatIDR(product.monthlyPrice)} each</span>
      </p>
      <div className="flex items-center gap-2" role="group" aria-label="Number of monitors">
        <button
          type="button"
          className={buttonClass}
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Remove one monitor"
        >
          <Minus className="size-3.5" aria-hidden="true" />
        </button>
        <output className="w-6 text-center text-sm font-semibold tabular-nums text-ink" aria-live="polite">
          {quantity}
        </output>
        <button
          type="button"
          className={buttonClass}
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity >= max}
          aria-label="Add one monitor"
        >
          <Plus className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
