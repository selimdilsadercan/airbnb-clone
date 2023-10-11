import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import db from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

////

export async function POST(request: Request) {
  //authentication control
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthanticated", { status: 401 });

  //profile control
  const profile = await currentProfile();
  if (!profile) return new NextResponse("Profile not found", { status: 404 });
  const profileId = profile.id;

  //body control
  const body = await request.json();
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) return new NextResponse("Missing values", { status: 400 });
  });
  const locationValue = location.value;

  //create listing
  const listing = await db.listing.create({
    data: { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, locationValue, price: parseInt(price, 10), userId, profileId }
  });

  return NextResponse.json(listing);
}
