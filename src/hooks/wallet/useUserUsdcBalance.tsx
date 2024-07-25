import { useAccount } from "wagmi";
import { useUserStore } from "@/lib/stores/UserStore";

import { useUsdcBalance } from "@/hooks/wallet/useUsdcBalance";

export function useUserUsdcBalance() {
  const { user } = useUserStore();
  const { address } = useAccount();
  const balance = useUsdcBalance({
    address: address ?? user?.walletaddress
  });
  return balance;
}
