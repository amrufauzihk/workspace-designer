"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CONCEPT_CATEGORIES } from "@/data/concept-categories";
import type { ConceptCategory } from "@/types/workspace";
import { ConceptVignette } from "../workspace/illustrations/ConceptVignettes";

function ConceptCard({ category }: { category: ConceptCategory }) {
  const [open, setOpen] = useState(false);
  const panelId = `concept-${category.id}`;

  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex gap-4 p-3 sm:flex-col sm:gap-0 sm:p-0">
        <ConceptVignette
          id={category.id}
          className="aspect-[4/3] w-28 shrink-0 self-start rounded-xl sm:aspect-[16/10] sm:w-full sm:rounded-none"
        />
        <div className="min-w-0 flex-1 sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">Concept</p>
          <h3 className="mt-0.5 font-display text-2xl leading-tight text-ink">{category.name}</h3>
          <p className="mt-1 text-sm leading-snug text-muted">{category.summary}</p>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-3 inline-flex items-center gap-1 rounded-md text-sm font-medium text-forest transition hover:text-forest-deep"
          >
            {open ? "Hide example kit" : "See example kit"}
            <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line bg-canvas/70 px-4 py-4 sm:px-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Example equipment</p>
            <ul className="mt-2 space-y-1.5">
              {category.examples.map((example) => (
                <li key={example} className="flex items-center gap-2 text-sm text-ink">
                  <span className="size-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />
                  {example}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-subtle">
              Illustrative concept. Not available to rent here and not included in your estimate.
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

/** Optional exploration area. Deliberately separate from the configurator and its pricing. */
export function BeyondTheDesk() {
  return (
    <section id="beyond-the-desk" aria-labelledby="beyond-heading" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">Beyond the desk</p>
            <h2 id="beyond-heading" className="mt-2 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
              Other corners of a longer stay.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Ideas for what could sit alongside your workspace. These are illustrative concepts only: not live
            inventory, not rentable here and never added to your estimate.
          </p>
        </header>

        <ul className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONCEPT_CATEGORIES.map((category) => (
            <ConceptCard key={category.id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
}
