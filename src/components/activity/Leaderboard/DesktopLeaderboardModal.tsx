import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LeaderBoardTop3 } from "./LeaderboardTop3"
import { PredictorInfo } from "../PredictorInfo"
import { LoadingLeaderboardSkeleton } from "../Leaderboard"
import { UserRank } from "./UserRank"
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"

function DesktopLeaderboardModal({
  children,
  data,
  title,
}: {
  children: React.ReactNode
  data: any[]
  title: string
}) {
  const top3Users = data?.slice(0, 3).map((predictor: any) => ({
    name: predictor.name?.length > 0 ? predictor?.name : "Anon",
    image: predictor.pfp?.length > 0 ? predictor.pfp : DEFAULT_PFP_PLACEHOLDER,
    score: predictor.totalAmountUsdc / 1000000,
    walletAddress: predictor?.walletAddress,
  }))

  const remainingPredictors = data?.slice(3)

  return (
    // @ts-ignore
    <Dialog className={`!rounded-[1.5rem]`}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent
        className={`
        p-0
        rounded-3xl
        bg-[#090909]/85
        backdrop-blur-xl
        border border-[#212121]
        h-[80%]

      `}
      >
        <div className="flex flex-col p-8">
          <div className="flex items-center space-x-3 mb-2 justify-between">
            <div className="flex flex-col">
              <div className="text-white text-2xl font-semibold">
                {title} Leaderboard
              </div>
              <div className="text-[lightgray] text-md font-normal">
                All users last 24 hours
              </div>
            </div>
            {/* <DialogClose>
                <X color="#909090" className="z-20" strokeWidth={2.5} />
              </DialogClose> */}
          </div>

          <LeaderBoardTop3 users={top3Users} />
          <div className="flex flex-col mt-3 ">
            <div className="flex flex-row items-center justify-between my-1.5">
              <h2 className="text-white text-[15px] font-bold">Name</h2>
              <h2 className="text-white text-[15px] font-bold">At stake</h2>
            </div>
            {remainingPredictors && remainingPredictors.length > 0 ? (
              remainingPredictors.map((predictor, index) => (
                <PredictorInfo
                  key={index}
                  totalAmountUsdc={predictor.total_amount}
                  {...predictor}
                  address={predictor?.walletAddress}
                  index={index + 3}
                />
              ))
            ) : (
              <LoadingLeaderboardSkeleton />
            )}
          </div>
        </div>
        <UserRank />
      </DialogContent>
    </Dialog>
  )
}

export default DesktopLeaderboardModal
