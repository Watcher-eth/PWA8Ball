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

export type Lp = {
  __typename?: 'Lp';
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lpAmount: Scalars['BigInt']['output'];
  market: OnchainMarket;
  marketId: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  user: User;
  userAddress: Scalars['String']['output'];
};

export type LpFilter = {
  AND?: InputMaybe<Array<InputMaybe<LpFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LpFilter>>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  lpAmount?: InputMaybe<Scalars['BigInt']['input']>;
  lpAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lpAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lpAmount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lpAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lpAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lpAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  lpAmount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type LpPage = {
  __typename?: 'LpPage';
  items: Array<Lp>;
  pageInfo: PageInfo;
};

export type LpPositionValue = {
  __typename?: 'LpPositionValue';
  id: Scalars['String']['output'];
  marketId: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  userAddress: Scalars['String']['output'];
  value: Scalars['BigInt']['output'];
};

export type LpPositionValueFilter = {
  AND?: InputMaybe<Array<InputMaybe<LpPositionValueFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LpPositionValueFilter>>>;
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
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type LpPositionValuePage = {
  __typename?: 'LpPositionValuePage';
  items: Array<LpPositionValue>;
  pageInfo: PageInfo;
};

export type OnchainMarket = {
  __typename?: 'OnchainMarket';
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  initialProb?: Maybe<Scalars['BigInt']['output']>;
  liquidityTotalSupply?: Maybe<Scalars['BigInt']['output']>;
  liquidityUSDC?: Maybe<Scalars['BigInt']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  outcomeA?: Maybe<Scalars['BigInt']['output']>;
  outcomeB?: Maybe<Scalars['BigInt']['output']>;
  pairAddress?: Maybe<Scalars['String']['output']>;
  proposedAt?: Maybe<Scalars['BigInt']['output']>;
  proposedOutcome?: Maybe<Scalars['String']['output']>;
  resolved?: Maybe<Scalars['Boolean']['output']>;
  resolvedAt?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  usdcStake: Scalars['BigInt']['output'];
};

export type OnchainMarketFilter = {
  AND?: InputMaybe<Array<InputMaybe<OnchainMarketFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OnchainMarketFilter>>>;
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
  liquidityTotalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotalSupply_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityTotalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityTotalSupply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityUSDC?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityUSDC_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityUSDC_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityUSDC_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityUSDC_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityUSDC_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityUSDC_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityUSDC_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  outcomeA?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeA_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcomeA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeA_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeA_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcomeB?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeB_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeB_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeB_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcomeB_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeB_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeB_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcomeB_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
};

export type OnchainMarketPage = {
  __typename?: 'OnchainMarketPage';
  items: Array<OnchainMarket>;
  pageInfo: PageInfo;
};

export type Order = {
  __typename?: 'Order';
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  market: OnchainMarket;
  marketId: Scalars['BigInt']['output'];
  option: Scalars['Int']['output'];
  price: Scalars['BigInt']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  tokensOwned: Scalars['BigInt']['output'];
};

export type OrderFilter = {
  AND?: InputMaybe<Array<InputMaybe<OrderFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OrderFilter>>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokensOwned?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tokensOwned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokensOwned_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type OrderPage = {
  __typename?: 'OrderPage';
  items: Array<Order>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['String']['output'];
  marketId: Scalars['BigInt']['output'];
  outcome: Scalars['BigInt']['output'];
  price: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type PriceFilter = {
  AND?: InputMaybe<Array<InputMaybe<PriceFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PriceFilter>>>;
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
  outcome?: InputMaybe<Scalars['BigInt']['input']>;
  outcome_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outcome_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outcome_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  outcome_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outcome_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outcome_not?: InputMaybe<Scalars['BigInt']['input']>;
  outcome_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
};

export type PricePage = {
  __typename?: 'PricePage';
  items: Array<Price>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  _meta?: Maybe<_Meta>;
  lp?: Maybe<Lp>;
  lpPositionValue?: Maybe<LpPositionValue>;
  lpPositionValues: LpPositionValuePage;
  lps: LpPage;
  onchainMarket?: Maybe<OnchainMarket>;
  onchainMarkets: OnchainMarketPage;
  order?: Maybe<Order>;
  orders: OrderPage;
  price?: Maybe<Price>;
  prices: PricePage;
  user?: Maybe<User>;
  users: UserPage;
};


export type QueryLpArgs = {
  id: Scalars['String']['input'];
};


export type QueryLpPositionValueArgs = {
  id: Scalars['String']['input'];
};


export type QueryLpPositionValuesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LpPositionValueFilter>;
};


export type QueryLpsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LpFilter>;
};


export type QueryOnchainMarketArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryOnchainMarketsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OnchainMarketFilter>;
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OrderFilter>;
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

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  externalAuthProviderUserId: Scalars['String']['output'];
  friends?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['String']['output'];
  liquidityPoints?: Maybe<Scalars['BigInt']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pfp?: Maybe<Scalars['String']['output']>;
  rewardPoints?: Maybe<Scalars['BigInt']['output']>;
  socials?: Maybe<Scalars['JSON']['output']>;
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
  liquidityPoints?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  liquidityPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  rewardPoints?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPoints_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rewardPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPoints_not?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPoints_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type GetLpByUserQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type GetLpByUserQuery = { __typename?: 'Query', lps: { __typename?: 'LpPage', items: Array<{ __typename?: 'Lp', amount: any, id: string, lpAmount: any, marketId: any, timestamp: any, userAddress: string }> } };

export type OnchainMarketQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type OnchainMarketQuery = { __typename?: 'Query', onchainMarket?: { __typename?: 'OnchainMarket', id: any, outcomeA?: any | null, outcomeB?: any | null, usdcStake: any, liquidityUSDC?: any | null, resolved?: boolean | null, outcome?: string | null, proposedOutcome?: string | null, initialProb?: any | null, createdAt: any, updatedAt?: any | null, resolvedAt?: any | null, proposedAt?: any | null } | null };

export type OrdersQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
}>;


export type OrdersQuery = { __typename?: 'Query', orders: { __typename?: 'OrderPage', items: Array<{ __typename?: 'Order', id: string, marketId: any, sender: string, amount: any, price: any, option: number, timestamp: any, tokensOwned: any, market: { __typename?: 'OnchainMarket', initialProb?: any | null } }> } };

export type GetOrdersByUserQueryVariables = Exact<{
  sender: Scalars['String']['input'];
}>;


export type GetOrdersByUserQuery = { __typename?: 'Query', orders: { __typename?: 'OrderPage', items: Array<{ __typename?: 'Order', amount: any, marketId: any, option: number, price: any, timestamp: any, tokensOwned: any }> } };

export type ExampleOnchainMarketQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type ExampleOnchainMarketQuery = { __typename?: 'Query', onchainMarket?: { __typename?: 'OnchainMarket', id: any, outcomeA?: any | null, outcomeB?: any | null, usdcStake: any, liquidityUSDC?: any | null, resolved?: boolean | null, outcome?: string | null, proposedOutcome?: string | null, initialProb?: any | null, createdAt: any, updatedAt?: any | null, resolvedAt?: any | null, proposedAt?: any | null } | null };


export const GetLpByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLpByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lpAmount"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"userAddress"}}]}}]}}]}}]} as unknown as DocumentNode<GetLpByUserQuery, GetLpByUserQueryVariables>;
export const OnchainMarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OnchainMarket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchainMarket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityUSDC"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}},{"kind":"Field","name":{"kind":"Name","value":"outcome"}},{"kind":"Field","name":{"kind":"Name","value":"proposedOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"resolvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"proposedAt"}}]}}]}}]} as unknown as DocumentNode<OnchainMarketQuery, OnchainMarketQueryVariables>;
export const OrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Orders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"market"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initialProb"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}}]}}]}}]}}]} as unknown as DocumentNode<OrdersQuery, OrdersQueryVariables>;
export const GetOrdersByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrdersByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sender"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"sender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sender"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"marketId"}},{"kind":"Field","name":{"kind":"Name","value":"option"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"tokensOwned"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrdersByUserQuery, GetOrdersByUserQueryVariables>;
export const ExampleOnchainMarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExampleOnchainMarket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchainMarket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityUSDC"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}},{"kind":"Field","name":{"kind":"Name","value":"outcome"}},{"kind":"Field","name":{"kind":"Name","value":"proposedOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"resolvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"proposedAt"}}]}}]}}]} as unknown as DocumentNode<ExampleOnchainMarketQuery, ExampleOnchainMarketQueryVariables>;