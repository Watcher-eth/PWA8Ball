// @ts-nocheck

import React, { useState } from "react";
import { ArrowDown, X, Share as ShareIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/stores/UserStore";
import { formatAmountWithCommas } from "@/utils/markets/formatAmountWithCommas";
import { User } from "@/__generated__/graphql";

export function CashoutConfirmScreen(props: {
  changeStep: () => void;
  onClose: () => void;
  title: string;
  multiplier: number;
  points: number;
  image: string;
  option: number;
  options: [];
  id: number;
  isDesktop?: boolean;
  user?: User;
}) {
  const { onClose } = props;
  const { userC } = useUserStore();
  const { user } = props;
  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${props.title} on Glimpse`,
          text: "This prediction on Glimpse is wild! Check it out",
          url: `https://pwa-8-ball.vercel.app/p/${props.id}`,
        });
        console.log("Data was shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      console.log("Web Share not supported on this browser");
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${
        props.isDesktop ? "bg-transparent" : "bg-[#101010]"
      } mt-0 ${props.isDesktop ? "p-1.5" : "p-5"}  ${
        props.isDesktop ? "rounded-[20px]" : "rounded-[30px]"
      }`}
    >
      <div
        className={`flex flex-col w-full ${
          props.isDesktop ? "bg-transparent" : "bg-[#101010]"
        } rounded-[20px]`}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-[37px]"></div>
          <div className="flex flex-row items-center p-[5px] rounded-[15px] bg-[#212121]">
            <div className="p-[5px] rounded-[10px] bg-gradient-to-r from-[#dcedc1]/50 to-[#a8e6cf]/70">
              <ArrowDown color={"white"} strokeWidth={3.5} size={18} />
            </div>
            <span className="text-[17px] text-white mx-[6px] font-semibold">
              {props.options?.name}
            </span>
          </div>
          <div className="px-6" />
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="text-[3em] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#dcedc1] via-[#a8e6cf] via-white via-[#dcedc1] via-white via-[#dcedc1] to-[#a8e6cf] my-[10px]">
            ${formatAmountWithCommas(props.points)}
          </div>
        </div>
        <div className="border border-dashed border-[#404040] mb-[15px]"></div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Market</span>
          <div className="flex flex-row items-center">
            <span className="text-[20px] font-medium text-white mr-[9px]">
              {props.title}
            </span>
            <img
              className="h-[38px] object-cover w-[38px] rounded-[8px] overflow-hidden"
              src={props?.image}
              alt="Market"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Predicted on</span>
          <div className="flex flex-row items-center">
            <span className="text-[19px] font-medium text-[#D3D3D3] mr-[4px]">
              2024
            </span>
            <span className="text-[19px] font-medium text-white mr-[7px]">
              Thursday
            </span>
            <div className="flex flex-col p-[7px] py-[1px] w-[41px] h-[42px] rounded-[8px] bg-[#181818] items-center justify-center">
              <span className="text-[8px] text-[#FF0050] mb-[-10px]">Sept</span>
              <span className="text-[25px] text-white">21</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Tx Receipt</span>
          <span className="text-[20px] font-medium text-white underline">
            0xrf724sda3...kja3
          </span>
        </div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Predictoor</span>
          <div className="flex flex-row items-center">
            <span className="text-[20px] font-medium mr-[10px] text-white">
              {user?.name}
            </span>
            <img
              className="h-[38px] w-[38px] rounded-full overflow-hidden"
              src={user?.pfp}
              alt="Pen"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full items-center gap-[5px] my-[5px]">
        <div
          onClick={shareLink}
          className={`mt-[12px] flex flex-row p-[8px] rounded-[24px] overflow-hidden bg-[#D9D9D9]  w-full
          items-center justify-center cursor-pointer`}
        >
          <div className="flex flex-row items-center justify-center">
            <ShareIcon color="#1D1D1D" strokeWidth={3.3} height={19} />
            <span className="text-[20px] text-[#1D1D1D] font-[Aeonik-Bold] ml-[3px]">
              Share
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
