// @ts-nocheck
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import debounce from "lodash/debounce";
import { useGetTrendingMarkets } from "@/supabase/queries/useGetTrendingMarkets";
import { useGetUsersByName } from "@/supabase/queries/useGetUsersByName";
import { useGetMarketsByQuestion } from "@/supabase/queries/search/useGetMarketsByQuestion";

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
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");

  const { data: users, isLoading: usersLoading } =
    useGetUsersByName(debouncedText);
  const {
    data: searchMarkets,
    isLoading: marketsLoading,
    error: marketsError,
  } = useGetMarketsByQuestion(debouncedText);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      setDebouncedText(text);
    }, 500),
    []
  );

  return (
    <div className="rounded-2xl p-2 w-full">
      <div className="relative flex items-center align-center mb-4">
        <Search className="h-5 w-5 text-[#707070]" strokeWidth={3} />
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search for predictions..."
          className={`
            w-full outline-none border-0
            py-2 px-4
            bg-[#080808] text-white placeholder-[#707070]
            text-[1rem] rounded-lg
          `}
        />
      </div>
      <AnimatePresence>
        <div>
          {!searchText && (
            <Section title="Suggested">
              {trendingMarkets?.map((market, index) => {
                if (index < 4)
                  return (
                    <div className="flex flex-col -space-y-1">
                      <Item
                        key={index}
                        title={market.title}
                        subtitle={market.question}
                        time={3.22}
                        type={"market.type"}
                        image={market.image}
                      />
                    </div>
                  );
              })}
            </Section>
          )}
          {searchText && (
            <>
              {searchMarkets?.length > 0 && (
                <Section title="Suggested">
                  {searchMarkets?.map((market, index) => (
                    <Item
                      key={index}
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
                  {users?.map((user, index) => (
                    <FriendItem
                      key={index}
                      name={user.name}
                      handle={user.handle}
                      time={user.time}
                      image={user.pfp}
                    />
                  ))}
                </Section>
              )}
            </>
          )}
          {!searchText && (
            <Section title="Friends">
              {friends.map((friend, index) => (
                <FriendItem
                  key={index}
                  name={friend.name}
                  handle={friend.handle}
                  time={friend.time}
                />
              ))}
            </Section>
          )}
          {!searchText && (
            <Section title="Trending Topics">
              <div className="flex flex-col -space-y-1">
                {trendingMarkets?.slice(0, 3).map((market, index) => {
                  return (
                    <TopicItem
                      key={index}
                      title={market?.topic_title}
                      subtitle={market?.topic_description}
                      members={420}
                      type={"market.type"}
                      image={market.topic_image}
                    />
                  );
                })}
              </div>
            </Section>
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

const Item = ({ title, subtitle, time, type, image }) => {
  return (
    <SearchItem
      title={title}
      subtitle={subtitle}
      rightText={time}
      image={image}
      isImgRounded={false}
      type={type}
    />
  );
}


const TopicItem = ({ title, subtitle, members, type, image }) => {
  return (
    <SearchItem
      title={title}
      subtitle={subtitle}
      rightText={members}
      image={image}
      type={type}
      isImgRounded={false}
      icon={<Users className="h-[0.9rem] text-[#707070]" strokeWidth={2.7} />}
    />
  );
}


const FriendItem = ({ name, handle, time, image }) => {
  return (
    <SearchItem
      title={name}
      subtitle={handle}
      rightText={time}
      image={image}
      isImgRounded={true}
    />
  );
}

function SearchItem({
  title,
  subtitle,
  image,
  type,
  isImgRounded,
  icon,
  rightText,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="flex items-center justify-between p-2 rounded-[0.5rem] hover:bg-[#151515]  transition duration-150"
    >
      <div className="flex items-center space-x-3">
        {image ? (
          <img
            src={image}
            className={`w-9 h-9 ${
              isImgRounded ? "rounded-full" : "rounded-[0.2rem]"
            }`}
          />
        ) : (
          <div className="w-9 h-9 bg-gradient-to-r object-cover from-purple-400 via-pink-500 to-red-500 rounded-full"></div>
        )}
        <div>
          <p className="text-white">{title}</p>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        {type === "album" && (
          <span className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">
            ALBUM
          </span>
        )}
      </div>
      {/* <p className="text-gray-400 text-sm">{time}</p> */}
      <div className="flex flex-row items-center">
        <p className="text-gray-400 text-sm">{rightText}</p>
        {icon}
      </div>
    </motion.div>
  );
}