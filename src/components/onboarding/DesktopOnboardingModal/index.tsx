
import { Phone } from "lucide-react"
import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth"
import { useAccount } from "wagmi"
import { DesktopCardModal } from "@/components/modals/DesktopCardModal"

import { DesktopCreateProfile } from "@/components/onboarding/DesktopCreateProfile"
import { useUserStore } from "@/lib/stores/UserStore"


import { Input } from "@/components/ui/Input"
import { AppleIcon, GoogleIcon, XIcon } from "./AuthIcons"
import { WalletOnboardButton } from "./WalletOnboardButton"
import { SocialOnboardButton } from "./SocialOnboardButton"
import { CustomConnectButton } from "./CustomConnectButton"


const METAMASK_ICON_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
const COINBASE_ICON_SRC =
  "https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png"
const WALLETCONNECT_ICON_SRC =
  "https://api.nuget.org/v3-flatcontainer/walletconnect.auth/2.3.8/icon"


export function DesktopOnboardingModal({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useUserStore()
  const { user: privyUser } = usePrivy()

  const { address } = useAccount()
  // console.log("user", user, PrivyUser)
  return (
    <DesktopCardModal
      dialogContentClassName="min-w-[55vw] md:min-w-[68vw] sm:min-w-[90vw] bg-[#080808]/[0.8]"
      cardClassName="w-full"
      cardContentClassName="!p-0"
      content={
        !user ? (
          <DesktopOnboarding />
        ) : user?.name?.startsWith("0x") ? (
          <DesktopCreateProfile />
        ) : address && !user?.name ? (
          <DesktopCreateProfile />
        ) : (
          <DesktopOnboarding />
        )
      }
    >
      {children}
    </DesktopCardModal>
  )
}

function DesktopOnboarding() {
  const { ready, authenticated, login } = usePrivy()
  const { loginWithOAuth, initOAuth } = useLoginWithOAuth()
  return (
    <div className="flex overflow-hidden rounded-lg ">
      <div className="flex flex-col items-center justify-center sm:w-1/2 w-full p-10 pt-6 text-white">
        <img
          src={"/images/OrbLogo.png"}
          className="flex items-center justify-center w-14 h-14 mb-3 rounded-full"
        ></img>
        <h2 className="text-2xl font-bold mb-2">Welcome to Glimpse</h2>
        <p className="text-center mb-6 px-6 text-[lightgray]">
          Sign up with your email or connect a Web3 wallet to start predicting
          the future.
        </p>
        <Input
          type="email"
          placeholder="Email"
          className="mb-4 w-full bg-[#151515] border-2 border-[#181818] placeholder-[lightgray] text-white"
        />
        <div className="flex justify-between w-full  rounded-[0.5rem]  mb-4">
          <SocialOnboardButton
            IconComponent={GoogleIcon}
            onClick={() => initOAuth({ provider: "google" })}
          />
          <SocialOnboardButton
            IconComponent={XIcon}
            onClick={() => initOAuth({ provider: "twitter" })}
          />
          <SocialOnboardButton
            IconComponent={AppleIcon}
            onClick={() => initOAuth({ provider: "apple" })}
          />
          <SocialOnboardButton
            label={"TikTok"}
            IconComponent={Phone}
            onClick={() => initOAuth({ provider: "tiktok" })}
          />
        </div>

        <WalletOnboardButton
          label="MetaMask"
          iconSrc={METAMASK_ICON_SRC}
          onClick={login}
        />
        <WalletOnboardButton
          label="coinbase"
          iconSrc={COINBASE_ICON_SRC}
          onClick={login}
        />

        {/* <WalletButton wallet="metamask" /> */}
        <CustomConnectButton
          label="WalletConnect"
          iconSrc={WALLETCONNECT_ICON_SRC}
          // onClick={login}
        />
        <div className="flex justify-between w-full mt-4 text-sm text-[lightgray]">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Download
          </a>
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            Discord
          </a>
        </div>
      </div>
      <div className="hidden sm:block sm:w-1/2">
        <img
          src="https://cdn.midjourney.com/d2bc36af-ea8f-48d5-b649-04536662b45a/0_3.png"
          alt="Onboarding illustration"
          className="object-cover w-full h-[70vh]"
        />
      </div>
    </div>
  )
}




