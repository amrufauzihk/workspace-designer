"use client";

import type { ReactNode } from "react";
import type { Product, ProductId } from "@/types/workspace";
import { ProductCard, type SelectionMode } from "./ProductCard";

interface ProductGridProps<T extends ProductId> {
  products: Product[];
  selectedIds: readonly (T | null)[];
  mode: SelectionMode;
  onSelect: (id: T) => void;
  renderFooter?: (product: Product, selected: boolean) => ReactNode;
  label: string;
}

export function ProductGrid<T extends ProductId>({
  products,
  selectedIds,
  mode,
  onSelect,
  renderFooter,
  label,
}: ProductGridProps<T>) {
  return (
    <ul className="grid gap-3" aria-label={label}>
      {products.map((product) => {
        const selected = selectedIds.includes(product.id as T);
        return (
          <li key={product.id}>
            <ProductCard
              product={product}
              mode={mode}
              selected={selected}
              onSelect={() => onSelect(product.id as T)}
              footer={renderFooter?.(product, selected)}
            />
          </li>
        );
      })}
    </ul>
  );
}
