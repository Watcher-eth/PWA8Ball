import React, { useState } from "react"
import { useLeaveTopic } from "@/supabase/mutations/topics/useLeaveTopic"
import { useJoinTopic } from "@/supabase/mutations/topics/useJoinTopic"
import { useCheckUserTopicMembership } from "@/supabase/mutations/topics/useCheckUserTopicMembership"
import { showToast } from "@/utils/Toasts/showToast"
import { UserMinus, UserPlus } from "lucide-react"
export function JoinTopicButton({
  topicId,
  userId,
}: {
  topicId: string
  userId: string
}) {
  const { data: isMember } = useCheckUserTopicMembership(userId, topicId)
  const leaveMutation = useLeaveTopic()
  const joinMutation = useJoinTopic()
  const [optimisticJoin, setOptimisticJoin] = useState(false)

  const handleJoin = () => {
    if (!optimisticJoin) {
      joinMutation.mutate({ userId, topicId })
      setOptimisticJoin(true)
      showToast({
        icon: <UserPlus color="#34C759" size={20} />,
        message: "Joined topic",
      })
    } else {
      leaveMutation.mutate({ userId, topicId })
      setOptimisticJoin(false)
      showToast({
        icon: <UserMinus color="#34C759" size={20} />,
        message: "Left topic",
      })
    }
  }

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
  )
}
