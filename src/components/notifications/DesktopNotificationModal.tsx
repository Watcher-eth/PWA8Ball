// @ts-nocheck

import { useGetNotificationsForUser } from "@/supabase/queries/notifications/useGetNotificationsForUser";

import { NotificationsPlaceholder } from "../common/placeholders/NewPlaceholders";
import { DesktopCardModal } from "../modals/DesktopCardModal";
import { useUserStore } from "@/lib/stores/UserStore";

import { NotificationCard } from "./NotificationCard";

export function DesktopNotificationModal({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetNotificationsForUser(userId);
  const { user } = useUserStore();
  console.log("notifs", notifications);
  return (
    <DesktopCardModal
      title="Notifications"
      subtitle="You have 3 unread messages."
      cardClassName=""
      dialogContentClassName="bg-[#080808]/85 backdrop-blur-lg "
      cardContentClassName=" min-h-[50vh] "
      dialogClassName=""
      content={
        <div className="overflow-y-auto">
          {notifications?.length > 0 ? (
            notifications?.map((item, index) => (
              <NotificationCard
                key={item.id}
                index={index}
                type={item.type}
                user={item?.users}
                message={item.head}
                image={item.image}
                comment={item.comment}
              />
            ))
          ) : (
            <NotificationsPlaceholder />
          )}
        </div>
      }
    >
      {children}
    </DesktopCardModal>
  );
}
