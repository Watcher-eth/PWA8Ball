import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen"

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AMMLPToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const AmmlpTokenAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approveEightBall",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const AccessControlAbi = [
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cheats
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CheatsAbi = [
  {
    type: "function",
    inputs: [
      { name: "", internalType: "bool", type: "bool" },
      { name: "", internalType: "bool", type: "bool" },
      { name: "", internalType: "bool", type: "bool" },
      { name: "", internalType: "bool", type: "bool" },
    ],
    name: "expectEmit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "msg", internalType: "bytes", type: "bytes" }],
    name: "expectRevert",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "string[]", type: "string[]" }],
    name: "ffi",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "x", internalType: "uint256", type: "uint256" }],
    name: "roll",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "c", internalType: "address", type: "address" },
      { name: "loc", internalType: "bytes32", type: "bytes32" },
      { name: "val", internalType: "bytes32", type: "bytes32" },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "x", internalType: "uint256", type: "uint256" }],
    name: "warp",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CreatorResolution
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CreatorResolutionAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_usdc", internalType: "address", type: "address" },
      { name: "_eightBallStorage", internalType: "address", type: "address" },
      { name: "_adminContract", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DISPUTER_BOND",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "PROPOSER_BOND",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "disputer", internalType: "address", type: "address" }],
    name: "addDisputer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "adminContract",
    outputs: [
      { name: "", internalType: "contract EightBallAdmin", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "allowedDisputers",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "marketId", internalType: "uint256", type: "uint256" },
      { name: "outcome", internalType: "address", type: "address" },
      {
        name: "outcomeState",
        internalType: "enum CreatorResolution.OutcomeState",
        type: "uint8",
      },
    ],
    name: "disputeOutcome",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "eightBallStorage",
    outputs: [
      { name: "", internalType: "contract EightBallStorage", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "marketId", internalType: "uint256", type: "uint256" }],
    name: "getMarket",
    outputs: [
      {
        name: "",
        internalType: "struct CreatorResolution.Market",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "resolved", internalType: "bool", type: "bool" },
          { name: "outcome", internalType: "address", type: "address" },
          {
            name: "outcomeState",
            internalType: "enum CreatorResolution.OutcomeState",
            type: "uint8",
          },
          { name: "proposer", internalType: "address", type: "address" },
          { name: "disputer", internalType: "address", type: "address" },
          { name: "disputeEndTime", internalType: "uint256", type: "uint256" },
          { name: "disputed", internalType: "bool", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "marketProposers",
    outputs: [
      { name: "proposer", internalType: "address", type: "address" },
      { name: "outcome", internalType: "address", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "marketId", internalType: "uint256", type: "uint256" },
      { name: "outcome", internalType: "address", type: "address" },
      { name: "endTime", internalType: "uint16", type: "uint16" },
    ],
    name: "proposeOutcome",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "disputer", internalType: "address", type: "address" }],
    name: "removeDisputer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "marketId", internalType: "uint256", type: "uint256" },
      { name: "realOutcome", internalType: "address", type: "address" },
    ],
    name: "resolveMarket",
    outputs: [{ name: "_outcome", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "usdc",
    outputs: [{ name: "", internalType: "contract IERC20", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "disputer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "DisputerAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "disputer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "DisputerRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "MarketCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "outcomeState",
        internalType: "enum CreatorResolution.OutcomeState",
        type: "uint8",
        indexed: false,
      },
    ],
    name: "MarketResolved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "outcomeState",
        internalType: "enum CreatorResolution.OutcomeState",
        type: "uint8",
        indexed: false,
      },
      {
        name: "disputer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "OutcomeDisputed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "outcomeState",
        internalType: "enum CreatorResolution.OutcomeState",
        type: "uint8",
        indexed: false,
      },
      {
        name: "proposer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "OutcomeProposed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "CannotDisputeSameOutcome" },
  { type: "error", inputs: [], name: "DisputePeriodOver" },
  { type: "error", inputs: [], name: "InvalidMarketId" },
  { type: "error", inputs: [], name: "InvalidOutcome" },
  { type: "error", inputs: [], name: "MarketAlreadyResolved" },
  { type: "error", inputs: [], name: "MaxResolutionTimeExceeded" },
  { type: "error", inputs: [], name: "OnlyMarketCreatorCanPropose" },
  { type: "error", inputs: [], name: "OutcomeAlreadyProposed" },
  { type: "error", inputs: [], name: "OutcomeNotProposed" },
  { type: "error", inputs: [], name: "UnauthorizedDisputer" },
  { type: "error", inputs: [], name: "UnauthorizedRequest" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Erc165Abi = [
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EightBall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const EightBallAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_oracleAddress", internalType: "address", type: "address" },
      { name: "_usdc", internalType: "address", type: "address" },
      { name: "_outcomeFactory", internalType: "address", type: "address" },
      { name: "_router", internalType: "address", type: "address" },
      { name: "_feeManagerAddress", internalType: "address", type: "address" },
      {
        name: "_storageContractAddress",
        internalType: "address",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_amount", internalType: "uint256", type: "uint256" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_desiredAmount", internalType: "uint256", type: "uint256" },
      { name: "preferYes", internalType: "uint16", type: "uint16" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "cashOut",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_outcome", internalType: "address", type: "address" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
    ],
    name: "creatorResolution",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "feeManager",
    outputs: [
      { name: "", internalType: "contract FeeManagerV2", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_marketId", internalType: "uint256", type: "uint256" }],
    name: "getOdds",
    outputs: [
      { name: "_yesOdd", internalType: "uint256", type: "uint256" },
      { name: "_noOdd", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_creator", internalType: "address", type: "address" },
      { name: "_initProb", internalType: "uint256", type: "uint256" },
      {
        name: "params",
        internalType: "struct IEightBall.MarketInitializationParams",
        type: "tuple",
        components: [
          { name: "topicId", internalType: "uint32", type: "uint32" },
          { name: "outcomeA", internalType: "string", type: "string" },
          { name: "outcomeB", internalType: "string", type: "string" },
          { name: "title", internalType: "string", type: "string" },
          { name: "question", internalType: "string", type: "string" },
        ],
      },
    ],
    name: "initializeMarket",
    outputs: [
      {
        name: "newPair",
        internalType: "struct EightBallStorage.MarketPair",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "usdcBalance", internalType: "uint256", type: "uint256" },
          {
            name: "liquidityBalance",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "yesToken", internalType: "address", type: "address" },
          { name: "noToken", internalType: "address", type: "address" },
          { name: "liquidityPool", internalType: "address", type: "address" },
          { name: "outcome", internalType: "address", type: "address" },
          { name: "creator", internalType: "address", type: "address" },
          { name: "isResolved", internalType: "bool", type: "bool" },
          { name: "isPreResolution", internalType: "bool", type: "bool" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "optimisticOracle",
    outputs: [
      { name: "", internalType: "contract CreatorResolution", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "outcomeFactory",
    outputs: [
      { name: "", internalType: "contract IPairFactoryV1", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "params",
        internalType: "struct IEightBall.PredictionParams",
        type: "tuple",
        components: [
          { name: "desiredAmount", internalType: "uint256", type: "uint256" },
          { name: "preferYes", internalType: "uint16", type: "uint16" },
          { name: "marketId", internalType: "uint256", type: "uint256" },
          { name: "operator", internalType: "address", type: "address" },
          { name: "slippage", internalType: "uint16", type: "uint16" },
          { name: "referrer", internalType: "address", type: "address" },
        ],
      },
    ],
    name: "predict",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_marketId", internalType: "uint256", type: "uint256" }],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_amount", internalType: "uint256", type: "uint256" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_marketId", internalType: "uint256", type: "uint256" },
      { name: "truthyOutcome", internalType: "address", type: "address" },
    ],
    name: "resolve",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "router",
    outputs: [
      {
        name: "",
        internalType: "contract IEightBallV1Router",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "storageContract",
    outputs: [
      { name: "", internalType: "contract EightBallStorage", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "usdc",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "_amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_liquidity",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "AddLQ",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "amountUsdc",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "outcomeTokens",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "totalStake",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "preferYes",
        internalType: "uint16",
        type: "uint16",
        indexed: false,
      },
    ],
    name: "Cashout",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "OutcomeProposed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "amountUsdc",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "outcomeTokens",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "totalStake",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "referrer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "preferYes",
        internalType: "uint16",
        type: "uint16",
        indexed: false,
      },
    ],
    name: "Prediction",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "liquidityTotal",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "initialOdd",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "topicId",
        internalType: "uint32",
        type: "uint32",
        indexed: false,
      },
      { name: "title", internalType: "string", type: "string", indexed: false },
      {
        name: "question",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "outcomeA",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "outcomeB",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "PredictionCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "PredictionResolved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "_amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_liquidity",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "RemoveLQ",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  { type: "error", inputs: [], name: "AmountMustBeGreaterThanZero" },
  { type: "error", inputs: [], name: "ApprovalFailed" },
  { type: "error", inputs: [], name: "ApprovalFailed" },
  { type: "error", inputs: [], name: "EnforcedPause" },
  { type: "error", inputs: [], name: "ExpectedPause" },
  { type: "error", inputs: [], name: "InsufficientBalanceToAddLiquidity" },
  { type: "error", inputs: [], name: "InsufficientBalanceToMakePrediction" },
  { type: "error", inputs: [], name: "InsufficientBalanceToMakePrediction" },
  { type: "error", inputs: [], name: "IsPreResolution" },
  { type: "error", inputs: [], name: "MarketNotResolved" },
  { type: "error", inputs: [], name: "NotEligible" },
  { type: "error", inputs: [], name: "NotEnoughBalance" },
  { type: "error", inputs: [], name: "NotResolver" },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  { type: "error", inputs: [], name: "TransferFailed" },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const EightBallAddress = {
  8453: "0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3",
  84532: "0x93beCc08844c4aa0F6d3A3f447A3B14E95e46c26",
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const EightBallConfig = {
  address: EightBallAddress,
  abi: EightBallAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EightBallAdmin
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const EightBallAdminAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_baseOperator", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "MARKET_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "OPERATOR_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "baseOperator",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "market", internalType: "address", type: "address" }],
    name: "grantMarket",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "grantOperator",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceAdmin",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "revokeOperator",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_baseOperator", internalType: "address", type: "address" },
    ],
    name: "setNewBaseOperator",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "admin",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AdminRenounced",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "newBaseOperator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "BaseOperatorChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "market",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "MarketGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OperatorGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OperatorRevoked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const EightBallAdminAddress = {
  8453: "0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970",
  84532: "0x2Ba053e368450f9D676f7bBD0D9798e6565613c9",
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const EightBallAdminConfig = {
  address: EightBallAdminAddress,
  abi: EightBallAdminAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EightBallLiquidity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const EightBallLiquidityAbi = [
  { type: "error", inputs: [], name: "AmountMustBeGreaterThanZero" },
  { type: "error", inputs: [], name: "InsufficientBalanceToAddLiquidity" },
  { type: "error", inputs: [], name: "NotEnoughBalance" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EightBallStorage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const EightBallStorageAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_adminContract", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "adminContract",
    outputs: [
      { name: "", internalType: "contract EightBallAdmin", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "currentPairId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getMarketPair",
    outputs: [
      {
        name: "",
        internalType: "struct EightBallStorage.MarketPair",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "usdcBalance", internalType: "uint256", type: "uint256" },
          {
            name: "liquidityBalance",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "yesToken", internalType: "address", type: "address" },
          { name: "noToken", internalType: "address", type: "address" },
          { name: "liquidityPool", internalType: "address", type: "address" },
          { name: "outcome", internalType: "address", type: "address" },
          { name: "creator", internalType: "address", type: "address" },
          { name: "isResolved", internalType: "bool", type: "bool" },
          { name: "isPreResolution", internalType: "bool", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "incrementCurrentPairId",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256" },
      {
        name: "pair",
        internalType: "struct EightBallStorage.MarketPair",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "usdcBalance", internalType: "uint256", type: "uint256" },
          {
            name: "liquidityBalance",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "yesToken", internalType: "address", type: "address" },
          { name: "noToken", internalType: "address", type: "address" },
          { name: "liquidityPool", internalType: "address", type: "address" },
          { name: "outcome", internalType: "address", type: "address" },
          { name: "creator", internalType: "address", type: "address" },
          { name: "isResolved", internalType: "bool", type: "bool" },
          { name: "isPreResolution", internalType: "bool", type: "bool" },
        ],
      },
    ],
    name: "storeMarketPair",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "EightBallStorageCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "EnforcedPause" },
  { type: "error", inputs: [], name: "ExpectedPause" },
  { type: "error", inputs: [], name: "InvalidMarketPairId" },
  { type: "error", inputs: [], name: "UnauthorizedCaller" },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const EightBallStorageAddress = {
  8453: "0x4cf6901f56996F0639dd64E48931B67A46D33765",
  84532: "0xdE8bccBB3C197De83EE2Ee9a4D94d87714c4FCb2",
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const EightBallStorageConfig = {
  address: EightBallStorageAddress,
  abi: EightBallStorageAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FeeManagerV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const FeeManagerV2Abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_usdc", internalType: "address", type: "address" },
      { name: "_adminContract", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "REFERRAL_FEE_BPS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "accruedBaseFees",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "accruedCreatorFees",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "accruedOperatorFees",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "accruedReferralFees",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "adminContract",
    outputs: [
      { name: "", internalType: "contract EightBallAdmin", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "baseFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "baseOperator",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "claimBaseFees",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "claimCreatorFees",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "claimOperatorFees",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "claimReferralFees",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "creator", internalType: "address", type: "address" },
      { name: "referrer", internalType: "address", type: "address" },
    ],
    name: "collectFees",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "creatorFees",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "creator", internalType: "address", type: "address" }],
    name: "getFeeForCreator",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "getFeeForOperator",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "creator", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
      { name: "referrer", internalType: "address", type: "address" },
    ],
    name: "getTotalFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "operatorFees",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newBaseFee", internalType: "uint256", type: "uint256" }],
    name: "setBaseFee",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "creator", internalType: "address", type: "address" },
      { name: "newFeePercentage", internalType: "uint256", type: "uint256" },
    ],
    name: "setCreatorFee",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "newFeePercentage", internalType: "uint256", type: "uint256" },
    ],
    name: "setOperatorFee",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "usdc",
    outputs: [{ name: "", internalType: "contract IERC20", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "BaseFeesClaimed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "creator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "CreatorFeesClaimed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FeesCollected",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OperatorFeesClaimed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "referrer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ReferralFeesClaimed",
  },
  { type: "error", inputs: [], name: "CallerNotAdmin" },
  { type: "error", inputs: [], name: "CallerNotBaseOperator" },
  { type: "error", inputs: [], name: "CallerNotOperator" },
  { type: "error", inputs: [], name: "FeeClaimFailed" },
  { type: "error", inputs: [], name: "FeePercentageExceedsLimit" },
  { type: "error", inputs: [], name: "FeeTransferFailed" },
  { type: "error", inputs: [], name: "NewFeeExceedsMaxFee" },
  { type: "error", inputs: [], name: "NotWhitelistedCreator" },
  { type: "error", inputs: [], name: "NotWhitelistedOperator" },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const FeeManagerV2Address = {
  8453: "0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9",
  84532: "0x3501C77f9356728b1f20cd621eF69325BA35fb7A",
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const FeeManagerV2Config = {
  address: FeeManagerV2Address,
  abi: FeeManagerV2Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HashPairV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HashPairV1Abi = [
  {
    type: "function",
    inputs: [],
    name: "IS_SCRIPT",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "run",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IAccessControlAbi = [
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc1155ErrorsAbi = [
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidApprover",
  },
  {
    type: "error",
    inputs: [
      { name: "idsLength", internalType: "uint256", type: "uint256" },
      { name: "valuesLength", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC1155InvalidArrayLength",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC1155InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC1155InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC1155InvalidSender",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC1155MissingApprovalForAll",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc20ErrorsAbi = [
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc20MetadataAbi = [
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc721Abi = [
  {
    type: "function",
    inputs: [
      { name: "_approved", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "_owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceID", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_approved",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_from",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      {
        name: "_tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc721EnumerableAbi = [
  {
    type: "function",
    inputs: [
      { name: "_approved", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "_owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceID", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_index", internalType: "uint256", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_index", internalType: "uint256", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_approved",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_from",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      {
        name: "_tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc721ErrorsAbi = [
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC721IncorrectOwner",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC721InsufficientApproval",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC721InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC721InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "ERC721InvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC721InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC721InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ERC721NonexistentToken",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc721MetadataAbi = [
  {
    type: "function",
    inputs: [
      { name: "_approved", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "_owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "_name", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceID", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "_symbol", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_approved",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_from",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      {
        name: "_tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Ierc721TokenReceiverAbi = [
  {
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_from", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "_data", internalType: "bytes", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEightBall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IEightBallAbi = [
  {
    type: "function",
    inputs: [
      { name: "_amount", internalType: "uint256", type: "uint256" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_desiredAmount", internalType: "uint256", type: "uint256" },
      { name: "preferYes", internalType: "uint16", type: "uint16" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "cashOut",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_outcome", internalType: "address", type: "address" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
    ],
    name: "creatorResolution",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_marketId", internalType: "uint256", type: "uint256" }],
    name: "getOdds",
    outputs: [
      { name: "_yesOdd", internalType: "uint256", type: "uint256" },
      { name: "_noOdd", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_creator", internalType: "address", type: "address" },
      { name: "_initProb", internalType: "uint256", type: "uint256" },
      {
        name: "params",
        internalType: "struct IEightBall.MarketInitializationParams",
        type: "tuple",
        components: [
          { name: "topicId", internalType: "uint32", type: "uint32" },
          { name: "outcomeA", internalType: "string", type: "string" },
          { name: "outcomeB", internalType: "string", type: "string" },
          { name: "title", internalType: "string", type: "string" },
          { name: "question", internalType: "string", type: "string" },
        ],
      },
    ],
    name: "initializeMarket",
    outputs: [
      {
        name: "newPair",
        internalType: "struct EightBallStorage.MarketPair",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "usdcBalance", internalType: "uint256", type: "uint256" },
          {
            name: "liquidityBalance",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "yesToken", internalType: "address", type: "address" },
          { name: "noToken", internalType: "address", type: "address" },
          { name: "liquidityPool", internalType: "address", type: "address" },
          { name: "outcome", internalType: "address", type: "address" },
          { name: "creator", internalType: "address", type: "address" },
          { name: "isResolved", internalType: "bool", type: "bool" },
          { name: "isPreResolution", internalType: "bool", type: "bool" },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "params",
        internalType: "struct IEightBall.PredictionParams",
        type: "tuple",
        components: [
          { name: "desiredAmount", internalType: "uint256", type: "uint256" },
          { name: "preferYes", internalType: "uint16", type: "uint16" },
          { name: "marketId", internalType: "uint256", type: "uint256" },
          { name: "operator", internalType: "address", type: "address" },
          { name: "slippage", internalType: "uint16", type: "uint16" },
          { name: "referrer", internalType: "address", type: "address" },
        ],
      },
    ],
    name: "predict",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_marketId", internalType: "uint256", type: "uint256" }],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_amount", internalType: "uint256", type: "uint256" },
      { name: "_marketId", internalType: "uint256", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_marketId", internalType: "uint256", type: "uint256" },
      { name: "truthyOutcome", internalType: "address", type: "address" },
    ],
    name: "resolve",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "_amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_liquidity",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "AddLQ",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "amountUsdc",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "outcomeTokens",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "totalStake",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "preferYes",
        internalType: "uint16",
        type: "uint16",
        indexed: false,
      },
    ],
    name: "Cashout",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "OutcomeProposed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "amountUsdc",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "outcomeTokens",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "totalStake",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "referrer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "preferYes",
        internalType: "uint16",
        type: "uint16",
        indexed: false,
      },
    ],
    name: "Prediction",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "liquidityTotal",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "initialOdd",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "topicId",
        internalType: "uint32",
        type: "uint32",
        indexed: false,
      },
      { name: "title", internalType: "string", type: "string", indexed: false },
      {
        name: "question",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "outcomeA",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "outcomeB",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "PredictionCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "outcome",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "PredictionResolved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "marketId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "_amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "_liquidity",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "user",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "RemoveLQ",
  },
  { type: "error", inputs: [], name: "AmountMustBeGreaterThanZero" },
  { type: "error", inputs: [], name: "ApprovalFailed" },
  { type: "error", inputs: [], name: "InsufficientBalanceToAddLiquidity" },
  { type: "error", inputs: [], name: "InsufficientBalanceToMakePrediction" },
  { type: "error", inputs: [], name: "IsPreResolution" },
  { type: "error", inputs: [], name: "MarketNotResolved" },
  { type: "error", inputs: [], name: "NotEligible" },
  { type: "error", inputs: [], name: "NotEnoughBalance" },
  { type: "error", inputs: [], name: "NotResolver" },
  { type: "error", inputs: [], name: "TransferFailed" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEightBallAMMCallee
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IEightBallAmmCalleeAbi = [
  {
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "uniswapV2Call",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEightBallV1Router
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IEightBallV1RouterAbi = [
  {
    type: "function",
    inputs: [],
    name: "WETH",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "amountNew", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "usdcTotal", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "amountB", internalType: "uint256", type: "uint256" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "amountOutMin", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "buyOutcome",
    outputs: [
      { name: "amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "factory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "reserveIn", internalType: "uint256", type: "uint256" },
      { name: "reserveOut", internalType: "uint256", type: "uint256" },
      { name: "probIn", internalType: "int128", type: "int128" },
    ],
    name: "getAmountOut",
    outputs: [{ name: "amountOut", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { name: "amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "reserveA", internalType: "uint256", type: "uint256" },
      { name: "reserveB", internalType: "uint256", type: "uint256" },
      { name: "probA", internalType: "int128", type: "int128" },
    ],
    name: "quote",
    outputs: [{ name: "amountB", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
      { name: "amountAMin", internalType: "uint256", type: "uint256" },
      { name: "amountBMin", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "amountB", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEightBallV1Router01
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IEightBallV1Router01Abi = [
  {
    type: "function",
    inputs: [],
    name: "WETH",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "amountNew", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "usdcTotal", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "amountB", internalType: "uint256", type: "uint256" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "amountOutMin", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "buyOutcome",
    outputs: [
      { name: "amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "factory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "reserveIn", internalType: "uint256", type: "uint256" },
      { name: "reserveOut", internalType: "uint256", type: "uint256" },
      { name: "probIn", internalType: "int128", type: "int128" },
    ],
    name: "getAmountOut",
    outputs: [{ name: "amountOut", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { name: "amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "reserveA", internalType: "uint256", type: "uint256" },
      { name: "reserveB", internalType: "uint256", type: "uint256" },
      { name: "probA", internalType: "int128", type: "int128" },
    ],
    name: "quote",
    outputs: [{ name: "amountB", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
      { name: "amountAMin", internalType: "uint256", type: "uint256" },
      { name: "amountBMin", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "amountB", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEightBallV2MarketLPToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IEightBallV2MarketLpTokenAbi = [
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approveEightBall",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEightBallV2Pair
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IEightBallV2PairAbi = [
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approveEightBall",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "burn",
    outputs: [
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [],
    name: "factory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "token0", internalType: "address", type: "address" }],
    name: "getProbability",
    outputs: [
      { name: "prob0", internalType: "int128", type: "int128" },
      { name: "prob1", internalType: "int128", type: "int128" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getReserves",
    outputs: [
      { name: "reserve0", internalType: "uint112", type: "uint112" },
      { name: "reserve1", internalType: "uint112", type: "uint112" },
      { name: "blockTimestampLast", internalType: "uint32", type: "uint32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "kLast",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "usdcTotal", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ name: "liquidity", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "skim",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "amount0Out", internalType: "uint256", type: "uint256" },
      { name: "amount1Out", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [],
    name: "sync",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "token0",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "token1",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newProb0", internalType: "int128", type: "int128" },
      { name: "newProb1", internalType: "int128", type: "int128" },
    ],
    name: "updateProbabilities",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount0",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
    ],
    name: "Burn",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount0",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Mint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount0In",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1In",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount0Out",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1Out",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
    ],
    name: "Swap",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "reserve0",
        internalType: "uint112",
        type: "uint112",
        indexed: false,
      },
      {
        name: "reserve1",
        internalType: "uint112",
        type: "uint112",
        indexed: false,
      },
    ],
    name: "Sync",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IMulticall3Abi = [
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "returnData", internalType: "bytes[]", type: "bytes[]" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call3[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "allowFailure", internalType: "bool", type: "bool" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call3Value[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "allowFailure", internalType: "bool", type: "bool" },
          { name: "value", internalType: "uint256", type: "uint256" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate3Value",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "blockHash", internalType: "bytes32", type: "bytes32" },
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "getBasefee",
    outputs: [{ name: "basefee", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "blockNumber", internalType: "uint256", type: "uint256" }],
    name: "getBlockHash",
    outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getBlockNumber",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getChainId",
    outputs: [{ name: "chainid", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [{ name: "coinbase", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [{ name: "difficulty", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [{ name: "gaslimit", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [{ name: "timestamp", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "addr", internalType: "address", type: "address" }],
    name: "getEthBalance",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getLastBlockHash",
    outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "requireSuccess", internalType: "bool", type: "bool" },
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "requireSuccess", internalType: "bool", type: "bool" },
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "blockHash", internalType: "bytes32", type: "bytes32" },
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    stateMutability: "payable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IOutcomeToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IOutcomeTokenAbi = [
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPairFactoryV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IPairFactoryV1Abi = [
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "allPairs",
    outputs: [{ name: "pair", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "allPairsLength",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "_initProb", internalType: "uint256", type: "uint256" },
      { name: "_router", internalType: "address", type: "address" },
    ],
    name: "createPair",
    outputs: [{ name: "pair", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "feeTo",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "feeToSetter",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
    ],
    name: "getPair",
    outputs: [{ name: "pair", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "setFeeTo",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "setFeeToSetter",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token0",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "token1",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "pair",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "initialProb",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "PairCreated",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWETH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IwethAbi = [
  {
    type: "function",
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OutcomeToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OutcomeTokenAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_name", internalType: "string", type: "string" },
      { name: "_symbol", internalType: "string", type: "string" },
      { name: "initialOwner", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "error",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "allowance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "balance", internalType: "uint256", type: "uint256" },
      { name: "needed", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC20InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC20InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "spender", internalType: "address", type: "address" }],
    name: "ERC20InvalidSpender",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OutcomeTokenFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OutcomeTokenFactoryAbi = [
  {
    type: "function",
    inputs: [
      { name: "name", internalType: "string", type: "string" },
      { name: "symbol", internalType: "string", type: "string" },
      { name: "initialOwner", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
    ],
    name: "computeAddress",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "marketId", internalType: "uint256", type: "uint256" },
      { name: "nameYesToken", internalType: "string", type: "string" },
      { name: "symbolYesToken", internalType: "string", type: "string" },
      { name: "nameNoToken", internalType: "string", type: "string" },
      { name: "symbolNoToken", internalType: "string", type: "string" },
      { name: "initialOwner", internalType: "address", type: "address" },
    ],
    name: "deployTokensWithOrdering",
    outputs: [
      { name: "yesTokenAddress", internalType: "address", type: "address" },
      { name: "noTokenAddress", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OwnableAbi = [
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PairFactoryV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const PairFactoryV1Abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_feeToSetter", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "PAIR_HASH",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "allPairs",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "allPairsLength",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "_initProb", internalType: "uint256", type: "uint256" },
      { name: "_router", internalType: "address", type: "address" },
    ],
    name: "createPair",
    outputs: [{ name: "pair", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "feeTo",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "feeToSetter",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "getPair",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "router",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_feeTo", internalType: "address", type: "address" }],
    name: "setFeeTo",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_feeToSetter", internalType: "address", type: "address" },
    ],
    name: "setFeeToSetter",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token0",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "token1",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "pair",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "initialProb",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "PairCreated",
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const PairFactoryV1Address = {
  8453: "0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957",
  84532: "0x5405eeAC7eBA0d1D2CbEE13Ca426B5b62BaC8c43",
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const PairFactoryV1Config = {
  address: PairFactoryV1Address,
  abi: PairFactoryV1Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PairV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const PairV1Abi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "approveEightBall",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "burn",
    outputs: [
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "factory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_token", internalType: "address", type: "address" }],
    name: "getProbability",
    outputs: [
      { name: "_prob0", internalType: "int128", type: "int128" },
      { name: "_prob1", internalType: "int128", type: "int128" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getReserves",
    outputs: [
      { name: "_reserve0", internalType: "uint112", type: "uint112" },
      { name: "_reserve1", internalType: "uint112", type: "uint112" },
      { name: "_blockTimestampLast", internalType: "uint32", type: "uint32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_token0", internalType: "address", type: "address" },
      { name: "_token1", internalType: "address", type: "address" },
      { name: "_initProb", internalType: "uint256", type: "uint256" },
      { name: "_router", internalType: "address", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "kLast",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "usdcTotal", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [{ name: "liquidity", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "router",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "to", internalType: "address", type: "address" }],
    name: "skim",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "amount0Out", internalType: "uint256", type: "uint256" },
      { name: "amount1Out", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "sync",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "token0",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "token1",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newProb0", internalType: "int128", type: "int128" },
      { name: "newProb1", internalType: "int128", type: "int128" },
    ],
    name: "updateProbabilities",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount0",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
    ],
    name: "Burn",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount0",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Mint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount0In",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1In",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount0Out",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "amount1Out",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
    ],
    name: "Swap",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "reserve0",
        internalType: "uint112",
        type: "uint112",
        indexed: false,
      },
      {
        name: "reserve1",
        internalType: "uint112",
        type: "uint112",
        indexed: false,
      },
    ],
    name: "Sync",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pausable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const PausableAbi = [
  {
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  { type: "error", inputs: [], name: "EnforcedPause" },
  { type: "error", inputs: [], name: "ExpectedPause" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ReentrancyGuardAbi = [
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RouterEventEmitter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RouterEventEmitterAbi = [
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    inputs: [
      { name: "router", internalType: "address", type: "address" },
      { name: "amountOut", internalType: "uint256", type: "uint256" },
      { name: "amountInMax", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "buyOutcome",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "amounts",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
    ],
    name: "Amounts",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RouterProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RouterProxyAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_implementationAddress",
        internalType: "address",
        type: "address",
      },
      { name: "_adminContract", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "fallback", stateMutability: "payable" },
  {
    type: "function",
    inputs: [],
    name: "adminContract",
    outputs: [
      { name: "", internalType: "contract EightBallAdmin", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "newImplementation", internalType: "address", type: "address" },
    ],
    name: "upgrade",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "implementation",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "Upgraded",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RouterV1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const RouterV1Abi = [
  {
    type: "constructor",
    inputs: [
      { name: "_factory", internalType: "address", type: "address" },
      { name: "_WETH", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    inputs: [],
    name: "WETH",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "amountNew", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "usdcTotal", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "amountB", internalType: "uint256", type: "uint256" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "amountOutMin", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "buyOutcome",
    outputs: [
      { name: "amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "factory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "reserveIn", internalType: "uint256", type: "uint256" },
      { name: "reserveOut", internalType: "uint256", type: "uint256" },
      { name: "probIn", internalType: "int128", type: "int128" },
    ],
    name: "getAmountOut",
    outputs: [{ name: "amountOut", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "amountIn", internalType: "uint256", type: "uint256" },
      { name: "path", internalType: "address[]", type: "address[]" },
    ],
    name: "getAmountsOut",
    outputs: [
      { name: "amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "reserveA", internalType: "uint256", type: "uint256" },
      { name: "reserveB", internalType: "uint256", type: "uint256" },
      { name: "probA", internalType: "int128", type: "int128" },
    ],
    name: "quote",
    outputs: [{ name: "amountB", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenA", internalType: "address", type: "address" },
      { name: "tokenB", internalType: "address", type: "address" },
      { name: "liquidity", internalType: "uint256", type: "uint256" },
      { name: "amountAMin", internalType: "uint256", type: "uint256" },
      { name: "amountBMin", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [
      { name: "amountA", internalType: "uint256", type: "uint256" },
      { name: "amountB", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
] as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const RouterV1Address = {
  8453: "0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A",
  84532: "0xaFc877CFe7Ce9Dd15b6e165f0A44785eA66A4DfA",
} as const

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const RouterV1Config = {
  address: RouterV1Address,
  abi: RouterV1Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeRefund
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SafeRefundAbi = [
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Refunded",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ScriptAbi = [
  {
    type: "function",
    inputs: [],
    name: "IS_SCRIPT",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TopicRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const TopicRegistryAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_adminContract", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "adminContract",
    outputs: [
      { name: "", internalType: "contract EightBallAdmin", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "title", internalType: "string", type: "string" },
      { name: "description", internalType: "string", type: "string" },
      { name: "image", internalType: "string", type: "string" },
      { name: "metadata", internalType: "string", type: "string" },
    ],
    name: "createTopic",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "currentTopicId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "topicId", internalType: "uint256", type: "uint256" }],
    name: "getTopic",
    outputs: [
      {
        name: "",
        internalType: "struct TopicRegistry.Topic",
        type: "tuple",
        components: [
          { name: "id", internalType: "uint256", type: "uint256" },
          { name: "title", internalType: "string", type: "string" },
          { name: "description", internalType: "string", type: "string" },
          { name: "image", internalType: "string", type: "string" },
          { name: "metadata", internalType: "string", type: "string" },
          { name: "creator", internalType: "address", type: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "topicId", internalType: "uint256", type: "uint256" },
      { name: "title", internalType: "string", type: "string" },
      { name: "description", internalType: "string", type: "string" },
      { name: "image", internalType: "string", type: "string" },
      { name: "metadata", internalType: "string", type: "string" },
    ],
    name: "updateTopic",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "title", internalType: "string", type: "string", indexed: false },
      {
        name: "description",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      { name: "image", internalType: "string", type: "string", indexed: false },
      {
        name: "metadata",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "creator",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "TopicCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "title", internalType: "string", type: "string", indexed: false },
      {
        name: "description",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      { name: "image", internalType: "string", type: "string", indexed: false },
      {
        name: "metadata",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "updater",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "TopicUpdated",
  },
  { type: "error", inputs: [], name: "TopicNotFound" },
  { type: "error", inputs: [], name: "UnauthorizedCaller" },
] as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const TopicRegistryAddress = {
  84532: "0xC7b1A1e4f828D8A3805e789503557eB49DF00E55",
} as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const TopicRegistryConfig = {
  address: TopicRegistryAddress,
  abi: TopicRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UserRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const UserRegistryAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_adminContract", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "adminContract",
    outputs: [
      { name: "", internalType: "contract EightBallAdmin", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "walletAddress", internalType: "address", type: "address" },
      {
        name: "user",
        internalType: "struct UserRegistry.User",
        type: "tuple",
        components: [
          { name: "createdAt", internalType: "uint256", type: "uint256" },
          { name: "updatedAt", internalType: "uint256", type: "uint256" },
          { name: "id", internalType: "address", type: "address" },
          {
            name: "externalAuthProviderUserId",
            internalType: "string",
            type: "string",
          },
          { name: "name", internalType: "string", type: "string" },
          { name: "pfp", internalType: "string", type: "string" },
          { name: "socials", internalType: "string", type: "string" },
          { name: "theme", internalType: "string", type: "string" },
          { name: "metadata", internalType: "string", type: "string" },
        ],
      },
    ],
    name: "createUser",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "walletAddress", internalType: "address", type: "address" },
    ],
    name: "getUser",
    outputs: [
      {
        name: "",
        internalType: "struct UserRegistry.User",
        type: "tuple",
        components: [
          { name: "createdAt", internalType: "uint256", type: "uint256" },
          { name: "updatedAt", internalType: "uint256", type: "uint256" },
          { name: "id", internalType: "address", type: "address" },
          {
            name: "externalAuthProviderUserId",
            internalType: "string",
            type: "string",
          },
          { name: "name", internalType: "string", type: "string" },
          { name: "pfp", internalType: "string", type: "string" },
          { name: "socials", internalType: "string", type: "string" },
          { name: "theme", internalType: "string", type: "string" },
          { name: "metadata", internalType: "string", type: "string" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "walletAddress", internalType: "address", type: "address" },
      {
        name: "user",
        internalType: "struct UserRegistry.User",
        type: "tuple",
        components: [
          { name: "createdAt", internalType: "uint256", type: "uint256" },
          { name: "updatedAt", internalType: "uint256", type: "uint256" },
          { name: "id", internalType: "address", type: "address" },
          {
            name: "externalAuthProviderUserId",
            internalType: "string",
            type: "string",
          },
          { name: "name", internalType: "string", type: "string" },
          { name: "pfp", internalType: "string", type: "string" },
          { name: "socials", internalType: "string", type: "string" },
          { name: "theme", internalType: "string", type: "string" },
          { name: "metadata", internalType: "string", type: "string" },
        ],
      },
    ],
    name: "updateUser",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "walletAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "user",
        internalType: "struct UserRegistry.User",
        type: "tuple",
        components: [
          { name: "createdAt", internalType: "uint256", type: "uint256" },
          { name: "updatedAt", internalType: "uint256", type: "uint256" },
          { name: "id", internalType: "address", type: "address" },
          {
            name: "externalAuthProviderUserId",
            internalType: "string",
            type: "string",
          },
          { name: "name", internalType: "string", type: "string" },
          { name: "pfp", internalType: "string", type: "string" },
          { name: "socials", internalType: "string", type: "string" },
          { name: "theme", internalType: "string", type: "string" },
          { name: "metadata", internalType: "string", type: "string" },
        ],
        indexed: false,
      },
    ],
    name: "UserCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "walletAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "user",
        internalType: "struct UserRegistry.User",
        type: "tuple",
        components: [
          { name: "createdAt", internalType: "uint256", type: "uint256" },
          { name: "updatedAt", internalType: "uint256", type: "uint256" },
          { name: "id", internalType: "address", type: "address" },
          {
            name: "externalAuthProviderUserId",
            internalType: "string",
            type: "string",
          },
          { name: "name", internalType: "string", type: "string" },
          { name: "pfp", internalType: "string", type: "string" },
          { name: "socials", internalType: "string", type: "string" },
          { name: "theme", internalType: "string", type: "string" },
          { name: "metadata", internalType: "string", type: "string" },
        ],
        indexed: false,
      },
    ],
    name: "UserUpdated",
  },
  { type: "error", inputs: [], name: "UnauthorizedCaller" },
  { type: "error", inputs: [], name: "UserAlreadyExists" },
  { type: "error", inputs: [], name: "UserNotFound" },
] as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const UserRegistryAddress = {
  84532: "0x60a96694220d67CD930b5919e57af2b1b098C9f1",
} as const

/**
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const UserRegistryConfig = {
  address: UserRegistryAddress,
  abi: UserRegistryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WETH9
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Weth9Abi = [
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "guy", internalType: "address", type: "address" },
      { name: "wad", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "dst", internalType: "address", type: "address" },
      { name: "wad", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "src", internalType: "address", type: "address" },
      { name: "dst", internalType: "address", type: "address" },
      { name: "wad", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "wad", internalType: "uint256", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "src", internalType: "address", type: "address", indexed: true },
      { name: "guy", internalType: "address", type: "address", indexed: true },
      { name: "wad", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "dst", internalType: "address", type: "address", indexed: true },
      { name: "wad", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Deposit",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "src", internalType: "address", type: "address", indexed: true },
      { name: "dst", internalType: "address", type: "address", indexed: true },
      { name: "wad", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "src", internalType: "address", type: "address", indexed: true },
      { name: "wad", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Withdrawal",
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__
 */
export const useReadAmmlpToken = /*#__PURE__*/ createUseReadContract({
  abi: AmmlpTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadAmmlpTokenDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: AmmlpTokenAbi,
    functionName: "DOMAIN_SEPARATOR",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadAmmlpTokenPermitTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: AmmlpTokenAbi,
    functionName: "PERMIT_TYPEHASH",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadAmmlpTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: AmmlpTokenAbi,
  functionName: "allowance",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAmmlpTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: AmmlpTokenAbi,
  functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadAmmlpTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: AmmlpTokenAbi,
  functionName: "decimals",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadAmmlpTokenName = /*#__PURE__*/ createUseReadContract({
  abi: AmmlpTokenAbi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadAmmlpTokenNonces = /*#__PURE__*/ createUseReadContract({
  abi: AmmlpTokenAbi,
  functionName: "nonces",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadAmmlpTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: AmmlpTokenAbi,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadAmmlpTokenTotalSupply = /*#__PURE__*/ createUseReadContract(
  { abi: AmmlpTokenAbi, functionName: "totalSupply" }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AmmlpTokenAbi}__
 */
export const useWriteAmmlpToken = /*#__PURE__*/ createUseWriteContract({
  abi: AmmlpTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteAmmlpTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: AmmlpTokenAbi,
  functionName: "approve",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"approveEightBall"`
 */
export const useWriteAmmlpTokenApproveEightBall =
  /*#__PURE__*/ createUseWriteContract({
    abi: AmmlpTokenAbi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteAmmlpTokenPermit = /*#__PURE__*/ createUseWriteContract({
  abi: AmmlpTokenAbi,
  functionName: "permit",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteAmmlpTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: AmmlpTokenAbi,
  functionName: "transfer",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteAmmlpTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: AmmlpTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AmmlpTokenAbi}__
 */
export const useSimulateAmmlpToken = /*#__PURE__*/ createUseSimulateContract({
  abi: AmmlpTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateAmmlpTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AmmlpTokenAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"approveEightBall"`
 */
export const useSimulateAmmlpTokenApproveEightBall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AmmlpTokenAbi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateAmmlpTokenPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AmmlpTokenAbi,
    functionName: "permit",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateAmmlpTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AmmlpTokenAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateAmmlpTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AmmlpTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link AmmlpTokenAbi}__
 */
export const useWatchAmmlpTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: AmmlpTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchAmmlpTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: AmmlpTokenAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link AmmlpTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchAmmlpTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: AmmlpTokenAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AccessControlAbi}__
 */
export const useReadAccessControl = /*#__PURE__*/ createUseReadContract({
  abi: AccessControlAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadAccessControlDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: AccessControlAbi,
    functionName: "DEFAULT_ADMIN_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadAccessControlGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: AccessControlAbi,
    functionName: "getRoleAdmin",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadAccessControlHasRole = /*#__PURE__*/ createUseReadContract({
  abi: AccessControlAbi,
  functionName: "hasRole",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAccessControlSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: AccessControlAbi,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AccessControlAbi}__
 */
export const useWriteAccessControl = /*#__PURE__*/ createUseWriteContract({
  abi: AccessControlAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteAccessControlGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: AccessControlAbi,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteAccessControlRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: AccessControlAbi,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteAccessControlRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: AccessControlAbi,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AccessControlAbi}__
 */
export const useSimulateAccessControl = /*#__PURE__*/ createUseSimulateContract(
  { abi: AccessControlAbi }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateAccessControlGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AccessControlAbi,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateAccessControlRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AccessControlAbi,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link AccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateAccessControlRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: AccessControlAbi,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link AccessControlAbi}__
 */
export const useWatchAccessControlEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: AccessControlAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link AccessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: AccessControlAbi,
    eventName: "RoleAdminChanged",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link AccessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: AccessControlAbi,
    eventName: "RoleGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link AccessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: AccessControlAbi,
    eventName: "RoleRevoked",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CheatsAbi}__
 */
export const useWriteCheats = /*#__PURE__*/ createUseWriteContract({
  abi: CheatsAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"expectEmit"`
 */
export const useWriteCheatsExpectEmit = /*#__PURE__*/ createUseWriteContract({
  abi: CheatsAbi,
  functionName: "expectEmit",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"expectRevert"`
 */
export const useWriteCheatsExpectRevert = /*#__PURE__*/ createUseWriteContract({
  abi: CheatsAbi,
  functionName: "expectRevert",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"ffi"`
 */
export const useWriteCheatsFfi = /*#__PURE__*/ createUseWriteContract({
  abi: CheatsAbi,
  functionName: "ffi",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"roll"`
 */
export const useWriteCheatsRoll = /*#__PURE__*/ createUseWriteContract({
  abi: CheatsAbi,
  functionName: "roll",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"store"`
 */
export const useWriteCheatsStore = /*#__PURE__*/ createUseWriteContract({
  abi: CheatsAbi,
  functionName: "store",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"warp"`
 */
export const useWriteCheatsWarp = /*#__PURE__*/ createUseWriteContract({
  abi: CheatsAbi,
  functionName: "warp",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CheatsAbi}__
 */
export const useSimulateCheats = /*#__PURE__*/ createUseSimulateContract({
  abi: CheatsAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"expectEmit"`
 */
export const useSimulateCheatsExpectEmit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CheatsAbi,
    functionName: "expectEmit",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"expectRevert"`
 */
export const useSimulateCheatsExpectRevert =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CheatsAbi,
    functionName: "expectRevert",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"ffi"`
 */
export const useSimulateCheatsFfi = /*#__PURE__*/ createUseSimulateContract({
  abi: CheatsAbi,
  functionName: "ffi",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"roll"`
 */
export const useSimulateCheatsRoll = /*#__PURE__*/ createUseSimulateContract({
  abi: CheatsAbi,
  functionName: "roll",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"store"`
 */
export const useSimulateCheatsStore = /*#__PURE__*/ createUseSimulateContract({
  abi: CheatsAbi,
  functionName: "store",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CheatsAbi}__ and `functionName` set to `"warp"`
 */
export const useSimulateCheatsWarp = /*#__PURE__*/ createUseSimulateContract({
  abi: CheatsAbi,
  functionName: "warp",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__
 */
export const useReadCreatorResolution = /*#__PURE__*/ createUseReadContract({
  abi: CreatorResolutionAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadCreatorResolutionDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "DEFAULT_ADMIN_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"DISPUTER_BOND"`
 */
export const useReadCreatorResolutionDisputerBond =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "DISPUTER_BOND",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"PROPOSER_BOND"`
 */
export const useReadCreatorResolutionProposerBond =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "PROPOSER_BOND",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"adminContract"`
 */
export const useReadCreatorResolutionAdminContract =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "adminContract",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"allowedDisputers"`
 */
export const useReadCreatorResolutionAllowedDisputers =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "allowedDisputers",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"eightBallStorage"`
 */
export const useReadCreatorResolutionEightBallStorage =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "eightBallStorage",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"getMarket"`
 */
export const useReadCreatorResolutionGetMarket =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "getMarket",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadCreatorResolutionGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "getRoleAdmin",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadCreatorResolutionHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "hasRole",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"marketProposers"`
 */
export const useReadCreatorResolutionMarketProposers =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "marketProposers",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadCreatorResolutionSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: CreatorResolutionAbi,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"usdc"`
 */
export const useReadCreatorResolutionUsdc = /*#__PURE__*/ createUseReadContract(
  { abi: CreatorResolutionAbi, functionName: "usdc" }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__
 */
export const useWriteCreatorResolution = /*#__PURE__*/ createUseWriteContract({
  abi: CreatorResolutionAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"addDisputer"`
 */
export const useWriteCreatorResolutionAddDisputer =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "addDisputer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"disputeOutcome"`
 */
export const useWriteCreatorResolutionDisputeOutcome =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "disputeOutcome",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteCreatorResolutionGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"proposeOutcome"`
 */
export const useWriteCreatorResolutionProposeOutcome =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "proposeOutcome",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"removeDisputer"`
 */
export const useWriteCreatorResolutionRemoveDisputer =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "removeDisputer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteCreatorResolutionRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"resolveMarket"`
 */
export const useWriteCreatorResolutionResolveMarket =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "resolveMarket",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteCreatorResolutionRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: CreatorResolutionAbi,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__
 */
export const useSimulateCreatorResolution =
  /*#__PURE__*/ createUseSimulateContract({ abi: CreatorResolutionAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"addDisputer"`
 */
export const useSimulateCreatorResolutionAddDisputer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "addDisputer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"disputeOutcome"`
 */
export const useSimulateCreatorResolutionDisputeOutcome =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "disputeOutcome",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateCreatorResolutionGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"proposeOutcome"`
 */
export const useSimulateCreatorResolutionProposeOutcome =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "proposeOutcome",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"removeDisputer"`
 */
export const useSimulateCreatorResolutionRemoveDisputer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "removeDisputer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateCreatorResolutionRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"resolveMarket"`
 */
export const useSimulateCreatorResolutionResolveMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "resolveMarket",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateCreatorResolutionRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: CreatorResolutionAbi,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__
 */
export const useWatchCreatorResolutionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: CreatorResolutionAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"DisputerAdded"`
 */
export const useWatchCreatorResolutionDisputerAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "DisputerAdded",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"DisputerRemoved"`
 */
export const useWatchCreatorResolutionDisputerRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "DisputerRemoved",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"MarketCreated"`
 */
export const useWatchCreatorResolutionMarketCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "MarketCreated",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"MarketResolved"`
 */
export const useWatchCreatorResolutionMarketResolvedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "MarketResolved",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"OutcomeDisputed"`
 */
export const useWatchCreatorResolutionOutcomeDisputedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "OutcomeDisputed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"OutcomeProposed"`
 */
export const useWatchCreatorResolutionOutcomeProposedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "OutcomeProposed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchCreatorResolutionRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "RoleAdminChanged",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchCreatorResolutionRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "RoleGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link CreatorResolutionAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchCreatorResolutionRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: CreatorResolutionAbi,
    eventName: "RoleRevoked",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Erc165Abi}__
 */
export const useReadErc165 = /*#__PURE__*/ createUseReadContract({
  abi: Erc165Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Erc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadErc165SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: Erc165Abi,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBall = /*#__PURE__*/ createUseReadContract({
  abi: EightBallAbi,
  address: EightBallAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"feeManager"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallFeeManager = /*#__PURE__*/ createUseReadContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "feeManager",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"getOdds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallGetOdds = /*#__PURE__*/ createUseReadContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "getOdds",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"optimisticOracle"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallOptimisticOracle =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "optimisticOracle",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"outcomeFactory"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallOutcomeFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "outcomeFactory",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallPaused = /*#__PURE__*/ createUseReadContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "paused",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"router"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallRouter = /*#__PURE__*/ createUseReadContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "router",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"storageContract"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallStorageContract =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "storageContract",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"usdc"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useReadEightBallUsdc = /*#__PURE__*/ createUseReadContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "usdc",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBall = /*#__PURE__*/ createUseWriteContract({
  abi: EightBallAbi,
  address: EightBallAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"addLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallAddLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"cashOut"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallCashOut = /*#__PURE__*/ createUseWriteContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "cashOut",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"creatorResolution"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallCreatorResolution =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "creatorResolution",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"initializeMarket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallInitializeMarket =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "initializeMarket",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"predict"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallPredict = /*#__PURE__*/ createUseWriteContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "predict",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"redeem"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "redeem",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"removeLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallRemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"resolve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWriteEightBallResolve = /*#__PURE__*/ createUseWriteContract({
  abi: EightBallAbi,
  address: EightBallAddress,
  functionName: "resolve",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBall = /*#__PURE__*/ createUseSimulateContract({
  abi: EightBallAbi,
  address: EightBallAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"addLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallAddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"cashOut"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallCashOut =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "cashOut",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"creatorResolution"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallCreatorResolution =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "creatorResolution",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"initializeMarket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallInitializeMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "initializeMarket",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"predict"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallPredict =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "predict",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"redeem"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallRedeem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "redeem",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"removeLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallRemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAbi}__ and `functionName` set to `"resolve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useSimulateEightBallResolve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAbi,
    address: EightBallAddress,
    functionName: "resolve",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: EightBallAbi, address: EightBallAddress }
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"AddLQ"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallAddLqEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "AddLQ",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"Cashout"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallCashoutEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "Cashout",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"OutcomeProposed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallOutcomeProposedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "OutcomeProposed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "Paused",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"Prediction"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallPredictionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "Prediction",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"PredictionCreated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallPredictionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "PredictionCreated",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"PredictionResolved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallPredictionResolvedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "PredictionResolved",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"RemoveLQ"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallRemoveLqEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "RemoveLQ",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x8D349F6d3909F35E7Cb95C8DCAE88AB195f171C3)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x93becc08844c4aa0f6d3a3f447a3b14e95e46c26)
 */
export const useWatchEightBallUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAbi,
    address: EightBallAddress,
    eventName: "Unpaused",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdmin = /*#__PURE__*/ createUseReadContract({
  abi: EightBallAdminAbi,
  address: EightBallAdminAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "ADMIN_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"MARKET_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminMarketRole =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "MARKET_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"OPERATOR_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminOperatorRole =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "OPERATOR_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"baseOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminBaseOperator =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "baseOperator",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "getRoleAdmin",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminHasRole = /*#__PURE__*/ createUseReadContract(
  {
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "hasRole",
  }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useReadEightBallAdminSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdmin = /*#__PURE__*/ createUseWriteContract({
  abi: EightBallAdminAbi,
  address: EightBallAdminAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"grantMarket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminGrantMarket =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "grantMarket",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"grantOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminGrantOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "grantOperator",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"renounceAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminRenounceAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "renounceAdmin",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"revokeOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminRevokeOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "revokeOperator",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"setNewBaseOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWriteEightBallAdminSetNewBaseOperator =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "setNewBaseOperator",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"grantMarket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminGrantMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "grantMarket",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"grantOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminGrantOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "grantOperator",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"renounceAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminRenounceAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "renounceAdmin",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"revokeOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminRevokeOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "revokeOperator",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallAdminAbi}__ and `functionName` set to `"setNewBaseOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useSimulateEightBallAdminSetNewBaseOperator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    functionName: "setNewBaseOperator",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"AdminRenounced"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminAdminRenouncedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "AdminRenounced",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"BaseOperatorChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminBaseOperatorChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "BaseOperatorChanged",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"MarketGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminMarketGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "MarketGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"OperatorGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminOperatorGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "OperatorGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"OperatorRevoked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminOperatorRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "OperatorRevoked",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "RoleAdminChanged",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "RoleGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallAdminAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xD224e8c7530Bd2FAb4440be632ec3D8074cC5970)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x2ba053e368450f9d676f7bbd0d9798e6565613c9)
 */
export const useWatchEightBallAdminRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallAdminAbi,
    address: EightBallAdminAddress,
    eventName: "RoleRevoked",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorage = /*#__PURE__*/ createUseReadContract({
  abi: EightBallStorageAbi,
  address: EightBallStorageAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "ADMIN_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"adminContract"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageAdminContract =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "adminContract",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"currentPairId"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageCurrentPairId =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "currentPairId",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"getMarketPair"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageGetMarketPair =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "getMarketPair",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "getRoleAdmin",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "hasRole",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStoragePaused =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "paused",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useReadEightBallStorageSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallStorageAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWriteEightBallStorage = /*#__PURE__*/ createUseWriteContract({
  abi: EightBallStorageAbi,
  address: EightBallStorageAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWriteEightBallStorageGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"incrementCurrentPairId"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWriteEightBallStorageIncrementCurrentPairId =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "incrementCurrentPairId",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWriteEightBallStorageRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWriteEightBallStorageRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"storeMarketPair"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWriteEightBallStorageStoreMarketPair =
  /*#__PURE__*/ createUseWriteContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "storeMarketPair",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallStorageAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useSimulateEightBallStorage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useSimulateEightBallStorageGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"incrementCurrentPairId"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useSimulateEightBallStorageIncrementCurrentPairId =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "incrementCurrentPairId",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useSimulateEightBallStorageRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useSimulateEightBallStorageRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link EightBallStorageAbi}__ and `functionName` set to `"storeMarketPair"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useSimulateEightBallStorageStoreMarketPair =
  /*#__PURE__*/ createUseSimulateContract({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    functionName: "storeMarketPair",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallStorageAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWatchEightBallStorageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallStorageAbi}__ and `eventName` set to `"EightBallStorageCreated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWatchEightBallStorageEightBallStorageCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    eventName: "EightBallStorageCreated",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallStorageAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWatchEightBallStoragePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    eventName: "Paused",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallStorageAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWatchEightBallStorageRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    eventName: "RoleAdminChanged",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallStorageAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWatchEightBallStorageRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    eventName: "RoleGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallStorageAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWatchEightBallStorageRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    eventName: "RoleRevoked",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link EightBallStorageAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x4cf6901f56996F0639dd64E48931B67A46D33765)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xde8bccbb3c197de83ee2ee9a4d94d87714c4fcb2)
 */
export const useWatchEightBallStorageUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: EightBallStorageAbi,
    address: EightBallStorageAddress,
    eventName: "Unpaused",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2 = /*#__PURE__*/ createUseReadContract({
  abi: FeeManagerV2Abi,
  address: FeeManagerV2Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"REFERRAL_FEE_BPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2ReferralFeeBps =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "REFERRAL_FEE_BPS",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"accruedBaseFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2AccruedBaseFees =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "accruedBaseFees",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"accruedCreatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2AccruedCreatorFees =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "accruedCreatorFees",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"accruedOperatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2AccruedOperatorFees =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "accruedOperatorFees",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"accruedReferralFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2AccruedReferralFees =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "accruedReferralFees",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"adminContract"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2AdminContract =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "adminContract",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"baseFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2BaseFee = /*#__PURE__*/ createUseReadContract({
  abi: FeeManagerV2Abi,
  address: FeeManagerV2Address,
  functionName: "baseFee",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"baseOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2BaseOperator =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "baseOperator",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"creatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2CreatorFees =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "creatorFees",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"getFeeForCreator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2GetFeeForCreator =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "getFeeForCreator",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"getFeeForOperator"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2GetFeeForOperator =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "getFeeForOperator",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"getTotalFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2GetTotalFee =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "getTotalFee",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"operatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2OperatorFees =
  /*#__PURE__*/ createUseReadContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "operatorFees",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"usdc"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useReadFeeManagerV2Usdc = /*#__PURE__*/ createUseReadContract({
  abi: FeeManagerV2Abi,
  address: FeeManagerV2Address,
  functionName: "usdc",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2 = /*#__PURE__*/ createUseWriteContract({
  abi: FeeManagerV2Abi,
  address: FeeManagerV2Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimBaseFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2ClaimBaseFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimBaseFees",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimCreatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2ClaimCreatorFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimCreatorFees",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimOperatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2ClaimOperatorFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimOperatorFees",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimReferralFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2ClaimReferralFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimReferralFees",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"collectFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2CollectFees =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "collectFees",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"setBaseFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2SetBaseFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "setBaseFee",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"setCreatorFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2SetCreatorFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "setCreatorFee",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"setOperatorFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWriteFeeManagerV2SetOperatorFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "setOperatorFee",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2 = /*#__PURE__*/ createUseSimulateContract({
  abi: FeeManagerV2Abi,
  address: FeeManagerV2Address,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimBaseFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2ClaimBaseFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimBaseFees",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimCreatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2ClaimCreatorFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimCreatorFees",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimOperatorFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2ClaimOperatorFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimOperatorFees",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"claimReferralFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2ClaimReferralFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "claimReferralFees",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"collectFees"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2CollectFees =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "collectFees",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"setBaseFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2SetBaseFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "setBaseFee",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"setCreatorFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2SetCreatorFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "setCreatorFee",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `functionName` set to `"setOperatorFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useSimulateFeeManagerV2SetOperatorFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    functionName: "setOperatorFee",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link FeeManagerV2Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWatchFeeManagerV2Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `eventName` set to `"BaseFeesClaimed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWatchFeeManagerV2BaseFeesClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    eventName: "BaseFeesClaimed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `eventName` set to `"CreatorFeesClaimed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWatchFeeManagerV2CreatorFeesClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    eventName: "CreatorFeesClaimed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `eventName` set to `"FeesCollected"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWatchFeeManagerV2FeesCollectedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    eventName: "FeesCollected",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `eventName` set to `"OperatorFeesClaimed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWatchFeeManagerV2OperatorFeesClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    eventName: "OperatorFeesClaimed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link FeeManagerV2Abi}__ and `eventName` set to `"ReferralFeesClaimed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x46AbC3e65691DF9c2F6d9cfB394D5e38Ea4480F9)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x3501c77f9356728b1f20cd621ef69325ba35fb7a)
 */
export const useWatchFeeManagerV2ReferralFeesClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: FeeManagerV2Abi,
    address: FeeManagerV2Address,
    eventName: "ReferralFeesClaimed",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link HashPairV1Abi}__
 */
export const useReadHashPairV1 = /*#__PURE__*/ createUseReadContract({
  abi: HashPairV1Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link HashPairV1Abi}__ and `functionName` set to `"IS_SCRIPT"`
 */
export const useReadHashPairV1IsScript = /*#__PURE__*/ createUseReadContract({
  abi: HashPairV1Abi,
  functionName: "IS_SCRIPT",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link HashPairV1Abi}__
 */
export const useWriteHashPairV1 = /*#__PURE__*/ createUseWriteContract({
  abi: HashPairV1Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link HashPairV1Abi}__ and `functionName` set to `"run"`
 */
export const useWriteHashPairV1Run = /*#__PURE__*/ createUseWriteContract({
  abi: HashPairV1Abi,
  functionName: "run",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link HashPairV1Abi}__
 */
export const useSimulateHashPairV1 = /*#__PURE__*/ createUseSimulateContract({
  abi: HashPairV1Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link HashPairV1Abi}__ and `functionName` set to `"run"`
 */
export const useSimulateHashPairV1Run = /*#__PURE__*/ createUseSimulateContract(
  { abi: HashPairV1Abi, functionName: "run" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IAccessControlAbi}__
 */
export const useReadIAccessControl = /*#__PURE__*/ createUseReadContract({
  abi: IAccessControlAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadIAccessControlGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: IAccessControlAbi,
    functionName: "getRoleAdmin",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadIAccessControlHasRole = /*#__PURE__*/ createUseReadContract(
  { abi: IAccessControlAbi, functionName: "hasRole" }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IAccessControlAbi}__
 */
export const useWriteIAccessControl = /*#__PURE__*/ createUseWriteContract({
  abi: IAccessControlAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteIAccessControlGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: IAccessControlAbi,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteIAccessControlRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: IAccessControlAbi,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteIAccessControlRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: IAccessControlAbi,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IAccessControlAbi}__
 */
export const useSimulateIAccessControl =
  /*#__PURE__*/ createUseSimulateContract({ abi: IAccessControlAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateIAccessControlGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IAccessControlAbi,
    functionName: "grantRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateIAccessControlRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IAccessControlAbi,
    functionName: "renounceRole",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateIAccessControlRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IAccessControlAbi,
    functionName: "revokeRole",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IAccessControlAbi}__
 */
export const useWatchIAccessControlEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: IAccessControlAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IAccessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchIAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IAccessControlAbi,
    eventName: "RoleAdminChanged",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IAccessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchIAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IAccessControlAbi,
    eventName: "RoleGranted",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IAccessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchIAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IAccessControlAbi,
    eventName: "RoleRevoked",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__
 */
export const useReadIerc20Metadata = /*#__PURE__*/ createUseReadContract({
  abi: Ierc20MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIerc20MetadataAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc20MetadataAbi,
    functionName: "allowance",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc20MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc20MetadataAbi,
    functionName: "balanceOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIerc20MetadataDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc20MetadataAbi,
    functionName: "decimals",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc20MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: Ierc20MetadataAbi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc20MetadataSymbol = /*#__PURE__*/ createUseReadContract({
  abi: Ierc20MetadataAbi,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc20MetadataTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc20MetadataAbi,
    functionName: "totalSupply",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__
 */
export const useWriteIerc20Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: Ierc20MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc20MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc20MetadataAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIerc20MetadataTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc20MetadataAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc20MetadataAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__
 */
export const useSimulateIerc20Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: Ierc20MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc20MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc20MetadataAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIerc20MetadataTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc20MetadataAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc20MetadataAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc20MetadataAbi}__
 */
export const useWatchIerc20MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: Ierc20MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc20MetadataAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc20MetadataAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721Abi}__
 */
export const useReadIerc721 = /*#__PURE__*/ createUseReadContract({
  abi: Ierc721Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: Ierc721Abi,
  functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721GetApproved = /*#__PURE__*/ createUseReadContract({
  abi: Ierc721Abi,
  functionName: "getApproved",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721IsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721Abi,
    functionName: "isApprovedForAll",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: Ierc721Abi,
  functionName: "ownerOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721SupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721Abi,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721Abi}__
 */
export const useWriteIerc721 = /*#__PURE__*/ createUseWriteContract({
  abi: Ierc721Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721Approve = /*#__PURE__*/ createUseWriteContract({
  abi: Ierc721Abi,
  functionName: "approve",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721SafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721Abi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721SetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721Abi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721TransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: Ierc721Abi, functionName: "transferFrom" }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721Abi}__
 */
export const useSimulateIerc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: Ierc721Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721Abi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721SafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721Abi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721SetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721Abi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721Abi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721Abi}__
 */
export const useWatchIerc721Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: Ierc721Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721Abi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721ApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721Abi,
    eventName: "ApprovalForAll",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721Abi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__
 */
export const useReadIerc721Enumerable = /*#__PURE__*/ createUseReadContract({
  abi: Ierc721EnumerableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721EnumerableBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "balanceOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721EnumerableGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "getApproved",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721EnumerableIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "isApprovedForAll",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721EnumerableOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "ownerOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721EnumerableSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadIerc721EnumerableTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "tokenByIndex",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadIerc721EnumerableTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "tokenOfOwnerByIndex",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIerc721EnumerableTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721EnumerableAbi,
    functionName: "totalSupply",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__
 */
export const useWriteIerc721Enumerable = /*#__PURE__*/ createUseWriteContract({
  abi: Ierc721EnumerableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721EnumerableApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721EnumerableAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721EnumerableSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721EnumerableAbi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721EnumerableSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721EnumerableAbi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721EnumerableTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721EnumerableAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__
 */
export const useSimulateIerc721Enumerable =
  /*#__PURE__*/ createUseSimulateContract({ abi: Ierc721EnumerableAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721EnumerableApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721EnumerableAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721EnumerableSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721EnumerableAbi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721EnumerableSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721EnumerableAbi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721EnumerableTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721EnumerableAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721EnumerableAbi}__
 */
export const useWatchIerc721EnumerableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: Ierc721EnumerableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721EnumerableApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721EnumerableAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721EnumerableApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721EnumerableAbi,
    eventName: "ApprovalForAll",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721EnumerableAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721EnumerableTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721EnumerableAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__
 */
export const useReadIerc721Metadata = /*#__PURE__*/ createUseReadContract({
  abi: Ierc721MetadataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIerc721MetadataBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721MetadataAbi,
    functionName: "balanceOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadIerc721MetadataGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721MetadataAbi,
    functionName: "getApproved",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadIerc721MetadataIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721MetadataAbi,
    functionName: "isApprovedForAll",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"name"`
 */
export const useReadIerc721MetadataName = /*#__PURE__*/ createUseReadContract({
  abi: Ierc721MetadataAbi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIerc721MetadataOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721MetadataAbi,
    functionName: "ownerOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadIerc721MetadataSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721MetadataAbi,
    functionName: "supportsInterface",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIerc721MetadataSymbol = /*#__PURE__*/ createUseReadContract(
  { abi: Ierc721MetadataAbi, functionName: "symbol" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadIerc721MetadataTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: Ierc721MetadataAbi,
    functionName: "tokenURI",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__
 */
export const useWriteIerc721Metadata = /*#__PURE__*/ createUseWriteContract({
  abi: Ierc721MetadataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIerc721MetadataApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721MetadataAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721MetadataAbi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721MetadataAbi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIerc721MetadataTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721MetadataAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__
 */
export const useSimulateIerc721Metadata =
  /*#__PURE__*/ createUseSimulateContract({ abi: Ierc721MetadataAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIerc721MetadataApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721MetadataAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721MetadataAbi,
    functionName: "safeTransferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721MetadataAbi,
    functionName: "setApprovalForAll",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIerc721MetadataTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721MetadataAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721MetadataAbi}__
 */
export const useWatchIerc721MetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: Ierc721MetadataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIerc721MetadataApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721MetadataAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchIerc721MetadataApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721MetadataAbi,
    eventName: "ApprovalForAll",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Ierc721MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIerc721MetadataTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Ierc721MetadataAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721TokenReceiverAbi}__
 */
export const useWriteIerc721TokenReceiver =
  /*#__PURE__*/ createUseWriteContract({ abi: Ierc721TokenReceiverAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Ierc721TokenReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useWriteIerc721TokenReceiverOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: Ierc721TokenReceiverAbi,
    functionName: "onERC721Received",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721TokenReceiverAbi}__
 */
export const useSimulateIerc721TokenReceiver =
  /*#__PURE__*/ createUseSimulateContract({ abi: Ierc721TokenReceiverAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Ierc721TokenReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useSimulateIerc721TokenReceiverOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Ierc721TokenReceiverAbi,
    functionName: "onERC721Received",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallAbi}__
 */
export const useReadIEightBall = /*#__PURE__*/ createUseReadContract({
  abi: IEightBallAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"getOdds"`
 */
export const useReadIEightBallGetOdds = /*#__PURE__*/ createUseReadContract({
  abi: IEightBallAbi,
  functionName: "getOdds",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__
 */
export const useWriteIEightBall = /*#__PURE__*/ createUseWriteContract({
  abi: IEightBallAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useWriteIEightBallAddLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallAbi,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"cashOut"`
 */
export const useWriteIEightBallCashOut = /*#__PURE__*/ createUseWriteContract({
  abi: IEightBallAbi,
  functionName: "cashOut",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"creatorResolution"`
 */
export const useWriteIEightBallCreatorResolution =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallAbi,
    functionName: "creatorResolution",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"initializeMarket"`
 */
export const useWriteIEightBallInitializeMarket =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallAbi,
    functionName: "initializeMarket",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"predict"`
 */
export const useWriteIEightBallPredict = /*#__PURE__*/ createUseWriteContract({
  abi: IEightBallAbi,
  functionName: "predict",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"redeem"`
 */
export const useWriteIEightBallRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: IEightBallAbi,
  functionName: "redeem",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useWriteIEightBallRemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallAbi,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"resolve"`
 */
export const useWriteIEightBallResolve = /*#__PURE__*/ createUseWriteContract({
  abi: IEightBallAbi,
  functionName: "resolve",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__
 */
export const useSimulateIEightBall = /*#__PURE__*/ createUseSimulateContract({
  abi: IEightBallAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useSimulateIEightBallAddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"cashOut"`
 */
export const useSimulateIEightBallCashOut =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "cashOut",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"creatorResolution"`
 */
export const useSimulateIEightBallCreatorResolution =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "creatorResolution",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"initializeMarket"`
 */
export const useSimulateIEightBallInitializeMarket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "initializeMarket",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"predict"`
 */
export const useSimulateIEightBallPredict =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "predict",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"redeem"`
 */
export const useSimulateIEightBallRedeem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "redeem",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useSimulateIEightBallRemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAbi}__ and `functionName` set to `"resolve"`
 */
export const useSimulateIEightBallResolve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAbi,
    functionName: "resolve",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__
 */
export const useWatchIEightBallEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: IEightBallAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__ and `eventName` set to `"AddLQ"`
 */
export const useWatchIEightBallAddLqEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallAbi,
    eventName: "AddLQ",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__ and `eventName` set to `"Cashout"`
 */
export const useWatchIEightBallCashoutEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallAbi,
    eventName: "Cashout",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__ and `eventName` set to `"OutcomeProposed"`
 */
export const useWatchIEightBallOutcomeProposedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallAbi,
    eventName: "OutcomeProposed",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__ and `eventName` set to `"Prediction"`
 */
export const useWatchIEightBallPredictionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallAbi,
    eventName: "Prediction",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__ and `eventName` set to `"PredictionCreated"`
 */
export const useWatchIEightBallPredictionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallAbi,
    eventName: "PredictionCreated",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__ and `eventName` set to `"PredictionResolved"`
 */
export const useWatchIEightBallPredictionResolvedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallAbi,
    eventName: "PredictionResolved",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallAbi}__ and `eventName` set to `"RemoveLQ"`
 */
export const useWatchIEightBallRemoveLqEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallAbi,
    eventName: "RemoveLQ",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAmmCalleeAbi}__
 */
export const useWriteIEightBallAmmCallee = /*#__PURE__*/ createUseWriteContract(
  { abi: IEightBallAmmCalleeAbi }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallAmmCalleeAbi}__ and `functionName` set to `"uniswapV2Call"`
 */
export const useWriteIEightBallAmmCalleeUniswapV2Call =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallAmmCalleeAbi,
    functionName: "uniswapV2Call",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAmmCalleeAbi}__
 */
export const useSimulateIEightBallAmmCallee =
  /*#__PURE__*/ createUseSimulateContract({ abi: IEightBallAmmCalleeAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallAmmCalleeAbi}__ and `functionName` set to `"uniswapV2Call"`
 */
export const useSimulateIEightBallAmmCalleeUniswapV2Call =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallAmmCalleeAbi,
    functionName: "uniswapV2Call",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__
 */
export const useReadIEightBallV1Router = /*#__PURE__*/ createUseReadContract({
  abi: IEightBallV1RouterAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"WETH"`
 */
export const useReadIEightBallV1RouterWeth =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1RouterAbi,
    functionName: "WETH",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"factory"`
 */
export const useReadIEightBallV1RouterFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1RouterAbi,
    functionName: "factory",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"getAmountOut"`
 */
export const useReadIEightBallV1RouterGetAmountOut =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1RouterAbi,
    functionName: "getAmountOut",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"getAmountsOut"`
 */
export const useReadIEightBallV1RouterGetAmountsOut =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1RouterAbi,
    functionName: "getAmountsOut",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"quote"`
 */
export const useReadIEightBallV1RouterQuote =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1RouterAbi,
    functionName: "quote",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__
 */
export const useWriteIEightBallV1Router = /*#__PURE__*/ createUseWriteContract({
  abi: IEightBallV1RouterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useWriteIEightBallV1RouterAddLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV1RouterAbi,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"buyOutcome"`
 */
export const useWriteIEightBallV1RouterBuyOutcome =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV1RouterAbi,
    functionName: "buyOutcome",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useWriteIEightBallV1RouterRemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV1RouterAbi,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__
 */
export const useSimulateIEightBallV1Router =
  /*#__PURE__*/ createUseSimulateContract({ abi: IEightBallV1RouterAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useSimulateIEightBallV1RouterAddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV1RouterAbi,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"buyOutcome"`
 */
export const useSimulateIEightBallV1RouterBuyOutcome =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV1RouterAbi,
    functionName: "buyOutcome",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1RouterAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useSimulateIEightBallV1RouterRemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV1RouterAbi,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__
 */
export const useReadIEightBallV1Router01 = /*#__PURE__*/ createUseReadContract({
  abi: IEightBallV1Router01Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"WETH"`
 */
export const useReadIEightBallV1Router01Weth =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1Router01Abi,
    functionName: "WETH",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"factory"`
 */
export const useReadIEightBallV1Router01Factory =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1Router01Abi,
    functionName: "factory",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"getAmountOut"`
 */
export const useReadIEightBallV1Router01GetAmountOut =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1Router01Abi,
    functionName: "getAmountOut",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"getAmountsOut"`
 */
export const useReadIEightBallV1Router01GetAmountsOut =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1Router01Abi,
    functionName: "getAmountsOut",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"quote"`
 */
export const useReadIEightBallV1Router01Quote =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV1Router01Abi,
    functionName: "quote",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__
 */
export const useWriteIEightBallV1Router01 =
  /*#__PURE__*/ createUseWriteContract({ abi: IEightBallV1Router01Abi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"addLiquidity"`
 */
export const useWriteIEightBallV1Router01AddLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV1Router01Abi,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"buyOutcome"`
 */
export const useWriteIEightBallV1Router01BuyOutcome =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV1Router01Abi,
    functionName: "buyOutcome",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useWriteIEightBallV1Router01RemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV1Router01Abi,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__
 */
export const useSimulateIEightBallV1Router01 =
  /*#__PURE__*/ createUseSimulateContract({ abi: IEightBallV1Router01Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"addLiquidity"`
 */
export const useSimulateIEightBallV1Router01AddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV1Router01Abi,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"buyOutcome"`
 */
export const useSimulateIEightBallV1Router01BuyOutcome =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV1Router01Abi,
    functionName: "buyOutcome",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV1Router01Abi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useSimulateIEightBallV1Router01RemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV1Router01Abi,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__
 */
export const useReadIEightBallV2MarketLpToken =
  /*#__PURE__*/ createUseReadContract({ abi: IEightBallV2MarketLpTokenAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadIEightBallV2MarketLpTokenDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "DOMAIN_SEPARATOR",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadIEightBallV2MarketLpTokenPermitTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "PERMIT_TYPEHASH",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIEightBallV2MarketLpTokenAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "allowance",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIEightBallV2MarketLpTokenBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "balanceOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIEightBallV2MarketLpTokenDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "decimals",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadIEightBallV2MarketLpTokenName =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "name",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadIEightBallV2MarketLpTokenNonces =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "nonces",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIEightBallV2MarketLpTokenSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "symbol",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIEightBallV2MarketLpTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "totalSupply",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__
 */
export const useWriteIEightBallV2MarketLpToken =
  /*#__PURE__*/ createUseWriteContract({ abi: IEightBallV2MarketLpTokenAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIEightBallV2MarketLpTokenApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"approveEightBall"`
 */
export const useWriteIEightBallV2MarketLpTokenApproveEightBall =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteIEightBallV2MarketLpTokenPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "permit",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIEightBallV2MarketLpTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIEightBallV2MarketLpTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__
 */
export const useSimulateIEightBallV2MarketLpToken =
  /*#__PURE__*/ createUseSimulateContract({ abi: IEightBallV2MarketLpTokenAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIEightBallV2MarketLpTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"approveEightBall"`
 */
export const useSimulateIEightBallV2MarketLpTokenApproveEightBall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateIEightBallV2MarketLpTokenPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "permit",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIEightBallV2MarketLpTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIEightBallV2MarketLpTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2MarketLpTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__
 */
export const useWatchIEightBallV2MarketLpTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2MarketLpTokenAbi,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIEightBallV2MarketLpTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2MarketLpTokenAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2MarketLpTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIEightBallV2MarketLpTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2MarketLpTokenAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__
 */
export const useReadIEightBallV2Pair = /*#__PURE__*/ createUseReadContract({
  abi: IEightBallV2PairAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadIEightBallV2PairDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "DOMAIN_SEPARATOR",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"MINIMUM_LIQUIDITY"`
 */
export const useReadIEightBallV2PairMinimumLiquidity =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "MINIMUM_LIQUIDITY",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadIEightBallV2PairPermitTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "PERMIT_TYPEHASH",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIEightBallV2PairAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "allowance",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIEightBallV2PairBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "balanceOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadIEightBallV2PairDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "decimals",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"factory"`
 */
export const useReadIEightBallV2PairFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "factory",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"getProbability"`
 */
export const useReadIEightBallV2PairGetProbability =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "getProbability",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"getReserves"`
 */
export const useReadIEightBallV2PairGetReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "getReserves",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"kLast"`
 */
export const useReadIEightBallV2PairKLast = /*#__PURE__*/ createUseReadContract(
  { abi: IEightBallV2PairAbi, functionName: "kLast" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"name"`
 */
export const useReadIEightBallV2PairName = /*#__PURE__*/ createUseReadContract({
  abi: IEightBallV2PairAbi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadIEightBallV2PairNonces =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "nonces",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"price0CumulativeLast"`
 */
export const useReadIEightBallV2PairPrice0CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "price0CumulativeLast",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"price1CumulativeLast"`
 */
export const useReadIEightBallV2PairPrice1CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "price1CumulativeLast",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadIEightBallV2PairSymbol =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "symbol",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"token0"`
 */
export const useReadIEightBallV2PairToken0 =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "token0",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"token1"`
 */
export const useReadIEightBallV2PairToken1 =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "token1",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIEightBallV2PairTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: IEightBallV2PairAbi,
    functionName: "totalSupply",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__
 */
export const useWriteIEightBallV2Pair = /*#__PURE__*/ createUseWriteContract({
  abi: IEightBallV2PairAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIEightBallV2PairApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"approveEightBall"`
 */
export const useWriteIEightBallV2PairApproveEightBall =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteIEightBallV2PairBurn =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "burn",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteIEightBallV2PairInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "initialize",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteIEightBallV2PairMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "mint",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteIEightBallV2PairPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "permit",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"skim"`
 */
export const useWriteIEightBallV2PairSkim =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "skim",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteIEightBallV2PairSwap =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "swap",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"sync"`
 */
export const useWriteIEightBallV2PairSync =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "sync",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIEightBallV2PairTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIEightBallV2PairTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"updateProbabilities"`
 */
export const useWriteIEightBallV2PairUpdateProbabilities =
  /*#__PURE__*/ createUseWriteContract({
    abi: IEightBallV2PairAbi,
    functionName: "updateProbabilities",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__
 */
export const useSimulateIEightBallV2Pair =
  /*#__PURE__*/ createUseSimulateContract({ abi: IEightBallV2PairAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIEightBallV2PairApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"approveEightBall"`
 */
export const useSimulateIEightBallV2PairApproveEightBall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateIEightBallV2PairBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "burn",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateIEightBallV2PairInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "initialize",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIEightBallV2PairMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "mint",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateIEightBallV2PairPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "permit",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"skim"`
 */
export const useSimulateIEightBallV2PairSkim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "skim",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateIEightBallV2PairSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "swap",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"sync"`
 */
export const useSimulateIEightBallV2PairSync =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "sync",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIEightBallV2PairTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIEightBallV2PairTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `functionName` set to `"updateProbabilities"`
 */
export const useSimulateIEightBallV2PairUpdateProbabilities =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IEightBallV2PairAbi,
    functionName: "updateProbabilities",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2PairAbi}__
 */
export const useWatchIEightBallV2PairEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: IEightBallV2PairAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIEightBallV2PairApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2PairAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `eventName` set to `"Burn"`
 */
export const useWatchIEightBallV2PairBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2PairAbi,
    eventName: "Burn",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchIEightBallV2PairMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2PairAbi,
    eventName: "Mint",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `eventName` set to `"Swap"`
 */
export const useWatchIEightBallV2PairSwapEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2PairAbi,
    eventName: "Swap",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `eventName` set to `"Sync"`
 */
export const useWatchIEightBallV2PairSyncEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2PairAbi,
    eventName: "Sync",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IEightBallV2PairAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIEightBallV2PairTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IEightBallV2PairAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__
 */
export const useReadIMulticall3 = /*#__PURE__*/ createUseReadContract({
  abi: IMulticall3Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const useReadIMulticall3GetBasefee = /*#__PURE__*/ createUseReadContract(
  { abi: IMulticall3Abi, functionName: "getBasefee" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const useReadIMulticall3GetBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getBlockHash",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const useReadIMulticall3GetBlockNumber =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getBlockNumber",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const useReadIMulticall3GetChainId = /*#__PURE__*/ createUseReadContract(
  { abi: IMulticall3Abi, functionName: "getChainId" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const useReadIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getCurrentBlockCoinbase",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const useReadIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getCurrentBlockDifficulty",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const useReadIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getCurrentBlockGasLimit",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const useReadIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getCurrentBlockTimestamp",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const useReadIMulticall3GetEthBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getEthBalance",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const useReadIMulticall3GetLastBlockHash =
  /*#__PURE__*/ createUseReadContract({
    abi: IMulticall3Abi,
    functionName: "getLastBlockHash",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IMulticall3Abi}__
 */
export const useWriteIMulticall3 = /*#__PURE__*/ createUseWriteContract({
  abi: IMulticall3Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useWriteIMulticall3Aggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: IMulticall3Abi,
    functionName: "aggregate",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useWriteIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseWriteContract({
    abi: IMulticall3Abi,
    functionName: "aggregate3",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useWriteIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseWriteContract({
    abi: IMulticall3Abi,
    functionName: "aggregate3Value",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useWriteIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: IMulticall3Abi,
    functionName: "blockAndAggregate",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useWriteIMulticall3TryAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: IMulticall3Abi,
    functionName: "tryAggregate",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useWriteIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseWriteContract({
    abi: IMulticall3Abi,
    functionName: "tryBlockAndAggregate",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IMulticall3Abi}__
 */
export const useSimulateIMulticall3 = /*#__PURE__*/ createUseSimulateContract({
  abi: IMulticall3Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const useSimulateIMulticall3Aggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IMulticall3Abi,
    functionName: "aggregate",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const useSimulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IMulticall3Abi,
    functionName: "aggregate3",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const useSimulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IMulticall3Abi,
    functionName: "aggregate3Value",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const useSimulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IMulticall3Abi,
    functionName: "blockAndAggregate",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const useSimulateIMulticall3TryAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IMulticall3Abi,
    functionName: "tryAggregate",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const useSimulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IMulticall3Abi,
    functionName: "tryBlockAndAggregate",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__
 */
export const useReadIOutcomeToken = /*#__PURE__*/ createUseReadContract({
  abi: IOutcomeTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadIOutcomeTokenAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: IOutcomeTokenAbi,
    functionName: "allowance",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIOutcomeTokenBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: IOutcomeTokenAbi,
    functionName: "balanceOf",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIOutcomeTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: IOutcomeTokenAbi,
    functionName: "totalSupply",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__
 */
export const useWriteIOutcomeToken = /*#__PURE__*/ createUseWriteContract({
  abi: IOutcomeTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteIOutcomeTokenApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: IOutcomeTokenAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteIOutcomeTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: IOutcomeTokenAbi,
  functionName: "burn",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteIOutcomeTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: IOutcomeTokenAbi,
  functionName: "mint",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIOutcomeTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: IOutcomeTokenAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteIOutcomeTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: IOutcomeTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__
 */
export const useSimulateIOutcomeToken = /*#__PURE__*/ createUseSimulateContract(
  { abi: IOutcomeTokenAbi }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateIOutcomeTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IOutcomeTokenAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateIOutcomeTokenBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IOutcomeTokenAbi,
    functionName: "burn",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIOutcomeTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IOutcomeTokenAbi,
    functionName: "mint",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIOutcomeTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IOutcomeTokenAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateIOutcomeTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IOutcomeTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IOutcomeTokenAbi}__
 */
export const useWatchIOutcomeTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: IOutcomeTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchIOutcomeTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IOutcomeTokenAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IOutcomeTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchIOutcomeTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IOutcomeTokenAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__
 */
export const useReadIPairFactoryV1 = /*#__PURE__*/ createUseReadContract({
  abi: IPairFactoryV1Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"allPairs"`
 */
export const useReadIPairFactoryV1AllPairs =
  /*#__PURE__*/ createUseReadContract({
    abi: IPairFactoryV1Abi,
    functionName: "allPairs",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"allPairsLength"`
 */
export const useReadIPairFactoryV1AllPairsLength =
  /*#__PURE__*/ createUseReadContract({
    abi: IPairFactoryV1Abi,
    functionName: "allPairsLength",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"feeTo"`
 */
export const useReadIPairFactoryV1FeeTo = /*#__PURE__*/ createUseReadContract({
  abi: IPairFactoryV1Abi,
  functionName: "feeTo",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"feeToSetter"`
 */
export const useReadIPairFactoryV1FeeToSetter =
  /*#__PURE__*/ createUseReadContract({
    abi: IPairFactoryV1Abi,
    functionName: "feeToSetter",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"getPair"`
 */
export const useReadIPairFactoryV1GetPair = /*#__PURE__*/ createUseReadContract(
  { abi: IPairFactoryV1Abi, functionName: "getPair" }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__
 */
export const useWriteIPairFactoryV1 = /*#__PURE__*/ createUseWriteContract({
  abi: IPairFactoryV1Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"createPair"`
 */
export const useWriteIPairFactoryV1CreatePair =
  /*#__PURE__*/ createUseWriteContract({
    abi: IPairFactoryV1Abi,
    functionName: "createPair",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"setFeeTo"`
 */
export const useWriteIPairFactoryV1SetFeeTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: IPairFactoryV1Abi,
    functionName: "setFeeTo",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"setFeeToSetter"`
 */
export const useWriteIPairFactoryV1SetFeeToSetter =
  /*#__PURE__*/ createUseWriteContract({
    abi: IPairFactoryV1Abi,
    functionName: "setFeeToSetter",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__
 */
export const useSimulateIPairFactoryV1 =
  /*#__PURE__*/ createUseSimulateContract({ abi: IPairFactoryV1Abi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"createPair"`
 */
export const useSimulateIPairFactoryV1CreatePair =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IPairFactoryV1Abi,
    functionName: "createPair",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"setFeeTo"`
 */
export const useSimulateIPairFactoryV1SetFeeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IPairFactoryV1Abi,
    functionName: "setFeeTo",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `functionName` set to `"setFeeToSetter"`
 */
export const useSimulateIPairFactoryV1SetFeeToSetter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: IPairFactoryV1Abi,
    functionName: "setFeeToSetter",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IPairFactoryV1Abi}__
 */
export const useWatchIPairFactoryV1Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: IPairFactoryV1Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link IPairFactoryV1Abi}__ and `eventName` set to `"PairCreated"`
 */
export const useWatchIPairFactoryV1PairCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: IPairFactoryV1Abi,
    eventName: "PairCreated",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IwethAbi}__
 */
export const useWriteIweth = /*#__PURE__*/ createUseWriteContract({
  abi: IwethAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IwethAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteIwethDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: IwethAbi,
  functionName: "deposit",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IwethAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteIwethTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: IwethAbi,
  functionName: "transfer",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link IwethAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteIwethWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: IwethAbi,
  functionName: "withdraw",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IwethAbi}__
 */
export const useSimulateIweth = /*#__PURE__*/ createUseSimulateContract({
  abi: IwethAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IwethAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateIwethDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: IwethAbi,
  functionName: "deposit",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IwethAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateIwethTransfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: IwethAbi, functionName: "transfer" }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link IwethAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateIwethWithdraw = /*#__PURE__*/ createUseSimulateContract(
  { abi: IwethAbi, functionName: "withdraw" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__
 */
export const useReadOutcomeToken = /*#__PURE__*/ createUseReadContract({
  abi: OutcomeTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadOutcomeTokenAllowance = /*#__PURE__*/ createUseReadContract(
  { abi: OutcomeTokenAbi, functionName: "allowance" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadOutcomeTokenBalanceOf = /*#__PURE__*/ createUseReadContract(
  { abi: OutcomeTokenAbi, functionName: "balanceOf" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadOutcomeTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: OutcomeTokenAbi,
  functionName: "decimals",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadOutcomeTokenName = /*#__PURE__*/ createUseReadContract({
  abi: OutcomeTokenAbi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOutcomeTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: OutcomeTokenAbi,
  functionName: "owner",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadOutcomeTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: OutcomeTokenAbi,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadOutcomeTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: OutcomeTokenAbi,
    functionName: "totalSupply",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__
 */
export const useWriteOutcomeToken = /*#__PURE__*/ createUseWriteContract({
  abi: OutcomeTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteOutcomeTokenApprove = /*#__PURE__*/ createUseWriteContract(
  { abi: OutcomeTokenAbi, functionName: "approve" }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteOutcomeTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: OutcomeTokenAbi,
  functionName: "burn",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteOutcomeTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: OutcomeTokenAbi,
  functionName: "mint",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOutcomeTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: OutcomeTokenAbi,
    functionName: "renounceOwnership",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteOutcomeTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: OutcomeTokenAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteOutcomeTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: OutcomeTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOutcomeTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: OutcomeTokenAbi,
    functionName: "transferOwnership",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__
 */
export const useSimulateOutcomeToken = /*#__PURE__*/ createUseSimulateContract({
  abi: OutcomeTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateOutcomeTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenAbi,
    functionName: "approve",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateOutcomeTokenBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenAbi,
    functionName: "burn",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateOutcomeTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenAbi,
    functionName: "mint",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOutcomeTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenAbi,
    functionName: "renounceOwnership",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateOutcomeTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenAbi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateOutcomeTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenAbi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOutcomeTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenAbi,
    functionName: "transferOwnership",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link OutcomeTokenAbi}__
 */
export const useWatchOutcomeTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: OutcomeTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchOutcomeTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: OutcomeTokenAbi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOutcomeTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: OutcomeTokenAbi,
    eventName: "OwnershipTransferred",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link OutcomeTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchOutcomeTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: OutcomeTokenAbi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenFactoryAbi}__
 */
export const useReadOutcomeTokenFactory = /*#__PURE__*/ createUseReadContract({
  abi: OutcomeTokenFactoryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OutcomeTokenFactoryAbi}__ and `functionName` set to `"computeAddress"`
 */
export const useReadOutcomeTokenFactoryComputeAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: OutcomeTokenFactoryAbi,
    functionName: "computeAddress",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenFactoryAbi}__
 */
export const useWriteOutcomeTokenFactory = /*#__PURE__*/ createUseWriteContract(
  { abi: OutcomeTokenFactoryAbi }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OutcomeTokenFactoryAbi}__ and `functionName` set to `"deployTokensWithOrdering"`
 */
export const useWriteOutcomeTokenFactoryDeployTokensWithOrdering =
  /*#__PURE__*/ createUseWriteContract({
    abi: OutcomeTokenFactoryAbi,
    functionName: "deployTokensWithOrdering",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenFactoryAbi}__
 */
export const useSimulateOutcomeTokenFactory =
  /*#__PURE__*/ createUseSimulateContract({ abi: OutcomeTokenFactoryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OutcomeTokenFactoryAbi}__ and `functionName` set to `"deployTokensWithOrdering"`
 */
export const useSimulateOutcomeTokenFactoryDeployTokensWithOrdering =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OutcomeTokenFactoryAbi,
    functionName: "deployTokensWithOrdering",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OwnableAbi}__
 */
export const useReadOwnable = /*#__PURE__*/ createUseReadContract({
  abi: OwnableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link OwnableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableOwner = /*#__PURE__*/ createUseReadContract({
  abi: OwnableAbi,
  functionName: "owner",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OwnableAbi}__
 */
export const useWriteOwnable = /*#__PURE__*/ createUseWriteContract({
  abi: OwnableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OwnableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: OwnableAbi,
    functionName: "renounceOwnership",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link OwnableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: OwnableAbi,
    functionName: "transferOwnership",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OwnableAbi}__
 */
export const useSimulateOwnable = /*#__PURE__*/ createUseSimulateContract({
  abi: OwnableAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OwnableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OwnableAbi,
    functionName: "renounceOwnership",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link OwnableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: OwnableAbi,
    functionName: "transferOwnership",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link OwnableAbi}__
 */
export const useWatchOwnableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: OwnableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link OwnableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: OwnableAbi,
    eventName: "OwnershipTransferred",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1 = /*#__PURE__*/ createUseReadContract({
  abi: PairFactoryV1Abi,
  address: PairFactoryV1Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"PAIR_HASH"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1PairHash = /*#__PURE__*/ createUseReadContract(
  {
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "PAIR_HASH",
  }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"allPairs"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1AllPairs = /*#__PURE__*/ createUseReadContract(
  {
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "allPairs",
  }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"allPairsLength"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1AllPairsLength =
  /*#__PURE__*/ createUseReadContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "allPairsLength",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"feeTo"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1FeeTo = /*#__PURE__*/ createUseReadContract({
  abi: PairFactoryV1Abi,
  address: PairFactoryV1Address,
  functionName: "feeTo",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"feeToSetter"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1FeeToSetter =
  /*#__PURE__*/ createUseReadContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "feeToSetter",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"getPair"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1GetPair = /*#__PURE__*/ createUseReadContract({
  abi: PairFactoryV1Abi,
  address: PairFactoryV1Address,
  functionName: "getPair",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"router"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useReadPairFactoryV1Router = /*#__PURE__*/ createUseReadContract({
  abi: PairFactoryV1Abi,
  address: PairFactoryV1Address,
  functionName: "router",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairFactoryV1Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useWritePairFactoryV1 = /*#__PURE__*/ createUseWriteContract({
  abi: PairFactoryV1Abi,
  address: PairFactoryV1Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"createPair"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useWritePairFactoryV1CreatePair =
  /*#__PURE__*/ createUseWriteContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "createPair",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"setFeeTo"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useWritePairFactoryV1SetFeeTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "setFeeTo",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"setFeeToSetter"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useWritePairFactoryV1SetFeeToSetter =
  /*#__PURE__*/ createUseWriteContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "setFeeToSetter",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairFactoryV1Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useSimulatePairFactoryV1 = /*#__PURE__*/ createUseSimulateContract(
  { abi: PairFactoryV1Abi, address: PairFactoryV1Address }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"createPair"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useSimulatePairFactoryV1CreatePair =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "createPair",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"setFeeTo"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useSimulatePairFactoryV1SetFeeTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "setFeeTo",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `functionName` set to `"setFeeToSetter"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useSimulatePairFactoryV1SetFeeToSetter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    functionName: "setFeeToSetter",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairFactoryV1Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useWatchPairFactoryV1Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairFactoryV1Abi}__ and `eventName` set to `"PairCreated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x98EF962dD0eC093E5d6DAc27b6183dE731EFC957)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x5405eeac7eba0d1d2cbee13ca426b5b62bac8c43)
 */
export const useWatchPairFactoryV1PairCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairFactoryV1Abi,
    address: PairFactoryV1Address,
    eventName: "PairCreated",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__
 */
export const useReadPairV1 = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadPairV1DomainSeparator = /*#__PURE__*/ createUseReadContract(
  { abi: PairV1Abi, functionName: "DOMAIN_SEPARATOR" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"MINIMUM_LIQUIDITY"`
 */
export const useReadPairV1MinimumLiquidity =
  /*#__PURE__*/ createUseReadContract({
    abi: PairV1Abi,
    functionName: "MINIMUM_LIQUIDITY",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadPairV1PermitTypehash = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "PERMIT_TYPEHASH",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadPairV1Allowance = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "allowance",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadPairV1BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadPairV1Decimals = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "decimals",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"factory"`
 */
export const useReadPairV1Factory = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "factory",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"getProbability"`
 */
export const useReadPairV1GetProbability = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "getProbability",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"getReserves"`
 */
export const useReadPairV1GetReserves = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "getReserves",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"kLast"`
 */
export const useReadPairV1KLast = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "kLast",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"name"`
 */
export const useReadPairV1Name = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"nonces"`
 */
export const useReadPairV1Nonces = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "nonces",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"price0CumulativeLast"`
 */
export const useReadPairV1Price0CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: PairV1Abi,
    functionName: "price0CumulativeLast",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"price1CumulativeLast"`
 */
export const useReadPairV1Price1CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: PairV1Abi,
    functionName: "price1CumulativeLast",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"router"`
 */
export const useReadPairV1Router = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "router",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadPairV1Symbol = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"token0"`
 */
export const useReadPairV1Token0 = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "token0",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"token1"`
 */
export const useReadPairV1Token1 = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "token1",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadPairV1TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: PairV1Abi,
  functionName: "totalSupply",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__
 */
export const useWritePairV1 = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"approve"`
 */
export const useWritePairV1Approve = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "approve",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"approveEightBall"`
 */
export const useWritePairV1ApproveEightBall =
  /*#__PURE__*/ createUseWriteContract({
    abi: PairV1Abi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"burn"`
 */
export const useWritePairV1Burn = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "burn",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"initialize"`
 */
export const useWritePairV1Initialize = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "initialize",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"mint"`
 */
export const useWritePairV1Mint = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "mint",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"permit"`
 */
export const useWritePairV1Permit = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "permit",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"skim"`
 */
export const useWritePairV1Skim = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "skim",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"swap"`
 */
export const useWritePairV1Swap = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "swap",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"sync"`
 */
export const useWritePairV1Sync = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "sync",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"transfer"`
 */
export const useWritePairV1Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "transfer",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWritePairV1TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: PairV1Abi,
  functionName: "transferFrom",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"updateProbabilities"`
 */
export const useWritePairV1UpdateProbabilities =
  /*#__PURE__*/ createUseWriteContract({
    abi: PairV1Abi,
    functionName: "updateProbabilities",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__
 */
export const useSimulatePairV1 = /*#__PURE__*/ createUseSimulateContract({
  abi: PairV1Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulatePairV1Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: PairV1Abi, functionName: "approve" }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"approveEightBall"`
 */
export const useSimulatePairV1ApproveEightBall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairV1Abi,
    functionName: "approveEightBall",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"burn"`
 */
export const useSimulatePairV1Burn = /*#__PURE__*/ createUseSimulateContract({
  abi: PairV1Abi,
  functionName: "burn",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"initialize"`
 */
export const useSimulatePairV1Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairV1Abi,
    functionName: "initialize",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulatePairV1Mint = /*#__PURE__*/ createUseSimulateContract({
  abi: PairV1Abi,
  functionName: "mint",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"permit"`
 */
export const useSimulatePairV1Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: PairV1Abi,
  functionName: "permit",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"skim"`
 */
export const useSimulatePairV1Skim = /*#__PURE__*/ createUseSimulateContract({
  abi: PairV1Abi,
  functionName: "skim",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"swap"`
 */
export const useSimulatePairV1Swap = /*#__PURE__*/ createUseSimulateContract({
  abi: PairV1Abi,
  functionName: "swap",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"sync"`
 */
export const useSimulatePairV1Sync = /*#__PURE__*/ createUseSimulateContract({
  abi: PairV1Abi,
  functionName: "sync",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulatePairV1Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairV1Abi,
    functionName: "transfer",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulatePairV1TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairV1Abi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link PairV1Abi}__ and `functionName` set to `"updateProbabilities"`
 */
export const useSimulatePairV1UpdateProbabilities =
  /*#__PURE__*/ createUseSimulateContract({
    abi: PairV1Abi,
    functionName: "updateProbabilities",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairV1Abi}__
 */
export const useWatchPairV1Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: PairV1Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairV1Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchPairV1ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairV1Abi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairV1Abi}__ and `eventName` set to `"Burn"`
 */
export const useWatchPairV1BurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairV1Abi,
    eventName: "Burn",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairV1Abi}__ and `eventName` set to `"Mint"`
 */
export const useWatchPairV1MintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairV1Abi,
    eventName: "Mint",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairV1Abi}__ and `eventName` set to `"Swap"`
 */
export const useWatchPairV1SwapEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairV1Abi,
    eventName: "Swap",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairV1Abi}__ and `eventName` set to `"Sync"`
 */
export const useWatchPairV1SyncEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairV1Abi,
    eventName: "Sync",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PairV1Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchPairV1TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PairV1Abi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PausableAbi}__
 */
export const useReadPausable = /*#__PURE__*/ createUseReadContract({
  abi: PausableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link PausableAbi}__ and `functionName` set to `"paused"`
 */
export const useReadPausablePaused = /*#__PURE__*/ createUseReadContract({
  abi: PausableAbi,
  functionName: "paused",
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PausableAbi}__
 */
export const useWatchPausableEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: PausableAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PausableAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchPausablePausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PausableAbi,
    eventName: "Paused",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link PausableAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchPausableUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: PausableAbi,
    eventName: "Unpaused",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterEventEmitterAbi}__
 */
export const useWriteRouterEventEmitter = /*#__PURE__*/ createUseWriteContract({
  abi: RouterEventEmitterAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterEventEmitterAbi}__ and `functionName` set to `"buyOutcome"`
 */
export const useWriteRouterEventEmitterBuyOutcome =
  /*#__PURE__*/ createUseWriteContract({
    abi: RouterEventEmitterAbi,
    functionName: "buyOutcome",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterEventEmitterAbi}__
 */
export const useSimulateRouterEventEmitter =
  /*#__PURE__*/ createUseSimulateContract({ abi: RouterEventEmitterAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterEventEmitterAbi}__ and `functionName` set to `"buyOutcome"`
 */
export const useSimulateRouterEventEmitterBuyOutcome =
  /*#__PURE__*/ createUseSimulateContract({
    abi: RouterEventEmitterAbi,
    functionName: "buyOutcome",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link RouterEventEmitterAbi}__
 */
export const useWatchRouterEventEmitterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: RouterEventEmitterAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link RouterEventEmitterAbi}__ and `eventName` set to `"Amounts"`
 */
export const useWatchRouterEventEmitterAmountsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: RouterEventEmitterAbi,
    eventName: "Amounts",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterProxyAbi}__
 */
export const useReadRouterProxy = /*#__PURE__*/ createUseReadContract({
  abi: RouterProxyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterProxyAbi}__ and `functionName` set to `"adminContract"`
 */
export const useReadRouterProxyAdminContract =
  /*#__PURE__*/ createUseReadContract({
    abi: RouterProxyAbi,
    functionName: "adminContract",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterProxyAbi}__
 */
export const useWriteRouterProxy = /*#__PURE__*/ createUseWriteContract({
  abi: RouterProxyAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterProxyAbi}__ and `functionName` set to `"upgrade"`
 */
export const useWriteRouterProxyUpgrade = /*#__PURE__*/ createUseWriteContract({
  abi: RouterProxyAbi,
  functionName: "upgrade",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterProxyAbi}__
 */
export const useSimulateRouterProxy = /*#__PURE__*/ createUseSimulateContract({
  abi: RouterProxyAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterProxyAbi}__ and `functionName` set to `"upgrade"`
 */
export const useSimulateRouterProxyUpgrade =
  /*#__PURE__*/ createUseSimulateContract({
    abi: RouterProxyAbi,
    functionName: "upgrade",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link RouterProxyAbi}__
 */
export const useWatchRouterProxyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: RouterProxyAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link RouterProxyAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchRouterProxyUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: RouterProxyAbi,
    eventName: "Upgraded",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterV1Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useReadRouterV1 = /*#__PURE__*/ createUseReadContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"WETH"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useReadRouterV1Weth = /*#__PURE__*/ createUseReadContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
  functionName: "WETH",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"factory"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useReadRouterV1Factory = /*#__PURE__*/ createUseReadContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
  functionName: "factory",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"getAmountOut"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useReadRouterV1GetAmountOut = /*#__PURE__*/ createUseReadContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
  functionName: "getAmountOut",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"getAmountsOut"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useReadRouterV1GetAmountsOut = /*#__PURE__*/ createUseReadContract(
  { abi: RouterV1Abi, address: RouterV1Address, functionName: "getAmountsOut" }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"quote"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useReadRouterV1Quote = /*#__PURE__*/ createUseReadContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
  functionName: "quote",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterV1Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useWriteRouterV1 = /*#__PURE__*/ createUseWriteContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"addLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useWriteRouterV1AddLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: RouterV1Abi,
    address: RouterV1Address,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"buyOutcome"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useWriteRouterV1BuyOutcome = /*#__PURE__*/ createUseWriteContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
  functionName: "buyOutcome",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"removeLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useWriteRouterV1RemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: RouterV1Abi,
    address: RouterV1Address,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterV1Abi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useSimulateRouterV1 = /*#__PURE__*/ createUseSimulateContract({
  abi: RouterV1Abi,
  address: RouterV1Address,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"addLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useSimulateRouterV1AddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: RouterV1Abi,
    address: RouterV1Address,
    functionName: "addLiquidity",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"buyOutcome"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useSimulateRouterV1BuyOutcome =
  /*#__PURE__*/ createUseSimulateContract({
    abi: RouterV1Abi,
    address: RouterV1Address,
    functionName: "buyOutcome",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link RouterV1Abi}__ and `functionName` set to `"removeLiquidity"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0xEA9BA596F06E76AC9d4dc2e984c3C9C7B504367A)
 * - [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xafc877cfe7ce9dd15b6e165f0a44785ea66a4dfa)
 */
export const useSimulateRouterV1RemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: RouterV1Abi,
    address: RouterV1Address,
    functionName: "removeLiquidity",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link SafeRefundAbi}__
 */
export const useWatchSafeRefundEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: SafeRefundAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link SafeRefundAbi}__ and `eventName` set to `"Refunded"`
 */
export const useWatchSafeRefundRefundedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: SafeRefundAbi,
    eventName: "Refunded",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ScriptAbi}__
 */
export const useReadScript = /*#__PURE__*/ createUseReadContract({
  abi: ScriptAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ScriptAbi}__ and `functionName` set to `"IS_SCRIPT"`
 */
export const useReadScriptIsScript = /*#__PURE__*/ createUseReadContract({
  abi: ScriptAbi,
  functionName: "IS_SCRIPT",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link TopicRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useReadTopicRegistry = /*#__PURE__*/ createUseReadContract({
  abi: TopicRegistryAbi,
  address: TopicRegistryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link TopicRegistryAbi}__ and `functionName` set to `"adminContract"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useReadTopicRegistryAdminContract =
  /*#__PURE__*/ createUseReadContract({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    functionName: "adminContract",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link TopicRegistryAbi}__ and `functionName` set to `"currentTopicId"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useReadTopicRegistryCurrentTopicId =
  /*#__PURE__*/ createUseReadContract({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    functionName: "currentTopicId",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link TopicRegistryAbi}__ and `functionName` set to `"getTopic"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useReadTopicRegistryGetTopic = /*#__PURE__*/ createUseReadContract(
  {
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    functionName: "getTopic",
  }
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link TopicRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useWriteTopicRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: TopicRegistryAbi,
  address: TopicRegistryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link TopicRegistryAbi}__ and `functionName` set to `"createTopic"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useWriteTopicRegistryCreateTopic =
  /*#__PURE__*/ createUseWriteContract({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    functionName: "createTopic",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link TopicRegistryAbi}__ and `functionName` set to `"updateTopic"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useWriteTopicRegistryUpdateTopic =
  /*#__PURE__*/ createUseWriteContract({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    functionName: "updateTopic",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link TopicRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useSimulateTopicRegistry = /*#__PURE__*/ createUseSimulateContract(
  { abi: TopicRegistryAbi, address: TopicRegistryAddress }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link TopicRegistryAbi}__ and `functionName` set to `"createTopic"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useSimulateTopicRegistryCreateTopic =
  /*#__PURE__*/ createUseSimulateContract({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    functionName: "createTopic",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link TopicRegistryAbi}__ and `functionName` set to `"updateTopic"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useSimulateTopicRegistryUpdateTopic =
  /*#__PURE__*/ createUseSimulateContract({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    functionName: "updateTopic",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link TopicRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useWatchTopicRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link TopicRegistryAbi}__ and `eventName` set to `"TopicCreated"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useWatchTopicRegistryTopicCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    eventName: "TopicCreated",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link TopicRegistryAbi}__ and `eventName` set to `"TopicUpdated"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0xc7b1a1e4f828d8a3805e789503557eb49df00e55)
 */
export const useWatchTopicRegistryTopicUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: TopicRegistryAbi,
    address: TopicRegistryAddress,
    eventName: "TopicUpdated",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link UserRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useReadUserRegistry = /*#__PURE__*/ createUseReadContract({
  abi: UserRegistryAbi,
  address: UserRegistryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link UserRegistryAbi}__ and `functionName` set to `"adminContract"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useReadUserRegistryAdminContract =
  /*#__PURE__*/ createUseReadContract({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
    functionName: "adminContract",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link UserRegistryAbi}__ and `functionName` set to `"getUser"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useReadUserRegistryGetUser = /*#__PURE__*/ createUseReadContract({
  abi: UserRegistryAbi,
  address: UserRegistryAddress,
  functionName: "getUser",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link UserRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useWriteUserRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: UserRegistryAbi,
  address: UserRegistryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link UserRegistryAbi}__ and `functionName` set to `"createUser"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useWriteUserRegistryCreateUser =
  /*#__PURE__*/ createUseWriteContract({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
    functionName: "createUser",
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link UserRegistryAbi}__ and `functionName` set to `"updateUser"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useWriteUserRegistryUpdateUser =
  /*#__PURE__*/ createUseWriteContract({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
    functionName: "updateUser",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link UserRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useSimulateUserRegistry = /*#__PURE__*/ createUseSimulateContract({
  abi: UserRegistryAbi,
  address: UserRegistryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link UserRegistryAbi}__ and `functionName` set to `"createUser"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useSimulateUserRegistryCreateUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
    functionName: "createUser",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link UserRegistryAbi}__ and `functionName` set to `"updateUser"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useSimulateUserRegistryUpdateUser =
  /*#__PURE__*/ createUseSimulateContract({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
    functionName: "updateUser",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link UserRegistryAbi}__
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useWatchUserRegistryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link UserRegistryAbi}__ and `eventName` set to `"UserCreated"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useWatchUserRegistryUserCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
    eventName: "UserCreated",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link UserRegistryAbi}__ and `eventName` set to `"UserUpdated"`
 *
 * [__View Contract on Base Sepolia Basescan__](https://sepolia.basescan.org/address/0x60a96694220d67cd930b5919e57af2b1b098c9f1)
 */
export const useWatchUserRegistryUserUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: UserRegistryAbi,
    address: UserRegistryAddress,
    eventName: "UserUpdated",
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Weth9Abi}__
 */
export const useReadWeth9 = /*#__PURE__*/ createUseReadContract({
  abi: Weth9Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadWeth9Allowance = /*#__PURE__*/ createUseReadContract({
  abi: Weth9Abi,
  functionName: "allowance",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadWeth9BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: Weth9Abi,
  functionName: "balanceOf",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadWeth9Decimals = /*#__PURE__*/ createUseReadContract({
  abi: Weth9Abi,
  functionName: "decimals",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"name"`
 */
export const useReadWeth9Name = /*#__PURE__*/ createUseReadContract({
  abi: Weth9Abi,
  functionName: "name",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadWeth9Symbol = /*#__PURE__*/ createUseReadContract({
  abi: Weth9Abi,
  functionName: "symbol",
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadWeth9TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: Weth9Abi,
  functionName: "totalSupply",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Weth9Abi}__
 */
export const useWriteWeth9 = /*#__PURE__*/ createUseWriteContract({
  abi: Weth9Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteWeth9Approve = /*#__PURE__*/ createUseWriteContract({
  abi: Weth9Abi,
  functionName: "approve",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"deposit"`
 */
export const useWriteWeth9Deposit = /*#__PURE__*/ createUseWriteContract({
  abi: Weth9Abi,
  functionName: "deposit",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteWeth9Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: Weth9Abi,
  functionName: "transfer",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteWeth9TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: Weth9Abi,
  functionName: "transferFrom",
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteWeth9Withdraw = /*#__PURE__*/ createUseWriteContract({
  abi: Weth9Abi,
  functionName: "withdraw",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Weth9Abi}__
 */
export const useSimulateWeth9 = /*#__PURE__*/ createUseSimulateContract({
  abi: Weth9Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateWeth9Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: Weth9Abi,
  functionName: "approve",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateWeth9Deposit = /*#__PURE__*/ createUseSimulateContract({
  abi: Weth9Abi,
  functionName: "deposit",
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateWeth9Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: Weth9Abi, functionName: "transfer" }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateWeth9TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: Weth9Abi,
    functionName: "transferFrom",
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link Weth9Abi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateWeth9Withdraw = /*#__PURE__*/ createUseSimulateContract(
  { abi: Weth9Abi, functionName: "withdraw" }
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Weth9Abi}__
 */
export const useWatchWeth9Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: Weth9Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Weth9Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchWeth9ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Weth9Abi,
    eventName: "Approval",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Weth9Abi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchWeth9DepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Weth9Abi,
    eventName: "Deposit",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Weth9Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchWeth9TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Weth9Abi,
    eventName: "Transfer",
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link Weth9Abi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchWeth9WithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: Weth9Abi,
    eventName: "Withdrawal",
  })
