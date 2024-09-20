import React, { ReactNode } from "react"
import { ProfileCard } from "./ProfileCard"
import { useUserStore } from "@/lib/stores/UserStore"
import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance"
import { DesktopCardModal } from "@/components/modals/DesktopCardModal"
import { motion } from "framer-motion"
function DesktopReferralModalContent() {
  const { user } = useUserStore()
  const balance = useUsdcBalance({ address: user?.walletAddress })
  return (
    <div className="flex flex-col p-8">
      <ProfileCard user={user} userBalance={balance} onClose={() => {}} />
    </div>
  )
}

export function DesktopReferralModal({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DesktopCardModal
      dialogContentClassName="rounded-[1.5rem] xl:max-w-[32vw]  md:max-w-[41vw] sm:max-w-[60vw] "
      dialogClassName="xl:max-w-[32vw] md:max-w-[41vw] sm:max-w-[60vw]"
      cardClassName="xl:max-w-[32vw] lg:max-w-[45vw] md:max-w-[41vw] sm:max-w-[60vw] "
      cardContentClassName="bg-[#080808]/75  rounded-[1.5rem] p-0 h-[75vh] backdrop-blur-lg"
      content={<DesktopReferralModalContent />}
    >
      {children}
    </DesktopCardModal>
  )
}

function ReferallItem(props: {
  image: string
  title: string
  name: string
  pfp: string
  amount: number
  date: string
  index: number
}) {
  return (
    <div className="flex flex-row items-center justify-between">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className={`flex flex-row items-center justify-between`}
      >
        <div className="flex flex-row items-center relative">
          <img
            src={props.image}
            alt="Prediction"
            className={`h-[50px] w-[50px] object-cover ${"rounded-[10px]"}`}
          />
          <img
            src={props.pfp}
            alt="Profile"
            className="h-[25px] w-[25px] object-cover rounded-[15px] absolute bottom-[-6px] left-[32px] border-[3px] border-[#1B1B1E]"
          />
          <div className="flex flex-col -space-y-0.5 ml-[12.5px] mr-[-36px] max-w-full">
            <h3 className="text-[18px] text-white font-semibold">
              {props.name}
            </h3>
            <p className="text-[15.5px] text-[lightgray] font-normal overflow-hidden whitespace-nowrap text-ellipsis">
              {props.title}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <p
            className={`text-[14px] px-2 py-0 rounded-md text-white font-semibold`}
          >
            {props.date}
          </p>
          <p className="text-[16px] text-white font-[600]">{props.amount}</p>
        </div>
      </motion.div>
    </div>
  )
}
