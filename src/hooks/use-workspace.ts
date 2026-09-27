"use client";

import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { getEstimatedTotal, getLineItems, getMonthlySubtotal } from "@/lib/pricing";
import { getWorkspaceTitle, isConfigurationComplete } from "@/lib/workspace-utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { WorkspaceConfiguration } from "@/types/workspace";

export function useWorkspaceConfiguration(): WorkspaceConfiguration {
  return useWorkspaceStore(
    useShallow((state) => ({
      deskId: state.deskId,
      chairId: state.chairId,
      monitorId: state.monitorId,
      monitorQuantity: state.monitorQuantity,
      accessoryIds: state.accessoryIds,
      duration: state.duration,
      scene: state.scene,
    })),
  );
}

/** All values derived from the current configuration, computed in one place. */
export function useWorkspaceSummary() {
  const configuration = useWorkspaceConfiguration();

  return useMemo(() => {
    const lineItems = getLineItems(configuration);
    const monthlySubtotal = getMonthlySubtotal(lineItems);
    return {
      configuration,
      lineItems,
      monthlySubtotal,
      estimatedTotal: getEstimatedTotal(monthlySubtotal, configuration.duration),
      itemCount: lineItems.reduce((count, item) => count + item.quantity, 0),
      isComplete: isConfigurationComplete(configuration),
      title: getWorkspaceTitle(configuration),
    };
  }, [configuration]);
}

/** Restores the saved configuration after mount to keep SSR markup stable. */
export function useHydrateWorkspaceStore() {
  useEffect(() => {
    void useWorkspaceStore.persist.rehydrate();
  }, []);
}
