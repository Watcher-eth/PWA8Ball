// @ts-nocheck
import { useState } from "react"
import { motion } from "framer-motion"
import {
  AlignLeft,
  ArrowLeftRight,
  Clock,
  Receipt,
  ReceiptText,
  Stars,
  User2,
} from "lucide-react"
import { useRouter } from "next/router"
import { DesktopCardModal } from "@/components/modals/DesktopCardModal"

import { CashoutOverview } from "@/components/predictions/cashout/CashoutOverview"
import { CashoutWarningScreen } from "@/components/predictions/cashout/CashoutWarningScreen"
import { CashoutConfirmScreen } from "@/components/predictions/cashout/CashoutConfirmScreen"
import { processPrices } from "@/utils/chartUtils"
import { TimeframeSelector } from "@/components/charts/TimeframeSelector"
import { GenericAreaChart } from "@/components/charts/GenericAreaChart"
import { ProfileToolTip } from "@/components/profile/ProfileToolTip"
import { useGetMarketPrices } from "@/graphql/queries/charts/useGetMarketPrices"
import { getMarketPath } from "@/utils/urls"
import { User } from "@/__generated__/graphql"
import { RedeemModal } from "@/components/predictions/Redeem/RedeemModal"

export const timeframes = ["1H", "1D", "1W", "1M"]

