import { useMyEns } from "@/hooks/wallet/useMyEns"
import { UserCircle } from "lucide-react"
import { DEFAULT_PFP_PLACEHOLDER } from "@/constants/testData"
import { User } from "@/__generated__/graphql"

export function ConnectButton({ user }: { user: User }) {
  const { displayName } = useMyEns()
  const buttonText =
    displayName && !displayName.startsWith("0x")
      ? displayName
      : user?.name || (displayName ? displayName : "Connect")
  return (
    <div
      className={`
        bg-[#282828]/20 hover:bg-[#282828]/40
        hover:scale-103 active:scale-95 transition-all
        font-semibold cursor-pointer
        border border-white/10 hover:border-white/20 active:border-white/30
        px-4 py-2 rounded-lg flex flex-row items-center
      `}
    >
      {buttonText}
      {user?.pfp ? (
        <img
          src={user?.pfp ? user?.pfp : DEFAULT_PFP_PLACEHOLDER}
          alt={user?.name}
          className="size-6 rounded-full  ml-2 -mr-1 inline"
        />
      ) : (
        <UserCircle className="size-6 rounded-full ml-2 -mr-1 inline" />
      )}
    </div>
  )
}
