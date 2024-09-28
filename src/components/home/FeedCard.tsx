// @ts-nocheck

import { getMarketPath } from "@/utils/urls"
import Link from "next/link"

export function FeedCard({
  image,
  title,
  description,
  icon,
  id,
  outcomeA,
  optionA,
}) {
  return (
    <div>
      <Link href={getMarketPath(id)} prefetch={true}>
        <DisplayFeedCard
          image={image}
          title={title}
          description={description}
          icon={icon}
          setIsDrawerOpen={() => {}}
          odds={optionA?.odds}
          optionA={optionA?.name}
        />
      </Link>
    </div>
  )
}

function DisplayFeedCard({ image, title, description, icon, odds, optionA }) {
  return (
    <div
      className={`
        flex items-start flex-col rounded-lg w-full max-h-[27rem] justify-end h-[105vw] relative
         shadow-md hover:scale-101 active:scale-98 transition-all
        cursor-pointer 
      `}
    >
      <div className=" absolute w-full h-full">
        <div className="absolute inset-0 bg-[#212121] animate-pulse rounded-lg z-1"></div>
        <img
          alt="Card_Preview"
          src={image}
          className="w-full h-full absolute object-cover rounded-lg z-2 transition-opacity duration-500 ease-in-out opacity-0"
          onLoad={(e) => {
            const imgElement = e.target as HTMLImageElement
            imgElement.classList.remove("opacity-0")
            imgElement.classList.add("opacity-100")
          }}
        />
      </div>
      <div
        className={`
          h-[50vw] w-full   max-h-[21.5rem]
          rounded-b-lg bg-gradient-to-t from-[#151515]/85 to-transparent
          absolute bottom-0 z-2 
        `}
      />
      <div className="absolute top-4 z-3 right-3 text-[0.9rem] bg-[#101010]/10 text-white font-[600] p-2.5 py-1 rounded-full backdrop-blur-lg border-[0.07rem] border-[#090909]/5">
        {odds.toFixed(1)}% {optionA !== "Yes" ? optionA : "Chance"}
      </div>
      <div
        style={{
          lineHeight: "2.3rem",
        }}
        className={`${
          title?.length < 13 ? "text-[2.3rem]" : "text-[2.1rem]"
        } text-start mb-[0.2rem] pr-10 pb-0 p-3 text-white text-bold font-[Benzin-Bold] z-2`}
      >
        {title}
      </div>
      <div
        className={`
          z-2
          rounded-b-lg w-full items-center p-3 px-3
          bg-gray-900/10
          backdrop-blur-lg flex
          border-[0.5px] border-white/5
        `}
      >
        <img
          className="h-[12vw] max-w-[3.4rem] max-h-[3.4rem] object-cover rounded-md w-[12vw] relative"
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
  )
}
