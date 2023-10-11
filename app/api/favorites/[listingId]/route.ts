import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request, { params }: { params: { listingId?: string } }) {
  //authantication control
  const profile = await currentProfile();
  if (!profile) return new NextResponse("Unauthenticated", { status: 401 });
  const profileId = profile.id;

  //param control
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") return new NextResponse("Invalid Id", { status: 400 });

  //get favorites
  let favoriteIds = [...(profile.favoriteIds || [])];
  favoriteIds.push(listingId);

  //update profile
  const user = await db.profile.update({
    where: { id: profileId },
    data: { favoriteIds }
  });

  return NextResponse.json(user);
}

////

export async function DELETE(request: Request, { params }: { params: { listingId?: string } }) {
  //authantication control
  const profile = await currentProfile();
  if (!profile) return new NextResponse("Unauthenticated", { status: 401 });
  const profileId = profile.id;

  //param control
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") return new NextResponse("Invalid Id", { status: 400 });

  //get favorites
  let favoriteIds = [...(profile.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  //update profile
  const user = await db.profile.update({
    where: { id: profileId },
    data: { favoriteIds }
  });

  return NextResponse.json(user);
}
