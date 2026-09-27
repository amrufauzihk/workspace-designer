"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useId, type ReactNode } from "react";
import { formatIDR } from "@/lib/pricing";
import type { Product } from "@/types/workspace";
import { ProductImage } from "./ProductImage";

export type SelectionMode = "single" | "toggle";

interface ProductCardProps {
  product: Product;
  selected: boolean;
  mode: SelectionMode;
  onSelect: () => void;
  footer?: ReactNode;
}

function actionLabel(mode: SelectionMode, selected: boolean): string {
  if (mode === "single") return selected ? "Selected" : "Select";
  return selected ? "Added" : "Add";
}

export function ProductCard({ product, selected, mode, onSelect, footer }: ProductCardProps) {
  const nameId = useId();
  const detailsId = useId();

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className={`overflow-hidden rounded-2xl border bg-surface transition-[border-color,box-shadow] duration-200 ${
        selected ? "border-forest shadow-soft ring-1 ring-forest" : "border-line hover:border-line-strong"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-labelledby={nameId}
        aria-describedby={detailsId}
        className="flex w-full gap-3 p-3 text-left sm:gap-4"
      >
        <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-28">
          <ProductImage src={product.image} className="size-full" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 id={nameId} className="text-[15px] font-semibold leading-tight text-ink">
                {product.name}
              </h4>
              {product.badge && (
                <span className="mt-1 inline-block rounded-full bg-sage-tint px-2 py-0.5 text-[11px] font-medium text-forest">
                  {product.badge}
                </span>
              )}
            </div>
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition ${
                selected ? "border-forest bg-forest text-white" : "border-line-strong text-muted"
              }`}
              aria-hidden="true"
            >
              {selected ? <Check className="size-3.5" /> : mode === "toggle" ? <Plus className="size-3.5" /> : null}
            </span>
          </div>

          <p id={detailsId} className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-muted">
            {product.description}
            <span className="sr-only">
              . {formatIDR(product.monthlyPrice)} per month.
              {product.availability === "limited" ? " Limited demo availability." : ""}
            </span>
          </p>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <p className="text-sm font-semibold text-ink" aria-hidden="true">
              {formatIDR(product.monthlyPrice)}
              <span className="font-normal text-muted"> /mo</span>
            </p>
            <span
              className={`text-xs font-medium ${selected ? "text-forest" : "text-muted"}`}
              aria-hidden="true"
            >
              {actionLabel(mode, selected)}
            </span>
          </div>
          {product.availability === "limited" && (
            <p className="mt-1 text-[11px] text-subtle" aria-hidden="true">
              Limited demo availability
            </p>
          )}
        </div>
      </button>
      {footer}
    </motion.div>
  );
}
