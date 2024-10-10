// @ts-nocheck

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown, Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useUserStore } from "@/lib/stores/UserStore";
import { shortenAddress } from "@/utils/address/shortenAddress";
import dynamic from "next/dynamic";
import { useState } from "react";

const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

const stepVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function OnrampStep({
  setStep,
  method,
}: {
  setStep: (step: number) => void;
  method: number;
}) {
  return (
    <div className="max-w-[30vw]">
      {method === 2 && <BuyWithUniswap setStep={setStep} />}
      {method === 3 && <BuyWithFiat setStep={setStep} />}
      {method === 4 && <ReceiveGHO setStep={setStep} />}
    </div>
  );
}

function BuyWithUniswap({ setStep }: { setStep: (step: number) => void }) {
  return (
    <motion.div
      key="step4"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-white text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        Swap for USDC
      </div>
      <div className="text-[lightgray] flex text-base/[1rem] items-center px-1 text-[0.899rem] mb-4 mt-1 font-bold mx-6">
        Use Uniswap to swap ETH, Matic or any other crypto currencies for USDC
        on Base.
        {""} We reccommend to get at least 15 USDC.
      </div>
      <div className="w-full h-[30vh] my-6 mx-6 rounded-xl ">
        <div className="Uniswap"></div>
      </div>
      <div className="flex items-center w-full mt-2 mx-6 my-2 justify-between">
        <StepButton onClick={() => setStep(0)} isDark={false} label="Back" />
        <StepButton onClick={() => setStep(3)} isDark={true} label="Continue" />
      </div>
    </motion.div>
  );
}

