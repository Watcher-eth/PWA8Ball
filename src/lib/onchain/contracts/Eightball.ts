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
import { BASE_SEPOLIA_EIGHTBALL_ADDRESS } from "@/constants/Onchain";

export const EightballV1ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_oracleAddress", type: "address", internalType: "address" },
      { name: "_usdc", type: "address", internalType: "address" },
      { name: "_uniswapFactory", type: "address", internalType: "address" },
      { name: "_uniswapRouter", type: "address", internalType: "address" },
      { name: "_feeManagerAddress", type: "address", internalType: "address" },
      {
        name: "_adminContractAddress",
        type: "address",
        internalType: "address",
      },
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
    name: "adminContract",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract EightBallAdmin" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "boostMarket",
    inputs: [
      { name: "_Amount", type: "uint256", internalType: "uint256" },
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
    name: "feeManager",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract FeeManagerV2" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMultiplier",
    inputs: [
      { name: "_preferYes", type: "uint16", internalType: "uint16" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "multiplier", type: "uint256", internalType: "uint256" }],
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
    name: "oracle",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IOracle" }],
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
      { name: "_Amount", type: "uint256", internalType: "uint256" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "resolve",
    inputs: [
      { name: "_outcome", type: "address", internalType: "address" },
      { name: "_marketId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPreResolution",
    inputs: [{ name: "_marketId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "uniswapFactory",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IPairFactoryV1" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "uniswapRouter",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IUniswapV2Router" },
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
    name: "Cashout",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_Amount",
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
    name: "MarketBoosted",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_Amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_tokenA",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "_tokenB",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "Prediction",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "_Amount",
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
        name: "_Amount",
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
  { type: "error", name: "AmountMustBeGreaterThanZero", inputs: [] },
  { type: "error", name: "ApprovalFailed", inputs: [] },
  { type: "error", name: "ApprovalFailed", inputs: [] },
  { type: "error", name: "InsufficientBalanceToAddLiquidity", inputs: [] },
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
