// @ts-nocheck

import { useGetNotificationsForUser } from "@/supabase/queries/notifications/useGetNotificationsForUser";
import { NotificationCard } from "./UserNotifications";
import { NotificationsPlaceholder } from "../Common/Placeholders/NewPlaceholders";
import { DesktopCardModal } from "../Modals/DesktopCardModal";
import { useUserStore } from "@/lib/stores/UserStore";

export function DesktopLPModal({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  return (
    <DesktopCardModal
      title="Notifications"
      subtitle="You have 3 unread messages."
      cardClassName="w-[99%]"
      dialogContentClassName="w-full"
      cardContentClassName="w-full min-h-[50vh]"
      dialogClassName="w-[99%]"
      content={
    
      }
    >
      {children}
    </DesktopCardModal>
  );
}
