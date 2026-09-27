import { ACCESSORY_IDS, getProduct } from "@/data/products";
import type { LineItem, RentalDuration, WorkspaceConfiguration } from "@/types/workspace";

type PricedConfiguration = Pick<
  WorkspaceConfiguration,
  "deskId" | "chairId" | "monitorId" | "monitorQuantity" | "accessoryIds"
>;

const idrNumberFormat = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

/** Formats an IDR amount as `Rp450.000`. */
export function formatIDR(amount: number): string {
  return `Rp${idrNumberFormat.format(Math.round(amount))}`;
}

export function getMonitorUnits(config: Pick<PricedConfiguration, "monitorId" | "monitorQuantity">): number {
  if (config.monitorId !== "single-monitor") return config.monitorId ? 1 : 0;
  const max = getProduct("single-monitor").maxQuantity ?? 1;
  return Math.min(Math.max(Math.trunc(config.monitorQuantity) || 1, 1), max);
}

/** Line items in a stable display order: desk, chair, monitors, accessories. */
export function getLineItems(config: PricedConfiguration): LineItem[] {
  const items: LineItem[] = [];

  const push = (id: Parameters<typeof getProduct>[0], quantity = 1) => {
    const product = getProduct(id);
    items.push({ product, quantity, monthlyTotal: product.monthlyPrice * quantity });
  };

  if (config.deskId) push(config.deskId);
  if (config.chairId) push(config.chairId);
  if (config.monitorId) push(config.monitorId, getMonitorUnits(config));

  for (const id of ACCESSORY_IDS) {
    if (config.accessoryIds.includes(id)) push(id);
  }

  return items;
}

export function getMonthlySubtotal(items: readonly LineItem[]): number {
  return items.reduce((sum, item) => sum + item.monthlyTotal, 0);
}

/** Estimated rental total. No discounts are applied in this prototype. */
export function getEstimatedTotal(monthlySubtotal: number, duration: RentalDuration): number {
  return monthlySubtotal * duration;
}

export function formatDuration(duration: RentalDuration): string {
  return duration === 1 ? "1 month" : `${duration} months`;
}
