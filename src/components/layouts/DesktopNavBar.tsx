// @ts-nocheck
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { HOME_PATH } from "@/utils/urls";
import { useUserStore } from "@/lib/stores/UserStore";

import { ConnectButton } from "@/components/buttons/ConnectButton";
import { NavIconButton } from "@/components/buttons/NavIconButton";

import { DesktopNotificationModal } from "@/components/notifications/DesktopNotificationModal";
import { DesktopSearchModal } from "@/components/search/DesktopSearchModal";
import { DesktopProfilePopover } from "@/components/profile/DesktopProfilePopover";
import { DesktopOnboardingModal } from "@/components/onboarding/DesktopOnboardingModal";



export function DesktopNavBar() {
  const { user } = useUserStore();
  const userId = user?.external_auth_provider_user_id;

  return (
    <div className="w-full absolute z-50 top-0">
      <div
        className={`
            pb-8 pt-3 px-8 text-white z-50 fixed w-full
        `}
      >
        <div
          className={`
            flex justify-between items-center w-full p-2 ring-1 rounded-lg
            ring-white/20 backdrop-blur bg-slate-400/10
          `}
        >
          <Link href={HOME_PATH}>
            <div className="flex items-center">
              <NavIconButton
                icon={
                  <img
                    src="/images/OrbLogo.png" // Replace with your image path
                    alt="Left Icon"
                    className="size-10 rounded-full ml-1"
                  />
                }
              />
              <div className="pl-2 font-[Aeonik] text-2xl">
                Glimpse
              </div>
            </div>
          </Link>
          <div className="flex items-center space-x-8">
            <DesktopSearchModal userId={userId}>
              <NavIconButton IconComponent={Search} />
            </DesktopSearchModal>
            <DesktopNotificationModal userId={userId}>
              <NavIconButton IconComponent={Bell} />
            </DesktopNotificationModal>
            <div className="flex items-center space-x-2 ">
              {user ? (
                <DesktopProfilePopover>
                  <ConnectButton user={user} />
                </DesktopProfilePopover>
              ) : (
                <DesktopOnboardingModal>
                  <ConnectButton />
                </DesktopOnboardingModal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



