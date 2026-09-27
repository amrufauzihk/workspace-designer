"use client";

import { Info } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { AccessoryId, ChairId, DeskId, MonitorId } from "@/types/workspace";
import { MonitorQuantityStepper } from "./MonitorQuantityStepper";
import { ProductGrid } from "./ProductGrid";
import { RentalDurationSelector } from "./RentalDurationSelector";

const DESKS = getProductsByCategory("desk");
const CHAIRS = getProductsByCategory("chair");
const MONITORS = getProductsByCategory("monitor");
const ACCESSORIES = getProductsByCategory("accessory");

export function DeskStep() {
  const deskId = useWorkspaceStore((state) => state.deskId);
  const selectDesk = useWorkspaceStore((state) => state.selectDesk);
  return <ProductGrid<DeskId> label="Desks" products={DESKS} selectedIds={[deskId]} mode="single" onSelect={selectDesk} />;
}

export function ChairStep() {
  const chairId = useWorkspaceStore((state) => state.chairId);
  const selectChair = useWorkspaceStore((state) => state.selectChair);
  return (
    <ProductGrid<ChairId> label="Chairs" products={CHAIRS} selectedIds={[chairId]} mode="single" onSelect={selectChair} />
  );
}

function SubHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <p className="text-xs text-muted">{hint}</p>
    </div>
  );
}

export function PersonalizeStep() {
  const monitorId = useWorkspaceStore((state) => state.monitorId);
  const accessoryIds = useWorkspaceStore((state) => state.accessoryIds);
  const toggleMonitor = useWorkspaceStore((state) => state.toggleMonitor);
  const toggleAccessory = useWorkspaceStore((state) => state.toggleAccessory);
  const armWithoutMonitor = accessoryIds.includes("monitor-arm") && monitorId === null;

  return (
    <div className="space-y-7">
      <section aria-labelledby="monitors-heading">
        <div id="monitors-heading">
          <SubHeading title="Screens" hint="Optional · choose one setup" />
        </div>
        <ProductGrid<MonitorId>
          label="Monitor setups"
          products={MONITORS}
          selectedIds={[monitorId]}
          mode="toggle"
          onSelect={toggleMonitor}
          renderFooter={(product, selected) =>
            product.id === "single-monitor" && selected ? <MonitorQuantityStepper /> : null
          }
        />
      </section>

      <section aria-labelledby="accessories-heading">
        <div id="accessories-heading">
          <SubHeading title="Accessories" hint="Add as many as you like" />
        </div>
        <ProductGrid<AccessoryId>
          label="Accessories"
          products={ACCESSORIES}
          selectedIds={accessoryIds}
          mode="toggle"
          onSelect={toggleAccessory}
        />
        {armWithoutMonitor && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-sand px-3 py-2.5 text-xs text-muted" role="note">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            The monitor arm is waiting for a screen. Add a monitor setup above to mount it.
          </p>
        )}
      </section>
    </div>
  );
}

export function DurationStep({ monthlySubtotal }: { monthlySubtotal: number }) {
  return <RentalDurationSelector monthlySubtotal={monthlySubtotal} />;
}
