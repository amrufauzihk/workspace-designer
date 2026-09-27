"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, type ReactNode } from "react";
import { getProduct } from "@/data/products";
import { getScene } from "@/data/scenes";
import { getMonitorScreenCount } from "@/lib/workspace-utils";
import type { WorkspaceConfiguration } from "@/types/workspace";
import { DeskLamp, IndoorPlant, MechanicalKeyboard, Mouse } from "./Accessories";
import { ErgonomicChair, MinimalChair } from "./Chairs";
import { GhostDesk, OakDesk, StudioDesk } from "./Desks";
import { MonitorArm, MonitorSetup } from "./Monitors";
import { SceneBackdrop } from "./SceneBackdrop";
import { SCENE_HEIGHT, SCENE_WIDTH } from "./scene-geometry";

export type SceneConfiguration = Pick<
  WorkspaceConfiguration,
  "deskId" | "chairId" | "monitorId" | "monitorQuantity" | "accessoryIds" | "scene"
>;

interface WorkspaceSceneProps {
  configuration: SceneConfiguration;
  animated?: boolean;
  className?: string;
  label?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function Layer({ id, animated, children }: { id: string; animated: boolean; children: ReactNode }) {
  if (!animated) return <g>{children}</g>;
  return (
    <motion.g
      key={id}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.g>
  );
}

function describe(configuration: SceneConfiguration): string {
  const names = [configuration.deskId, configuration.chairId, configuration.monitorId, ...configuration.accessoryIds]
    .filter((id): id is NonNullable<typeof id> => id !== null)
    .map((id) => getProduct(id).name);
  return names.length > 0 ? `Workspace with ${names.join(", ")}.` : "An empty room waiting for a desk.";
}

export function WorkspaceScene({ configuration, animated = true, className, label }: WorkspaceSceneProps) {
  const titleId = useId();
  const descId = useId();
  const { deskId, chairId, monitorId, accessoryIds, scene } = configuration;
  const palette = getScene(scene).palette;
  const screenCount = getMonitorScreenCount(configuration);
  const variant = monitorId === "dual-monitor" ? "dual" : "single";
  const has = (id: (typeof accessoryIds)[number]) => accessoryIds.includes(id);
  const withArm = has("monitor-arm");

  const slot = (key: string | null, node: ReactNode) =>
    animated ? (
      <AnimatePresence initial={false}>
        {key && (
          <Layer key={key} id={key} animated>
            {node}
          </Layer>
        )}
      </AnimatePresence>
    ) : (
      key && <g>{node}</g>
    );

  return (
    <svg
      viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
      className={className}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <title id={titleId}>{label ?? "Workspace preview"}</title>
      <desc id={descId}>{describe(configuration)}</desc>

      <SceneBackdrop scene={scene} palette={palette} />

      {!deskId && <GhostDesk />}
      {slot(deskId, deskId === "oak-desk" ? <OakDesk /> : <StudioDesk />)}
      {slot(withArm ? `arm-${screenCount}-${variant}` : null, <MonitorArm count={screenCount} variant={variant} />)}
      {slot(
        screenCount > 0 ? `monitors-${screenCount}-${variant}-${withArm}-${scene}` : null,
        <MonitorSetup
          count={screenCount}
          variant={variant}
          withArm={withArm}
          screen={palette.screen}
          accent={palette.screenAccent}
        />,
      )}
      {slot(has("desk-lamp") ? "lamp" : null, <DeskLamp />)}
      {slot(has("mechanical-keyboard") ? "keyboard" : null, <MechanicalKeyboard />)}
      {slot(has("mouse") ? "mouse" : null, <Mouse />)}
      {slot(has("indoor-plant") ? "plant" : null, <IndoorPlant />)}
      {slot(chairId, chairId === "ergonomic-chair" ? <ErgonomicChair /> : <MinimalChair />)}
    </svg>
  );
}
