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
} from "lucide-react";
import { ReactNode } from "react";

export function DropdownProfilePopover({ children }: { children: ReactNode }) {
  const { user } = useUserStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#080808]/[0.85] mr-2 mt-2 rounded-[1rem] backdrop-blur-lg border-2 w-56 border-[#181818]">
        <DropdownMenuLabel className="flex  flex-row items-center">
          <img className="h-6 w-6 rounded-full mr-2" src={user?.pfp} />
          <div>{user.name}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex  flex-row justify-between items-center">
            <div>Profile</div>
            <User className="h-4 w-4 text-white " strokeWidth={2.2} />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex  flex-row justify-between items-center">
            Fund your account
            <Wallet className="h-4 w-4 text-white " strokeWidth={2.2} />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex  flex-row justify-between items-center">
            Settings
            <Settings className="h-4 w-4 text-white " strokeWidth={2.2} />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex  flex-row justify-between items-center">
            Your Boosts
            <Rocket className="h-4 w-4 text-white " strokeWidth={2.2} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Your Friends</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-[#080808]/[0.8] rounded-[0.85rem] backdrop-blur-md border-2 border-[#181818]">
                <DropdownMenuItem className="flex  flex-row justify-between items-center">
                  Twitter
                  <img
                    className="h-4  w-4 rounded-full"
                    src="https://img.freepik.com/vektoren-kostenlos/neues-twitter-logo-x-icon-design-2023_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex  flex-row justify-between items-center">
                  Telegram
                  <img
                    className="h-4  w-4 rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex  flex-row justify-between items-center">
                  Instagram
                  <img
                    className="h-4  w-4 rounded-full"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex  flex-row justify-between items-center">
                  TikTok
                  <img
                    className="h-4  w-4 rounded-full"
                    src="https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_1280.png"
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex  flex-row justify-between items-center">
          Support
          <HelpCircle className="h-4 w-4 text-white " strokeWidth={2.2} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex  flex-row justify-between items-center">
          Terms of Service
          <FileText className="h-4 w-4 text-white " strokeWidth={2.2} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex  flex-row justify-between items-center"
          disabled
        >
          Privacy
          <GlobeLock className="h-4 w-4 text-white " strokeWidth={2.2} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex  flex-row justify-between items-center">
          Log out
          <DoorOpen className="h-4 w-4 text-white " strokeWidth={2.2} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
