import React, { useState } from "react"
import {
  CheckCheck,
  CheckCircle,
  DollarSign,
  Gift,
} from "lucide-react"

import { showToast } from "@/utils/Toasts/showToast"

export function RedeemModal(props: {
  image: string
  totalPot: number
  option: string
  onClose: () => void
}) {

  async function redeemPrediction() {
    // Simulate redeem logic here

    showToast({
      icon: <DollarSign color="#34C759" size={20} />,
      message: "Redeemed successfully!",
    })
  }

  return (
    <div className="flex flex-col items-center w-full bg-[#080808] rounded-2xl p-3  mx-auto">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row relative items-center">
          <img
            src={props.image}
            alt="Market"
            className="size-16 rounded-full object-cover"
          />
          <div
            style={{
              height: 30,
              width: 30,
              borderRadius: 16,
              backgroundColor: "#101010",
              borderWidth: 1,
              position: "absolute",
              left: 46,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="border-green-900/50"
          >
            <CheckCheck
              size={17}
              className="text-green-500"
              strokeWidth={3.5}
            />
          </div>
        </div>
      </div>
      <h2 className="text-[1.4rem] text-white font-semibold mt-3 self-start">
        You were correct!
      </h2>
      <p className="text-base font-medium text-[lightgray] mt-0 self-start">
        Congratulations, your prediction was correct. You can now redeem your
        winnings.
      </p>
      <div className="flex flex-col items-center justify-center p-5 border border-[#202020] bg-[#131313] rounded-2xl mt-6 mb-2 w-full">
        <h1 className="text-[3rem] text-white font-bold">
          ${(Number(props.totalPot) / 10 ** 6).toFixed(2)}
        </h1>
        <p className="text-sm text-[lightgray] flex gap-1 font-bold -mt-1.5">
          You predicted: <p className="text-white">{props.option?.name}</p>
        </p>
      </div>
      <div className="flex flex-row items-center justify-between p-[0.1rem] mt-3 mb-3 bg-gradient-to-r from-green-400/80 via-green-300/60 to-green-500/40  rounded-lg w-full">
        <div className="flex flex-row items-center justify-between w-full p-2 bg-[#151515] rounded-lg">
          <div className="ml-1 bg-[#181818] rounded-full">
            <CheckCircle
              strokeWidth={3.5}
              className="text-green-400"
              size={20}
            />
          </div>
          <p className="text-lg text-white font-bold">You were correct!</p>
          <div style={{ width: 20 }} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mt-3 w-full">
        <p className="text-lg text-[lightgray] font-semibold">Payout</p>
        <p className="text-xl text-white font-bold">
          ${((props.totalPot * 3) / 10 ** 6).toFixed(2)}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between mt-3 w-full">
        <p className="text-lg text-[lightgray] font-semibold">Cred earned</p>
        <p className="text-xl text-white font-bold">
          {((props.totalPot * 2) / 10 ** 6).toFixed(0)} $Cred
        </p>
      </div>
      <div
        onClick={redeemPrediction}
        className="flex flex-row hover:scale-[100.5%] active:scale-99 items-center justify-center mt-6 py-3 px-5 bg-white text-black text-lg font-bold rounded-full w-full hover:bg-white-100"
      >
        <Gift color="black" strokeWidth={3} height={23} />
        <span className="ml-2">Redeem</span>
      </div>
    </div>
  )
}
