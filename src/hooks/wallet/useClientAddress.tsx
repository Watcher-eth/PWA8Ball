import { useSmartAccount } from "@/lib/onchain/SmartAccount";
import { useUserStore } from "@/lib/stores/UserStore";

import type { WalletClient, Address } from "viem";


type ClientAndAddress = {
  client: WalletClient;
  address: Address;
  walletType?: "smartwallet" | "eoa"
};

export function useClientAddress() {
  const {
    smartAccountReady,
    smartAccountClient,
    smartAccountAddress,
    eoaClient,
    eoaAddress,
  } = useSmartAccount();
  const { user: userCon } = useUserStore();

  let client;
  let address;
  if (userCon?.walletType === "smartwallet") {
    client = smartAccountClient;
    address = smartAccountAddress;
  } else if (userCon?.walletType === "eoa") {
    client = eoaClient;
    address = eoaAddress;
  }

  console.log({client, address})
  return {
    client,
    address,
    walletType: userCon?.walletType,
  } as ClientAndAddress;

}
