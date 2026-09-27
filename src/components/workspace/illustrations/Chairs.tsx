import { MATERIALS as M } from "./materials";

export function ErgonomicChair() {
  const legEnds: [number, number][] = [
    [494, 750],
    [706, 750],
    [546, 760],
    [654, 760],
  ];

  return (
    <g>
      <ellipse cx={600} cy={772} rx={130} ry={12} fill={M.shadow} />
      <g stroke={M.ink} strokeWidth={10} strokeLinecap="round">
        {legEnds.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M600 734 L${x} ${y}`} />
        ))}
        <path d="M600 734 L600 724" />
      </g>
      {legEnds.map(([x, y]) => (
        <circle key={`caster-${x}`} cx={x} cy={y + 8} r={8} fill="#1C1E1A" />
      ))}
      <rect x={593} y={662} width={14} height={72} fill={M.steelLight} />
      <rect x={589} y={702} width={22} height={32} rx={3} fill={M.ink} />
      <rect x={508} y={632} width={184} height={34} rx={16} fill="#3A3E37" />
      <rect x={516} y={600} width={10} height={44} fill={M.ink} />
      <rect x={674} y={600} width={10} height={44} fill={M.ink} />
      <rect x={496} y={592} width={48} height={12} rx={6} fill={M.ink} />
      <rect x={656} y={592} width={48} height={12} rx={6} fill={M.ink} />
      <path d="M534 506 Q600 494 666 506 L656 630 Q600 640 544 630 Z" fill={M.mesh} />
      <path d="M544 516 Q600 506 656 516 L648 620 Q600 628 552 620 Z" fill={M.meshInner} />
      <g stroke={M.meshLine} strokeWidth={1}>
        {Array.from({ length: 10 }, (_, index) => {
          const y = 526 + index * 10;
          return <line key={y} x1={548} y1={y} x2={652} y2={y} />;
        })}
      </g>
      <path d="M548 588 Q600 580 652 588 L650 604 Q600 597 550 604 Z" fill="#555B52" />
      <rect x={596} y={630} width={8} height={10} fill={M.ink} />
      <rect x={596} y={496} width={8} height={14} fill={M.ink} />
      <rect x={562} y={478} width={76} height={22} rx={11} fill={M.mesh} />
    </g>
  );
}

export function MinimalChair() {
  return (
    <g>
      <ellipse cx={600} cy={772} rx={112} ry={11} fill={M.shadow} />
      <rect x={546} y={660} width={8} height={80} fill={M.oakDark} />
      <rect x={646} y={660} width={8} height={80} fill={M.oakDark} />
      <path d="M526 628 H674 L684 642 H516 Z" fill={M.sageDark} />
      <rect x={516} y={640} width={168} height={20} rx={6} fill={M.oakEdge} />
      <path d="M524 506 H536 L532 768 H520 Z" fill={M.oakLeg} />
      <path d="M664 506 H676 L680 768 H668 Z" fill={M.oakLeg} />
      <rect x={530} y={718} width={140} height={7} rx={3} fill={M.oakDark} />
      <rect x={528} y={598} width={144} height={8} rx={4} fill={M.oakEdge} />
      <rect x={518} y={512} width={164} height={48} rx={18} fill={M.oakEdge} />
      <rect x={530} y={520} width={140} height={32} rx={13} fill={M.sage} />
      <rect x={530} y={520} width={140} height={6} rx={3} fill="#FFFFFF" opacity={0.12} />
    </g>
  );
}
