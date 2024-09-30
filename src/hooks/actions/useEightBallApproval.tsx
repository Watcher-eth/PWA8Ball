import { useTokenContractApproval } from "./useTokenContractApproval"
import { UsdcConfig } from "@/constants/contracts/usdc"
import { DEFAULT_CHAIN_ID } from "@/constants/chains"
import { EightBallConfig } from "@/lib/onchain/generated"


export function useEightBallApproval() {
  return useTokenContractApproval({
    tokenAddress: UsdcConfig.address[DEFAULT_CHAIN_ID],
    contractAddress: EightBallConfig.address[DEFAULT_CHAIN_ID],
  })
}
