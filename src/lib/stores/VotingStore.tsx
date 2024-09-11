// @ts-nocheck

import { BetVotingState } from "@/types/BetTypes"
import { create } from "zustand"

export const useVotingStore = create<BetVotingState>((set) => ({
  question: "",
  title: "",
  betId: "",
  amount: 0,
  option: 0,
  setState: (newState) => set((state) => ({ ...state, ...newState })),
  reset: () =>
    set(() => ({ question: "", title: "", betId: "", amount: 0, option: 0 })),
}))
