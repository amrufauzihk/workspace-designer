import { describe, expect, it } from "vitest";
import {
  formatDuration,
  formatIDR,
  getEstimatedTotal,
  getLineItems,
  getMonitorUnits,
  getMonthlySubtotal,
} from "./pricing";
import { DEFAULT_CONFIGURATION } from "./workspace-utils";
import type { WorkspaceConfiguration } from "@/types/workspace";

const config = (overrides: Partial<WorkspaceConfiguration>): WorkspaceConfiguration => ({
  ...DEFAULT_CONFIGURATION,
  ...overrides,
});

describe("formatIDR", () => {
  it("formats rupiah with dot thousands separators", () => {
    expect(formatIDR(450_000)).toBe("Rp450.000");
    expect(formatIDR(10_500_000)).toBe("Rp10.500.000");
    expect(formatIDR(0)).toBe("Rp0");
  });
});

describe("getMonitorUnits", () => {
  it("is zero without a monitor and one for the dual setup", () => {
    expect(getMonitorUnits({ monitorId: null, monitorQuantity: 3 })).toBe(0);
    expect(getMonitorUnits({ monitorId: "dual-monitor", monitorQuantity: 3 })).toBe(1);
  });

  it("clamps single monitors between 1 and the product maximum", () => {
    expect(getMonitorUnits({ monitorId: "single-monitor", monitorQuantity: 2 })).toBe(2);
    expect(getMonitorUnits({ monitorId: "single-monitor", monitorQuantity: 9 })).toBe(3);
    expect(getMonitorUnits({ monitorId: "single-monitor", monitorQuantity: 0 })).toBe(1);
    expect(getMonitorUnits({ monitorId: "single-monitor", monitorQuantity: -4 })).toBe(1);
    expect(getMonitorUnits({ monitorId: "single-monitor", monitorQuantity: Number.NaN })).toBe(1);
  });
});

describe("getLineItems and totals", () => {
  it("returns nothing for an empty configuration", () => {
    const items = getLineItems(DEFAULT_CONFIGURATION);
    expect(items).toEqual([]);
    expect(getMonthlySubtotal(items)).toBe(0);
  });

  it("prices Journey A: oak desk, ergonomic chair, single monitor and plant", () => {
    const items = getLineItems(
      config({
        deskId: "oak-desk",
        chairId: "ergonomic-chair",
        monitorId: "single-monitor",
        accessoryIds: ["indoor-plant"],
      }),
    );
    expect(items.map((item) => item.product.id)).toEqual([
      "oak-desk",
      "ergonomic-chair",
      "single-monitor",
      "indoor-plant",
    ]);
    expect(getMonthlySubtotal(items)).toBe(1_150_000);
  });

  it("multiplies single monitors by quantity", () => {
    const items = getLineItems(config({ monitorId: "single-monitor", monitorQuantity: 3 }));
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ quantity: 3, monthlyTotal: 900_000 });
  });

  it("lists accessories in catalog order regardless of selection order", () => {
    const items = getLineItems(config({ accessoryIds: ["monitor-arm", "desk-lamp", "mouse"] }));
    expect(items.map((item) => item.product.id)).toEqual(["desk-lamp", "mouse", "monitor-arm"]);
  });

  it("estimates the total as monthly subtotal × months with no discount", () => {
    expect(getEstimatedTotal(1_750_000, 1)).toBe(1_750_000);
    expect(getEstimatedTotal(1_750_000, 3)).toBe(5_250_000);
    expect(getEstimatedTotal(1_750_000, 6)).toBe(10_500_000);
    expect(getEstimatedTotal(1_750_000, 12)).toBe(21_000_000);
  });
});

describe("formatDuration", () => {
  it("pluralises months", () => {
    expect(formatDuration(1)).toBe("1 month");
    expect(formatDuration(12)).toBe("12 months");
  });
});
