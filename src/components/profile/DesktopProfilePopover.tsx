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
} from "lucide-react";
import Link from "next/link";

export function DesktopProfilePopover({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#080808]/80 mr-2 mt-2 rounded-lg backdrop-blur-lg border-2 w-56 border-[#181818]">
        <DropdownMenuLabel className="flex  flex-row items-center">
          {user?.pfp ? (
            <img className="size-6 rounded-full mr-2" src={user?.pfp} />
          ) : (
            <UserCircle className="size-6 text-white" strokeWidth={2.2} />
          )}
          <div>{user?.name}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/u/${user?.external_auth_provider_user_id}`}>
            <DropdownItem label="Profile" IconComponent={User} />
          </Link>
          <DropdownItem label="Fund your account" IconComponent={Wallet} />
          <DropdownItem label="Settings" IconComponent={Settings} />
          <DropdownItem label="Your Boosts" IconComponent={Rocket} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownItem label="Your Friends" />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:!bg-slate-400/20">
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                className={`
                  bg-[#080808]/80 rounded-md
                  backdrop-blur-md border-2 border-[#181818]
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
        <DropdownItem label="Log out" IconComponent={DoorOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownItem({
  label,
  IconComponent,
  iconSrc,
  disabled = false,
}: {
  label: string;
  IconComponent?: React.FC;
  iconSrc?: string;
  disabled?: boolean;
}) {
  return (
    <DropdownMenuItem
      className="flex flex-row justify-between items-center hover:!bg-slate-400/20"
      disabled={disabled}
    >
      {label}
      {IconComponent && (
        <IconComponent className="size-4 text-white" strokeWidth={2.2} />
      )}
      {iconSrc?.length > 0 && (
        <img className="size-4 rounded-full" src={iconSrc} />
      )}
    </DropdownMenuItem>
  );
}
