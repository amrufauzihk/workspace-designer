"use client";

import { AlertCircle, ArrowLeft, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { RENTAL_DURATIONS } from "@/data/durations";
import { BALI_DELIVERY_AREAS } from "@/data/locations";
import { useStepNavigation } from "@/hooks/use-step-navigation";
import { useWorkspaceConfiguration } from "@/hooks/use-workspace";
import { formatIDR } from "@/lib/pricing";
import { normalizeCustomerDetails, toLocalISODate, validateInquiry } from "@/lib/validation";
import { buildInquiry, createInquiryReference } from "@/lib/workspace-utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { CustomerDetails, RentalDuration } from "@/types/workspace";
import { FormField, inputClassName } from "./FormField";

const FIELD_ORDER: (keyof CustomerDetails)[] = [
  "fullName",
  "email",
  "phone",
  "deliveryDate",
  "deliveryArea",
  "deliveryAddress",
  "notes",
];

const FIELD_LABELS: Record<keyof CustomerDetails, string> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone / WhatsApp",
  deliveryDate: "Preferred delivery date",
  deliveryArea: "Area in Bali",
  deliveryAddress: "Delivery address",
  notes: "Notes",
};

const fieldId = (field: keyof CustomerDetails) => `inquiry-${field}`;

export function RentalInquiryForm({ estimatedTotal }: { estimatedTotal: number }) {
  const customer = useWorkspaceStore((state) => state.customer);
  const setCustomerField = useWorkspaceStore((state) => state.setCustomerField);
  const setInquiry = useWorkspaceStore((state) => state.setInquiry);
  const setDuration = useWorkspaceStore((state) => state.setDuration);
  const configuration = useWorkspaceConfiguration();
  const { goBack } = useStepNavigation();

  const [today] = useState(() => toLocalISODate(new Date()));
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = submitAttempted ? validateInquiry(customer, today) : {};
  const errorFields = FIELD_ORDER.filter((field) => errors[field]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    const nextErrors = validateInquiry(customer, today);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }
    setInquiry(
      buildInquiry(createInquiryReference(), new Date(), normalizeCustomerDetails(customer), configuration),
    );
  };

  const bind = (field: keyof CustomerDetails) => ({
    name: field,
    value: customer[field],
    onChange: (event: { target: { value: string } }) => setCustomerField(field, event.target.value),
    className: inputClassName,
  });

  return (
    <form noValidate onSubmit={handleSubmit} aria-labelledby="inquiry-heading" className="space-y-6">
      <div>
        <h3 id="inquiry-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          Send a rental inquiry
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Share when and where you need your workspace. In this prototype, submitting prepares a summary you can
          review and copy — nothing is sent and nothing is booked.
        </p>
      </div>

      {errorFields.length > 0 && (
        <div role="alert" className="rounded-xl border border-danger/20 bg-danger-soft p-4 text-sm text-danger">
          <p className="flex items-center gap-2 font-medium">
            <AlertCircle className="size-4" aria-hidden="true" />
            Please check {errorFields.length === 1 ? "1 field" : `${errorFields.length} fields`}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-0.5 text-xs">
            {errorFields.map((field) => (
              <li key={field}>
                <a href={`#${fieldId(field)}`} className="underline underline-offset-2">
                  {FIELD_LABELS[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">Your details</legend>
        <FormField id={fieldId("fullName")} label={FIELD_LABELS.fullName} error={errors.fullName}>
          {(aria) => <input {...aria} {...bind("fullName")} type="text" autoComplete="name" placeholder="Made Wijaya" />}
        </FormField>
        <FormField id={fieldId("email")} label={FIELD_LABELS.email} error={errors.email}>
          {(aria) => (
            <input
              {...aria}
              {...bind("email")}
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
            />
          )}
        </FormField>
        <div className="sm:col-span-2">
          <FormField
            id={fieldId("phone")}
            label={FIELD_LABELS.phone}
            optional
            hint="Include your country code if you are not on an Indonesian number."
            error={errors.phone}
          >
            {(aria) => (
              <input {...aria} {...bind("phone")} type="tel" autoComplete="tel" placeholder="+62 812 3456 7890" />
            )}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">Delivery</legend>
        <FormField id={fieldId("deliveryDate")} label={FIELD_LABELS.deliveryDate} error={errors.deliveryDate}>
          {(aria) => <input {...aria} {...bind("deliveryDate")} type="date" min={today} />}
        </FormField>
        <FormField id={fieldId("deliveryArea")} label={FIELD_LABELS.deliveryArea} error={errors.deliveryArea}>
          {(aria) => (
            <select {...aria} {...bind("deliveryArea")}>
              <option value="">Select an area</option>
              {BALI_DELIVERY_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          )}
        </FormField>
        <div className="sm:col-span-2">
          <FormField
            id={fieldId("deliveryAddress")}
            label={FIELD_LABELS.deliveryAddress}
            hint="Villa, guesthouse, coworking or street name."
            error={errors.deliveryAddress}
          >
            {(aria) => (
              <input
                {...aria}
                {...bind("deliveryAddress")}
                type="text"
                autoComplete="street-address"
                placeholder="Villa Sawah, Jl. Pantai Berawa"
              />
            )}
          </FormField>
        </div>
      </fieldset>

      <fieldset className="grid gap-4">
        <legend className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">Rental</legend>
        <FormField id="inquiry-duration" label="Rental duration">
          {(aria) => (
            <select
              {...aria}
              value={configuration.duration}
              onChange={(event) => setDuration(Number(event.target.value) as RentalDuration)}
              className={inputClassName}
            >
              {RENTAL_DURATIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </FormField>
        <FormField id={fieldId("notes")} label={FIELD_LABELS.notes} optional error={errors.notes}>
          {(aria) => (
            <textarea
              {...aria}
              {...bind("notes")}
              rows={3}
              maxLength={500}
              placeholder="Stairs, access times, or anything else we should know."
            />
          )}
        </FormField>
      </fieldset>

      <div className="rounded-2xl bg-canvas p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm text-muted">Estimated total</p>
          <p className="font-display text-2xl tabular-nums text-ink">{formatIDR(estimatedTotal)}</p>
        </div>
        <p className="mt-1 text-xs text-muted">
          Illustrative prototype estimate. Final pricing, availability and delivery would be confirmed by monis.rent.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-surface px-5 text-sm font-medium text-ink transition hover:border-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to review
        </button>
        <button
          type="submit"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-forest px-6 text-sm font-medium text-white transition hover:bg-forest-deep"
        >
          Submit inquiry
          <Send className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p className="text-center text-xs text-muted">
        Prototype only — no reservation, order or payment will be created.
      </p>
    </form>
  );
}
