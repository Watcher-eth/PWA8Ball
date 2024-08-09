import { useState } from "react";
import { Rocket } from "lucide-react";
import { MobileBoostModal } from "@/components/modals/BoostModal/MobileBoostModal";
import { DesktopBoostModal } from "@/components/modals/BoostModal/DesktopBoostModal";
import { BoostExplainerModal } from "@/components/modals/BoostExplainerModal";

export function BoostDetail({
  id,
  image,
  handleBoost,
  isDesktop,
}: {
  id: string;
  image: string;
  handleBoost: () => void;
  isDesktop: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const BoostModalComponent = isDesktop ? DesktopBoostModal : MobileBoostModal;

  return (
    <>
      <BoostModalComponent  image={image} id={id}>
        <div
          className={`
            flex flex-row w-full items-center justify-between flex-grow
            p-2 border border-white/10 hover:border-white/20
             rounded-[12px]
            hover:scale-101 active:scale-98 transition-all
            cursor-pointer
        `}
          onClick={isDesktop ? () => {} : handleBoost}
        >
          <div className="flex flex-row space-x-4 items-center pl-2">
            <Rocket size={30} color="white" />
            <div className="flex flex-col ml-[-28px] space-y-[-0.1rem] items-start">
              <span className="text-lg font-bold text-white">
                Boost this market
              </span>
              <span className="text-sm text-white">Earn fees & $Cred</span>
            </div>
          </div>
          <div className="flex items-center justify-center px-4 py-2 border border-[#212121] rounded-full">
            <span className="text-md font-bold text-white">Boost</span>
          </div>
        </div>
      </BoostModalComponent>
      <BoostExplainerModal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        setOpen={handleBoost}
      />
    </>
  );
};
