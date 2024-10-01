import Link from "next/link"
import { getMarketPath } from "@/utils/urls"


export function RelatedMarketQuestion({
  id,
  option,
  currentprob,
  initialprob,
  image,
  question,
  options,
  title,
  isDesktop,
}: {
  id: number
  option: number
  currentprob: number
  initialprob: number
  image: string
  question: string
  options: any
  title: string
  isDesktop: boolean
}) {
  return (
    <Link href={getMarketPath(id)} prefetch={true}>
      <div
        className={`
          flex flex-row items-center
         rounded-[10px] cursor-pointer
          ${isDesktop ? "bg-transparent py-1.5 " : "bg-[#191919]   p-2"}
          transition-all
        `}
      >
        <img
          className="h-[54px] w-[54px] rounded-[6px] object-cover"
          src={image}
          alt={title}
        />
        <div className="flex flex-col ml-[9px] -space-y-0.5">
          <span className="line-clamp-1 font-medium text-[16px] text-[lightgray] max-w-[73vw] mb-[1px] overflow-hidden">
            {question}
          </span>
          <span className="text-lg font-[600] text-white">
            {currentprob ?? initialprob}%{" "}
            {option === 0 ? options[option + 1].name : options[option - 1].name}
          </span>
        </div>
      </div>
    </Link>
  )
}
