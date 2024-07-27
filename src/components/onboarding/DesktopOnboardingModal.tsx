// @ts-nocheck
import { Input } from "@/components/ui/Input";
import { Phone } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { WalletButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { DesktopCardModal } from "../modals/DesktopCardModal";
import { AppleIcon, GoogleIcon, XIcon } from "../common/Icons/AuthIcons";

const METAMASK_ICON_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png";
const COINBASE_ICON_SRC =
  "https://seeklogo.com/images/C/coinbase-coin-logo-C86F46D7B8-seeklogo.com.png";
const WALLETCONNECT_ICON_SRC =
  "https://api.nuget.org/v3-flatcontainer/walletconnect.auth/2.3.8/icon";

export function DesktopOnboardingModal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DesktopCardModal
      dialogContentClassName="min-w-[55vw] bg-[#080808]/[0.8]"
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
          <SocialOnboardButton IconComponent={GoogleIcon} onClick={login} />
          <SocialOnboardButton IconComponent={XIcon} onClick={login} />
          <SocialOnboardButton IconComponent={AppleIcon} onClick={login} />
          <SocialOnboardButton
            label={"Farcaster"}
            IconComponent={Phone}
            onClick={login}
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
        <CustomConnectButton
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
  onClick,
  label,
}: {
  IconComponent: React.ReactNode;
  onClick: () => void;
  label?: string;
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
      <IconComponent className="" />
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
    <WalletButton.Custom wallet={label}>
      {({ ready, connect }) => {
        return (
          <button
            type="button"
            disabled={!ready}
            onClick={connect}
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
              {label === "coinbase" ? "Coinbase Smart Wallet" : label}
            </div>
          </button>
        );
      }}
    </WalletButton.Custom>
  );
}

export const CustomConnectButton = ({
  label,
  iconSrc,
}: {
  label: string;
  iconSrc: string;
}) => {
  const { openConnectModal } = useConnectModal();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            onClick={openConnectModal}
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    type="button"
                    disabled={!ready}
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
                      All Wallets
                    </div>
                  </button>
                );
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
