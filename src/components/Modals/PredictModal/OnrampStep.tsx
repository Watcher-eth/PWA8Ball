// @ts-nocheck

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard.tsx";
import { useUserStore } from "@/lib/stores/UserStore";
import { shortenAddress } from "@/utils/address/shortenAddress";

const stepVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function OnrampStep(props: {
  setStep: (step: number) => void;
  method: number;
}) {
  return (
    <div>
      {props?.method === 2 && <BuyWithUniswap setStep={props?.setStep} />}
      {props?.method === 3 && <BuyWithFiat setStep={props?.setStep} />}
      {props?.method === 4 && <ReceiveGHO setStep={props?.setStep} />}
    </div>
  );
}

function BuyWithUniswap(props: { setStep: (step: number) => void }) {
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
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex-grow"
        >
          <Button
            onClick={() => props.setStep(1)}
            className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] w-full text-[1.15rem] font-bold h-[2.8rem] rounded-full "
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => props.setStep(2 + 1)}
          className="flex-grow"
        >
          <Button className="active:bg-[#181818] w-full ml-3 hover:bg-[#232323] bg-[#212121] text-[1.15rem] text-white font-bold  h-[2.8rem] rounded-full ">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ReceiveGHO(props: { setStep: (step: number) => void }) {
  const { user } = useUserStore();
  return (
    <motion.div
      key="step5"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        display: "flex",
        alignSelf: "center",
        flexDirection: "column",
        marginLeft: 0,
        padding: 8,
        paddingBottom: 12,
        paddingTop: 12,
      }}
    >
      <div className="text-white text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        Receive USDC
      </div>
      <div className="text-[lightgray] flex   text-base/[1rem]  items-center px-1 text-[0.899rem] mb-4 mt-1 font-bold mx-6">
        Send yourself USDC on Base. Please make sure that you are using the
        correct chain before sending any funds.
      </div>
      <div className="h-[0.05rem] w-full my-3 bg-[#212121] mx-6 rounded-full" />
      <div className="flex flex-col w-full ">
        <div className="text-[lightgray] flex items-center space-x-[0.3rem] mt-3  text-[1rem] font-bold  mx-[1.65rem]">
          Your Address
        </div>
        <div className="text-white flex items-center space-x-[0.35rem] w-full  text-[1.25rem] font-bold  mx-[1.65rem]">
          <div>{shortenAddress(user?.walletaddress, false)} </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              copyToClipboard(user?.walletaddress);
            }}
          >
            <Copy className="mt-[0.1rem]" size={18} strokeWidth={3} />
          </motion.div>
        </div>
      </div>

      <div className="flex mt-3 w-full items-center justify-between">
        <div className="text-[lightgray] text-[1rem]  m-[-0.2rem] font-bold mx-[1.65rem]">
          Network
        </div>
        <div className="text-white flex items-center space-x-[0.3rem]  text-[1.15rem] font-bold  mx-[1.65rem]">
          <Avatar className="h-[1.3rem] w-[1.3rem] mt-[0.1rem]  ">
            <AvatarImage
              style={{ objectFit: "cover" }}
              src="https://www.tbstat.com/cdn-cgi/image/format=webp,q=75/wp/uploads/2023/02/coinbase-base1.png"
            />
          </Avatar>
          <div>Base</div>
        </div>
      </div>
      <div className="flex mb-7 mt-2  w-full items-center justify-between">
        <div className="text-[lightgray] text-[1rem] m-[-0.2rem] font-bold mx-[1.65rem]">
          Rec Minimum
        </div>
        <div className="text-[lightgray] flex items-center space-x-[0.3rem]  text-[1.15rem] font-bold  mx-[1.65rem]">
          <div>$15.00</div>
        </div>
      </div>
      <div className="flex items-center self-center  mt-2 w-full ml-[3rem] my-4 space-x-3 ">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex-grow"
        >
          <Button
            onClick={() => props.setStep(1)}
            className="active:bg-[#D9D9D9] w-full mr-1 hover:bg-[#D9D9D9] bg-[#D9D9D9] text-[#1D1D1D] text-[1.15rem] font-bold h-[2.8rem] rounded-full "
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex-grow"
          onClick={() => {
            copyToClipboard(user?.walletaddress);
          }}
        >
          <Button className="active:bg-[#1D1D1D] ml-1 w-full space-x-1 flex items-center text-[#D9D9D9] hover:bg-[#1D1D1D] bg-[#1D1D1D] text-[1.15rem] text-white font-bold  h-[2.9rem] rounded-full ">
            <Copy size={17} className="mt-[0.05rem]" strokeWidth={3} />
            <div>Copy</div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

