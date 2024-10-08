// @ts-nocheck

import { useState, useEffect } from "react"

import { PenBox, UserMinus, UserPlus } from "lucide-react"
import { useFollowUser } from "@/supabase/mutations/follow/useFollowUser"
import { useUnfollowUser } from "@/supabase/mutations/follow/useUnfollowUser"
import { useUserStore } from "@/lib/stores/UserStore"
import { useCheckIfFollowing } from "@/supabase/queries/user/useCheckIfFollowing"

import { showToast } from "@/utils/Toasts/showToast"

export function FollowButton({ profileId }: { profileId?: string }) {
  const { user } = useUserStore()
  const followerId = user?.walletAddress
  const followingId = profileId
  const { data: isFollowing2 } = useCheckIfFollowing(followerId!, followingId)
  const [edit, setEdit] = useState<boolean>()
  const [isFollowing, setFollowing] = useState(false)
  const [temporaryUnfollow, setTemporaryUnfollow] = useState(false)

  const { mutate: followUser } = useFollowUser()
  const { mutate: unfollowUser } = useUnfollowUser()
  console.log("follow ids", followerId, profileId)
  useEffect(() => {
    if (isFollowing2) {
      setFollowing(true)
    }
  }, [isFollowing2])

  const toastUp = (text: string) => {
    const IconComponent = text === "Followed" ? UserPlus : UserMinus
    showToast({
      icon: <IconComponent strokeWidth={3} className="text-white h-[0.95rem]"/>,
      message: text,
    })

  }

  const handleFollow = () => {
    followUser({ followerId, followingId })
    setFollowing(true)
    toastUp("Followed")
  }

  const handleUnfollow = () => {
    unfollowUser({ followerId, followingId })
    setFollowing(false)
    setTemporaryUnfollow(true)
    toastUp("Unfollowed")
  }

  const isUser = user?.walletAddress === profileId

  console.log("params follow", user?.walletAddress, profileId)
  if ((!isUser && !isFollowing && !isFollowing2) || temporaryUnfollow) {
    return (
      <DisplayFollowButton
        onClick={handleFollow}
        IconComponent={UserPlus}
        label="Follow"
      />
    )
  }

  if ((!isUser && isFollowing) || (isFollowing2 && !temporaryUnfollow)) {
    return (
      <DisplayFollowButton
        onClick={handleUnfollow}
        label="Following"
        isDark={false}
      />
    )
  }

  if (isUser) {
    return (
      <DisplayFollowButton
        onClick={setEdit}
        IconComponent={PenBox}
        label="Edit"
      />
    )
  }

  return null
}

function DisplayFollowButton({ onClick, IconComponent, label, isDark = true }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-row
        mt-2 mb-2.5  py-1.5 !px-4 border-[0.08rem] border-[#202020]
        rounded-full overflow-hidden items-center
        hover:scale-105 active:scale-95 transition-all
        ${isDark ? "bg-[#181818]" : "bg-white"}
      `}
    >
      <div
        className={`
        text-[14px] font-bold
        ${isDark ? "text-[lightgray]" : "text-[#1B1B1E]"} self-center`}
      >
        {label}
      </div>
    </button>
  )
}
