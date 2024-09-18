import React, { useState } from "react"
import { CheckIcon, Copy, X } from "lucide-react" // Make sure to use a suitable package for icons
import { copyToClipboard } from "@/utils/copyToClipboard"

export const ProfileCard = ({ user, userBalance, onClose }) => {
  const [toastVisible, setToastVisible] = useState(false)

  return (
    <div className="flex  items-center bg-[#090909] shadow-md border-[0.1rem] border-[#121212] p-5  rounded-lg">
      <div className="flex  justify-between w-full h-[19.5vh]">
        <div className="flex flex-col justify-between">
          <img
            src={user.pfp}
            alt={`${user.name}'s profile`}
            className="h-12 w-12 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-white text-3xl font-[600]">
              ${(Number(userBalance) / 1000000).toFixed(2)}
            </span>
            <span className="text-[lightgray] font-[400]">
              Referrals earned
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <button
            onClick={() =>
              copyToClipboard(
                `https://pwa-8-ball.vercel.app/?ref=${user?.walletAddress}`
              )
            }
            className="flex hover:scale-101 active:scale-99 items-center text-white"
          >
            <span className="mr-2">Copy Address</span>
            <Copy className="h-4 w-4 text-[lightgray]" />
          </button>
          <button
            onClick={() => {
              /* Navigate to Add Funds */
            }}
            className="mt-2 bg-[#151515] hover:scale-101 active:scale-99 border-[0.1rem] border-[#191919] text-white rounded-full px-4 py-1.5"
          >
            Share your Link
          </button>
        </div>
      </div>
    </div>
  )
}
