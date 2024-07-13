// @ts-nocheck
import { Input } from "@/components/ui/Input";
import { Instagram, Phone, Twitch, Twitter } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

import { DesktopCardModal } from "../Modals/DesktopCardModal";

const METAMASK_ICON_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png";
const COINBASE_ICON_SRC =
  "https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png";
const WALLETCONNECT_ICON_SRC =
  "https://api.nuget.org/v3-flatcontainer/walletconnect.auth/2.3.8/icon";



export function DesktopOnboardingModal({ children }: { children: React.ReactNode }) {
  return (
    <DesktopCardModal
      dialogContentClassName="min-w-[55vw]"
      cardClassName="w-full"
      cardContentClassName="!p-0"
      content={<DesktopOnboarding />}
    >
      {children}
    </DesktopCardModal>
  );
}

function DesktopOnboarding() {
  const { ready, authenticated, login } = usePrivy();

  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg w-[55vw] max-w-[55vw]">
      <div className="flex flex-col items-center justify-center w-1/2 p-10 pt-6 text-white">
        <img
          src={"/images/OrbLogo.png"}
          className="flex items-center justify-center w-14 h-14 mb-3 rounded-full"
        ></img>
        <h2 className="text-2xl font-bold mb-2">Welcome to 8Ball</h2>
        <p className="text-center mb-6 px-6 text-[lightgray]">
          Sign up with your email or connect a Web3 wallet to start predicting
          the future.
        </p>
        <Input
          type="email"
          placeholder="Email"
          className="mb-4 w-full bg-[#212121] text-white"
        />
        <div className="flex justify-between w-full  rounded-[0.5rem]  mb-4">
          <SocialOnboardButton IconComponent={Twitch} onClick={login} />
          <SocialOnboardButton IconComponent={Twitter} onClick={login} />
          <SocialOnboardButton IconComponent={Instagram} onClick={login} />
          <SocialOnboardButton IconComponent={Phone} onClick={login} />
        </div>
        <WalletOnboardButton
          label="MetaMask"
          iconSrc={METAMASK_ICON_SRC}
          onClick={login}
        />
        <WalletOnboardButton
          label="Coinbase"
          iconSrc={COINBASE_ICON_SRC}
          onClick={login}
        />
        <WalletOnboardButton
          label="WalletConnect"
          iconSrc={WALLETCONNECT_ICON_SRC}
          onClick={login}
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
      <div className="w-1/2">
        <img
          src="/images/OnboardingImage.png"
          alt="Onboarding illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}


function SocialOnboardButton({
  IconComponent,
  onClick
}: {
  IconComponent: React.ReactNode
  onClick: () => void
}) {
  return (
    <div
      className={`
        hover:scale-105 active:scale-98 transition-all
        p-3 bg-[#212121] border-2 border-[#272727]
        w-[5vw] justify-center items-center
        flex rounded-[0.4rem] text-white cursor-pointer
      `}
      onClick={onClick}
    >
      <IconComponent className="size-5" />
    </div>
  );
}

function WalletOnboardButton({
  label,
  iconSrc,
  onClick,
}: {
  label: string;
  iconSrc: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        w-full mb-4
        hover:scale-101 active:scale-98 transition-all
        cursor-pointer
      `}
    >
      <div
        variant="outline"
        className="w-full rounded-md p-2 flex flex-row items-center border-2 border-[#272727] bg-[#212121] text-white"
      >
        <img src={iconSrc} className="size-5 mr-2" />
        {label}
      </div>
    </div>
  );
}