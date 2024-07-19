import { USDC_ADDRESS } from "@/lib/onchain/contracts/Usdc";
import { useTokenContractApproval } from "./useTokenContractApproval";
import { EightBallAddress } from "@/lib/onchain/contracts/Eightball";

export function useEightBallApproval() {
  return useTokenContractApproval({
    tokenAddress: USDC_ADDRESS,
    contractAddress: EightBallAddress,
  });
}