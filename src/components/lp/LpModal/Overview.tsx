import React from "react"
import { motion } from "framer-motion"
import { X, WalletCards, ArrowDown } from "lucide-react"
import { DialogClose } from "@/components/ui/dialog"

interface RemoveLPOverviewProps {
  setStep: (num: number) => void
  onClose: () => void
  changeStep: (step: number) => void
  image: string
  title: string
  amount: string
  multiplier: string
  totalPot: number
  isDesktop?: boolean
}

export const Overview: React.FC<RemoveLPOverviewProps> = (props) => {
  return (
    <div
      className={`flex flex-col items-center ${
        props?.isDesktop
          ? "bg-[#080808] p-3 mt-2 rounded-[10px]"
          : "bg-[#101010] p-5 mt-[5px] -mb-2 rounded-t-[30px]"
      } w-full`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <img
          className="h-[35px] w-[35px] rounded-[18px] object-cover mr-1.5"
          src={props?.image}
          alt="Profile"
        />
        <span className="ml-2 font-semibold text-[20px] text-white">
          Withdraw your Boost
        </span>

        <DialogClose asChild>
          <motion.button
            onClick={props.onClose}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 px-1.5 rounded-full bg-[#1C1C1C] border-none"
          >
            <X color={"#585858"} strokeWidth={5} height={18} />
          </motion.button>
        </DialogClose>
      </div>
      <div className="flex flex-col items-center justify-center w-full -space-y-2 p-5 py-7 rounded-[20px] bg-[#181818] mt-5 mb-5">
        <span className="font-bold text-[52px] text-white">
          ${(props?.totalPot * 1.09).toFixed(2)}
        </span>
        <span className="font-medium text-[15px] text-[lightgray]">
          Your Boost
        </span>
      </div>
      {[
        {
          label: "Fees earned",
          value: `$${(props?.totalPot * 0.09).toFixed(2)}`,
        },
        { label: "Base Cred", value: `${props?.totalPot} $Cred` },
        {
          label: "Bonus Rewards",
          value: `${(props?.totalPot * 2).toFixed(0)} $Cred`,
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between w-full my-2"
        >
          <span className="font-normal text-[17.5px] text-[lightgray]">
            {item.label}
          </span>
          <span className="font-medium text-[19px] text-white">
            {item.value}
          </span>
        </div>
      ))}
      <div className="flex flex-row items-center gap-1.5 mt-2 mb-1 w-full">
        <DialogClose asChild>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex flex-row items-center justify-center w-1/2 px-6 h-12 bg-[#1D1D1D] rounded-full mt-3"
          >
            <span className="ml-1.5 text-[20px] font-extrabold text-[#D9D9D9]">
              Cancel
            </span>
          </motion.button>
        </DialogClose>
        <motion.button
          onClick={() => props.setStep(2)}
          whileTap={{ scale: 0.95 }}
          className="flex flex-row items-center justify-center w-1/2 px-6 h-12 bg-[#D9D9D9] rounded-full mt-3 ml-4"
        >
          <ArrowDown color="black" strokeWidth={3} height={23} />
          <span className="ml-0.5 text-[20px] font-[600] text-[#1D1D1D]">
            Withdraw
          </span>
        </motion.button>
      </div>
    </div>
  )
}
