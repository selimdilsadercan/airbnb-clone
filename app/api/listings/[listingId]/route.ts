import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { listingId?: string } }) {
  //authantication control
  const profile = await currentProfile();
  if (!profile) return new NextResponse("Unauthenticated", { status: 401 });
  const profileId = profile.id;

  //param control
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID");

  //delete listing
  const listing = await db.listing.deleteMany({
    where: { id: listingId, profileId }
  });

  return NextResponse.json(listing);
}
