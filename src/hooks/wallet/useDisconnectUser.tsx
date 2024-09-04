import { useUserStore } from "@/lib/stores/UserStore";
import { usePrivy } from "@privy-io/react-auth";
import { DoorOpen } from "lucide-react";
import { toast } from "sonner";
import { useDisconnect } from "wagmi";

export function useDisconnectUser() {
  const { user, setUser } = useUserStore();
  const { disconnect } = useDisconnect();
  const { logout } = usePrivy();

  const disconnectUser = () => {
    if (user?.walletType === "eoa") {
      try {
        disconnect();
        setUser(null);
        toast(
          <div className="w-full rounded-full bg-[#101010] font-semibold text-base px-3 pr-4 text-white flex flex-row items-center p-2">
            <div className="p-0.5 py-1.5 rounded-full bg-[#323232] mr-2 flex justify-center items-center">
              <DoorOpen strokeWidth={3} className="text-white h-[1rem]" />
            </div>
            Logged out succesfully!
          </div>,
          {
            unstyled: true,
            classNames: {
              title: "text-red-400 text-2xl",
              description: "text-red-400",
              actionButton: "bg-zinc-400",
              cancelButton: "bg-orange-400",
              closeButton: "bg-lime-400",
            },
          }
        );
      } catch (e) {
        toast.warning(
          "Error logging out! Please reload the page and try again."
        );
      }
    } else if (user?.walletType === "smartwallet") {
      try {
        logout();
        setUser(null);
        toast(
          <div className="w-full rounded-full bg-[#101010] font-semibold text-base px-3 pr-4 text-white flex flex-row items-center p-2">
            <div className="p-0.5 py-1.5 rounded-full bg-[#323232] mr-2 flex justify-center items-center">
              <DoorOpen strokeWidth={3} className="text-white h-[1rem]" />
            </div>
            Logged out succesfully!
          </div>,
          {
            unstyled: true,
            classNames: {
              title: "text-red-400 text-2xl",
              description: "text-red-400",
              actionButton: "bg-zinc-400",
              cancelButton: "bg-orange-400",
              closeButton: "bg-lime-400",
            },
          }
        );
      } catch (e) {
        toast.warning(
          "Error logging out! Please reload the page and try again."
        );
      }
    }
  };

  return { disconnectUser };
}
