import { useState } from "react"
import { Plus, Rocket } from "lucide-react"
import { MobileBoostModal } from "@/components/modals/BoostModal/MobileBoostModal"
import { DesktopBoostModal } from "@/components/modals/BoostModal/DesktopBoostModal"
import { BoostExplainerModal } from "@/components/modals/BoostExplainerModal"

export function BoostDetail({
  id,
  image,
  handleBoost,
  isDesktop,
}: {
  id: string
  image: string
  handleBoost: () => void
  isDesktop: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const BoostModalComponent = isDesktop ? DesktopBoostModal : MobileBoostModal

  return (
    <>
      <BoostModalComponent image={image} id={id}>
        <div
          className={`
            flex flex-row w-full  bg-[#090909] rounded-md mt-3 items-center justify-between flex-grow
            p-1 border border-white/10 hover:border-white/20
             rounded-[20px]
             active:scale-98 transition-all
            cursor-pointer
        `}
          onClick={isDesktop ? () => {} : handleBoost}
        >
          <div className="flex items-center justify-center px-4 w-full py-2 gap-2  rounded-full">
            <Plus strokeWidth={3.5} size={18} color="white" />
            <span className="text-[1.1rem] font-[600] text-white">
              Add Liquidity
            </span>
          </div>
        </div>
      </BoostModalComponent>
      <BoostExplainerModal
        onClose={() => {
          setIsOpen(false)
        }}
        isOpen={isOpen}
        setOpen={handleBoost}
      />
    </>
  )
}
