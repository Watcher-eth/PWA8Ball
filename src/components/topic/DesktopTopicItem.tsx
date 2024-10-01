import _ from "lodash"
import Link from "next/link"
import { motion } from "framer-motion"
import { skeletonVariants } from "../ui/Skeleton"

import { getMarketPath } from "@/utils/urls"
interface Outcome {
  name: string
  value: number
}

const SIZE_CLASSES = {
  large: {
    container: "w-1/3",
    image: "h-[30vh]",
    title: "text-base",
    question: "text-[1.3rem]",
    date: "text-[0.85rem]",
    lineHeight: "leading-[1.55rem]",
  },
  medium: {
    container: "w-1/4",
    image: "h-[22vh]",
    title: "text-base",
    question: "text-[1.1rem]",
    date: "text-[0.85rem]",
    lineHeight: "leading-[1.35rem]",
  },
  small: {
    container: "w-1/5",
    image: "h-[15vh]",
    title: "text-base",
    question: "text-base",
    date: "text-[0.85rem]",
    lineHeight: "leading-[1.25rem]",
  },
}
export function DesktopTopicItem(props: {
  image: string
  title: string
  question: string
  outcomes: Outcome[]
  created_at: string
  size: keyof typeof SIZE_CLASSES
  id: string
}) {
  const selectedSize = SIZE_CLASSES[props.size]

  return (
    <Link
      href={getMarketPath(props.id)}
      className={`${selectedSize.container} hover:scale-101 active:scale-99 flex-col border-[0.1rem] border-[#151515] rounded-lg`}
    >
      <img
        className={`w-full ${selectedSize.image} object-cover rounded-t-lg `}
        src={props.image}
      />
      <div className="flex flex-col pt-2.5 rounded-b-lg pb-1.5 bg-[#151515]">
        <div className={`text-[lightgray] px-5 ${selectedSize.title}`}>
          {props.title}
        </div>
        <div
          className={`text-white font-semibold ${selectedSize.lineHeight} my-1 px-5 ${selectedSize.question}`}
        >
          {props.question}
        </div>
        <div className="h-[0.05rem] mt-3 mb-1.5 w-full bg-[#313131]" />

        <GradientBar
          percentage={Number((props.outcomes[0]?.value / 100).toFixed(2))}
          labels={[
            `${(props.outcomes[0]?.value / 100).toFixed(0)}% ${
              props.outcomes[0]?.name
            } `,
            `${props.outcomes[1]?.name} ${(
              props.outcomes[1]?.value / 100
            ).toFixed(0)}%`,
          ]}
        />
      </div>
    </Link>
  )
}

function GradientBar({
  percentage,
  labels,
}: {
  percentage: number
  labels: [string, string]
}) {
  // Ensure the percentage is between 1 and 100
  const validPercentage = Math.min(Math.max(percentage, 1), 100)

  return (
    <div className="relative m-2 mx-4 bg-[#151515] h-10 rounded-md flex items-center text-white">
      <div
        className="absolute left-0 h-full rounded-l-md"
        style={{
          width: `${validPercentage}%`,
          background: "linear-gradient(to right, #0067E1, transparent)",
        }}
      ></div>
      <div
        className="absolute h-full rounded-r-md"
        style={{
          left: `${validPercentage}%`,
          width: `${100 - validPercentage}%`,
          background: "linear-gradient(to right, transparent, #FF0050)",
        }}
      ></div>
      <div
        className="h-12 w-1.5 bg-white/[80%] rounded-md absolute z-2"
        style={{
          left: `${validPercentage}%`,
          transform: "translateX(-50%)",
          opacity: validPercentage > 12 ? 1 : 0,
        }}
      />
      <div className="absolute font-medium left-2.5 ml-2">{labels[0]}</div>
      <div className="absolute font-medium right-2.5 mr-2">{labels[1]}</div>
    </div>
  )
}
const SKELETON_SIZE_CLASSES = {
  large: {
    container: "w-1/3 h-full",
    image: "h-[30vh]",
    title: "text-base",
    question: "text-[1.3rem]",
    date: "text-[0.85rem]",
    lineHeight: "leading-[1.55rem]",
  },
  medium: {
    container: "w-1/4 h-full",
    image: "h-[22vh]",
    title: "text-base",
    question: "text-[1.1rem]",
    date: "text-[0.85rem]",
    lineHeight: "leading-[1.35rem]",
  },
  small: {
    container: "w-1/5 h-full",
    image: "h-[15vh]",
    title: "text-base",
    question: "text-base",
    date: "text-[0.85rem]",
    lineHeight: "leading-[1.25rem]",
  },
} as const

export function DesktopTopicItemSkeleton({
  size,
  index,
}: {
  size: keyof typeof SKELETON_SIZE_CLASSES
  index: number
}) {
  const selectedSize = SKELETON_SIZE_CLASSES[size]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`${selectedSize.container} hover:scale-101 active:scale-99 flex-col border-[0.1rem] border-[#151515] rounded-lg`}
    >
      <motion.div
        className={`w-full ${selectedSize.image} bg-[#101010] rounded-t-lg`}
        variants={skeletonVariants}
        initial="initial"
        animate="pulse"
      />

      <div className="flex flex-col pt-4 rounded-b-lg pb-1.5 bg-[#151515]">
        <motion.div
          className={`text-[lightgray] w-[40%] my-1 mx-2 ${selectedSize.title} bg-[#212121] h-[18px] rounded-full`}
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <motion.div
          className={`text-[lightgray] my-1 mx-2 ${selectedSize.title} bg-[#212121] h-[20px] rounded-full`}
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <motion.div
          className={`text-white font-semibold w-[70%] my-1 mx-2 ${selectedSize.lineHeight} my-1 px-5 ${selectedSize.question} bg-[#212121] h-[20px] rounded-full`}
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <div className="h-[0.05rem] mt-5 mb-1.5 w-full bg-[#242424]" />
        <div className="flex flex-row justify-between">
          <motion.div
            className={`text-[lightgray] w-[22%] py-1 mx-2 my-1 px-5 ${selectedSize.date} bg-[#212121] h-[15px] rounded-full`}
            variants={skeletonVariants}
            initial="initial"
            animate="pulse"
          />
          <motion.div
            className={`text-[lightgray] w-[35%] py-1 mx-2 my-1 px-5 ${selectedSize.date} bg-[#212121] h-[15px] rounded-full`}
            variants={skeletonVariants}
            initial="initial"
            animate="pulse"
          />
        </div>
      </div>
    </motion.div>
  )
}
