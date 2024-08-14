import { useGetMembersForTopic } from "@/supabase/mutations/topics/useGetMembersForTopic";
import { useGetMarketsForTopic } from "@/supabase/queries/useGetMarketsForTopic";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { StandardPageWrapper } from "../layouts/StandardPageWrapper";
import {
  InverseBleedOverlay,
  InverseVerticalBleedOverlay,
  StandardBleedOverlay,
} from "../layouts/StandardBleedOverlay";
import { Medal, Trophy, UserPlus } from "lucide-react";
import { useGetCommentsForTopic } from "@/supabase/queries/comments/useGetCommentsForTopic";
import { useUserStore } from "@/lib/stores/UserStore";
import { BetComment } from "@/types/PostTypes";
import _ from "lodash";
import Link from "next/link";
import { Comment } from "../predictions/CommentSection/Comment";
import JoinTopicButton from "./JoinTopicButton";
import { motion } from "framer-motion";
import { skeletonVariants } from "../ui/Skeleton";

function DesktopTopic({
  name,
  description,
  image,
  icon,
  topic,
  id,
  type,
  members,
}) {
  const router = useRouter();
  const scrollRef = useRef(null);

  const { data: membersProfiles } = useGetMembersForTopic(id);
  const { data: markets } = useGetMarketsForTopic(id);
  const { data: comments, error, isLoading } = useGetCommentsForTopic(id);
  const { user } = useUserStore();

  const [optimisticComments, setOptimisticComments] = useState<BetComment[]>(
    []
  );

  const allComments = _.uniqBy(
    [...optimisticComments, ...(comments || [])],
    (comment) => comment.id
  );

  function addOptimisticComment(comment: BetComment) {
    setOptimisticComments([comment, ...optimisticComments]);
  }

  const handleComment = () => {};
  const setReply = () => {};

  const renderDesktopTopicItems = (items, size, count) => {
    const placeholders = Array.from({ length: count - items.length });
    return (
      <>
        {items.map((item, index) => (
          <DesktopTopicItem
            key={item.id}
            question={item?.question}
            title={item.title}
            image={item.image}
            created_at={item.created_at}
            size={size}
            id={item.id}
            outcomes={[
              { name: item.options[0].name, value: item.outcomea },
              { name: item.options[1].name, value: item.outcomeb },
            ]}
          />
        ))}
        {placeholders.map((_, index) => (
          <DesktopTopicItemSkeleton
            key={`skeleton-${index}`}
            size={size}
            index={index}
          />
        ))}
      </>
    );
  };

  return (
    <StandardPageWrapper className="h-full flex flex-col">
      <StandardBleedOverlay>
        <InverseVerticalBleedOverlay>
          <div className="w-full h-80 relative">
            <img
              className="w-full transform object-cover h-80 relative -mt-40"
              alt="CoverImage"
              src={image}
            />
            <div className="h-80 w-full bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent absolute bottom-0" />
          </div>
        </InverseVerticalBleedOverlay>
      </StandardBleedOverlay>
      <div className="full h-full overflow-y-auto z-20 -mt-2 px-5 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col -space-y-3 mt-2">
            <div className="text-[2.3rem] text-white font-[Benzin-Bold]">
              {name}
            </div>
            <div className="text-[1.2rem] text-[white]/[0.9] font-[400]">
              {description}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex flex-row space-x-2 items-center">
              <JoinTopicButton
                topicId={id}
                userId={user?.external_auth_provider_user_id}
                showToast={() => {}}
              />
              <div className="p-2.5 hover:scale-103 active:scale-97 flex space-x-2 flex-row items-center py-2.5 border-2 bg-[#151515] border-[#212121] font-[700] rounded-full text-[1rem] text-white">
                <Trophy color="white" strokeWidth={2.5} size={"1.2rem"} />
              </div>
            </div>
            <div className="flex items-center mt-1 space-x-2 -mb-1 ml-[-0.2rem]">
              <div className="flex mt-1 -space-x-2">
                {membersProfiles?.map((image, index) => (
                  <img
                    key={index}
                    src={image.pfp}
                    alt={`Avatar ${index}`}
                    className="size-8 hover:scale-103 active:scale-97 rounded-full border-2 border-[#151515]"
                  />
                ))}
              </div>{" "}
              <span className="text-[lightgray] text-[1.15rem] ml-1 font-[500]">
                {membersProfiles?.length > 0
                  ? `${`${members} Members`}`
                  : `Be the first to join ${name}`}
              </span>
            </div>
          </div>
        </div>
        <div className="h-[0.12rem] w-full bg-[#212121] mt-3.5 mb-8" />
        <div className="text-[2.1rem] mb-2.5 text-[white] font-[Aeonik-Bold]">
          Top Predictions
        </div>
        <div className="flex flex-row space-x-4 mb-8">
          {renderDesktopTopicItems(markets?.slice(0, 3) || [], "large", 3)}
        </div>
        <div className="flex flex-row space-x-3 mb-20">
          {renderDesktopTopicItems(markets?.slice(0, 5) || [], "small", 5)}
        </div>
        <StandardBleedOverlay>
          <InverseVerticalBleedOverlay>
            <div className="w-full relative py-7 px-[3.3rem] mt-20 ">
              <div className="text-[1.65rem] text-white font-[700]">
                Community
              </div>

              <div>
                {allComments.map((item) => {
                  const commentUser = {};
                  return (
                    <Comment
                      key={item.id}
                      {...item}
                      setReply={setReply}
                      handleComment={handleComment}
                      user2={commentUser}
                    />
                  );
                })}
              </div>
            </div>
          </InverseVerticalBleedOverlay>
        </StandardBleedOverlay>
        <div className="flex flex-col py-7">
          <div className="text-[1.65rem] my-3 text-white font-[700]">
            Popular Today
          </div>
          <div className="flex flex-row pt-1 space-x-3">
            {renderDesktopTopicItems(markets?.slice(0, 4) || [], "medium", 4)}
          </div>
        </div>
      </div>
    </StandardPageWrapper>
  );
}

