import type { SceneTheme } from "@/types/workspace";

export interface ScenePalette {
  wall: string;
  wallShade: string;
  floor: string;
  floorLine: string;
  baseboard: string;
  rug: string;
  rugStripe: string;
  frame: string;
  artBase: string;
  artAccent: string;
  artDetail: string;
  screen: string;
  screenAccent: string;
}

export interface SceneOption {
  id: SceneTheme;
  name: string;
  description: string;
  swatch: string;
  palette: ScenePalette;
}

export const SCENES: readonly SceneOption[] = [
  {
    id: "canggu",
    name: "Canggu Morning",
    description: "Warm sand walls and a soft ocean light.",
    swatch: "#E9CFAF",
    palette: {
      wall: "#F2E8DB",
      wallShade: "#EADDCB",
      floor: "#D9C3A5",
      floorLine: "#CDB594",
      baseboard: "#E4D5C1",
      rug: "#EADFCF",
      rugStripe: "#DCCDB7",
      frame: "#FBF7F1",
      artBase: "#E7B894",
      artAccent: "#314537",
      artDetail: "#F6EDE1",
      screen: "#23302A",
      screenAccent: "#E7B894",
    },
  },
  {
    id: "ubud",
    name: "Ubud Greenery",
    description: "Sage walls and a view into the jungle.",
    swatch: "#A9BC9E",
    palette: {
      wall: "#E6EADF",
      wallShade: "#DCE2D3",
      floor: "#CBB594",
      floorLine: "#BEA682",
      baseboard: "#D6DBCB",
      rug: "#DDE3D3",
      rugStripe: "#CDD6C1",
      frame: "#F8F8F2",
      artBase: "#81977A",
      artAccent: "#F2E8DB",
      artDetail: "#314537",
      screen: "#1F2B24",
      screenAccent: "#A9C49C",
    },
  },
  {
    id: "studio",
    name: "Minimal Studio",
    description: "Bright, neutral and gallery-clean.",
    swatch: "#DAD6CD",
    palette: {
      wall: "#F4F3EF",
      wallShade: "#ECEBE5",
      floor: "#DBD7CE",
      floorLine: "#CFCAC0",
      baseboard: "#E8E6DF",
      rug: "#E9E6DE",
      rugStripe: "#DEDAD0",
      frame: "#FFFFFF",
      artBase: "#242722",
      artAccent: "#D9C3A5",
      artDetail: "#81977A",
      screen: "#242A26",
      screenAccent: "#BFD0B8",
    },
  },
];

export const DEFAULT_SCENE: SceneTheme = "canggu";

export function getScene(id: SceneTheme): SceneOption {
  return SCENES.find((scene) => scene.id === id) ?? SCENES[0];
}
