// @ts-nocheck
import { ActivityPage } from "@/components/Activity";
import { DesktopNavbar } from "@/components/common/DesktopNavbar";
import { DesktopUserActivity } from "@/components/profile/DesktopUserActivity";
import { DesktopUserSideProfile } from "@/components/profile/DestopUserSideCard";
import { useUserStore } from "@/lib/stores/UserStore";
import { DesktopProfileSide } from "@/components/profile/DesktopProfile";

export function DesktopActivityPage({ userC }: { userC: IUser }) {
  const user = userC
  // const { user } = useUserStore();

  return (
    <div className="flex flex-col bg-[#080808]">
      <DesktopNavbar />
      <div className="flex flex-row py-20 px-8 bg-[#080808] flex-grow">
        <DesktopProfileSide totalFollowers={128} userC={user} />
        <div className="-mt-8  ml-3">
          <ActivityPage isDesktop={true} />
        </div>
        <DesktopUserActivity
          walletAddress={user?.walletaddress}
          userId={user?.external_auth_provider_user_id}
        />
      </div>
    </div>
  );
};
