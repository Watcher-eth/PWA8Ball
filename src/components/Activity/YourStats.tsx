import React from "react";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetOrderCountForUser } from "@/lib/supabase/queries/user/getTotalPredictions";

export const YourStats: React.FC = () => {
  const { user } = useUserStore();
  const { data: count } = useGetOrderCountForUser(user?.walletaddress!);

  return (
    <div className="flex flex-row items-center justify-between p-3 px-8 rounded-xl border border-[#212121] my-3">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[lightgray] text-sm font-bold">$Cred</span>
        {user ? (
          <span className="text-white text-xl font-bold">
            {user.liquiditypoints}
          </span>
        ) : (
          <div className="animate-pulse bg-gray-700 h-6 w-9 rounded"></div>
        )}
      </div>
      <div className="h-4/5 w-px bg-gray-600"></div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[lightgray] text-sm font-bold">Total</span>
        <span className="text-white text-xl font-bold">
          {count ? count : 0}
        </span>
      </div>
      <div className="h-4/5 w-px bg-gray-600"></div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[lightgray] text-sm font-bold">Accuracy</span>
        <span className="text-white text-xl font-bold">0%</span>
      </div>
    </div>
  );
};

