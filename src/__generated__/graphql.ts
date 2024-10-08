/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type LpPosition = {
  __typename?: 'LpPosition';
  amountLp: Scalars['BigInt']['output'];
  amountUsdc: Scalars['BigInt']['output'];
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  market: Market;
  marketId: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  updatedAt: Scalars['BigInt']['output'];
  user: User;
  userAddress: Scalars['String']['output'];
};

export type LpPositionFilter = {
  AND?: InputMaybe<Array<InputMaybe<LpPositionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LpPositionFilter>>>;
  amountLp?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountLp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  userAddress_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LpPositionPage = {
  __typename?: 'LpPositionPage';
  items: Array<LpPosition>;
  pageInfo: PageInfo;
};

export type LpPositionPrice = {
  __typename?: 'LpPositionPrice';
  amountLp: Scalars['BigInt']['output'];
  amountUsdc: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  marketId: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  userAddress: Scalars['String']['output'];
};

export type LpPositionPriceFilter = {
  AND?: InputMaybe<Array<InputMaybe<LpPositionPriceFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LpPositionPriceFilter>>>;
  amountLp?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountLp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  userAddress_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LpPositionPricePage = {
  __typename?: 'LpPositionPricePage';
  items: Array<LpPositionPrice>;
  pageInfo: PageInfo;
};

export type LpTrade = {
  __typename?: 'LpTrade';
  amountLp: Scalars['BigInt']['output'];
  amountUsdc: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  market: Market;
  marketId: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  user: User;
  userAddress: Scalars['String']['output'];
};

export type LpTradeFilter = {
  AND?: InputMaybe<Array<InputMaybe<LpTradeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LpTradeFilter>>>;
  amountLp?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountLp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountLp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  userAddress_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LpTradePage = {
  __typename?: 'LpTradePage';
  items: Array<LpTrade>;
  pageInfo: PageInfo;
};

export type Market = {
  __typename?: 'Market';
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  initialProb: Scalars['BigInt']['output'];
  liquidityBalanceUsdc: Scalars['BigInt']['output'];
  liquidityTotal?: Maybe<Scalars['BigInt']['output']>;
  marketId: Scalars['BigInt']['output'];
  outcome?: Maybe<Scalars['String']['output']>;
  outcomeA: Scalars['String']['output'];
  outcomeB: Scalars['String']['output'];
  outcomeOddsA: Scalars['BigInt']['output'];
  outcomeOddsB: Scalars['BigInt']['output'];
  pairAddress: Scalars['String']['output'];
  proposedAt?: Maybe<Scalars['BigInt']['output']>;
  proposedOutcome?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  resolved?: Maybe<Scalars['Boolean']['output']>;
  resolvedAt?: Maybe<Scalars['BigInt']['output']>;
  title: Scalars['String']['output'];
  topic?: Maybe<Topic>;
  topicId?: Maybe<Scalars['BigInt']['output']>;
  trades?: Maybe<TradePage>;
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  usdcStake: Scalars['BigInt']['output'];
  userAddress: Scalars['String']['output'];
};


export type MarketTradesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TradeFilter>;
};

export type MarketFilter = {
  AND?: InputMaybe<Array<InputMaybe<MarketFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MarketFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  initialProb?: InputMaybe<Scalars['BigInt']['input']>;
  initialProb_gt?: InputMaybe<Scalars['BigInt']['input']>;
  initialProb_gte?: InputMaybe<Scalars['BigInt']['input']>;
  initialProb_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  initialProb_lt?: InputMaybe<Scalars['BigInt']['input']>;
  initialProb_lte?: InputMaybe<Scalars['BigInt']['input']>;
  initialProb_not?: InputMaybe<Scalars['BigInt']['input']>;
  initialProb_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityBalanceUsdc?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityBalanceUsdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityBalanceUsdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityBalanceUsdc_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityBalanceUsdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityBalanceUsdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityBalanceUsdc_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityBalanceUsdc_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityTotal?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotal_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityTotal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotal_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotal_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  outcomeA?: InputMaybe<Scalars['String']['input']>;
  outcomeA_contains?: InputMaybe<Scalars['String']['input']>;
  outcomeA_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcomeA_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcomeA_not?: InputMaybe<Scalars['String']['input']>;
  outcomeA_not_contains?: InputMaybe<Scalars['String']['input']>;
  outcomeA_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcomeA_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcomeA_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcomeA_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcomeB?: InputMaybe<Scalars['String']['input']>;
  outcomeB_contains?: InputMaybe<Scalars['String']['input']>;
  outcomeB_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcomeB_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcomeB_not?: InputMaybe<Scalars['String']['input']>;
  outcomeB_not_contains?: InputMaybe<Scalars['String']['input']>;
  outcomeB_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcomeB_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcomeB_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcomeB_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcomeOddsA?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsA_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcomeOddsA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsA_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsA_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcomeOddsB?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsB_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsB_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsB_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcomeOddsB_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsB_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsB_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeOddsB_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcome_contains?: InputMaybe<Scalars['String']['input']>;
  outcome_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcome_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcome_not?: InputMaybe<Scalars['String']['input']>;
  outcome_not_contains?: InputMaybe<Scalars['String']['input']>;
  outcome_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  outcome_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcome_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  outcome_starts_with?: InputMaybe<Scalars['String']['input']>;
  pairAddress?: InputMaybe<Scalars['String']['input']>;
  pairAddress_contains?: InputMaybe<Scalars['String']['input']>;
  pairAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  pairAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pairAddress_not?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pairAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pairAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposedAt?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  proposedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  proposedOutcome?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_contains?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposedOutcome_not?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposedOutcome_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_starts_with?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
  question_contains?: InputMaybe<Scalars['String']['input']>;
  question_ends_with?: InputMaybe<Scalars['String']['input']>;
  question_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  question_not?: InputMaybe<Scalars['String']['input']>;
  question_not_contains?: InputMaybe<Scalars['String']['input']>;
  question_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  question_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  question_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  question_starts_with?: InputMaybe<Scalars['String']['input']>;
  resolved?: InputMaybe<Scalars['Boolean']['input']>;
  resolvedAt?: InputMaybe<Scalars['BigInt']['input']>;
  resolvedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  resolvedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  resolvedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  resolvedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  resolvedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  resolvedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  resolvedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  resolved_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  resolved_not?: InputMaybe<Scalars['Boolean']['input']>;
  resolved_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  topicId?: InputMaybe<Scalars['BigInt']['input']>;
  topicId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  topicId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  topicId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  topicId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  topicId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  topicId_not?: InputMaybe<Scalars['BigInt']['input']>;
  topicId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  usdcStake?: InputMaybe<Scalars['BigInt']['input']>;
  usdcStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdcStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdcStake_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  usdcStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdcStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdcStake_not?: InputMaybe<Scalars['BigInt']['input']>;
  usdcStake_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  userAddress_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type MarketPage = {
  __typename?: 'MarketPage';
  items: Array<Market>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Position = {
  __typename?: 'Position';
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  market: Market;
  marketId: Scalars['BigInt']['output'];
  option: Scalars['Int']['output'];
  tokensOwned: Scalars['BigInt']['output'];
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  user: User;
  userAddress: Scalars['String']['output'];
};

export type PositionFilter = {
  AND?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PositionFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  option?: InputMaybe<Scalars['Int']['input']>;
  option_gt?: InputMaybe<Scalars['Int']['input']>;
  option_gte?: InputMaybe<Scalars['Int']['input']>;
  option_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  option_lt?: InputMaybe<Scalars['Int']['input']>;
  option_lte?: InputMaybe<Scalars['Int']['input']>;
  option_not?: InputMaybe<Scalars['Int']['input']>;
  option_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  tokensOwned?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokensOwned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  userAddress_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PositionPage = {
  __typename?: 'PositionPage';
  items: Array<Position>;
  pageInfo: PageInfo;
};

export type Price = {
  __typename?: 'Price';
  blockNumber: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  marketId: Scalars['BigInt']['output'];
  price: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  trade?: Maybe<Trade>;
  txHash?: Maybe<Scalars['String']['output']>;
};

export type PriceFilter = {
  AND?: InputMaybe<Array<InputMaybe<PriceFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PriceFilter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type PricePage = {
  __typename?: 'PricePage';
  items: Array<Price>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  _meta?: Maybe<_Meta>;
  lpPosition?: Maybe<LpPosition>;
  lpPositionPrice?: Maybe<LpPositionPrice>;
  lpPositionPrices: LpPositionPricePage;
  lpPositions: LpPositionPage;
  lpTrade?: Maybe<LpTrade>;
  lpTrades: LpTradePage;
  market?: Maybe<Market>;
  markets: MarketPage;
  position?: Maybe<Position>;
  positions: PositionPage;
  price?: Maybe<Price>;
  prices: PricePage;
  referral?: Maybe<Referral>;
  referrals: ReferralPage;
  topic?: Maybe<Topic>;
  topics: TopicPage;
  trade?: Maybe<Trade>;
  trades: TradePage;
  user?: Maybe<User>;
  users: UserPage;
};


export type QueryLpPositionArgs = {
  id: Scalars['String']['input'];
};


export type QueryLpPositionPriceArgs = {
  id: Scalars['String']['input'];
};


export type QueryLpPositionPricesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LpPositionPriceFilter>;
};


export type QueryLpPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LpPositionFilter>;
};


export type QueryLpTradeArgs = {
  id: Scalars['String']['input'];
};


export type QueryLpTradesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LpTradeFilter>;
};


export type QueryMarketArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryMarketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<MarketFilter>;
};


export type QueryPositionArgs = {
  id: Scalars['String']['input'];
};


export type QueryPositionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PositionFilter>;
};


export type QueryPriceArgs = {
  id: Scalars['String']['input'];
};


export type QueryPricesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<PriceFilter>;
};


