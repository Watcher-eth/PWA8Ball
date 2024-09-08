import { useState } from "react";
import { Plus, Rocket } from "lucide-react";
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
      <BoostModalComponent image={image} id={id}>
        <div
          className={`
            flex flex-row w-full rounded-md mt-3 items-center justify-between flex-grow
            p-1 border border-white/10 hover:border-white/20
             rounded-[12px]
             active:scale-98 transition-all
            cursor-pointer
        `}
          onClick={isDesktop ? () => {} : handleBoost}
        >
          <div className="flex items-center justify-center px-4 w-full py-2 gap-2  rounded-full">
            <Plus strokeWidth={4} size={20} color="white" />
            <span className="text-lg font-bold text-white">Boost</span>
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
}
