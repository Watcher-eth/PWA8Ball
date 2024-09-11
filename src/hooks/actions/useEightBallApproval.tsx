import { useTokenContractApproval } from "./useTokenContractApproval"
import {
  BASE_SEPOLIA_EIGHTBALL_ADDRESS,
  BASE_SEPOLIA_USDC_ADDRESS,
} from "@/constants/onchain"

export function useEightBallApproval() {
  return useTokenContractApproval({
    tokenAddress: BASE_SEPOLIA_USDC_ADDRESS,
    contractAddress: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
  })
}
