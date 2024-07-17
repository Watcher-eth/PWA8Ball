// @ts-nocheck

import { useGetNotificationsForUser } from "@/supabase/queries/notifications/useGetNotificationsForUser";
import { NotificationCard } from "./UserNotifications";
import { NotificationsPlaceholder } from "../common/Placeholders/NewPlaceholders";
import { DesktopCardModal } from "../Modals/DesktopCardModal";
import { useUserStore } from "@/lib/stores/UserStore";

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
      cardClassName="w-[99%]"
      dialogContentClassName="bg-[#080808]/[0.85] backdrop-blur-lg w-full"
      cardContentClassName=" w-full min-h-[50vh] "
      dialogClassName="w-[99%]"
      content={
        <div className="w-full overflow-y-auto">
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
