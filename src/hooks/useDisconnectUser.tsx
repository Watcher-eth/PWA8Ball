import { useUserStore } from "@/lib/stores/UserStore";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { useDisconnect } from "wagmi";

function useDisconnectUser() {
  const { user, setUser } = useUserStore();
  const { disconnect } = useDisconnect();
  const { logout } = usePrivy();

  const disconnectUser = () => {
    if (user?.walletType === "eoa") {
      try {
        disconnect();
        setUser(null);
        toast.success("Logged out successfully!");
      } catch (e) {
        toast.warning(
          "Error logging out! Please reload the page and try again."
        );
      }
    } else if (user?.walletType === "smartwallet") {
      try {
        logout();
        setUser(null);
        toast.success("Logged out successfully!");
      } catch (e) {
        toast.warning(
          "Error logging out! Please reload the page and try again."
        );
      }
    }
  };

  return { disconnectUser };
}

export default useDisconnectUser;
