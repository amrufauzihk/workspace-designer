"use client";

import { Check } from "lucide-react";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { CONFIGURATOR_STEPS, getStepIndex } from "@/lib/steps";
import { useWorkspaceStore } from "@/store/workspace-store";

export function ConfiguratorStepper() {
  const { step, goTo, canAccess } = useStepNavigation();
  const deskId = useWorkspaceStore((state) => state.deskId);
  const chairId = useWorkspaceStore((state) => state.chairId);
  const currentIndex = getStepIndex(step);
  const progress = (currentIndex / (CONFIGURATOR_STEPS.length - 1)) * 100;

  const isDone = (index: number) => {
    const id = CONFIGURATOR_STEPS[index].id;
    if (id === "desk") return deskId !== null;
    if (id === "chair") return chairId !== null;
    return index < currentIndex;
  };

  return (
    <nav aria-label="Configurator progress">
      <p className="mb-3 flex items-baseline justify-between text-xs font-medium uppercase tracking-[0.14em] text-muted">
        <span>
          Step {currentIndex + 1} of {CONFIGURATOR_STEPS.length}
        </span>
        <span className="normal-case tracking-normal text-ink sm:hidden">{CONFIGURATOR_STEPS[currentIndex].label}</span>
      </p>
      <div className="relative">
        <div className="absolute left-4 right-4 top-4 h-px bg-line" aria-hidden="true">
          <div className="h-px bg-forest transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <ol className="relative flex justify-between">
          {CONFIGURATOR_STEPS.map((definition, index) => {
            const active = index === currentIndex;
            const done = isDone(index) && !active;
            const accessible = canAccess(definition.id);
            return (
              <li key={definition.id} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => goTo(definition.id)}
                  disabled={!accessible}
                  aria-current={active ? "step" : undefined}
                  aria-label={`Step ${index + 1}: ${definition.label}${done ? " (done)" : ""}${accessible ? "" : " (choose a desk and chair first)"}`}
                  className={`group flex flex-col items-center gap-1.5 rounded-lg px-1 disabled:cursor-not-allowed ${
                    active ? "" : "hover:opacity-80"
                  }`}
                >
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                      active
                        ? "border-forest bg-forest text-white shadow-soft"
                        : done
                          ? "border-forest/40 bg-sage-soft text-forest"
                          : accessible
                            ? "border-line-strong bg-surface text-muted"
                            : "border-line bg-canvas text-subtle"
                    }`}
                  >
                    {done ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
                  </span>
                  <span
                    className={`hidden text-[11px] font-medium sm:block ${active ? "text-ink" : accessible ? "text-muted" : "text-subtle"}`}
                  >
                    {definition.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
