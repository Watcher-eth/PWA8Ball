// @ts-nocheck
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import debounce from "lodash/debounce";
import { useGetTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";
import { useGetUsersByName } from "@/supabase/queries/useGetUsersByName";
import { useGetMarketsByQuestion } from "@/supabase/queries/search/useGetMarketsByQuestion";
import { useOverlaySearch } from "@/hooks/useOverlaySearch";
import {
  MarketItem,
  TopicItem,
  FriendItem,
} from "./SearchItem";
import { SearchInputSection } from "./SearchInputSection";

const friends = [
  { name: "James Blair", handle: "@jblair", time: "32m" },
  { name: "Simon", handle: "@xyzsimon", time: "2h" },
];

export function SearchOverview() {

  const [debouncedText, setDebouncedText] = useState("");
  const { data: trendingMarkets } = useGetTrendingMarkets();
  const { data: users } = useGetUsersByName(debouncedText);
  const { data: searchMarkets } = useGetMarketsByQuestion(debouncedText);

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

  function handleSearch(e) {
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

  return (
    <div className="rounded-2xl p-2 w-full transition-all duration-300">
      <SearchInputSection value={searchStr} onChange={handleSearch} />
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
                      <MarketItem
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
                {displayedTrendingMarkets.map((market, index) => (
                    <MarketItem
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
                  )
                )}
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
                {displayedTrendingTopics?.map((market, index) => (
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
                  )
                )}
              </Section>
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <div className="-ml-1">{children}</div>
    </div>
  )
}
