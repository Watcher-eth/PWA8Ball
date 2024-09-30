import { erc20Abi, type Address } from "viem"
import { useAccount, useReadContract, useWriteContract } from "wagmi"

import { MAX_UINT_256 } from "@/constants/misc"

import { txErrorHandlerWrapper } from "@/utils/txErrorHandler"

export function useTokenContractApproval({
  tokenAddress,
  contractAddress,
}: {
  tokenAddress?: Address
  contractAddress: Address
}) {
  const contractInfo = {
    address: tokenAddress!,
    abi: erc20Abi,
  }

  const { address, chainId } = useAccount()
  const targetContract = useWriteContract()

  const { data: allowance } = useReadContract({
    ...contractInfo,
    args: [address, contractAddress] as [Address, Address],
    functionName: "allowance",
    query: {
      refetchInterval: 5 * 1_000,
    },
  })

  function approveToken(approvalArgs?: { amount?: bigint }) {
    targetContract.writeContractAsync({
      ...contractInfo,
      functionName: "approve",
      args: [contractAddress, approvalArgs?.amount ?? BigInt(MAX_UINT_256)],
    })
  }

  return {
    approveToken: txErrorHandlerWrapper(approveToken),
    allowance,
    ...targetContract,
  }
}
