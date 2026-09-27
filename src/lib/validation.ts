import { BALI_DELIVERY_AREAS } from "@/data/locations";
import type { CustomerDetails, CustomerDetailsErrors } from "@/types/workspace";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const EMPTY_CUSTOMER_DETAILS: CustomerDetails = {
  fullName: "",
  email: "",
  phone: "",
  deliveryDate: "",
  deliveryArea: "",
  deliveryAddress: "",
  notes: "",
};

/** `YYYY-MM-DD` for the given date in the user's local time zone. */
export function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function normalizeCustomerDetails(details: CustomerDetails): CustomerDetails {
  return {
    fullName: details.fullName.trim(),
    email: details.email.trim(),
    phone: details.phone.trim(),
    deliveryDate: details.deliveryDate,
    deliveryArea: details.deliveryArea,
    deliveryAddress: details.deliveryAddress.trim(),
    notes: details.notes.trim(),
  };
}

export function validateInquiry(details: CustomerDetails, today: string): CustomerDetailsErrors {
  const errors: CustomerDetailsErrors = {};
  const name = details.fullName.trim();
  const email = details.email.trim();
  const phone = details.phone.trim();
  const address = details.deliveryAddress.trim();

  if (name.length < 2) errors.fullName = "Please enter your full name.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email, like you@example.com.";

  if (phone) {
    const digits = phone.replace(/\D/g, "").length;
    if (!PHONE_PATTERN.test(phone) || digits < 8 || digits > 15) {
      errors.phone = "Use digits only, with an optional country code (e.g. +62 812 3456 7890).";
    }
  }

  if (!details.deliveryDate) errors.deliveryDate = "Please choose a preferred delivery date.";
  else if (!ISO_DATE_PATTERN.test(details.deliveryDate)) errors.deliveryDate = "Please choose a valid date.";
  else if (details.deliveryDate < today) errors.deliveryDate = "Delivery date cannot be in the past.";

  if (!(BALI_DELIVERY_AREAS as readonly string[]).includes(details.deliveryArea)) {
    errors.deliveryArea = "Please choose your area in Bali.";
  }

  if (address.length < 5) errors.deliveryAddress = "Please add a villa, street or building name.";

  if (details.notes.length > 500) errors.notes = "Please keep notes under 500 characters.";

  return errors;
}
