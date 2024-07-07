// @ts-nocheck

import { useMutation } from "@tanstack/react-query";
import {
  EightBallAddress,
  EightballV1ABI,
  getEightBallContract,
} from "../contracts/Eightball";
import {
  createPrediction,
  useCreatePrediction,
} from "@/lib/drizzle/drizzle/supabase/mutations/addPrediction";
import { WalletClient, Address } from "viem";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { USDC_ADDRESS, USDC_ABI } from "../contracts/Usdc";
import { ROOT_OPERATOR_ADDRESS } from "@/constants/operations";
import { supabase } from "@/lib/drizzle/drizzle/supabase/supabaseClient";
interface PredictParams {
  amount: number;
  preferYes: boolean;
  option: string;
  isBuy: boolean;
  marketId: number;
  userId: string;
  client: WalletClient;
  address: Address;
}

async function predict(props: PredictParams) {
  console.log("Props", props.amount, props.marketId);
  if (!props.amount || !props.marketId) {
    throw new Error("All fields must be provided");
  }
  try {
    const account = props.address;

    const allowance = await rpcClient.readContract({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      args: [account, EightBallAddress],
      functionName: "allowance",
    });

    if (allowance < BigInt(props.amount)) {
      // Approve the USDC transfer
      const { request: usdcRequest } = await rpcClient.simulateContract({
        account,
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        args: [EightBallAddress, 1500000n],
        functionName: "approve",
      });

      const usdcApproval = await props.client.writeContract(usdcRequest);
      console.log("Approved USDC", usdcApproval, account);
    }

    const preferYesNum = props.preferYes ? 1 : 0;

    // Boost the market
    const { request } = await rpcClient.simulateContract({
      account,
      address: EightBallAddress,
      abi: EightballV1ABI,
      args: [
        BigInt(props.amount),
        preferYesNum,
        BigInt(props.marketId),
        ROOT_OPERATOR_ADDRESS,
        990,
      ],
      functionName: "predict",
    });

    const result = await props.client.writeContract(request);

    //TODO: Integrate Multiplier
    const send = await createPrediction({
      user_id: props.userId,
      market_id: props.marketId,
      amount: props.amount,
      option: props.option,
      multiplier: 2.2,
    });

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("liquiditypoints")
      .eq("external_auth_provider_user_id", props.userId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const points = (props.amount / 10 ** 6) * 2;
    const newLiquidityPoints = (user?.liquiditypoints || 0) + points;

    // Update the liquidity points
    const { data, error: updateError } = await supabase
      .from("users")
      .update({ liquiditypoints: newLiquidityPoints })
      .match({ external_auth_provider_user_id: props?.userId })
      .single();

    if (updateError) {
      throw new Error(updateError.message);
    }

    console.log("Added Prediction to DB", send);
  } catch (error) {
    console.error("Error during prediction", error);
    throw error; // Rethrow the error after logging it
  }
}

export const usePredict = () => {
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
