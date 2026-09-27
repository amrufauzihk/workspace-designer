"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DESK_IDS, getProduct } from "@/data/products";
import { getScene } from "@/data/scenes";
import { useWorkspaceSummary } from "@/hooks/use-workspace";
import { formatIDR } from "@/lib/pricing";
import { getMonitorScreenCount } from "@/lib/workspace-utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import { getSceneMarkers } from "./illustrations/scene-geometry";
import { WorkspaceScene } from "./illustrations/WorkspaceScene";
import { ProductImage } from "./ProductImage";
import { PreviewHotspots } from "./QuickActions";

function PreviewToast() {
  const announcement = useWorkspaceStore((state) => state.announcement);
  const [dismissedId, setDismissedId] = useState<number | null>(null);

  useEffect(() => {
    if (!announcement) return;
    const timeout = window.setTimeout(() => setDismissedId(announcement.id), 2200);
    return () => window.clearTimeout(timeout);
  }, [announcement]);

  const visible = announcement !== null && announcement.id !== dismissedId;

  return (
    <div className="pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4" aria-hidden="true">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 rounded-full bg-ink/85 py-1.5 pl-1.5 pr-3.5 text-xs font-medium text-white shadow-soft backdrop-blur sm:text-sm"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-white/15">
              {announcement.tone === "removed" ? <Minus className="size-3" /> : <Check className="size-3" />}
            </span>
            {announcement.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WorkspacePreview() {
  const { configuration, lineItems } = useWorkspaceSummary();
  const showLabels = useWorkspaceStore((state) => state.showLabels);
  const screenCount = getMonitorScreenCount(configuration);

  const markers = getSceneMarkers({
    productIds: lineItems.map((item) => item.product.id),
    screenCount,
    monitorVariant: configuration.monitorId === "dual-monitor" ? "dual" : "single",
  });
  const sceneName = getScene(configuration.scene).name;

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-line bg-sand sm:rounded-3xl">
      <WorkspaceScene
        configuration={configuration}
        className="absolute inset-0 size-full"
        label={`Live workspace preview, ${sceneName}`}
      />

      {showLabels && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <AnimatePresence>
            {markers.map((marker, index) => (
              <motion.span
                key={marker.productId}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="absolute flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-forest shadow-soft ring-1 ring-forest/15 sm:size-6 sm:text-xs"
                style={{ left: `${marker.left}%`, top: `${marker.top}%` }}
              >
                {index + 1}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showLabels && <PreviewHotspots screenCount={screenCount} />}

      <PreviewToast />

      <AnimatePresence>{!configuration.deskId && <EmptyStateCard />}</AnimatePresence>
    </div>
  );
}

const DESKS = DESK_IDS.map((id) => ({ ...getProduct(id), id }));

/** Lets people place their first desk straight from the empty room. */
function EmptyStateCard() {
  const selectDesk = useWorkspaceStore((state) => state.selectDesk);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute inset-x-3 bottom-3 rounded-xl border border-line bg-surface/95 p-2.5 shadow-soft backdrop-blur sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[29rem] sm:-translate-x-1/2 sm:p-4"
    >
      <div className="flex items-baseline justify-between gap-3 px-0.5">
        <p className="text-sm font-semibold text-ink">Your studio is empty</p>
        <p className="hidden text-xs text-muted sm:block">Start with a desk. The room fills as you choose.</p>
        <p className="text-xs text-muted sm:hidden">Start with a desk</p>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-3" role="group" aria-label="Place a desk">
        {DESKS.map((desk) => (
          <button
            key={desk.id}
            type="button"
            onClick={() => selectDesk(desk.id)}
            aria-label={`Place the ${desk.name}, ${formatIDR(desk.monthlyPrice)} per month`}
            className="group flex items-center gap-2.5 rounded-lg border border-line bg-canvas p-1.5 pr-2.5 text-left transition hover:border-forest hover:bg-sage-tint"
          >
            <span className="relative hidden aspect-[4/3] w-14 shrink-0 overflow-hidden rounded-md bg-sand sm:block">
              <ProductImage src={desk.image} className="size-full" />
            </span>
            <span className="min-w-0 flex-1 pl-1 sm:pl-0" aria-hidden="true">
              <span className="block truncate text-[13px] font-semibold leading-tight text-ink">{desk.name}</span>
              <span className="block truncate text-[11px] leading-tight text-muted tabular-nums sm:text-xs">
                {formatIDR(desk.monthlyPrice)}/mo
              </span>
            </span>
            <Plus
              className="size-4 shrink-0 text-muted transition group-hover:text-forest"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
