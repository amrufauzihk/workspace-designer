import { MATERIALS as M } from "./materials";

export function OakDesk() {
  return (
    <g>
      <ellipse cx={600} cy={704} rx={330} ry={12} fill={M.shadow} />
      <path d="M338 494 H352 L356 684 H346 Z" fill={M.oakDark} />
      <path d="M848 494 H862 L854 684 H844 Z" fill={M.oakDark} />
      <path d="M302 494 H326 L316 702 H300 Z" fill={M.oakLeg} />
      <path d="M874 494 H898 L900 702 H884 Z" fill={M.oakLeg} />
      <rect x={300} y={494} width={600} height={22} fill={M.oakEdge} />
      <rect x={520} y={498} width={160} height={14} rx={2} fill={M.oakDark} opacity={0.35} />
      <rect x={585} y={503} width={30} height={3} rx={1.5} fill="#7E6048" />
      <path d="M320 446 H880 L916 478 H284 Z" fill={M.oakTop} />
      <path
        d="M360 455 H700 M430 464 H850 M330 472 H520 M760 452 H860"
        stroke={M.oakEdge}
        strokeOpacity={0.35}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <rect x={284} y={478} width={632} height={18} rx={2} fill={M.oakEdge} />
      <rect x={284} y={478} width={632} height={3} fill={M.oakHighlight} />
    </g>
  );
}

export function StudioDesk() {
  return (
    <g>
      <ellipse cx={600} cy={704} rx={340} ry={12} fill={M.shadow} />
      <rect x={300} y={688} width={130} height={12} rx={6} fill={M.steel} />
      <rect x={770} y={688} width={130} height={12} rx={6} fill={M.steel} />
      <rect x={350} y={590} width={30} height={100} fill={M.steel} />
      <rect x={820} y={590} width={30} height={100} fill={M.steel} />
      <rect x={354} y={490} width={22} height={102} fill={M.steelLight} />
      <rect x={824} y={490} width={22} height={102} fill={M.steelLight} />
      <rect x={365} y={490} width={470} height={12} fill={M.steel} />
      <path d="M306 440 H894 L932 474 H268 Z" fill={M.whiteTop} />
      <ellipse cx={790} cy={447} rx={12} ry={3} fill="#D9D4C8" />
      <rect x={268} y={474} width={664} height={16} rx={2} fill={M.whiteEdge} />
      <rect x={268} y={488} width={664} height={2} fill="#000000" opacity={0.06} />
      <rect x={842} y={490} width={46} height={10} rx={3} fill={M.steel} />
      <circle cx={853} cy={495} r={2} fill={M.sage} />
    </g>
  );
}

/** Dashed outline shown before a desk is chosen. */
export function GhostDesk({ className }: { className?: string }) {
  return (
    <g
      className={className}
      fill="none"
      stroke="#B3AEA2"
      strokeWidth={2}
      strokeDasharray="8 8"
      strokeLinecap="round"
    >
      <path d="M320 446 H880 L916 478 H284 Z" />
      <path d="M284 478 H916 V496 H284 Z" />
      <path d="M310 496 V700 M890 496 V700" />
    </g>
  );
}
