/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetLpByUser($userAddress: String!) {\n    lps(where: { userAddress: $userAddress }) {\n      items {\n        amount\n        id\n        lpAmount\n        marketId\n        timestamp\n        userAddress\n      }\n    }\n  }\n": types.GetLpByUserDocument,
    "\n  query OnchainMarket($id: BigInt!) {\n    onchainMarket(id: $id) {\n      id\n      outcomeA\n      outcomeB\n      usdcStake\n      liquidityUSDC\n      resolved\n      outcome\n      proposedOutcome\n      initialProb\n      createdAt\n      updatedAt\n      resolvedAt\n      proposedAt\n    }\n  }\n": types.OnchainMarketDocument,
    "\n  query Orders($userAddress: String!) {\n    orders(where: { sender: $userAddress }) {\n      items {\n        id\n        marketId\n        market {\n          initialProb\n        }\n        sender\n        amount\n        price\n        option\n        timestamp\n        tokensOwned\n      }\n    }\n  }\n": types.OrdersDocument,
    "\n  query GetOrdersByUser($sender: String!) {\n    orders(where: { sender: $sender }) {\n      items {\n        amount\n        marketId\n        option\n        price\n        timestamp\n        tokensOwned\n      }\n    }\n  }\n": types.GetOrdersByUserDocument,
    "\n  query ExampleOnchainMarket($id: BigInt!) {\n    onchainMarket(id: $id) {\n      id\n      outcomeA\n      outcomeB\n      usdcStake\n      liquidityUSDC\n      resolved\n      outcome\n      proposedOutcome\n      initialProb\n      createdAt\n      updatedAt\n      resolvedAt\n      proposedAt\n    }\n  }\n": types.ExampleOnchainMarketDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetLpByUser($userAddress: String!) {\n    lps(where: { userAddress: $userAddress }) {\n      items {\n        amount\n        id\n        lpAmount\n        marketId\n        timestamp\n        userAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLpByUser($userAddress: String!) {\n    lps(where: { userAddress: $userAddress }) {\n      items {\n        amount\n        id\n        lpAmount\n        marketId\n        timestamp\n        userAddress\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query OnchainMarket($id: BigInt!) {\n    onchainMarket(id: $id) {\n      id\n      outcomeA\n      outcomeB\n      usdcStake\n      liquidityUSDC\n      resolved\n      outcome\n      proposedOutcome\n      initialProb\n      createdAt\n      updatedAt\n      resolvedAt\n      proposedAt\n    }\n  }\n"): (typeof documents)["\n  query OnchainMarket($id: BigInt!) {\n    onchainMarket(id: $id) {\n      id\n      outcomeA\n      outcomeB\n      usdcStake\n      liquidityUSDC\n      resolved\n      outcome\n      proposedOutcome\n      initialProb\n      createdAt\n      updatedAt\n      resolvedAt\n      proposedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Orders($userAddress: String!) {\n    orders(where: { sender: $userAddress }) {\n      items {\n        id\n        marketId\n        market {\n          initialProb\n        }\n        sender\n        amount\n        price\n        option\n        timestamp\n        tokensOwned\n      }\n    }\n  }\n"): (typeof documents)["\n  query Orders($userAddress: String!) {\n    orders(where: { sender: $userAddress }) {\n      items {\n        id\n        marketId\n        market {\n          initialProb\n        }\n        sender\n        amount\n        price\n        option\n        timestamp\n        tokensOwned\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetOrdersByUser($sender: String!) {\n    orders(where: { sender: $sender }) {\n      items {\n        amount\n        marketId\n        option\n        price\n        timestamp\n        tokensOwned\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrdersByUser($sender: String!) {\n    orders(where: { sender: $sender }) {\n      items {\n        amount\n        marketId\n        option\n        price\n        timestamp\n        tokensOwned\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExampleOnchainMarket($id: BigInt!) {\n    onchainMarket(id: $id) {\n      id\n      outcomeA\n      outcomeB\n      usdcStake\n      liquidityUSDC\n      resolved\n      outcome\n      proposedOutcome\n      initialProb\n      createdAt\n      updatedAt\n      resolvedAt\n      proposedAt\n    }\n  }\n"): (typeof documents)["\n  query ExampleOnchainMarket($id: BigInt!) {\n    onchainMarket(id: $id) {\n      id\n      outcomeA\n      outcomeB\n      usdcStake\n      liquidityUSDC\n      resolved\n      outcome\n      proposedOutcome\n      initialProb\n      createdAt\n      updatedAt\n      resolvedAt\n      proposedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;