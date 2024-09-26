import React, { useState } from "react";
import { useLeaveTopic } from "@/supabase/mutations/topics/useLeaveTopic";
import { useJoinTopic } from "@/supabase/mutations/topics/useJoinTopic";
import { useCheckUserTopicMembership } from "@/supabase/mutations/topics/useCheckUserTopicMembership";

interface JoinTopicButtonProps {
  topicId: string;
  userId: string;
  showToast: () => void;
}

const JoinTopicButton: React.FC<JoinTopicButtonProps> = ({
  topicId,
  userId,
  showToast,
}) => {
  const { data: isMember } = useCheckUserTopicMembership(userId, topicId);
  const leaveMutation = useLeaveTopic();
  const joinMutation = useJoinTopic();
  const [optimisticJoin, setOptimisticJoin] = useState(false);

  const handleJoin = () => {
    if (!optimisticJoin) {
      joinMutation.mutate({ userId, topicId });
      setOptimisticJoin(true);
      showToast();
    } else {
      leaveMutation.mutate({ userId, topicId });
      setOptimisticJoin(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      className={`p-4 hover:scale-103 active:scale-97 flex space-x-2 flex-row items-center py-1.5 border-[0.1rem] ${
        optimisticJoin || isMember
          ? "bg-white/60 border-[#212121]/60  text-[#212121]"
          : "bg-[#151515]/50 border-[#212121]/60 text-white"
      } font-bold rounded-full text-base transition-transform duration-200`}
    >
      <div>{optimisticJoin || isMember ? "Joined" : "Join"}</div>
    </button>
  );
};

export default JoinTopicButton;
