// @ts-nocheck

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowUpDown, Copy } from "lucide-react"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { useUserStore } from "@/lib/stores/UserStore"
import { shortenAddress } from "@/utils/address/shortenAddress"
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk"

const stepVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export function OnrampStep({
  setStep,
  method,
}: {
  setStep: (step: number) => void
  method: number
}) {
  return (
    <div className="max-w-[30vw]">
      {method === 2 && <BuyWithUniswap setStep={setStep} />}
      {method === 3 && <BuyWithFiat setStep={setStep} />}
      {method === 4 && <ReceiveGHO setStep={setStep} />}
    </div>
  )
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
        <StepButton onClick={() => setStep(1)} isDark={false} label="Back" />
        <StepButton onClick={() => setStep(3)} isDark={true} label="Continue" />
      </div>
    </motion.div>
  )
}

function ReceiveGHO({ setStep }: { setStep: (step: number) => void }) {
  const { user } = useUserStore()
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
              copyToClipboard(user?.walletAddress)
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
        <StepButton onClick={() => setStep(1)} isDark={false} label="Back" />
        <StepButton
          isDark={true}
          onClick={() => {
            copyToClipboard(user?.walletAddress)
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
  )
}

const BuyWithFiat = ({ setStep }: { setStep: (step: number) => void }) => {
  const { user } = useUserStore()
  new RampInstantSDK({
    hostAppName: "Glimpse",
    hostApiKey: "",
    hostLogoUrl:
      "https://media.decentralized-content.com/-/rs:fit:1920:1920/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvUW1kMWVWaHZZWHRBUnhCSFZNVkF3aDJUS1RFdHBuMld3RUtBemhUTXBBa1M1Zg",
    enabledFlows: ["ONRAMP"],
    defaultFlow: "ONRAMP",
    // fiatCurrency: "USD",
    // fiatValue: 10.0,
    userAddress: user?.walletAddress,
    // defaultAsset: "USDC",
    finalUrl: "https://pwa-8-ball.vercel.app/settings",
  }).show()

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
        className="text-[lightgray] flex items-center px-1 text-sm mb-4 mt-1 font-bold mx-6"
      >
        Buy USDC using your credit card or Apple or Google Pay. All Payments are
        facilitated by 3rd Parties.
      </div>
      <div className="h-[0.05rem] w-full my-6 bg-[#323232] mx-6 mb-4 rounded-full" />
      <div className="text-[lightgray] w-full flex justify-between text-base/[1rem] items-center px-1 text-[1.rem] mb-3 mt-1 font-bold mx-6">
        <div className="flex items-center">
          <div>Conversion 1.00</div>
          <Avatar className="h-[1.18rem] w-[1.18rem] ml-1">
            <AvatarImage src="https://cdn3d.iconscout.com/3d/premium/thumb/usd-coin-usdc-cryptocurrency-5108586-4263923.png?f=webp" />
          </Avatar>
        </div>
        <div className="text-[#909090]">≈$1.00</div>
      </div>
      <div className="text-[lightgray] flex w-full justify-between text-base/[1rem] items-center px-1 text-base mb-8 font-bold mx-6 mt-2">
        <div>Recommended Minimum</div>
        <div className="text-[#909090]">15$</div>
      </div>
      <Button
        style={{
          backgroundColor: "#7f7fd5",
          backgroundImage:
            "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)",
        }}
        className="flex items-center  text-lg mx-6 font-bold h-[2.8rem] text-white rounded-md my-3 w-full"
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
        className="active:bg-[#121212] mb-9  flex items-center hover:bg-[#151515] bg-[#181818] text-lg mx-6 font-bold text-white h-[2.9rem] rounded-md mt-3 w-full"
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
      <div className="flex items-center w-full mt-2 mx-6 my-2 justify-between space-x-4">
        <StepButton onClick={() => setStep(1)} isDark={false} label="Back" />
        <StepButton onClick={() => setStep(3)} isDark={true} label="Continue" />
      </div>
    </motion.div>
  )
}

function StepButton({ onClick, children, isDark, label, className = "" }) {
  let styleClassName
  if (isDark) {
    styleClassName =
      "active:bg-[#131313] hover:bg-[#181818] bg-[#151515] border border-[#191919] text-white"
  } else {
    styleClassName =
      "active:bg-[#aeaeb1] hover:bg-[#aeaeb1] bg-[#aeaeb1] border border-[#808080] text-[#212121]"
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
  )
}
