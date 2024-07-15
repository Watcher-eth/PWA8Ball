// @ts-nocheck
import { Bell, DoorOpen, Search } from "lucide-react";
import { useUserStore } from "@/lib/stores/UserStore";
import { DesktopNotificationModal } from "../Notifications/DesktopNotificationModal";
import { DesktopSearchModal } from "../Search/DesktopSearchModal";
import { DropdownProfilePopover } from "../profile/DesktopProfilePopover";
import { DesktopOnboardingModal } from "../Onboarding/DesktopOnboardingModal";
import Link from "next/link";
import { HOME_PATH } from "@/utils/urls";

export function DesktopNavbar() {
  const { user } = useUserStore();

  return (
    <div className="flex justify-between items-center p-0 pb-8 pt-3 px-8 text-white">
      <Link href={HOME_PATH}>
        <NavIconButton
          icon={
            <img
              src="/images/OrbLogo.png" // Replace with your image path
              alt="Left Icon"
              className="size-12 rounded-full"
            />
          }
        />
      </Link>
      <div className="flex items-center space-x-8">
        <DesktopSearchModal userId={user?.external_auth_provider_user_id}>
          <NavIconButton IconComponent={Search} />
        </DesktopSearchModal>
        <DesktopNotificationModal userId={user?.external_auth_provider_user_id}>
          <NavIconButton IconComponent={Bell} />
        </DesktopNotificationModal>
        {user ? (
          <DropdownProfilePopover>
            <div className="flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all">
              <img
                src={user.pfp}
                alt={user.name}
                className="size-8 rounded-full"
              />
            </div>
          </DropdownProfilePopover>
        ) : (
          <DesktopOnboardingModal>
            <ConnectButton />
          </DesktopOnboardingModal>
        )}
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
        bg-[#171717] font-semibold cursor-pointer
        border border-white/10 hover:border-white/20 active:border-white/30
        px-4 py-2 rounded-md flex flex-row items-center
      `}
    >
      Connect
    </div>
  );
}
