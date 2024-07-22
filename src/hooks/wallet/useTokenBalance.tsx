import { erc20Abi, type Address } from "viem";
import { useAccount, useReadContract } from "wagmi";

export function useTokenBalance({ tokenAddress, address }: { tokenAddress: Address, address?: Address }) {
  const { chainId, address: connectedAccountAddress } = useAccount();

  const accountAddress = address ?? connectedAccountAddress as Address

  const { data: balance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    chainId: chainId,
    functionName: "balanceOf",
    args: [accountAddress],
    query: {
      refetchInterval: 10 * 1_000,
    },
  });


  return balance;
}
