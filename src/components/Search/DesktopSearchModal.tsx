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
import { SearchOverview } from "./SearchOverview";

export function DesktopSearchModal({
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
    <Dialog style={{ borderRadius: "1.5rem" }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        style={{ borderRadius: "1.5rem" }}
        className="p-0 bg-[#080808]/[0.8] min-h-[50vh] border-2 border-[#181818]"
      >
        <Card
          style={{ borderRadius: "1.5rem" }}
          className="shadow-none bg-[#080808] border-0"
        >
          <CardContent className="p-6 rounded-2xl">
            <SearchOverview />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
