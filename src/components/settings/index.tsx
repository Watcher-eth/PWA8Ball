// @ts-nocheck
import _ from "lodash"
import {
  ChevronRight,
  CreditCard,
  Download,
  ReceiptText,
  Save,
  UserPlus,
  Wallet,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { useUserStore } from "@/lib/stores/UserStore"
import { DesktopOnrampModal } from "@/components/onboarding/Onramp/DesktopOnrampModal"
import { useUserUsdcBalance } from "@/hooks/wallet/useUserUsdcBalance"
import { shortenAddress } from "@/utils/address/shortenAddress"
import Link from "next/link"
import { copyToClipboard } from "@/utils/copyToClipboard"

import { UserInviteModal } from "@/components/onboarding/Invites/UserInviteModal"
import { useCreateUser } from "@/hooks/actions/UserRegistry/useCreateUser"

export function SettingsPage() {
  const initialSettings = {
    pushNotifications: false,
    personalizedRecommendations: false,
    publicProfile: false,
  }
  const { user } = useUserStore()
  const userBalance = useUserUsdcBalance()
  const [settings, setSettings] = useState(initialSettings)
  const [showSaveButton, setShowSaveButton] = useState(false)
  const { handleCreateUser } = useCreateUser()
  useEffect(() => {
    const hasChanges = _.isEqual(settings, initialSettings)
    setShowSaveButton(hasChanges)
  }, [settings])

  function handleSwitchChange(key: keyof typeof settings, value: boolean) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }))
  }

  return (
    <div className="container pt-6 md:pt-0 p-0 w-full h-full z-[10]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="order-first  bg-[#101010] space-y-9 flex flex-col md:order-first rounded-md p-5 md:ml-4 relative">
          <div className="text-white font-semibold text-3xl -mb-5 ">
            Settings
          </div>
          <div className="w-full p-4 rounded-md bg-[#181818] flex flex-row items-center justify-between">
            <div className="text-white font-semibold text-[0.95rem] flex flex-row items-center">
              <img
                className="size-[1.5rem] object-cover rounded-full mr-2"
                src={user?.pfp}
              />
              {user?.name}
            </div>
            <div className="text-white text-[0.85rem] px-3 p-1 bg-[#262626] rounded-md">
              Edit
            </div>
          </div>
          <div className="flex flex-col px-4 bg-[#181818] rounded-md">
            <div className="w-full py-4 flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">
                Push Notifications
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(value) =>
                  handleSwitchChange("pushNotifications", value)
                }
                className="bg-[#212121]"
              />
            </div>
            <div className="h-px w-full  bg-[#212121]" />
            <div className="w-full py-4 flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">
                Personalized Recommendations
              </div>
              <Switch
                checked={settings.personalizedRecommendations}
                onCheckedChange={(value) =>
                  handleSwitchChange("personalizedRecommendations", value)
                }
                className="bg-[#212121]"
              />
            </div>
            <div className="h-px w-full  bg-[#212121]" />
            <div className="w-full py-4 flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">Public Profile</div>
              <Switch
                checked={settings.publicProfile}
                onCheckedChange={(value) =>
                  handleSwitchChange("publicProfile", value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col px-4 bg-[#181818] rounded-md">
            <Link
              href={"/privacy"}
              className="w-full py-4  flex flex-row items-center justify-between"
            >
              <div className="text-white text-[0.95rem]">Privacy</div>
              <ChevronRight className="text-white h-[1rem]" strokeWidth={3} />
            </Link>
            <div className="h-px w-full  bg-[#212121]" />
            <Link
              href={"/tos"}
              className="w-full py-4  flex flex-row items-center justify-between"
            >
              <div className="text-white text-[0.95rem]">Terms of Service</div>
              <ChevronRight className="text-white h-[1rem]" strokeWidth={3} />
            </Link>
            <div className="h-px w-full  bg-[#212121]" />
            <div className="w-full py-4  flex flex-row items-center justify-between">
              <div className="text-white text-[0.95rem]">Region</div>
              <div className="text-white text-[0.85rem] px-3 p-1 bg-[#262626] rounded-md">
                USA 🇺🇸
              </div>
            </div>
          </div>
          <div className="p-7 bg-[#181818] rounded-md flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="text-lg text-white font-semibold">
                Invite and earn
              </div>
              <div className="text-md max-w-[55a%] text-[lightgray]">
                Invite your friends to Glimpse and receive a share of their
                points for life!
              </div>
              <div className="h-px mt-4 my-5 w-full  bg-[#212121]" />
              <div className="flex flex-row space-x-3 items-center">
                <UserInviteModal>
                  <button className="px-3 text-white text-md flex items-center flex-row py-1 rounded-md bg-[#262626]">
                    <UserPlus
                      className="text-white mr-1 h-[1rem]"
                      strokeWidth={2.5}
                    />{" "}
                    Invite Friends
                  </button>
                </UserInviteModal>
                <div className="text-md text-[#909090]">0 referrals</div>
              </div>
            </div>
          </div>
          {showSaveButton && (
            <button
              onClick={() => {
                // Handle save action here
                setShowSaveButton(false) // Hide the save button after saving
              }}
              className=" bg-[#151515] text-white justify-center font-semibold flex flex-row items-center px-4 py-2.5 rounded-md"
            >
              <Save className="h-[1rem]" strokeWidth={2.5} /> Save
            </button>
          )}
        </div>
        <div className="order-last md:order-last rounded-md  p-4 -my-4 z-10">
          <div className="flex flex-col rounded-md bg-[#101010] p-5 px-8">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col -space-y-2">
                <div className="text-white text-[2rem] font-bold">
                  ${(Number(userBalance) / 10 ** 6).toFixed(2) ?? "0.00"}
                </div>
                <div className="text-white text-base font-semibold">
                  Your balance
                </div>
              </div>
              <div className="flex flex-col w-[30%] mt-3">
                <div className="flex flex-row space-x-1">
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-green-300`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                  <div className={`h-[2rem] w-1 bg-[#212121]`} />
                </div>
                <div className="text-green-300 text-base mt-1 font-semibold">
                  7 active predicitions
                </div>
              </div>
            </div>
            <div className="h-px w-full mb-4 mt-6 bg-[#212121]" />
            <div className="flex flex-row items-center justify-between">
              <div className="text-[lightgray] text-base mt-1 font-medium">
                Joined May 2024
              </div>
              <div className="flex flex-row space-x-3 items-center">
                <button className="px-3 flex-row font-semibold text-white text-md flex items-center justify-center py-1 rounded-md bg-[#262626]">
                  <ReceiptText
                    className="h-[0.9rem] text-white"
                    strokeWidth={2.5}
                  />
                  Prediction History
                </button>
                <DesktopOnrampModal>
                  <button className="px-3 flex-row font-semibold text-white text-md flex items-center justify-center py-1 rounded-md bg-[#262626]">
                    <CreditCard
                      className="h-[0.9rem] text-white"
                      strokeWidth={2.5}
                    />
                    Payment Method
                  </button>
                </DesktopOnrampModal>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-md bg-[#101010] p-5 px-8 mt-8">
            <div className="text-white text-[1.35rem] font-semibold">
              Your Glimpse Wallet
            </div>
            <div className="text-[lightgray] text-base font-normal">
              You have complete control of your wallet and can use it in other
              apps.
            </div>
            <img className="w-full h-full" src="/images/Wallet.png" />
            <div className="h-px w-full bg-[#222222] mb-5 mt-1.5" />
            <div className="flex flex-row items-center justify-between">
              <button
                onClick={() => copyToClipboard(user?.walletAddress)}
                className="px-2 space-x-5 hover:scale-101 actice:scale:98 flex-row font-semibold text-white text-md flex items-center justify-center py-1 rounded-md bg-[#262626]"
              >
                <Wallet
                  color="white"
                  className="mr-1"
                  height={17}
                  strokeWidth={2.5}
                />
                {user?.walletAddress && shortenAddress(user?.walletAddress)}
              </button>
              <button
                onClick={() =>
                  handleCreateUser({
                    walletAddress: "0x9fEFD0Bb2d175B039C8c72C55eEa11BC66452591",
                    externalAuthProviderUserId:
                      "did:privy:clutganzs01rz2oqk4vvlw1ih",
                    id: "0x9fEFD0Bb2d175B039C8c72C55eEa11BC66452591",
                    pfp: "https://pbs.twimg.com/profile_images/1749354610261979136/44nFYEPi_400x400.jpg",
                    name: "Watcher",
                    socials: JSON.stringify({
                      twitter: {
                        pfp: "https://pbs.twimg.com/profile_images/1749354610261979136/44nFYEPi_400x400.jpg",
                        name: "Watcher",
                        username: "Watcher2nd",
                      },
                    }),
                  })
                }
                className="px-2 space-x-5 flex-row font-semibold text-white md:text-md flex items-center justify-center py-1 rounded-md bg-[#262626]"
              >
                <Download
                  color="white"
                  className="mr-1"
                  height={17}
                  strokeWidth={2.5}
                />
                Export Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
