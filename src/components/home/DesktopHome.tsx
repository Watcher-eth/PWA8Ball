import React, { useState } from "react";
import {
  enhanceMarketsWithImageAndPolyId,
  enhanceSingleMarketWithImageAndPolyId,
} from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { hardMarkets } from "@/constants/markets";
import { hardTopics } from "@/constants/topics";
import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/Skeleton";
import { useGetMarketById } from "@/graphql/queries/markets/useGetMarketById";
import Link from "next/link";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay";
import { useGetTopicsWithMembers } from "@/supabase/queries/topics/useGetTopicsWithMemberCount";
import Countdown from "../common/CountDown";
import { ElectionndDate } from "../topic/ElectionPage";
import { SocialOnboardButton } from "../onboarding/DesktopOnboardingModal";
import { AppleIcon, GoogleIcon, XIcon } from "../onboarding/AuthIcons";
import { LineChart, Stars, Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useGetPricesForMarket } from "@/supabase/queries/charts/useGetPricesForMarket";
import { getMinMaxValues, processPrices } from "@/utils/chartUtils";

import { GenericLineChart } from "../charts/GenericLineChart";
import { TopicHeader } from "./TopicHeader";
import { Market } from "@/__generated__/graphql";
import { Chip } from "@/components/ui/Chip";
import { getMarketPath, getTopicPath } from "@/utils/urls";

export function DesktopHome({ markets }: { markets: Market[] }) {
  // const { markets } = useGetAllMarkets();
  const [selectedTopic, setSelectedTopic] = useState("🔥 Trending"); // State to track selected topic

  const enhancedMarkets = enhanceMarketsWithImageAndPolyId(
    markets,
    hardMarkets,
    hardTopics
  );

  const enrichedFeedData = formatMarketArr({
    markets: enhancedMarkets,
    selectedTopic,
  });

  return (
    <StandardPageWrapper className="h-full bg-[#080808] flex flex-col">
      <div className="flex flex-col">
        <div className=" pb-8 flex flex-row">
          <TopMarket />
        </div>
        <TopicHeader
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
        />
        <div className="h-[0.08rem] mt-4 w-full bg-[#212121] px-8" />

        <div className="pt-6 pb-8 flex flex-row px-5">
          <DesktopHomeNews amount={4} markets={enrichedFeedData} />
        </div>
        <div className="pt-6 pb-8 flex flex-row px-5">
          <DesktopHomeNews amount={3} markets={enhancedMarkets} />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-8" />
        <div className="pt-12 pb-[6rem] flex flex-row px-6">
          <DesktopHomeFeaturedMarketsSection markets={enhancedMarkets} />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-8" />

        <div className="pt-12 pb-[6.5rem] flex flex-row px-5">
          <TrendingCommunities />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-5" />
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <div className="pt-12 flex flex-row">
              <ElectionFooter markets={enhancedMarkets} />
            </div>
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
      </div>
    </StandardPageWrapper>
  );
}

