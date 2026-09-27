import type { ConceptCategory } from "@/types/workspace";

/**
 * Concept categories beyond the desk. Illustrative ideas only: they are not
 * part of the rentable catalog, carry no prices and are never added to an estimate.
 */
export const CONCEPT_CATEGORIES: readonly ConceptCategory[] = [
  {
    id: "coffee-station",
    name: "Coffee Station",
    summary: "A small corner for the first cup of the day, without a trip to the café.",
    examples: ["Espresso machine", "Burr grinder", "Kettle and pour-over set", "Compact serving cart"],
  },
  {
    id: "outdoor-gear",
    name: "Outdoor Gear",
    summary: "For the hours between calls: the beach, the waves or a quiet balcony.",
    examples: ["Surfboard rack", "Beach umbrella", "Folding lounge chair", "Cooler box"],
  },
  {
    id: "relax-zone",
    name: "Relax Zone",
    summary: "Somewhere to step away from the screen and actually switch off.",
    examples: ["Lounge sofa or bean bag", "Floor reading lamp", "Woven rug", "Side table"],
  },
  {
    id: "garage-space",
    name: "Garage Space",
    summary: "Storage and wheels for longer stays, kept tidy and out of the way.",
    examples: ["Bicycle", "Helmet and lock", "Wall storage shelf", "Storage boxes"],
  },
];
