/* ============================================================
 * Domain types for the product.
 * These model the data as if a real API were returning it —
 * you do NOT control this shape, so treat it like a contract.
 * You may EXTEND these (add view models, derived types) but do
 * not weaken them. No `any`.
 * ============================================================ */

export type ItemId = string;
export type UserId = string;

export type Category =
  | "power-tools"
  | "hand-tools"
  | "garden"
  | "kitchen"
  | "outdoor"
  | "party"
  | "other";

/** Money is in cents to avoid float bugs. 0 means the item is free to borrow. */
export interface Price {
  amountCents: number;
  period: "hour" | "day" | "week";
}

export interface Owner {
  id: UserId;
  displayName: string;
  /** 0..5, or null if they have no ratings yet — you must handle "no ratings". */
  rating: number | null;
  ratingCount: number;
  joinedISO: string;
}

export interface Item {
  id: ItemId;
  title: string;
  category: Category;
  description: string;
  /** Some items have no photos yet. Handle the empty case in the UI. */
  photoUrls: string[];
  /** null when the item is free to borrow. */
  price: Price | null;
  owner: Owner;
  /** Distance is only known if the viewer has shared location — may be null. */
  distanceKm: number | null;
  /** Some listings are paused by their owner and should not be bookable. */
  status: "available" | "paused" | "removed";
  postedISO: string;
}

export interface AvailabilityRange {
  startISO: string;
  endISO: string;
}

/** What a booking request looks like before it's sent to the (future) API. */
export interface BookingDraft {
  itemId: ItemId;
  range: AvailabilityRange;
  /** null until the user has agreed to the owner's terms. */
  agreedToTerms: boolean;
}


export type Condition = 'new' | 'good' | 'well-loved';

export interface Owner {
  id: string;
  name: string;
  photoUrl: string;
  memberSince: string;      // e.g. "MAR 2024"
  ratingsCount: number;
  neighborhood: string;
}

export interface Item {
  id: string;
  callNumber: string;        // e.g. "TL-2405"
  title: string;
  description: string;
  category: Category;
  photos: string[];
  owner: Owner;
  distanceMeters: number;
  pricePerDay: number;       // 0 means free
  available: boolean;
  condition: Condition;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cardNumber: string;        // e.g. "NL-000173"
  joinedAt: string;
}

export interface Booking {
  id: string;
  itemId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
}
