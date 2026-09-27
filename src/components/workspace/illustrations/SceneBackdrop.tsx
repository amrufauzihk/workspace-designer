import { useId } from "react";
import type { ScenePalette } from "@/data/scenes";
import type { SceneTheme } from "@/types/workspace";

interface SceneBackdropProps {
  scene: SceneTheme;
  palette: ScenePalette;
}

const GLASS = { x: 126, y: 86, width: 308, height: 328 };

function CangguView() {
  return (
    <g>
      <rect {...GLASS} fill="#F7DABD" />
      <rect x={GLASS.x} y={GLASS.y} width={GLASS.width} height={90} fill="#F3C9A4" opacity={0.7} />
      <circle cx={336} cy={300} r={36} fill="#FCEBD2" />
      <rect x={GLASS.x} y={318} width={GLASS.width} height={96} fill="#A8C1B8" />
      <path d="M140 338 H240 M280 352 H420 M160 372 H300" stroke="#CADBD4" strokeWidth={3} strokeLinecap="round" />
      <path d="M126 396 Q260 382 434 394 V414 H126 Z" fill="#EAD6B9" />
      <path d="M196 414 C198 360 206 300 222 250" stroke="#6E5D47" strokeWidth={7} fill="none" strokeLinecap="round" />
      <g fill="#4F6A4A">
        <path d="M222 250 C200 236 176 238 158 252 C182 248 202 250 222 256 Z" />
        <path d="M222 250 C240 232 266 230 286 240 C262 242 242 248 224 258 Z" />
        <path d="M222 250 C214 226 198 212 178 206 C196 222 208 238 218 256 Z" />
        <path d="M222 250 C236 228 252 218 272 214 C254 228 240 242 226 258 Z" />
        <path d="M222 250 C210 262 200 282 198 302 C210 284 218 268 226 256 Z" />
      </g>
    </g>
  );
}

function UbudView() {
  return (
    <g>
      <rect {...GLASS} fill="#E2ECDB" />
      <path d="M126 290 Q210 226 300 272 T434 250 V414 H126 Z" fill="#B7CAA9" />
      <path d="M126 346 Q250 286 434 330 V414 H126 Z" fill="#94AE87" />
      <path d="M126 384 Q280 350 434 380 V414 H126 Z" fill="#7A9670" />
      <g fill="#5E7A55">
        <path d="M126 414 C150 360 200 330 250 336 C210 350 180 380 170 414 Z" />
        <path d="M434 96 C400 130 380 170 384 214 C398 180 416 150 434 138 Z" />
      </g>
      <g fill="#6F8B63">
        <path d="M126 300 C160 300 190 320 200 350 C170 340 146 328 126 330 Z" />
        <path d="M434 180 C410 200 402 230 408 262 C420 236 428 214 434 208 Z" />
      </g>
    </g>
  );
}

function StudioView() {
  return (
    <g>
      <rect {...GLASS} fill="#E6ECEC" />
      <ellipse cx={210} cy={140} rx={46} ry={12} fill="#FFFFFF" opacity={0.85} />
      <ellipse cx={360} cy={180} rx={36} ry={9} fill="#FFFFFF" opacity={0.7} />
      <rect x={140} y={300} width={60} height={114} fill="#D3DADB" />
      <rect x={206} y={262} width={46} height={152} fill="#C7CFD0" />
      <rect x={258} y={318} width={70} height={96} fill="#D8DEDE" />
      <rect x={334} y={286} width={52} height={128} fill="#CBD2D3" />
      <rect x={392} y={330} width={42} height={84} fill="#D3DADB" />
    </g>
  );
}

export function SceneBackdrop({ scene, palette }: SceneBackdropProps) {
  const clipId = `glass-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <g>
      <rect width={1200} height={560} fill={palette.wall} />
      <rect x={0} y={0} width={1200} height={40} fill={palette.wallShade} opacity={0.7} />
      <rect y={548} width={1200} height={14} fill={palette.baseboard} />
      <rect y={562} width={1200} height={238} fill={palette.floor} />
      <g stroke={palette.floorLine} strokeWidth={1.5} opacity={0.65}>
        {Array.from({ length: 15 }, (_, index) => {
          const offset = index - 7;
          return <line key={offset} x1={600 + offset * 95} y1={562} x2={600 + offset * 230} y2={800} />;
        })}
      </g>
      <path d="M150 600 H470 L560 770 H110 Z" fill="#FFFFFF" opacity={0.13} />

      <clipPath id={clipId}>
        <rect {...GLASS} />
      </clipPath>
      <rect x={110} y={70} width={340} height={360} rx={4} fill={palette.frame} />
      <g clipPath={`url(#${clipId})`}>
        {scene === "canggu" && <CangguView />}
        {scene === "ubud" && <UbudView />}
        {scene === "studio" && <StudioView />}
      </g>
      <rect x={276} y={86} width={8} height={328} fill={palette.frame} />
      <rect x={126} y={242} width={308} height={8} fill={palette.frame} />
      <rect x={96} y={428} width={368} height={12} rx={3} fill={palette.frame} />
      <rect x={100} y={440} width={360} height={5} fill="#000000" opacity={0.05} />

      <rect x={930} y={120} width={150} height={190} rx={3} fill={palette.frame} />
      <rect x={942} y={132} width={126} height={166} fill={palette.artDetail} />
      <circle cx={1005} cy={196} r={34} fill={palette.artBase} />
      <path d="M942 298 Q1000 226 1068 268 V298 Z" fill={palette.artAccent} />
      <rect x={934} y={310} width={142} height={4} fill="#000000" opacity={0.04} />

      <ellipse cx={600} cy={732} rx={410} ry={52} fill={palette.rug} />
      <ellipse cx={600} cy={732} rx={370} ry={40} fill="none" stroke={palette.rugStripe} strokeWidth={3} />
    </g>
  );
}
