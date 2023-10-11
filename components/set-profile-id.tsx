"use client";

import useProfileId from "@/hooks/use-profileId";

function SetProfileId({ children, profileId }: { children: React.ReactNode; profileId: string }) {
  const profileStore = useProfileId();
  profileStore.setProfileId(profileId);
  return children;
}

export default SetProfileId;
