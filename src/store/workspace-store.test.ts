import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_CONFIGURATION } from "@/lib/workspace-utils";
import { useWorkspaceStore, WORKSPACE_STORAGE_KEY } from "./workspace-store";

const store = () => useWorkspaceStore.getState();

beforeEach(() => {
  localStorage.clear();
  store().reset();
});

describe("workspace store", () => {
  it("replaces the desk and chair when switching", () => {
    store().selectDesk("oak-desk");
    store().selectDesk("studio-desk");
    store().selectChair("ergonomic-chair");
    store().selectChair("minimal-chair");
    expect(store()).toMatchObject({ deskId: "studio-desk", chairId: "minimal-chair" });
  });

  it("toggles monitors and replaces single with dual", () => {
    store().toggleMonitor("single-monitor");
    store().setMonitorQuantity(3);
    store().toggleMonitor("dual-monitor");
    expect(store()).toMatchObject({ monitorId: "dual-monitor", monitorQuantity: 1 });
    store().toggleMonitor("dual-monitor");
    expect(store().monitorId).toBeNull();
  });

  it("clamps monitor quantity and ignores it for the dual setup", () => {
    store().toggleMonitor("single-monitor");
    store().setMonitorQuantity(10);
    expect(store().monitorQuantity).toBe(3);
    store().setMonitorQuantity(0);
    expect(store().monitorQuantity).toBe(1);
    store().toggleMonitor("dual-monitor");
    store().setMonitorQuantity(2);
    expect(store().monitorQuantity).toBe(1);
  });

  it("toggles accessories without duplicates", () => {
    store().toggleAccessory("desk-lamp");
    store().toggleAccessory("indoor-plant");
    store().toggleAccessory("desk-lamp");
    expect(store().accessoryIds).toEqual(["indoor-plant"]);
    expect(store().announcement).toMatchObject({ message: "Desk Lamp removed", tone: "removed" });
  });

  it("clears a prepared inquiry when leaving the inquiry step", () => {
    store().setInquiry({ reference: "MNS-TEST01" } as never);
    store().setStep("inquiry");
    expect(store().inquiry).not.toBeNull();
    store().setStep("review");
    expect(store().inquiry).toBeNull();
  });

  it("resets configuration, step and customer details", () => {
    store().selectDesk("oak-desk");
    store().toggleAccessory("mouse");
    store().setDuration(12);
    store().setScene("studio");
    store().setStep("personalize");
    store().setCustomerField("fullName", "Ayu");
    store().reset();
    expect(store()).toMatchObject({ ...DEFAULT_CONFIGURATION, step: "desk", inquiry: null });
    expect(store().customer.fullName).toBe("");
  });

  it("persists only the configuration", () => {
    store().selectDesk("oak-desk");
    store().setCustomerField("email", "ayu@example.com");
    const saved = JSON.parse(localStorage.getItem(WORKSPACE_STORAGE_KEY) ?? "{}");
    expect(saved.state).toMatchObject({ deskId: "oak-desk" });
    expect(saved.state).not.toHaveProperty("customer");
    expect(saved.state).not.toHaveProperty("step");
  });

  it("sanitises tampered storage on rehydrate", async () => {
    localStorage.setItem(
      WORKSPACE_STORAGE_KEY,
      JSON.stringify({ version: 1, state: { deskId: "gold-desk", chairId: "minimal-chair", duration: 99 } }),
    );
    await useWorkspaceStore.persist.rehydrate();
    expect(store()).toMatchObject({ deskId: null, chairId: "minimal-chair", duration: 1 });
  });

  it("survives corrupted storage", async () => {
    localStorage.setItem(WORKSPACE_STORAGE_KEY, "{not json");
    await expect(useWorkspaceStore.persist.rehydrate()).resolves.not.toThrow();
    expect(store().deskId).toBeNull();
  });
});
