// @ts-nocheck

import Link from "next/link"
import { PieChart, CircleEllipsis, ArrowLeft, ChevronLeft } from "lucide-react"
import { GeneralFeed } from "@/components/profile/GeneralFeed"
import { FollowButton } from "@/components/profile/FollowButton"

import { SocialsSection } from "@/components/common/SocialsSection"
import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance"
import { BlurOverlayWrapper } from "../onboarding/Invites/InviteBlur"
import { INVITES_ACTIVE } from "@/constants"
import { MobileProfilePopover } from "../layouts/MobileProfilePopover"
import { User } from "@/__generated__/graphql"
import { useUserStore } from "@/lib/stores/UserStore"

export function MobileProfilePage({
  userId,
  totalFollowers,
  userC,
}: {
  userId: string
  totalFollowers: number
  userC: User
}) {
  const { user } = useUserStore()
  const balance = useUsdcBalance({
    address: userC?.walletAddress,
  })

  return (
    <BlurOverlayWrapper shouldShowOverlay={INVITES_ACTIVE}>
      <div className="flex flex-col items-center min-h-screen bg-[#080808] relative">
        <div className="w-full relative">
          <img
            src={userC?.pfp}
            alt="Profile Header"
            className="w-full h-[250px]  object-cover"
          />
          <div className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-transparent via-[#080808]/80 to-[#080808]" />
          <div className="absolute top-0 left-0 right-0 h-[250px] backdrop-blur-lg bg-opacity-50" />
        </div>

        <div className="w-full flex flex-col items-center pt-1 top-[-13rem] relative">
          {userC?.walletAddress === user?.walletAddress ? (
            <Link href="/lp">
              <AbsoluteBlurIcon
                IconComponent={PieChart}
                className="top-4 left-6"
              />
            </Link>
          ) : (
            <Link href="/">
              <AbsoluteBlurIcon
                IconComponent={ChevronLeft}
                className="top-4 stroke-width-4 left-6"
              />
            </Link>
          )}
          <MobileProfilePopover>
            <AbsoluteBlurIcon
              IconComponent={CircleEllipsis}
              className="top-4 right-6"
            />
          </MobileProfilePopover>
          <img
            src={userC?.pfp}
            className="size-[5rem] -mt-2.5 rounded-full border-4 border-[#202020] "
            alt="Profile"
          />
          <div className="text-white text-[0.75rem] absolute top-[3rem] p-1 px-1.5 bg-[#202020] rounded-full font-bold mt-3">
            0%
          </div>
          <p className="text-[#ffffff] text-[1.65rem] font-[500] mt-4">
            {userC?.name}
          </p>

          <div className="flex flex-col items-center -mt-2.5">
            <SocialsSection {...userC?.socials} />
            <div className="flex items-center mt-2 font-[600]">
              <p className="text-gray-100 text-sm font-[600] border-[0.08rem] border-[#202020] bg-[#181818] py-1.5 px-4 rounded-full">
                ${(Number(balance) / 10 ** 6).toFixed(2)}
              </p>
              <p className="text-gray-100 text-sm border-[0.08rem] border-[#202020] bg-[#181818] py-1.5 px-4 rounded-full mx-2 font-[600]">
                {totalFollowers} Followers
              </p>
              <FollowButton profileId={userC?.walletAddress} />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center -mt-[205px]">
          <GeneralFeed
            walletAddy={userC?.walletAddress}
            id={userId}
            onParentRefresh={() => console.log("Refreshed!")}
          />
        </div>

        <div className="h-24" />

        {/* {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />} */}
      </div>
    </BlurOverlayWrapper>
  )
}

function AbsoluteBlurIcon({
  IconComponent,
  className = "",
}: {
  IconComponent: React.FC
  className?: string
}) {
  return (
    <div
      className={`
        absolute p-1.5 bg-[#151515]/30 active:scale-93 backdrop-blur-xl border-[0.05rem] border-[#202020]/20 rounded-[25px]
        ${className}
      `}
    >
      <IconComponent size={19} color="white" strokeWidth={3} />
    </div>
  )
}
