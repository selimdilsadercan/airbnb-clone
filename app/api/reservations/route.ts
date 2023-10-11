import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  //authantication control
  const profile = await currentProfile();
  if (!profile) return new NextResponse("Unauthenticated", { status: 401 });
  const profileId = profile.id;

  //body control
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) return new NextResponse("Missing values", { status: 300 });

  //update listing
  const listingAndReservation = await db.listing.update({
    where: { id: listingId },
    data: { reservations: { create: { profileId, startDate, endDate, totalPrice } } }
  });

  return NextResponse.json(listingAndReservation);
}
