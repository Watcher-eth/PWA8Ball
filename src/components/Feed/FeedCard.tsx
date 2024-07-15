// @ts-nocheck

import "../../styles/fonts.css";

import { getMarketPath } from "@/utils/urls";
import Link from "next/link";

export function FeedCard({ image, title, description, icon, id }) {
  return (
    <div>
      <Link href={getMarketPath(id)} prefetch={true}>
        <DisplayFeedCard
          image={image}
          title={title}
          description={description}
          icon={icon}
          setIsDrawerOpen={() => {}}
        />
      </Link>
    </div>
  );
}

function DisplayFeedCard({ image, title, description, icon }) {
  return (
    <div
      className={`
        flex items-start flex-col rounded-lg w-[88vw] max-w-[21.5rem] max-h-[27rem] justify-end h-[105vw] relative
        shadow-transparent shadow-md hover:shadow-purple-400/30 hover:scale-10 active:scale-98 transition-all
        cursor-pointer font-[Aeonik-Bold]
      `}
    >
      <img
        alt="Card_Preview"
        src={image}
        className="w-full h-full absolute  object-cover rounded-lg z-[2]"
      />
      <div
        className={`
          h-[50vw] w-[88vw] max-w-[21.5rem] max-h-[21.5rem]
          rounded-b-lg bg-gradient-to-t from-[#171717]/85 to-transparent
          absolute bottom-0 z-[2]
        `}
      />
      <div
        style={{
          lineHeight: "2.3rem",
        }}
        className="text-[2.3rem] text-start mb-[0.2rem] pr-10 pb-0 p-3 text-white text-bold font-[Benzin-Bold] z-[2]"
      >
        {title}{" "}
      </div>
      <div
        className={`
          z-[2]
          rounded-b-lg w-[88vw] max-w-[21.5rem] items-center p-3 px-3
          bg-gray-800/20
          backdrop-blur-lg flex
          border-[0.5px] border-white/5
        `}
      >
        <img
          className="h-[13vw] max-w-[3.4rem] max-h-[3.4rem] object-cover rounded-md w-[13vw] relative"
          src={icon}
        />
        <div
          style={{ fontFamily: "Aeonik" }}
          className="text-[1.1rem] text-start  line-clamp-2 leading-[1.1rem] text-white max-w-[65vw] ml-3 "
        >
          {description}
        </div>
      </div>
    </div>
  );
}
