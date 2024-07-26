// @ts-nocheck

import Link from "next/link";
import { UserCircle2Icon } from "lucide-react";
import { User } from "@/types/UserTypes";
import { timeAgo } from "@/utils/datetime/timeAgo";
import { parseOption } from "@/utils/predictions/parseOption";
import { getProfilePath } from "@/utils/urls";


export function CommentHeader({
  user,
  user2,
  created_at
}: {
  user?: User
  user2?: User
  created_at?: string
}) {
  return (
    <div className="flex flex-row w-full items-center justify-between">
      <Link
        className="cursor-pointer group"
        href={getProfilePath(user2?.external_auth_provider_user_id)}
        prefetch={true}
      >
        <div className="flex flex-row items-center">
          <div className="mr-2">
            <UserPfpIcon pfp={user?.pfp} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <p className="text-base text-white hover:text-white/80">
                {user?.name}
              </p>
              {user2 && (
                <p
                  className={`
                      text-[12px] text-white
                      px-1.5 py-px rounded-md overflow-hidden ml-1.5
                      ${
                        parseOption(user2?.option) === "No"
                          ? "bg-[#FF0050]"
                          : "bg-[#0050FF]"
                      }
                    `}
                >
                  <span className="font-medium">$</span>
                  <span className="font-[Aeonik-Bold]">
                    {(user2?.amount / 10 ** 6).toFixed(2)}{" "}
                    {parseOption(user2?.option)}
                  </span>
                </p>
              )}
            </div>

            <p className="text-sm text-white/60">
              Replied {timeAgo(created_at)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}


function UserPfpIcon({ pfp }: { pfp?: string }) {
  if (pfp?.length > 0) {
    return (
      <img
        src={pfp}
        alt="profile"
        className="size-10 rounded-[50%] overflow-hidden object-cover "
      />
    );
  } else {
    return <UserCircle2Icon size={40}  />;
  }
}