export type QueryReferralArgs = {
  id: Scalars['String']['input'];
};


export type QueryReferralsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ReferralFilter>;
};


export type QueryTopicArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryTopicsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TopicFilter>;
};


export type QueryTradeArgs = {
  id: Scalars['String']['input'];
};


export type QueryTradesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<TradeFilter>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<UserFilter>;
};

export type Referral = {
  __typename?: 'Referral';
  feeAmount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  market: Market;
  marketId: Scalars['BigInt']['output'];
  referrerAddress: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  trade: Trade;
  txHash: Scalars['String']['output'];
  user: User;
  userAddress: Scalars['String']['output'];
};

export type ReferralFilter = {
  AND?: InputMaybe<Array<InputMaybe<ReferralFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ReferralFilter>>>;
  feeAmount?: InputMaybe<Scalars['BigInt']['input']>;
  feeAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  feeAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  feeAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  referrerAddress?: InputMaybe<Scalars['String']['input']>;
  referrerAddress_contains?: InputMaybe<Scalars['String']['input']>;
  referrerAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  referrerAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  referrerAddress_not?: InputMaybe<Scalars['String']['input']>;
  referrerAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  referrerAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  referrerAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  referrerAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  referrerAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  userAddress_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type ReferralPage = {
  __typename?: 'ReferralPage';
  items: Array<Referral>;
  pageInfo: PageInfo;
};

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['BigInt']['output'];
  creatorAddress: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['BigInt']['output'];
  markets?: Maybe<MarketPage>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};


