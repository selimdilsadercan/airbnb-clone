import { Listing, Profile, Reservation } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeProfile = Omit<Profile, "createdAt" | "updatedAt" | "email"> & {
  createdAt: string;
  updatedAt: string;
  email: string | null;
};
