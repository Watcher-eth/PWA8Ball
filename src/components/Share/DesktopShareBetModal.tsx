// @ts-nocheck

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { useGetNotificationsForUser } from "@/supabase/queries/notifications/useGetNotificationsForUser";
import { ShareBetModal } from "./ShareBetModal";

export function DesktopShareBetModal({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) {

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
            <ShareBetModal />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