function DesktopHomeNews({ markets, amount }) {
  return (
    <div className="w-full flex flex-col">
      <div className="text-[2rem] text-white font-[500] flex flex-row items-center space-x-2">
        {amount === 4 && (
          <img src={"../images/OrbLogo.png"} className="h-11 w-11" />
        )}
        <div className="">
          {amount === 4 ? "Breaking News" : "New Predictions"}
        </div>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <Carousel className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full gap-6 py-6 overflow-y-visible">
          <CarouselContent>
            {markets
              ? markets?.map((item, index) => {
                  if (
                    (amount === 4 && index > 0 && index < 9) ||
                    (amount === 3 && index > 4)
                  )
                    return (
                      <CarouselItem
                        className={`${
                          amount === 4 ? "basis-1/4 w-1/4" : "basis-1/3 w-1/3"
                        }`}
                      >
                        <MarketCard
                          key={index}
                          item={item}
                          isTwoCards={false}
                        />
                      </CarouselItem>
                    );
                })
              : [1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}
                    key={index}
                  >
                    <Skeleton className="rounded-lg w-[88vw] max-w-[23.5rem] md:max-w-[21.5rem] lg:max-w-[21.5rem] max-h-[27rem] h-[107vw]" />
                  </div>
                ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

function DesktopHomeFeaturedMarketsSection({ markets }) {
  const enrichedFeedData = formatMarketArr({
    markets,
    selectedTopic: "🔥 Trending",
  });

  return (
    <div className="flex flex-col w-full">
      <div className="text-[1.8rem] text-white font-[Aeonik-Bold] mb-7 space-x-2">
        Trending Today
      </div>
      <Carousel className="flex flex-row space-x-7">
        <CarouselContent>
          {enrichedFeedData.map((item, index) => {
            if (index > 24)
              return (
                <CarouselItem className="basis-1/2 w-1/2">
                  <MarketCard key={index} item={item} isTwoCards={true} />
                </CarouselItem>
              );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function ElectionFooter({ markets }) {
  const enrichedFeedData = formatMarketArr({
    markets,
    selectedTopic: "🇺🇸 2024 US Elections",
  });

  return (
    <div className="px-4 mt-[6.5rem] flex flex-col w-full">
      <div className="flex flex-col w-full px-14">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-0 mb-3">
            <div className="text-[1.9rem] text-white font-[Aeonik-Bold] space-x-2">
              🇺🇸 2024 US Elections
            </div>
            <div className="text-[1.05rem] text-[lightgray] font-normal flex flex-col space-x-2">
              Get the latest forecasts about the 2024 US Federal Elections
            </div>
          </div>{" "}
          <Countdown endDate={ElectionndDate} />
        </div>
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full gap-6 py-6 overflow-y-visible"
        >
          {enrichedFeedData
            ? enrichedFeedData?.map((item, index) => {
                if (index < 3)
                  return (
                    <MarketCard key={index} item={item} isTwoCards={false} />
                  );
              })
            : [1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}
                  key={index}
                >
                  <Skeleton className="rounded-lg w-[88vw] max-w-[23.5rem] md:max-w-[21.5rem] lg:max-w-[21.5rem] max-h-[27rem] h-[107vw]" />
                </div>
              ))}
        </motion.div>
        <div className="text-[1.7rem] text-white font-[Aeonik-Bold] space-x-2">
          Latest News
        </div>
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="flex flex-row overflow-x-auto no-scrollbar mb-40 w-full gap-6 py-6 overflow-y-visible"
        >
          {enrichedFeedData
            ? enrichedFeedData?.map((item, index) => {
                if (index > 3 && index < 6)
                  return (
                    <MarketCard key={index} item={item} isTwoCards={true} />
                  );
              })
            : [1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}
                  key={index}
                >
                  <Skeleton className="rounded-lg w-[88vw] max-w-[23.5rem] md:max-w-[21.5rem] lg:max-w-[21.5rem] max-h-[27rem] h-[107vw]" />
                </div>
              ))}
        </motion.div>
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <DesktopFooter />
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
      </div>
    </div>
  );
}

function TrendingCommunities() {
  const { data: topics } = useGetTopicsWithMembers(["14", "7"]);

  if (topics?.length > 0)
    return (
      <div className=" flex flex-col w-full">
        <div className="text-[1.8rem] text-white font-[Aeonik-Bold] mb-7 space-x-2">
          Popular Communities
        </div>
        <div className="flex flex-row space-x-7">
          {topics
            ? topics?.map((topic, index) => {
                return <TrendingCommunityItem {...topic} key={index} />;
              })
            : [1, 2].map((index) => (
                <div className={`self-center ${index === 0 ? "mt-6" : "mt-2"}`}>
                  <Skeleton className=" rounded-lg w-1/2  h-[40vh]" />
                </div>
              ))}
        </div>
      </div>
    );
}

function TrendingCommunityItem({
  id,
  title,
  description,
  image,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Link
      href={getTopicPath(id)}
      className="relative w-full hover:scale-[100.3%] active:scale-99 h-[29vw] rounded-md bg-black bg-opacity-75"
    >
      <img
        src={image}
        alt="Gallery Background"
        className="absolute inset-0 w-full rounded-md  h-[29vw] object-cover"
      />
      <div className="absolute inset-0 w-full  h-[29vw] rounded-md  bg-[#151515]/70" />

      <div className="relative z-10 flex flex-col mt-14  items-center justify-center h-full text-white">
        <img
          src={image}
          alt="Topic image"
          className="inset-0 object-cover w-20 h-20 rounded-lg"
        />

        <h2 className="text-4xl font-bold mb-6 mt-4">{title}</h2>

        <div className="flex justify-center space-x-6 mt-12">
          <div className="text-center flex flex-col items-center -space-y-0">
            <p className="text-lg font-semibold">Members</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <p className="text-2xl font-bold">33</p>
              <div className="flex -space-x-1">
                <img
                  src="creator-image-1.jpg"
                  alt="Creator 1"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <img
                  src="creator-image-2.jpg"
                  alt="Creator 2"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <img
                  src="creator-image-3.jpg"
                  alt="Creator 3"
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              </div>
            </div>
          </div>
          <div className="h-full w-[0.05rem] py-1  bg-[lightgray]/40" />
          <div className="text-center flex flex-col items-center -space-y-0">
            <p className="text-lg font-semibold">Live Predictions</p>
            <div className="flex items-center mt-2 space-x-2 justify-cemterr">
              <p className="text-2xl font-bold ">8</p>
              <div className="relative flex items-center  ">
                <div className="w-3 h-3 bg-white rounded-full z-10"></div>
                <motion.div
                  className="absolute w-4 h-4 bg-white rounded-full"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.7, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="h-full py-1 w-[0.05rem] bg-[lightgray]/40" />
          <div className="text-center flex flex-col items-center -space-y-0">
            <p className="text-lg font-semibold">Total Stake</p>
            <p className="text-2xl font-bold mt-2">$278,345.00</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function DesktopFooter() {
  return (
    <div className="flex flex-col w-full mt-10 -mb-32">
      <div className="flex flex-col py-10 px-10 space-y-8 bg-[#121212]">
        <div className="flex flex-row w-full justify-between ">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row items-center space-x-3 ">
              <img src={"../images/OrbLogo.png"} className="h-11 w-11" />

              <div className="text-white text-[1.8rem] font-[Aeonik-Bold]">
                Glimpse
              </div>
            </div>
            <div className="text-[lightgray] font-normal mt-3 text-[1rem]">
              To see a World in a Grain of Sand, a Heaven in a Wild Flower
            </div>
            <div className="text-[lightgray] font-normal text-[1rem]">
              Hold Infinity in the palm of your hand And Eternity in an hour
            </div>
          </div>
          <div className="flex flex-row w-1/2 space-x-12 justify-end mt-1">
            <FooterColumn title="Developers">
              <FooterLink href={""} label="Graph" />
              <FooterLink href={""} label="Protocol" />
              <FooterLink href={""} label="Build on Glimpse" />
            </FooterColumn>
            <FooterColumn title="Resources">
              <FooterLink href={"/privacy"} label="Privacy" />
              <FooterLink href={"/tos"} label="Terms of Use" />
              <FooterLink
                href={"https://testflight.apple.com/join/xBbJ2OPO"}
                label="Download"
              />
              <FooterLink
                href={"https://t.me/GlimpseSupport"}
                label="Contact"
              />
            </FooterColumn>
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <SocialOnboardButton IconComponent={GoogleIcon} onClick={() => {}} />
          <SocialOnboardButton IconComponent={XIcon} onClick={() => {}} />
          <SocialOnboardButton IconComponent={AppleIcon} onClick={() => {}} />
          {/* <SocialOnboardButton label={"Farcaster"} onClick={() => {}} /> */}
        </div>
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-white font-[600] text-[1.05rem]">{title}</div>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  label,
  children,
  className = "",
}: {
  href?: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href ?? ""}
      className={`text-[lightgray] font-normal text-[1rem] ${className}`}
    >
      {label}
      {children}
    </Link>
  );
}

export function MarketCard({
  item,
  isTwoCards,
}: {
  item: any;
  isTwoCards: boolean;
}) {
  return (
    <Link
      href={getMarketPath(item?.marketId)}
      className={`flex flex-col w-full relative hover:scale-[100.4%] active:scale-99 `}
    >
      <img
        className={`${
          isTwoCards ? "h-[29vw]" : "h-[21vw]"
        } w-full object-cover rounded-lg border-[0.08rem] border-[#303030]/25 shadow-md shadow-[#101010] hover:shadow-[#171717]`}
        src={item?.image}
        alt={item?.title}
      />
      <div
        className={`px-2.5 py-1 absolute z-[20] border-[0.09rem] border-[#efefef]/10 rounded-full bg-[#353535]/20 backdrop-blur-md text-white ${
          isTwoCards
            ? "text-[0.9rem] top-5 right-5 "
            : "text-[0.8rem] top-4 right-4 "
        } font-[600]`}
      >
        {(item?.outcomeOddsA / 100).toFixed(1)}%{" "}
        {item?.outcomeA === "Yes" ? "Chance" : item?.outcomeA}
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col mt-3">
          <div className="text-white text-[1.6rem] font-[600]">
            {item?.title}
          </div>
          <div className="text-[lightgray] max-w-[100%] text-[1.1rem] font-normal">
            {item?.question}
          </div>
        </div>
        {isTwoCards && (
          <div className="py-1 px-3.5 pr-1.5 rounded-full bg-[#181818] text-white flex items-center flex-row space-x-0.5 self-start mt-4">
            <div className="text-[1rem] font-[500]">Predict</div>
            <Stars height={"0.9rem"} color="white" strokeWidth={2.8} />
          </div>
        )}
      </div>
      <div className="text-[gray] mt-2 text-[0.9rem] font-normal">
        ${Number(item?.usdcStake / 10 ** 6).toFixed(2)} at stake
      </div>
    </Link>
  );
}

function TopMarket() {
  const { market } = useGetMarketById("1");
  const enhancedMarkets = enhanceSingleMarketWithImageAndPolyId(
    market,
    hardMarkets,
    hardTopics
  );

  const { data: prices2 } = useGetPricesForMarket("1");

  const userOutcome = 0;
  const { currentPrices, percentageDifference } = processPrices(
    prices2,
    userOutcome,
    enhancedMarkets?.initialProb,
    "1M"
  );

  const minMax = getMinMaxValues(currentPrices);

  // Format data for AreaChart
  const chartData = currentPrices?.map((price) => ({
    month: price.date.toLocaleString(), // Format the date as needed
    [`${enhancedMarkets?.outcomeA}`]: 100 - price.value,
    [`${enhancedMarkets?.outcomeB}`]: price.value,
  }));

  return (
    <div className="w-full flex  flex-row pl-5 mt-2 -mb-4  border-b-[0.1rem]  border-[#181818] pb-12 px-3  ">
      <div className="flex flex-col w-[30%] pr-5 z-1 pt-2">
        <img
          className="h-[6rem] w-[6rem] object-cover mt-0 rounded-md"
          src={enhancedMarkets?.image}
        />
        <div className="text-white text-3xl mt-6 font-[600]">
          {enhancedMarkets?.title}
        </div>
        <div className="text-[lightgray] mt-2 text-lg font-normal">
          {enhancedMarkets?.question}
        </div>
        <div className="flex pt-2 space-x-2">
          <Chip className="flex-shrink space-x-2 pt-0.5">
            <Users
              size="16"
              strokeWidth={2.7}
              color="gray"
              className="inline -mt-0.5"
            />
            <div className="inline-block text-sm">354+ Predictors</div>
          </Chip>
          <Chip className="flex-shrink space-x-2 pt-1 text-sm">
            $
            <span className="font-semibold">
              {(enhancedMarkets?.usdcStake / 10 ** 6).toFixed(2)}
            </span>
            <div className="inline-block text-sm text-white/60">at Stake</div>
          </Chip>
        </div>

        <div className="text-[gray] mt-8 -mb-3 text-md flex flex-row items-center space-x-2 font-[500]"></div>
      </div>
      <div className="flex flex-col h-full justify-between  w-[70%] z-1 ">
        <div className="text-[gray] text-md font-normal">
          {enhancedMarkets?.title}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-3xl font-[500] my-1 text-white">
            {enhancedMarkets?.outcomeOddsA / 100}%{" "}
            {enhancedMarkets?.outcomeA !== "Yes"
              ? enhancedMarkets?.outcomeA
              : "Chance"}
          </div>
          <div className="text-3xl text-white/20 font-[Aeonik-Bold]">
            Glimpse
          </div>
        </div>
        <div className="w-full h-[9rem] my-3 rounded-md ">
          <GenericLineChart
            domain={[
              minMax.min - (minMax.max - minMax.min) / 6,
              minMax.max + (minMax.max - minMax.min) / 6,
            ]}
            chartData={chartData}
            xAxisKey="month"
            xAxisTickFormatter={(value) => value.slice(0, 3)}
          />
        </div>
        <div className="flex flex-row justify-between -mb-3 items-center">
          <div></div>
          <div className="flex flex-row  space-x-3  items-center ">
            <div className="px-6 py-1.5  flex items-baseline font-[500] text-[1.1rem] rounded-md bg-[#808080]/10 text-white border-[0.1rem] border-[#202020]">
              {enhancedMarkets?.outcomeA}
              <p className="text-[0.75rem] text-[lightgray] ml-1">
                {enhancedMarkets?.outcomeOddsA / 100}%
              </p>
            </div>
            <div className="px-6 py-1.5 text-[1.1rem] font-[500]  flex items-baseline rounded-md bg-[#808080]/10 text-white border-[0.1rem] border-[#202020]">
              {enhancedMarkets?.outcomeB}
              <p className="text-[0.75rem] text-[lightgray] ml-1">
                {enhancedMarkets?.outcomeOddsB / 100}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
