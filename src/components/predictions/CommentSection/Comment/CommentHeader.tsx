// @ts-nocheck

import Link from "next/link"
import { UserCircle2Icon } from "lucide-react"
import { User } from "@/types/UserTypes"
import { timeAgo } from "@/utils/datetime/timeAgo"
import { parseOption } from "@/utils/predictions/parseOption"
import { getProfilePath } from "@/utils/urls"
import { ProfileToolTip } from "@/components/profile/ProfileToolTip"
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"

export function CommentHeader({
  user,
  user2,
  created_at,
}: {
  user?: User
  user2?: User
  created_at?: string
}) {
  return (
    <div className="flex flex-row w-full items-center justify-between">
      <Link
        className="cursor-pointer group w-full"
        href={getProfilePath(user2?.walletAddress)} // why is this walletAddress & not walletAddress?  need to find out
        prefetch={true}
      >
        <div className="flex  w-full flex-row items-start">
          <div className="">
            <ProfileToolTip user={user}>
              <UserPfpIcon
                pfp={user?.pfp ? user?.pfp : DEFAULT_PFP_PLACEHOLDER}
              />
            </ProfileToolTip>
          </div>
          <div className="flex flex-row items-center ml-3.5 justify-between w-full">
            <div className="flex flex-row items-center">
              <p className=" text-white text-[1.1rem]  font-[500] hover:text-white/80">
                {user?.name}
              </p>
              {user2 && (
                <p
                  className={`
                      text-[13px] text-white
                      px-1 py-px font-[400] rounded-sm overflow-hidden ml-1.5
                      ${
                        parseOption(user2?.option) === "No"
                          ? "bg-[#FF0050]"
                          : "bg-[#0050FF]"
                      }
                    `}
                >
                  <span className="font-[600]">
                    ${(user2?.amount / 10 ** 6).toFixed(2)}{" "}
                    {parseOption(user2?.option)}
                  </span>
                </p>
              )}
            </div>

            <p className="text-[0.9rem] font-[400] text-white/70">
              {timeAgo(created_at)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

function UserPfpIcon({ pfp }: { pfp?: string }) {
  if (pfp?.length > 0) {
    return (
      <img
        src={pfp}
        alt="profile"
        className="w-12 h-12 min-w-12 min-h-12 border-[0.08rem] border-[#191919] rounded-full object-cover "
      />
    )
  } else {
    return <UserCircle2Icon color="gray" size={20} />
  }
}
