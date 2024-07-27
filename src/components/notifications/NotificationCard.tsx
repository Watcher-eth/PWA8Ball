// @ts-nocheck

import { Heart, UserPlus, MessageSquareText, Bell } from "lucide-react";

export function NotificationCard({
  type,
  user,
  message,
  image,
  comment,
  index,
}) {
  let icon;
  switch (type) {
    case "follow":
      icon = <UserPlus strokeWidth={3} size={16} color="white" />;
      break;
    case "reply":
      icon = (
        <MessageSquareText
          strokeWidth={4}
          size={16}
          color="#191919"
          fill="#191919"
        />
      );
      break;
    case "like":
      icon = <Heart strokeWidth={4} size={16} color="white" fill="white" />;
      break;
    default:
      icon = <Bell strokeWidth={4} size={16} color="white" fill="white" />;
  }

  return (
    <div
      className="mb-2.5 bg-[#101010]/[0.9] animate-fadeInUp"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="flex items-center p-3 bg-[#191919] rounded-lg shadow-lg"
        onClick={() => {}}
      >
        {type === "like" && (
          <img
            className="size-11 rounded-full mr-2.5"
            src={user?.pfp}
            alt="Profile"
          />
        )}
        <div className="flex-1">
          {type === "like" && (
            <>
              <div className="flex items-baseline">
                <span className="font-semibold text-white mr-1">
                  {user?.name}{" "}
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
              <span className="font-bold text-white text-lg">{message}</span>
              <p className="text-[#777] text-base">
                {user?.name} started following you
              </p>
            </>
          )}
          {type === "reply" && (
            <>
              <span className="font-bold text-white text-lg">
                {user?.name} {message}
              </span>
              <p className="text-[#777] text-base line-clamp-2">
                {comment && comment.content}
              </p>
            </>
          )}
        </div>
        <div className="p-2 rounded-full border-3 border-[#323232]">{icon}</div>
        {type === "follow" && (
          <span className="text-[#4a90e2] font-bold">Follow</span>
        )}
        {image && <img src={image} alt="Notification" />}
      </div>
    </div>
  );
};
