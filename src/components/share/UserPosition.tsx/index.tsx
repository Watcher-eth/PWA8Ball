import React from "react";
import { ArrowDown, X, Share as ShareIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/stores/UserStore";
import { useGetPositionById } from "@/graphql/queries/positions/useGetPositionById";

export function Receipt(props: {
  question: string;
  title: string;
  multiplier: number;
  points: number;
  image: string;
  option: number;
  options: string[]; // Updated this to string[] to ensure correct type
  id: number;
  isDesktop?: boolean;
  changeStep?: (step: number) => void;
  onClose?: () => void;
}) {
  const { user } = useUserStore();
  const { position, loading, error } = useGetPositionById(
    "10-0x870b7F3f229D08918d33F8b09766eaB412aBEebf-1"
  );
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

  const svgFilter = (rotate: number) => `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="40px" style="transform: rotate(${rotate}deg);">
      <defs>
        <filter id="roughEdgeFilter">
          <feTurbulence baseFrequency="0.05" numOctaves="3" result="turbulence"/>
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="6" />
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#121212" filter="url(#roughEdgeFilter)" />
    </svg>
  `;

  const roughEdgeTop = {
    backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
      svgFilter(0)
    )}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "100% 40px",
    content: '""',
    position: "absolute" as "absolute",
    top: -8,
    left: 0,
    right: 0,
    height: "40px",
    zIndex: 0,
  };

  const roughEdgeBottom = {
    backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
      svgFilter(180)
    )}')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "100% 40px",
    content: '""',
    position: "absolute" as "absolute",
    bottom: -25,
    left: 0,
    right: 0,
    height: "40px",
    zIndex: 0,
  };

  return (
    <div
      className={`relative flex self-center shadow-lg  pb-0 flex-col items-center
       bg-[#121212]
       ${
         props.isDesktop
           ? "p-5 w-[27%] m-3 xl:w-[25%]"
           : "p-6 -ml-0 m-6  w-full"
       }

      `}
    >
      <div className={`absolute w-full`} style={roughEdgeTop}></div>
      <div className={`absolute w-full`} style={roughEdgeBottom}></div>
      <div
        className={`flex flex-col z-[3] w-full ${
          props.isDesktop ? "bg-transparent" : "bg-[#131313]"
        } `}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-[37px]"></div>
          <div className="flex flex-row items-center p-[5px] rounded-[15px] bg-[#181818]">
            <div className="p-[5px] rounded-[10px] bg-green-500">
              <ArrowDown color={"white"} strokeWidth={3.5} size={18} />
            </div>
            <span className="text-[17px] text-white mx-[6px] font-semibold">
              {props.options[props.option]}
            </span>
          </div>
          <motion.div
            onClick={() =>
              props.isDesktop ? props.changeStep?.(4) : props.onClose?.()
            }
            className="py-[14.5px] px-[8.5px] rounded-[2px] cursor-pointer"
          >
            <X color={"#585858"} strokeWidth={5} height={18} />
          </motion.div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="text-[3em] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#dcedc1] via-white to-[#a8e6cf] my-[10px]">
            ${props.points}
          </div>
        </div>
        <div className="border border-dashed border-[#212121] mb-[15px]"></div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Market</span>
          <div className="flex flex-row items-center">
            <span className="text-[20px] text-white mr-[9px]">
              {props.title}
            </span>
            <img
              className="h-[38px] object-cover w-[38px] rounded-[10px] overflow-hidden"
              src={props.image}
              alt="Market"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Predicted on</span>
          <div className="flex flex-row items-center">
            <span className="text-[19px] text-[#D3D3D3] mr-[4px]">2024</span>
            <span className="text-[19px] text-white mr-[7px]">Thursday</span>
            <div className="flex flex-col p-[7px] py-[1px] w-[41px] h-[42px] rounded-[10px] bg-[#181818] items-center justify-center">
              <span className="text-[8px] text-[#FF0050] mb-[-10px]">Sept</span>
              <span className="text-[25px] text-white">21</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Predictoor</span>
          <div className="flex flex-row items-center">
            <span className="text-[20px] mr-[8px] text-white">
              {user?.name}
            </span>
            <img
              className="h-[38px] w-[38px] rounded-[10px] overflow-hidden"
              src={user?.pfp ? user?.pfp : ""}
              alt="Pen"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between my-[15px] w-[99%]">
          <span className="text-[17.5px] text-[#D3D3D3]">Potential Payout</span>
          <span className="text-[20px] text-white ">
            ${(props.points * 3).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex flex-row z-[3] w-full items-center gap-[5px] px-1 mb-2 my-[5px]">
        <div
          onClick={shareLink}
          className={`mt-[12px] flex flex-row p-[8px] rounded-[24px] overflow-hidden bg-[#D9D9D9] w-full items-center justify-center cursor-pointer`}
        >
          <div className="flex flex-row items-center justify-center">
            <ShareIcon color="black" strokeWidth={3} height={23} />
            <span className="text-[20px] text-[#1D1D1D] font-extrabold ml-[3px]">
              Share
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
