// @ts-nocheck
import _ from "lodash";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useGetTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";
import { useGetUsersByName } from "@/supabase/queries/useGetUsersByName";
import { useGetMarketsByQuestion } from "@/supabase/queries/search/useGetMarketsByQuestion";
import { useOverlaySearch } from "@/hooks/useOverlaySearch";
import { MarketItem, TopicItem, FriendItem } from "./SearchItem";
import { SearchInputSection } from "./SearchInputSection";
import { Spinner } from "@/components/modals/PredictModal/Spinner";
import { useGetAllMarkets } from "@/graphql/queries/markets/useGetAllMarkets";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { useSearchMarkets } from "@/graphql/queries/search/useSearchMarkets";
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";

const friends = [
  { name: "Tony Blair", handle: "@tblair", time: "32m" },
  { name: "Simon", handle: "@xyzsimon", time: "2h" },
];

export function SearchOverview() {
  const [debouncedText, setDebouncedText] = useState("");
  const { markets: allMarkets, loading: loadingMarkets } = useGetAllMarkets();

  const trendingMarkets = enhanceMarketsWithImageAndPolyId(
    allMarkets,
    HARD_MARKETS,
    HARD_TOPICS
  );
  const { data: users, isLoading: loadingUsers } =
    useGetUsersByName(debouncedText);
  const { markets: searchMarkets, loading: loadingQuestion } =
    useSearchMarkets(debouncedText);

  const isLoading = loadingUsers || loadingMarkets || loadingQuestion;

  const displayedSearchMarkets =
    enhanceMarketsWithImageAndPolyId(searchMarkets, HARD_MARKETS, HARD_TOPICS)
      ?.slice(0, 5)
      .map((obj, idx) => ({
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
  }

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
    _.debounce((text) => {
      setDebouncedText(text);
    }, 300),
    []
  );

  return (
    <div className="rounded-2xl p-2 w-full transition-all duration-300">
      <SearchInputSection value={searchStr} onChange={handleSearch} />
      <AnimatePresence>
        <div
          className={`transition-all flex flex-col  items-center min-h-[45vh] duration-300`}
          style={{
            height: `calc(${masterList.length * 60}px+60px)`,
          }}
        >
          {searchStr &&
            (masterList.length == 0 && !isLoading ? (
              <div className="flex flex-col items-center">
                <img
                  src="https://media.tenor.com/vpCPcxEuI-cAAAAj/john-tr.gif"
                  className="h-[15vh] "
                />
                <div className="text-center mt-4 text-white text-lg font-[Aeonik-Bold]">
                  This future hasn't been predicted yet
                </div>
                <div className="text-center text-[lightgray] text-md font-[Aeonik]">
                  Try searching for something else...
                </div>
              </div>
            ) : isLoading ? (
              <Spinner loading={isLoading} />
            ) : (
              <>
                {searchMarkets?.length > 0 && (
                  <Section title="Predictions">
                    {displayedSearchMarkets?.map((market, index) => (
                      <MarketItem
                        key={index}
                        currentIdx={currentIdx}
                        idx={market.idx}
                        title={market.title}
                        subtitle={market.question}
                        time={market?.outcomeOddsA}
                        option={market?.outcomeA}
                        type={market.type}
                        image={market.image}
                        id={market?.marketId}
                      />
                    ))}
                  </Section>
                )}
                {users?.length > 0 && (
                  <Section title="Users">
                    {displayedUsers?.map((user, index) => (
                      <FriendItem
                        walletAddress={user?.walletAddress}
                        key={index}
                        currentIdx={currentIdx}
                        idx={user.idx}
                        name={user.name}
                        handle={user.handle}
                        time={user.time}
                        image={user.pfp}
                        id={user.external_auth_provider_user_id}
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
                    key={index}
                    currentIdx={currentIdx}
                    idx={market.idx}
                    title={market.title}
                    subtitle={market.question}
                    time={market?.outcomeOddsA}
                    option={market?.outcomeA}
                    type={"market.type"}
                    image={market.image}
                    id={market?.marketId}
                  />
                ))}
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
                    walletAddress={friend?.walletAddress}
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
                ))}
              </Section>
            </>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-4 w-full">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <div className="-ml-1 w-full">{children}</div>
    </div>
  );
}
