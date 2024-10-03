import type { WalletClient, Address } from "viem"
import { useAccount, useWalletClient } from "wagmi"

import { useSmartAccount } from "@/lib/onchain/SmartAccount"
import { useUserStore } from "@/lib/stores/UserStore"

type ClientAndAddress = {
  client: WalletClient
  address: Address
  walletType?: "smartwallet" | "eoa"
}

export function useClientAddress() {
  const { smartAccountClient } = useSmartAccount()
  const { user: userCon } = useUserStore()
  const { address } = useAccount()
  const { data: eoaWalletClient } = useWalletClient()

  let client
  if (userCon?.walletType === "smartwallet") {
    client = smartAccountClient
  } else if (userCon?.walletType === "eoa") {
    client = eoaWalletClient //eoaClient; //eoaAddress;
  }


  return {
    client,
    address,
    walletType: userCon?.walletType,
  } as ClientAndAddress
}
