"use client";

import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { canAccessStep, getContinueBlocker, getNextStep, getPreviousStep } from "@/lib/steps";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { ConfiguratorStep } from "@/types/workspace";

export const CONFIGURATOR_SECTION_ID = "studio";

const NEXT_LABELS: Record<ConfiguratorStep, string> = {
  desk: "Continue to chair",
  chair: "Personalize",
  personalize: "Choose duration",
  duration: "Review workspace",
  review: "Continue to inquiry",
  inquiry: "Submit inquiry",
};

function scrollConfiguratorIntoView() {
  window.requestAnimationFrame(() => {
    const section = document.getElementById(CONFIGURATOR_SECTION_ID);
    if (!section) return;
    const { top } = section.getBoundingClientRect();
    if (top < 0) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  });
}

export function useStepNavigation() {
  const { step, deskId, chairId, setStep } = useWorkspaceStore(
    useShallow((state) => ({
      step: state.step,
      deskId: state.deskId,
      chairId: state.chairId,
      setStep: state.setStep,
    })),
  );

  const config = { deskId, chairId };
  const next = getNextStep(step);
  const previous = getPreviousStep(step);
  const blocker = getContinueBlocker(step, config);

  const goTo = useCallback(
    (target: ConfiguratorStep) => {
      if (!canAccessStep(target, { deskId, chairId })) return;
      setStep(target);
      scrollConfiguratorIntoView();
    },
    [deskId, chairId, setStep],
  );

  return {
    step,
    next,
    previous,
    blocker,
    canContinue: next !== null && blocker === null,
    nextLabel: NEXT_LABELS[step],
    goTo,
    goNext: () => next && goTo(next),
    goBack: () => previous && goTo(previous),
    canAccess: (target: ConfiguratorStep) => canAccessStep(target, config),
  };
}