export default DesktopTopic;

interface Outcome {
  name: string;
  value: number;
}

interface DesktopItemProps {
  image: string;
  title: string;
  question: string;
  outcomes: Outcome[];
  created_at: string;
  size: "large" | "medium" | "small";
  id: string;
}

export function DesktopTopicItem(props: DesktopItemProps) {
  const sizeClasses = {
    large: {
      container: "w-1/3",
      image: "h-[30vh]",
      title: "text-[1rem]",
      question: "text-[1.3rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.55rem]",
    },
    medium: {
      container: "w-1/4",
      image: "h-[22vh]",
      title: "text-[1rem]",
      question: "text-[1.1rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.35rem]",
    },
    small: {
      container: "w-1/5",
      image: "h-[15vh]",
      title: "text-[1rem]",
      question: "text-[1rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.25rem]",
    },
  };

  const selectedSize = sizeClasses[props.size];
  console.log("outcomes", props.outcomes);
  return (
    <Link
      href={`/p/${props.id}`}
      className={`${selectedSize.container} hover:scale-101 active:scale-99 flex-col border-[0.1rem] border-[#151515] rounded-lg`}
    >
      <img
        className={`w-full ${selectedSize.image} object-cover rounded-t-lg `}
        src={props.image}
      />
      <div className="flex flex-col pt-2.5 rounded-b-lg pb-1.5 bg-[#151515]">
        <div className={`text-[lightgray] px-5 ${selectedSize.title}`}>
          {props.title}
        </div>
        <div
          className={`text-white font-[600] ${selectedSize.lineHeight} my-1 px-5 ${selectedSize.question}`}
        >
          {props.question}
        </div>
        <div className="h-[0.05rem] mt-3 mb-1.5 w-full bg-[#313131]" />

        <GradientBar
          percentage={(props.outcomes[0]?.value / 100).toFixed(2)}
          labels={[
            `${(props.outcomes[0]?.value / 100).toFixed(0)}% ${
              props.outcomes[0]?.name
            } `,
            `${props.outcomes[1]?.name} ${(
              props.outcomes[1]?.value / 100
            ).toFixed(0)}%`,
          ]}
        />
      </div>
    </Link>
  );
}

