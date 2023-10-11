import db from "@/lib/db";

interface IParams {
  listingId?: string;
  profileId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    //get params
    const { listingId, profileId, authorId } = params;
    const query: any = {};
    if (listingId) query.listingId = listingId;
    if (profileId) query.profileId = profileId;
    if (authorId) query.listing = { profileId: authorId };

    //get reservations
    const reservations = await db.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: "desc" }
    });

    //turn to safe
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: { ...reservation.listing, createdAt: reservation.listing.createdAt.toISOString() }
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
