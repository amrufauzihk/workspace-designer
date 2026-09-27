"use client";

import { useShallow } from "zustand/react/shallow";
import {
  areQuickActionsAvailable,
  canAddScreen,
  getQuickActionState,
  QUICK_ACTIONS,
  type QuickActionCommand,
  type QuickActionDefinition,
  type QuickActionState,
} from "@/lib/quick-actions";
import { useWorkspaceStore } from "@/store/workspace-store";

export type QuickAction = QuickActionDefinition & QuickActionState;

/** Contextual add/remove shortcuts, driven by the same store actions as the product cards. */
export function useQuickActions() {
  const state = useWorkspaceStore(
    useShallow((store) => ({
      deskId: store.deskId,
      monitorId: store.monitorId,
      monitorQuantity: store.monitorQuantity,
      accessoryIds: store.accessoryIds,
      toggleMonitor: store.toggleMonitor,
      toggleAccessory: store.toggleAccessory,
      setMonitorQuantity: store.setMonitorQuantity,
    })),
  );

  const actions: QuickAction[] = QUICK_ACTIONS.map((definition) => ({
    ...definition,
    ...getQuickActionState(definition.id, state),
  }));

  const run = (command: QuickActionCommand) => {
    if (command.type === "toggleMonitor") state.toggleMonitor(command.id);
    else state.toggleAccessory(command.id);
  };

  return {
    available: areQuickActionsAvailable(state),
    actions,
    run,
    canAddScreen: canAddScreen(state),
    addScreen: () => state.setMonitorQuantity(state.monitorQuantity + 1),
  };
}
