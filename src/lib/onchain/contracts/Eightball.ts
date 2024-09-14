import {
  WalletClient,
  createPublicClient,
  custom,
  getContract,
  http,
} from "viem"
import { baseGoerli } from "viem/chains"
import { rpcClient } from "@/lib/onchain/rpcClient"
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain"
import { EightBallAbi } from "../../generated"

export const EightballV1ABI = EightBallAbi

export async function getEightBallContract(walletClient: WalletClient) {
  // Use walletClient for write operations and rpcClient for read operations
  const contract = getContract({
    abi: EightBallAbi,
    address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
    client: { public: rpcClient, wallet: walletClient },
  })

  return contract
}
