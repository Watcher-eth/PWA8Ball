// @ts-nocheck

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDisconnectUser } from "@/hooks/wallet/useDisconnectUser"
import { useUserStore } from "@/lib/stores/UserStore"
import {
  DoorOpen,
  Settings,
  Wallet,
  UserCircle,
  ArrowDownToLine,
  Key,
  Copy,
} from "lucide-react"

import { DesktopOnrampModal } from "@/components/onboarding/Onramp/DesktopOnrampModal"
import { DesktopInviteFriends } from "@/components/share/DesktopInviteFriends"
import { Dialog, DialogOverlay } from "@/components/ui/dialog"
import { DropdownItem } from "@/components/ui/DropdownItem"
import { useMyEns } from "@/hooks/wallet/useMyEns"
import { getProfilePath, SETTINGS_PATH } from "@/utils/urls"
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance"
import { copyToClipboard } from "@/utils/copyToClipboard"

export function MobileProfilePopover({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useUserStore()
  const { disconnectUser } = useDisconnectUser()
  const { displayName } = useMyEns()
  const userBalance = useUserUsdcBalance()

  const displayUsername =
    !user?.name || user?.name?.slice(0, 2) == "0x" ? displayName : user?.name

  return (
    <Dialog>
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <div>{children}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#303030]/20 -mr-[8rem] mt-4 rounded-lg backdrop-blur-xl border w-56 border-white/10">
          <DropdownMenuLabel className="flex  flex-row items-center">
            {user?.pfp ? (
              <img className="size-6 rounded-full mr-2" src={user?.pfp} />
            ) : (
              <UserCircle
                className="size-6 rounded-full mr-2"
                strokeWidth={2.2}
              />
            )}
            <div className="text-base font-[Aeonik-Bold]">
              {displayUsername}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex  flex-row items-center justify-between">
            <div>Balance:</div>
            <div className="flex flex-row items-center space-x-1">
              <div>${(Number(userBalance) / 10 ** 6).toFixed(2)}</div>{" "}
              <Wallet color="white" size={16} strokeWidth={2.8} />{" "}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DesktopOnrampModal>
              <DropdownItem label="Fund your account" IconComponent={Wallet} />
            </DesktopOnrampModal>
            <DropdownItem
              label="Settings"
              IconComponent={Settings}
              href={SETTINGS_PATH}
            />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DesktopInviteFriends>
              <DropdownItem label="Invites" IconComponent={Key} />
            </DesktopInviteFriends>
            <DropdownItem
              label={"Copy Address"}
              IconComponent={Copy}
              onClick={() => copyToClipboard(user?.walletAddress)}
            />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:!bg-slate-400/20 rounded-md active:!bg-slate-400/30">
                Share Glimpse
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
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownItem
            label="Download on IOS"
            IconComponent={ArrowDownToLine}
            href={"https://testflight.apple.com/join/xBbJ2OPO"}
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
  )
}
