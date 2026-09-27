"use client";

import { Pencil } from "lucide-react";
import { getProduct } from "@/data/products";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { formatDuration, formatIDR } from "@/lib/pricing";
import type { ConfiguratorStep, LineItem, WorkspaceConfiguration } from "@/types/workspace";

interface ReviewPanelProps {
  title: string;
  configuration: WorkspaceConfiguration;
  lineItems: LineItem[];
}

interface ReviewRow {
  label: string;
  value: string;
  price: string | null;
  step: ConfiguratorStep;
}

export function ReviewPanel({ title, configuration, lineItems }: ReviewPanelProps) {
  const { goTo } = useStepNavigation();
  const priceOf = (id: string) => {
    const item = lineItems.find((line) => line.product.id === id);
    return item ? formatIDR(item.monthlyTotal) : null;
  };

  const monitorItem = lineItems.find((item) => item.product.category === "monitor");
  const accessoryItems = lineItems.filter((item) => item.product.category === "accessory");
  const accessoriesTotal = accessoryItems.reduce((sum, item) => sum + item.monthlyTotal, 0);

  const rows: ReviewRow[] = [
    {
      label: "Desk",
      value: configuration.deskId ? getProduct(configuration.deskId).name : "Not selected",
      price: configuration.deskId ? priceOf(configuration.deskId) : null,
      step: "desk",
    },
    {
      label: "Chair",
      value: configuration.chairId ? getProduct(configuration.chairId).name : "Not selected",
      price: configuration.chairId ? priceOf(configuration.chairId) : null,
      step: "chair",
    },
    {
      label: "Screens",
      value: monitorItem
        ? `${monitorItem.product.name}${monitorItem.quantity > 1 ? ` × ${monitorItem.quantity}` : ""}`
        : "No monitors",
      price: monitorItem ? formatIDR(monitorItem.monthlyTotal) : null,
      step: "personalize",
    },
    {
      label: "Accessories",
      value: accessoryItems.length > 0 ? accessoryItems.map((item) => item.product.name).join(", ") : "None added",
      price: accessoryItems.length > 0 ? formatIDR(accessoriesTotal) : null,
      step: "personalize",
    },
    {
      label: "Duration",
      value: formatDuration(configuration.duration),
      price: null,
      step: "duration",
    },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-line bg-sage-tint/50 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Your configuration</p>
        <p className="mt-1 font-display text-3xl leading-tight text-ink">{title}</p>
      </div>

      <dl className="mt-4 divide-y divide-line">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3 py-3">
            <dt className="w-24 shrink-0 pt-0.5 text-sm text-muted">{row.label}</dt>
            <dd className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{row.value}</p>
              {row.price && <p className="text-xs tabular-nums text-muted">{row.price} /month</p>}
            </dd>
            <button
              type="button"
              onClick={() => goTo(row.step)}
              className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-forest transition hover:bg-sage-tint"
              aria-label={`Edit ${row.label.toLowerCase()}`}
            >
              <Pencil className="size-3" aria-hidden="true" />
              Edit
            </button>
          </div>
        ))}
      </dl>

      <ul className="mt-2 space-y-1 text-xs text-muted">
        <li>• Prices are illustrative prototype estimates in IDR, not official monis.rent rates.</li>
        <li>• Availability is not confirmed. Monis would confirm stock and delivery after an inquiry.</li>
        <li>• Delivery, setup and deposits are not included in this estimate.</li>
      </ul>
    </div>
  );
}
