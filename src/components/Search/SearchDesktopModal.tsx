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

export function SearchDesktopModal({
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
    <Dialog className="rounded-2xl">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 bg-[#080808]/[0.8] rounded-2xl min-h-[50vh] border-2 border-[#181818]">
        <Card className="shadow-none bg-[#080808] rounded-2xl border-0">
          <CardContent className="p-6 rounded-2xl">
            <SearchOverview />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
