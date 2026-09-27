import { describe, expect, it } from "vitest";
import { canAccessStep, getContinueBlocker, getNextStep, getPreviousStep } from "./steps";

const empty = { deskId: null, chairId: null };
const complete = { deskId: "oak-desk", chairId: "minimal-chair" } as const;

describe("step navigation", () => {
  it("walks the six steps in order", () => {
    expect(getNextStep("desk")).toBe("chair");
    expect(getNextStep("review")).toBe("inquiry");
    expect(getNextStep("inquiry")).toBeNull();
    expect(getPreviousStep("desk")).toBeNull();
    expect(getPreviousStep("duration")).toBe("personalize");
  });

  it("locks review and inquiry until a desk and chair are chosen", () => {
    expect(canAccessStep("personalize", empty)).toBe(true);
    expect(canAccessStep("review", empty)).toBe(false);
    expect(canAccessStep("inquiry", { deskId: "oak-desk", chairId: null })).toBe(false);
    expect(canAccessStep("review", complete)).toBe(true);
  });

  it("explains what blocks continuing", () => {
    expect(getContinueBlocker("desk", empty)).toBe("Choose a desk to continue");
    expect(getContinueBlocker("chair", { deskId: "oak-desk", chairId: null })).toBe("Pick a chair to continue");
    expect(getContinueBlocker("duration", empty)).toBe("Choose a desk to continue");
    expect(getContinueBlocker("duration", complete)).toBeNull();
  });
});
