// @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import { EightballV1ABI } from "@/lib/onchain/contracts/Eightball";
import { SmartAccountClient } from "permissionless";
import { type Address, getContract } from "viem";

import { ROOT_OPERATOR_ADDRESS } from "@/constants/onchain";
import { useUserPrediction } from "@/supabase/mutations/onchainActions/useUserPrediction";
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain";
import { trackMakePrediction } from "@/lib/events/StandardEvents";

interface PredictParams {
  amount: number;
  preferYes: boolean;
  option: string;
  isBuy: boolean;
  marketId: number;
  userId: string;
  client: SmartAccountClient;
  address: Address;
}

async function predict(props: PredictParams) {
  const { managePrediction } = useUserPrediction();
  if (!props.amount || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    const preferYesNum = props.preferYes ? 1 : 0;
    const contract = getContract({
      abi: EightballV1ABI,
      address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
      client: { public: props.client, wallet: props.client },
    });

    //TODO: Custom slippage
    // Execute User Prediction

    const contractArgs = [
      BigInt(props.amount / 10),
      preferYesNum,
      BigInt(props.marketId),
      ROOT_OPERATOR_ADDRESS,
      990,
    ];
    const { request } = await contract.simulate.predict(contractArgs);

    const hash = await contract.write.predict(contractArgs);

    console.log("Prediction hash", hash);

    const { prediction, updatedUser } = await managePrediction(
      props.userId,
      props.marketId,
      props.amount,
      props.option
    );
    trackMakePrediction(props.marketId, props.amount, props.option, "pwa");
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
