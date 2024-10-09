import _ from "lodash";
import { useState } from "react";
import { Countdown } from "../common/CountDown";
import {
  ChevronDown,
  ChevronUp,
  ShareIcon,
  Split,
  TrendingUp,
} from "lucide-react";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";
import {
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay";
import { SECTION_DATA_MAP, SwingStates } from "@/constants/elections";
import Link from "next/link";
import { getMarketPath } from "@/utils/urls";
import { UsMapCard } from "../map/UsMapCard";
import MotionNumber from "motion-number";
import { useGetAllMarketsForTopic } from "@/graphql/queries/topics/useGetAllMarketsForTopic";
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";

import { Market } from "@/__generated__/graphql";
import { usePreviousRouteTitle } from "@/utils/router/getPreviousRouteTitle";

function Button({
  text,
  IconComponent,
  onClick,
}: {
  text: string;
  IconComponent: any;
  onClick?: any;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center py-1 px-3 hover:scale-102 active:scale-97 rounded-full border border-[#212121] bg-[#121212] cursor-pointer"
    >
      <div className="text-base font-medium text-[#999999] mr-1">{text}</div>
      <IconComponent color="#999999" size={"1rem"} strokeWidth={3.5} />
    </div>
  );
}

function CandidateSection({
  image,
  name,
  odds,
  change,
  side,
}: {
  image: string;
  name: string;
  odds: number;
  change: number;
  side: 1 | 2;
}) {
  return (
    <div className="flex  flex-row items-center z-1">
      {side === 1 && (
        <div className="flex flex-col hover:scale-101 items-center">
          <img
            src={image}
            className="size-16 md:h-[8rem] md:w-[8rem] object-cover rounded-full"
          />
          <div className=" text-[1.4rem] md:text-[1.8rem] mt-1 md:mt-3 font-[Aeonik-Bold] text-white">
            {name}
          </div>
        </div>
      )}
      <div
        className={`flex flex-col -space-y-4 ${
          side === 1 ? "ml-2.5 md:ml-5" : " mr-2.5 md:mr-5"
        }`}
      >
        <div className="text-[2.2rem] lg:text-[4.5rem] font-semibold text-white">
          <MotionNumber value={odds} />%
        </div>
        <div className=" text-[1rem] md:text-[1.2rem] pt-1.5 md:mt-0 font-medium flex flex-row items-center text-[#FF0050]">
          <ChevronDown
            color="#FF0050"
            strokeWidth={3}
            fill="#FF0050"
            size={"1.2rem"}
          />{" "}
          {change}%
        </div>
      </div>
      {side === 2 && (
        <div className="flex flex-col hover:scale-101 items-center">
          <img
            src={image}
            className="size-16 md:h-[8rem] md:w-[8rem] object-cover rounded-full"
          />
          <div className="text-[1.4rem] md:text-[1.8rem] mt-1 md:mt-3 font-[Aeonik-Bold] text-white">
            {name}
          </div>
        </div>
      )}
    </div>
  );
}

function SwingStateComponent({
  sectionData,
  state,
}: {
  sectionData: any;
  state: any;
}) {
  return (
    <Link
      href={getMarketPath(state?.marketId)}
      className="flex  hover:scale-101 active:scale-98 flex-col w-full md:mx-0 mx-3  p-4 my-0 md:my-1 rounded-[1.2rem] bg-[#151515] relative border-2 border-[#212121]"
    >
      <div
        className="absolute z-0 h-full bg-gradient-to-r top-0 from-[#0050FF]/[10%]  rounded-l-lg to-[#0050FF]/[0%]  left-0"
        style={{ width: `${sectionData.odds[0]}%` }}
      />
      <div
        className="absolute z-0 h-full bg-gradient-to-l top-0 from-[#FF0050]/[10%] rounded-r-lg to-[#FF0050]/[0%] right-0"
        style={{ width: `${sectionData.odds[1]}%` }}
      />
      <div className="flex flex-row items-center z-2">
        <img className="w-[7rem] rounded-md" src={state.flag} />
        <div className="flex flex-col ml-3 -space-y-1.5">
          <div className="text-[2rem] text-white font-semibold">
            {state.name}
          </div>
          <div className="text-xl text-[lightgray] font-normal">
            {state.votes} Electoral votes at stake
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-3 z-2">
        <div className="flex flex-col">
          <div className="flex flex-row space-x-4 items-center">
            <img
              src={sectionData.images[0]}
              className="size-16 object-cover rounded-full"
            />
            <div className="text-[3rem] text-white flex flex-row items-baseline font-semibold">
              {state.odds[0]}
              <p className="text-[2rem]">%</p>
            </div>
          </div>
          <div className="text-xl text-[lightgray] font-semibold">
            {sectionData.names[0]}
          </div>
        </div>
        <div className="flex flex-col items-end z-2 ">
          <div className="flex flex-row space-x-4 items-center">
            <div className="text-[3rem] flex flex-row text-white items-baseline font-semibold">
              {state.odds[1]}
              <p className="text-[2rem]">%</p>
            </div>
            <img
              src={sectionData.images[1]}
              className="size-16 object-cover rounded-full"
            />
          </div>
          <div className="text-xl  text-[lightgray] font-semibold">
            {sectionData.names[1]}
          </div>
        </div>
      </div>
    </Link>
  );
}

export const ELECTION_END_DATE = new Date("2024-11-04T23:59:59");

export function ElectionPage({
  trendingMarkets,
  allElectionMarkets,
}: {
  trendingMarkets: Market[];
  allElectionMarkets: Market[];
}) {
  const [section, setSection] = useState("Presidency");

  // @ts-ignore
  const markets = enhanceMarketsWithImageAndPolyId(
    allElectionMarkets,
    HARD_MARKETS,
    HARD_TOPICS
  );

  const enhancedeTrendingMarkets = enhanceMarketsWithImageAndPolyId(
    trendingMarkets,
    HARD_MARKETS,
    HARD_TOPICS
  );
  const sectionData =
    SECTION_DATA_MAP[section as keyof typeof SECTION_DATA_MAP];

  return (
    <StandardPageWrapper className="h-full w-full flex flex-col ">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full  h-[50vh] md:h-80 relative">
            <img
              className="w-full  h-[50vh] transform object-cover md:h-80 relative -mt-[25vh] md:-mt-40"
              alt="CoverImage"
              src={
                section === "Presidency"
                  ? "../images/ElectionsMeta.png"
                  : section === "House"
                  ? "https://cdn.britannica.com/66/164166-050-4FBB1C5A/Chamber-US-House-of-Representatives-Washington-DC.jpg"
                  : "https://dornsife.usc.edu/news/wp-content/uploads/sites/7/2023/04/story-3526-768x432.jpg"
              }
            />
            <div className="md:h-80  h-[50vh]  w-full bg-gradient-to-t from-[#080808] backdrop-blur-xl to-transparent absolute bottom-0" />
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>

      <div className="w-full bg-[#080808] z-2 flex flex-col px-0 md:px-10 lg:px-20 xl:px-40 2xl:px-80 sm:px-0">
        <img
          className=" md:w-[13rem] w-[8rem] object-cover md:self-start self-center -mt-[11rem] md:-mt-[5rem] mb-3"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1280px-Flag_of_the_United_States.png"
        />
        <div className="flex md:flex-row flex-col items-center md:justify-between">
          <div className="flex flex-col">
            <div className="text-[2rem] md:text-start text-center  lg:text-[3rem] md:leading-[3rem] md:mb-0 -mb-5 text-white font-[Aeonik-Bold]">
              2024 Election Forecast
            </div>
            <div className="text-[1.3rem] md:text-start text-center text-[lightgray] md:my-0 my-4 font-medium">
              Live forecasts for the 2024 US Elections
            </div>
          </div>
          <Countdown endDate={ELECTION_END_DATE} />
        </div>
        <div className="flex flex-row items-center justify-between md:ml-0 ml-4 md:mr-0 mr-1.5 mt-8">
          <div className="flex flex-row space-x-3 items-center">
            {_.keys(SECTION_DATA_MAP).map((key) => (
              <div
                key={key}
                onClick={() => setSection(key)}
                className={`text-xl hover:scale-101 active:scale-97 font-medium ${
                  section === key ? "text-white underline" : "text-[lightgray]"
                }`}
              >
                {key}
              </div>
            ))}
          </div>
          <Button text="Share" IconComponent={ShareIcon} />
        </div>
        <div className="flex flex-row p-5 md:p-8 bg-[#151515] rounded-lg my-6 md:ml-0 ml-3.5 justify-between items-center relative">
          <div
            className="absolute z-0 h-full bg-gradient-to-r from-[#0050FF]/[10%] rounded-l-lg to-[#0050FF]/[0%]  left-0"
            style={{ width: `${sectionData.odds[0]}%` }}
          />
          <div
            className="absolute z-0 h-full bg-gradient-to-l from-[#FF0050]/[10%] rounded-r-lg to-[#FF0050]/[0%] right-0"
            style={{ width: `${sectionData.odds[1]}%` }}
          />
          <CandidateSection
            image={sectionData.images[0]}
            name={sectionData.names[0]}
            odds={sectionData.odds[0]}
            change={1}
            side={1}
          />
          <div className="flex flex-col items-center -space-y-1 z-1"></div>
          <CandidateSection
            image={sectionData.images[1]}
            name={sectionData.names[1]}
            odds={sectionData.odds[1]}
            change={1}
            side={2}
          />
        </div>
        <div className="h-full w-[98%] md:w-full mx-3  md:mx-0 my-2 md:my-5 md:mb-[2rem] rounded-lg">
          <UsMapCard />
        </div>
        <div className="flex md:ml-0 ml-3.5 flex-row items-center mt-3 md:mt-6 justify-between">
          <div className="flex flex-row items-center space-x-2.5">
            <Split color="white" height={"2rem"} strokeWidth={3} />
            <div className="text-white font-semibold text-[1.8rem] my-3">
              Swing States
            </div>
          </div>
          <Button text="See all" IconComponent={ChevronDown} />
        </div>
        <div className="grid md:grid-cols-2 w-[95%] md:w-full grid-cols-1 gap-5 mb-8">
          {SwingStates.map((state) => (
            <SwingStateComponent
              key={state.name}
              sectionData={sectionData}
              state={state}
            />
          ))}
        </div>
        <div className="flex flex-row md:mx-0 mx-3 md:mr-0 mr-2 items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <TrendingUp
              color="white"
              fill="white"
              height={"3.8rem"}
              strokeWidth={3}
            />
            <div className="text-white font-semibold text-[1.8rem] md:my-3">
              Trending Today
            </div>
          </div>
          <Button text="See all" IconComponent={ChevronDown} />
        </div>
        {enhancedeTrendingMarkets?.slice(0, 5).map((item) => (
          <Link
            href={getMarketPath(String(item.id))}
            key={item.id}
            className="w-full flex flex-row active:scale-99 mx-3  md:mx-0 items-center justify-between mt-0 border-b-[0.1rem] border-[#212121] py-4"
          >
            <div className="flex flex-row items-center">
              <img
                className="h-[3.6rem] border-2 border-[#151515] object-cover w-[3.6rem] rounded-md"
                src={item.image}
              />
              <div className="flex flex-col -space-y-0.5 ml-3.5">
                <div className="text-[1.35rem] text-white font-semibold">
                  {item.title}
                </div>
                <div className="text-[1.1rem] line-clamp-1 line-height-[0.9rem] md:line-height-[1rem] md:line-clamp-none text-[lightgray] font-normal">
                  {item.question}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-baseline">
              <div className="text-[0.01rem] md:text-[2.1rem] text-white font-semibold">
                {item?.outcomeOddsA / 100}%{" "}
                {item?.outcomeA?.length < 4
                  ? item?.outcomeA
                  : item?.outcomeA?.slice(0, 3)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </StandardPageWrapper>
  );
}
