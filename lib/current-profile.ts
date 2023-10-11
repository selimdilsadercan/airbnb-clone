import { auth } from "@clerk/nextjs";
import db from "./db";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const profile = await db.profile.findUnique({
    where: { userId }
  });

  if (!profile) return null;

  return {
    ...profile,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
    email: profile.email?.toString() || null
  };
};
