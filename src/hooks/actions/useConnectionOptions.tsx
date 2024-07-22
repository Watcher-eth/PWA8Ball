// @ts-nocheck
import { useAccount } from "wagmi";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { isSupportedAndTargetChain } from "@/constants/supportedChains";


/**
 * A custom hook for managing connection options and chain-related actions.
 * @param {Object} options - The options for the hook.
 * @param {number} [options.targetChainId] - The target chain ID to check against.
 * @returns {Object} An object containing connection-related utilities and state.
 */
export function useConnectionOptions({
  targetChainId,
}: {
  targetChainId?: number;
}) {
  const { address, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();

  /**
   * Wraps an action function with connection and chain checks.
   * @param {Function} func - The action function to wrap.
   * @returns {Function} A wrapped function that handles connection and chain checks before executing the action.
   */
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
