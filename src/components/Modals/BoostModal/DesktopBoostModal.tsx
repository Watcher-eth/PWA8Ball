import { Input } from "@/components/ui/Input";
import React from "react";
import { ConfirmButton } from "./ConfirmButton";
import { DesktopCardModal } from "../DesktopCardModal";

export function DesktopBoostContent(props: {
  image: string;
  id: string;
  onComplete: () => void;
}) {
  console.log("image", props.image);
  return (
    <div className="flex flex-col p-2 ">
      <img className="h-14 w-14 object-cover rounded-full" src={props?.image} />
      <div className="text-white text-[1.5rem] font-semibold mt-4 ">
        Boost and earn rewards
      </div>
      <div className="text-[lightgray] text-[0.95rem] font-[500] mb-3  ">
        Boost this market to earn extra cred and trading fees. The more popular
        a prediction gets the more fees you receive.
      </div>
      <div className="h-[0.1rem] w-full bg-[#212121] mt-2 mb-8" />
      <div className="flex flex-row items-center justify-between my-3">
        <div className="text-[#909090] font-[500] text-[1rem]">
          Minimum Boost
        </div>
        <div className="text-white font-[500] text-[1rem]">$10.00</div>
      </div>
      <div className="flex flex-row items-center justify-between my-3">
        <div className="text-[#909090] text-[1rem]">Fee Rewards Rate</div>
        <div className="text-white font-[500] text-[1rem]">0.05%</div>
      </div>
      <div className="flex flex-row items-center justify-between my-3">
        <div className="text-[#909090] font-[500] text-[1rem]">Cred Bonus</div>
        <div className="text-white font-[500] text-[1rem]">150 Cred</div>
      </div>
      <Input
        className="border-0 my-8 mb-5 rounded-md p-6 bg-[#171717] px-3 text-[1rem]"
        placeholder="Amount"
      />
      <ConfirmButton id={props?.id} onComplete={props?.onComplete} />
    </div>
  );
}

export function DesktopBoostModal({
  children,
  image,
  id,
}: {
  children: React.ReactNode;
  image: string;
  id: string;
}) {
  console.log("image", image);

  return (
    <DesktopCardModal
      content={
        <DesktopBoostContent image={image} id={id} onComplete={() => {}} />
      }
    >
      {children}
    </DesktopCardModal>
  );
}
