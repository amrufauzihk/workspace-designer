import type { RentalDuration } from "@/types/workspace";

export const RENTAL_DURATIONS: readonly { value: RentalDuration; label: string; hint: string }[] = [
  { value: 1, label: "1 month", hint: "Trying Bali out" },
  { value: 3, label: "3 months", hint: "A full season" },
  { value: 6, label: "6 months", hint: "Settling in" },
  { value: 12, label: "12 months", hint: "Home base" },
];

export const DEFAULT_DURATION: RentalDuration = 1;
