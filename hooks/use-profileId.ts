import { create } from "zustand";

interface Store {
  profileId: string;
  setProfileId: (id: string) => void;
}

const useProfileId = create<Store>((set) => ({
  profileId: "",
  setProfileId: (id) => set({ profileId: id })
}));

export default useProfileId;
