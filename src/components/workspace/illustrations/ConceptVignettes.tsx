import type { ComponentType } from "react";
import type { ConceptCategoryId } from "@/types/workspace";
import { MATERIALS as M } from "./materials";

const BOX_LIGHT = "#D9C3A0";
const BOX_DARK = "#C9AE86";
const CANVAS = "#F1E3C8";

function CoffeeStation() {
  return (
    <g>
      <ellipse cx={120} cy={128} rx={58} ry={4} fill={M.shadow} />
      <rect x={76} y={86} width={5} height={38} fill={M.oakLeg} />
      <rect x={159} y={86} width={5} height={38} fill={M.oakLeg} />
      <rect x={74} y={106} width={92} height={5} rx={1} fill={M.oakDark} />
      <rect x={68} y={78} width={104} height={8} rx={2} fill={M.oakEdge} />
      <rect x={68} y={78} width={104} height={2} fill={M.oakHighlight} />
      <circle cx={79} cy={126} r={3} fill={M.ink} />
      <circle cx={161} cy={126} r={3} fill={M.ink} />
      <rect x={90} y={98} width={10} height={8} rx={2} fill={M.terracotta} />
      <rect x={104} y={98} width={10} height={8} rx={2} fill={M.keycap} />
      <rect x={84} y={44} width={42} height={34} rx={4} fill={M.steel} />
      <rect x={86} y={40} width={38} height={5} rx={2} fill={M.steelLight} />
      <rect x={98} y={56} width={14} height={6} rx={1} fill={M.ink} />
      <rect x={100} y={66} width={9} height={7} rx={1.5} fill={M.keycap} />
      <rect x={92} y={73} width={26} height={3} rx={1} fill={M.ink} />
      <circle cx={118} cy={50} r={2} fill={M.sage} />
      <path d="M134 50 H152 L148 62 H138 Z" fill={M.sage} opacity={0.75} />
      <rect x={136} y={62} width={14} height={16} rx={2} fill={M.forest} />
      <path d="M100 34 Q104 28 100 22 M108 34 Q112 28 108 22" stroke={M.keyline} strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </g>
  );
}

function OutdoorGear() {
  return (
    <g>
      <ellipse cx={128} cy={126} rx={88} ry={5} fill={M.shadow} />
      <g transform="rotate(-12 64 78)">
        <ellipse cx={64} cy={78} rx={13} ry={48} fill={M.sage} />
        <path d="M64 32 V124" stroke={M.forest} strokeWidth={2} />
        <ellipse cx={64} cy={78} rx={13} ry={48} fill="none" stroke={M.sageDark} strokeWidth={1.5} />
      </g>
      <path d="M150 122 V44" stroke={M.steelLight} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M108 52 Q150 14 192 52 Z" fill={M.terracotta} />
      <path d="M150 28 Q138 36 130 50 L150 50 Z M150 28 Q162 36 170 50 L150 50 Z" fill="#E7B79A" />
      <path d="M134 96 L154 96 L170 122" stroke={M.oakDark} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M140 122 L152 100" stroke={M.oakDark} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M134 94 L154 94 L168 116 L148 116 Z" fill={CANVAS} stroke={M.oakLeg} strokeWidth={1.5} />
      <rect x={186} y={106} width={32} height={18} rx={3} fill={M.sage} />
      <rect x={184} y={101} width={36} height={6} rx={2} fill={M.forest} />
      <rect x={198} y={96} width={8} height={5} rx={1.5} fill={M.forestDeep} />
    </g>
  );
}

function RelaxZone() {
  return (
    <g>
      <ellipse cx={112} cy={128} rx={86} ry={9} fill="#D8CDB8" />
      <ellipse cx={112} cy={128} rx={72} ry={6} fill="none" stroke="#C8BBA2" strokeWidth={1.5} />
      <circle cx={182} cy={60} r={20} fill={M.warmLight} opacity={0.35} />
      <path d="M198 124 V52 Q198 38 182 38" stroke={M.inkSoft} strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M172 40 H192 L188 51 H176 Z" fill={M.oakHighlight} />
      <ellipse cx={198} cy={124} rx={10} ry={3} fill={M.ink} />
      <rect x={56} y={110} width={4} height={10} fill={M.oakDark} />
      <rect x={150} y={110} width={4} height={10} fill={M.oakDark} />
      <rect x={52} y={68} width={106} height={32} rx={12} fill={M.sage} />
      <rect x={46} y={92} width={118} height={20} rx={8} fill={M.sageDark} />
      <rect x={38} y={82} width={18} height={32} rx={8} fill={M.sage} />
      <rect x={154} y={82} width={18} height={32} rx={8} fill={M.sage} />
      <rect x={64} y={76} width={28} height={18} rx={6} fill="#EFE3CF" />
      <rect x={96} y={78} width={24} height={16} rx={6} fill={M.terracotta} opacity={0.85} />
    </g>
  );
}

function GarageSpace() {
  return (
    <g>
      <ellipse cx={120} cy={126} rx={96} ry={5} fill={M.shadow} />
      <rect x={144} y={26} width={22} height={18} rx={1.5} fill={BOX_LIGHT} />
      <rect x={170} y={32} width={18} height={12} rx={1.5} fill={BOX_DARK} />
      <rect x={192} y={30} width={20} height={14} rx={1.5} fill={M.sage} opacity={0.8} />
      <rect x={138} y={44} width={80} height={4} rx={1} fill={M.oakEdge} />
      <path d="M146 48 V56 M210 48 V56" stroke={M.oakDark} strokeWidth={2} />
      <rect x={174} y={78} width={28} height={20} rx={1.5} fill={BOX_DARK} />
      <rect x={168} y={96} width={40} height={28} rx={1.5} fill={BOX_LIGHT} />
      <path d="M168 104 H208" stroke={BOX_DARK} strokeWidth={2} />
      <g stroke={M.ink} strokeWidth={3} fill="none">
        <circle cx={56} cy={106} r={18} />
        <circle cx={128} cy={106} r={18} />
      </g>
      <g stroke={M.forest} strokeWidth={3} fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d="M56 106 L80 80 H114 L128 106" />
        <path d="M80 80 L94 106 L114 80" />
        <path d="M94 106 H56" />
        <path d="M80 80 L78 72" />
        <path d="M114 80 L117 68" />
      </g>
      <path d="M72 71 H86" stroke={M.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M111 68 L123 66" stroke={M.ink} strokeWidth={3} strokeLinecap="round" />
      <circle cx={94} cy={106} r={3} fill={M.steelLight} />
    </g>
  );
}

const VIGNETTES: Record<ConceptCategoryId, ComponentType> = {
  "coffee-station": CoffeeStation,
  "outdoor-gear": OutdoorGear,
  "relax-zone": RelaxZone,
  "garage-space": GarageSpace,
};

export function ConceptVignette({ id, className }: { id: ConceptCategoryId; className?: string }) {
  const Scene = VIGNETTES[id];
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width={240} height={150} fill="#F1EDE4" />
      <rect y={114} width={240} height={36} fill="#E6DCCB" />
      <rect y={112} width={240} height={3} fill="#E0D5C1" />
      <Scene />
    </svg>
  );
}
