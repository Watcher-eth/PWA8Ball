import { DesktopCardModal } from "@/components/modals/DesktopCardModal"
import { FindFriends } from "./FindFriends"
import { useState } from "react"

export function DesktopInviteFriends({
  children,
}: {
  children: React.ReactNode
}) {
  const [step, setStep] = useState(1)
  return (
    <DesktopCardModal
      dialogContentClassName=" xl:max-w-[32vw] rounded-[1.5rem] md:max-w-[45vw] sm:max-w-[65vw] "
      dialogClassName="xl:max-w-[25%] md:max-w-[45vw] sm:max-w-[65vw]"
      cardClassName="xl:max-w-[32vw] md:max-w-[45vw] sm:max-w-[65vw] "
      cardContentClassName="bg-[#080808]/75 xl:max-w-[32vw md:max-w-[45vw] sm:max-w-[65vw]  rounded-[1.5rem] p-0 h-[75vh] backdrop-blur-lg"
      content={<FindFriends type={2} />}
    >
      {children}
    </DesktopCardModal>
  )
}