const BuyWithFiat = (props: { setStep: (step: number) => void }) => {
  return (
    <motion.div
      key="step5"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-white text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        Buy USDC
      </div>
      <div
        style={{ lineHeight: "1.3rem" }}
        className="text-[lightgray] flex text-base/[1rem] items-center px-1 text-[0.9rem] mb-4 mt-1 font-bold mx-6"
      >
        Buy USDC using your credit card or Apple or Google Pay. All Payments are
        facilitated by 3rd Parties.
      </div>
      <div className="h-[0.05rem] w-full my-6 bg-[#323232] mx-6 mb-4 rounded-full" />
      <div className="text-[lightgray] w-full flex mt-8 justify-between text-base/[1rem] items-center px-1 text-[1.rem] mb-3 mt-1 font-bold mx-6">
        <div className="flex items-center">
          <div>Conversion 1.00</div>
          <Avatar className="h-[1.18rem] w-[1.18rem] ml-1">
            <AvatarImage src="https://cdn3d.iconscout.com/3d/premium/thumb/usd-coin-usdc-cryptocurrency-5108586-4263923.png?f=webp" />
          </Avatar>
        </div>
        <div className="text-[#909090]">≈$1.00</div>
      </div>
      <div className="text-[lightgray] flex w-full justify-between text-base/[1rem] items-center px-1 text-[1rem] mb-8 font-bold mx-6 mt-2">
        <div>Recommended Minimum</div>
        <div className="text-[#909090]">15$</div>
      </div>
      <Button
        style={{
          backgroundColor: "#7f7fd5",
          backgroundImage:
            "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)",
        }}
        className="flex items-center  text-[1.15rem] mx-6 font-bold h-[2.8rem] text-white rounded-md my-3 w-full"
        onClick={() =>
          window.open(
            "https://buy-sandbox.moonpay.com/?apiKey=pk_test_123",
            "_blank"
          )
        }
      >
        <Avatar className="h-5 w-5 mr-2">
          <AvatarImage src="https://files.readme.io/0505f6c-small-decent-icon-white.png" />
        </Avatar>
        <div> Buy through Decent</div>
      </Button>
      <Button
        style={{
          backgroundColor: "#232526",
          backgroundImage: "linear-gradient(to right, #232526, #414345)",
        }}
        className="active:bg-[#121212] mb-9  flex items-center hover:bg-[#151515] bg-[#181818] text-[1.15rem] mx-6 font-bold text-white h-[2.9rem] rounded-md mt-3 w-full"
        onClick={() =>
          window.open(
            "https://buy-sandbox.moonpay.com/?apiKey=pk_test_123",
            "_blank"
          )
        }
      >
        <Avatar className="size-8">
          <AvatarImage src="https://files.readme.io/e6aad6c-small-moonpay_symbol_wht.png" />
        </Avatar>
        <div> Buy through MoonPay</div>
      </Button>
      <div className="flex items-center w-full mt-2 mx-6 my-2 justify-between">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex-grow mr-2"
        >
          <Button
            onClick={() => props.setStep(1)}
            className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[#212121] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-full"
          >
            Back
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex-grow ml-2"
          onClick={() => props.setStep(3)}
        >
          <Button className="active:bg-[#181818] hover:bg-[#232323] bg-[#212121] text-[1.15rem] text-white font-bold h-[2.8rem] rounded-full w-full">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
