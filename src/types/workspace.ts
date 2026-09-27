export type ProductCategory = "desk" | "chair" | "monitor" | "accessory";

export type DeskId = "oak-desk" | "studio-desk";
export type ChairId = "ergonomic-chair" | "minimal-chair";
export type MonitorId = "single-monitor" | "dual-monitor";
export type AccessoryId =
  | "desk-lamp"
  | "indoor-plant"
  | "mechanical-keyboard"
  | "mouse"
  | "monitor-arm";

export type ProductId = DeskId | ChairId | MonitorId | AccessoryId;

export type ProductAvailability = "available" | "limited";

export interface ProductAttribute {
  label: string;
  value: string;
}

export interface Product {
  id: ProductId;
  name: string;
  category: ProductCategory;
  description: string;
  /** Illustrative monthly rental price in IDR. */
  monthlyPrice: number;
  image: string;
  previewImage?: string;
  attributes?: ProductAttribute[];
  badge?: string;
  availability?: ProductAvailability;
  /** Maximum units per workspace. Defaults to 1. */
  maxQuantity?: number;
}

export type RentalDuration = 1 | 3 | 6 | 12;

export type SceneTheme = "canggu" | "ubud" | "studio";

export interface WorkspaceConfiguration {
  deskId: DeskId | null;
  chairId: ChairId | null;
  monitorId: MonitorId | null;
  monitorQuantity: number;
  accessoryIds: AccessoryId[];
  duration: RentalDuration;
  scene: SceneTheme;
}

export type ConfiguratorStep =
  | "desk"
  | "chair"
  | "personalize"
  | "duration"
  | "review"
  | "inquiry";

export interface LineItem {
  product: Product;
  quantity: number;
  monthlyTotal: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  deliveryDate: string;
  deliveryArea: string;
  deliveryAddress: string;
  notes: string;
}

export type CustomerDetailsErrors = Partial<Record<keyof CustomerDetails, string>>;

export interface CheckoutInquiry {
  reference: string;
  createdAt: string;
  title: string;
  customer: CustomerDetails;
  configuration: WorkspaceConfiguration;
  lineItems: LineItem[];
  monthlySubtotal: number;
  estimatedTotal: number;
}
