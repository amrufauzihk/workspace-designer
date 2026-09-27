"use client";

import { motion } from "framer-motion";
import { Check, ClipboardCopy, Pencil, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatDuration, formatIDR } from "@/lib/pricing";
import { buildInquiryText } from "@/lib/workspace-utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { CheckoutInquiry } from "@/types/workspace";

type CopyStatus = "idle" | "copied" | "manual";

export function ConfirmationState({ inquiry }: { inquiry: CheckoutInquiry }) {
  const setInquiry = useWorkspaceStore((state) => state.setInquiry);
  const reset = useWorkspaceStore((state) => state.reset);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const summaryText = buildInquiryText(inquiry);
  const firstName = inquiry.customer.fullName.split(" ")[0];

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopyStatus("copied");
    } catch {
      textRef.current?.select();
      setCopyStatus("manual");
    }
  };

  const created = new Date(inquiry.createdAt).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <span className="flex size-12 items-center justify-center rounded-full bg-sage-soft text-forest">
        <Check className="size-6" aria-hidden="true" />
      </span>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-display text-3xl leading-tight text-ink focus:outline-none sm:text-4xl"
      >
        Your inquiry summary is ready, {firstName}.
      </h3>

      <div className="mt-4 rounded-2xl border border-line bg-sand/60 p-4 text-sm leading-relaxed text-ink" role="status">
        <p className="font-medium">This is a prototype — nothing has been booked or sent.</p>
        <p className="mt-1 text-muted">
          No reservation, rental order or payment was created, and your details were not transmitted anywhere. Copy the
          summary below to share it with the monis.rent team through their official channels.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs text-muted">Draft reference</dt>
          <dd className="mt-0.5 font-mono font-medium text-ink">{inquiry.reference}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Prepared</dt>
          <dd className="mt-0.5 text-ink">{created}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Duration</dt>
          <dd className="mt-0.5 text-ink">{formatDuration(inquiry.configuration.duration)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Estimated total</dt>
          <dd className="mt-0.5 font-medium tabular-nums text-ink">{formatIDR(inquiry.estimatedTotal)}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <label htmlFor="inquiry-summary" className="text-sm font-medium text-ink">
            Inquiry summary
          </label>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 text-sm font-medium text-ink transition hover:border-forest"
          >
            {copyStatus === "copied" ? (
              <Check className="size-4 text-forest" aria-hidden="true" />
            ) : (
              <ClipboardCopy className="size-4" aria-hidden="true" />
            )}
            {copyStatus === "copied" ? "Copied" : "Copy summary"}
          </button>
        </div>
        <textarea
          id="inquiry-summary"
          ref={textRef}
          readOnly
          value={summaryText}
          rows={12}
          className="block w-full resize-y rounded-xl border border-line bg-canvas p-4 font-mono text-xs leading-relaxed text-ink focus:border-forest focus:outline-none"
        />
        <p className="mt-1.5 text-xs text-muted" aria-live="polite">
          {copyStatus === "copied" && "Summary copied to your clipboard."}
          {copyStatus === "manual" && "Copying isn't available here. The text is selected — press Ctrl/Cmd + C."}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => setInquiry(null)}
          className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-surface px-5 text-sm font-medium text-ink transition hover:border-ink"
        >
          <Pencil className="size-4" aria-hidden="true" />
          Edit inquiry
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-forest px-6 text-sm font-medium text-white transition hover:bg-forest-deep"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Design another workspace
        </button>
      </div>
    </motion.div>
  );
}
