// @ts-nocheck

import { motion } from "framer-motion"
import { useRouter } from "next/router"

import { Users } from "lucide-react"
import Link from "next/link"

export function BetBigView({
  marketId,
  title,
  question,
  image,
  topic,
  option1,
  option2,
}) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      style={{ borderRadius: 20 }}
      className=" my-1.5"
    >
      <motion.div
        style={{ borderRadius: 12 }}
        className="flex flex-col  w-full mx-auto my-2 relative cursor-pointer"
        onClick={() =>
          router.push({
            pathname: "/[id]",
            query: {
              id: marketId,
              name: title,
              description: question,
              icon: "icon",
              image,
              topic,
            },
          })
        }
      >
        <img
          src={image}
          alt="Market Image"
          style={{ borderRadius: 12 }}
          className="w-full h-[25vh] active:scale-99 hover:scale-101 rounded-lg object-cover"
        />
        <div
          className="absolute top-[20vh] w-full h-16 bg-gradient-to-t from-[#080808] to-transparent rounded-b-lg"
          style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
        ></div>
        <div className="absolute top-3 right-3 flex items-center bg-[#909090]/10 border-[0.07rem] border-[#999999]/20 backdrop-blur-md px-2 pr-1 p-1 rounded-lg z-10">
          <span className="text-white font-[600] text-sm mr-0">223</span>
          <Users className="text-white" strokeWidth={3.2} height={13} />
        </div>

        <p className="text-lg text-white mt-4 mb-[-0.2rem] font-medium z-10 leading-[1.2]">
          {question}
        </p>
        {option1.image ? (
          <PollingComponentImage
            yesValue={option1.odds}
            noValue={option2.odds}
            option1={option1.name}
            option2={option2.name}
          />
        ) : (
          <PollingComponent
            yesValue={option1.odds}
            noValue={option2.odds}
            option1={option1.name}
            option2={option2.name}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export function BetSmallView({
  marketId,
  title,
  question,
  image,
  topic,
}) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="active:scale-98 my-1.5"
    >
      <motion.div
        className="flex no-scrollbar active:scale-98 mb-2 mt-[-0.48rem] flex-row p-2 py-2 bg-[#141414] rounded-lg w-[101%] mx-0 ml-[-0.15rem] my-0 items-center"
        onClick={() =>
          router.push({
            pathname: "/[id]",
            query: {
              id: marketId,
              name: title,
              description: question,
              icon: "icon",
              image,
              topic,
            },
          })
        }
        style={{ borderRadius: 15 }}
      >
        <img
          src={image}
          style={{ borderRadius: 10 }}
          alt="Market Image"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex flex-col ml-2 -gap-0.5">
          <span className="text-[lightgray] text-sm">Trending Today</span>
          <p
            style={{ lineClamp: 2, lineHeight: 1.3 }}
            className="text-white line-clamp-2  text-[1.2rem] font-[600] "
          >
            {question}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PollingComponent({ yesValue, noValue, option1, option2 }) {
  const total = yesValue / 100 + noValue / 100
  const yesPercentage = (yesValue / 100 / total) * 100
  const noPercentage = (noValue / 100 / total) * 100
  console.log("Values", yesValue, noValue)
  return (
    <div className="flex no-scrollbar items-center p-2 px-0 my-1   w-full">
      <motion.div
        className="flex items-center h-10 justify-start bg-[#181818] px-4 w-full rounded-l-lg p-2 text-white font-[600]"
        style={{
          width: `${noPercentage}vw`,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          fontSize: 15,
        }}
      >
        {noPercentage.toFixed(0)}%{" "}
        {noPercentage < 45 ? String(option1).substring(0, 3) : option1}
      </motion.div>
      <div className="w-[0.35em] bg-white h-12 mx-[0.3rem] rounded-full"></div>
      <motion.div
        className="flex items-center h-10 justify-end bg-white w-full rounded-r-lg p-2 px-4  text-[#181818] font-[600]"
        style={{
          width: `${yesPercentage}vw`,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          fontSize: 15,
        }}
      >
        {yesPercentage < 45 ? String(option2).substring(0, 3) : option2}{" "}
        {yesPercentage.toFixed(0)}%
      </motion.div>
    </div>
  )
}

const MAX_LENGTH = 11

export const PollingComponentImage = ({
  yesValue,
  noValue,
}) => {
  const total = yesValue.amount + noValue.amount
  const yesPercentage = (yesValue.amount / total) * 100
  const noPercentage = (noValue.amount / total) * 100

  return (
    <div className="flex items-center p-2 my-1">
      <motion.div
        className="flex items-center h-10 justify-between bg-[#FF0050] rounded-l-lg p-2 text-white font-bold"
        style={{
          width: `${noPercentage}%`,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          fontSize: 13,
        }}
      >
        <span>
          {noPercentage.toFixed(0)}%{" "}
          {noValue.name.length > MAX_LENGTH
            ? `${noValue.name.slice(0, MAX_LENGTH)}`
            : noValue.name}
        </span>
        <img
          style={{ borderRadius: 6 }}
          src={noValue.image}
          alt="option"
          className="size-8 rounded-md object-cover ml-2"
        />
      </motion.div>
      <div className="w-1 bg-white h-12 mx-1 rounded-full"></div>
      <motion.div
        className="flex items-center h-10 justify-between bg-[#0067E1] rounded-r-lg p-2 text-white font-bold"
        style={{
          width: `${yesPercentage}%`,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          fontSize: 13,
        }}
      >
        <img
          src={yesValue.image}
          style={{ borderRadius: 6 }}
          alt="option"
          className="size-8 rounded-md object-cover mr-2"
        />
        <span>
          {yesValue.name.length > MAX_LENGTH
            ? `${yesValue.name.slice(0, MAX_LENGTH)}`
            : yesValue.name}{" "}
          {yesPercentage.toFixed(0)}%
        </span>
      </motion.div>
    </div>
  )
}
