import React, { useState } from "react";
import Countdown from "../common/CountDown";
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
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import { sectionDataMap, SwingStates } from "@/constants/Elections";
import Link from "next/link";
import { getMarketPath } from "@/utils/urls";
import { UsMapCard } from "../map/UsMapCard";

const Button = ({ text, icon: Icon, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-row items-center py-1 px-3 hover:scale-102 active:scale-97 rounded-full border-2 border-[#212121] bg-[#121212] cursor-pointer"
  >
    <div className="text-lg font-[500] text-[#999999] mr-1">{text}</div>
    <Icon color="#999999" size={"1rem"} strokeWidth={3.5} />
  </div>
);

const CandidateSection = ({ image, name, odds, change, side }) => (
  <div className="flex flex-row items-center z-1">
    {side === 1 && (
      <div className="flex flex-col hover:scale-101 items-center">
        <img
          src={image}
          className="sm:h-[3rem] sm:w-[3rem] md:h-[8rem] md:w-[8rem] object-cover rounded-full"
        />
        <div className="text-[1.8rem] mt-3 font-[Aeonik-Bold] text-white">
          {name}
        </div>
      </div>
    )}
    <div className={`flex flex-col -space-y-4 ${side === 1 ? "ml-5" : "mr-5"}`}>
      <div className="text-[4.5rem] font-[600] text-white">{odds}%</div>
      <div className="text-[1.2rem] font-[500] flex flex-row items-center text-[#FF0050]">
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
          className="sm:h-[3rem] sm:w-[3rem] md:h-[8rem] md:w-[8rem] object-cover rounded-full"
        />
        <div className="text-[1.8rem] mt-3 font-[Aeonik-Bold] text-white">
          {name}
        </div>
      </div>
    )}
  </div>
);

const SwingStateComponent = ({ sectionData, state }) => (
  <div className="flex  hover:scale-101 active:scale-98 flex-col sm:w-full w-1/2 p-4 my-1 rounded-[1.2rem] bg-[#151515] relative border-2 border-[#212121]">
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
        <div className="text-[2rem] text-white font-[600]">{state.name}</div>
        <div className="text-xl text-[lightgray] font-[400]">
          {state.votes} Electoral votes at stake
        </div>
      </div>
    </div>
    <div className="flex flex-row justify-between mt-3 z-2">
      <div className="flex flex-col">
        <div className="flex flex-row space-x-4 items-center">
          <img
            src={sectionData.images[0]}
            className="h-[4rem] w-[4rem] object-cover rounded-full"
          />
          <div className="text-[3rem] text-white flex flex-row items-baseline font-[600]">
            {state.odds[0]}
            <p className="text-[2rem]">%</p>
          </div>
        </div>
        <div className="text-xl text-[lightgray] font-[600]">
          {sectionData.names[0]}
        </div>
      </div>
      <div className="flex flex-col items-end z-2 ">
        <div className="flex flex-row space-x-4 items-center">
          <div className="text-[3rem] flex flex-row text-white items-baseline font-[600]">
            {state.odds[1]}
            <p className="text-[2rem]">%</p>
          </div>
          <img
            src={sectionData.images[1]}
            className="h-[4rem] w-[4rem] object-cover rounded-full"
          />
        </div>
        <div className="text-xl  text-[lightgray] font-[600]">
          {sectionData.names[1]}
        </div>
      </div>
    </div>
  </div>
);

export function ElectionPage() {
  const [section, setSection] = useState("Presidency");
  const endDate = new Date("2024-11-04T23:59:59");
  const { data: markets } = useGetMarketsForTopic("1");
  const sectionData = sectionDataMap[section];

  return (
    <StandardPageWrapper className="h-full w-full flex flex-col ">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full h-80 relative">
            <img
              className="w-full transform object-cover h-80 relative -mt-40"
              alt="CoverImage"
              src="https://static.ffx.io/images/$zoom_0.56%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_31%2C$y_0/t_crop_custom/q_86%2Cf_auto/33b09e58e76c18b28e8173421cfd765a46501415"
            />
            <div className="h-80 w-full bg-gradient-to-t from-[#080808] backdrop-blur-xl to-transparent absolute bottom-0" />
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>

      <div className="w-full bg-[#080808] z-2 flex flex-col md:px-10 lg:px-20 xl:px-40 2xl:px-80 sm:px-3">
        <img
          className=" w-[13rem] object-cover -mt-[5rem] mb-3"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1280px-Flag_of_the_United_States.png"
        />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <div className="  md:text-[3rem] md:leading-[3rem] text-white font-[Aeonik-Bold]">
              2024 US Election Forecast
            </div>
            <div className="text-[1.3rem] text-[lightgray] md:mt-0 -mt-3 font-[500]">
              Live forecasts for the 2024 US Elections
            </div>
          </div>
          <Countdown endDate={endDate} />
        </div>
        <div className="flex flex-row items-center justify-between mt-8">
          <div className="flex flex-row space-x-3 items-center">
            {Object.keys(sectionDataMap).map((key) => (
              <div
                key={key}
                onClick={() => setSection(key)}
                className={`text-xl hover:scale-101 active:scale-97 font-[500] ${
                  section === key ? "text-white underline" : "text-[lightgray]"
                }`}
              >
                {key}
              </div>
            ))}
          </div>
          <Button text="Share" icon={ShareIcon} />
        </div>
        <div className="flex flex-row p-8 bg-[#151515] rounded-lg my-6 justify-between items-center relative">
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
        <div className="h-[60vh] w-full my-5 mb-[4rem] rounded-lg">
          <UsMapCard />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2.5">
            <Split color="white" height={"2rem"} strokeWidth={3} />
            <div className="text-white font-[600] text-[1.8rem] my-3">
              Swing States
            </div>
          </div>
          <Button text="See all" icon={ChevronDown} />
        </div>
        <div className="grid grid-cols-2 gap-5 mb-8">
          {SwingStates.map((state) => (
            <SwingStateComponent
              key={state.name}
              sectionData={sectionData}
              state={state}
            />
          ))}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <TrendingUp
              color="white"
              fill="white"
              height={"3.8rem"}
              strokeWidth={3}
            />
            <div className="text-white font-[600] text-[1.8rem] my-3">
              Trending Today
            </div>
          </div>
          <Button text="See all" icon={ChevronDown} />
        </div>
        {markets?.slice(0, 5).map((item) => (
          <Link
            href={getMarketPath(String(item.id))}
            key={item.id}
            className="w-full flex flex-row active:scale-99 items-center justify-between mt-0 border-b-2 border-[#212121] py-4"
          >
            <div className="flex flex-row items-center">
              <img
                className="h-[3.6rem] border-2 border-[#151515] object-cover w-[3.6rem] rounded-md"
                src={item.image}
              />
              <div className="flex flex-col -space-y-0.5 ml-3.5">
                <div className="text-[1.35rem] text-white font-[600]">
                  {item.title}
                </div>
                <div className="text-[1.1rem] text-[lightgray] font-[400]">
                  {item.question}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-baseline">
              <div className="text-[2.1rem] text-white font-[600]">
                {item?.outcomea / 100}%{" "}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </StandardPageWrapper>
  );
}