export type TopicMarketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<MarketFilter>;
};

export type TopicFilter = {
  AND?: InputMaybe<Array<InputMaybe<TopicFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TopicFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  creatorAddress?: InputMaybe<Scalars['String']['input']>;
  creatorAddress_contains?: InputMaybe<Scalars['String']['input']>;
  creatorAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  creatorAddress_not?: InputMaybe<Scalars['String']['input']>;
  creatorAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  creatorAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  creatorAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type TopicPage = {
  __typename?: 'TopicPage';
  items: Array<Topic>;
  pageInfo: PageInfo;
};

export type Trade = {
  __typename?: 'Trade';
  amountTokens: Scalars['BigInt']['output'];
  amountUsdc: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  market: Market;
  marketId: Scalars['BigInt']['output'];
  netAmount: Scalars['BigInt']['output'];
  option: Scalars['Int']['output'];
  price: Scalars['BigInt']['output'];
  referrer?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['BigInt']['output'];
  tradeType: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
  user: User;
  userAddress: Scalars['String']['output'];
};

export type TradeFilter = {
  AND?: InputMaybe<Array<InputMaybe<TradeFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TradeFilter>>>;
  amountTokens?: InputMaybe<Scalars['BigInt']['input']>;
  amountTokens_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountTokens_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountTokens_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountTokens_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountTokens_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountTokens_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountTokens_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amountUsdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountUsdc_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  marketId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not?: InputMaybe<Scalars['BigInt']['input']>;
  marketId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  netAmount?: InputMaybe<Scalars['BigInt']['input']>;
  netAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  netAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  netAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  netAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  netAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  netAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  netAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  option?: InputMaybe<Scalars['Int']['input']>;
  option_gt?: InputMaybe<Scalars['Int']['input']>;
  option_gte?: InputMaybe<Scalars['Int']['input']>;
  option_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  option_lt?: InputMaybe<Scalars['Int']['input']>;
  option_lte?: InputMaybe<Scalars['Int']['input']>;
  option_not?: InputMaybe<Scalars['Int']['input']>;
  option_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  referrer_contains?: InputMaybe<Scalars['String']['input']>;
  referrer_ends_with?: InputMaybe<Scalars['String']['input']>;
  referrer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  referrer_not?: InputMaybe<Scalars['String']['input']>;
  referrer_not_contains?: InputMaybe<Scalars['String']['input']>;
  referrer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  referrer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  referrer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  referrer_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tradeType?: InputMaybe<Scalars['String']['input']>;
  tradeType_contains?: InputMaybe<Scalars['String']['input']>;
  tradeType_ends_with?: InputMaybe<Scalars['String']['input']>;
  tradeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tradeType_not?: InputMaybe<Scalars['String']['input']>;
  tradeType_not_contains?: InputMaybe<Scalars['String']['input']>;
  tradeType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tradeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tradeType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tradeType_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  txHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  txHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
  userAddress_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type TradePage = {
  __typename?: 'TradePage';
  items: Array<Trade>;
  pageInfo: PageInfo;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  externalAuthProviderUserId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isRegistered: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  pfp?: Maybe<Scalars['String']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  walletAddress: Scalars['String']['output'];
};

export type UserFilter = {
  AND?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  externalAuthProviderUserId?: InputMaybe<Scalars['String']['input']>;
  externalAuthProviderUserId_contains?: InputMaybe<Scalars['String']['input']>;
  externalAuthProviderUserId_ends_with?: InputMaybe<Scalars['String']['input']>;
  externalAuthProviderUserId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalAuthProviderUserId_not?: InputMaybe<Scalars['String']['input']>;
  externalAuthProviderUserId_not_contains?: InputMaybe<Scalars['String']['input']>;
  externalAuthProviderUserId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  externalAuthProviderUserId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  externalAuthProviderUserId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  externalAuthProviderUserId_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  isRegistered?: InputMaybe<Scalars['Boolean']['input']>;
  isRegistered_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  isRegistered_not?: InputMaybe<Scalars['Boolean']['input']>;
  isRegistered_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  pfp?: InputMaybe<Scalars['String']['input']>;
  pfp_contains?: InputMaybe<Scalars['String']['input']>;
  pfp_ends_with?: InputMaybe<Scalars['String']['input']>;
  pfp_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pfp_not?: InputMaybe<Scalars['String']['input']>;
  pfp_not_contains?: InputMaybe<Scalars['String']['input']>;
  pfp_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pfp_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pfp_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pfp_starts_with?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
  theme_contains?: InputMaybe<Scalars['String']['input']>;
  theme_ends_with?: InputMaybe<Scalars['String']['input']>;
  theme_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  theme_not?: InputMaybe<Scalars['String']['input']>;
  theme_not_contains?: InputMaybe<Scalars['String']['input']>;
  theme_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  theme_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  theme_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  theme_starts_with?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  walletAddress_contains?: InputMaybe<Scalars['String']['input']>;
  walletAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  walletAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  walletAddress_not?: InputMaybe<Scalars['String']['input']>;
  walletAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  walletAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  walletAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  walletAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  walletAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type UserPage = {
  __typename?: 'UserPage';
  items: Array<User>;
  pageInfo: PageInfo;
};

export type _Meta = {
  __typename?: '_meta';
  status?: Maybe<Scalars['JSON']['output']>;
};

export type GetMarketPricesQueryVariables = Exact<{
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetMarketPricesQuery = { __typename?: 'Query', prices: { __typename?: 'PricePage', items: Array<{ __typename?: 'Price', id: string, marketId: any, price: any, timestamp: any }> } };

export type FriendsOrdersByUserQueryVariables = Exact<{
  userAddressArr: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type FriendsOrdersByUserQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', marketId: any, option: number, tokensOwned: any, createdAt: any, market: { __typename?: 'Market', id: any, initialProb: any, marketId: any, outcomeA: string, outcomeB: string, outcomeOddsA: any, outcomeOddsB: any, question: string, title: string, usdcStake: any }, user: { __typename?: 'User', externalAuthProviderUserId?: string | null, name?: string | null, pfp?: string | null, walletAddress: string } }> } };

export type GetLpPositionsDataQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type GetLpPositionsDataQuery = { __typename?: 'Query', lpPositionPrices: { __typename?: 'LpPositionPricePage', items: Array<{ __typename?: 'LpPositionPrice', amountLp: any, amountUsdc: any, marketId: any, id: string, timestamp: any, userAddress: string }> } };

export type GetLpPositionOriginalValueUsdcQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type GetLpPositionOriginalValueUsdcQuery = { __typename?: 'Query', lpTrades: { __typename?: 'LpTradePage', items: Array<{ __typename?: 'LpTrade', amountLp: any, amountUsdc: any, userAddress: string }> } };

export type GetUserLpQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type GetUserLpQuery = { __typename?: 'Query', lpPositions: { __typename?: 'LpPositionPage', items: Array<{ __typename?: 'LpPosition', amountUsdc: any, amountLp: any, marketId: any, createdAt: any, market: { __typename?: 'Market', liquidityTotal?: any | null, title: string, question: string } }> } };

export type AllMarketsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMarketsQuery = { __typename?: 'Query', markets: { __typename?: 'MarketPage', items: Array<{ __typename?: 'Market', marketId: any, outcomeB: string, outcomeA: string, outcomeOddsB: any, outcomeOddsA: any, question: string, title: string, topicId?: any | null, usdcStake: any }> } };

export type CreatedMarketsByUserAddressQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type CreatedMarketsByUserAddressQuery = { __typename?: 'Query', markets: { __typename?: 'MarketPage', items: Array<{ __typename?: 'Market', createdAt: any, id: any, initialProb: any, outcomeA: string, outcomeB: string, outcomeOddsA: any, outcomeOddsB: any, question: string, proposedOutcome?: string | null, resolved?: boolean | null, title: string, topicId?: any | null }> } };

export type GetMarketByIdQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type GetMarketByIdQuery = { __typename?: 'Query', market?: { __typename?: 'Market', id: any, marketId: any, createdAt: any, initialProb: any, liquidityTotal?: any | null, liquidityBalanceUsdc: any, outcomeA: string, outcomeB: string, outcomeOddsA: any, outcomeOddsB: any, outcome?: string | null, proposedAt?: any | null, question: string, proposedOutcome?: string | null, title: string, usdcStake: any, topicId?: any | null, userAddress: string } | null };

export type MarketUsersQueryVariables = Exact<{
  marketId: Scalars['BigInt']['input'];
}>;


export type MarketUsersQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', option: number, tokensOwned: any, updatedAt?: any | null, userAddress: string, user: { __typename?: 'User', id: string, name?: string | null, pfp?: string | null, externalAuthProviderUserId?: string | null, walletAddress: string } }> } };

export type OrderByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type OrderByIdQuery = { __typename?: 'Query', position?: { __typename?: 'Position', marketId: any, option: number, tokensOwned: any, userAddress: string, market: { __typename?: 'Market', title: string, question: string, usdcStake: any, outcomeA: string, outcomeB: string, outcomeOddsA: any, outcomeOddsB: any }, user: { __typename?: 'User', name?: string | null, pfp?: string | null } } | null };

export type FriendsOrdersQueryVariables = Exact<{
  userAddresses: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type FriendsOrdersQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', marketId: any, option: number, tokensOwned: any, market: { __typename?: 'Market', id: any, initialProb: any, marketId: any, outcomeA: string, outcomeB: string, outcomeOddsA: any, outcomeOddsB: any, question: string, title: string, usdcStake: any }, user: { __typename?: 'User', externalAuthProviderUserId?: string | null, name?: string | null, pfp?: string | null } }> } };

export type GetPositionsByWalletQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type GetPositionsByWalletQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', marketId: any, option: number, tokensOwned: any, market: { __typename?: 'Market', id: any, initialProb: any, marketId: any, outcomeA: string, outcomeB: string, outcomeOddsA: any, outcomeOddsB: any, question: string, title: string, usdcStake: any, outcome?: string | null, resolved?: boolean | null }, user: { __typename?: 'User', externalAuthProviderUserId?: string | null, name?: string | null, pfp?: string | null } }> } };

export type UserOrderCountQueryVariables = Exact<{
  userAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserOrderCountQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', marketId: any, tokensOwned: any }> } };

export type UserPositionsByMarketQueryVariables = Exact<{
  marketId?: InputMaybe<Scalars['BigInt']['input']>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserPositionsByMarketQuery = { __typename?: 'Query', positions: { __typename?: 'PositionPage', items: Array<{ __typename?: 'Position', createdAt: any, marketId: any, option: number, tokensOwned: any }> } };

export type SearchMarketsQueryVariables = Exact<{
  question_contains: Scalars['String']['input'];
}>;


export type SearchMarketsQuery = { __typename?: 'Query', markets: { __typename?: 'MarketPage', items: Array<{ __typename?: 'Market', id: any, title: string, question: string, outcomeOddsA: any, outcomeA: string, marketId: any, topicId?: any | null }> } };

export type SearchUsersQueryVariables = Exact<{
  name_contains: Scalars['String']['input'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPage', items: Array<{ __typename?: 'User', name?: string | null, pfp?: string | null, id: string, walletAddress: string }> } };

export type GetMarketsForTopicQueryVariables = Exact<{
  id?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type GetMarketsForTopicQuery = { __typename?: 'Query', markets: { __typename?: 'MarketPage', items: Array<{ __typename?: 'Market', outcome?: string | null, marketId: any, outcomeA: string, outcomeB: string, outcomeOddsA: any, outcomeOddsB: any, title: string, question: string, topicId?: any | null }> } };

export type GetTopicByIdQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type GetTopicByIdQuery = { __typename?: 'Query', topic?: { __typename?: 'Topic', creatorAddress: string, description?: string | null, title: string, id: any } | null };

export type GetUserReferralsQueryVariables = Exact<{
  referrerAddress: Scalars['String']['input'];
}>;


export type GetUserReferralsQuery = { __typename?: 'Query', referrals: { __typename?: 'ReferralPage', items: Array<{ __typename?: 'Referral', feeAmount: any, id: string, marketId: any, referrerAddress: string, timestamp: any, market: { __typename?: 'Market', question: string, title: string } }> } };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', name?: string | null, pfp?: string | null, id: string, externalAuthProviderUserId?: string | null, createdAt?: any | null, isRegistered: boolean, theme?: string | null, updatedAt?: any | null, walletAddress: string } | null };


export const GetMarketPricesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMarketPrices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"marketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]}}]} as unknown as DocumentNode<GetMarketPricesQuery, GetMarketPricesQueryVariables>;
export const FriendsOrdersByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FriendsOrdersByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddressArr"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddressArr"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"15"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalAuthProviderUserId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pfp"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FriendsOrdersByUserQuery, FriendsOrdersByUserQueryVariables>;
export const GetLpPositionsDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLpPositionsData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lpPositionPrices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amountLp"}},{"kind":"Field","name":{"kind":"Name","value":"amountUsdc"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}}]}}]}}]}}]} as unknown as DocumentNode<GetLpPositionsDataQuery, GetLpPositionsDataQueryVariables>;
export const GetLpPositionOriginalValueUsdcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLpPositionOriginalValueUSDC"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lpTrades"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amountLp"}},{"kind":"Field","name":{"kind":"Name","value":"amountUsdc"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}}]}}]}}]}}]} as unknown as DocumentNode<GetLpPositionOriginalValueUsdcQuery, GetLpPositionOriginalValueUsdcQueryVariables>;
export const GetUserLpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserLp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lpPositions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amountUsdc"}},{"kind":"Field","name":{"kind":"Name","value":"amountLp"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liquidityTotal"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"question"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserLpQuery, GetUserLpQueryVariables>;
export const AllMarketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllMarkets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}}]}}]}}]}}]} as unknown as DocumentNode<AllMarketsQuery, AllMarketsQueryVariables>;
export const CreatedMarketsByUserAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreatedMarketsByUserAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"proposedOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}}]}}]}}]}}]} as unknown as DocumentNode<CreatedMarketsByUserAddressQuery, CreatedMarketsByUserAddressQueryVariables>;
export const GetMarketByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMarketById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"market"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityTotal"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityBalanceUsdc"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}},{"kind":"Field","name":{"kind":"Name","value":"outcome"}},{"kind":"Field","name":{"kind":"Name","value":"proposedAt"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"proposedOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}}]}}]}}]} as unknown as DocumentNode<GetMarketByIdQuery, GetMarketByIdQueryVariables>;
export const MarketUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MarketUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"marketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pfp"}},{"kind":"Field","name":{"kind":"Name","value":"externalAuthProviderUserId"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MarketUsersQuery, MarketUsersQueryVariables>;
export const OrderByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrderById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pfp"}}]}}]}}]}}]} as unknown as DocumentNode<OrderByIdQuery, OrderByIdQueryVariables>;
export const FriendsOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FriendsOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddresses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddresses"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalAuthProviderUserId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pfp"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FriendsOrdersQuery, FriendsOrdersQueryVariables>;
export const GetPositionsByWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPositionsByWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"15"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}},{"kind":"Field","name":{"kind":"Name","value":"outcome"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalAuthProviderUserId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pfp"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPositionsByWalletQuery, GetPositionsByWalletQueryVariables>;
export const UserOrderCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserOrderCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}}]}}]}}]}}]} as unknown as DocumentNode<UserOrderCountQuery, UserOrderCountQueryVariables>;
export const UserPositionsByMarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPositionsByMarket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"marketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"marketId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}}]}}]}}]}}]} as unknown as DocumentNode<UserPositionsByMarketQuery, UserPositionsByMarketQueryVariables>;
export const SearchMarketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMarkets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"question_contains"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"question_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"question_contains"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}}]}}]}}]}}]} as unknown as DocumentNode<SearchMarketsQuery, SearchMarketsQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name_contains"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name_contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name_contains"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pfp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}}]}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetMarketsForTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMarketsForTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"topicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"outcome"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeOddsB"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"topicId"}}]}}]}}]}}]} as unknown as DocumentNode<GetMarketsForTopicQuery, GetMarketsForTopicQueryVariables>;
export const GetTopicByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTopicById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorAddress"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetTopicByIdQuery, GetTopicByIdQueryVariables>;
export const GetUserReferralsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserReferrals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referrerAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"referrals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"referrerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referrerAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feeAmount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"referrerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserReferralsQuery, GetUserReferralsQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pfp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalAuthProviderUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isRegistered"}},{"kind":"Field","name":{"kind":"Name","value":"theme"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;