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
};

export type Lp = {
  __typename?: 'LP';
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  marketId: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  user: Scalars['String']['output'];
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
  user?: InputMaybe<Scalars['String']['input']>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LpPage = {
  __typename?: 'LPPage';
  items: Array<Lp>;
  pageInfo: PageInfo;
};

export type OnchainMarkets = {
  __typename?: 'OnchainMarkets';
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  initialProb?: Maybe<Scalars['BigInt']['output']>;
  liquidityUSDC?: Maybe<Scalars['BigInt']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  outcomeA?: Maybe<Scalars['BigInt']['output']>;
  outcomeB?: Maybe<Scalars['BigInt']['output']>;
  proposedAt?: Maybe<Scalars['BigInt']['output']>;
  proposedOutcome?: Maybe<Scalars['String']['output']>;
  resolved?: Maybe<Scalars['Boolean']['output']>;
  resolvedAt?: Maybe<Scalars['BigInt']['output']>;
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  usdcStake: Scalars['BigInt']['output'];
};

export type OnchainMarketsFilter = {
  AND?: InputMaybe<Array<InputMaybe<OnchainMarketsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OnchainMarketsFilter>>>;
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
  outcome_gt?: InputMaybe<Scalars['String']['input']>;
  outcome_gte?: InputMaybe<Scalars['String']['input']>;
  outcome_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  outcome_lt?: InputMaybe<Scalars['String']['input']>;
  outcome_lte?: InputMaybe<Scalars['String']['input']>;
  outcome_not?: InputMaybe<Scalars['String']['input']>;
  outcome_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposedAt?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  proposedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  proposedOutcome?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_gt?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_gte?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposedOutcome_lt?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_lte?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_not?: InputMaybe<Scalars['String']['input']>;
  proposedOutcome_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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

export type OnchainMarketsPage = {
  __typename?: 'OnchainMarketsPage';
  items: Array<OnchainMarkets>;
  pageInfo: PageInfo;
};

export type Orders = {
  __typename?: 'Orders';
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  marketId: Scalars['BigInt']['output'];
  option: Scalars['Int']['output'];
  price: Scalars['BigInt']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  tokensOwned: Scalars['BigInt']['output'];
};

export type OrdersFilter = {
  AND?: InputMaybe<Array<InputMaybe<OrdersFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<OrdersFilter>>>;
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

export type OrdersPage = {
  __typename?: 'OrdersPage';
  items: Array<Orders>;
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
  lP?: Maybe<Lp>;
  lPs: LpPage;
  onchainMarkets?: Maybe<OnchainMarkets>;
  onchainMarketss: OnchainMarketsPage;
  orders?: Maybe<Orders>;
  orderss: OrdersPage;
  price?: Maybe<Price>;
  prices: PricePage;
};


export type QueryLpArgs = {
  id: Scalars['String']['input'];
};


export type QueryLPsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<LpFilter>;
};


export type QueryOnchainMarketsArgs = {
  id: Scalars['BigInt']['input'];
};


export type QueryOnchainMarketssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OnchainMarketsFilter>;
};


export type QueryOrdersArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrderssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<OrdersFilter>;
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

export type OnchainMarketsQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type OnchainMarketsQuery = { __typename?: 'Query', onchainMarkets?: { __typename?: 'OnchainMarkets', id: any, outcomeA?: any | null, outcomeB?: any | null, usdcStake: any, liquidityUSDC?: any | null, resolved?: boolean | null, outcome?: string | null, proposedOutcome?: string | null, initialProb?: any | null, createdAt: any, updatedAt?: any | null, resolvedAt?: any | null, proposedAt?: any | null } | null };


export const OnchainMarketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OnchainMarkets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onchainMarkets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeA"}},{"kind":"Field","name":{"kind":"Name","value":"outcomeB"}},{"kind":"Field","name":{"kind":"Name","value":"usdcStake"}},{"kind":"Field","name":{"kind":"Name","value":"liquidityUSDC"}},{"kind":"Field","name":{"kind":"Name","value":"resolved"}},{"kind":"Field","name":{"kind":"Name","value":"outcome"}},{"kind":"Field","name":{"kind":"Name","value":"proposedOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"initialProb"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"resolvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"proposedAt"}}]}}]}}]} as unknown as DocumentNode<OnchainMarketsQuery, OnchainMarketsQueryVariables>;