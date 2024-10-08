import React, { useState } from "react"
import { CheckIcon, Copy, X } from "lucide-react" // Make sure to use a suitable package for icons
import { copyToClipboard } from "@/utils/copyToClipboard"

export const ProfileCard = ({ user, userBalance, onClose }) => {
  const [toastVisible, setToastVisible] = useState(false)

  return (
    <div className="flex  items-center bg-[#090909] shadow-md border-[0.1rem] border-[#121212] p-5 mt-6 mb-4 rounded-lg">
      <div className="flex  justify-between w-full ">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="text-[lightgray] text-sm font-[400]">
              Referrals earned
            </span>
            <span className="text-white text-3xl mt-1 font-semibold">
              ${(Number(userBalance) / 1000000).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex flex-col  items-end">
          <button
            onClick={() => {
              copyToClipboard(
                `https://pwa-8-ball.vercel.app/?ref=${user?.walletAddress}`
              )
            }}
            className="mt-2 bg-[#151515] hover:scale-101 active:scale-99 border-[0.1rem] border-[#191919] text-white rounded-full px-4 py-1.5"
          >
            Copy your Link
          </button>
        </div>
      </div>
    </div>
  )
}
