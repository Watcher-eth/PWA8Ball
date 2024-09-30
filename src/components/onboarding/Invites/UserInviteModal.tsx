import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Copy } from "lucide-react"
import { useUserStore } from "@/lib/stores/UserStore"
import { useFetchOrCreateUserInvites } from "@/supabase/queries/Invites/useFetchOrCreateUserInvites"
import { showToast } from "@/utils/Toasts/showToast"

export function UserInviteModal({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore()
  const {
    data: invites,
    isLoading,
    error,
  } = useFetchOrCreateUserInvites(user?.walletAddress)
  const usedInvitesCount = invites?.filter(
    (invite) => invite.status === "used"
  ).length

  return (
    <Dialog >
      <DialogTrigger>
        <div className="active:scale-93 flex justify-between items-center w-full hover:scale-101 transition-all">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="border-0  lg:max-w-[35%] xl:max-w-[28%] rounded-[2rem] self-center">
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className={`
          bg-[#101010]/70 rounded-[2rem]  backdrop border-[0.1rem] border-[#151515]
          h-full mb-5  relative
        `}
        >
          <div className="flex flex-col items-center p-2 pb-12 rounded-lg">
            <div className="flex flex-col items-center justify-center   pt-12 text-white">
              <div className="h-[6rem] w-[6rem] flex items-center justify-center my-5 rounded-full bg-[#191919]">
                <div className="text-[3.4rem] rotate-6">🎟️</div>
              </div>
              <div className="p-1 px-4 rounded-full bg-[#191919] border-2  border-[#212121] my-1 font-semibold text-lg text-white">
                {invites?.length - usedInvitesCount} invites left
              </div>
              <p className="text-center mb-6 font-medium mt-3 px-6 mb-3 text-[lightgray]">
                Glimpse is currently in closed beta. You received 3 invites for
                your friends use them wisely.
              </p>

              {invites?.map((item) => {
                return (
                  <UserInvite
                    setToastVisible={() =>
                      showToast({
                        icon:
                          <Copy
                            strokeWidth={2.5 /** this is 3 everywhere else... */}
                            className="text-white h-[1rem]"
                          />,
                        message: "Copied Invite",
                      })
                    }
                    code={item.id}
                    status={item.status}
                  />
                )
              })}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

function UserInvite({ code, status, setToastVisible }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setToastVisible(true)
  }

  return (
    <div className="flex flex-col gap-4 w-full px-8 my-2.5">
      <div className="flex items-center justify-between">
        <p
          className={`text-lg font-bold ${
            status === "used" ? "text-[gray] line-through" : "text-white"
          }`}
        >
          {code}
        </p>
        {status === "used" ? (
          <p className="text-lg font-semibold text-italic text-[gray]">Used</p>
        ) : (
          <button onClick={handleCopy} className="focus:outline-none">
            <Copy className="text-[white]" strokeWidth={3} size={20} />
          </button>
        )}
      </div>
      <div className="h-px w-11/12 bg-[#212121]" />
    </div>
  )
}
