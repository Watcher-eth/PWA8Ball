import { BetUploadState } from "@/types/BetTypes";
import { EditUserState } from "@/types/UserTypes";
import { create } from "zustand";

const useEditUserStore = create<EditUserState>((set) => ({
  pfp: "",
  name: "",
  background: "",
  setState: (newState) => set((state) => ({ ...state, ...newState })),
  reset: () => set(() => ({ pfp: "", name: "", background: "" })),
}));

export default useEditUserStore;
