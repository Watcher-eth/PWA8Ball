import { shortenAddress } from "@/utils/address/shortenAddress";
import { useAccount, useEnsName } from "wagmi";

export function useMyEns() {
  const { address } = useAccount();
  const {data: ensName} = useEnsName({
    address: address,
    chainId: 1,
  });

  return {
    ensName,
    address,
    displayName: address && (ensName ?? shortenAddress(address ?? ""))
  }
}
