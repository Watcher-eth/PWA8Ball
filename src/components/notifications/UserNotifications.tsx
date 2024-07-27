// @ts-nocheck

import { useGetNotificationsForUser } from "@/supabase/queries/notifications/useGetNotificationsForUser";

import { NotificationCard } from "./NotificationCard";

export function NotificationsPage({ userId, isDesktop }) {
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetNotificationsForUser(userId);

  if (isLoading) {
    return <span className="text-white">Loading...</span>;
  }

  if (error) {
    return <span className="text-white">Error: {error.message}</span>;
  }

  if (!(notifications?.length > 0)) {
    return <span className="text-white">No notifications found.</span>;
  }

  return (
    <div
      className={`
        flex flex-col items-center w-[22vw] p-5 pt-3.5
        ${
          isDesktop
            ? "bg-[#171717] rounded-xl border-2 border-[#292929]"
            : "bg-[#101010]"
        }
      `}
    >
      <h1 className="font-bold text-white text-2xl my-3">Notifications</h1>
      <div className="w-full overflow-y-auto">
        {notifications.map((item, index) => (
          <NotificationCard
            key={item.id}
            index={index}
            type={item.type}
            user={item.users}
            message={item.head}
            image={item.image}
            comment={item.comment}
          />
        ))}
      </div>
    </div>
  );
}
