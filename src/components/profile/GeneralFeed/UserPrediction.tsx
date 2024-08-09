// @ts-nocheck

import { Plus } from "lucide-react";
import Link from "next/link";
import { getMarketPath } from "@/utils/urls";

import { ProfilePrediction } from "./ProfilePrediction";
import { trackViewMarket } from "@/lib/events/StandardEvents";

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
          className={`
            py-1 rounded-full text-white font-bold
            ${option === "No" ? "px-3" : "px-2"}
            ${optional === 1 ? "bg-[#0050FF]" : "bg-[#FF0050]"}
          `}
        >
          {option?.length < 8 ? option : option?.substring(0, 3)}
        </div>
      }
    />
  );
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
      onClick={() => trackViewMarket(id, "pwa")}
      href={getMarketPath(id)}
      className="transition-all hover:scale-101 active:scale-95"
    >
      <ProfilePrediction
        image={image}
        question={question}
        title={title}
        index={index}
        rightContent={
          <div className="p-1.5 rounded-full bg-[#5ACE5A]">
            <Plus fill={"white"} color={"white"} size={15} strokeWidth={6.5} />
          </div>
        }
      />
    </Link>
  );
}
