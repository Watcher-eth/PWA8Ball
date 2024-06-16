import Image from "next/image";
import React from "react";

interface LeaderboardItem {
  name: string;
  image: string;
  value: string;
  rank: string;
  rightValues: string[];
}

function LeaderboardItem(props: LeaderboardItem) {
  return (
    <div className="w-[90vw] rounded-xl flex justify-between items-center p-2">
      <div className="flex items-center">
        <div className="text-[0.8rem] text-gray-200">{props?.rank}</div>
        <div className="h-9 w-9 mx-1 relative">
          <Image objectFit="fill" src={props.image} />
        </div>
        <div className="flex flex-col">
          <div className="text-[1.1rem] text-gray-200">{props?.name}</div>
          <div className="text-[1rem] text-white">{props?.value}</div>
        </div>
      </div>
      <div>
        {props?.rightValues?.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
}

export default LeaderboardItem;
