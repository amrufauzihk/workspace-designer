import { isConfigurationComplete } from "@/lib/workspace-utils";
import type { ConfiguratorStep, WorkspaceConfiguration } from "@/types/workspace";

export interface StepDefinition {
  id: ConfiguratorStep;
  label: string;
  title: string;
  description: string;
}

export const CONFIGURATOR_STEPS: readonly StepDefinition[] = [
  {
    id: "desk",
    label: "Desk",
    title: "Choose your desk",
    description: "The foundation of your setup. Everything else builds around it.",
  },
  {
    id: "chair",
    label: "Chair",
    title: "Pick your chair",
    description: "You will sit here for hours. Choose what your back will thank you for.",
  },
  {
    id: "personalize",
    label: "Personalize",
    title: "Personalize your space",
    description: "Add screens and the small things that make a desk feel like yours.",
  },
  {
    id: "duration",
    label: "Duration",
    title: "How long are you staying?",
    description: "Pick a rental period. Your estimate updates instantly.",
  },
  {
    id: "review",
    label: "Review",
    title: "Review your workspace",
    description: "Check everything before preparing your rental inquiry.",
  },
  {
    id: "inquiry",
    label: "Inquiry",
    title: "Send a rental inquiry",
    description: "Tell us where and when. We will prepare a draft you can share.",
  },
];

type StepConfig = Pick<WorkspaceConfiguration, "deskId" | "chairId">;

export function getStepIndex(step: ConfiguratorStep): number {
  return CONFIGURATOR_STEPS.findIndex((definition) => definition.id === step);
}

export function getStepDefinition(step: ConfiguratorStep): StepDefinition {
  return CONFIGURATOR_STEPS[getStepIndex(step)] ?? CONFIGURATOR_STEPS[0];
}

/** Review and inquiry require a desk and chair; earlier steps are always open. */
export function canAccessStep(step: ConfiguratorStep, config: StepConfig): boolean {
  if (step === "review" || step === "inquiry") return isConfigurationComplete(config);
  return true;
}

/** Why the user cannot continue from `step`, or null when they can. */
export function getContinueBlocker(step: ConfiguratorStep, config: StepConfig): string | null {
  if (step === "desk" && !config.deskId) return "Choose a desk to continue";
  if (step === "chair" && !config.chairId) return "Pick a chair to continue";
  const next = getNextStep(step);
  if (next && !canAccessStep(next, config)) {
    return config.deskId ? "Pick a chair to continue" : "Choose a desk to continue";
  }
  return null;
}

export function getNextStep(step: ConfiguratorStep): ConfiguratorStep | null {
  return CONFIGURATOR_STEPS[getStepIndex(step) + 1]?.id ?? null;
}

export function getPreviousStep(step: ConfiguratorStep): ConfiguratorStep | null {
  const index = getStepIndex(step);
  return index > 0 ? CONFIGURATOR_STEPS[index - 1].id : null;
}
