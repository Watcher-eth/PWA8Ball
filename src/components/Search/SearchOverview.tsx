// @ts-nocheck
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import debounce from "lodash/debounce";
import { useGetTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";
import { useGetUsersByName } from "@/supabase/queries/useGetUsersByName";
import { useGetMarketsByQuestion } from "@/supabase/queries/search/useGetMarketsByQuestion";
import { useOverlaySearch } from "@/hooks/useOverlaySearch";
import { getMarketPath, getProfilePath, getTopicPath } from "@/utils/urls";
import Link from "next/link";

const friends = [
  { name: "James Blair", handle: "@jblair", time: "32m" },
  { name: "Simon", handle: "@xyzsimon", time: "2h" },
];

export const SearchOverview = () => {
  const {
    data: trendingMarkets,
    isLoading: trendingLoading,
    error: trendingError,
  } = useGetTrendingMarkets();
  const [debouncedText, setDebouncedText] = useState("");

  const { data: users, isLoading: usersLoading } =
    useGetUsersByName(debouncedText);
  const {
    data: searchMarkets,
    isLoading: marketsLoading,
    error: marketsError,
  } = useGetMarketsByQuestion(debouncedText);

  const displayedSearchMarkets =
    searchMarkets?.slice(0, 5).map((obj, idx) => ({
      ...obj,
      idx,
    })) ?? [];
  const displayedUsers =
    users?.slice(0, 5).map((obj, idx) => ({
      ...obj,
      idx: displayedSearchMarkets?.length + idx,
    })) ?? [];

  const displayedTrendingMarkets =
    trendingMarkets?.slice(0, 4).map((obj, idx) => ({
      ...obj,
      idx,
    })) ?? [];
  const displayedFriends =
    friends?.slice(0, 5).map((obj, idx) => ({
      ...obj,
      idx: displayedTrendingMarkets?.length + idx,
    })) ?? [];
  const displayedTrendingTopics =
    trendingMarkets?.slice(0, 3).map((obj, idx) => ({
      ...obj,
      idx: displayedFriends?.length + displayedTrendingMarkets?.length + idx,
    })) ?? []; //trendingMarkets?.slice(4, 7);

  const { overlayRef, onSearch, currentIdx, searchStr, onClose } =
    useOverlaySearch(
      () => getMasterList().length,
      () => {}
    );

  const handleSearch = (e) => {
    onSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  // this part is black magic fuckery that needs to be properly rewritten
  function getMasterList() {
    let arr;
    if (searchStr) {
      arr = [...displayedSearchMarkets, ...displayedUsers];
    } else {
      arr = [
        ...displayedTrendingMarkets,
        ...displayedFriends,
        ...displayedTrendingTopics,
      ];
    }
    return arr;
  }
  const masterList = getMasterList();

  const debouncedSearch = useCallback(
    debounce((text) => {
      setDebouncedText(text);
    }, 300),
    []
  );

  let searchResult;

  return (
    <div
      className="rounded-2xl p-2 w-full transition-all duration-300"
    >
      <div className="relative flex items-center align-center mb-4">
        <Search className="h-5 w-5 text-[#707070]" strokeWidth={3} />
        <input
          type="text"
          value={searchStr}
          onChange={handleSearch}
          placeholder="Search for predictions..."
          className={`
            w-full outline-none border-0
            py-2 px-4
            bg-[transparent] text-white placeholder-[#707070]
            text-[1rem] rounded-lg
          `}
        />
      </div>
      <AnimatePresence>
        <div
          className={`transition-all duration-300`}
          style={{
            height: `calc(${masterList.length * 60}px+60px)`,
          }}
        >
          {searchStr &&
            (masterList.length == 0 ? (
              <div className="text-center text-gray-400 text-sm">
                No results found
              </div>
            ) : (
              <>
                {searchMarkets?.length > 0 && (
                  <Section title="Suggested">
                    {displayedSearchMarkets?.map((market, index) => (
                      <Item
                        key={index}
                        currentIdx={currentIdx}
                        idx={market.idx}
                        title={market.title}
                        subtitle={market.question}
                        time={3.22}
                        type={market.type}
                        image={market.image}
                      />
                    ))}
                  </Section>
                )}
                {users?.length > 0 && (
                  <Section title="Users">
                    {displayedUsers?.map((user, index) => (
                      <FriendItem
                        key={index}
                        currentIdx={currentIdx}
                        idx={user.idx}
                        name={user.name}
                        handle={user.handle}
                        time={user.time}
                        image={user.pfp}
                      />
                    ))}
                  </Section>
                )}
              </>
            ))}
          {!searchStr.length > 0 && (
            <>
              <Section title="Suggested">
                {displayedTrendingMarkets.map((market, index) => {
                  return (
                    <Item
                      id={market.id}
                      key={index}
                      currentIdx={currentIdx}
                      idx={market.idx}
                      title={market.title}
                      subtitle={market.question}
                      time={3.22}
                      type={"market.type"}
                      image={market.image}
                    />
                  );
                })}
              </Section>
              <Section title="Friends">
                {displayedFriends.map((friend, index) => (
                  <FriendItem
                    key={index}
                    currentIdx={currentIdx}
                    idx={friend.idx}
                    name={friend.name}
                    handle={friend.handle}
                    time={friend.time}
                  />
                ))}
              </Section>
              <Section title="Trending Topics">
                {displayedTrendingTopics?.map((market, index) => {
                  return (
                    <TopicItem
                      topidId={market.topic_id}
                      key={index}
                      currentIdx={currentIdx}
                      idx={market.idx}
                      title={market?.topic_title}
                      subtitle={market?.topic_description}
                      members={420}
                      type={"market.type"}
                      image={market.topic_image}
                    />
                  );
                })}
              </Section>
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-[#707070] text-sm mb-2">{title}</h3>
    <div className="-ml-1">{children}</div>
  </div>
);

const Item = ({ id, title, subtitle, time, type, image, idx, currentIdx }) => {
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
};

const TopicItem = ({
  topidId,
  title,
  subtitle,
  members,
  type,
  image,
  idx,
  currentIdx,
}) => {
  return (
    <Link href={getTopicPath(topidId)} prefetch={true}>
      <SearchItem
        title={title}
        subtitle={subtitle}
        rightText={members}
        image={image}
        type={type}
        isImgRounded={false}
        icon={<Users className="h-[0.9rem] text-[#707070]" strokeWidth={2.7} />}
        idx={idx}
        currentIdx={currentIdx}
      />
    </Link>
  );
};

const FriendItem = ({ name, handle, time, image, idx, currentIdx }) => {
  return (
    <Link href={getProfilePath(handle)} prefetch={true}>
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
};

function SearchItem({
  title,
  subtitle,
  image,
  type,
  isImgRounded,
  icon,
  rightText,
  idx,
  currentIdx,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      className={`
        flex items-center justify-between p-2 rounded-md
         transition-all duration-150 cursor-pointer
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
