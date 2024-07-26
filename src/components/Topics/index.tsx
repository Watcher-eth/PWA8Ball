// @ts-nocheck

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";
 // Adjust import path as necessary
import { ChevronLeft, Share, Star } from "lucide-react";
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic";
import { ShareTopicModal } from "@/components/Modals/ShareTopicModal";

import { BetBigView, BetSmallView } from "./BetViews";
import { LEADERBOARD_PATH } from "@/utils/urls";

const ICON_BUTTON_CLASSNAME = `
  bg-[rgba(21, 21, 21, 0.95)] backdrop-blur-2xl
  rounded-full flex justify-center items-center
  absolute top-12 z-10
  `

export const FeaturedBet = ({
  name,
  description,
  image,
  icon,
  topic,
  id,
  type,
  members,
}) => {
  const router = useRouter();
  const scrollRef = useRef(null);

  const user = { external_auth_provider_user_id: "user-id" }; // Mock user data
  const userId = user.external_auth_provider_user_id;
  const { data: membersProfiles } = useGetMembersForTopic(id);
  const { data: markets } = useGetMarketsForTopic(id);

  return (
    <div
      className="flex overflow-x-hidden flex-col no-scrollbar w-full bg-[#070707]  relative"
      ref={scrollRef}
    >
      <a
        onClick={() => router.back()}
        className={`${ICON_BUTTON_CLASSNAME} size-8 left-4`}
      >
        <ChevronLeft color="white" size={20} strokeWidth={4} />
      </a>
      <Link
        href={LEADERBOARD_PATH}
        className={`${ICON_BUTTON_CLASSNAME} size-8 right-14`}
      >
        <Star color="white" size={20} strokeWidth={3} />
      </Link>
      <ShareTopicModal
        image={image}
        title={name}
        question={description}
        topic={id}
        members={membersProfiles}
        markets={markets?.length}
      >
        <Share
          size={33}
          strokeWidth={3.3}
          className={`${ICON_BUTTON_CLASSNAME} right-4 bg-[rgba(17, 17, 17, 0.15)]`}
        />
      </ShareTopicModal>
      <motion.div
        className="w-screen h-[35vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute top-0 w-screen h-[37.5vh] bg-gradient-to-b from-transparent to-[#070707]"></div>
      <div className="flex flex-col no-scrollbar p-4 mt-[-1.5rem]">
        <h1
          className={`
            text-[2.3rem] text-white font-bold z-10 font-['Benzin-Bold']
            ${name?.length < 17 ? "text-4xl" : "text-2xl"}
          `}
        >
          {name}
        </h1>
        <p className="text-[0.9rem] text-[lightgray] z-10">{description}</p>
        <div className="flex items-center mt-1 ml-[-0.2rem]">
          <AvatarGroup images={membersProfiles?.map((item) => item.pfp)} />
          <span className="text-[lightgray] text-15 ml-1 font-['Aeonik-Bold']">
            {membersProfiles?.length > 0
              ? `${membersProfiles[0].name}${
                  membersProfiles.length > 1
                    ? `, ${membersProfiles[1].name}`
                    : ""
                }${` & ${members - 1} others`}`
              : `Be the first to join ${name}`}
          </span>
        </div>
        <div className="flex items-center mt-4">
          <Star color="white" strokeWidth={3.5} height={20} />
          <span className="text-white text-xl ml-1 font-['Aeonik-Bold']">
            Trending Bets
          </span>
        </div>
        {markets?.slice(0, 4)?.map((market, idx) => {
          const BetViewComponent = idx % 2 == 0 ? BetBigView : BetSmallView;
          return (
            <BetViewComponent
              key={idx}
              marketId={market.id}
              title={market.title}
              question={market.question}
              image={market.image}
              topic={name}
              option1={market.options[0]}
              option2={market.options[1]}
            />
          );
        })}
      </div>
    </div>
  );

};

export const AvatarGroup = ({ images }) => {
  return (
    <div className="flex mt-1 -space-x-2">
      {images?.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Avatar ${index}`}
          className="size-6 rounded-full border-2 border-[#070707]"
        />
      ))}
    </div>
  );
};


