import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic";
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";
import {
  InverseBleedOverlay,
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay";

function DesktopTopic({
  name,
  description,
  image,
  icon,
  topic,
  id,
  type,
  members,
}) {
  const router = useRouter();
  const scrollRef = useRef(null);

  const { data: membersProfiles } = useGetMembersForTopic(id);
  const { data: markets } = useGetMarketsForTopic(id);

  return (
    <StandardPageWrapper className="h-full flex  flex-col">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full h-80 relative">
            <img
              className="w-full transform rotate-180 object-cover h-80 relative -mt-40"
              alt="CoverImage"
              src={image}
            />
            <div className="h-80 w-full bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent backdrop-blur-lg absolute bottom-0" />
            <InverseBleedOverlay>
              <img
                className="size-22 md:size-26 lg:size-32 xl:size-34 ml-20 absolute -bottom-12 object-cover  rounded-[0.5rem] mb-4   z-20"
                src={image}
              />
            </InverseBleedOverlay>
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>
      <div className="full h-full overflow-y-auto pt-10 px-20 flex flex-col">
        <div className="flex flex-row  justify-between">
          <div className="flex flex-col -space-y-2">
            <div className="text-[2.8rem] text-white font-[700]">{name}</div>
            <div className="text-[1.2rem] text-[white]/[0.9] font-[400]">
              {description}
            </div>
          </div>
          <div className="flex flex-col"></div>
        </div>
        <div className="h-[0.12rem] w-full bg-[#212121] mt-3.5 mb-8" />
        <div className="text-[2.2rem] mb-3 text-[#FF0050] font-[Aeonik-Bold]">
          Top Predictions
        </div>
        <div className="flex flex-row space-x-8 mb-8">
          {markets?.map((item, index) => {
            if (index < 2)
              return (
                <DesktopTopicItem
                  question={item?.question}
                  title={item.title}
                  image={item.image}
                  created_at={item.created_at}
                  size="large"
                />
              );
          })}
        </div>
        <div className="flex flex-row space-x-5 mb-20">
          {markets?.map((item, index) => {
            return (
              <DesktopTopicItem
                question={item?.question}
                title={item.title}
                image={item.image}
                created_at={item.created_at}
                size="small"
              />
            );
          })}
        </div>
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <div className="w-full py-7 mt-20 bg-[#151515]">
              <div className="text-[1.65rem] text-white font-[700]">
                Community
              </div>
              <div>comments</div>
            </div>
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
        <div className="flex flex-col py-7">
          <div className="text-[1.65rem] my-3 text-white font-[700]">
            Popular Today
          </div>
          <div className="flex flex-row space-x-5">
            {markets?.map((item, index) => {
              if (index < 3)
                return (
                  <DesktopTopicItem
                    question={item?.question}
                    title={item.title}
                    image={item.image}
                    created_at={item.created_at}
                    size="medium"
                  />
                );
            })}
          </div>
        </div>
      </div>
    </StandardPageWrapper>
  );
}

export default DesktopTopic;

interface DesktopItemProps {
  image: string;
  title: string;
  question: string;
  outcomes: { name: string; value: number }[];
  created_at: string;
  size: "large" | "medium" | "small";
}

function DesktopTopicItem(props: DesktopItemProps) {
  const sizeClasses = {
    large: {
      container: "w-1/2",
      image: "h-[30vh]",
      title: "text-[1rem]",
      question: "text-[1.3rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.55rem]",
    },
    medium: {
      container: "w-1/3",
      image: "h-[22vh]",
      title: "text-[1rem]",
      question: "text-[1.1rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.35rem]",
    },
    small: {
      container: "w-1/4",
      image: "h-[15vh]",
      title: "text-[1rem]",
      question: "text-[1rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.25rem]",
    },
  };

  const selectedSize = sizeClasses[props.size];

  return (
    <div
      className={`${selectedSize.container} flex-col border-[0.1rem] border-[#151515] rounded-lg`}
    >
      <img
        className={`w-full ${selectedSize.image} object-cover rounded-t-lg `}
        src={props.image}
      />
      <div>slider</div>
      <div className="flex flex-col pt-2.5 rounded-b-lg pb-1.5 bg-[#151515]">
        <div className={`text-[lightgray] px-5 ${selectedSize.title}`}>
          {props.title}
        </div>
        <div
          className={`text-white font-[600] ${selectedSize.lineHeight} my-1 px-5 ${selectedSize.question}`}
        >
          {props.question}
        </div>
        <div className="h-[0.1rem] mt-3 mb-1.5 w-full bg-[#313131]" />
        <div className={`text-[lightgray] py-1 px-5 ${selectedSize.date}`}>
          1h ago - 323 Predictors
        </div>
      </div>
    </div>
  );
}
