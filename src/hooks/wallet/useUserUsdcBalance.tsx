import { useAccount } from "wagmi";
import { useUserStore } from "@/lib/stores/UserStore";

import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance";

export function useUserUsdcBalance() {
  const { user } = useUserStore();
  const { address } = useAccount();
  console.log("address", address, user?.walletAddress);
  const balance = useUsdcBalance({
    address: address ?? user?.walletAddress,
  });
  console.log("balane", balance);
  return balance;
}
