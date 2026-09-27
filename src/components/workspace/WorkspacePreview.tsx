"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { getScene } from "@/data/scenes";
import { useWorkspaceSummary } from "@/hooks/use-workspace";
import { getMonitorScreenCount } from "@/lib/workspace-utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import { getSceneMarkers } from "./illustrations/scene-geometry";
import { WorkspaceScene } from "./illustrations/WorkspaceScene";

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
  const step = useWorkspaceStore((state) => state.step);
  const setStep = useWorkspaceStore((state) => state.setStep);

  const markers = getSceneMarkers({
    productIds: lineItems.map((item) => item.product.id),
    screenCount: getMonitorScreenCount(configuration),
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

      <PreviewToast />

      <AnimatePresence>
        {!configuration.deskId && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border border-line bg-surface/90 p-3 shadow-soft backdrop-blur sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[26rem] sm:-translate-x-1/2 sm:p-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">Your studio is empty</p>
              <p className="text-xs text-muted sm:text-sm">Start with a desk. The room fills as you choose.</p>
            </div>
            {step !== "desk" && (
              <button
                type="button"
                onClick={() => setStep("desk")}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-forest px-3.5 py-2 text-xs font-medium text-white transition hover:bg-forest-deep sm:text-sm"
              >
                Choose a desk
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
