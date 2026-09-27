import type {
  AccessoryId,
  ChairId,
  DeskId,
  MonitorId,
  Product,
  ProductCategory,
  ProductId,
} from "@/types/workspace";

/**
 * Prototype catalog. Names, prices and availability are illustrative only and
 * do not represent live monis.rent inventory or official rental rates.
 */
export const PRODUCTS: readonly Product[] = [
  {
    id: "oak-desk",
    name: "Oak Desk",
    category: "desk",
    description:
      "A warm oak writing desk with a slim drawer. Calm, solid and sized for focused solo work.",
    monthlyPrice: 450_000,
    image: "/products/oak-desk.svg",
    attributes: [
      { label: "Width", value: "140 cm" },
      { label: "Finish", value: "Natural oak" },
    ],
    badge: "Natural wood",
    availability: "available",
  },
  {
    id: "studio-desk",
    name: "Studio Desk",
    category: "desk",
    description:
      "Electric sit-stand desk with a matte white top and steel frame. Change posture through the day.",
    monthlyPrice: 550_000,
    image: "/products/studio-desk.svg",
    attributes: [
      { label: "Width", value: "150 cm" },
      { label: "Height", value: "72–120 cm" },
    ],
    badge: "Sit-stand",
    availability: "available",
  },
  {
    id: "ergonomic-chair",
    name: "Ergonomic Chair",
    category: "chair",
    description:
      "Breathable mesh back with adjustable lumbar support, headrest and armrests for long sessions.",
    monthlyPrice: 350_000,
    image: "/products/ergonomic-chair.svg",
    attributes: [
      { label: "Back", value: "Mesh" },
      { label: "Adjusts", value: "Lumbar, arms, height" },
    ],
    badge: "Adjustable",
    availability: "available",
  },
  {
    id: "minimal-chair",
    name: "Minimal Chair",
    category: "chair",
    description:
      "An oak-frame chair with a soft sage seat. Light, quiet and easy to fit into smaller rooms.",
    monthlyPrice: 250_000,
    image: "/products/minimal-chair.svg",
    attributes: [
      { label: "Frame", value: "Oak" },
      { label: "Seat", value: "Upholstered" },
    ],
    availability: "available",
  },
  {
    id: "single-monitor",
    name: "Single Monitor",
    category: "monitor",
    description:
      'A 27" 4K display with USB-C. Add up to three screens for a wider canvas.',
    monthlyPrice: 300_000,
    image: "/products/single-monitor.svg",
    attributes: [
      { label: "Size", value: '27"' },
      { label: "Resolution", value: "4K" },
    ],
    availability: "available",
    maxQuantity: 3,
  },
  {
    id: "dual-monitor",
    name: "Dual Monitor Setup",
    category: "monitor",
    description:
      'Two matched 24" QHD displays on a shared stand, aligned and ready for split-screen work.',
    monthlyPrice: 550_000,
    image: "/products/dual-monitor.svg",
    attributes: [
      { label: "Size", value: '2 × 24"' },
      { label: "Resolution", value: "QHD" },
    ],
    badge: "Matched pair",
    availability: "limited",
  },
  {
    id: "desk-lamp",
    name: "Desk Lamp",
    category: "accessory",
    description: "Architect-style LED lamp with warm, dimmable light for late sessions.",
    monthlyPrice: 75_000,
    image: "/products/desk-lamp.svg",
    availability: "available",
  },
  {
    id: "indoor-plant",
    name: "Indoor Plant",
    category: "accessory",
    description: "A leafy, low-maintenance floor plant in a terracotta pot.",
    monthlyPrice: 50_000,
    image: "/products/indoor-plant.svg",
    availability: "available",
  },
  {
    id: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    category: "accessory",
    description: "Compact 75% keyboard with quiet tactile switches.",
    monthlyPrice: 100_000,
    image: "/products/mechanical-keyboard.svg",
    availability: "available",
  },
  {
    id: "mouse",
    name: "Mouse",
    category: "accessory",
    description: "Wireless ergonomic mouse with a felt desk pad.",
    monthlyPrice: 50_000,
    image: "/products/mouse.svg",
    availability: "available",
  },
  {
    id: "monitor-arm",
    name: "Monitor Arm",
    category: "accessory",
    description: "Gas-spring arm that lifts your screens and frees up desk space.",
    monthlyPrice: 75_000,
    image: "/products/monitor-arm.svg",
    badge: "Pairs with monitors",
    availability: "limited",
  },
];

const PRODUCTS_BY_ID = new Map<ProductId, Product>(
  PRODUCTS.map((product) => [product.id, product]),
);

export const DESK_IDS = ["oak-desk", "studio-desk"] as const satisfies readonly DeskId[];
export const CHAIR_IDS = ["ergonomic-chair", "minimal-chair"] as const satisfies readonly ChairId[];
export const MONITOR_IDS = ["single-monitor", "dual-monitor"] as const satisfies readonly MonitorId[];
export const ACCESSORY_IDS = [
  "desk-lamp",
  "indoor-plant",
  "mechanical-keyboard",
  "mouse",
  "monitor-arm",
] as const satisfies readonly AccessoryId[];

export function getProduct(id: ProductId): Product {
  const product = PRODUCTS_BY_ID.get(id);
  if (!product) {
    throw new Error(`Unknown product id: ${id}`);
  }
  return product;
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  desk: "Desk",
  chair: "Chair",
  monitor: "Monitors",
  accessory: "Accessories",
};
