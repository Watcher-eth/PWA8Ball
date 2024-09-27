import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"
import { useUserStore } from "@/lib/stores/UserStore"
import React from "react"

function UserRank() {
  const { user } = useUserStore()
  //TODO: Get user rank
  return (
    <div className="flex flex-row w-[100%]   self-center bottom-0  absolute border-t-2  border-[#181818] rounded-b-lg p-8 py-4   items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={user?.pfp ?? DEFAULT_PFP_PLACEHOLDER}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col space-y-0">
          <div className="text-[lightgray] text-sm font-[Aeonik]">Name</div>
          <div className="text-white text-[1.1rem] font-semibold">
            {user?.name ?? "Anon"}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-0">
        <div className="text-[lightgray] text-sm font-[Aeonik]">Your Rank</div>
        <div className="text-white text-[1.1rem] font-semibold">
          {user?.name ? "🎖️4." : "Not ranked"}
        </div>
      </div>
      <div className="flex flex-col mr-2 space-y-0">
        <div className="text-[lightgray] text-sm font-[Aeonik]">Accuracy</div>
        <div className="text-white text-[1.1rem] font-semibold">
          {" "}
          {user?.name ? "0%" : "0%"}
        </div>
      </div>
    </div>
  )
}

export default UserRank
