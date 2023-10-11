import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { reservationId?: string } }) {
  //authantication control
  const profile = await currentProfile();
  if (!profile) return new NextResponse("Unauthenticated", { status: 401 });
  const profileId = profile.id;

  //param control
  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") throw new Error("Invalid ID");

  //delete reservation
  const reservation = await db.reservation.deleteMany({
    where: { id: reservationId, OR: [{ profileId }, { listing: { profileId } }] }
  });

  return NextResponse.json(reservation);
}
