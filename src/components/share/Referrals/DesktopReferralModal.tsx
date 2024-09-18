import React, { ReactNode } from "react"
import { ProfileCard } from "./ProfileCard"
import { useUserStore } from "@/lib/stores/UserStore"
import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance"
import { DesktopCardModal } from "@/components/modals/DesktopCardModal"

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
      dialogContentClassName="rounded-[1.5rem] "
      dialogClassName="xl:max-w-[28vw] md:max-w-[38vw] sm:max-w-[60vw]"
      cardClassName="xl:max-w-[28vw] md:max-w-[38vw] sm:max-w-[60vw] "
      cardContentClassName="bg-[#080808]/75  rounded-[1.5rem] p-0 h-[75vh] backdrop-blur-lg"
      content={<DesktopReferralModalContent />}
    >
      {children}
    </DesktopCardModal>
  )
}
