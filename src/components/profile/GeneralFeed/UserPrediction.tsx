// @ts-nocheck

import { Plus } from "lucide-react"
import Link from "next/link"
import { getMarketPath } from "@/utils/urls"

import { ProfilePrediction } from "./ProfilePrediction"

export function UserPrediction({
  index,
  image,
  question,
  amount,
  title,
  option,
  optional,
  betId,
}) {
  return (
    <ProfilePrediction
      image={image}
      question={question}
      title={title}
      index={index}
      rightContent={
        <div
          className={` rounded-full    border-[0.1rem] border-[#202020]      ${
            optional === 1
              ? "bg-gradient-to-tl from-[#4dafffcc] from-10%   to-[#181818] to-30%"
              : "bg-gradient-to-tl from-[#ff3f3fe6]  from-10% to-[#181818] to-30%"
          }
`}
        >
          <div
            className={`${
              optional === 1 ? "text-[#4DAFFF]/90" : "text-[#FF3F3F]/90"
            }
            py-1 rounded-full  text-[0.95rem] backdrop-blur-md font-semibold
            ${option === "No" ? "px-3" : "px-2.5"}
          `}
          >
            {option?.length < 8 ? option : option?.substring(0, 3)}
          </div>
        </div>
      }
    />
  )
}

import React from "react"

const UserPredictionChip = (props) => {
  const isOptionZero = props?.optional === 0
  const optionText =
    props.option?.length < 8 ? props.option : props.option?.substring(0, 3)

  return (
    <div className="relative flex items-center space-x-3">
      <div
        className={`relative flex items-center justify-center rounded-lg
          border border-gray-800
          ${
            isOptionZero
              ? "bg-gradient-to-r from-red-500 to-transparent"
              : "bg-gradient-to-r from-blue-500 to-transparent"
          }
          backdrop-blur-md
          ml-[-50px] p-1`}
      >
        {/* Blur and Border */}
        <div className="bg-black bg-opacity-20 backdrop-blur-lg rounded-lg border border-gray-900 px-4 py-2">
          <p
            className={`font-bold text-lg opacity-85 ${
              isOptionZero ? "text-red-500" : "text-blue-400"
            }`}
          >
            {optionText}
          </p>
        </div>
      </div>
    </div>
  )
}

export function CreatedPrediction({
  index,
  image,
  question,
  amount,
  title,
  id,
}) {
  return (
    <Link
      href={getMarketPath(id)}
      className={`transition-all  hover:scale-101 active:scale-95`}
    >
      <ProfilePrediction
        image={image}
        question={question}
        title={title}
        index={index}
        rightContent={
          <div
            className={`relative flex items-center justify-center rounded-lg
            border border-gray-800
            bg-gradient-to-r from-[#5ACE5A] via-[#5ACE5A]/20 to-[#5ACE5A]/10

            backdrop-blur-md
            ml-[-50px] `}
          >
            <div className="bg-black bg-opacity-20 backdrop-blur-lg rounded-lg border border-gray-900">
              <div className="p-1.5  rounded-full">
                <Plus
                  fill={"white"}
                  color={"white"}
                  size={15}
                  strokeWidth={6.5}
                />
              </div>
            </div>
          </div>
        }
      />
    </Link>
  )
}
