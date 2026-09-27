"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CONFIGURATOR_SECTION_ID, useStepNavigation } from "@/hooks/use-step-navigation";
import { formatDuration, formatIDR } from "@/lib/pricing";
import type { RentalDuration } from "@/types/workspace";

interface MobileActionBarProps {
  monthlySubtotal: number;
  estimatedTotal: number;
  duration: RentalDuration;
}

/** Sticky summary and primary action for small screens while the configurator is on screen. */
export function MobileActionBar({ monthlySubtotal, estimatedTotal, duration }: MobileActionBarProps) {
  const { step, canContinue, blocker, nextLabel, goNext } = useStepNavigation();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById(CONFIGURATOR_SECTION_ID);
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "0px 0px -35% 0px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const visible = inView && step !== "inquiry";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-lift backdrop-blur lg:hidden"
        >
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs tabular-nums text-muted">
                {formatIDR(monthlySubtotal)}/mo · {formatDuration(duration)}
              </p>
              <p className="truncate text-base font-semibold tabular-nums text-ink">
                {formatIDR(estimatedTotal)}
                <span className="ml-1 text-xs font-normal text-muted">est. total</span>
              </p>
            </div>
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              title={blocker ?? undefined}
              className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-forest px-4 text-sm font-medium text-white transition hover:bg-forest-deep disabled:bg-line-strong disabled:text-muted"
            >
              {blocker ? (blocker.includes("desk") ? "Pick a desk" : "Pick a chair") : nextLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
