import React, { ReactNode } from "react"
import { ProfileCard } from "./ProfileCard"
import { useUserStore } from "@/lib/stores/UserStore"
import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance"
import { DesktopCardModal } from "@/components/modals/DesktopCardModal"
import { motion } from "framer-motion"
import { useGetUserReferrals } from "@/graphql/queries/users/useGetUserReferrals"
import { formatDate } from "@/utils/datetime/formatDate"
import { Skeleton } from "@/components/ui/Skeleton"
import { timeAgo } from "@/utils/datetime/timeAgo"
import { enhancePositionsWithImages } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId"
import { HARD_MARKETS } from "@/constants/markets"
function DesktopReferralModalContent() {
  const { user } = useUserStore()
  const balance = useUsdcBalance({ address: user?.walletAddress })
  const { referrals, loading } = useGetUserReferrals(
    "0x9fEFD0Bb2d175B039C8c72C55eEa11BC66452591"
  )
  console.log("referrals", referrals)

  const totalFeeAmount = referrals?.reduce((acc, referral) => {
    return acc + parseFloat(referral.feeAmount)
  }, 0)

  const formattedMarkets = enhancePositionsWithImages(referrals, HARD_MARKETS)

  return (
    <div className="flex flex-col w-full p-8">
      <ProfileCard
        user={user}
        userBalance={totalFeeAmount}
        onClose={() => {}}
      />
      {referrals ? (
        referrals?.map((item, index) => {
          return (
            <ReferallItem
              image={formattedMarkets[index].image}
              title={item?.market?.title}
              name="Alice"
              pfp={"https://rallyrd.com/wp-content/uploads/2022/03/Punk-02.jpg"}
              amount={item?.feeAmount}
              date={formatDate(new Date(parseInt(item.timestamp) * 1000))}
              index={index}
            />
          )
        })
      ) : (
        <Skeleton />
      )}
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
    <div className="flex flex-row items-center w-full my-3 mx-0.5 justify-between">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: props?.index * 0.15 }}
        className={`flex flex-row items-center w-full justify-between`}
      >
        <div className="flex flex-row items-center relative">
          <img
            src={props.image}
            alt="Prediction"
            className={`h-[50px] w-[50px] object-cover ${"rounded-[8px]"}`}
          />
          <img
            src={props.pfp}
            alt="Profile"
            className="h-[25px] w-[25px] object-cover rounded-[15px] absolute bottom-[-6px] left-[32px] border-[2px] border-[#1B1B1E]"
          />
          <div className="flex flex-col -space-y-0.5 ml-[14.5px] mr-[-30px] max-w-full">
            <h3 className="text-[18px] text-white font-semibold">
              {props.name}
            </h3>
            <p className="text-[15.5px] text-[lightgray] font-normal overflow-hidden whitespace-nowrap text-ellipsis">
              {props.title}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end -space-y-0">
          <p
            className={`text-[13px]  py-0 rounded-md text-[lightgray] font-medium`}
          >
            {props.date}
          </p>
          <p className="text-[17px] text-white font-semibold">
            ${(props.amount / 10 ** 6).toFixed(2)}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
