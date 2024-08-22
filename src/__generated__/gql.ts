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
    "\n  query getMarketChartData($marketId: BigInt = \"1\") {\n    prices(where: { marketId: $marketId }) {\n      items {\n        id\n        marketId\n        price\n        timestamp\n      }\n    }\n  }\n": types.GetMarketChartDataDocument,
    "\n  query FriendsOrdersByUser($userAddressArr: [String]!) {\n    positions(where: { userAddress_in: $userAddressArr }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n": types.FriendsOrdersByUserDocument,
    "\n  query getLpPositionsData($userAddress: String!) {\n    lpPositionPrices(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        id\n        timestamp\n        userAddress\n      }\n    }\n  }\n": types.GetLpPositionsDataDocument,
    "\n  query getLpPositionOriginalValueUSDC($userAddress: String!) {\n    lpTrades(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        userAddress\n      }\n    }\n  }\n": types.GetLpPositionOriginalValueUsdcDocument,
    "\n  query getUserLp($userAddress: String!) {\n    lpPositions(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        createdAt\n        updatedAt\n        market {\n          liquidityTotal\n          title\n          question\n        }\n      }\n    }\n  }\n": types.GetUserLpDocument,
    "\n  query AllMarkets {\n    markets {\n      items {\n        marketId\n        outcomeB\n        outcomeA\n        outcomeOddsB\n        outcomeOddsA\n        question\n        title\n        topicId\n        usdcStake\n      }\n    }\n  }\n": types.AllMarketsDocument,
    "\n  query getMarketById($id: BigInt!) {\n    market(id: $id) {\n      id\n      createdAt\n      initialProb\n      liquidityTotal\n      outcomeA\n      outcomeB\n      outcomeOddsA\n      outcomeOddsB\n      outcome\n      proposedAt\n      question\n      proposedOutcome\n      title\n      usdcStake\n      topicId\n    }\n  }\n": types.GetMarketByIdDocument,
    "\n  query getUsersForMarket($id: String!) {\n    positions(limit: 1, where: { id: $id }) {\n      items {\n        marketId\n        market {\n          id\n          question\n          title\n          outcomeOddsB\n          outcomeOddsA\n          outcomeB\n          outcomeA\n          initialProb\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n": types.GetUsersForMarketDocument,
    "\n  query OrderById($id: String!) {\n    position(id: $id) {\n      marketId\n      option\n      tokensOwned\n      userAddress\n      market {\n        title\n        question\n        usdcStake\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n      }\n      user {\n        name\n        pfp\n      }\n    }\n  }\n": types.OrderByIdDocument,
    "\n  query GetOrdersByUser($userAddress: String) {\n    positions(where: { userAddress: $userAddress }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n": types.GetOrdersByUserDocument,
    "\n  query FriendsOrders($userAddress_in: [String]!) {\n    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n": types.FriendsOrdersDocument,
    "\n  query UserOrderCount($userAddress: String = \"\") {\n    positions(where: { userAddress: $userAddress }) {\n      items {\n        marketId\n        tokensOwned\n      }\n    }\n  }\n": types.UserOrderCountDocument,
    "\n  query getMarketsForTopic($id: Int) {\n    markets(where: { topicId: $id }) {\n      items {\n        outcome\n        marketId\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        title\n        question\n        topicId\n      }\n    }\n  }\n": types.GetMarketsForTopicDocument,
};

/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = tgql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function tgql(source: string): unknown;

