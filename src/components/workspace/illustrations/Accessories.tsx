import { MATERIALS as M } from "./materials";

export function DeskLamp() {
  return (
    <g>
      <ellipse cx={396} cy={462} rx={92} ry={12} fill={M.warmLight} opacity={0.4} />
      <circle cx={372} cy={250} r={60} fill={M.warmLight} opacity={0.22} />
      <rect x={304} y={450} width={52} height={10} rx={5} fill={M.forest} />
      <path d="M330 452 L300 322" stroke={M.forest} strokeWidth={7} strokeLinecap="round" />
      <path d="M337 448 L307 326" stroke={M.steelLight} strokeWidth={2} strokeLinecap="round" />
      <circle cx={300} cy={322} r={7} fill={M.forestDeep} />
      <path d="M300 322 L352 216" stroke={M.forest} strokeWidth={6} strokeLinecap="round" />
      <g transform="rotate(-35 352 216)">
        <path d="M340 208 H366 L382 242 H324 Z" fill={M.forest} />
        <ellipse cx={353} cy={242} rx={29} ry={5} fill={M.warmLight} />
      </g>
      <circle cx={352} cy={216} r={6} fill={M.forestDeep} />
    </g>
  );
}

interface LeafSpec {
  stemX: number;
  stemY: number;
  angle: number;
  length: number;
  width: number;
  tone: number;
}

const PLANT_ORIGIN = { x: 1010, y: 632 };

const LEAVES: LeafSpec[] = [
  { stemX: 975, stemY: 602, angle: -78, length: 64, width: 34, tone: 1 },
  { stemX: 1046, stemY: 602, angle: 74, length: 66, width: 34, tone: 3 },
  { stemX: 962, stemY: 560, angle: -52, length: 84, width: 44, tone: 0 },
  { stemX: 1060, stemY: 556, angle: 50, length: 84, width: 44, tone: 1 },
  { stemX: 986, stemY: 520, angle: -22, length: 92, width: 48, tone: 2 },
  { stemX: 1036, stemY: 504, angle: 20, length: 100, width: 50, tone: 0 },
  { stemX: 1004, stemY: 476, angle: -6, length: 106, width: 52, tone: 3 },
  { stemX: 1024, stemY: 452, angle: 12, length: 70, width: 38, tone: 2 },
];

function Leaf({ stemX, stemY, angle, length, width, tone }: LeafSpec) {
  const L = length;
  const W = width;
  const d = `M0 0 C${W * 0.6} ${-L * 0.25} ${W * 0.5} ${-L * 0.8} 0 ${-L} C${-W * 0.5} ${-L * 0.8} ${-W * 0.6} ${-L * 0.25} 0 0 Z`;
  return (
    <g transform={`translate(${stemX} ${stemY}) rotate(${angle})`}>
      <path d={d} fill={M.leaves[tone]} />
      <path d={`M0 -2 L0 ${-L * 0.86}`} stroke="#FFFFFF" strokeOpacity={0.22} strokeWidth={1.5} />
    </g>
  );
}

export function IndoorPlant() {
  return (
    <g>
      <ellipse cx={1010} cy={722} rx={62} ry={8} fill={M.shadow} />
      <g stroke={M.stem} strokeWidth={3} fill="none" strokeLinecap="round">
        {LEAVES.map((leaf) => (
          <path
            key={`${leaf.stemX}-${leaf.stemY}`}
            d={`M${PLANT_ORIGIN.x} ${PLANT_ORIGIN.y} Q${(PLANT_ORIGIN.x + leaf.stemX) / 2} ${leaf.stemY + 30} ${leaf.stemX} ${leaf.stemY}`}
          />
        ))}
      </g>
      {LEAVES.map((leaf) => (
        <Leaf key={`leaf-${leaf.stemX}-${leaf.stemY}`} {...leaf} />
      ))}
      <ellipse cx={1010} cy={634} rx={44} ry={5} fill={M.soil} />
      <path d="M966 642 H1054 L1044 720 H976 Z" fill={M.terracotta} />
      <rect x={960} y={630} width={100} height={14} rx={4} fill={M.terracottaDark} />
      <path d="M974 650 H986 L981 712 H976 Z" fill="#FFFFFF" opacity={0.14} />
    </g>
  );
}

export function MechanicalKeyboard() {
  return (
    <g>
      <ellipse cx={600} cy={472} rx={88} ry={3} fill={M.shadow} />
      <path d="M522 450 H678 L686 470 H514 Z" fill={M.inkSoft} />
      <path d="M527 453 H673 L679 467 H521 Z" fill={M.keycap} />
      <path d="M525 457.5 H675 M523 462.5 H677" stroke={M.keyline} strokeWidth={1} />
      <path d="M560 453 L558 467 M600 453 V467 M640 453 L642 467" stroke={M.keyline} strokeWidth={1} />
      <rect x={530} y={454} width={10} height={2.5} rx={1} fill={M.sage} />
      <rect x={574} y={463.5} width={52} height={2.5} rx={1} fill={M.keyline} />
    </g>
  );
}

export function Mouse() {
  return (
    <g>
      <path d="M704 452 H770 L778 472 H696 Z" fill={M.pad} />
      <ellipse cx={740} cy={462} rx={11} ry={7} fill={M.keycap} stroke={M.inkSoft} strokeWidth={1.5} />
      <path d="M740 455.5 V460" stroke={M.inkSoft} strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}
