
import { useMutation } from "@tanstack/react-query";
import { SmartAccountClient } from "permissionless";
import { type Address, getContract } from "viem";

import { EightballV1ABI } from "@/lib/onchain/contracts/Eightball";
import { rpcClient } from "@/lib/onchain/rpcClient";


import { ROOT_OPERATOR_ADDRESS } from "@/constants/onchain";
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain";



async function predict({
  amount,
  preferYes,
  marketId,
  client,
}: {
  amount: bigint
  preferYes: boolean
  marketId: number
  // @ts-ignore
  client: SmartAccountClient
}) {
  if (!amount || !marketId) {
    throw new Error("All fields must be provided");
  }

  try {
    const preferYesNum = preferYes ? 1 : 0;
    const contract = getContract({
      abi: EightballV1ABI,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: rpcClient, wallet: client },
    });

    //TODO: Custom slippage
    // Execute User Prediction

    const contractArgs = [
      BigInt(amount),
      preferYesNum,
      BigInt(marketId),
      ROOT_OPERATOR_ADDRESS,
      990,
    ];
    console.log("Args", contractArgs);

    const hash = await contract.write.predict(contractArgs);

    console.log("Prediction hash", hash);
    return hash;
  } catch (error) {
    console.error("Error during prediction", error);
    throw error;
  }
}

export const usePredictV2 = () => {
  return useMutation({
    mutationFn: predict,
    onSuccess: () => {
      console.log("Prediction made successfully");
    },
    onError: (error) => {
      console.error("Error making prediction", error);
    },
  });
};
