import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

function GlobalLeaderboard() {
  const [loading, setLoading] = useState<boolean>(false);

  // Get followers portfolios
  // Rank them

  if (loading === false)
    return (
      <div className="flex px-3 flex-col items-center mt-8 space-y-4">
        <Skeleton className="h-14 bg-[#1B1B1E] w-[90vw] rounded-xl" />
        <Skeleton className="h-14 bg-[#1B1B1E] w-[90vw] rounded-xl" />
        <Skeleton className="h-14 bg-[#1B1B1E] w-[90vw] rounded-xl" />
        <Skeleton className="h-14 bg-[#1B1B1E] w-[90vw] rounded-xl" />
        <Skeleton className="h-14 bg-[#1B1B1E] w-[90vw] rounded-xl" />
        <Skeleton className="h-14 bg-[#1B1B1E] w-[90vw] rounded-xl" />
      </div>
    );
  return <div>GlobalLeaderboard</div>;
}

export default GlobalLeaderboard;
