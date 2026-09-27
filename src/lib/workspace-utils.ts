import { DEFAULT_DURATION, RENTAL_DURATIONS } from "@/data/durations";
import { ACCESSORY_IDS, CHAIR_IDS, DESK_IDS, MONITOR_IDS } from "@/data/products";
import { DEFAULT_SCENE, SCENES } from "@/data/scenes";
import {
  formatDuration,
  formatIDR,
  getEstimatedTotal,
  getLineItems,
  getMonitorUnits,
  getMonthlySubtotal,
} from "@/lib/pricing";
import type {
  AccessoryId,
  CheckoutInquiry,
  RentalDuration,
  SceneTheme,
  WorkspaceConfiguration,
} from "@/types/workspace";

export const DEFAULT_CONFIGURATION: WorkspaceConfiguration = {
  deskId: null,
  chairId: null,
  monitorId: null,
  monitorQuantity: 1,
  accessoryIds: [],
  duration: DEFAULT_DURATION,
  scene: DEFAULT_SCENE,
};

export function isConfigurationComplete(
  config: Pick<WorkspaceConfiguration, "deskId" | "chairId">,
): boolean {
  return config.deskId !== null && config.chairId !== null;
}

/** Number of physical screens shown in the preview. */
export function getMonitorScreenCount(
  config: Pick<WorkspaceConfiguration, "monitorId" | "monitorQuantity">,
): number {
  if (config.monitorId === "dual-monitor") return 2;
  return getMonitorUnits(config);
}

export function getWorkspaceTitle(
  config: Pick<WorkspaceConfiguration, "deskId" | "chairId">,
): string {
  if (!config.deskId) return "Untitled workspace";
  const desk = config.deskId === "oak-desk" ? "Oak" : "Studio";
  if (!config.chairId) return `The ${desk} Workspace`;
  const mood = config.chairId === "ergonomic-chair" ? "Focus" : "Calm";
  return `The ${desk} ${mood} Workspace`;
}

function isOneOf<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === "string" && (values as readonly string[]).includes(value);
}

/**
 * Turns untrusted persisted data into a valid configuration. Unknown ids,
 * wrong types and out-of-range values fall back to defaults.
 */
export function sanitizeConfiguration(input: unknown): WorkspaceConfiguration {
  if (typeof input !== "object" || input === null) return { ...DEFAULT_CONFIGURATION };
  const raw = input as Record<string, unknown>;

  const monitorId = isOneOf(MONITOR_IDS, raw.monitorId) ? raw.monitorId : null;
  const quantity =
    typeof raw.monitorQuantity === "number" && Number.isFinite(raw.monitorQuantity)
      ? raw.monitorQuantity
      : 1;

  const accessoryIds = Array.isArray(raw.accessoryIds)
    ? ACCESSORY_IDS.filter((id) => (raw.accessoryIds as unknown[]).includes(id))
    : [];

  const durations = RENTAL_DURATIONS.map((option) => option.value);
  const duration: RentalDuration = durations.includes(raw.duration as RentalDuration)
    ? (raw.duration as RentalDuration)
    : DEFAULT_DURATION;

  const sceneIds = SCENES.map((scene) => scene.id);
  const scene: SceneTheme = isOneOf(sceneIds, raw.scene) ? raw.scene : DEFAULT_SCENE;

  return {
    deskId: isOneOf(DESK_IDS, raw.deskId) ? raw.deskId : null,
    chairId: isOneOf(CHAIR_IDS, raw.chairId) ? raw.chairId : null,
    monitorId,
    monitorQuantity: getMonitorUnits({ monitorId: "single-monitor", monitorQuantity: quantity }),
    accessoryIds: accessoryIds as AccessoryId[],
    duration,
    scene,
  };
}

export function createInquiryReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  return `MNS-${code}`;
}

export function buildInquiry(
  reference: string,
  createdAt: Date,
  customer: CheckoutInquiry["customer"],
  configuration: WorkspaceConfiguration,
): CheckoutInquiry {
  const lineItems = getLineItems(configuration);
  const monthlySubtotal = getMonthlySubtotal(lineItems);
  return {
    reference,
    createdAt: createdAt.toISOString(),
    title: getWorkspaceTitle(configuration),
    customer,
    configuration,
    lineItems,
    monthlySubtotal,
    estimatedTotal: getEstimatedTotal(monthlySubtotal, configuration.duration),
  };
}

/** Plain-text summary suitable for copying into an email or chat. */
export function buildInquiryText(inquiry: CheckoutInquiry): string {
  const { customer, configuration } = inquiry;
  const lines = [
    `Monis Workspace Studio — rental inquiry draft (${inquiry.reference})`,
    "",
    inquiry.title,
    ...inquiry.lineItems.map(
      (item) =>
        `- ${item.product.name}${item.quantity > 1 ? ` × ${item.quantity}` : ""}: ${formatIDR(item.monthlyTotal)}/month`,
    ),
    "",
    `Monthly subtotal: ${formatIDR(inquiry.monthlySubtotal)}`,
    `Rental duration: ${formatDuration(configuration.duration)}`,
    `Estimated total: ${formatIDR(inquiry.estimatedTotal)}`,
    "",
    `Name: ${customer.fullName}`,
    `Email: ${customer.email}`,
    ...(customer.phone ? [`Phone: ${customer.phone}`] : []),
    `Preferred delivery: ${customer.deliveryDate}`,
    `Delivery area: ${customer.deliveryArea}`,
    `Address: ${customer.deliveryAddress}`,
    ...(customer.notes ? [`Notes: ${customer.notes}`] : []),
    "",
    "Prototype estimate only. Prices are illustrative, availability is not confirmed and no order or payment has been made.",
  ];
  return lines.join("\n");
}
