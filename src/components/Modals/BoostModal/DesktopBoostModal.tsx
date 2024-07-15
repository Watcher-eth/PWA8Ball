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
      <div className="text-[lightgray] text-[0.95rem] font-medium mb-3  ">
        Boost this market to earn extra cred and trading fees. The more popular
        a prediction gets the more fees you receive.
      </div>
      <div className="h-[0.1rem] w-full bg-[#212121] mt-2 mb-5" />
      <InfoRow label="Minimum Boost" content="$10.00" />
      <InfoRow
        label="Fee Rewards Rate"
        content={
          <div className="text-white font-medium text-[1.05rem] px-2 py-1 rounded-md bg-[#0050FF]">
            0.5%
          </div>
        }
      />
      <InfoRow label="Cred Bonus" content="150 Cred" />
      <Input
        className=" my-5 border border-[#212121] rounded-md p-6 bg-[#151515] font-medium px-3 text-[1rem]"
        placeholder="Amount"
      />
      <ConfirmButton id={props?.id} onComplete={props?.onComplete} />
    </div>
  );
}

function InfoRow({
  label,
  content,
  children,
}: {
  label: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center justify-between my-3">
      <div className="text-[#909090] font-medium text-[1.1rem]">{label}</div>

        <div className="text-white font-medium text-[1.1rem]">{content}</div>
      {children}
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
      cardClassName="w-[99%]"
      dialogContentClassName="w-[30vw]"
      cardContentClassName="w-[30vw]"
      dialogClassName="w-[99%]"
      content={
        <DesktopBoostContent image={image} id={id} onComplete={() => {}} />
      }
    >
      {children}
    </DesktopCardModal>
  );
}