export function ReceiveGHO({ setStep }: { setStep: (step: number) => void }) {
  const { user } = useUserStore();
  return (
    <motion.div
      key="step5"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        flex flex-col self-center    p-2 py-4 pb-2.5
      `}
    >
      <ArrowUpDown color="white" strokeWidth={3.3} size={45} />
      <div className="text-white text-[1.7rem] font-bold mt-2 ">
        Receive USDC
      </div>
      <div className="text-[lightgray] flex leading-5 text-base/[1rem]  items-center text-[1rem] mb-4 mt-1 ">
        Send yourself USDC on Base. Please make sure that you are using the
        correct chain before sending any funds.
      </div>
      <div className="h-[0.05rem] w-full my-3 bg-[#212121] rounded-full" />
      <div className="flex flex-row items-center my-3 mt-5 justify-between w-full ">
        <div className="text-[lightgray] flex items-center space-x-[0.3rem]  text-base font-bold ">
          Your Address
        </div>
        <div className="text-white flex items-center space-x-[0.35rem]   text-[1.25rem] font-bold ">
          <div>{shortenAddress(user?.walletAddress, false)} </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              copyToClipboard(user?.walletAddress);
            }}
          >
            <Copy className="mt-[0.1rem]" size={18} strokeWidth={3} />
          </motion.div>
        </div>
      </div>

      <div className="flex my-3 w-full items-center justify-between">
        <div className="text-[lightgray] text-base  m-[-0.2rem] font-bold ">
          Network
        </div>
        <div className="text-white flex items-center space-x-[0.5rem]  text-lg font-bold  ">
          <div>Base</div>
          <Avatar className="h-[1.3rem] w-[1.3rem] mt-[0.1rem]  ">
            <AvatarImage
              style={{ objectFit: "cover" }}
              src="https://www.tbstat.com/cdn-cgi/image/format=webp,q=75/wp/uploads/2023/02/coinbase-base1.png"
            />
          </Avatar>
        </div>
      </div>
      <div className="flex mb-7 my-3  w-full items-center justify-between">
        <div className="text-[lightgray] text-base m-[-0.2rem] font-bold ">
          Recommended Minimum
        </div>
        <div className="text-[white] flex items-center space-x-[0.3rem]  text-lg font-bold  ">
          <div>15.00 USDC</div>
        </div>
      </div>
      <div className="flex items-center self-center  mt-2 w-full   my-0 space-x-4 ">
        <StepButton onClick={() => setStep(0)} isDark={false} label="Back" />
        <StepButton
          isDark={true}
          onClick={() => {
            copyToClipboard(user?.walletAddress);
          }}
        >
          <Copy size={17} className="mt-[0.05rem] mr-1.5" strokeWidth={3} />
          <div>Copy</div>
        </StepButton>
      </div>
      <div className="text-[gray] text-[0.85rem] text-center mt-[0.8rem] px-2 font-[400] ">
        Please make sure you are on Base Mainnet and sending to the correct
        address. Lost funds can not be recovered.
      </div>
    </motion.div>
  );
}

const BuyWithFiat = ({ setStep }: { setStep: (step: number) => void }) => {
  const { user } = useUserStore();
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      key="step5"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-2 py-3"
    >
      <div className="text-white text-[1.5rem] font-[600] mt-3 ">Buy USDC</div>
      <div
        style={{ lineHeight: "1.5rem" }}
        className="text-[lightgray] flex items-center  text-md mb-4 mt-1.5 font-[500] "
      >
        Buy USDC using your credit card or Apple or Google Pay. All Payments are
        facilitated by 3rd Parties.
      </div>
      <div className="h-[0.05rem] w-full my-6 bg-[#212121] rounded-full" />
      <div className="text-[lightgray] w-full flex justify-between text-base/[1rem] items-center px-1 text-[1.rem] mb-3 mt-4 font-[500] ">
        <div className="flex text-md items-center">
          <div>Conversion 1.00</div>
          <Avatar className="h-[1.4rem] text-md w-[1.4rem] ml-1">
            <AvatarImage src="https://cdn3d.iconscout.com/3d/premium/thumb/usd-coin-usdc-cryptocurrency-5108586-4263923.png?f=webp" />
          </Avatar>
        </div>
        <div className="text-[#909090] text-md">≈$1.00</div>
      </div>
      <div className="text-[lightgray] text-md flex w-full justify-between text-base/[1rem] items-center px-1 text-base mb-8 gap-2.5 my-2.5 font-[500] mt-4">
        <div>Recommended Minimum</div>
        <div className="text-[#909090] text-md">15$</div>
      </div>

      <div
        style={{}}
        className="active:bg-[#121212] mb-3  flex flex-col p-3.5 hover:bg-[#151515] bg-[#101010] border-[0.1rem] border-[#181818] text-lg font-[500] text-white  rounded-lg mt-3 w-full"
        onClick={() => setVisible(!visible)}
      >
        <div className="flex items-center">
          <Avatar className="size-7 p-0.5 bg-purple-700">
            <AvatarImage src="https://files.readme.io/e6aad6c-small-moonpay_symbol_wht.png" />
          </Avatar>
          <div className="ml-3 text-[1.35rem] font-[600]">Buy with MoonPay</div>
        </div>
        <div className="text-[1.05rem] text-[gray] my-1.5 font-[500]">
          Accepts Cards, Apple Pay, Banks & more
        </div>
        <div className="flex flex-row items-center justify-between mt-3 w-[98%]">
          <div className="flex flex-col">
            <p className="font-AeonikRegular text-[#EDEDED] text-md mb-1">
              Speed
            </p>
            <p className="font-AeonikBold text-white text-lg">3-5min</p>
          </div>

          <div className="flex flex-col">
            <p className="font-AeonikRegular text-[#EDEDED] text-md mb-1">
              Rec Minimum
            </p>
            <div className="flex flex-row items-center">
              <img
                className="h-2.5 w-2.5 rounded-full mr-1.5"
                src="https://imgs.search.brave.com/Re9d-y0SwzY2NrxBew43EoPiSjnstXw2Kv3RK0FRqjM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y29pbnBhcGVyLmNv/bS9jb2lucGFwZXIv/Zl93ZWJwLGNfbGlt/aXQsd18zODQwLHFf/YXV0bzpnb29kL3Vz/ZF9jb2luX3VzZGNf/bG9nb18zZTY4ZmFm/YTM4LnBuZw"
                alt="USDC Logo"
              />
              <p className="font-AeonikBold text-white text-lg">15 USDC</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-AeonikRegular text-[#EDEDED] text-sm mb-1">
              Options
            </p>
            <div className="flex flex-row mt-1 mb-0.5  -gap-2 items-center">
              <img
                className="h-[20px] w-[35px] object-cover rounded-[3px] mr-1.5 bg-white"
                src="https://wayne.bank/wp-content/uploads/2023/02/Apple-Pay-Card-Image.png"
                alt="Apple Pay"
              />
              <img
                className="h-[20px] w-[35px] object-cover rounded-[3px] bg-white border-[0.1rem] border-[lightgray]  mr-1.5 -ml-2 bg-lightblue"
                src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png"
                alt="Visa"
              />
              <img
                className="h-[20px] w-[35px] object-cover rounded-[3px] mr-1.5 -ml-2 bg-gray-400"
                src="https://www.mastercard.com/content/dam/public/mastercardcom/us/en/logos/mastercard-og-image.png"
                alt="Mastercard"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function StepButton({ onClick, children, isDark, label, className = "" }) {
  let styleClassName;
  if (isDark) {
    styleClassName =
      "active:bg-[#131313] hover:bg-[#181818] bg-[#131313] font-[600] border border-[#191919] text-white";
  } else {
    styleClassName =
      "active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] font-[600] border border-[#fefefe] text-[#212121]";
  }

  return (
    <div
      className={`
        w-full
        active:scale-98 hover:scale-101 transition-all
      `}
    >
      <Button
        onClick={onClick}
        className={`w-full flex items-center text-lg font-bold h-[2.8rem] rounded-full ${styleClassName} ${className}`}
      >
        {label ?? children}
      </Button>
    </div>
  );
}
