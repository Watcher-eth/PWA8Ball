// @ts-nocheck
import { Bell, DoorOpen, Search } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { DesktopNotificationModal } from "../Notifications/DesktopNotificationModal";
import { DesktopSearchModal } from "../Search/DesktopSearchModal";
import { DesktopProfilePopover } from "../profile/DesktopProfilePopover";
import { DesktopOnboardingModal } from "../Onboarding/DesktopOnboardingModal";
import Link from "next/link";
import { HOME_PATH } from "@/utils/urls";

export function DesktopNavbar() {
  const { user } = useUserStore();
  console.log("user", user);
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
            <NavIconButton
              icon={
                <img
                  src="/images/OrbLogo.png" // Replace with your image path
                  alt="Left Icon"
                  className="size-10 rounded-full ml-1"
                />
              }
            />
          </Link>
          <div className="flex items-center space-x-8">
            <DesktopSearchModal userId={user?.external_auth_provider_user_id}>
              <NavIconButton IconComponent={Search} />
            </DesktopSearchModal>
            <DesktopNotificationModal
              userId={user?.external_auth_provider_user_id}
            >
              <NavIconButton IconComponent={Bell} />
            </DesktopNotificationModal>
            {user ? (
              <DesktopProfilePopover>
                <div className="flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all">
                  <img
                    src={user.pfp}
                    alt={user.name}
                    className="size-8 rounded-full"
                  />
                </div>
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
  );
}

function NavIconButton({
  icon,
  IconComponent,
  className = "",
  iconClassName = "",
}: {
  icon?: React.ReactNode;
  IconComponent?: any;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`
        hover:scale-105 active:scale-98 transition-all
        cursor-pointer ${className}
      `}
    >
      {icon ?? (
        <IconComponent className={`size-6 ${iconClassName}`} strokeWidth={3} />
      )}
    </div>
  );
}

function ConnectButton() {
  return (
    <div
      className={`
        bg-[#171717]/80 hover:bg-[#171717]/90
        hover:scale-105 active:scale-95 transition-all
        font-semibold cursor-pointer
        border border-white/10 hover:border-white/20 active:border-white/30
        px-4 py-2 rounded-md flex flex-row items-center
      `}
    >
      Connect
    </div>
  );
}
