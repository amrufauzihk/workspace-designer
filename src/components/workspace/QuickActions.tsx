"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { getProduct } from "@/data/products";
import { useQuickActions } from "@/hooks/use-quick-actions";
import { formatIDR } from "@/lib/pricing";
import { getAddScreenAnchor, getQuickActionAnchor } from "./illustrations/scene-geometry";

const pop = {
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.85 },
  transition: { duration: 0.2 },
};

/** Add buttons placed where each item will appear. Tablet and desktop only. */
export function PreviewHotspots({ screenCount }: { screenCount: number }) {
  const { available, actions, run, canAddScreen, addScreen } = useQuickActions();
  if (!available) return null;

  const screenAnchor = getAddScreenAnchor(screenCount);
  const screenPrice = formatIDR(getProduct("single-monitor").monthlyPrice);

  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block">
      <AnimatePresence>
        {actions
          .filter((action) => !action.placed)
          .map((action) => {
            const anchor = getQuickActionAnchor(action.id, screenCount);
            return (
              <motion.button
                key={action.id}
                type="button"
                {...pop}
                onClick={() => run(action.command)}
                aria-label={`${action.addLabel}: ${action.product.name}, ${formatIDR(action.product.monthlyPrice)} per month`}
                title={`${action.product.name} · ${formatIDR(action.product.monthlyPrice)}/mo`}
                style={{ left: `${anchor.left}%`, top: `${anchor.top}%` }}
                className={`group pointer-events-auto absolute flex h-8 -translate-y-1/2 ${
                  anchor.align === "end" ? "-translate-x-full" : "-translate-x-1/2"
                } items-center gap-1.5 whitespace-nowrap rounded-full border border-forest/15 bg-surface/95 py-1 pl-1 pr-3 text-xs font-medium text-forest shadow-soft backdrop-blur transition-colors hover:border-forest hover:bg-forest hover:text-white lg:h-9 lg:text-[13px]`}
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-sage-tint text-forest transition-colors group-hover:bg-white/15 group-hover:text-white lg:size-7">
                  <Plus className="size-3.5" aria-hidden="true" />
                </span>
                {action.addLabel}
              </motion.button>
            );
          })}

        {canAddScreen && (
          <motion.button
            key="add-screen"
            type="button"
            {...pop}
            onClick={addScreen}
            aria-label={`Add another screen, ${screenPrice} per month`}
            title={`Add another screen · ${screenPrice}/mo`}
            style={{ left: `${screenAnchor.left}%`, top: `${screenAnchor.top}%` }}
            className="pointer-events-auto absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-dashed border-forest/40 bg-surface/90 text-forest shadow-soft backdrop-blur transition-colors hover:border-solid hover:border-forest hover:bg-forest hover:text-white lg:size-9"
          >
            <Plus className="size-4" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Compact add/remove toggles shown under the preview on phones. */
export function QuickAddToolbar() {
  const { available, actions, run } = useQuickActions();
  if (!available) return null;

  return (
    <div role="group" aria-labelledby="quick-add-label" className="sm:hidden">
      <p id="quick-add-label" className="mb-2 flex items-baseline justify-between text-xs text-muted">
        <span className="font-medium uppercase tracking-[0.14em]">Quick add</span>
        <span className="text-subtle">Tap again to remove</span>
      </p>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => run(action.command)}
            aria-pressed={action.placed}
            aria-label={`${action.shortLabel}, ${action.placed ? action.status : `${formatIDR(action.product.monthlyPrice)} per month`}`}
            className={`flex min-h-12 min-w-0 flex-col justify-center gap-0.5 rounded-xl border px-2.5 py-2 text-left transition ${
              action.placed
                ? "border-forest bg-sage-tint text-forest"
                : "border-line bg-surface text-ink hover:border-line-strong"
            }`}
          >
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded-full ${
                  action.placed ? "bg-forest text-white" : "border border-line-strong text-muted"
                }`}
              >
                {action.placed ? <Check className="size-2.5" /> : <Plus className="size-2.5" />}
              </span>
              <span className="truncate text-[13px] font-semibold leading-tight">{action.shortLabel}</span>
            </span>
            <span className="block truncate text-[11px] leading-tight text-muted tabular-nums" aria-hidden="true">
              {action.placed ? (
                action.status
              ) : (
                <>
                  +{formatIDR(action.product.monthlyPrice)}
                  <span className="max-[359px]:hidden">/mo</span>
                </>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
