import Link from "next/link"

import { ProfileToolTip } from "@/components/profile/ProfileToolTip"
import { getProfilePath } from "@/utils/urls"

type LeaderBoardTopUser = {
  name: string
  image: string
  score: number
  walletAddress: string
}

function UserCard({
  user,
  showMarginTop,
}: {
  user: LeaderBoardTopUser
  showMarginTop?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center ${showMarginTop ? "mt-2.5" : ""}`}
    >
      {user.image ? (
        <ProfileToolTip
          user={{
            pfp: user?.image,
            name: user?.name,
            // @ts-ignore
            walletAddress: user?.walletAddress,
          }}
        >
          <Link href={getProfilePath(user?.walletAddress)}>
            <img
              src={user.image}
              alt={user.name}
              className="h-20 hover:scale-102 w-20 rounded-full"
            />
          </Link>
        </ProfileToolTip>
      ) : (
        <div className="h-20 w-20 rounded-full bg-gray-300 animate-pulse"></div>
      )}
      {user.name ? (
        <p className="text-lg font-semibold text-white mt-2 mb-0">
          {user.name}
        </p>
      ) : (
        <div className="h-4 w-24 bg-gray-300 animate-pulse mt-2 mb-2"></div>
      )}
      {user.score !== undefined ? (
        <p className="text-sm text-[lightgray] font-medium">
          ${user.score.toFixed(2)}
        </p>
      ) : (
        <div className="h-3 w-20 bg-gray-300 animate-pulse"></div>
      )}
    </div>
  )
}
export function LeaderBoardTop3({ users }: { users: LeaderBoardTopUser[] }) {
  return (
    <div className="flex justify-between mt-6 mb-5 w-full mx-auto">
      {users?.length > 1 ? (
        <UserCard user={users[1]} showMarginTop />
      ) : (
        <div className="h-20 w-20 rounded-full bg-[#212121] mt-2.5 animate-pulse"></div>
      )}
      {users?.length > 0 ? (
        <UserCard user={users[0]} showMarginTop />
      ) : (
        <div className="h-20 w-20 rounded-full bg-[#212121]  animate-pulse"></div>
      )}{" "}
      {users?.length > 2 ? (
        <UserCard user={users[2]} showMarginTop />
      ) : (
        <div className="h-20 w-20 rounded-full bg-[#212121] mt-2.5 animate-pulse"></div>
      )}
    </div>
  )
}
