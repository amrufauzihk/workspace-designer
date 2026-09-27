import { getProduct } from "@/data/products";
import { getMonitorUnits } from "@/lib/pricing";
import type { AccessoryId, MonitorId, Product, WorkspaceConfiguration } from "@/types/workspace";

export type QuickActionId = "monitor" | "lamp" | "plant";

export interface QuickActionDefinition {
  id: QuickActionId;
  /** Product added when the slot is empty. */
  product: Product;
  addLabel: string;
  shortLabel: string;
}

export const QUICK_ACTIONS: readonly QuickActionDefinition[] = [
  { id: "monitor", product: getProduct("single-monitor"), addLabel: "Add a monitor", shortLabel: "Monitor" },
  { id: "lamp", product: getProduct("desk-lamp"), addLabel: "Add a lamp", shortLabel: "Lamp" },
  { id: "plant", product: getProduct("indoor-plant"), addLabel: "Place a plant", shortLabel: "Plant" },
];

type QuickActionConfig = Pick<WorkspaceConfiguration, "deskId" | "monitorId" | "monitorQuantity" | "accessoryIds">;

export type QuickActionCommand =
  | { type: "toggleMonitor"; id: MonitorId }
  | { type: "toggleAccessory"; id: AccessoryId };

export interface QuickActionState {
  placed: boolean;
  /** What currently fills the slot, e.g. "2 screens". */
  status: string;
  /** Store action that adds the item when empty, or removes what is placed. */
  command: QuickActionCommand;
}

const ACCESSORY_BY_ACTION: Record<Exclude<QuickActionId, "monitor">, AccessoryId> = {
  lamp: "desk-lamp",
  plant: "indoor-plant",
};

/** Quick actions need a desk surface to place items on. */
export function areQuickActionsAvailable(config: Pick<WorkspaceConfiguration, "deskId">): boolean {
  return config.deskId !== null;
}

export function getQuickActionState(id: QuickActionId, config: QuickActionConfig): QuickActionState {
  if (id === "monitor") {
    if (config.monitorId === null) {
      return { placed: false, status: "Not added", command: { type: "toggleMonitor", id: "single-monitor" } };
    }
    const units = getMonitorUnits(config);
    const status = config.monitorId === "dual-monitor" ? "Dual setup" : units === 1 ? "1 screen" : `${units} screens`;
    return { placed: true, status, command: { type: "toggleMonitor", id: config.monitorId } };
  }

  const accessoryId = ACCESSORY_BY_ACTION[id];
  const placed = config.accessoryIds.includes(accessoryId);
  return {
    placed,
    status: placed ? "Added" : "Not added",
    command: { type: "toggleAccessory", id: accessoryId },
  };
}

/** Whether a single-monitor setup can take another screen. */
export function canAddScreen(config: Pick<WorkspaceConfiguration, "monitorId" | "monitorQuantity">): boolean {
  if (config.monitorId !== "single-monitor") return false;
  return getMonitorUnits(config) < (getProduct("single-monitor").maxQuantity ?? 1);
}
