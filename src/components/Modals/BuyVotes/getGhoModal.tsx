import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, CreditCard, Repeat } from "lucide-react";


function GetGhoModal(props: { setStep: (step: number) => void }) {
  // Get gho onchain (decent / uniswap)
  // Get gho with fiat (mount Pelering)
  // Before continue check that enough balance
  const stepVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  return (
    <motion.div
      key="step2"
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-gray-900 text-[1.5rem] font-bold mt-3 mx-[1.65rem]">
        It's GHO time
      </div>
      <div
        className="text-gray-400 text-base/5
 text-[1.08rem] m-[-0.2rem] font-bold mx-[1.65rem]"
      >
        Not enough funds. Please fund your wallet with GHO to buy votes.
      </div>
      <div className="h-[0.05rem] w-[80vw] my-6 mb-4 bg-gray-300 mx-6 rounded-full" />
      <motion.div
        onClick={() => props.setStep(5)}
        whileTap={{ scale: 0.96 }}
        className="flex mt-5 mb-2 bg-gray-100 mx-6 rounded-xl"
      >
        <div className="rounded-full mt-3  p-2 max-h-[2.65rem]  bg-orange-400 ml-3 my-2">
          <CreditCard size={25} strokeWidth={3} className="stroke-black  " />
        </div>
        <div className=" flex flex-col space-y-[-0.25rem] font-bold mb-3 mt-2 mr-1 ml-3">
          <div className="text-gray-900 text-[1.1rem] font-bold ">Buy</div>
          <div className="text-gray-600  text-base/4 text-[0.91rem]">
            Buy GHO using your credit card or Apple/Google Pay
          </div>
        </div>
      </motion.div>

      <motion.div
        whileTap={{ scale: 0.96 }}
        onClick={() => props.setStep(4)}
        className="flex mt-2 mb-2 bg-gray-100 mx-6 rounded-xl"
      >
        <div className="rounded-full mt-3 p-2 max-h-[2.55rem]  bg-pink-400 ml-3 my-2">
          <Repeat size={23} strokeWidth={3} className="stroke-black  " />
        </div>
        <div className=" flex flex-col space-y-[-0.25rem] font-bold mb-3 mt-2 mr-1 ml-3">
          <div className="text-gray-900 text-[1.1rem] font-bold ">Swap</div>
          <div className="text-gray-600  text-base/4 text-[0.91rem]">
            Swap ETH, Stablecoins or Matic for GHO using Uniswap
          </div>

        </div>
      </motion.div>

      <motion.div
        whileTap={{ scale: 0.96 }}
        onClick={() => props.setStep(6)}
        className="flex mt-2 mb-6 bg-gray-100 mx-6 rounded-xl"
      >
        <div className="rounded-full p-2 mt-3  max-h-[2.55rem]  bg-green-400 ml-3 my-2">
          <ArrowDown size={23} strokeWidth={3} className="stroke-black  " />
        </div>
        <div className=" flex flex-col space-y-[-0.25rem] font-bold mb-3 mt-2 mr-1 ml-3">
          <div className="text-gray-900 text-[1.1rem] font-bold ">Receive</div>
          <div className="text-gray-600  text-base/4 text-[0.91rem]">
            Receive GHO from one of your wallets to your Blitz address
          </div>
        </div>
      </motion.div>

      <div className="flex items-center mt-2 w-[80vw]  m-4 mx-6 justify-between mx-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => props.setStep(2 - 1)}
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
          <Button className="active:bg-black hover:bg-black bg-black text-[1.15rem] text-white font-bold  h-[2.8rem] rounded-full w-[38vw]">
            Continue
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default GetGhoModal;
