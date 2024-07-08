// @ts-nocheck
import React from "react";

import { Share2 } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";

const UserProfile: React.FC = () => {
  const user = useUserStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full p-6 bg-black flex flex-col items-center text-white">
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.pfp}
          alt={user.name}
          className="rounded-full w-24 h-24 mb-4"
        />
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm">@{user.name}</p>
      </div>
      <div className="text-center mb-6">
        <div className="flex justify-between text-lg mb-2">
          <div>
            <p className="font-semibold">Rank</p>
            <p>#{user.rank}</p>
          </div>
          <div>
            <p className="font-semibold">Cred</p>
            <p>{user.cred} Cred</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="font-semibold">Predictions made</p>
          <p>{user.predictionsMade} Predictions</p>
        </div>
        <div>
          <p className="font-semibold">Correct Predictions</p>
          <p>{user.correctPredictions} Correct</p>
        </div>
      </div>
      <button className="flex items-center justify-center px-4 py-2 bg-gray-700 rounded-full mt-auto">
        <Share2 className="w-6 h-6 mr-2" />
        Share your score
      </button>
    </div>
  );
};

export default UserProfile;
