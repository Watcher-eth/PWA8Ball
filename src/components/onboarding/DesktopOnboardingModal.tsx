// @ts-nocheck
import { Input } from "@/components/ui/Input";
import { Ban, Check, CheckCircle, Lock, Phone, Share } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { WalletButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { DesktopCardModal } from "../modals/DesktopCardModal";
import { AppleIcon, GoogleIcon, XIcon } from "./AuthIcons";
import DesktopCreateProfile from "./DesktopCreateProfile";
import { useUserStore } from "@/lib/stores/UserStore";
import { useCallback, useState } from "react";
import { useCheckIfInviteUsed } from "@/supabase/queries/Invites/useCheckIfInviteUsed";
import { debounce } from "lodash";
import { useUseInvite } from "@/supabase/queries/Invites/useUseInvite";
import { toast } from "sonner";
import { useAccount } from "wagmi";

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
  const { user } = useUserStore();
  const { account, isConnected, address } = useAccount();
  console.log(
    "user35",
    !!user,
    user?.name,
    user?.name?.startsWith("0x"),
    user?.pfp,
    address,
    isConnected
  );
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
  );
}

export function DesktopOnboarding() {
  const { ready, authenticated, login } = usePrivy();

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
      <div className="hidden sm:block sm:w-1/2">
        <img
          src="/images/Futura.JPG"
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
        p-3 bg-[#151515] border-2 border-[#181818]
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
              className="w-full rounded-md p-2 flex flex-row items-center border-2 border-[#181818] bg-[#151515] text-white"
            >
              <img src={iconSrc} className="w-5 h-5 mr-2" />
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
                      className="w-full rounded-md p-2 flex flex-row items-center border-2 border-[#181818] bg-[#151515] text-white"
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

export function InviteScreen() {
  const [invite, setInvite] = useState("");
  const [debouncedInvite, setDebouncedInvite] = useState("");
  const { data, isLoading, error } = useCheckIfInviteUsed(debouncedInvite);
  const { mutate: useInvite } = useUseInvite();
  const debouncedChange = useCallback(
    debounce((nextValue) => setDebouncedInvite(nextValue), 500),
    []
  );

  const handleInviteChange = (event) => {
    const nextValue = event.target.value;
    setInvite(nextValue);
    debouncedChange(nextValue);
  };

  async function verifyInvite() {
    if (data === true) {
      useInvite(debouncedInvite);

      toast(
        <div className="w-full rounded-full bg-[#101010] text-[1rem] px-3 text-white flex flex-row items-center p-2">
          <div className="p-0.5 py-1.5 rounded-full bg-[#212121] mr-2 flex justify-center items-center">
            <CheckCircle strokeWidth={3} className="text-white h-[0.95rem]" />
          </div>
          Successfully used invite!
        </div>,
        {
          unstyled: true,
          classNames: {
            title: "text-red-400 text-2xl",
            description: "text-red-400",
            actionButton: "bg-zinc-400",
            cancelButton: "bg-orange-400",
            closeButton: "bg-lime-400",
          },
        }
      );
      //TODO: Integrate ponder update user endpoint
    } else {
      toast(
        <div className="w-full rounded-full bg-[#101010] text-[1rem] px-3 pr-4 text-white flex flex-row items-center p-2">
          <div className="p-0.5 py-1.5 rounded-full bg-[#212121] mr-2 flex justify-center items-center">
            <Ban strokeWidth={3} className="text-[#FF0050] h-[0.95rem]" />
          </div>
          Invalid code!{" "}
        </div>,
        {
          unstyled: true,
          classNames: {
            title: "text-red-400 text-2xl",
            description: "text-red-400",
            actionButton: "bg-zinc-400",
            cancelButton: "bg-orange-400",
            closeButton: "bg-lime-400",
          },
        }
      );
    }
  }
  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg min-w-[55vw] md:min-w-[68vw] sm:min-w-[90vw] ">
      <div className="flex flex-col items-center justify-center w-1/2  p-10 pt-20 text-white">
        <div className="h-[6rem] w-[6rem] flex items-center justify-center my-5 rounded-full bg-[#191919]">
          <div className="text-[3.4rem] rotate-6">🔓</div>
        </div>
        <p className="text-center mb-6 font-[500] px-6 text-[lightgray]">
          Glimpse is currently in closed beta. You need an invite code to use
          the app.
        </p>
        <div className="flex flex-row w-full items-center relative">
          <Input
            type="email"
            height={20}
            placeholder="Your invite code"
            onChange={handleInviteChange}
            value={invite}
            className="mb-4 w-full   bg-[#151515] border-2 border-[#181818] placeholder-[lightgray] text-white"
          />
          {data === true ? (
            <Check
              color="#5ACE5A"
              strokeWidth={3.5}
              size={20}
              className="absolute top-2.5 right-3"
            />
          ) : (
            <Ban
              size={20}
              color="#FF0050"
              strokeWidth={3}
              className="absolute top-2.5 right-3"
            />
          )}{" "}
        </div>
        {invite !== "" && (
          <div
            onClick={verifyInvite}
            className="py-2 animate-fade-in mb-4 hover:scale-101 active:scale-98  w-full font-[500] space-x-2 text-white flex justify-center items-center  bg-[#151515] border-2 border-[#181818] rounded-md"
          >
            <Lock color="white" strokeWidth={2.8} size={16} />{" "}
            <div>Verify invite</div>
          </div>
        )}
        <div className="flex items-center mb-4 mt-0 justify-between w-full">
          <div className="h-[0.1rem] w-full bg-[#212121]" />
          <p className="text-center mx-4 font-[500] text-[lightgray]">OR</p>
          <div className="h-[0.1rem] w-full bg-[#212121]" />
        </div>
        <div className="py-2 hover:scale-101 active:scale-98 mb-20 w-full font-[500] space-x-2 text-white flex justify-center items-center  bg-[#151515] border-2 border-[#181818] rounded-md">
          <Share color="white" strokeWidth={2.8} size={16} />{" "}
          <div>Share to enter the waitlist</div>
        </div>
        <div className="flex justify-between w-full mt-4 text-sm text-[lightgray]">
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/tos" className="hover:underline">
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
          src="https://pbs.twimg.com/media/GUL-CprbkAAcHOE?format=jpg&name=4096x4096"
          alt="Onboarding illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
