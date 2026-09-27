"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { formatDuration, formatIDR } from "@/lib/pricing";
import type { LineItem, RentalDuration } from "@/types/workspace";

interface PriceSummaryProps {
  lineItems: LineItem[];
  monthlySubtotal: number;
  estimatedTotal: number;
  duration: RentalDuration;
  defaultExpanded?: boolean;
}

export function PriceSummary({
  lineItems,
  monthlySubtotal,
  estimatedTotal,
  duration,
  defaultExpanded = false,
}: PriceSummaryProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const listId = useId();
  const count = lineItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-2xl bg-canvas p-4">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={listId}
        disabled={lineItems.length === 0}
        className="flex w-full items-center justify-between gap-2 text-left text-sm text-muted disabled:cursor-default"
      >
        <span>
          {count === 0 ? "No items yet" : `${count} ${count === 1 ? "item" : "items"} in your setup`}
        </span>
        {lineItems.length > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-forest">
            {expanded ? "Hide" : "Show"} breakdown
            <ChevronDown className={`size-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && lineItems.length > 0 && (
          <motion.div
            id={listId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
              {lineItems.map((item) => (
                <li key={item.product.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-ink">
                    {item.product.name}
                    {item.quantity > 1 && <span className="text-muted"> × {item.quantity}</span>}
                  </span>
                  <span className="tabular-nums text-muted">{formatIDR(item.monthlyTotal)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <dl className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Monthly subtotal</dt>
          <dd className="font-medium tabular-nums text-ink" data-testid="monthly-subtotal">
            {formatIDR(monthlySubtotal)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Duration</dt>
          <dd className="text-ink">{formatDuration(duration)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3 pt-1">
          <dt className="font-medium text-ink">Estimated total</dt>
          <dd className="font-display text-2xl tabular-nums text-ink" data-testid="estimated-total">
            {formatIDR(estimatedTotal)}
          </dd>
        </div>
      </dl>
      <p className="mt-2 text-[11px] leading-snug text-subtle">
        Prototype pricing in illustrative IDR. Not live inventory or official rates.
      </p>
    </div>
  );
}
