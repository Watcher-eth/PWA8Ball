// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { AlignLeft, ArrowLeftRight, Clock, Receipt, User2 } from "lucide-react";
import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";
import { useRouter } from "next/router";
import { DesktopCardModal } from "@/components/modals/DesktopCardModal";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "./DesktopChart";
import { CashoutOverview } from "@/components/predictions/cashout/CashoutOverview";
import { CashoutWarningScreen } from "@/components/predictions/cashout/CashoutWarningScreen";
import { CashoutConfirmScreen } from "@/components/predictions/cashout/CashoutConfirmScreen";
import { processPrices } from "@/utils/chartUtils";
import { TimeframeSelector } from "@/components/charts/TimeframeSelector";
import { GenericAreaChart } from "@/components/charts/GenericAreaChart";
import { ProfileToolTip } from "@/components/profile/ProfileToolTip";
import { useGetMarketPrices } from "@/graphql/queries/charts/useGetMarketPrices";

export const timeframes = ["1H", "1D", "1W", "1M"];

export const MobileMyBetModal = (props: {
  title: string;
  image: string;
  price: number;
  ownedAmount: number;
  options: { name: string }[];
  percentage: number;
  betId: string;
  topic: string;
  icon: string;
  question: string;
  name?: string;
  userId?: string;
  option?: number;
  optionNumber?: number;
  isExternal?: boolean;
  isDesktop?: boolean;
  initialProb?: number;
  onClose: () => void;
  openCashout: () => void;
  handleReceipt: () => void;
  setStep: (num: number) => void;
}) => {
  const [timeframe, setTimeframe] = useState("1M");

  const { data: prices, error: priceError } = useGetMarketPrices(
    props.betId,
    timeframe
  );

  const router = useRouter();
  const userOutcome = props?.optionNumber;
  const { currentPrices, percentageDifference } = processPrices(
    prices,
    userOutcome,
    props?.initialProb,
    timeframe
  );

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    date: price.date.toLocaleString(), // Format the date as needed
    [`${props.options[0]}`]: 100 - price.value,
    [`${props.options[1]}`]: price.value,
    // desktop: price.value,
    // mobile: 100 - price.value,
  }));

  const percentageDif =
    ((currentPrices[currentPrices.length - 1].value - currentPrices[0].value) /
      currentPrices[0].value) *
    100;
  return (
    <div
      className={`flex flex-col ${
        props?.isDesktop ? "bg-transparent" : "bg-[#0c0c0c]"
      } self-center pb-[8px] gap-[2px] ${
        props?.isDesktop ? "p-[6px]" : "p-[22px]"
      } pt-[5px] rounded-t-[30px] w-full`}
    >
      <div className="flex flex-row items-center justify-between my-[5px]">
        <motion.div
          onClick={() => {
            props.onClose();
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
            });
          }}
        >
          <img
            src={props.image}
            className="h-[40px] w-[40px] rounded-full object-cover"
            alt="Market image"
          />
        </motion.div>
      </div>
      <div className="flex flex-row items-center justify-between mt-[3px]">
        <span className="text-[19px] text-white font-bold">
          {currentPrices[currentPrices.length - 1].value.toFixed(2)}%{" "}
          {props.options[props?.optionNumber === 1 ? 0 : 1]?.name
            ? props.options[props?.optionNumber === 1 ? 0 : 1]?.name
            : props.options?.name}
        </span>
        <span
          className={`text-[20px] font-bold ${
            percentageDifference < 0
              ? "text-[#FF0050]"
              : percentageDifference === 0
              ? "text-[lightgray]"
              : "text-[#28cd41]"
          }`}
        >
          {percentageDifference > 0 && "+"}
          {percentageDifference}%
        </span>
      </div>
      <div className="flex flex-row items-center justify-between pb-1">
        <span className="text-base text-white/70 font-[500]">
          {props.title}
        </span>
        <span className="text-base text-white/80 font-[500]">
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
        <div className="h-[23vh] my-4">
          <GenericAreaChart chartData={chartData} xAxisKey="date" />
        </div>
      ) : (
        <div>
          <GenericAreaChart chartData={chartData} xAxisKey="date" />
        </div>
      )}
      <div className="w-full -mb-4 -mt-1">
        <TimeframeSelector
          timeframes={timeframes}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      </div>
      <div className="h-[1px] w-[101%] bg-[rgba(100,100,100,0.3)] my-[14px] mt-[20px]" />
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
      <div className="flex flex-row items-center mt-[8px] mb-[10px] self-center justify-between w-full space-x-4">
        <motion.div
          onClick={() => {
            if (props.name) {
              router.push({ pathname: `u/${props?.userId}` });
            } else {
              props.setStep(2);
            }
          }}
          className="mt-[10px] rounded-[25px] p-[10px] bg-[#151515] flex items-center justify-center flex-row gap-[3px] w-1/2"
        >
          {props.name ? (
            <User2 height={20} color={"#D9D9D9"} strokeWidth={3.3} />
          ) : (
            <ArrowLeftRight height={20} color={"#D9D9D9"} strokeWidth={3} />
          )}
          <span className="text-[20px] text-[#D9D9D9] font-bold">
            {props.name ? "Profile" : "Cashout"}
          </span>
        </motion.div>
        <motion.div
          onClick={() => {
            props.setStep(4);
          }}
          className="mt-[10px] flex p-[10px] flex-row rounded-[25px] bg-[#D9D9D9] items-center justify-center w-1/2"
        >
          <Receipt height={20} color={"#1D1D1D"} strokeWidth={3} />
          <span className="text-[20px] text-[#1D1D1D] font-bold ml-[3px]">
            Details
          </span>
        </motion.div>
      </div>
      <div className="h-[1px] w-[101%] bg-[rgba(100,100,100,0.3)] my-[14px] mt-[20px]" />
      <div className="flex flex-row items-center gap-[4px]">
        <AlignLeft color="lightgray" strokeWidth={3} size={17} />
        <span className="text-[lightgray] font-semibold text-[19px]">
          About {props.title}
        </span>
      </div>
      <span className="text-[white] text-[16.5px] leading-[19px] mt-[5px]">
        {props.question}
      </span>
      <div className="h-[1px] w-full bg-[rgba(100,100,100,0.3)] my-[14px] mt-[12px]" />
      <div className="flex flex-row items-center self-center gap-[5px]">
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
  );
};

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
}: {
  children: React.ReactNode;
  title: string;
  image: string;
  price: number;
  ownedAmount: number;
  options: string[];
  percentage: number;
  betId: string;
  topic: string;
  icon: string;
  question: string;
  name?: string;
  userId?: string;
  option?: number;
  optionNumber?: number;
  initialProb?: number;
  isExternal?: boolean;
}) {
  const [step, setStep] = useState(1);
  return (
    <DesktopCardModal
      onOpenChange={() => {
        setStep(1);
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
        ) : null
      }
    >
      {children}
    </DesktopCardModal>
  );
}
