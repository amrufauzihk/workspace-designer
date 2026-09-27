"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { LineItem } from "@/types/workspace";

interface SelectedItemsProps {
  lineItems: LineItem[];
  numbered?: boolean;
}

/** Compact chip list of the current setup, matching the preview markers. */
export function SelectedItems({ lineItems, numbered = true }: SelectedItemsProps) {
  if (lineItems.length === 0) {
    return <p className="text-sm text-muted">Nothing selected yet. Your picks will appear here.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Items in your workspace">
      <AnimatePresence initial={false}>
        {lineItems.map((item, index) => (
          <motion.li
            key={item.product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 text-sm text-ink"
          >
            {numbered && (
              <span
                className="flex size-5 items-center justify-center rounded-full bg-sage-soft text-[11px] font-semibold text-forest"
                aria-hidden="true"
              >
                {index + 1}
              </span>
            )}
            {item.product.name}
            {item.quantity > 1 && <span className="text-muted">× {item.quantity}</span>}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
