// @ts-nocheck


import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import { ReactNode } from "react";
import { useGetNotificationsForUser } from "@/supabase/queries/notifications/useGetNotificationsForUser";
import { NotificationCard } from "./UserNotifications";
import { NotificationsPlaceholder } from "../Common/Placeholders/NewPlaceholders";

export function DesktopNotificationModal({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) {
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetNotificationsForUser(userId);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-[#080808]/[0.8] rounded-2xl min-h-[50vh] border-2 border-[#181818]">
        <Card className="shadow-none bg-[#080808]  border-0">
          <CardHeader className="border-b border-[#212121]">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {notifications?.length > 0 ? (
              <div className="w-full overflow-y-auto">
                {notifications?.map((item, index) => (
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
            ) : (
              <div className="w-full overflow-y-auto">
                <NotificationsPlaceholder />
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
