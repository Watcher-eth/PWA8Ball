// @ts-nocheck

import {
  WalletClient,
  createPublicClient,
  custom,
  getContract,
  http,
} from "viem";
import { baseGoerli } from "viem/chains";
import { rpcClient } from "@/lib/onchain/rpcClient";
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/onchain";

export const EightballV1ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_oracleAddress", type: "address", internalType: "address" },
      { name: "_usdc", type: "address", internalType: "address" },
      { name: "_outcomeFactory", type: "address", internalType: "address" },
      { name: "_router", type: "address", internalType: "address" },
      { name: "_feeManagerAddress", type: "address", internalType: "address" },
      {
        name: "_storageContractAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addLiquidity",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cashOut",
    inputs: [
      { name: "_desiredAmount", type: "uint256", internalType: "uint256" },
      { name: "preferYes", type: "uint16", internalType: "uint16" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      { name: "_operator", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "creatorResolution",
    inputs: [
      { name: "_outcome", type: "address", internalType: "address" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "feeManager",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract FeeManagerV2" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOdds",
    inputs: [{ name: "_marketId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "_yesOdd", type: "uint256", internalType: "uint256" },
      { name: "_noOdd", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initializeMarket",
    inputs: [
      { name: "_operator", type: "address", internalType: "address" },
      { name: "_creator", type: "address", internalType: "address" },
      { name: "_initProb", type: "uint256", internalType: "uint256" },
      {
        name: "params",
        type: "tuple",
        internalType: "struct IEightBall.MarketInitializationParams",
        components: [
          { name: "topicId", type: "uint32", internalType: "uint32" },
          { name: "outcomeA", type: "string", internalType: "string" },
          { name: "outcomeB", type: "string", internalType: "string" },
          { name: "title", type: "string", internalType: "string" },
          { name: "question", type: "string", internalType: "string" },
        ],
      },
    ],
    outputs: [
      {
        name: "newPair",
        type: "tuple",
        internalType: "struct EightBallStorage.MarketPair",
        components: [
          { name: "id", type: "uint256", internalType: "uint256" },
          { name: "usdcBalance", type: "uint256", internalType: "uint256" },
          {
            name: "liquidityBalance",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "yesToken", type: "address", internalType: "address" },
          { name: "noToken", type: "address", internalType: "address" },
          { name: "liquidityPool", type: "address", internalType: "address" },
          { name: "outcome", type: "address", internalType: "address" },
          { name: "creator", type: "address", internalType: "address" },
          { name: "isResolved", type: "bool", internalType: "bool" },
          { name: "isPreResolution", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "optimisticOracle",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract CreatorResolution" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "outcomeFactory",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IPairFactoryV1" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "predict",
    inputs: [
      { name: "_desiredAmount", type: "uint256", internalType: "uint256" },
      { name: "preferYes", type: "uint16", internalType: "uint16" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      { name: "_operator", type: "address", internalType: "address" },
      { name: "_slippage", type: "uint16", internalType: "uint16" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeem",
    inputs: [{ name: "_marketId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidity",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "resolve",
    inputs: [
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      { name: "truthyOutcome", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "router",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IEightBallV1Router",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "storageContract",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract EightBallStorage" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "usdc",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AddLQ",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_liquidity",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Cashout",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "amountUsdc",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "outcomeTokens",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "totalStake",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "preferYes",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OutcomeProposed",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "outcome",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Prediction",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "amountUsdc",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "outcomeTokens",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "totalStake",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "preferYes",
        type: "uint16",
        indexed: false,
        internalType: "uint16",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PredictionCreated",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "liquidityTotal",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "initialOdd",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "topicId",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      { name: "title", type: "string", indexed: false, internalType: "string" },
      {
        name: "question",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "outcomeA",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "outcomeB",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PredictionResolved",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "outcome",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RemoveLQ",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_liquidity",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "AmountMustBeGreaterThanZero", inputs: [] },
  { type: "error", name: "ApprovalFailed", inputs: [] },
  { type: "error", name: "ApprovalFailed", inputs: [] },
  { type: "error", name: "EnforcedPause", inputs: [] },
  { type: "error", name: "ExpectedPause", inputs: [] },
  { type: "error", name: "InsufficientBalanceToAddLiquidity", inputs: [] },
  { type: "error", name: "InsufficientBalanceToMakePrediction", inputs: [] },
  { type: "error", name: "InsufficientBalanceToMakePrediction", inputs: [] },
  { type: "error", name: "IsPreResolution", inputs: [] },
  { type: "error", name: "MarketNotResolved", inputs: [] },
  { type: "error", name: "NotEligible", inputs: [] },
  { type: "error", name: "NotEnoughBalance", inputs: [] },
  { type: "error", name: "NotResolver", inputs: [] },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  { type: "error", name: "TransferFailed", inputs: [] },
] as const;

export async function getEightBallContract(walletClient: WalletClient) {
  // Use walletClient for write operations and rpcClient for read operations
  const contract = getContract({
    abi: EightballV1ABI,
    address: BASE_SEPOLIA_EIGHTBALL_ADDRESS,
    client: { public: rpcClient, wallet: walletClient },
  });

  return contract;
}
