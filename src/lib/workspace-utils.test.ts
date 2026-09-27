import { describe, expect, it } from "vitest";
import {
  buildInquiry,
  buildInquiryText,
  createInquiryReference,
  DEFAULT_CONFIGURATION,
  getMonitorScreenCount,
  getWorkspaceTitle,
  sanitizeConfiguration,
} from "./workspace-utils";
import type { CustomerDetails, WorkspaceConfiguration } from "@/types/workspace";

describe("sanitizeConfiguration", () => {
  it("returns defaults for non-object input", () => {
    for (const input of [null, undefined, "oak-desk", 42, true]) {
      expect(sanitizeConfiguration(input)).toEqual(DEFAULT_CONFIGURATION);
    }
  });

  it("keeps a valid configuration intact", () => {
    const valid: WorkspaceConfiguration = {
      deskId: "studio-desk",
      chairId: "minimal-chair",
      monitorId: "single-monitor",
      monitorQuantity: 2,
      accessoryIds: ["desk-lamp", "mouse"],
      duration: 6,
      scene: "ubud",
    };
    expect(sanitizeConfiguration(valid)).toEqual(valid);
  });

  it("drops unknown ids, invalid durations and scenes", () => {
    const result = sanitizeConfiguration({
      deskId: "gold-desk",
      chairId: 7,
      monitorId: "crt",
      accessoryIds: ["desk-lamp", "espresso-machine", 3, "desk-lamp"],
      duration: 2,
      scene: "mars",
    });
    expect(result).toEqual({ ...DEFAULT_CONFIGURATION, accessoryIds: ["desk-lamp"] });
  });

  it("clamps monitor quantity and rejects non-numeric values", () => {
    expect(sanitizeConfiguration({ monitorQuantity: 99 }).monitorQuantity).toBe(3);
    expect(sanitizeConfiguration({ monitorQuantity: -2 }).monitorQuantity).toBe(1);
    expect(sanitizeConfiguration({ monitorQuantity: "3" }).monitorQuantity).toBe(1);
    expect(sanitizeConfiguration({ monitorQuantity: Infinity }).monitorQuantity).toBe(1);
  });

  it("ignores non-array accessory values", () => {
    expect(sanitizeConfiguration({ accessoryIds: "desk-lamp" }).accessoryIds).toEqual([]);
  });
});

describe("getWorkspaceTitle", () => {
  it("names the workspace from desk and chair", () => {
    expect(getWorkspaceTitle({ deskId: null, chairId: null })).toBe("Untitled workspace");
    expect(getWorkspaceTitle({ deskId: "oak-desk", chairId: null })).toBe("The Oak Workspace");
    expect(getWorkspaceTitle({ deskId: "oak-desk", chairId: "ergonomic-chair" })).toBe("The Oak Focus Workspace");
    expect(getWorkspaceTitle({ deskId: "studio-desk", chairId: "minimal-chair" })).toBe("The Studio Calm Workspace");
  });
});

describe("getMonitorScreenCount", () => {
  it("counts physical screens", () => {
    expect(getMonitorScreenCount({ monitorId: null, monitorQuantity: 1 })).toBe(0);
    expect(getMonitorScreenCount({ monitorId: "single-monitor", monitorQuantity: 3 })).toBe(3);
    expect(getMonitorScreenCount({ monitorId: "dual-monitor", monitorQuantity: 1 })).toBe(2);
  });
});

describe("inquiry helpers", () => {
  const customer: CustomerDetails = {
    fullName: "Ayu Pratiwi",
    email: "ayu@example.com",
    phone: "",
    deliveryDate: "2026-10-15",
    deliveryArea: "Canggu",
    deliveryAddress: "Villa Sawah, Jl. Pantai Berawa",
    notes: "",
  };
  const configuration: WorkspaceConfiguration = {
    ...DEFAULT_CONFIGURATION,
    deskId: "studio-desk",
    chairId: "ergonomic-chair",
    monitorId: "single-monitor",
    monitorQuantity: 2,
    duration: 3,
  };

  it("creates readable draft references", () => {
    const reference = createInquiryReference();
    expect(reference).toMatch(/^MNS-[A-HJ-NP-Z2-9]{6}$/);
  });

  it("builds an inquiry with computed totals", () => {
    const inquiry = buildInquiry("MNS-TEST01", new Date("2026-09-28T02:00:00Z"), customer, configuration);
    expect(inquiry.title).toBe("The Studio Focus Workspace");
    expect(inquiry.monthlySubtotal).toBe(550_000 + 350_000 + 600_000);
    expect(inquiry.estimatedTotal).toBe(1_500_000 * 3);
    expect(inquiry.createdAt).toBe("2026-09-28T02:00:00.000Z");
  });

  it("produces a plain-text summary with a prototype disclaimer", () => {
    const text = buildInquiryText(buildInquiry("MNS-TEST01", new Date(), customer, configuration));
    expect(text).toContain("MNS-TEST01");
    expect(text).toContain("- Single Monitor × 2: Rp600.000/month");
    expect(text).toContain("Estimated total: Rp4.500.000");
    expect(text).not.toContain("Phone:");
    expect(text).toContain("no order or payment has been made");
  });
});
