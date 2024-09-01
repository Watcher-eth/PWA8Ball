import _ from "lodash";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useGetTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";
import { useGetUsersByName } from "@/supabase/queries/useGetUsersByName";
import { useGetMarketsByQuestion } from "@/supabase/queries/search/useGetMarketsByQuestion";
import { useOverlaySearch } from "@/hooks/useOverlaySearch";
import { Input } from "../ui/Input";
import { FriendItem, MarketItem, TopicItem } from "./SearchOverview/SearchItem";
import { Spinner } from "../modals/PredictModal/Spinner";
import { useSearchMarkets } from "@/graphql/queries/search/useSearchMarkets";
import { enhanceMarketsWithImageAndPolyId } from "@/utils/predictions/enhanceMarketsWithImageAndPolyId";
import { HARD_MARKETS } from "@/constants/markets";
import { HARD_TOPICS } from "@/constants/topics";
import { useGetAllMarkets } from "@/graphql/queries/markets/useGetAllMarkets";
const friends = [
  { name: "Tony Blair", handle: "@tblair", time: "32m" },
  { name: "Simon", handle: "@xyzsimon", time: "2h" },
];

export function MobileSearchPage() {
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
    })) ?? [];

  const { overlayRef, onSearch, currentIdx, searchStr, onClose } =
    useOverlaySearch(
      () => getMasterList().length,
      () => {}
    );

  function handleSearch(e) {
    onSearch(e.target.value);
    debouncedSearch(e.target.value);
  }

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

  console.log("markets", searchMarkets);
  return (
    <div className="flex flex-col gap-6 p-6 py-10 bg-[#080808] min-h-screen sm:p-8">
      <h2 className="text-3xl font-[600] text-white -mb-3">Search</h2>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search the future..."
          className="w-full text-white rounded-md bg-[#212121]/50 pl-10 pr-4 py-2 placeholder:text-[lightgray]             w-full outline-none border-0 focus:border-0 text-md focus:outline-none focus:ring-0 focus:ring-[transparent] border-none active:border-none"
          value={searchStr}
          onChange={handleSearch}
        />
      </div>

      <AnimatePresence>
        <div
          className={`transition-all flex flex-col  -mt-1 items-center min-h-[45vh] -gap-4 w-full duration-300`}
          style={{
            height: `calc(${masterList.length * 60}px+60px)`,
          }}
        >
          {searchStr &&
            (masterList.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center">
                <img
                  src="https://media.tenor.com/vpCPcxEuI-cAAAAj/john-tr.gif"
                  className="h-[15vh]"
                />
                <div className="text-center mt-4 text-white text-lg font-[Aeonik-Bold]">
                  This future hasn't been predicted yet
                </div>
                <div className="text-center text-[lightgray] text-md font-[Aeonik]">
                  Try searching for something else...
                </div>
              </div>
            ) : isLoading ? (
              <div className="h-full mt-40 flex justify-center items-center">
                <Spinner success={!isLoading} loading={isLoading} />
              </div>
            ) : (
              <>
                {searchMarkets?.length > 0 && (
                  <Section title="Predictions">
                    <div className="flex flex-col -gap-5">
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
                        />
                      ))}
                    </div>
                  </Section>
                )}
                {users?.length > 0 && (
                  <Section title="Users">
                    <div className="flex flex-col -gap-5">
                      {displayedUsers?.map((user, index) => (
                        <FriendItem
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
                    </div>
                  </Section>
                )}
              </>
            ))}
          {!searchStr.length > 0 && (
            <>
              <Section title="Suggested">
                <div className="flex flex-col -gap-5">
                  {displayedTrendingMarkets.map((market, index) => (
                    <MarketItem
                      id={market.id}
                      key={index}
                      currentIdx={currentIdx}
                      idx={market.idx}
                      title={market.title}
                      subtitle={market.question}
                      time={market?.options[0].value}
                      type={"market.type"}
                      option={market?.outcomeA}
                      image={market.image}
                    />
                  ))}
                </div>
              </Section>
              <Section title="Friends">
                <div className="flex flex-col -gap-5">
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
                </div>
              </Section>
              <Section title="Trending Topics">
                <div className="flex flex-col -gap-5">
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
                </div>
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
    <div className="mb-4 ml-4 w-[104%]">
      <h3 className="text-[lightgray] text-sm mb-1">{title}</h3>
      <div className="-ml-1 w-full flex flex-col -my-1 -gap-2">{children}</div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="lightgray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
