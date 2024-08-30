import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetGlobalLeaderboard } from "@/graphql/leaderboard/useGetGlobalLeaderboard";
import { useGetTopPredictors } from "@/supabase/queries/leaderboard/useGetTopPredictors";
import LeaderBoardTop3 from "./LeaderboardTop3";
import { PredictorInfo } from "../PredictorInfo";
import { LoadingLeaderboardSkeleton } from "../Leaderboard";
import UserRank from "./UserRank";
import { Trophy, X } from "lucide-react";

function DesktopLeaderboardModal({ children }) {
  const { data: topPredictors, isLoading } = useGetTopPredictors();
  const data = useGetGlobalLeaderboard();

  if (isLoading) {
  }

  if (topPredictors) {
    const top3Users = topPredictors?.slice(0, 3).map((predictor) => ({
      name: predictor.name?.length > 0 ? predictor?.name : "Anon",
      image: predictor.pfp?.length > 0 ? predictor.pfp : defaultAvatar,
      score: predictor.total_amount / 1000000,
    }));

    const remainingPredictors = topPredictors?.slice(3);

    return (
      <Dialog className={`!rounded-[1.5rem]`}>
        <DialogTrigger asChild>
          <div>{children}</div>
        </DialogTrigger>
        <DialogContent
          className={`
        p-0 bg-transparent  border-0
        rounded-2xl
        bg-[#101010]/40
        backdrop-blur-xl
        border-2 border-[#191919]
        h-[80%]

      `}
        >
          <div className="flex flex-col p-8">
            <div className="flex items-center space-x-3 mb-2 justify-between">
              <div className="flex flex-col">
                <div className="text-white text-2xl font-semibold">
                  Global Leaderboard
                </div>
                <div className="text-[lightgray] text-md font-normal">
                  All users last 24 hours
                </div>
              </div>
              {/* <DialogClose>
                <X color="#909090" className="z-[20]" strokeWidth={2.5} />
              </DialogClose> */}
            </div>

            <LeaderBoardTop3 users={top3Users} />
            <div className="flex flex-col ">
              <div className="flex flex-row items-center justify-between my-1.5">
                <h2 className="text-white text-[15px] font-bold">Name</h2>
                <h2 className="text-white text-[15px] font-bold">At stake</h2>
              </div>
              {remainingPredictors?.map((predictor, index) => (
                <PredictorInfo
                  key={index}
                  {...predictor}
                  address={predictor?.walletAddress}
                  index={index}
                />
              )) ??
                (!remainingPredictors ? (
                  <LoadingLeaderboardSkeleton />
                ) : (
                  <p className="text-white">No predictors found</p>
                ))}
            </div>
          </div>
          <UserRank />
        </DialogContent>
      </Dialog>
    );
  }
}

export default DesktopLeaderboardModal;