export const MobileMyBetModal = (props: {
  title: string
  image: string
  price: number
  ownedAmount: number
  options: { name: string }[]
  percentage: number
  betId: string
  topic: string
  icon: string
  question: string
  name?: string
  userId?: string
  option?: number
  optionNumber?: number
  isExternal?: boolean
  isDesktop?: boolean
  initialProb?: number
  resolved?: boolean
  outcome?: number
  onClose: () => void
  openCashout: () => void
  handleReceipt: () => void
  setStep: (num: number) => void
}) => {
  const [timeframe, setTimeframe] = useState("1M")

  const { data: prices, error: priceError } = useGetMarketPrices(
    props.betId,
    timeframe
  )

  const router = useRouter()
  const userOutcome = props?.optionNumber
  const { currentPrices, percentageDifference } = processPrices(
    prices,
    userOutcome,
    props?.initialProb,
    timeframe
  )

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    date: price.date.toLocaleString(), // Format the date as needed
    [`${props.options[0]}`]: 100 - price.value,
    [`${props.options[1]}`]: price.value,
    // desktop: price.value,
    // mobile: 100 - price.value,
  }))

  const percentageDif =
    ((currentPrices[currentPrices.length - 1].value - currentPrices[0].value) /
      currentPrices[0].value) *
    100

  console.log("resolved", props?.resolved)
  return (
    <div
      className={`flex flex-col ${
        props?.isDesktop ? "bg-transparent" : "bg-[#101010]"
      } self-center pb-[8px] gap-[2px] ${
        props?.isDesktop ? "p-[6px]" : "p-[15px]"
      } pt-[5px] rounded-t-[30px] w-full`}
    >
      <div className="flex flex-row items-center justify-between my-[5px]">
        <motion.div
          onClick={() => {
            props.onClose()
            router.push({
              pathname: "[id]",
              query: {
                id: props.betId,
                name: props.title,
                description: props.question,
                icon: props.icon,
                image: props.image,
                topic: props.topic,
                option: props.option,
              },
            })
          }}
          className="relative"
        >
          <img
            src={props.image}
            className="h-[45px] w-[45px] rounded-full object-cover"
            alt="Market image"
          />
        </motion.div>
      </div>
      <div className="flex flex-row items-center justify-between mt-[3px]">
        <span className="text-[19px] text-white font-[700]">
          {currentPrices[currentPrices.length - 1].value.toFixed(2)}%{" "}
          {props.options[props?.optionNumber === 1 ? 0 : 1]?.name
            ? props.options[props?.optionNumber === 1 ? 0 : 1]?.name
            : props.options?.name}
        </span>
        <span
          className={`text-[19px] font-[700] ${
            percentageDifference < 0
              ? "text-[#FF0050]"
              : percentageDifference === 0
              ? "text-[lightgray]"
              : "text-[#0050FF]"
          }`}
        >
          {percentageDifference > 0 && "+"}
          {percentageDifference}%
        </span>
      </div>
      <div className="flex flex-row items-center justify-between -mt-1 -pb-2">
        <span className="text-lg text-white/80 font-[Aeonik]">
          {props.title}
        </span>
        <span className="text-lg text-white/80 font-[Aeonik]">
          {timeframe === "1D"
            ? "Today"
            : timeframe === "1W"
            ? "This Week"
            : timeframe === "1H"
            ? "This Hour"
            : "This Month"}
        </span>
      </div>
      {prices ? (
        <div className={`${props?.isDesktop ? "h-[23vh]" : "h-[40vh]"} my-4 mt-0`}>
          <GenericAreaChart chartData={chartData} xAxisKey="date" />
        </div>
      ) : (
        <div>
          <GenericAreaChart chartData={chartData} xAxisKey="date" />
        </div>
      )}
      <div className="w-full -mb-0 -mt-1">
        <TimeframeSelector
          timeframes={timeframes}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      </div>
      {props.ownedAmount === undefined ? (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[12px] text-[lightgray]">Created by</span>
            <ProfileToolTip user={props}>
              <div className="flex flex-row items-center mt-[5px]">
                <img
                  src={props.icon}
                  className="h-[22px] w-[22px] rounded-full mr-[5px]"
                  alt="Creator"
                />
                <span className="text-white text-[19px] font-semibold">
                  {props.name}
                </span>
              </div>
            </ProfileToolTip>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-[lightgray]">
              Prediction Value
            </span>
            {prices && (
              <span className="text-white text-[19px] font-semibold mt-[2px]">
                $
                {(
                  props.ownedAmount *
                  (currentPrices[currentPrices.length - 1]?.value / 100000000)
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-[12px] text-[lightgray]">
              {props.isExternal ? props.name : "You"} voted
            </span>
            <span className="text-white text-[19px] font-semibold">
              {props.options?.name}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[12px] text-[lightgray]">
              Prediction Value
            </span>
            {prices && (
              <span className="text-white text-[19px] font-semibold">
                $
                {(
                  props.ownedAmount *
                  (currentPrices[currentPrices.length - 1]?.value / 100000000)
                ).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-row items-center mt-2 mb-2.5 self-center justify-between w-full space-x-4">
        <motion.div
          onClick={() => {
            if (props.isExternal) {
              router.push({ pathname: getMarketPath(props.betId) })
            } else if (props?.resolved) {
              props.setStep(5)
            } else {
              props.setStep(2)
            }
          }}
          className="mt-2.5 hover:scale-[100.5%] active:scale-99 rounded-[25px] p-[10px] bg-[#151515] flex items-center justify-center flex-row gap-[3px] w-1/2"
        >
          {props.isExternal || props?.resolved ? (
            <Stars height={20} color={"#D9D9D9"} strokeWidth={3} />
          ) : (
            <ArrowLeftRight height={20} color={"#D9D9D9"} strokeWidth={3} />
          )}
          <span className="text-[20px] text-[#D9D9D9] font-[Aeonik-Bold]">
            {props?.resolved
              ? "Redeem"
              : props.isExternal
              ? "Prediction"
              : "Cashout"}
          </span>
        </motion.div>
        <motion.div
          onClick={() => {
            props.setStep(4)
          }}
          className="mt-2.5  hover:scale-[100.5%] active:scale-99 flex p-[10px] flex-row rounded-[25px] bg-[#D9D9D9] items-center justify-center w-1/2"
        >
          <ReceiptText height={20} color={"#1D1D1D"} strokeWidth={3} />
          <span className="text-[20px] text-[#1D1D1D] font-[Aeonik-Bold] ml-[3px]">
            Details
          </span>
        </motion.div>
      </div>
      <div className="h-[1px] w-[101%] bg-[rgba(100,100,100,0.3)] my-[14px] mt-[20px]" />
      <div className="flex flex-row items-center gap-[4px]">
        <AlignLeft color="lightgray" strokeWidth={3} size={18} />
        <span className="text-[lightgray] font-medium text-[18px]">
          About {props.title}
        </span>
      </div>
      <span className="text-[white] text-[18.5px] leading-[23px] mb-1 mt-[3px]">
        {props.question}
      </span>
      <div className="h-[1px] w-full bg-[rgba(100,100,100,0.3)] my-[14px] mt-[16px]" />
      <div className="flex flex-row items-center self-center gap-[5px] -mb-6">
        <Clock
          color="#989898"
          size={15}
          strokeWidth={4}
          className="rounded-[5px] bg-[#171717]"
        />
        <span className="text-[#989898] text-[16px] font-semibold">
          Not resolved yet
        </span>
      </div>
    </div>
  )
}

export function DesktopMyBetModal({
  children,
  title,
  image,
  price,
  ownedAmount,
  options,
  percentage,
  betId,
  topic,
  icon,
  question,
  name,
  userId,
  option,
  optionNumber,
  isExternal,
  initialProb,
  user,
  resolved,
  outcome,
  onClose,
  refetch,
}: {
  children: React.ReactNode
  title: string
  image: string
  price: number
  ownedAmount: number
  options: string[]
  percentage: number
  betId: string
  topic: string
  icon: string
  question: string
  name?: string
  userId?: string
  option?: number
  optionNumber?: number
  initialProb?: number
  isExternal?: boolean
  user: User
  resolved?: boolean
  outcome?: number
  refetch: () => void
}) {
  const [step, setStep] = useState(1)
  return (
    <DesktopCardModal
      onOpenChange={() => {
        setStep(1)
      }}
      cardClassName="w-full rounded-[1.5rem]"
      dialogContentClassName=" w-[40vw] lg:w-[30vw] xl:w-[25vw] bg-[#080808] rounded-[1.5rem] min-w-[450px]"
      cardContentClassName="w-[40vw] lg:w-[30vw] xl:w-[25vw] bg-[#080808] self-center rounded-[1.5rem] h-full min-w-[450px]"
      dialogClassName="w-full bg-[#080808] rounded-[1.5rem]"
      content={
        step === 1 ? (
          <MobileMyBetModal
            title={title}
            image={image}
            price={price}
            ownedAmount={Number(ownedAmount)}
            options={options}
            percentage={percentage}
            betId={betId}
            topic={topic}
            icon={icon}
            question={question}
            name={name}
            userId={userId}
            option={option}
            optionNumber={optionNumber}
            isExternal={isExternal}
            isDesktop={true}
            setStep={setStep}
            initialProb={initialProb}
            resolved={resolved}
            outcome={outcome}
          />
        ) : step === 2 ? (
          <CashoutOverview
            option={option}
            options={options}
            image={image}
            question={question}
            title={title}
            changeStep={setStep}
            id={betId}
            odds={20}
            onClose={() => {}}
            totalPot={Number(ownedAmount)}
            amount={Number(ownedAmount)}
            refetch={refetch}
            isDesktop={true}
          />
        ) : step === 3 ? (
          <CashoutWarningScreen
            option={option}
            options={options}
            image={image}
            question={question}
            title={title}
            changeStep={setStep}
            id={betId}
            multiplier={"2"}
            points={Number(ownedAmount)}
            amount={Number(ownedAmount)}
            onClose={() => {}}
            isDesktop={true}
          />
        ) : step === 4 ? (
          <CashoutConfirmScreen
            user={user}
            isDesktop={true}
            option={option}
            options={options}
            image={image}
            question={question}
            title={title}
            changeStep={setStep}
            id={betId}
            odds={"20"}
            onClose={() => {}}
            totalPot={Number(ownedAmount)}
            points={Number(ownedAmount)}
          />
        ) : step === 5 ? (
          <RedeemModal
            option={options}
            image={image}
            onClose={() => {}}
            totalPot={ownedAmount}
          />
        ) : null
      }
    >
      {children}
    </DesktopCardModal>
  )
}
