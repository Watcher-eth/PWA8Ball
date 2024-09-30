import { DoorOpen } from "lucide-react"
import { toast } from "sonner"
import { useDisconnect } from "wagmi"
import { usePrivy } from "@privy-io/react-auth"
import { useUserStore } from "@/lib/stores/UserStore"
import { showToast } from "@/utils/Toasts/showToast"


export function useDisconnectUser() {
  const { user } = useUserStore()
  const { disconnect } = useDisconnect()
  const { logout } = usePrivy()

  function disconnectUser() {
    try {
      if (user?.walletType === "eoa") {
        disconnect()
      } else if (user?.walletType === "smartwallet") {
        logout()
      }
      showToast({
        icon: <DoorOpen strokeWidth={3} className="text-white h-[1rem]" />,
        message: "Logged out succesfully!",
      })
    }  catch (e) {
      toast.warning("Error logging out! Please reload the page and try again.")
    }

  }

  return { disconnectUser }
}
