"use client";

import { Eye, EyeOff, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { SCENES } from "@/data/scenes";
import { useWorkspaceStore } from "@/store/workspace-store";

function ResetButton() {
  const reset = useWorkspaceStore((state) => state.reset);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timeout = window.setTimeout(() => setConfirming(false), 3500);
    return () => window.clearTimeout(timeout);
  }, [confirming]);

  return (
    <button
      type="button"
      onClick={() => {
        if (confirming) {
          reset();
          setConfirming(false);
        } else {
          setConfirming(true);
        }
      }}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition ${
        confirming
          ? "border-danger/30 bg-danger-soft text-danger"
          : "border-line bg-surface text-ink hover:border-line-strong"
      }`}
    >
      <RotateCcw className="size-4" aria-hidden="true" />
      {confirming ? "Tap again to reset" : "Reset"}
    </button>
  );
}

export function WorkspaceControls() {
  const scene = useWorkspaceStore((state) => state.scene);
  const setScene = useWorkspaceStore((state) => state.setScene);
  const showLabels = useWorkspaceStore((state) => state.showLabels);
  const toggleLabels = useWorkspaceStore((state) => state.toggleLabels);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <fieldset className="flex items-center gap-2">
        <legend className="sr-only">Room style</legend>
        <span className="mr-1 hidden text-xs font-medium uppercase tracking-[0.14em] text-muted sm:inline" aria-hidden="true">
          Room
        </span>
        {SCENES.map((option) => (
          <label key={option.id} className="relative cursor-pointer" title={option.description}>
            <input
              type="radio"
              name="scene"
              value={option.id}
              checked={scene === option.id}
              onChange={() => setScene(option.id)}
              className="peer sr-only"
            />
            <span className="flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface pl-1.5 pr-3 text-sm text-muted transition peer-checked:border-forest peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest hover:border-line-strong">
              <span
                className="size-6 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: option.swatch }}
                aria-hidden="true"
              />
              <span className="hidden md:inline lg:hidden xl:inline">{option.name}</span>
              <span className="md:hidden lg:inline xl:hidden">{option.name.split(" ")[0]}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleLabels}
          aria-pressed={showLabels}
          title="Show numbered markers and add buttons in the room"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink transition hover:border-line-strong"
        >
          {showLabels ? <Eye className="size-4" aria-hidden="true" /> : <EyeOff className="size-4" aria-hidden="true" />}
          Guides
        </button>
        <ResetButton />
      </div>
    </div>
  );
}
