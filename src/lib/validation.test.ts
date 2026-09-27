import { describe, expect, it } from "vitest";
import { EMPTY_CUSTOMER_DETAILS, normalizeCustomerDetails, toLocalISODate, validateInquiry } from "./validation";
import type { CustomerDetails } from "@/types/workspace";

const TODAY = "2026-09-28";

const valid: CustomerDetails = {
  fullName: "Ayu Pratiwi",
  email: "ayu@example.com",
  phone: "+62 812 3456 7890",
  deliveryDate: "2026-10-15",
  deliveryArea: "Canggu",
  deliveryAddress: "Villa Sawah, Jl. Pantai Berawa",
  notes: "",
};

const errorsFor = (overrides: Partial<CustomerDetails>) => validateInquiry({ ...valid, ...overrides }, TODAY);

describe("validateInquiry", () => {
  it("accepts a complete inquiry", () => {
    expect(validateInquiry(valid, TODAY)).toEqual({});
  });

  it("reports every required field when empty", () => {
    expect(Object.keys(validateInquiry(EMPTY_CUSTOMER_DETAILS, TODAY)).sort()).toEqual(
      ["deliveryAddress", "deliveryArea", "deliveryDate", "email", "fullName"].sort(),
    );
  });

  it("rejects whitespace-only names", () => {
    expect(errorsFor({ fullName: "   " }).fullName).toBeDefined();
  });

  it("validates email format", () => {
    expect(errorsFor({ email: "ayu@" }).email).toMatch(/valid email/);
    expect(errorsFor({ email: "ayu example.com" }).email).toBeDefined();
    expect(errorsFor({ email: "  ayu@example.com  " }).email).toBeUndefined();
  });

  it("treats phone as optional but checks it when present", () => {
    expect(errorsFor({ phone: "" }).phone).toBeUndefined();
    expect(errorsFor({ phone: "0812-3456-7890" }).phone).toBeUndefined();
    expect(errorsFor({ phone: "12345" }).phone).toBeDefined();
    expect(errorsFor({ phone: "call me maybe" }).phone).toBeDefined();
    expect(errorsFor({ phone: "+1234567890123456" }).phone).toBeDefined();
  });

  it("allows today but not past or malformed dates", () => {
    expect(errorsFor({ deliveryDate: TODAY }).deliveryDate).toBeUndefined();
    expect(errorsFor({ deliveryDate: "2026-09-27" }).deliveryDate).toMatch(/past/);
    expect(errorsFor({ deliveryDate: "15/10/2026" }).deliveryDate).toBeDefined();
  });

  it("only accepts known Bali delivery areas", () => {
    expect(errorsFor({ deliveryArea: "Jakarta" }).deliveryArea).toBeDefined();
    expect(errorsFor({ deliveryArea: "Ubud" }).deliveryArea).toBeUndefined();
  });

  it("requires a meaningful address and limits notes", () => {
    expect(errorsFor({ deliveryAddress: "abc" }).deliveryAddress).toBeDefined();
    expect(errorsFor({ notes: "x".repeat(501) }).notes).toBeDefined();
    expect(errorsFor({ notes: "x".repeat(500) }).notes).toBeUndefined();
  });
});

describe("helpers", () => {
  it("formats local ISO dates", () => {
    expect(toLocalISODate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("trims free-text fields", () => {
    expect(normalizeCustomerDetails({ ...valid, fullName: "  Ayu  ", notes: " hi " })).toMatchObject({
      fullName: "Ayu",
      notes: "hi",
    });
  });
});
