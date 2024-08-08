import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic";
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import { useRouter } from "next/router";
import React, { useRef } from "react";

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
    <div className="flex flex-col items-center w-full">
      <img className="h-20 w-full rounded-md" src={image} />
      
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-row items-center">
          <img className="h-10 w-10 rounded-md" src={image} />
        </div>
        <div className="flex flex-col"></div>
      </div>
      <div className="h-1 w-full bg-[#212121] mt-1 mb-10" />
      <div className="text-[1.5rem] text-[#FF0050] font-[700]">
        Top Predictions
      </div>
      <div className="flex flex-row">
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
      <div className="flex flex-row">
        {markets?.map((item, index) => {
          if (index > 2 && index < 6)
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
      <div className=" py-7 bg-[#181818]">
        <div className="text-[1.25rem] text-white font-[700]">Community</div>
        <div>comments</div>
      </div>
      <div className="flex flex-col py-7">
        <div className="text-[1.25rem] text-white font-[700]">
          Popular Today
        </div>
        <div className="flex flex-row">
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
    },
    medium: {
      container: "w-1/3",
      image: "h-[22vh]",
      title: "text-[1rem]",
      question: "text-[1.3rem]",
      date: "text-[0.85rem]",
    },
    small: {
      container: "w-1/4",
      image: "h-[15vh]",
      title: "text-[1rem]",
      question: "text-[1.3rem]",
      date: "text-[0.85rem]",
    },
  };

  const selectedSize = sizeClasses[props.size];

  return (
    <div className={`${selectedSize.container} flex-col rounded-md`}>
      <img className={`w-full ${selectedSize.image}`} src={props.image} />
      <div>slider</div>
      <div className="flex flex-col pt-2.5 pb-1.5 bg-[#181818]">
        <div className={`text-white px-5 ${selectedSize.title}`}>
          {props.title}
        </div>
        <div className={`text-white px-5 ${selectedSize.question}`}>
          {props.question}
        </div>
        <div className="h-1 w-full bg-[#212121]" />
        <div className={`text-lightgray px-5 ${selectedSize.date}`}>
          {props.created_at}
        </div>
      </div>
    </div>
  );
}
