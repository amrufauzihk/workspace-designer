"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { CONFIGURATOR_SECTION_ID } from "@/hooks/use-step-navigation";
import { useHydrateWorkspaceStore, useWorkspaceSummary } from "@/hooks/use-workspace";
import { getStepDefinition } from "@/lib/steps";
import { useWorkspaceStore } from "@/store/workspace-store";
import { CheckoutView } from "../checkout/CheckoutView";
import { ConfiguratorStepper } from "./ConfiguratorStepper";
import { MobileActionBar } from "./MobileActionBar";
import { PriceSummary } from "./PriceSummary";
import { QuickAddToolbar } from "./QuickActions";
import { ReviewPanel } from "./ReviewPanel";
import { SelectedItems } from "./SelectedItems";
import { ChairStep, DeskStep, DurationStep, PersonalizeStep } from "./StepPanels";
import { StepNavigation } from "./StepNavigation";
import { WorkspaceControls } from "./WorkspaceControls";
import { WorkspacePreview } from "./WorkspacePreview";

function LiveAnnouncer() {
  const message = useWorkspaceStore((state) => state.announcement?.message ?? "");
  return (
    <p className="sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </p>
  );
}

export function WorkspaceConfigurator() {
  useHydrateWorkspaceStore();
  const step = useWorkspaceStore((state) => state.step);
  const summary = useWorkspaceSummary();
  const { configuration, lineItems, monthlySubtotal, estimatedTotal, title } = summary;
  const definition = getStepDefinition(step);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={CONFIGURATOR_SECTION_ID}
        aria-labelledby="studio-heading"
        className="mx-auto w-full max-w-7xl scroll-mt-16 px-4 pb-32 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24"
      >
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">Workspace Studio</p>
            <h2 id="studio-heading" className="mt-2 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
              {step === "inquiry" ? "Almost there." : "Build your setup, piece by piece."}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Every choice updates the room, your itemised price and your rental estimate instantly. Your setup is saved
            on this device.
          </p>
        </header>

        {step === "inquiry" ? (
          <CheckoutView
            title={title}
            configuration={configuration}
            lineItems={lineItems}
            monthlySubtotal={monthlySubtotal}
            estimatedTotal={estimatedTotal}
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_460px]">
            <div className="contents lg:sticky lg:top-24 lg:block lg:space-y-4 lg:self-start">
              <div className="sticky top-16 z-20 -mx-4 bg-canvas px-4 pb-2 pt-2 sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:p-0 [@media(max-height:560px)]:static">
                <div className="mx-auto max-w-xl lg:max-w-none">
                  <WorkspacePreview />
                </div>
              </div>
              <div className="mx-auto w-full max-w-xl empty:hidden sm:hidden">
                <QuickAddToolbar />
              </div>
              <div className="mx-auto w-full max-w-xl lg:max-w-none">
                <WorkspaceControls />
              </div>
              <div className="order-last rounded-2xl border border-line bg-surface p-4 lg:order-none">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">In this room</p>
                <SelectedItems lineItems={lineItems} />
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
              <ConfiguratorStepper />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="mt-8"
                >
                  <h3 className="font-display text-3xl leading-tight text-ink">{definition.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{definition.description}</p>
                  <div className="mt-5">
                    {step === "desk" && <DeskStep />}
                    {step === "chair" && <ChairStep />}
                    {step === "personalize" && <PersonalizeStep />}
                    {step === "duration" && <DurationStep monthlySubtotal={monthlySubtotal} />}
                    {step === "review" && (
                      <ReviewPanel title={title} configuration={configuration} lineItems={lineItems} />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 space-y-4">
                <PriceSummary
                  lineItems={lineItems}
                  monthlySubtotal={monthlySubtotal}
                  estimatedTotal={estimatedTotal}
                  duration={configuration.duration}
                  defaultExpanded={step === "review"}
                  key={step === "review" ? "review" : "build"}
                />
                <StepNavigation />
              </div>
            </div>
          </div>
        )}

        <LiveAnnouncer />
        <MobileActionBar
          monthlySubtotal={monthlySubtotal}
          estimatedTotal={estimatedTotal}
          duration={configuration.duration}
        />
      </section>
    </MotionConfig>
  );
}
