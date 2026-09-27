import type { ReactNode, SVGProps } from "react";
import type { ProductId } from "@/types/workspace";
import { DeskLamp, IndoorPlant, MechanicalKeyboard, Mouse } from "./Accessories";
import { ErgonomicChair, MinimalChair } from "./Chairs";
import { OakDesk, StudioDesk } from "./Desks";
import { MonitorArm, MonitorSetup } from "./Monitors";

const SCREEN = "#23302A";
const ACCENT = "#BFD0B8";

/** 4:3 crop window (in scene coordinates) and artwork for each product thumbnail. */
const THUMBNAILS: Record<ProductId, { viewBox: string; art: ReactNode }> = {
  "oak-desk": { viewBox: "250 330 700 525", art: <OakDesk /> },
  "studio-desk": { viewBox: "250 330 700 525", art: <StudioDesk /> },
  "ergonomic-chair": { viewBox: "360 450 480 360", art: <ErgonomicChair /> },
  "minimal-chair": { viewBox: "360 450 480 360", art: <MinimalChair /> },
  "single-monitor": {
    viewBox: "400 189 400 300",
    art: <MonitorSetup count={1} variant="single" withArm={false} screen={SCREEN} accent={ACCENT} />,
  },
  "dual-monitor": {
    viewBox: "250 90 700 525",
    art: <MonitorSetup count={2} variant="dual" withArm={false} screen={SCREEN} accent={ACCENT} />,
  },
  "desk-lamp": { viewBox: "140 170 440 330", art: <DeskLamp /> },
  "indoor-plant": { viewBox: "730 330 560 420", art: <IndoorPlant /> },
  "mechanical-keyboard": { viewBox: "480 371 240 180", art: <MechanicalKeyboard /> },
  mouse: { viewBox: "677 417 120 90", art: <Mouse /> },
  "monitor-arm": { viewBox: "487 263 293 220", art: <MonitorArm count={0} variant="single" /> },
};

interface ProductIllustrationProps extends SVGProps<SVGSVGElement> {
  productId: ProductId;
  background?: string;
}

export function ProductIllustration({ productId, background = "#F1EFE9", ...svgProps }: ProductIllustrationProps) {
  const { viewBox, art } = THUMBNAILS[productId];
  const [x, y, width, height] = viewBox.split(" ").map(Number);

  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" {...svgProps}>
      <rect x={x} y={y} width={width} height={height} fill={background} />
      {art}
    </svg>
  );
}
