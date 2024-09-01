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
  return (
    <DesktopCardModal
      title="Notifications"
      subtitle="You have 3 unread messages."
      cardClassName=""
      dialogContentClassName="xl:max-w-[29vw] backdrop-blur-lg "
      cardContentClassName="px-0 xl:max-w-[29vw] min-h-[50vh] "
      dialogClassName=""
      content={
        <div className="overflow-y-auto w-full">
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
