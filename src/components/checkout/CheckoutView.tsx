"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import type { LineItem, WorkspaceConfiguration } from "@/types/workspace";
import { ConfiguratorStepper } from "../workspace/ConfiguratorStepper";
import { CheckoutSummary } from "./CheckoutSummary";
import { ConfirmationState } from "./ConfirmationState";
import { RentalInquiryForm } from "./RentalInquiryForm";

interface CheckoutViewProps {
  title: string;
  configuration: WorkspaceConfiguration;
  lineItems: LineItem[];
  monthlySubtotal: number;
  estimatedTotal: number;
}

export function CheckoutView(props: CheckoutViewProps) {
  const inquiry = useWorkspaceStore((state) => state.inquiry);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
      <div className="order-2 lg:order-1">
        <CheckoutSummary {...props} />
      </div>
      <div className="order-1 rounded-3xl border border-line bg-surface p-5 sm:p-8 lg:order-2">
        <div className="mb-8">
          <ConfiguratorStepper />
        </div>
        {inquiry ? <ConfirmationState inquiry={inquiry} /> : <RentalInquiryForm estimatedTotal={props.estimatedTotal} />}
      </div>
    </div>
  );
}
