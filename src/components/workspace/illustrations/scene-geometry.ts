import type { ProductId } from "@/types/workspace";

export const SCENE_WIDTH = 1200;
export const SCENE_HEIGHT = 800;

export interface ScreenLayout {
  centers: number[];
  width: number;
  height: number;
  bottom: number;
}

export function getScreenLayout(count: number, variant: "single" | "dual"): ScreenLayout {
  if (count >= 3) return { centers: [392, 600, 808], width: 196, height: 122, bottom: 412 };
  if (count === 2) {
    return variant === "dual"
      ? { centers: [474, 726], width: 240, height: 148, bottom: 408 }
      : { centers: [466, 734], width: 250, height: 152, bottom: 410 };
  }
  return { centers: [600], width: 300, height: 180, bottom: 405 };
}

export interface SceneMarkerInput {
  productIds: ProductId[];
  screenCount: number;
  monitorVariant: "single" | "dual";
}

export interface SceneMarker {
  productId: ProductId;
  /** Percentage offsets within the preview frame. */
  left: number;
  top: number;
}

const toPercent = (x: number, y: number) => ({
  left: (x / SCENE_WIDTH) * 100,
  top: (y / SCENE_HEIGHT) * 100,
});

export function getSceneMarkers({ productIds, screenCount, monitorVariant }: SceneMarkerInput): SceneMarker[] {
  const layout = getScreenLayout(screenCount, monitorVariant);
  const screenTop = layout.bottom - layout.height;

  const anchors: Record<ProductId, [number, number]> = {
    "oak-desk": [860, 486],
    "studio-desk": [860, 482],
    "ergonomic-chair": [600, 568],
    "minimal-chair": [600, 568],
    "single-monitor": [600, screenTop - 20],
    "dual-monitor": [600, screenTop - 20],
    "desk-lamp": [392, 196],
    "indoor-plant": [1010, 590],
    "mechanical-keyboard": [538, 461],
    mouse: [790, 446],
    "monitor-arm": screenCount > 0 ? [640, 428] : [668, 268],
  };

  return productIds.map((productId) => ({ productId, ...toPercent(...anchors[productId]) }));
}
