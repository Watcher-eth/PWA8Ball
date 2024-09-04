import { useUserStore } from "@/lib/stores/UserStore";
import React from "react";

function UserRank() {
  const { user } = useUserStore();
  //TODO: Get user rank
  return (
    <div className="flex flex-row w-[100%]   self-center bottom-0  absolute border-t-2  border-[#181818] rounded-b-lg p-8 py-4   items-center justify-between">
      <img src={user?.pfp} className="w-12 h-12 rounded-full" />
      <div className="flex flex-col space-y-0">
        <div className="text-[lightgray] text-sm font-medium">Name</div>
        <div className="text-white text-[1.1rem] font-semibold">
          {user?.name}
        </div>
      </div>
      <div className="flex flex-col space-y-0">
        <div className="text-[lightgray] text-sm font-medium">
          Your Rank
        </div>
        <div className="text-white text-[1.1rem] font-semibold">🎖️4.</div>
      </div>
      <div className="flex flex-col mr-2 space-y-0">
        <div className="text-[lightgray] text-sm font-medium">
          Accuracy
        </div>
        <div className="text-white text-[1.1rem] font-semibold">64%</div>
      </div>
    </div>
  );
}

export default UserRank;
