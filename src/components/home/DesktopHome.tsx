import React from "react";
import { useGetAllMarkets } from "@/graphql/queries/markets/useGetAllMarkets";
import {
  enhanceMarketsWithImageAndPolyId,
  enhanceSingleMarketWithImageAndPolyId,
} from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { hardMarkets } from "@/constants/markets";
import { hardTopics } from "@/constants/topics";
import { formatMarketArr } from "@/utils/markets/formatMarketArr";
import { motion } from "framer-motion";
import { AltSkeleton, Skeleton } from "../ui/Skeleton";
import { useGetMarketById } from "@/graphql/queries/markets/useGetMarketById";
import Link from "next/link";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay";
import { FeedCard } from "./FeedCard";
import { AllMarketsQuery } from "@/__generated__/graphql";
import { useGetTopicsWithMembers } from "@/supabase/queries/topics/useGetTopicsWithMemberCount";
import Countdown from "../common/CountDown";
import { ElectionndDate } from "../topic/ElectionPage";
import { SocialOnboardButton } from "../onboarding/DesktopOnboardingModal";
import { AppleIcon, GoogleIcon, XIcon } from "../onboarding/AuthIcons";

export function DesktopHome() {
  const { markets } = useGetAllMarkets();

  const enhancedMarkets = enhanceMarketsWithImageAndPolyId(
    markets,
    hardMarkets,
    hardTopics
  );

  return (
    <StandardPageWrapper className="h-full bg-[#080808] flex flex-col">
      <div className="flex flex-col">
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <div className=" pb-10 flex flex-row">
              <FeaturedSegment />
            </div>
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>

        <div className="pt-6 pb-12 flex flex-row px-5">
          <DesktopHomeNews markets={enhancedMarkets} />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-8" />
        <div className="pt-12 pb-[7rem] flex flex-row px-6">
          <DesktopHomeFeaturedMarketsSection markets={enhancedMarkets} />
        </div>
        <div className="h-[0.08rem] w-full bg-[#212121] px-8" />

        <div className="pt-12 pb-[9rem] flex flex-row px-5">
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

function DesktopHomeNews({ markets }) {
  const enrichedFeedData = formatMarketArr({
    markets,
    selectedTopic: "🔥 Trending",
  });

  return (
    <div className="w-full flex flex-col">
      <div className="text-[2rem] text-white font-[Aeonik-Bold] flex flex-row items-center space-x-2">
        <img src={"../images/OrbLogo.png"} className="h-11 w-11" />
        <div className="">Breaking News</div>
      </div>
      <div className="flex flex-row items-center space-x-3">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className="flex flex-row overflow-x-auto no-scrollbar mb-7 w-full gap-6 py-6 overflow-y-visible"
        >
          {enrichedFeedData
            ? enrichedFeedData?.map((item, index) => {
                if (index > 2 && index < 6)
                  return (
                    <MarketCard key={index} item={item} isTwoCards={false} />
                  );
              })
            : [1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  style={{
                    marginVertical: index === 0 ? 20 : 8,
                    alignSelf: "center",
                    marginTop: index === 0 ? 25 : 8,
                  }}
                  key={index}
                >
                  <Skeleton className="rounded-lg w-[88vw] max-w-[23.5rem] md:max-w-[21.5rem] lg:max-w-[21.5rem] max-h-[27rem] h-[107vw]" />
                </div>
              ))}
        </motion.div>
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
      <div className="flex flex-row space-x-7">
        {enrichedFeedData.map((item, index) => {
          if (index > 24 && index < 27)
            return <MarketCard key={index} item={item} isTwoCards={true} />;
        })}
      </div>
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
      <div className="px-4 flex flex-col w-full px-14">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-0 mb-3">
            <div className="text-[1.9rem] text-white font-[Aeonik-Bold] space-x-2">
              🇺🇸 2024 US Elections
            </div>
            <div className="text-[1.05rem] text-[lightgray] font-[400] flex flex-col space-x-2">
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
                  style={{
                    marginVertical: index === 0 ? 20 : 8,
                    alignSelf: "center",
                    marginTop: index === 0 ? 25 : 8,
                  }}
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
                  style={{
                    marginVertical: index === 0 ? 20 : 8,
                    alignSelf: "center",
                    marginTop: index === 0 ? 25 : 8,
                  }}
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

function FeaturedSegment() {
  const { market } = useGetMarketById("28");
  const enhancedMarkets = enhanceSingleMarketWithImageAndPolyId(
    market,
    hardMarkets,
    hardTopics
  );
  console.log("market", enhancedMarkets);
  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full h-[80vh]">
        <img
          src={enhancedMarkets?.image}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0 "
        />

        <div className="bg-gradient-to-b from-[transparent] via-[#080808]/60 to-[#080808]/80 h-[20vh] w-full absolute bottom-0  " />
        <div className="absolute inset-0 bg-[#212121]/30 z-10"></div>

        <div className="relative z-20 flex flex-col w-full  -space-y-2 md:flex-row items-end h-full pb-3 justify-start px-7 mx-5">
          <div className="text-white p-6 w-full">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col">
                <h1 className="text-4xl md:text-5xl font-bold mb-1">
                  {enhancedMarkets?.title}
                </h1>

                <p className="text-2xl md:text-2xl mb-3">
                  {enhancedMarkets?.question}
                </p>
              </div>
              <div className="flex flex-col justify-end items-end pr-3">
                <h1 className="text-4xl md:text-4xl font-bold mb-1">
                  {enhancedMarkets?.outcomeOddsA / 100}%{" "}
                  {enhancedMarkets?.outcomeA}
                </h1>

                <p className="text-xl md:text-xl mb-3">
                  ${Number(enhancedMarkets?.usdcStake / 10 ** 6).toFixed(2)} at
                  stake
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-[#151515]/30 space-x-1.5 flex items-center  backdrop-blur-md border-[0.01rem] border-[#909090]/30 text-sm py-1.5 pl-2 px-3 rounded-full">
                  <img
                    className="h-5 w-5 rounded-full"
                    src={enhancedMarkets?.topic_image}
                  />
                  <div>{enhancedMarkets?.topic_title}</div>
                </span>
                <span className="bg-[#151515]/30 backdrop-blur-md border-[0.01rem] border-[#909090]/30 text-sm py-1.5 px-3 rounded-full">
                  16+ Predictions
                </span>
              </div>
              <div className="px-8 py-1.5 -mt-4 text-white text-lg bg-[#151515]/30 space-x-1.5 flex items-center  backdrop-blur-md border-[0.01rem] border-[#909090]/30 rounded-md mr-2">
                Predict
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingCommunities() {
  //Get Topics
  const { data: topics } = useGetTopicsWithMembers(["4", "2"]);

  console.log("topics", topics);
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
                <div
                  style={{
                    marginVertical: index === 0 ? 20 : 8,
                    alignSelf: "center",
                    marginTop: index === 0 ? 25 : 8,
                  }}
                >
                  <Skeleton className=" rounded-lg w-1/2  h-[40vh]" />
                </div>
              ))}
        </div>
      </div>
    );
}

function TrendingCommunityItem(props: {
  image: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <Link
      href={`t/${props.id}`}
      className="relative w-full hover:scale-101 active:scale-99 h-[29vw] rounded-md bg-black bg-opacity-75"
    >
      <img
        src={props?.image}
        alt="Gallery Background"
        className="absolute inset-0 w-full rounded-md  h-[29vw] object-cover"
      />
      <div className="absolute inset-0 w-full  h-[29vw] rounded-md  bg-[#151515]/70" />

      <div className="relative z-10 flex flex-col mt-14  items-center justify-center h-full text-white">
        <img
          src={props?.image}
          alt="Topic image"
          className="inset-0 w-20 h-20 rounded-lg"
        />

        <h2 className="text-4xl font-bold mb-6 mt-4">{props?.title}</h2>

        <div className="flex justify-center space-x-6 mt-14">
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
    <div className="flex flex-col w-full mt-10 -mb-[8rem]">
      <div className="flex flex-col py-10 px-10 space-y-8 bg-[#121212]">
        <div className="flex flex-row w-full justify-between ">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row items-center space-x-3 ">
              <img src={"../images/OrbLogo.png"} className="h-11 w-11" />

              <div className="text-white text-[1.8rem] font-[Aeonik-Bold]">
                Glimpse
              </div>
            </div>
            <div className="text-[lightgray] font-[400] mt-3 text-[1rem]">
              To see a World in a Grain of Sand, a Heaven in a Wild Flower
            </div>
            <div className="text-[lightgray] font-[400] text-[1rem]">
              Hold Infinity in the palm of your hand And Eternity in an hour
            </div>
          </div>
          <div className="flex flex-row w-1/2 space-x-12 justify-end mt-1">
            <div className="flex flex-col space-y-2">
              <div className="text-white font-[600] text-[1.05rem]">
                Developers
              </div>
              <Link
                href={""}
                className="text-[lightgray] font-[400] text-[1rem]"
              >
                Graph
              </Link>
              <Link
                href={""}
                className="text-[lightgray] font-[400] text-[1rem]"
              >
                Protocol
              </Link>
              <Link
                href={""}
                className="text-[lightgray] font-[400] text-[1rem]"
              >
                Build on Glimpse
              </Link>
            </div>
            <div className="flex flex-col space-y-2 ">
              <div className="text-white font-[600] text-[1.05rem]">
                Resources
              </div>
              <Link
                href={""}
                className="text-[lightgray] font-[400] text-[1rem]"
              >
                Privacy
              </Link>
              <Link
                href={""}
                className="text-[lightgray] font-[400] text-[1rem]"
              >
                Terms of Use
              </Link>
              <Link
                href={""}
                className="text-[lightgray] font-[400] text-[1rem]"
              >
                Download
              </Link>
              <Link
                href={""}
                className="text-[lightgray] font-[400] text-[1rem]"
              >
                Contact
              </Link>
            </div>
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

export function MarketCard({
  item,
  isTwoCards,
}: {
  item: any;
  isTwoCards: boolean;
}) {
  return (
    <Link
      href={`/p/${item?.marketId}`}
      className={`flex flex-col hover:scale-101 active:scale-99 ${
        isTwoCards ? "w-1/2" : "w-1/3"
      }`}
    >
      <img
        className={`${
          isTwoCards ? "h-[29vw]" : "h-[21vw]"
        } w-full object-cover rounded-md`}
        src={item?.image}
        alt={item?.title}
      />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col mt-3">
          <div className="text-white text-[1.6rem] font-[600]">
            {item?.title}
          </div>
          <div className="text-[lightgray] max-w-[90%] text-[1.1rem] font-[400]">
            {item?.question}
          </div>
        </div>
        {isTwoCards && (
          <div className="py-1 px-3.5 rounded-full bg-[#181818] text-white flex flex-row space-x-2 items-center">
            <div className="text-[1rem] font-[500]">Predict</div>
          </div>
        )}
      </div>
      <div className="text-[gray] mt-2 text-[0.9rem] font-[400]">
        ${Number(item?.usdcStake / 10 ** 6).toFixed(2)} at stake
      </div>
    </Link>
  );
}
