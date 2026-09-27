"use client";

import { Check } from "lucide-react";
import { RENTAL_DURATIONS } from "@/data/durations";
import { formatIDR, getEstimatedTotal } from "@/lib/pricing";
import { useWorkspaceStore } from "@/store/workspace-store";

export function RentalDurationSelector({ monthlySubtotal }: { monthlySubtotal: number }) {
  const duration = useWorkspaceStore((state) => state.duration);
  const setDuration = useWorkspaceStore((state) => state.setDuration);

  return (
    <fieldset>
      <legend className="sr-only">Rental duration</legend>
      <div className="grid grid-cols-2 gap-3">
        {RENTAL_DURATIONS.map((option) => {
          const checked = option.value === duration;
          return (
            <label key={option.value} className="relative cursor-pointer">
              <input
                type="radio"
                name="rental-duration"
                value={option.value}
                checked={checked}
                onChange={() => setDuration(option.value)}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 transition peer-checked:border-forest peer-checked:ring-1 peer-checked:ring-forest peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest hover:border-line-strong">
                <span className="flex items-start justify-between gap-2">
                  <span className="font-display text-2xl leading-none text-ink">{option.label}</span>
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                      checked ? "border-forest bg-forest text-white" : "border-line-strong"
                    }`}
                    aria-hidden="true"
                  >
                    {checked && <Check className="size-3" />}
                  </span>
                </span>
                <span className="mt-1 text-xs text-muted">{option.hint}</span>
                <span className="mt-3 text-sm font-semibold text-ink">
                  {monthlySubtotal > 0 ? formatIDR(getEstimatedTotal(monthlySubtotal, option.value)) : "—"}
                </span>
                <span className="text-[11px] text-subtle">estimated total</span>
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-4 rounded-xl bg-sand px-4 py-3 text-xs leading-relaxed text-muted">
        Estimates multiply your monthly subtotal by the number of months. No long-stay discounts are applied in this
        prototype — any real offers would be confirmed by the monis.rent team.
      </p>
    </fieldset>
  );
}
