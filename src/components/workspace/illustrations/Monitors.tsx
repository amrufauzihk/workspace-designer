import { MATERIALS as M } from "./materials";
import { getScreenLayout } from "./scene-geometry";

interface ScreenProps {
  cx: number;
  width: number;
  height: number;
  bottom: number;
  screen: string;
  accent: string;
  variant: number;
}

function Screen({ cx, width, height, bottom, screen, accent, variant }: ScreenProps) {
  const x = cx - width / 2;
  const y = bottom - height;
  const innerX = x + 6;
  const innerY = y + 6;
  const innerW = width - 12;
  const innerH = height - 18;
  const lines = variant % 2 === 0 ? [0.62, 0.44, 0.7, 0.36, 0.52] : [0.5, 0.68, 0.4, 0.58, 0.3];

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={M.bezel} />
      <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={3} fill={screen} />
      <rect x={innerX + 10} y={innerY + 10} width={innerW * 0.28} height={6} rx={3} fill={accent} />
      {lines.map((fraction, index) => (
        <rect
          key={index}
          x={innerX + 10 + (index % 3 === 1 ? 12 : 0)}
          y={innerY + 26 + index * (innerH * 0.11)}
          width={innerW * 0.55 * fraction}
          height={4}
          rx={2}
          fill="#FFFFFF"
          opacity={index === 2 ? 0.32 : 0.16}
        />
      ))}
      <rect
        x={innerX + innerW * 0.66}
        y={innerY + 24}
        width={innerW * 0.26}
        height={innerH * 0.42}
        rx={3}
        fill={accent}
        opacity={0.22}
      />
      <circle cx={cx} cy={bottom - 6} r={1.6} fill="#5B5F57" />
    </g>
  );
}

function Stand({ cx, from }: { cx: number; from: number }) {
  return (
    <g>
      <rect x={cx - 7} y={from} width={14} height={446 - from} fill={M.inkSoft} />
      <rect x={cx - 40} y={444} width={80} height={9} rx={4.5} fill={M.ink} />
    </g>
  );
}

interface MonitorSetupProps {
  count: number;
  variant: "single" | "dual";
  withArm: boolean;
  screen: string;
  accent: string;
}

export function MonitorSetup({ count, variant, withArm, screen, accent }: MonitorSetupProps) {
  if (count < 1) return null;
  const layout = getScreenLayout(count, variant);

  return (
    <g>
      {!withArm &&
        (variant === "dual" ? (
          <Stand cx={600} from={layout.bottom - layout.height / 2} />
        ) : (
          layout.centers.map((cx) => <Stand key={cx} cx={cx} from={layout.bottom - 4} />)
        ))}
      {layout.centers.map((cx, index) => (
        <Screen
          key={cx}
          cx={cx}
          width={layout.width}
          height={layout.height}
          bottom={layout.bottom}
          screen={screen}
          accent={accent}
          variant={index}
        />
      ))}
    </g>
  );
}

interface MonitorArmProps {
  count: number;
  variant: "single" | "dual";
}

export function MonitorArm({ count, variant }: MonitorArmProps) {
  if (count < 1) {
    return (
      <g>
        <rect x={594} y={328} width={12} height={126} rx={6} fill={M.inkSoft} />
        <path d="M600 332 L664 300" stroke={M.inkSoft} strokeWidth={9} strokeLinecap="round" />
        <circle cx={600} cy={332} r={8} fill={M.steelLight} />
        <circle cx={664} cy={300} r={7} fill={M.steelLight} />
        <rect x={660} y={282} width={22} height={36} rx={3} fill={M.ink} />
        <g fill={M.steelLight}>
          <circle cx={666} cy={290} r={1.8} />
          <circle cx={676} cy={290} r={1.8} />
          <circle cx={666} cy={310} r={1.8} />
          <circle cx={676} cy={310} r={1.8} />
        </g>
        <rect x={584} y={444} width={32} height={20} rx={4} fill={M.ink} />
      </g>
    );
  }

  const layout = getScreenLayout(count, variant);
  const armY = layout.bottom - layout.height / 2;
  const left = layout.centers[0];
  const right = layout.centers[layout.centers.length - 1];

  return (
    <g>
      <rect x={594} y={armY - 20} width={12} height={454 - (armY - 20)} rx={6} fill={M.inkSoft} />
      {right > left && <rect x={left} y={armY - 5} width={right - left} height={10} rx={5} fill={M.inkSoft} />}
      <circle cx={600} cy={armY} r={9} fill={M.steelLight} />
      <rect x={584} y={444} width={32} height={20} rx={4} fill={M.ink} />
    </g>
  );
}
