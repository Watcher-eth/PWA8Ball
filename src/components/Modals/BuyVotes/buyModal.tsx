// @ts-nocheck

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "@thirdweb-dev/react";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useUserStore } from "@/lib/stores/UserStore";
const stepVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};
const NATIVE = "NATIVE"; // Special address for native token

function BuyModal(props: { setStep: (step: number) => void; method: number }) {
  // Innitate contract
  // Check price and submission
  // Check if still active
  // Check if neccesary balance
  //Cancle to go back

  // Stablecoin as the default output token

  return (
    <div>
      {props?.method === 1 && <BuyWithUniswap setStep={props?.setStep} />}
      {props?.method === 2 && <BuyWithFiat setStep={props?.setStep} />}
      {props?.method === 3 && <ReceiveGHO setStep={props?.setStep} />}
    </div>
  );
}

function BuyWithUniswap(props: { setStep: (step: number) => void }) {
  const jsonRpcUrlMap = {
    1: [
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
    ],
  };
  return (
    <motion.div
      key="step4"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-white text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        Swap for GHO
      </div>
      <div className="text-[lightgray] flex   text-base/[1rem]  items-center px-1 text-[0.899rem] mb-4 mt-1 font-bold mx-6">
        Use Uniswap to swap ETH, Matic or any other crypto currencies for GHO.
        {""} We reccommend to get at least 15 GHO.
      </div>
      <div className=" w-[80vw] my-6 mx-6 rounded-xl ">
        <div className="Uniswap"></div>
      </div>
      <div className="flex items-center mt-2 w-[80vw]  m-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(2)}
            className="active:bg-gray-300 hover:bg-gray-300 bg-gray-200 text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => props.setStep(2 + 1)}
        >
          <Button className="active:bg-black hover:bg-black bg-black text-[1.15rem] text-white font-bold  h-[2.8rem] rounded-full w-[38vw]">
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
        padding: 12,
        paddingBottom: 15,
        paddingTop: 15,
      }}
    >
      <div className="text-white text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        Receive GHO
      </div>
      <div className="text-[lightgray] flex   text-base/[1rem]  items-center px-1 text-[0.899rem] mb-4 mt-1 font-bold mx-6">
        Send yourself GHO on Polygon Mainnet. Please make sure that you are
        using the correct chain before sending any funds.
      </div>
      <div className="h-[0.05rem] w-[80vw] my-3 bg-gray-300 mx-6 rounded-full" />
      <div className="flex flex-col ">
        <div className="text-[lightgray] flex items-center space-x-[0.3rem]  text-[1rem] font-bold  mx-[1.65rem]">
          Your Address
        </div>
        <div className="text-white flex items-center space-x-[0.35rem]  text-[1.25rem] font-bold  mx-[1.65rem]">
          <div>{shortenAddress(user?.walletaddress, false)} </div>
          <motion.div
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              copyToClipboard(user?.walletaddress);
            }}
          >
            <Copy className="mt-[0.1rem]" size={18} strokeWidth={3} />
          </motion.div>
        </div>
      </div>

      <div className="flex mt-2 w-[91vw] items-center justify-between">
        <div className="text-[lightgray] text-[1rem] m-[-0.2rem] font-bold mx-[1.65rem]">
          Network
        </div>
        <div className="text-white flex items-center space-x-[0.3rem]  text-[1.15rem] font-bold  mx-[1.65rem]">
          <Avatar className="h-[1.3rem] w-[1.3rem] mt-[0.1rem]  ">
            <AvatarImage
              style={{ objectFit: "cover" }}
              src="https://www.tbstat.com/cdn-cgi/image/format=webp,q=75/wp/uploads/2023/02/coinbase-base1.png"
            />
          </Avatar>
          <div>Base </div>
        </div>
      </div>
      <div className="flex mb-4 w-[91vw] items-center justify-between">
        <div className="text-[lightgray] text-[1rem] m-[-0.2rem] font-bold mx-[1.65rem]">
          Rec Minimum
        </div>
        <div className="text-[lightgray] flex items-center space-x-[0.3rem]  text-[1.15rem] font-bold  mx-[1.65rem]">
          <div>$15.00</div>
        </div>
      </div>
      <div className="flex flex-col items-end"></div>
      <div className="flex items-center self-center mt-2 w-[80vw] mr-3  my-4 space-x-5 ">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(2)}
            className="active:bg-[#D9D9D9] hover:bg-[#D9D9D9] bg-[#D9D9D9] text-[#1D1D1D] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[40vw]"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            copyToClipboard(user?.walletaddress);
          }}
        >
          <Button className="active:bg-[#1D1D1D] space-x-1 flex items-center text-[#D9D9D9] hover:bg-[#1D1D1D] bg-[#1D1D1D] text-[1.15rem] text-white font-bold  h-[2.9rem] rounded-full w-[40vw]">
            <Copy size={17} className="mt-[0.05rem]" strokeWidth={3} />
            <div>Copy</div>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function BuyWithFiat(props: { setStep: (step: number) => void }) {
  const BASE_ID = 137;

  return (
    <motion.div
      key="step5"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-gray-900 text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        Buy GHO
      </div>
      <div className="text-gray-400 flex   text-base/[1rem]  items-center px-1 text-[0.899rem] mb-4 mt-1 font-bold mx-6">
        Buy GHO using your credit card or Apple or Google Pay. All Payments are
        facilitated by 3rd Parties.
      </div>
      <div className="h-[0.05rem] w-[80vw] my-6 bg-gray-300 mx-6 mb-4 rounded-full" />
      <div className="text-gray-400 flex  justify-between  text-base/[1rem]  items-center px-1 text-[1.rem] mb-3 mt-1 font-bold mx-6">
        <div className="flex items-center">
          <div>Conversion 1x</div>
          <Avatar className="h-[1.16rem] w-[1.16rem] ml-1 ">
            <AvatarImage src="data:image/png;base64,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" />
          </Avatar>
        </div>
        <div className="text-gray-700">≈1$</div>
      </div>
      <div className="text-gray-400 flex  justify-between  text-base/[1rem]  items-center px-1 text-[1rem] mb-5  font-bold mx-6">
        <div>Reccomended Minimum</div> <div className="text-gray-700">15$</div>
      </div>
      <Button
        className="active:bg-[#0000FF] flex items-center hover:bg-[#0000FF] bg-[#0CAFFF] text-[1.15rem] mx-6 font-bold h-[2.8rem]  text-white rounded-xl my-3 w-[80vw]"
        onClick="window.open('https://buy-sandbox.moonpay.com/?apiKey=pk_test_123', '_blank')"
      >
        <Avatar className="h-5 w-5 mr-2">
          <AvatarImage src="https://files.readme.io/0505f6c-small-decent-icon-white.png" />
        </Avatar>
        <div> Buy with Decent</div>
      </Button>
      <Button
        className="active:bg-[#565467] mb-5 flex items-center hover:bg-[#565467] bg-[#002244] text-[1.15rem] mx-6 font-bold text-white h-[2.9rem] rounded-xl mt-2 w-[80vw]"
        onClick="window.open('https://buy-sandbox.moonpay.com/?apiKey=pk_test_123', '_blank')"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://files.readme.io/e6aad6c-small-moonpay_symbol_wht.png" />
        </Avatar>
        <div> Buy with MoonPay</div>
      </Button>

      <div className="flex items-center mt-2 w-[80vw]  m-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(2)}
            className="active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] text-[1.15rem] font-bold h-[2.8rem] rounded-full w-[38vw]"
          >
            Back
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => props.setStep(2 + 1)}
        >
          <Button className="active:bg-gray-200 hover:bg-gray-200 bg-gray-200 text-[1.15rem] text-gray-700 border-2 border-stone-300 border-dashed font-bold  h-[2.8rem] rounded-full w-[38vw]">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
export default BuyModal;
