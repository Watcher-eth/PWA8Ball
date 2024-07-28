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
      { name: "_uniswapFactory", type: "address", internalType: "address" },
      { name: "_uniswapRouter", type: "address", internalType: "address" },
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
      { name: "_disputer", type: "address", internalType: "address" },
      { name: "_initProb", type: "uint256", internalType: "uint256" },
      { name: "_fullNames", type: "string[2]", internalType: "string[2]" },
      { name: "_shortNames", type: "string[2]", internalType: "string[2]" },
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
          { name: "disputer", type: "address", internalType: "address" },
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
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      { name: "truthyOutcome", type: "address", internalType: "address" },
    ],
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
        name: "_Amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "_outcomeTokens",
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
  { type: "error", name: "IsPreResolution", inputs: [] },
  { type: "error", name: "MarketNotResolved", inputs: [] },
  { type: "error", name: "NotEligible", inputs: [] },
  { type: "error", name: "NotEnoughBalance", inputs: [] },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  { type: "error", name: "TransferFailed", inputs: [] },
] as const;

export const PairV1Abi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "DOMAIN_SEPARATOR",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MINIMUM_LIQUIDITY",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PERMIT_TYPEHASH",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approveEightBall",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [{ name: "to", type: "address", internalType: "address" }],
    outputs: [
      { name: "amount0", type: "uint256", internalType: "uint256" },
      { name: "amount1", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProbability",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [
      { name: "_prob0", type: "int128", internalType: "int128" },
      { name: "_prob1", type: "int128", internalType: "int128" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getReserves",
    inputs: [],
    outputs: [
      { name: "_reserve0", type: "uint112", internalType: "uint112" },
      { name: "_reserve1", type: "uint112", internalType: "uint112" },
      { name: "_blockTimestampLast", type: "uint32", internalType: "uint32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      { name: "_token0", type: "address", internalType: "address" },
      { name: "_token1", type: "address", internalType: "address" },
      { name: "_initProb", type: "uint256", internalType: "uint256" },
      { name: "_router", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "kLast",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "usdcTotal", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "liquidity", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonces",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "permit",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "price0CumulativeLast",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "price1CumulativeLast",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "router",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "skim",
    inputs: [{ name: "to", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swap",
    inputs: [
      { name: "amount0Out", type: "uint256", internalType: "uint256" },
      { name: "amount1Out", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sync",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "token0",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "token1",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateProbabilities",
    inputs: [
      { name: "newProb0", type: "int128", internalType: "int128" },
      { name: "newProb1", type: "int128", internalType: "int128" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Burn",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount0",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      { name: "to", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Mint",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount0",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount0In",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount1In",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount0Out",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount1Out",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      { name: "to", type: "address", indexed: true, internalType: "address" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Sync",
    inputs: [
      {
        name: "reserve0",
        type: "uint112",
        indexed: false,
        internalType: "uint112",
      },
      {
        name: "reserve1",
        type: "uint112",
        indexed: false,
        internalType: "uint112",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
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
