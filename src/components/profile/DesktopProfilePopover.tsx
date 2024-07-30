// @ts-nocheck

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDisconnectUser } from "@/hooks/wallet/useDisconnectUser";
import { useUserStore } from "@/lib/stores/UserStore";
import {
  DoorOpen,
  FileText,
  GlobeLock,
  HelpCircle,
  Rocket,
  Settings,
  User,
  Wallet,
  UserCircle,
  ArrowDownToLine,
} from "lucide-react";

import { DesktopOnrampModal } from "@/components/onboarding/Onramp/DesktopOnrampModal";
import { DesktopInviteFriends } from "@/components/share/DesktopInviteFriends";
import { Dialog } from "@/components/ui/dialog";
import { DropdownItem } from "@/components/ui/DropdownItem";
import { useMyEns } from "@/hooks/wallet/useMyEns";
import { getProfilePath, SETTINGS_PATH } from "@/utils/urls";

export function DesktopProfilePopover({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  const { disconnectUser } = useDisconnectUser();
  const { displayName } = useMyEns();

  const displayUsername =
    !user?.name || user?.name?.slice(0, 2) == "0x" ? displayName : user?.name;
  console.log(user?.name, displayName, displayUsername);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>{children}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#080808]/80 mr-2 mt-2 rounded-lg backdrop-blur-lg border w-56 border-white/10">
          <DropdownMenuLabel className="flex  flex-row items-center">
            {user?.pfp ? (
              <img className="size-6 rounded-full mr-2" src={user?.pfp} />
            ) : (
              <UserCircle
                className="size-6 rounded-full mr-2"
                strokeWidth={2.2}
              />
            )}
            <div>{displayUsername}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownItem
              label="Profile"
              IconComponent={User}
              href={getProfilePath(user?.external_auth_provider_user_id)}
            />
            <DesktopOnrampModal>
              <DropdownItem label="Fund your account" IconComponent={Wallet} />
            </DesktopOnrampModal>
            <DropdownItem
              label="Settings"
              IconComponent={Settings}
              href={SETTINGS_PATH}
            />

            <DropdownItem
              label="Your Boosts"
              IconComponent={Rocket}
              href={"lp"}
            />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DesktopInviteFriends>
              <DropdownItem label="Your Friends" />
            </DesktopInviteFriends>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:!bg-slate-400/20 rounded-md active:!bg-slate-400/30">
                Invite users
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  className={`
                  bg-[#080808]/80 rounded-md
                  backdrop-blur-md border border-white/10
                `}
                >
                  <DropdownItem
                    label="Twitter"
                    iconSrc="https://img.freepik.com/vektoren-kostenlos/neues-twitter-logo-x-icon-design-2023_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user"
                  />
                  <DropdownItem
                    label="Telegram"
                    iconSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png"
                  />
                  <DropdownItem
                    label="Instagram"
                    iconSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                  />
                  <DropdownItem
                    label="TikTok"
                    iconSrc="https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_1280.png"
                  />
                  <DropdownMenuSeparator />
                  <DropdownItem label="More..." />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
              <DropdownItem
                label="Download on IOS"
                IconComponent={ArrowDownToLine}
                href={"https://testflight.apple.com/join/xBbJ2OPO"}
              />
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownItem label="Support" IconComponent={HelpCircle} />
          <DropdownItem label="Terms of Service" IconComponent={FileText} />
          <DropdownItem
            label="Privacy"
            IconComponent={GlobeLock}
            disabled={true}
          />
          <DropdownMenuSeparator />
          <DropdownItem
            onClick={disconnectUser}
            label="Log out"
            IconComponent={DoorOpen}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
