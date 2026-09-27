import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getProduct } from "@/data/products";
import { getMonitorUnits } from "@/lib/pricing";
import { EMPTY_CUSTOMER_DETAILS } from "@/lib/validation";
import { DEFAULT_CONFIGURATION, sanitizeConfiguration } from "@/lib/workspace-utils";
import type {
  AccessoryId,
  ChairId,
  CheckoutInquiry,
  ConfiguratorStep,
  CustomerDetails,
  DeskId,
  MonitorId,
  RentalDuration,
  SceneTheme,
  WorkspaceConfiguration,
} from "@/types/workspace";

export interface Announcement {
  id: number;
  message: string;
  tone: "added" | "removed" | "neutral";
}

interface WorkspaceUIState {
  step: ConfiguratorStep;
  showLabels: boolean;
  announcement: Announcement | null;
  customer: CustomerDetails;
  inquiry: CheckoutInquiry | null;
}

interface WorkspaceActions {
  setCustomerField: (field: keyof CustomerDetails, value: string) => void;
  setInquiry: (inquiry: CheckoutInquiry | null) => void;
  selectDesk: (id: DeskId) => void;
  selectChair: (id: ChairId) => void;
  toggleMonitor: (id: MonitorId) => void;
  setMonitorQuantity: (quantity: number) => void;
  toggleAccessory: (id: AccessoryId) => void;
  setDuration: (duration: RentalDuration) => void;
  setScene: (scene: SceneTheme) => void;
  setStep: (step: ConfiguratorStep) => void;
  toggleLabels: () => void;
  reset: () => void;
}

export type WorkspaceState = WorkspaceConfiguration & WorkspaceUIState & WorkspaceActions;

export const WORKSPACE_STORAGE_KEY = "monis-workspace-studio";
const STORAGE_VERSION = 1;

let announcementId = 0;
function announce(message: string, tone: Announcement["tone"] = "neutral"): Announcement {
  announcementId += 1;
  return { id: announcementId, message, tone };
}

const INITIAL_UI_STATE: WorkspaceUIState = {
  step: "desk",
  showLabels: true,
  announcement: null,
  customer: EMPTY_CUSTOMER_DETAILS,
  inquiry: null,
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_CONFIGURATION,
      ...INITIAL_UI_STATE,

      selectDesk: (id) => {
        if (get().deskId === id) return;
        set({ deskId: id, announcement: announce(`${getProduct(id).name} selected`, "added") });
      },

      selectChair: (id) => {
        if (get().chairId === id) return;
        set({ chairId: id, announcement: announce(`${getProduct(id).name} selected`, "added") });
      },

      toggleMonitor: (id) => {
        const name = getProduct(id).name;
        if (get().monitorId === id) {
          set({ monitorId: null, monitorQuantity: 1, announcement: announce(`${name} removed`, "removed") });
        } else {
          set({ monitorId: id, monitorQuantity: 1, announcement: announce(`${name} added`, "added") });
        }
      },

      setMonitorQuantity: (quantity) => {
        const { monitorId, monitorQuantity } = get();
        if (monitorId !== "single-monitor") return;
        const next = getMonitorUnits({ monitorId, monitorQuantity: quantity });
        if (next === monitorQuantity) return;
        set({
          monitorQuantity: next,
          announcement: announce(`${next} ${next === 1 ? "monitor" : "monitors"} in your setup`, "neutral"),
        });
      },

      toggleAccessory: (id) => {
        const { accessoryIds } = get();
        const name = getProduct(id).name;
        if (accessoryIds.includes(id)) {
          set({
            accessoryIds: accessoryIds.filter((existing) => existing !== id),
            announcement: announce(`${name} removed`, "removed"),
          });
        } else {
          set({ accessoryIds: [...accessoryIds, id], announcement: announce(`${name} added`, "added") });
        }
      },

      setDuration: (duration) => set({ duration }),
      setScene: (scene) => set({ scene }),
      setStep: (step) => set(step === "inquiry" ? { step } : { step, inquiry: null }),
      toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),

      setCustomerField: (field, value) =>
        set((state) => ({ customer: { ...state.customer, [field]: value } })),
      setInquiry: (inquiry) => set({ inquiry }),

      reset: () =>
        set({
          ...DEFAULT_CONFIGURATION,
          accessoryIds: [],
          step: "desk",
          customer: EMPTY_CUSTOMER_DETAILS,
          inquiry: null,
          announcement: announce("Workspace reset", "neutral"),
        }),
    }),
    {
      name: WORKSPACE_STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state): WorkspaceConfiguration => ({
        deskId: state.deskId,
        chairId: state.chairId,
        monitorId: state.monitorId,
        monitorQuantity: state.monitorQuantity,
        accessoryIds: state.accessoryIds,
        duration: state.duration,
        scene: state.scene,
      }),
      migrate: (persisted) => sanitizeConfiguration(persisted),
      merge: (persisted, current) =>
        typeof persisted === "object" && persisted !== null
          ? { ...current, ...sanitizeConfiguration(persisted) }
          : current,
    },
  ),
);
