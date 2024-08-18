// @ts-nocheck
import Link from "next/link";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { getMarketPath, getProfilePath, getTopicPath } from "@/utils/urls";

export function MarketItem({
  id,
  title,
  subtitle,
  time,
  type,
  image,
  idx,
  currentIdx,
}) {
  return (
    <Link href={getMarketPath(id)} prefetch={true}>
      <SearchItem
        title={title}
        subtitle={subtitle}
        rightText={time}
        image={image}
        isImgRounded={false}
        type={type}
        idx={idx}
        currentIdx={currentIdx}
      />
    </Link>
  );
}

export function TopicItem({
  topidId,
  title,
  subtitle,
  members,
  type,
  image,
  idx,
  currentIdx,
}) {
  return (
    <Link href={getTopicPath(topidId)} prefetch={true}>
      <SearchItem
        title={title}
        subtitle={subtitle}
        rightText={members}
        image={image}
        type={type}
        isImgRounded={false}
        icon={<Users className="h-[0.9rem] text-gray-400" strokeWidth={2.7} />}
        idx={idx}
        currentIdx={currentIdx}
      />
    </Link>
  );
}

export function FriendItem({ name, handle, time, image, idx, currentIdx, id }) {
  return (
    <Link href={getProfilePath(id)} prefetch={true}>
      <SearchItem
        title={name}
        subtitle={handle}
        rightText={time}
        image={image}
        isImgRounded={true}
        idx={idx}
        currentIdx={currentIdx}
      />
    </Link>
  );
}

export function SearchItem({
  title,
  subtitle,
  image,
  type,
  isImgRounded,
  icon,
  rightText,
  idx,
  currentIdx,
}: {
  title: string;
  subtitle: string;
  image: string;
  type: string;
  isImgRounded: boolean;
  icon: React.ReactNode;
  rightText: string;
  idx: number;
  currentIdx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      className={`
        flex items-center justify-between p-2 rounded-md
         ransition-all duration-150 cursor-pointer
        ring-1 ring-transparent
        hover:!bg-[#151515]/80 hover:!ring-white/10 hover:!scale-101
        active:!scale-99
        ${
          idx === currentIdx
            ? "!ring-white/10 bg-[#151515]/50 !scale-101"
            : "scale-100"
        }
      `}
    >
      <div className="flex items-center space-x-3">
        {image ? (
          <img
            src={image}
            className={`w-9 h-9 object-cover ${
              isImgRounded ? "rounded-full" : "rounded-[0.2rem]"
            }`}
          />
        ) : (
          <div className="w-9 h-9 bg-gradient-to-r object-cover from-purple-400 via-pink-500 to-red-500 rounded-full"></div>
        )}
        <div>
          <p className="text-white">{title}</p>
          <p className="text-[#909090] line-clamp-1 text-sm">{subtitle}</p>
        </div>
        {type === "album" && (
          <span className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">
            ALBUM
          </span>
        )}
      </div>
      <div className="flex flex-row items-center  min-w-20 justify-end pr-2">
        <p className="text-[#909090] text-sm">{rightText}</p>
        {icon}
      </div>
    </motion.div>
  );
}
