// @ts-nocheck
import { useAccount } from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { isSupportedAndTargetChain } from "@/constants/supportedChains";

export function useConnectionOptions({
  targetChainId,
}: {
  targetChainId?: number;
}) {
  const { address, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  const onActionWrapper = (func: () => void) => () => {
    {
      if (address) {
        if (isSupportedAndTargetChain({ chainId, targetChainId })) {
          func();
        } else {
          openChainModal();
        }
      } else {
        openConnectModal();
      }
    }
  };

  return {
    onActionWrapper,
    isConnected: !!address,
    isCorrectChain: isSupportedAndTargetChain({ chainId, targetChainId }),
  };
}