/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getMarketChartData($marketId: BigInt = \"1\") {\n    prices(where: { marketId: $marketId }) {\n      items {\n        id\n        marketId\n        price\n        timestamp\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMarketChartData($marketId: BigInt = \"1\") {\n    prices(where: { marketId: $marketId }) {\n      items {\n        id\n        marketId\n        price\n        timestamp\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query FriendsOrdersByUser($userAddressArr: [String]!) {\n    positions(where: { userAddress_in: $userAddressArr }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FriendsOrdersByUser($userAddressArr: [String]!) {\n    positions(where: { userAddress_in: $userAddressArr }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getLpPositionsData($userAddress: String!) {\n    lpPositionPrices(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        id\n        timestamp\n        userAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLpPositionsData($userAddress: String!) {\n    lpPositionPrices(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        id\n        timestamp\n        userAddress\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getLpPositionOriginalValueUSDC($userAddress: String!) {\n    lpTrades(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        userAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLpPositionOriginalValueUSDC($userAddress: String!) {\n    lpTrades(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        userAddress\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getUserLp($userAddress: String!) {\n    lpPositions(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        createdAt\n        updatedAt\n        market {\n          liquidityTotal\n          title\n          question\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUserLp($userAddress: String!) {\n    lpPositions(where: { userAddress: $userAddress }) {\n      items {\n        amountLp\n        amountUsdc\n        marketId\n        createdAt\n        updatedAt\n        market {\n          liquidityTotal\n          title\n          question\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query AllMarkets {\n    markets {\n      items {\n        marketId\n        outcomeB\n        outcomeA\n        outcomeOddsB\n        outcomeOddsA\n        question\n        title\n        topicId\n        usdcStake\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllMarkets {\n    markets {\n      items {\n        marketId\n        outcomeB\n        outcomeA\n        outcomeOddsB\n        outcomeOddsA\n        question\n        title\n        topicId\n        usdcStake\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getMarketById($id: BigInt!) {\n    market(id: $id) {\n      id\n      createdAt\n      initialProb\n      liquidityTotal\n      outcomeA\n      outcomeB\n      outcomeOddsA\n      outcomeOddsB\n      outcome\n      proposedAt\n      question\n      proposedOutcome\n      title\n      usdcStake\n      topicId\n    }\n  }\n"): (typeof documents)["\n  query getMarketById($id: BigInt!) {\n    market(id: $id) {\n      id\n      createdAt\n      initialProb\n      liquidityTotal\n      outcomeA\n      outcomeB\n      outcomeOddsA\n      outcomeOddsB\n      outcome\n      proposedAt\n      question\n      proposedOutcome\n      title\n      usdcStake\n      topicId\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getUsersForMarket($id: String!) {\n    positions(limit: 1, where: { id: $id }) {\n      items {\n        marketId\n        market {\n          id\n          question\n          title\n          outcomeOddsB\n          outcomeOddsA\n          outcomeB\n          outcomeA\n          initialProb\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUsersForMarket($id: String!) {\n    positions(limit: 1, where: { id: $id }) {\n      items {\n        marketId\n        market {\n          id\n          question\n          title\n          outcomeOddsB\n          outcomeOddsA\n          outcomeB\n          outcomeA\n          initialProb\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query OrderById($id: String!) {\n    position(id: $id) {\n      marketId\n      option\n      tokensOwned\n      userAddress\n      market {\n        title\n        question\n        usdcStake\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n      }\n      user {\n        name\n        pfp\n      }\n    }\n  }\n"): (typeof documents)["\n  query OrderById($id: String!) {\n    position(id: $id) {\n      marketId\n      option\n      tokensOwned\n      userAddress\n      market {\n        title\n        question\n        usdcStake\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n      }\n      user {\n        name\n        pfp\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query GetOrdersByUser($userAddress: String) {\n    positions(where: { userAddress: $userAddress }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrdersByUser($userAddress: String) {\n    positions(where: { userAddress: $userAddress }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query FriendsOrders($userAddress_in: [String]!) {\n    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FriendsOrders($userAddress_in: [String]!) {\n    positions(where: { userAddress_in: $userAddress_in }, limit: 1) {\n      items {\n        marketId\n        option\n        tokensOwned\n        market {\n          id\n          initialProb\n          marketId\n          outcomeA\n          outcomeB\n          outcomeOddsA\n          outcomeOddsB\n          question\n          title\n          usdcStake\n        }\n        user {\n          externalAuthProviderUserId\n          name\n          pfp\n        }\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query UserOrderCount($userAddress: String = \"\") {\n    positions(where: { userAddress: $userAddress }) {\n      items {\n        marketId\n        tokensOwned\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserOrderCount($userAddress: String = \"\") {\n    positions(where: { userAddress: $userAddress }) {\n      items {\n        marketId\n        tokensOwned\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query getMarketsForTopic($id: Int) {\n    markets(where: { topicId: $id }) {\n      items {\n        outcome\n        marketId\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        title\n        question\n        topicId\n      }\n    }\n  }\n"): (typeof documents)["\n  query getMarketsForTopic($id: Int) {\n    markets(where: { topicId: $id }) {\n      items {\n        outcome\n        marketId\n        outcomeA\n        outcomeB\n        outcomeOddsA\n        outcomeOddsB\n        title\n        question\n        topicId\n      }\n    }\n  }\n"];

export function tgql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;