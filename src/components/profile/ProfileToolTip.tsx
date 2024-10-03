import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FollowButton } from "./FollowButton"

import { shortenAddress } from "@/utils/address/shortenAddress"
import { User } from "@/__generated__/graphql"

export function ProfileToolTip({
  user,
  children,
}: {
  user: Partial<User>
  children: React.ReactNode
}) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={"bottom"}
          className="flex w-[22rem] ml-8 mb-4 flex-col p-7 border-0 rounded-lg bg-[#101010]"
        >
          <div className="flex flex-row items-start justify-between">
            <img
              className="size-16 rounded-full"
              src={user?.pfp!}
            />
            <FollowButton profileId={user?.walletAddress} />
          </div>
          <div className="text-[2rem] my-4 text-white font-[Aeonik-Bold]">
            {user?.name}
          </div>
          <div className="text-[1.1rem] my-2 text-[lightgray] font-semibold">
            {user?.walletAddress
              ? shortenAddress(user?.walletAddress)
              : user?.walletAddress
            }{" "}
          </div>
          <div className="text-[0.85rem] text-[lightgray] -mb-4 font-normal">
            Not followed by anyone you follow
          </div>
          <div className="w-full h-px bg-[#222222] my-8" />
          <div className="flex flex-row items-center space-x-5">
            <div className="flex flex-col space-y-1">
              <div className="text-[1.4rem] text-white font-[Aeonik-Bold]">
                222
              </div>
              <div className="text-[0.8rem] text-[lightgray] font-semibold">
                Followers
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="text-[1.4rem] text-white font-[Aeonik-Bold]">
                669
              </div>
              <div className="text-[0.8rem] text-[lightgray] font-semibold">
                Following
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
