// @ts-nocheck
import { ActivityPage } from "@/components/Activity";
import { DesktopUserActivity } from "@/components/profile/DesktopUserActivity";
import { ProfileSection } from "@/components/profile/DesktopProfilePage";

export function DesktopActivityPage({ userC }: { userC: IUser }) {
  const user = userC;

  return (
    <div className="flex flex-col bg-[#080808]">
      <div className="flex flex-row  pt-3 px-8 bg-[#080808] ">
        <ProfileSection user={user} userC={user} />
        <div className="-mt-8 ml-3">
          <ActivityPage isDesktop={true} />
        </div>
        <DesktopUserActivity
          walletAddress={user?.walletaddress}
          userId={user?.external_auth_provider_user_id}
        />
      </div>
    </div>
  );
}
