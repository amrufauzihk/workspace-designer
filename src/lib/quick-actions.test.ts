import { beforeEach, describe, expect, it } from "vitest";
import { getAddScreenAnchor, getQuickActionAnchor } from "@/components/workspace/illustrations/scene-geometry";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { WorkspaceConfiguration } from "@/types/workspace";
import { getEstimatedTotal, getLineItems, getMonthlySubtotal } from "./pricing";
import {
  areQuickActionsAvailable,
  canAddScreen,
  getQuickActionState,
  type QuickActionCommand,
  type QuickActionId,
} from "./quick-actions";
import { DEFAULT_CONFIGURATION } from "./workspace-utils";

const config = (overrides: Partial<WorkspaceConfiguration>): WorkspaceConfiguration => ({
  ...DEFAULT_CONFIGURATION,
  ...overrides,
});

const store = () => useWorkspaceStore.getState();

/** Mirrors useQuickActions: the command always resolves to an existing store action. */
function runQuickAction(id: QuickActionId) {
  const command: QuickActionCommand = getQuickActionState(id, store()).command;
  if (command.type === "toggleMonitor") store().toggleMonitor(command.id);
  else store().toggleAccessory(command.id);
}

describe("quick action state", () => {
  it("is only available once a desk is placed", () => {
    expect(areQuickActionsAvailable(config({}))).toBe(false);
    expect(areQuickActionsAvailable(config({ deskId: "oak-desk" }))).toBe(true);
  });

  it("adds a single monitor when no screen is selected", () => {
    expect(getQuickActionState("monitor", config({}))).toEqual({
      placed: false,
      status: "Not added",
      command: { type: "toggleMonitor", id: "single-monitor" },
    });
  });

  it("describes and removes whichever monitor setup is placed", () => {
    expect(getQuickActionState("monitor", config({ monitorId: "single-monitor", monitorQuantity: 2 }))).toMatchObject({
      placed: true,
      status: "2 screens",
      command: { type: "toggleMonitor", id: "single-monitor" },
    });
    expect(getQuickActionState("monitor", config({ monitorId: "dual-monitor" }))).toMatchObject({
      placed: true,
      status: "Dual setup",
      command: { type: "toggleMonitor", id: "dual-monitor" },
    });
  });

  it("maps lamp and plant to their accessories", () => {
    expect(getQuickActionState("lamp", config({ accessoryIds: ["desk-lamp"] }))).toMatchObject({
      placed: true,
      command: { type: "toggleAccessory", id: "desk-lamp" },
    });
    expect(getQuickActionState("plant", config({}))).toMatchObject({
      placed: false,
      command: { type: "toggleAccessory", id: "indoor-plant" },
    });
  });

  it("offers another screen only for single monitors below the limit", () => {
    expect(canAddScreen(config({ monitorId: "single-monitor", monitorQuantity: 1 }))).toBe(true);
    expect(canAddScreen(config({ monitorId: "single-monitor", monitorQuantity: 3 }))).toBe(false);
    expect(canAddScreen(config({ monitorId: "dual-monitor" }))).toBe(false);
    expect(canAddScreen(config({}))).toBe(false);
  });
});

describe("quick actions through the store", () => {
  beforeEach(() => {
    localStorage.clear();
    store().reset();
    store().selectDesk("oak-desk");
  });

  it("adds each item once and removes it on the second use", () => {
    runQuickAction("plant");
    runQuickAction("lamp");
    runQuickAction("monitor");
    expect(store()).toMatchObject({ monitorId: "single-monitor", accessoryIds: ["indoor-plant", "desk-lamp"] });

    runQuickAction("plant");
    expect(store().accessoryIds).toEqual(["desk-lamp"]);
  });

  it("removes a dual setup instead of adding a second monitor product", () => {
    store().toggleMonitor("dual-monitor");
    runQuickAction("monitor");
    expect(store().monitorId).toBeNull();
  });

  it("prices quick-added items exactly like product cards", () => {
    runQuickAction("monitor");
    store().setMonitorQuantity(2);
    runQuickAction("plant");
    store().setDuration(6);

    const monthly = getMonthlySubtotal(getLineItems(store()));
    expect(monthly).toBe(450_000 + 2 * 300_000 + 50_000);
    expect(getEstimatedTotal(monthly, store().duration)).toBe(6_600_000);
  });
});

describe("quick action anchors", () => {
  it("keeps the lamp button left of the leftmost screen", () => {
    for (const count of [0, 1, 2, 3]) {
      const anchor = getQuickActionAnchor("lamp", count);
      expect(anchor.align).toBe("end");
      expect(anchor.left).toBeLessThanOrEqual((338 / 1200) * 100);
    }
    expect(getQuickActionAnchor("lamp", 3).left).toBeCloseTo((280 / 1200) * 100);
  });

  it("stays inside the preview frame", () => {
    const anchors = [
      getQuickActionAnchor("monitor", 0),
      getQuickActionAnchor("plant", 0),
      getAddScreenAnchor(1),
      getAddScreenAnchor(2),
    ];
    for (const { left, top } of anchors) {
      expect(left).toBeGreaterThan(0);
      expect(left).toBeLessThan(100);
      expect(top).toBeGreaterThan(0);
      expect(top).toBeLessThan(100);
    }
  });
});
