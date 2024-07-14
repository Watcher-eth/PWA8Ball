// @ts-nocheck
import React from "react";

import { ActivityPage } from "@/components/Activity";
import { DesktopNavbar } from "@/components/Common/DesktopNavbar";
import { DesktopUserActivity } from "@/components/profile/DesktopUserActivity";
import { DesktopUserSideProfile } from "@/components/profile/DestopUserSideCard";
import { useUserStore } from "@/lib/stores/UserStore";

export const DesktopActivityPage: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col bg-[#080808]">
      <DesktopNavbar />
      <div className="grid grid-cols-10 gap-4 px-8 bg-[#080808] flex-grow">
        <div className="col-span-3">
          <DesktopUserSideProfile />
        </div>
        <div className="col-span-4">
          <ActivityPage isDesktop={true} />
        </div>
        <div className="col-span-3">
          <DesktopUserActivity
            walletAddress={user?.walletaddress}
            userId={user?.external_auth_provider_user_id}
          />
        </div>
      </div>
    </div>
  );
};