type GradientBarProps = {
  percentage: number;
  labels: [string, string];
};

const GradientBar: React.FC<GradientBarProps> = ({ percentage, labels }) => {
  // Ensure the percentage is between 1 and 100
  const validPercentage = Math.min(Math.max(percentage, 1), 100);

  return (
    <div className="relative m-2 mx-4 bg-[#151515] h-10 rounded-md flex items-center text-white">
      <div
        className="absolute left-0 h-full rounded-l-md"
        style={{
          width: `${validPercentage}%`,
          background: "linear-gradient(to right, #0067E1, transparent)",
        }}
      ></div>
      <div
        className="absolute h-full rounded-r-md"
        style={{
          left: `${validPercentage}%`,
          width: `${100 - validPercentage}%`,
          background: "linear-gradient(to right, transparent, #FF0050)",
        }}
      ></div>
      <div
        className="h-12 w-1.5 bg-white/[80%] rounded-md absolute z-2"
        style={{
          left: `${validPercentage}%`,
          transform: "translateX(-50%)",
          opacity: validPercentage > 12 ? 1 : 0,
        }}
      />
      <div className="absolute font-[500] left-2.5 ml-2">{labels[0]}</div>
      <div className="absolute font-[500] right-2.5 mr-2">{labels[1]}</div>
    </div>
  );
};

export function DesktopTopicItemSkeleton(props: {
  size: "large" | "medium" | "small";
  index: number;
}) {
  const sizeClasses = {
    large: {
      container: "w-1/3 h-full",
      image: "h-[30vh]",
      title: "text-[1rem]",
      question: "text-[1.3rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.55rem]",
    },
    medium: {
      container: "w-1/4 h-full",
      image: "h-[22vh]",
      title: "text-[1rem]",
      question: "text-[1.1rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.35rem]",
    },
    small: {
      container: "w-1/5 h-full",
      image: "h-[15vh]",
      title: "text-[1rem]",
      question: "text-[1rem]",
      date: "text-[0.85rem]",
      lineHeight: "leading-[1.25rem]",
    },
  };

  const selectedSize = sizeClasses[props.size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: props.index * 0.2 }}
      className={`${selectedSize.container} hover:scale-101 active:scale-99 flex-col border-[0.1rem] border-[#151515] rounded-lg`}
    >
      <motion.div
        className={`w-full ${selectedSize.image} bg-[#101010] rounded-t-lg`}
        variants={skeletonVariants}
        initial="initial"
        animate="pulse"
      />

      <div className="flex flex-col pt-4 rounded-b-lg pb-1.5 bg-[#151515]">
        <motion.div
          className={`text-[lightgray] w-[40%] my-1 mx-2 ${selectedSize.title} bg-[#212121] h-[18px] rounded-full`}
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <motion.div
          className={`text-[lightgray] my-1 mx-2 ${selectedSize.title} bg-[#212121] h-[20px] rounded-full`}
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <motion.div
          className={`text-white font-[600] w-[70%] my-1 mx-2 ${selectedSize.lineHeight} my-1 px-5 ${selectedSize.question} bg-[#212121] h-[20px] rounded-full`}
          variants={skeletonVariants}
          initial="initial"
          animate="pulse"
        />
        <div className="h-[0.05rem] mt-5 mb-1.5 w-full bg-[#242424]" />
        <div className="flex flex-row justify-between">
          <motion.div
            className={`text-[lightgray] w-[22%] py-1 mx-2 my-1 px-5 ${selectedSize.date} bg-[#212121] h-[15px] rounded-full`}
            variants={skeletonVariants}
            initial="initial"
            animate="pulse"
          />
          <motion.div
            className={`text-[lightgray] w-[35%] py-1 mx-2 my-1 px-5 ${selectedSize.date} bg-[#212121] h-[15px] rounded-full`}
            variants={skeletonVariants}
            initial="initial"
            animate="pulse"
          />
        </div>
      </div>
    </motion.div>
  );
}
