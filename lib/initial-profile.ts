import { currentUser } from "@clerk/nextjs";
import db from "./db";
import { redirect } from "next/navigation";

async function initialProfile() {
  //user control
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const userId = user.id;
  const imageUrl = user.imageUrl;
  const email = user.emailAddresses[0].emailAddress;
  const name = `${user.firstName} ${user.lastName}`;

  //profile control
  const profile = await db.profile.findUnique({
    where: { userId }
  });

  //return proile if exist
  if (profile) return profile;

  //create profile if not exist
  const newProfile = await db.profile.create({
    data: { userId, name, imageUrl, email }
  });
  return newProfile;
}

export default initialProfile;
