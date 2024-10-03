// @ts-nocheck

import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"
import { Heart, UserPlus, MessageSquareText, Bell } from "lucide-react"

export function NotificationCard({
  type,
  user,
  message,
  image,
  comment,
  index,
}) {
  let icon
  switch (type) {
    case "follow":
      icon = <UserPlus strokeWidth={3} size={16} color="white" />
      break
    case "reply":
      icon = (
        <MessageSquareText
          strokeWidth={4}
          size={16}
          color="#191919"
          fill="#191919"
        />
      )
      break
    case "like":
      icon = <Heart strokeWidth={4} size={16} color="white" fill="white" />
      break
    default:
      icon = <Bell strokeWidth={4} size={16} color="white" fill="white" />
  }

  return (
    <div
      className="  animate-fadeInUp"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="my-1 h-px w-full bg-[#191919] " />
      <div
        className="flex items-center p-3 px-5 rounded-lg shadow-lg"
        onClick={() => {}}
      >
        <img
          className="size-11 rounded-full mr-2.5"
          src={user?.pfp ?? DEFAULT_PFP_PLACEHOLDER}
          alt="Profile"
        />

        <div className="flex-1 -space-y-0.5">
          {type === "like" && (
            <>
              <div className="flex items-baseline">
                <span className="font-semibold text-white mr-1">
                  {user?.name ?? "Anon"}{" "}
                </span>
                <span className="text-white text-base">
                  {" "}
                  liked your comment
                </span>
              </div>
              <p className="text-[#909090] text-base line-clamp-1">
                {comment?.content}
              </p>
            </>
          )}
          {type === "follow" && (
            <>
              <span className="font-semibold  text-white">{message}</span>
              <p className="text-[#777] text-base">
                {user?.name ?? "Anon"} started following you
              </p>
            </>
          )}
          {type === "reply" && (
            <>
              <span className="font-semibold  text-white ">
                {user?.name ?? "Anon"} {message}
              </span>
              <p className="text-[#777] text-base line-clamp-2">
                {comment && comment.content}
              </p>
            </>
          )}
        </div>
        {type === "follow" ? (
          <span className="text-[#4a90e2] font-bold">Follow</span>
        ) : (
          <div className="p-2 text-[lightgray] rounded-full border-3 border-[#323232]">
            {icon}
          </div>
        )}
        {image && <img src={image} alt="Notification" />}
      </div>
    </div>
  )
}
